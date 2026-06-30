# Task Breakdown: Digisign 4W - Spouse Signing

Source PRD: https://gotocompany.sg.larksuite.com/wiki/XIPawZ3hAir175kM6YYltsW7gLf
Repository: vehicle-finance-api-provider
Requested Change Scope: Backend

## Backend

### BFI Callback & Spouse Data Ingestion

- [ ] **B-01**: Create Flyway migration for `spouse_whitelist` table (phone_number PK, loan_id, customer_id, status, created_at, updated_at). No `spouse_signing` or `loan_spouse_kyc` tables — spouse signing data is forwarded to Digisign, not persisted in MAB.
  - Acceptance criteria: Migration file `V{next}__create_spouse_whitelist.sql` exists, runs successfully, table has correct columns and indexes.

- [ ] **B-04**: Extend `BFILoanDTO` with `BFILoanSpouseDTO` record (fullName, phoneNumber, ktpNumber, birthDate, birthPlace)
  - Acceptance criteria: New DTO class exists with all 5 fields. `BFILoanDTO` has an optional `spouse` field. Existing BFI callback parsing is backward compatible (spouse field is optional).

- [ ] **B-05**: In `LoanStatusChangeService.processCallback` case APPROVED, pass spouse data to `LoanService.updateApprovedLoan`
  - Acceptance criteria: Spouse data from `BFILoanDTO` is passed through to `handleDigisignFeature`. No change to existing flow when spouse data is absent.

- [ ] **B-06**: In `LoanService.handleDigisignFeature`, add spouse signing branch — create spouse whitelist entry, forward spouse data to Digisign, trigger spouse LBA generation via Kafka. Spouse signing data is NOT persisted in a new table.
  - Acceptance criteria: When spouse data is present and loan is `ProductType.CAR` and feature flag is on: spouse whitelist entry is created (phone_number → loan_id, status = `PENDING_KYC`), spouse data is forwarded to Digisign, `GetSpouseLBADocumentEvent` Kafka event is emitted. When spouse data is absent: status = `NOT_REQUIRED`, no whitelist created. Idempotent on `partnerSubmissionId`.

- [ ] **B-07**: Extend `LBADocumentService` to handle spouse LBA generation — fetch spouse LBA from BFI, upload to OSS, create `LoanDocument` for spouse
  - Acceptance criteria: Spouse LBA document is generated and stored as a separate `LoanDocument` (or same document — depends on B-02 decision). `LoanDocument.status = PENDING` for spouse LBA.

### Expose Spouse Info via /v1/loans/latest

- [ ] **B-08**: Create `SpouseSigningInfoDTO` (borrowerNameHashed, loanExpiryTime, spouseSigningStatus, spouseName, spousePhoneNumber)
  - Acceptance criteria: DTO exists with all fields. `spouseSigningStatus` is an enum (NOT_REQUIRED, PENDING_KYC, KYC_PASSED, SIGNING_IN_PROGRESS, SIGNED, FAILED, EXPIRED).

- [ ] **B-09**: Add `spouseSigningInfo` field to `LoanDetailDTO`
  - Acceptance criteria: `LoanDetailDTO` has a new nullable `spouseSigningInfo` field of type `SpouseSigningInfoDTO`. Existing fields unchanged.

- [ ] **B-10**: In `LoanConverter.toLatestLoanDetailDto`, map `spouseSigningInfo` for both borrower and spouse views
  - Acceptance criteria: For borrower view: spouseName (decrypted), spousePhoneNumber (decrypted), loanExpiryTime, spouseSigningStatus are populated. borrowerNameHashed is null. For spouse view: borrowerNameHashed (via textUtil), loanExpiryTime, spouseSigningStatus are populated. spouseName and spousePhoneNumber are null (privacy).

- [ ] **B-11**: In `LoanService.getLatestLoan`, implement spouse whitelist lookup — resolve caller's phone number from customerId, lookup `spouse_whitelist` by phone number (FIFO ordering)
  - Acceptance criteria: When spouse opens app (caller is a whitelisted spouse): response includes `spouseSigningInfo` with borrower name hash and signing status. FIFO ordering for one spouse → multiple borrowers. When borrower opens app: response includes `spouseSigningInfo` with spouse name and phone. When no spouse signing: `spouseSigningInfo` is null.

### Spouse Digisign

- [ ] **B-12**: Add `SPOUSE_SIGNING` to `DigisignProcessType` enum
  - Acceptance criteria: Enum has `SPOUSE_SIGNING` value. No DB migration needed (TEXT column).

- [ ] **B-13**: Extend `DocumentSigningService.createSubmitDocumentSigningRequest` with `SPOUSE_SIGNING` branch — use spouse's gopay account + spouse LBA document
  - Acceptance criteria: Spouse digisign process is created with type `SPOUSE_SIGNING`. Uses spouse's gopayAccountId (from `loan_spouse_kyc`). Uploads spouse LBA to Digisign. Returns signing URL.

- [ ] **B-14**: Extend `DigisignClient` with spouse partner config (`vf-spouse-signature-partner`) and spouse submission type
  - Acceptance criteria: `application.yaml` has `vf-spouse-signature-partner` config. `DigisignClient.getDocumentUploadUrl` and `submitDocumentSignRequest` handle `SPOUSE_SIGNING` process type. TODO: confirm partner config with BFI/Digisign (see Decisions Needed).

- [ ] **B-15**: Add `POST /partners/digisign/v1/spouse/callback` to `DigisignCallbackController` + `handleSpouseCallback` in `DocumentSigningService`
  - Acceptance criteria: Spouse callback endpoint receives `ESignDocumentCallbackRequest`. On COMPLETED + VALID: process status → SIGNED, spouse signing status → SIGNED. Idempotent on `submissionId`.

- [ ] **B-16**: Modify `handleBorrowerCallback` and `handleSpouseCallback` to gate `LENDER_SIGNING` on both borrower + spouse signed
  - Acceptance criteria: `LENDER_SIGNING` event is emitted only when both borrower and spouse (if required) are SIGNED. If spouse signing is `NOT_REQUIRED`: borrower SIGNED → lender signing (unchanged). If spouse signing is required but not yet SIGNED: wait. Regression: existing 2W flow (no spouse) is unaffected.

- [ ] **B-17**: Extend `LoanDocumentService.initiateDocumentSigning` to support spouse digisign initiation
  - Acceptance criteria: Spouse can initiate digisign via `POST /v1/loans/document/digisign`. System determines spouse vs borrower from caller identity + whitelist. Spouse must have `KYC_PASSED` status to initiate. Idempotent — returns existing signing URL if already initiated.

### Spouse KYC Linkage

- [ ] **B-18**: Extend `ApprovedStatusHandler` to link spouse KYC result via `spouse_whitelist` — resolve gopayAccountId → phone number → lookup `spouse_whitelist` → update status
  - Acceptance criteria: When spouse completes OneKYC (APPROVED): `spouse_whitelist.status = KYC_PASSED`. When spouse KYC REJECTED: `spouse_whitelist.status = FAILED`. Only acts if gopayAccountId resolves to a phone number that matches a whitelisted spouse. No separate `loan_spouse_kyc` table — whitelist is the single source of truth for spouse signing status.

### Notifications

- [ ] **B-19**: Add `SpouseSigningRequiredEvent` Kafka event + consumer — send initial PN + WhatsApp to spouse when signing is required
  - Acceptance criteria: Event is emitted from `handleDigisignFeature` when spouse data is received. Consumer sends PN (title: "Tandatangan Dulu, Baru Cair!") and WhatsApp to spouse phone number. TODO: WA content TBD (see Decisions Needed).

- [ ] **B-20**: Add XXL-Job `spouseSigningReminderJob` — daily at 10 AM Jakarta time, send reminder PN + WhatsApp for pending spouse signings
  - Acceptance criteria: Job queries `spouse_whitelist` with status in (PENDING_KYC, KYC_PASSED, SIGNING_IN_PROGRESS) and `created_at < now - 1 day`. Sends daily reminder PN (title: "Kamu ditungguin pasangan kamu nih...") and WhatsApp. Stops when status = SIGNED or EXPIRED.

### Feature Flag & Gating

- [ ] **B-21**: Add feature flag `is-spouse-signing-enabled` (default: false) + 4W (CAR) gating + user group percentage rollout
  - Acceptance criteria: Flag in `application.yaml` under `gofin.vfs.general`. Gates BFI spouse data parsing, whitelist creation, spouse digisign, and notifications. Only applies to `ProductType.CAR`. Supports per-user-group rollout (MERCHANT, DRIVER first, then CONSUMER). Kill switch = set to false.

### Observability

- [ ] **B-22**: Add Micrometer metrics for spouse signing funnel — whitelist_created, kyc_passed, digisign_initiated, signed, failed, expired (tagged with USER_GROUP)
  - Acceptance criteria: Metrics are registered in `MetricConstant`. Counters increment at each state transition. Metrics are visible in Prometheus/Grafana.

## QA

- [ ] **QA-01**: Unit tests for `BFILoanSpouseDTO` parsing, spouse data persistence, whitelist creation
  - Acceptance criteria: All new service methods have unit tests. StepVerifier for reactive flows. Test both spouse-present and spouse-absent BFI callbacks.

- [ ] **QA-02**: Unit tests for `LoanConverter.toLatestLoanDetailDto` spouse mapping (borrower view + spouse view)
  - Acceptance criteria: Tests verify correct fields populated for borrower vs spouse caller. Tests verify borrower name hashing. Tests verify null handling.

- [ ] **QA-03**: Unit tests for spouse digisign initiation, callback handling, and lender signing gate
  - Acceptance criteria: Tests verify `SPOUSE_SIGNING` process creation. Tests verify `handleSpouseCallback` on COMPLETED/ERROR. Tests verify lender signing gate logic (both signed → lender; one signed → wait).

- [ ] **QA-04**: Integration tests (WireMock) for full spouse signing flow — BFI callback → whitelist → /v1/loans/latest → OneKYC callback → digisign initiation → digisign callback → lender signing
  - Acceptance criteria: End-to-end integration test with WireMock for BFI, Digisign, and OneKYC. Tests cover happy path and failure paths (KYC rejected, digisign error, expiration).

- [ ] **QA-05**: Regression tests — 2W digisign flow and 4W borrower-only digisign are unaffected
  - Acceptance criteria: Existing integration tests pass. New tests verify 2W loans do not trigger spouse signing. 4W loans without spouse data proceed with borrower-only digisign.

## Data / Analytics

- [ ] **D-01**: Define data tracking events for spouse signing funnel (per PRD "Data Tracking" section — currently TBF)
  - Acceptance criteria: Events defined for: spouse signing required, spouse KYC started/passed/rejected, spouse digisign initiated/signed/failed/expired. TODO: confirm tracking plan with PM.

- [ ] **D-02**: Create Grafana dashboard for spouse signing funnel + latency + error rate
  - Acceptance criteria: Dashboard shows funnel from whitelist_created → signed. Shows error rate by status. Shows `/v1/loans/latest` latency p99 with spouse lookup.

## Release

- [ ] **R-01**: Configure feature flag `is-spouse-signing-enabled` in staging → production
  - Acceptance criteria: Flag is configurable via dynamic config. Default false in production. Can be toggled per user group.

- [ ] **R-02**: Phase 1 rollout — enable for MERCHANT + DRIVER at 10%, monitor 3-5 days, gradually increase to 100%
  - Acceptance criteria: Monitoring gate met (error rate < 5%, latency p99 < baseline + 50ms). Funnel conversion tracked.

- [ ] **R-03**: Phase 2 rollout — enable for CONSUMER at 10%, monitor 3-5 days, gradually increase to 100%
  - Acceptance criteria: Monitoring gate met. No rollback needed.

- [ ] **R-04**: Document rollback procedure — set flag to false, notify VF team + PM + BFI + CS
  - Acceptance criteria: Runbook document exists. CS escalation playbook updated with new error codes (SPOUSE_DATA_INVALID, SPOUSE_SIGNING_EXPIRED, SPOUSE_KYC_REJECTED).

## Decisions Needed

- [ ] **DEC-01**: Confirm BFI callback payload contract — exact field names, nesting (inside `customer` vs separate `spouse` object), and whether `isSpouseSigningRequired` flag is sent or inferred from presence of spouse data
  - Acceptance criteria: BFI confirms JSON contract. `BFILoanSpouseDTO` field names match BFI payload. RFC updated with confirmed contract.

- [x] **DEC-02**: CONFIRMED — Spouse signs a separate LBA document (separate `LoanDocument` row). BFI generates LBA for both borrower and spouse.
  - Acceptance criteria: Resolved. `spouse_signing.spouse_lba_document_id` concept replaced by separate `LoanDocument` row for spouse. RFC updated.

- [ ] **DEC-03**: Confirm Digisign spouse partner config — does BFI/Digisign provide a separate signature partner for spouse, or is the borrower partner reused?
  - Acceptance criteria: BFI/Digisign confirms. `DigisignClient` config updated accordingly. RFC updated.

- [ ] **DEC-04**: Confirm phone-to-gopayAccountId lookup — how is the spouse's phone number matched to a gopay account when the spouse opens the VF app?
  - Acceptance criteria: Platform team confirms lookup service exists or a new one is needed. `LoanService.getLatestLoan` spouse whitelist resolution implemented accordingly.

- [ ] **DEC-05**: Confirm spouse KYC rejected behavior — does the loan fall back to wet sign for both borrower and spouse?
  - Acceptance criteria: PM/BFI confirms. Backend behavior for `FAILED` status is implemented accordingly.

- [ ] **DEC-06**: Confirm feature flag rollout percentages and phase durations
  - Acceptance criteria: PM confirms exact percentages and durations. Rollout plan updated.

- [ ] **DEC-07**: Confirm whether existing 4W loans in pipeline need spouse signing retroactively (backfill)
  - Acceptance criteria: PM confirms. If yes: backfill plan defined. If no: only new loans from flag-on date are affected.

- [ ] **DEC-08**: Confirm WhatsApp content and CTA deeplink for spouse signing notifications
  - Acceptance criteria: PM provides WA content and CTA deeplink. Notification templates configured.

- [ ] **DEC-09**: Confirm whether spouse whitelist lookup needs caching (phone number → loan/customer mapping)
  - Acceptance criteria: Team decides. If yes: cache key/value, TTL, invalidation on signing completion are defined. If no: direct DB lookup is used.

- [ ] **DEC-10**: Confirm LBA expiration — can borrower and spouse LBA have different expiration times?
  - Acceptance criteria: BFI confirms. If same: single expiry used. If different: separate expiry fields needed.
