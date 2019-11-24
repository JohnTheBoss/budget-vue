import firebase from 'firebase'

let app = null;

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain:  process.env.FB_AUTH_DOMAIN,
  databaseURL:  process.env.FB_DB_URL,
  projectId:  process.env.FB_PROJECT_ID,
  storageBucket:  process.env.FB_STORAGE_BUCKET,
  messagingSenderId:  process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID
}

app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const db = app.database()