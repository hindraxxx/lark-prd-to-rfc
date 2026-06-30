# Task Breakdown: Digisign 4W - Spouse Signing

Source PRD: https://gotocompany.sg.larksuite.com/wiki/XIPawZ3hAir175kM6YYltsW7gLf
Requested Change Scope: Backend only

## Backend

- [ ] Confirm BFI approved callback payload for spouse signing.
  - Acceptance criteria: Contract includes spouse data fields, spouse KYC result if any, spouse LBA document role/type, spouse signature coordinates, expiry, and absent-spouse semantics.
- [ ] Extend BFI callback/LBA parsing for spouse information and spouse LBA.
  - Acceptance criteria: Existing borrower-only and 2W callbacks remain compatible; spouse payloads are parsed without relying on list ordering alone.
- [ ] Persist spouse signing requirement and spouse LBA metadata.
  - Acceptance criteria: Stored data can drive spouse entrypoint, borrower status, expiry, and signing gate; spouse PII handling follows approved encryption/privacy rules.
- [ ] Add spouse signing process state.
  - Acceptance criteria: `SPOUSE_SIGNING` can be created, retried, signed, failed, and audited independently of borrower and lender signing.
- [ ] Gate lender signing on borrower plus required spouse signatures.
  - Acceptance criteria: Lender signing starts after borrower and spouse are signed when spouse signing is required; existing borrower-to-lender behavior remains for no-spouse-required loans.
- [ ] Add spouse signing entrypoint API.
  - Acceptance criteria: Authenticated spouse gets the oldest pending task first, with expiry/status payload; no task returns empty state.
- [ ] Add borrower signing status API or extend current document preview response.
  - Acceptance criteria: Borrower can see spouse signing required flag, spouse status, expiry, spouse name, and spouse phone number.
- [ ] Add spouse reminder trigger and observability.
  - Acceptance criteria: Immediate PN event is emitted when spouse signing is required; metrics cover spouse data received, signing started/completed/failed, and wet-sign fallback.

## Frontend

- [ ] Out of scope for this RFC.
  - Acceptance criteria: Backend contracts provide enough information for separate mobile implementation.

## QA

- [ ] Build regression suite for signing state machine.
  - Acceptance criteria: Tests cover no spouse data, spouse data present, borrower signs first, spouse signs first, duplicate callbacks, Digisign failure, expired LBA, and wet-sign fallback.
- [ ] Validate backward compatibility.
  - Acceptance criteria: Existing 2W borrower Digisign and 4W no-spouse/manual fallback behavior do not regress.

## Data / Analytics

- [ ] Define spouse signing funnel metrics.
  - Acceptance criteria: Dashboard can show borrower funnel, spouse funnel, BFI LBA generation time, borrower signing time, spouse signing time, and borrower/spouse signing delta.

## Release

- [ ] Configure rollout guard.
  - Acceptance criteria: Feature can be enabled for merchant and driver first, then consumer; kill switch returns affected loans to safe fallback behavior.
- [ ] Define migration policy.
  - Acceptance criteria: Product confirms no backfill, lazy migration, or explicit migration for existing 4W loans.

## Decisions Needed

- [ ] Confirm spouse phone to GoPay account/customer identity lookup owner.
  - Acceptance criteria: RFC records the service/API, error behavior, and privacy constraints.
- [ ] Confirm whether MAB trusts BFI spouse KYC result or must trigger OneKYC.
  - Acceptance criteria: RFC records KYC owner, blocked/rejected behavior, and wet-sign fallback transition.
- [ ] Confirm exact response contract for spouse entrypoint and borrower status.
  - Acceptance criteria: Mobile and backend agree on statuses, expiry, masking, and deeplink fields.
- [ ] Confirm daily reminder scheduling owner.
  - Acceptance criteria: RFC records whether this backend, notification platform, or another scheduler owns D+1 reminders.
