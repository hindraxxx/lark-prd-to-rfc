# RFC: Sample Wallet Limit PRD

Status: Draft
Source PRD: ./examples/sample-prd.md
Requested Change Scope: TODO: Backend, Frontend, QA, Data / Analytics, Release, or another explicit area.

## Glossary

| Term | Definition |
| --- | --- |
| TODO | TODO: Add term definition. |

## Background

TODO: Summarize why this feature exists and what product outcome it should create. Cover what is being built, why, and why now.

## Product Requirements Summary

Source: ./examples/sample-prd.md

# Sample Wallet Limit PRD

Source: ./examples/sample-prd.md

## Background

Users need a safer way to control wallet spending limits for daily transactions.

## Goals

- Allow users to configure a daily wallet spend limit.
- Block wallet payments that exceed the configured limit.
- Notify users when a payment is blocked by the limit.

## Requirements

- Users can view current daily limit.
- Users can update the daily limit once every 24 hours.
- The default limit is inherited from the existing risk profile.
- Blocked payments should show a clear reason.

## Metrics

- Reduce high-risk wallet transactions.
- Track limit update completion rate.
- Track payment blocks caused by daily limits.

## Open Questions

- Should support agents be able to override limits?
- Does the 24-hour update cooldown reset on failed update attempts?

## Current State

TODO: Describe how the relevant parts of the system work TODAY — before any changes from this RFC. Cover which services are involved, the current user/data flow, what does NOT exist, and known limitations.

## Desired State

TODO: Describe what the system looks like AFTER this RFC is fully implemented. Focus on the delta from Current State. Cover what is new, what has changed, and what has been removed or replaced.

## In scope

- TODO: Brief summary of items covered as part of the solution.

## Out of scope

- TODO: Brief summary of items not covered as part of the solution.

## Solution

TODO: Describe the recommended implementation approach. Call out what we will be doing, what we will NOT be doing, and assumptions.

## Implementation Context

TODO: Add repository context before finalizing the RFC. Example:

- Backend: `/path/to/repo-a` owns user APIs and user domain changes.
- Frontend: `/path/to/repo-b` owns settings UI and user-facing copy.
- Shared contracts: `/path/to/repo-c` owns generated API clients or schemas.

## System Design

TODO: Capture services, data flow, sequence, and ownership boundaries.

<whiteboard type="mermaid">
flowchart TD
  PRD[Product requirement] --> RFC[Engineering RFC]
  RFC --> RepoAnalysis[Repository analysis]
  RepoAnalysis --> Design[Proposed design]
  Design --> Implementation[Implementation tasks]
  Implementation --> Rollout[Rollout and validation]
</whiteboard>

## User Story: TODO-001 — [Story Title]

**As** [actor/role], **I want** [goal or capability], **so that** [business benefit].

### Acceptance Criteria

| AC | Given | When | Then |
| --- | --- | --- | --- |
| AC 1.1 | [Precondition] | [Trigger] | [Expected outcome] |
| AC 1.2 | [Precondition] | [Trigger] | [Expected outcome] |

### Technical Approach

#### Approach #1 (Preferred)

- TODO: Overview.
- TODO: Block diagram.
- TODO: Sequence diagram.
- TODO: Database modelling.
- TODO: APIs.
- TODO: Events / Queue changes.

**Pros:** TODO.
**Cons:** TODO.

#### Approach #2

- TODO: Overview.
- TODO: Block diagram.
- TODO: Sequence diagram.
- TODO: Database modelling.
- TODO: APIs.
- TODO: Events / Queue changes.

**Pros:** TODO.
**Cons:** TODO.

## Dependencies

TODO: List prerequisites/dependencies on any team/component before building/rollout.

## Task Breakdown

| ID | Title | Mandays | Type | Team |
| --- | --- | --- | --- | --- |
| 1 | TODO: backend task | 1 | Backend | TODO |
| 2 | TODO: frontend task | 2 | Frontend | TODO |
| 3 | TODO: QA task | 3 | QA | TODO |

## Cross-Cutting Checklist

| # | Concern | Status | Notes |
| --- | --- | --- | --- |
| 1 | **Non-Functional Requirements** — latency SLA, throughput, error rate targets | TODO | TODO |
| 2 | **Security** — authentication, authorisation, data access control | TODO | TODO |
| 3 | **Data Privacy / PII** — new PII fields, data masking, retention policy | TODO | TODO |
| 4 | **Compliance & Regulatory** — applicable regulations, licensing | TODO | TODO |
| 5 | **Risk & Fraud** — new attack surface, fraud rule changes, risk signal impact | TODO | TODO |
| 6 | **Customer Support (CS) Escalation** — new error codes, CS tooling, escalation playbook | TODO | TODO |
| 7 | **Backward Compatibility** — breaking API changes, client migration plan | TODO | TODO |
| 8 | **Feature Flag / Kill Switch** — mechanism to enable/disable safely without redeploy | TODO | TODO |
| 9 | **Observability** — new metrics, dashboards, log events, alerting rules | TODO | TODO |
| 10 | **Rate Limiting & Throttling** — abuse prevention, quota impact on new endpoints | TODO | TODO |
| 11 | **Third-party / External Dependencies** — vendor SLA, fallback if external system is down | TODO | TODO |
| 12 | **Testing Strategy** — unit, integration, E2E, regression, load testing coverage | TODO | TODO |

## Rollout Plan

TODO: Document how this change will be deployed to production safely. Cover feature flag name, rollout phases, targeting criteria, and monitoring gate per phase.

## Rollback Plan (Optional)

TODO: Document how to safely reverse this change. Cover immediate action, step-by-step, user-facing implications, data safety, and who to notify.

## Conclusion

TODO: Jot down the conclusion of the RFC review meeting discussion.

## References

- Links to reference docs
- Link to related PRD, RFCs
- Link to internal documents

## Open questions?

- [ ] Open question 1
  - Resolution for question 1
- [ ] Open question 2
  - Resolution for question 2

## RFC review meeting notes

| Date | Notes |
| --- | --- |
| TODO: date | **Attendees:** TODO: add attendees. **Meeting notes:** TODO: add notes. |

