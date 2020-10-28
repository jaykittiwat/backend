var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.post("/:UID", (req, res) => {  
    const uid=req.params.UID; 
        firebase
        .firebase()
        .ref("maintain/"+uid)
        .push(req.body).once('value',d=>{
            if(d != undefined || d != null || d != ''){
                var json  = {
                    status: "OK",
                    data: d.val()
                }
                res.status(200).json(json);
            } else {
                var json  = {
                    status: 500,
                    err: d.val()
                }
                res.status(500).json(json);
            }
        })
        
    })


module.exports = router;