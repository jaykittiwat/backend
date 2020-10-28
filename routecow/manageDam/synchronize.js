var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

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
