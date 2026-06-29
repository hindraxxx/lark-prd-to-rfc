# RFC Context: Default Payment Method

## Scope
Backend only. Specifically:
- Credit application flow (post-credit flow)
- Setting page (default payment method selection)
- Excludes all transaction-related flows

## Repository Ownership

| Concern | Repository | Path |
| --- | --- | --- |
| User setting: default payment method ownership | paylater-user-service | ~/project/paylater-user-service/ |
| BFF entry point for /setting API | gpl-bff | ~/project/gpl-bff/ |
| Credit application success callback handler | lending-adapter | ~/project/lending-adapter/ |

## Key Constraints

- The user setting for default payment must be owned by `paylater-user-service`. Do NOT have the BFF or any other service call GoPay APIs to store the default payment method.
- `gpl-bff` only owns the entry point for the `/setting` API (orchestration / aggregation).
- `lending-adapter` owns the API callback for successful credit application. The post-credit flow should be triggered from here.
- Transaction flow is explicitly out of scope.

## Source PRD
https://gotocompany.sg.larksuite.com/docx/KLxndxHSdoV5NbxbrntlWoMogGe
