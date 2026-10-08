import crypto from 'crypto';import {firestore} from '../firebase.js'
const col=(u,n)=>firestore().collection('users').doc(u).collection(n);const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
export async function listActions(u){const s=await col(u,'actions').orderBy('createdAt','desc').get();return s.docs.map(d=>({id:d.id,...d.data()}))}
export async function getDashboard(u){const a=await listActions(u),today=new Date().toISOString().slice(0,10);return {today:a.filter(x=>x.status!=='Done'&&x.deadline===today).length,urgent:a.filter(x=>x.status!=='Done'&&x.priority==='Urgent').length,completed:a.filter(x=>x.status==='Done').length,people:(await col(u,'people').get()).size,commitments:(await col(u,'commitments').get()).size,documents:(await col(u,'documents').get()).size}}
export async function addAction(u,d){const ref=col(u,'actions').doc();const x={status:'Pending',priority:'Normal',...d,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};await ref.set(x);return {id:ref.id,...x}}
export async function updateAction(u,id,p){const ref=col(u,'actions').doc(id),s=await ref.get();if(!s.exists)return null;const x={...s.data(),...p,updatedAt:new Date().toISOString()};await ref.set(x,{merge:true});return {id,...x}}
export async function findDuplicate(u,title){const s=await col(u,'actions').where('status','!=','Done').limit(100).get(),n=norm(title);return s.docs.find(d=>{const t=norm(d.data().title);return t===n||t.includes(n)||n.includes(t)})}
export async function addDoc(u,n,d){await col(u,n).add({...d,createdAt:new Date().toISOString()})}
export async function getIntegration(u){const d=await firestore().collection('users').doc(u).collection('private').doc('integrations').get();return d.exists?d.data():{}}
export async function saveIntegration(u,d){await firestore().collection('users').doc(u).collection('private').doc('integrations').set(d,{merge:true})}
export async function saveFcmToken(u,t){const k=crypto.createHash('sha256').update(t).digest('hex');const ref=firestore().collection('users').doc(u).collection('private').doc('devices'); const old=await ref.get(); const tokens=old.exists?({...old.data().tokens,[k]:t}):{[k]:t}; await ref.set({tokens,updatedAt:new Date().toISOString()},{merge:true})}
export async function deleteUserData(u){const root=firestore().collection('users').doc(u);for(const n of ['actions','people','commitments','documents','memories']){const s=await root.collection(n).get();let b=firestore().batch();s.docs.forEach(d=>b.delete(d.ref));await b.commit()}await root.delete()}

export async function listDueActions(){const snap=await firestore().collectionGroup('actions').where('status','!=','Done').get();return snap.docs.map(d=>({id:d.id,...d.data(),userId:d.ref.parent.parent.id})).filter(x=>x.deadline&&x.deadline<=new Date().toISOString().slice(0,10));}
export async function listUserTokens(u){const d=await firestore().collection('users').doc(u).collection('private').doc('devices').get();return d.exists?Object.values(d.data().tokens||{}):[]}

export async function exportUserData(u){const root=firestore().collection('users').doc(u);const out={uid:u,exportedAt:new Date().toISOString()};for(const n of ['actions','people','commitments','documents','memories']){const snap=await root.collection(n).get();out[n]=snap.docs.map(d=>({id:d.id,...d.data()}))}return out}
export async function markReminderSent(u,id,date){await firestore().collection('users').doc(u).collection('actions').doc(id).set({lastReminderDate:date},{merge:true})}
