var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");
//ลงทะเบียนแม่โค
router.post("/registorCalf/:UID", (req, res) => {
  const UID=req.params.UID;
      firebase.firebase().ref("calf/"+UID).push(req.body)
    
    res.status(201).json(req.body);
  });
  

module.exports = router;