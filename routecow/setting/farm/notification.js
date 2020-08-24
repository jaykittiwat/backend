var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนสายพันธุ์
router.post("/noti/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    day_length: 193,
    id_noti: 2,
    list: "คลอด",
    note: ""
  };

  firebase
    .firebase()
    .ref("/setting/notification/" + uid)
    .push(data);
});

module.exports = router;
