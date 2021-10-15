import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBSMZQp3ylscaGHgZtDZhMDn88hQFYPnLk",
  authDomain: "netflix-clone-ffd11.firebaseapp.com",
  projectId: "netflix-clone-ffd11",
  storageBucket: "netflix-clone-ffd11.appspot.com",
  messagingSenderId: "1077274842442",
  appId: "1:1077274842442:web:6bdcd71caed46b1ee55db3"
};


const firebaseapp = firebase.initializeApp(firebaseConfig)
const db = firebaseapp.firestore()
const auth = firebase.auth();


export { auth }
export default db