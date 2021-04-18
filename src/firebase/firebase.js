import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCv9zERoFz-3dzZzlFyvSU_tYRPy0IxLh0',
  authDomain: 'socialmediaapp-857b6.firebaseapp.com',
  projectId: 'socialmediaapp-857b6',
  storageBucket: 'socialmediaapp-857b6.appspot.com',
  messagingSenderId: '401057488755',
  appId: '1:401057488755:web:690c44cbc5c5c2877d2f06',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
