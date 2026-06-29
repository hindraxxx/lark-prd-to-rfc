# Task Breakdown: Default Payment Method (Backend)

Source PRD: output/Default Payment Method/prd.md
Requested Change Scope: Backend only — credit-application flow, post-credit flow, and setting page. Transaction flow (PRD US5–US9) is excluded.

Primary RFC artifact: `output/Default Payment Method/rfc.lark.xml` (this file is a mirror; the XML is the source of truth).

## Implementation Context

- **paylater-user-service** (`~/project/paylater-user-service/`) — owns the default-payment-method setting storage, experiment modulo logic, and read/apply APIs.
- **gpl-bff** (`~/project/gpl-bff/`) — owns the `/account-management/settings` entry point (read enrichment + write redirection) and the internal apply endpoint consumed by lending-adapter.
- **lending-adapter** (`~/project/lending-adapter/`) — owns the credit-application-success callback and the new post-credit side-effect that applies the cached default.

## Backend — paylater-user-service

- [ ] **BE-1** Add `user_default_payment_setting` DDL on `gtfpaylater` MySQL datasource (PK, unique `gofin_user_id`, `is_default_enabled`, `is_applied`, `opt_in_source`, `treatment_group`, timestamps). Coordinate out-of-repo migration.
  - AC: table exists; one row per user; unique constraint enforced.
- [ ] **BE-2** Add PO `UserDefaultPaymentSettingPO`, mapper interface + XML, domain model + assembler. Mirror `UserInfoPO` / `UserInfoMapper.xml` conventions.
  - AC: CRUD round-trips via MyBatis-Plus; unit test passes.
- [ ] **BE-3** Add experiment modulo + rollout config (`default-payment-method.rollout-pct`, kill-switch) in `application.yml`; `treatment_group = gojekCustomerId % 2` when rollout active.
  - AC: 50/50 split over a synthetic sample; kill-switch returns no-op.
- [ ] **BE-4** Implement internal REST in a new `DefaultPaymentMethodInternalController`: `POST /user-service/internal/user/default-payment-method` (upsert), `GET .../default-payment-method`, `POST .../default-payment-method/apply` (idempotent). Add application + domain services.
  - AC: see RFC AC tables for US1/US2/US3/US10.

## Backend — gpl-bff

- [ ] **BE-6** Extend `GplPaylaterUserServiceClient` with `getDefaultPaymentMethod`, `upsertDefaultPaymentMethod`, `applyDefaultPaymentMethod`; reuse `GplPaylaterUserServiceClientConfiguration` error decoder.
  - AC: client compiles; 4xx/5xx mapped to `WebClientException(BffError)`.
- [ ] **BE-7** Enrich `ToggleSettingService.fetchToggles` to fetch default-payment-method status and merge into `DEFAULT_PAYMENT_OPTION`; flip `toggle-configs.json` `show` behind a runtime feature flag.
  - AC: US10 AC10.1, US11 AC11.1.
- [ ] **BE-8** Reroute `ToggleSettingService.toggle` for `DEFAULT_PAYMENT_OPTION` from bizend to PUS (`optInSource=SETTINGS_PAGE`, `is_applied=true`); leave other features on bizend.
  - AC: US10 AC10.2, US12 AC12.1.
- [ ] **BE-9** Add BFF internal endpoint `POST /internal/credit-application/default-payment-method/apply` forwarding to PUS apply; wire into `InternalController`.
  - AC: forwards gofinId; returns 200 on idempotent re-apply.
- [ ] **BE-10** Update `CreditApplicationServiceImpl` submit path to forward `optInDefault` + treatment to PUS (US1 cache step).
  - AC: US1 AC1.1/1.2.

## Backend — lending-adapter

- [ ] **BE-11** Extend `GopayLaterBffClient` with `applyDefaultPaymentMethod(...)` (circuit-breaker protected).
  - AC: client compiles; circuit breaker opens on BFF 5xx.
- [ ] **BE-12** Add 4th branch in `PKYCCreditApplicationService.handleCreditApplicationCallback` `Mono.zip` to call `applyDefaultPaymentMethod` only when status == SUCCESS. Keep existing 3 branches intact.
  - AC: US3 AC3.1; no regression on Tokopedia/Kafka/GPL-callback branches.
- [ ] **BE-13** Add idempotency guard for the credit-application callback (consult `CallbackData.hasReceived` before re-running side-effects).
  - AC: US3 AC3.3; duplicate callback no-ops.

## QA

- [ ] **BE-5** Unit + integration tests for PUS endpoints (idempotency on apply, modulo distribution, kill-switch). WireMock Feign test for downstream absence.
  - AC: coverage targets met; idempotency test proves duplicate apply is a no-op.
- [ ] **BE-15** Contract tests across BFF↔PUS and LA↔BFF (WireMock / Reactor-test); add openspec entries in `lending-adapter/openspec` for the new apply call.
  - AC: contract tests green in CI; openspec proposal reviewed.

## Data / Analytics

- [ ] Support the PRD analytics events (Onboarding Review Page Viewed, Default Payment Method Toggled on Settings Page, etc.) by ensuring the BFF passes `treatment_group` and `opt_in_source` through to the analytics layer.
  - AC: events carry the required properties; coordinate with Lisa/Azka (OQ-4).

## Release

- [ ] **BE-14** Observability: New Relic/Sentry timings + custom metrics for PUS read/write/apply, BFF toggle enrichment, LA apply branch success/failure. Add dashboards + alerts for apply failure rate.
  - AC: dashboard live; alert thresholds set.
- [ ] **BE-16** Feature-flag config + rollout execution (0% → 50% → 100%) and kill-switch verification in staging.
  - AC: kill-switch verified; rollout gate metrics met per phase.

## Decisions Needed

- [ ] **OQ-1** PM acknowledgement that US11 source of truth is `paylater-user-service`, not GoPay.
- [ ] **OQ-2** Checkout-widget propagation plan (GoPay-side integration) — separate RFC.
- [ ] **OQ-3** Post-approval screen write: synchronous-blocking vs fire-and-forget.
- [ ] **OQ-4** Experiment sample size & duration (Product Analyst).
- [ ] **OQ-5** Whether to add callback-level idempotency in lending-adapter (BE-13) in addition to PUS apply idempotency.
