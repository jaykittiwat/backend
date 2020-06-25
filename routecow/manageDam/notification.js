var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/:UID",(req,res)=>{
var uid =req.params.UID;
firebase.firebase().ref().child("notification/"+uid).once('value',snapShot=>{
    console.log(snapShot.val())
    res.json(snapShot.val())
})
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