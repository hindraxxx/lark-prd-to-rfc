# Implementation Context: Default Payment Method

## Repository Ownership

- **User Repo (owns default payment setting):** `~/project/paylater-user-service/`
  - Must own the user's default payment method state.
  - Must NOT set the default by calling the GoPay API directly; the user service is the source of truth.
- **BFF (entry point for /setting API):** `~/project/gpl-bff/`
  - Owns the `/setting` API entry point that the client calls to read/update the default payment method.
- **Lending Adapter (credit application callback):** `~/project/lending-adapter/`
  - Handles the API callback for a successful credit application.
  - On credit success, the post-credit flow must seed/trigger the default payment method state in the user service.

## Scope Boundaries

- Backend only.
- In scope: credit application flow, post-credit flow, and the settings page API.
- Out of scope: transaction flow (do not cover transaction processing in this RFC).

## Key Constraints

- Default payment state lives in `paylater-user-service`; no direct GoPay API calls to set defaults.
- `gpl-bff` is the gateway for client-facing `/setting` operations.
- `lending-adapter` is the integration point for credit application success callbacks.
