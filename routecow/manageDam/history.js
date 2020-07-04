var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.post("/:UID", (req, res) => {
    
    var uid=req.params.UID; 

        firebase
        .firebase()
        .ref()
        .child("history/"+uid)
        .push()
        .set(req.body);
     
    });

module.exports = router;