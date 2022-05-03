import {getFirestore} from 'firebase-admin/firestore';
import myCredentials from './credentials.js'
import { initializeApp, getApps, cert } from 'firebase-admin/app';


export default function connectDb() {
    if (getApps().length ===0){
        initializeApp({
            credential: cert(myCredentials),
        });
    }
    return getFirestore();
}

