var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//แบรนยาฟาร์ม

router.get("/corral/:UID", (req, res) => {
  var uid = req.params.UID;
  const time = new Date();
  //console.log("corral|||| "+time+"User:"+uid)
  firebase
    .firebase()
    .ref("setting/farm/corral/" + uid)
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
});

router.post("/corral/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = req.body

  firebase
    .firebase()
    .ref("/setting/farm/corral/" + uid)
    .push(data).once('value',snapshot=>{
      res.json(snapshot.val())
    })
});

router.delete("/corral/:UID/:KEY",(req,res)=>{

  var uid = req.params.UID;
  var key = req.params.KEY;
  firebase.firebase().ref("/setting/farm/corral/"+uid+"/"+key).remove()
  res.end()
})
module.exports = router;
