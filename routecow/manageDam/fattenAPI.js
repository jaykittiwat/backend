var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

//บำรุง
router.get('/fatten/:UID',  (req, res)=> {
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


//Updata status:"บำรุงแล้ว" 
  router.post("/fatten/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.uid;
   firebase.firebase().ref("cattle/"+uid+"/"+key).update(req.body);
 res.send("สำเร็จ")
  });



module.exports = router;

