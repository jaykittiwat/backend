var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.get("/history/:uid/:cattle_id", (req, res) => {
  const UID = req.params.uid;
  const cID= req.params.cattle_id;
  firebase
    .firebase()
    .ref()
    .child("synchronize/"+UID)
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
router.get("/historyAllSynchronize/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref("synchronize/" + UID)
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


router.get("/historyAllSynchronize/:uid/:startDate/:endDate", (req, res) => {
  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  
  firebase
    .firebase()
    .ref("synchronize/" + UID).orderByChild('datepro').startAt(startDate).endAt(endDate)
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

router.get("/historyAllSynchronize/form01/:uid/:v/:mode", (req, res) => {

   const UID = req.params.uid;
   const v=req.params.v
   const mode=req.params.mode
  firebase
    .firebase()
    .ref("synchronize/" + UID).orderByChild(mode).equalTo(v)
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

router.get("/historyAllSynchronize/form02/:uid/:v/:startDate/:endDate/:mode", (req, res) => {

  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  const v=req.params.v
  const mode=req.params.mode
 firebase
   .firebase()
   .ref("synchronize/" + UID).orderByChild('datepro').startAt(startDate).endAt(endDate)
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

  firebase
    .firebase()
    .ref("/synchronize/" + uid)
    .push(req.body)
    .once("value", result => {
      if (result.val !== undefined || d != null || d != "") {
        res.json("ok").status(200);
      }
    });
});

router.post("/notisync/:UID", (req, res) => {
  var uid = req.params.UID;
const data=req.body;
data.map(list=>{


  firebase
    .firebase()
    .ref("/noti_synchronize/" + uid+"/"+list.date)
    .push(list)
})
res.send("OK")
});

module.exports = router;
