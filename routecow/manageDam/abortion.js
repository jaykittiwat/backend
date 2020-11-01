var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.get("/history/:uid/:cattle_id", (req, res) => {
    const UID = req.params.uid;
    const cID= req.params.cattle_id;
    firebase
      .firebase()
      .ref()
      .child("abortion/"+UID)
      .orderByChild("dam_id")
      .equalTo(cID)
      .once("value", snapshot => {
      
      const list = [];
        snapshot.forEach(elem => {
          list.push(elem.val());   
        });
        
    res.json(list)
      });
  });


    router.post("/:UID", (req, res) => {
    
        var uid = req.params.UID;
        var data = req.body;
        firebase.firebase().ref('abortion/'+uid).push(data).once('value',result=>{
            if(result.val!==undefined || d != null || d != ''){
                res.json("ok").status(200)
            }
        })
         
        });

module.exports = router;