var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/:UID/:Date",(req,res)=>{
var uid =req.params.UID;
var date =req.params.Date;
firebase.firebase().ref().child("notification/"+uid+"/"+date).once("value", snapshot => {
  
    if(snapshot.val()!==null){
        
        var list = [];
        snapshot.forEach(elem => {
          list.push(elem.val());
        });

        console.log(list)
        res.json(list).status(202)
    }
    else{
        console.log("No data")
        res.json("ไม่พบข้อมูล")
    }

  });

})
router.post("/:UID/:Date", (req, res) => {
    
    var uid=req.params.UID; 
    var date=req.params.Date; 
  
        firebase
        .firebase()
        .ref()
        .child("notification/"+uid+"/"+date)
        .push()
        .set(req.body);
        res.status(201).send("สำเร็จ");
     
    });

module.exports = router;