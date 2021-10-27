// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCGQrocPN0XsmfimUvCxDh6TSutZ4sbbxA",
    authDomain: "post-84798.firebaseapp.com",
    databaseURL: "https://post-84798.firebaseio.com",
    projectId: "post-84798",
    storageBucket: "post-84798.appspot.com",
    messagingSenderId: "238397418645",
    appId: "1:238397418645:web:411d32adaf7d06ec0a7f9c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var storage = firebase.storage();