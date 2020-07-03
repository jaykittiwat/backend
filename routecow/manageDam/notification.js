var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/:UID/:Date", (req, res) => {
  var uid = req.params.UID;
  var date = req.params.Date;

  //ดึงข้อมูลมาทั้งหมด
  firebase
    .firebase()
    .ref()
    .child("notification/" + uid)
    .once("value", snapshot => {
      console.log(snapshot.val())
      var list = [];
      var listDate = [];

      snapshot.forEach(elem => {
        listDate.push(elem.key);//วันที่ทั้งหมด
        list.push(elem.val());//รายการของแต่ละวันที่
      });


      //เก็บข้อมูบลโคที่ต้องมีการแจ้งเตือน
      const listEmpty={date:'No'}
      const listCheck = [];
      const listCheckoverdate=[]
      for (let i = 0; i < listDate.length; i++) {
        if (listDate[i] <= date) {
          listCheck.push(list[i]);//เก็บข้อมูล ที่ต้องมีการบันทึก 
        }
        else{
          listCheckoverdate.push(list[i]);
        }
      }
      
      if(listCheck.length==0&&listCheckoverdate==0){
        res.json(listEmpty)
      }
      if(listCheck.length==0&&listCheckoverdate!=0){
        res.json(listEmpty)
      }
      if(listCheck.length!=0&&listCheckoverdate==0){
        const DataFillter = Object.assign.apply({}, listCheck);
        console.log(DataFillter)
        res.json(DataFillter);
      }
      if(listCheck.length!=0&&listCheckoverdate!=0){
        const DataFillter = Object.assign.apply({}, listCheck);
        console.log(DataFillter)
        res.json(DataFillter);
      }
       
    
     
    
    });
});


router.post("/:UID/:Date", (req, res) => {
  var uid = req.params.UID;
  var date = req.params.Date;

  firebase
    .firebase()
    .ref()
    .child("notification/" + uid + "/" + date)
    .push()
    .set(req.body);
  res.status(201).send("สำเร็จ");
});


router.delete('/delete/:UID/:Date/:Key', (req, res) => {
  var key=req.params.Key
  var uid = req.params.UID;
  var date = req.params.Date;

  firebase.firebase().ref().child("notification/"+uid+"/"+date+"/"+key).remove();
 

 
})

module.exports = router;
