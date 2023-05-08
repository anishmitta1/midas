import * as fs from 'fs';
import { config } from 'dotenv';
import firebaseAdmin from 'firebase-admin';

import type { ServiceAccount } from 'firebase-admin';

config();

const FIREBASE_SECRET = process.env.FIREBASE_SERVICE_ACCOUNT_SECRET as string;

const SVC_CONFIG = JSON.parse(fs.readFileSync(FIREBASE_SECRET, 'utf-8'));

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(SVC_CONFIG as ServiceAccount),
});

const db = firebaseAdmin.firestore();

export { firebaseAdmin, db };
