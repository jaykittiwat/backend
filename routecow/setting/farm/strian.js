var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนสายพันธุ์
router.get("/strian/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    strian: "พื้นเมือง"
  };

  firebase
    .firebase()
    .ref("/setting/farm/strian/" + uid)
    .push(data);
});

module.exports = router;
