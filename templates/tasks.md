# Task Breakdown: {{title}}

Source PRD: {{source}}
Requested Change Scope: {{scope}}

## Backend

- [ ] TODO: Define backend work from RFC.
  - Acceptance criteria: TODO.

## Frontend

- [ ] TODO: Define frontend work from RFC.
  - Acceptance criteria: TODO.

## QA

- [ ] TODO: Define test plan and regression coverage.
  - Acceptance criteria: TODO.

## Data / Analytics

- [ ] TODO: Define tracking, dashboards, and data validation.
  - Acceptance criteria: TODO.

## Release

- [ ] TODO: Define rollout, monitoring, and rollback tasks.
  - Acceptance criteria: TODO.

## Decisions Needed

- [ ] Confirm API strategy: reuse/piggyback existing API, extend existing API, or introduce a new API.
  - Acceptance criteria: RFC records the chosen API path and marks unchosen paths as non-goals.
- [ ] Confirm service ownership and source of truth for every new or changed state.
  - Acceptance criteria: RFC names the owning service and forbidden direct dependencies, if any.
- [ ] Confirm sync/async/callback/event-driven linking flow.
  - Acceptance criteria: Sequence diagram matches the confirmed flow and includes failure/retry handling.
- [ ] Confirm cache strategy.
  - Acceptance criteria: RFC states whether cache is needed; if yes, key/value, TTL, invalidation, fallback, and observability are defined.
- [ ] Confirm experiment / whitelist rollout plan.
  - Acceptance criteria: RFC states flag or whitelist owner, targeting rule, rollout phases, default state, monitoring gate, and kill switch.
- [ ] Confirm backfill or migration policy.
  - Acceptance criteria: RFC states backfill, lazy migration, or no migration, with data safety checks.
