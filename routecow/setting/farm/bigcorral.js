var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/bigcorral/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    bigcorral: "01"
  };

  firebase
    .firebase()
    .ref("/setting/farm/bigcorral/" + uid)
    .push(data);
});

module.exports = router;
