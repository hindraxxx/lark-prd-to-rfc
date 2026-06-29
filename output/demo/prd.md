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
