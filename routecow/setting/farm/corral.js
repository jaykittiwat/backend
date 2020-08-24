var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/corral/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    corral: "01"
  };

  firebase
    .firebase()
    .ref("/setting/farm/corral/" + uid)
    .push(data);
});

module.exports = router;
