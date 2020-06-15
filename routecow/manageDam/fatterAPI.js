var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");



//ลงทะเบียนวัว
router.get('/fatten/:UID',  (req, res)=> {
res.json("Fatten:"+req.params.UID);
  })



module.exports = router;