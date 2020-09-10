const firebase = require('firebase');
var config = {
  apiKey: "AIzaSyAr84xJjheE3ggfxEmdz_UzslZj2uOWKWM",
  authDomain: "newtest-62eff.firebaseapp.com",
  databaseURL: "https://newtest-62eff.firebaseio.com",
  projectId: "newtest-62eff",
  storageBucket: "newtest-62eff.appspot.com",
  messagingSenderId: "581992453205",
  appId: "1:581992453205:web:f487bad4f9341576b0f0dc",
  measurementId: "G-G3BG5G49LF"
  };
  firebase.initializeApp(config);


  exports.firebase = function(){
    return firebase.database();
  }
  exports.firebaseStorage=function () {
    return firebase.storage();
  }