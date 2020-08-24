var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/herd_num/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    herd_num: "01"
  };

  firebase
    .firebase()
    .ref("/setting/farm/herd_num/" + uid)
    .push(data);
});

module.exports = router;
