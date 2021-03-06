var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");
//บำรุง
router.get('/showAll/:UID',  (req, res)=> {
  const uid = req.params.UID;
  firebase
    .firebase()
    .ref()
    .child("cattle/"+uid)
    .once("value", snapshot => {
      var list = [];
      var KEY = [];
      var keyListgroup = [KEY, list];
      snapshot.forEach(elem => {
        KEY.push(elem.key); //วันที่ทั้งหมด
        list.push(elem.val()); //รายการของแต่ละวันที่
      });
      res.json(keyListgroup);
    });
  
  })
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

  router.get("/checkClave/:uid/:id_cattle", (req, res) => {
    const UID = req.params.uid;
    const id_cattle=req.params.id_cattle
    firebase
      .firebase()
      .ref()
      .child("cattle/"+UID)
      .orderByChild("cattle_id")
      .equalTo(id_cattle)
      .once("value", snapshot => {
        
        
          var keyListgroup = [];
          snapshot.forEach(elem => {
            KEY=keyListgroup.push( elem.key) 
            list=keyListgroup.push(elem.val())
          });
          res.json(keyListgroup);
      
      });
  });


  router.post("/status/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.UID; 
   firebase.firebase().ref("cattle/"+uid+"/"+key).update(req.body);
   res.send("บันทึกสำเร็จ")
   res.end();

  });
  router.post("/status2/:UID/:cid", (req, res) => {
    var uid=req.params.UID; 
    var c_id=req.params.cid
    firebase
    .firebase()
    .ref()
    .child("cattle/"+uid)
    .orderByChild("cattle_id")
    .equalTo(c_id)
    .once("value", snapshot => {

     snapshot.forEach(elem => {
      firebase.firebase().ref("cattle/"+uid+"/"+elem.key).update(req.body);
    });
    });

  });


 


module.exports = router;

