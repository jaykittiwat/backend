var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/program_maintain/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    pro_maintain: "บำรุงก่อนคลอด"
  };

  firebase
    .firebase()
    .ref("/setting/farm/program_maintain/" + uid)
    .push(data);
});

module.exports = router;

