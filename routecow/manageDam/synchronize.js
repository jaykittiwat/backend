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
