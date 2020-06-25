var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

//บำรุง
router.get('/show/:UID',  (req, res)=> {
  const uid = req.params.UID;
  firebase
    .firebase()
    .ref()
    .child("cattle/"+uid)
    .orderByChild("sex")
    .equalTo("MISS")
    .once("value", snapshot => {
      //console.log(Object.keys(snapshot.val()))
      //console.log(snapshot)
     res.send(snapshot.val())
    });
  
  })



  router.post("/status/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.UID; 
   firebase.firebase().ref("cattle/"+uid+"/"+key).update(req.body);

  });



 


module.exports = router;

