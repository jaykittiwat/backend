var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get('/calfshowAll/:UID',  (req, res)=> {
  const uid = req.params.UID;
  firebase
    .firebase()
    .ref()
    .child("calf/"+uid)
    .once("value", snapshot => {
      var list = [];
      var KEY = [];
      var keyListgroup = [KEY, list];
      snapshot.forEach(elem => {
        KEY.push(elem.key); 
        list.push(elem.val());
      });
      res.json(keyListgroup);
    });
  
  })

  router.post("/update/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.UID; 
   firebase.firebase().ref("calf/"+uid+"/"+key).update(req.body);
   res.send("บันทึกสำเร็จ")
   res.end();
  });
  

 


module.exports = router;

