var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนฟาร์ม

router.get("/brand/:UID", (req, res) => {
  var uid = req.params.UID;
  firebase
    .firebase()
    .ref("/setting/farm/brand/" + uid)
    .once("value", snapshot => {
      //console.log(snapshot.val());
      res.json(snapshot.val());
    });
});
//สร้าง defalt brand
router.post("/brand/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = req.body;
  firebase
    .firebase()
    .ref("/setting/farm/brand/" + uid)
    .push(data)
    .once("value", snapshot => {
      //console.log(snapshot.val());
    });
});

router.post("/brandUpdata/:UID/:KEY", (req, res) => {
  var key = req.params.KEY;
  var uid = req.params.UID;
  firebase
    .firebase()
    .ref("/setting/farm/brand/" + uid + "/" + key)
    .update(req.body);
  res.send("บันทึกสำเร็จ");
  res.end();
});

module.exports = router;
