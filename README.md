# ACTRA — Production Life Action Agent

ACTRA turns text, PDFs, images/screenshots and voice/audio into traceable actions, deadlines, memory and follow-ups.

## Included
- Firebase Authentication + Firestore per-user storage
- AI chat + structured action extraction
- Vision image understanding
- Audio transcription + browser notification fallback
- Gmail send + Google Calendar through per-user OAuth
- Firebase Cloud Messaging web push + scheduled reminder worker
- Duplicate protection, account deletion, security middleware and rate limiting
- Responsive web UI

## Required real-service configuration
The source contains the integrations; secrets are intentionally not shipped. Create the accounts/credentials in your own Google/Firebase/OpenAI projects and place them in local `.env` files.

### Backend
1. Copy `backend/.env.example` to `backend/.env`.
2. Add Firebase Admin credentials.
3. Add an OpenAI API key for chat, vision and transcription.
4. Create a Google OAuth Web Application and add the exact redirect URI shown in `GOOGLE_REDIRECT_URI`. Enable Gmail API and Google Calendar API.
5. Keep `ENABLE_REMINDER_WORKER=true` on a persistent backend host.

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env`.
2. Add your Firebase Web App values.
3. In Firebase Console > Cloud Messaging, create a Web Push certificate and set `VITE_FIREBASE_VAPID_KEY`. Firebase Web Push requires HTTPS.

### Firebase
Enable Authentication (Google), Firestore and Cloud Messaging. Deploy `firestore.rules`.

### Run
```
cd backend && npm install && npm start
cd ../frontend && npm install && npm run dev
```

### Production
Host the frontend on Firebase Hosting/another HTTPS host and the backend on a persistent HTTPS Node host. Set production CORS/APP_URL and all secrets there.

No application can honestly guarantee zero bugs. This package is designed to fail closed: missing external credentials produce explicit configuration errors instead of pretending that an action was completed.
