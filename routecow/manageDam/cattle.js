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
     res.send(snapshot.val())
    });
  
  })
//เหนี่ยวนำ
router.get('/show/:UID/:idCattle',  (req, res)=> {
  const uid = req.params.UID;
  const Cattle_id= req.params.idCattle;
  firebase
    .firebase()
    .ref()
    .child("cattle/"+uid)
    .orderByChild("cattle_id")
    .equalTo(Cattle_id)
    .once("value", snapshot => {
      if(snapshot.val()!==null){
        res.json(snapshot.val())
      }
    else{
      res.send("ไม่มีข้อมูล")
    }
    });
  
  })



  router.post("/status/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.UID; 
   firebase.firebase().ref("cattle/"+uid+"/"+key).update(req.body);
   
   res.end();

  });



 


module.exports = router;

