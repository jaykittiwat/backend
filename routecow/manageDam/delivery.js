var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");
router.post("/:UID", (req, res) => {
    
    var uid = req.params.UID;
    var data = req.body;
    firebase.firebase().ref('delivery/'+uid).push(data).once('value',result=>{
        if(result.val!==undefined || d != null || d != ''){
            res.json("ok").status(200)
        }
    })
     
    });
module.exports = router;