import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
} from "@env"

const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().enablePersistence();
}

// if (process.browser){
//     fireDb.enablePersistence()
//       .catch(function(err) {
//           if (err.code == 'failed-precondition') {
//               // Multiple tabs open, persistence can only be enabled
//               // in one tab at a a time.
//               // ...
//               console.log(err.code);
//           } else if (err.code == 'unimplemented') {
//               // The current browser does not support all of the
//               // features required to enable persistence
//               // ...
//               console.log(err.code);
//           }
//       });
//     }

// export const firestore = firebase.firestore()

export { firebase };