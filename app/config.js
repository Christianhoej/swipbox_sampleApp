import Firebase from 'firebase'
//import firebase from 'react-native-firebase';

let firebaseConfig = {
  apiKey: "AIzaSyBmJq8GZ374jxAUdRJ1BLojoUXqRPla91I",
  authDomain: "swipbox-sampleapp.firebaseapp.com",
  databaseURL: "https://swipbox-sampleapp.firebaseio.com",
  projectId: "swipbox-sampleapp",
  storageBucket: "swipbox-sampleapp.appspot.com",
  messagingSenderId: "516540944057",
  appId: "1:516540944057:web:36ce3dde51d9ab64f15568",
  measurementId: "G-5PS0T6C0R1"
};

let app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();

   /*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBmJq8GZ374jxAUdRJ1BLojoUXqRPla91I",
    authDomain: "swipbox-sampleapp.firebaseapp.com",
    databaseURL: "https://swipbox-sampleapp.firebaseio.com",
    projectId: "swipbox-sampleapp",
    storageBucket: "swipbox-sampleapp.appspot.com",
    messagingSenderId: "516540944057",
    appId: "1:516540944057:web:36ce3dde51d9ab64f15568",
    measurementId: "G-5PS0T6C0R1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script> */