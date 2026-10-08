importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:'',authDomain:'',projectId:'',storageBucket:'',messagingSenderId:'',appId:''});
const messaging=firebase.messaging(); messaging.onBackgroundMessage(payload=>{const n=payload.notification||{};self.registration.showNotification(n.title||'ACTRA', {body:n.body||'You have an ACTRA update.',icon:'/actra-logo.jpg',data:payload.data||{}})});
