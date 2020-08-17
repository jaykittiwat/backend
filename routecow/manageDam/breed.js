var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.get("/:UID/:cattle_id",(req,res)=>{
    const uid = req.params.UID;
    const id=req.params.cattle_id;
  firebase
    .firebase()
    .ref("breed/"+uid)
    .orderByChild("dam_id")
    .equalTo(id)
    .once("value", snapshot => {
     res.send(snapshot.val())
  
    });
  
})

    router.post("/:UID", (req, res) => {
    
        var uid=req.params.UID; 
    
            firebase
            .firebase()
            .ref("breed/"+uid)
            .push(req.body).once('value',result=>{
                if(result.val!==undefined || d != null || d != ''){
                    res.json("ok").status(200)
                }
            })
      
         
        });

module.exports = router;