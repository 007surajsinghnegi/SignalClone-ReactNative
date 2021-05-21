import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAprLEUUo7XYjAXgg_FJW6U1L0EJvBN4Bo",
    authDomain: "signalclone-40f14.firebaseapp.com",
    projectId: "signalclone-40f14",
    storageBucket: "signalclone-40f14.appspot.com",
    messagingSenderId: "839710831547",
    appId: "1:839710831547:web:aeecca9bdcaaf8e5d08a9e",
    measurementId: "G-Q91KQ7MSP7"
};

let app ;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export{ db,auth };
