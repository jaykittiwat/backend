var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");




    router.post("/:UID", (req, res) => {
    
        var uid = req.params.UID;
        var data = req.body;
        firebase.firebase().ref('abdominal/'+uid).push(data)
         
        });

module.exports = router;