var express = require("express");
var router = express.Router();
var firebase = require("../../../firebase");
//ฝุง
router.get("/herd_num/:UID", (req, res) => {
  var uid = req.params.UID;
  const time = new Date()
  //console.log("herd|||| "+time+"User:"+uid)
  firebase
    .firebase()
    .ref("setting/farm/herd_num/"+uid )
    .once('value',snapshot=>{
      var list = [];
      var KEY = [];
      var keyListgroup=[KEY,list]
      snapshot.forEach(elem => {
        KEY.push(elem.key);//วันที่ทั้งหมด
        list.push(elem.val());//รายการของแต่ละวันที่
      });
     res.json(keyListgroup)
   
    });
});

router.post("/herd_num/:UID", (req, res) => {
  var uid = req.params.UID;
  var data = req.body

  firebase
    .firebase()
    .ref("/setting/farm/herd_num/" + uid)
    .push(data).once('value',snapshot=>{
      res.json(snapshot.val())
    })
});
router.delete("/herd_num/:UID/:KEY",(req,res)=>{
  var uid = req.params.UID;
  var key = req.params.KEY;
  firebase.firebase().ref("/setting/farm/herd_num/"+uid+"/"+key).remove()
  res.end()
})

module.exports = router;
