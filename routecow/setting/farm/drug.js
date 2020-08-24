var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.post("/drug/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = {
    common_drug: "บิวตาชิว",
    dosage: "140",
    drug_name: "บิวตาชิว",
    exp_date: "2019-12-06",
    mfd_date: "2009-05-06"
  };

  firebase
    .firebase()
    .ref("/setting/farm/drug/" + uid)
    .push(data);
});

module.exports = router;
