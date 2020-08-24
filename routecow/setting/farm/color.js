var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//สีเขาในฟาร์ม
router.post("/color/:UID", (req, res) => {
var uid=req.params.UID
  var data = {
  color:"black"
  };

  firebase.firebase().ref("/setting/farm/color/"+uid).push(data).once('value',snapshot=>{
    console.log(snapshot.val())
})
});

module.exports = router;