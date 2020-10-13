var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");
router.get("/notiAll/:UID", (req, res) => {
  var uid = req.params.UID;
  firebase
    .firebase()
    .ref()
    .child("notificationTreatment/" + uid)
    .once("value", snapshot => {
      //console.log(snapshot.val())
      var list = [];
      var listDate = [];
      snapshot.forEach(elem => {
        listDate.push(elem.key);//keyวันที่ทั้งหมด
        list.push(elem.val());//รายการของแต่ละวันที่
      });
      //เก็บข้อมูบลโคที่ต้องมีการแจ้งเตือน
      const listEmpty={date:'No'}
      const listCheck = [];
      for (let i = 0; i < listDate.length; i++) {
          listCheck.push(list[i]);//เก็บข้อมูล ที่ต้องมีการบันทึก    
      }
      if(listCheck.length==0){
        res.json(listEmpty)
      }
      if(listCheck.length!=0){
        const DataFillter = Object.assign.apply({}, listCheck);
        res.json(DataFillter);
      }
    });
});
router.post("/:UID", (req, res) => {
  const UID=req.params.UID;
      firebase.firebase().ref("treatment/"+UID).push(req.body)
    
    res.status(201).json(req.body);
  });


    router.post("/noti/:UID/:Date", (req, res) => {
      const uid=req.params.UID;
      var date = req.params.Date;
      var data=req.body;
          firebase.firebase().ref("notificationTreatment/" + uid + "/" + date).push(data)
        res.status(201).json(req.body);
      });
  

module.exports = router;