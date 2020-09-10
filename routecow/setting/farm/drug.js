var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม
router.get("/drug/:UID",(req,res)=>{
  var uid = req.params.UID;

  firebase
    .firebase()
    .ref("setting/farm/drug/" + uid)
    .once("value", snapshot => {
      var list = [];
      var KEY = [];
      var keyListgroup = [KEY, list];
      snapshot.forEach(elem => {
        KEY.push(elem.key); //วันที่ทั้งหมด
        list.push(elem.val()); //รายการของแต่ละวันที่
      });
      res.json(keyListgroup);
    });
})
router.post("/drug/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = req.body
  firebase
    .firebase()
    .ref("/setting/farm/drug/" + uid)
    .push(data).once('value',snapshot=>{
    res.json(snapshot.val())
    })
});
router.delete("/drug/:UID/:KEY",(req,res)=>{
  var uid = req.params.UID;
  var key = req.params.KEY;
  firebase.firebase().ref("/setting/farm/drug/"+uid+"/"+key).remove()
  res.end()
  console.log(uid)
})

module.exports = router;