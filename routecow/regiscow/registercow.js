var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");



//ลงทะเบียนแม่โค
router.post("/registor/:UID", (req, res) => {
  const UID=req.params.UID;

      firebase
      .firebase()
      .ref()
      .child("cattle/"+UID)
      .push()
      .set(req.body);
    res.status(201).json(req.body);
  });
  

module.exports = router;