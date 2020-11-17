var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/:UID/:cattle_id", (req, res) => {
  const uid = req.params.UID;
  const id = req.params.cattle_id;
  firebase
    .firebase()
    .ref("breed/" + uid)
    .orderByChild("dam_id")
    .equalTo(id)
    .once("value", (snapshot) => {
      res.send(snapshot.val());
      
    });
   
});
router.get("/history/:uid/:cattle_id", (req, res) => {
  const UID = req.params.uid;
  const cID= req.params.cattle_id;
  firebase
    .firebase()
    .ref()
    .child("breed/"+UID)
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


router.get("/historyAllBreed/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref("breed/" + UID)
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


router.get("/lasttime/:UID/:cattle_id", (req, res) => {
  const uid = req.params.UID;
  const id = req.params.cattle_id;
  firebase
    .firebase()
    .ref("breed/" + uid)
    .orderByChild("dam_id")
    .equalTo(id)
    .once("value", (snapshot) => {
      var list = [];
      var KEY = [];
      var keyListgroup = [KEY, list];
      snapshot.forEach((elem) => {
        if (list.length == 0) {
          KEY.push(elem.key);
          list.push(elem.val());
        }

        if (list.length != 0 &&elem.val().number_of_breeding > list[0].number_of_breeding) {
          KEY[0]=(elem.key);
          list[0]=(elem.val());
        }

      });
    
      res.json(keyListgroup);
    });
});

router.post("/:UID", (req, res) => {
  var uid = req.params.UID;

  firebase
    .firebase()
    .ref("breed/" + uid)
    .push(req.body)
    .once("value", (result) => {
      if (result.val !== undefined || d != null || d != "") {
        res.json("ok").status(200);
      }
    });
});

module.exports = router;
