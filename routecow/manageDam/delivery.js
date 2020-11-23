var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");
router.get("/history/:uid/:cattle_id", (req, res) => {
    const UID = req.params.uid;
    const cID= req.params.cattle_id;
    firebase
      .firebase()
      .ref()
      .child("delivery/"+UID)
      .orderByChild("dam_id")
      .equalTo(cID)
      .once("value", snapshot => {
      const list = [];
      const keylist=[]
        snapshot.forEach(elem => {
          list.push(elem.val());
          keylist.push(elem.key)
        });
    res.json(list)
      });
  });


  router.get("/historyAllDelivery/:uid", (req, res) => {
    const UID = req.params.uid;
    firebase
      .firebase()
      .ref("delivery/" + UID)
      .once("value", (snapshot) => {
        const list = [];
        const keylist = [];
        snapshot.forEach((elem) => {
          list.push(elem.val());
          keylist.push(elem.key);
        });
  
        res.json(list);
      });
  });

  router.get("/historyAllDelivery/:uid/:startDate/:endDate", (req, res) => {
    const startDate=req.params.startDate
    const UID = req.params.uid;
    const endDate=req.params.endDate
    
    firebase
      .firebase()
      .ref("delivery/" + UID).orderByChild('date').startAt(startDate).endAt(endDate)
      .once("value", (snapshot) => {
        const list = [];
        const keylist = [];
        snapshot.forEach((elem) => {
          list.push(elem.val());
          keylist.push(elem.key);
        });
  
        res.json(list);
      });
  });
  
  router.get("/historyAllDelivery/form01/:uid/:v/:mode", (req, res) => {
  
     const UID = req.params.uid;
     const v=req.params.v
     const mode=req.params.mode
    firebase
      .firebase()
      .ref("delivery/" + UID).orderByChild(mode).equalTo(v)
      .once("value", (snapshot) => {
        const list = [];
        const keylist = [];
        snapshot.forEach((elem) => {
          list.push(elem.val());
          keylist.push(elem.key);
        });
  
        res.json(list);
      });
  });
  
  router.get("/historyAllDelivery/form02/:uid/:v/:startDate/:endDate/:mode", (req, res) => {
  
    const startDate=req.params.startDate
    const UID = req.params.uid;
    const endDate=req.params.endDate
    const v=req.params.v
    const mode=req.params.mode
   firebase
     .firebase()
     .ref("delivery/" + UID).orderByChild('date').startAt(startDate).endAt(endDate)
     .once("value", (snapshot) => {
       const list = [];
       const keylist = [];
       snapshot.forEach((elem) => {
         const d =elem.val()
         if(d[mode]===v){
           list.push(elem.val());
            keylist.push(elem.key);
         }
         
       });
  
       res.json(list);
     });
  });



router.post("/:UID", (req, res) => {
    
    var uid = req.params.UID;
    var data = req.body;
    firebase.firebase().ref('delivery/'+uid).push(data).once('value',result=>{
        if(result.val!==undefined || d != null || d != ''){
            res.json("ok").status(200)
        }
    })
     
    });
module.exports = router;