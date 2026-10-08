import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
const cfg={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
export const firebaseConfigured=Object.values(cfg).every(Boolean); const app=firebaseConfigured?initializeApp(cfg):null;
export const auth=app?getAuth(app):null; export const provider=new GoogleAuthProvider();
export async function login(){if(!auth)throw new Error('Firebase client is not configured'); return signInWithPopup(auth,provider)}
export async function logout(){if(auth)return signOut(auth)} export {onAuthStateChanged};
export async function enableNotifications(registerToken){if(!app||!('Notification' in window))throw new Error('Browser notifications are not supported'); const supported=await isSupported(); if(!supported)throw new Error('This browser does not support Firebase push notifications'); const permission=await Notification.requestPermission(); if(permission!=='granted')throw new Error('Notification permission was denied'); const registration=await navigator.serviceWorker.register('/firebase-messaging-sw.js'); const token=await getToken(getMessaging(app),{vapidKey:import.meta.env.VITE_FIREBASE_VAPID_KEY,serviceWorkerRegistration:registration}); if(!token)throw new Error('Could not create notification token'); await registerToken(token); return token}
export async function listenNotifications(handler){if(!app||!(await isSupported()))return ()=>{}; return onMessage(getMessaging(app),handler)}
export {cfg};
