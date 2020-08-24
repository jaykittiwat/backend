var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/program_sync/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    pro_sync: "ProgramA"
  };

  firebase
    .firebase()
    .ref("/setting/farm/program_sync/" + uid)
    .push(data);
});

module.exports = router;
