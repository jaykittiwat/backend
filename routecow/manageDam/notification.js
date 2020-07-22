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
      //console.log(snapshot.val())
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
        //console.log(DataFillter)
        res.json(DataFillter);
      }
      if(listCheck.length!=0&&listCheckoverdate!=0){
        const DataFillter = Object.assign.apply({}, listCheck);
        //console.log(DataFillter)
        res.json(DataFillter);
      }
       
    
     
    
    });
});


router.post("/:UID/:Date", (req, res) => {
  var uid = req.params.UID;
  var date = req.params.Date;
  var data=req.body;
//console.log(date)
  firebase
    .firebase()
    .ref("notification/" + uid + "/" + date)
    .push(data).once('value',d=>{
      if(d != undefined || d != null || d != ''){
        var json  = {
            status: "OK",
            data: d.val()
        }
     
        res.status(200).json(json);
    }
    else {
      var json  = {
          status: 500,
          err: d.val()
      }
      //console.log(json)
      res.status(500).json(json);
  }

    })
    
 
});

// delete date of notification
router.delete('/delete/:UID/:Date/:Key', (req, res) => {
  var key=req.params.Key
  var uid = req.params.UID;
  var date = req.params.Date;

  firebase.firebase().ref("notification/"+uid+"/"+date+"/"+key).remove();
})


router.get("/CheckUp/:UID/:Date", (req, res) => {
  var uid = req.params.UID;
  var date = req.params.Date;

  //ดึงข้อมูลมาทั้งหมด
  firebase
    .firebase()
    .ref()
    .child("notification/" + uid)
    .once("value", snapshot => {
      //console.log(snapshot.val())
      var list = [];
      var listDate = [];

      snapshot.forEach(elem => {
        listDate.push(elem.key);//วันที่ทั้งหมด
        list.push(elem.val());//รายการของแต่ละวันที่
      });
      if(list.length!==0){
        const DataFillter = Object.assign.apply({}, list);
        res.json(DataFillter)
      }
      else{
        const listEmpty={date:'No'}
        res.json(listEmpty)
      }
  
    
     
    
    });
});

module.exports = router;
