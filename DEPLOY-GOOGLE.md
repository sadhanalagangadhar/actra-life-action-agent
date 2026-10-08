# ACTRA Google production deployment

## 1. Firebase
Create/use your Firebase project. Enable Google Authentication, Firestore and Cloud Messaging. Deploy `firestore.rules`.

## 2. Backend on Cloud Run
Build `backend/Dockerfile` and deploy the backend to Cloud Run. Store `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `OPENAI_API_KEY`, `GOOGLE_CLIENT_SECRET` and other secrets in Secret Manager rather than committing them. Set `PORT=8080`.

## 3. Google OAuth
Create a Google OAuth Web client. Add your Cloud Run URL plus `/api/integrations/google/callback` as an authorized redirect URI. Enable Gmail API and Google Calendar API.

## 4. Frontend
Set `VITE_API_URL` to the HTTPS Cloud Run API URL ending in `/api`, then run `npm run build` and deploy `frontend/dist` to Firebase Hosting.

## 5. Web push
In Firebase Console > Cloud Messaging > Web Push certificates, generate a VAPID key and put it in `VITE_FIREBASE_VAPID_KEY`. FCM web push requires HTTPS.

## 6. Reminder worker
Cloud Run must stay available for the scheduled Node worker, or move `runReminderSweep()` into Cloud Scheduler/Cloud Functions for a serverless deployment.

This project deliberately does not ship anyone's private API keys or OAuth secrets.
