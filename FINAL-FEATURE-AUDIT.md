# ACTRA v3 — Feature Audit

Implemented in source:

- Firebase Google Authentication
- Per-user Firestore persistence and security rules
- AI chat
- Chat-to-action extraction
- Text/PDF/CSV/Markdown ingestion
- AI image/screenshot understanding
- Audio/voice transcription
- Action deduplication
- Pending/In Progress/Done workflow
- Action dashboard and memory counters
- Gmail OAuth and Gmail send
- Google Calendar OAuth and event creation API
- Browser FCM push token registration
- Background FCM notification service worker
- Server-side FCM delivery
- Scheduled reminder sweep with per-day anti-spam marker
- Account data export
- Account data deletion
- Firebase Auth account deletion
- API authentication, Helmet and rate limiting
- Production environment templates
- Google Cloud Run Docker deployment files
- Firebase Hosting configuration
- Responsive UI
- Explicit failure messages when a required provider is not configured
- No private credentials embedded in the package

Required one-time owner configuration:
- Your Firebase project credentials
- Your Google OAuth client credentials
- Your OpenAI API key
- Firebase Cloud Messaging VAPID key
- Production HTTPS backend URL/CORS configuration

These credentials cannot be prefilled by the package without exposing the owner's private accounts. Once supplied, the implemented integrations are live rather than mock buttons.

Verification performed in this build environment:
- Backend JS syntax check: PASS
- Frontend JSX transpilation/syntax check: PASS
- Old local JSON storage references: NONE
- Full npm dependency installation/browser E2E: not completed in this sandbox because package installation timed out; therefore no honest zero-bug guarantee is claimed.
