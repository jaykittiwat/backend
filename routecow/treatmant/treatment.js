var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");
router.get("/notiAll/:UID", (req, res) => {
  var uid = req.params.UID;
  firebase
    .firebase()
    .ref()
    .child("notificationTreatment/" + uid)
    .once("value", snapshot => {
      //console.log(snapshot.val())
      var list = [];
      var listDate = [];
      snapshot.forEach(elem => {
        listDate.push(elem.key);//keyวันที่ทั้งหมด
        list.push(elem.val());//รายการของแต่ละวันที่
      });
      //เก็บข้อมูบลโคที่ต้องมีการแจ้งเตือน
      const listEmpty={}
      const listCheck = [];
      for (let i = 0; i < listDate.length; i++) {
          listCheck.push(list[i]);//เก็บข้อมูล ที่ต้องมีการบันทึก    
      }
      if(listCheck.length==0){
        res.json(listEmpty)
      }
      if(listCheck.length!=0){
        const DataFillter = Object.assign.apply({}, listCheck);
        res.json(DataFillter);
      }
    });
});

router.get("/history/:uid/:cattle_id", (req, res) => {
  const UID = req.params.uid;
  const cID= req.params.cattle_id;
  firebase
    .firebase()
    .ref()
    .child("treatment/"+UID)
    .orderByChild("id")
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

router.get("/historyAllTreatment/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref()
    .child("treatment/"+UID)
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


router.get("/historyAllTreatment/:uid/:startDate/:endDate", (req, res) => {
  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  
  firebase
    .firebase()
    .ref("treatment/" + UID).orderByChild('datediagnose').startAt(startDate).endAt(endDate)
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

router.get("/historyAllTreatment/form01/:uid/:v/:mode", (req, res) => {

   const UID = req.params.uid;
   const v=req.params.v
   const mode=req.params.mode
  firebase
    .firebase()
    .ref("treatment/" + UID).orderByChild(mode).equalTo(v)
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

router.get("/historyAllTreatment/form02/:uid/:v/:startDate/:endDate/:mode", (req, res) => {

  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  const v=req.params.v
  const mode=req.params.mode
 firebase
   .firebase()
   .ref("treatment/" + UID).orderByChild('datediagnose').startAt(startDate).endAt(endDate)
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
  const UID=req.params.UID;
      firebase.firebase().ref("treatment/"+UID).push(req.body)
    
    res.status(201).json(req.body);
  });


    router.post("/noti/:UID/:Date", (req, res) => {
      const uid=req.params.UID;
      var date = req.params.Date;
      var data=req.body;
          firebase.firebase().ref("notificationTreatment/" + uid + "/" + date).push(data)
        res.status(201).json(req.body);
      });
  

module.exports = router;