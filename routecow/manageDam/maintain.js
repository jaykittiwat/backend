var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/history/:uid/:cattle_id", (req, res) => {
  const UID = req.params.uid;
  const cID = req.params.cattle_id;
  firebase
    .firebase()
    .ref()
    .child("maintain/" + UID)
    .orderByChild("dam_id")
    .equalTo(cID)
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
router.get("/historyAllMaintain/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref("maintain/" + UID)
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

router.get("/historyAllMaintain/:uid/:startDate/:endDate", (req, res) => {
  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  
  firebase
    .firebase()
    .ref("maintain/" + UID).orderByChild('date').startAt(startDate).endAt(endDate)
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

router.get("/historyAllMaintain/form01/:uid/:v/:mode", (req, res) => {

   const UID = req.params.uid;
   const v=req.params.v
   const mode=req.params.mode
  firebase
    .firebase()
    .ref("maintain/" + UID).orderByChild(mode).equalTo(v)
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

router.get("/historyAllMaintain/form02/:uid/:v/:startDate/:endDate/:mode", (req, res) => {

  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  const v=req.params.v
  const mode=req.params.mode
 firebase
   .firebase()
   .ref("maintain/" + UID).orderByChild('date').startAt(startDate).endAt(endDate)
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
  const uid = req.params.UID;
  firebase
    .firebase()
    .ref("maintain/" + uid)
    .push(req.body)
    .once("value", (d) => {
      if (d != undefined || d != null || d != "") {
        var json = {
          status: "OK",
          data: d.val(),
        };
        res.status(200).json(json);
      } else {
        var json = {
          status: 500,
          err: d.val(),
        };
        res.status(500).json(json);
      }
    });
});

module.exports = router;
