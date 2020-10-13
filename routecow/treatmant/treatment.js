var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");

router.post("/:UID", (req, res) => {
  const UID=req.params.UID;
      firebase.firebase().ref("treatment/"+UID).push(req.body)
    
    res.status(201).json(req.body);
  });
  router.post("/drug/:UID", (req, res) => {
    const UID=req.params.UID;
        firebase.firebase().ref("treatment/drug/"+UID).push(req.body)
      
      res.status(201).json(req.body);
    });
  

module.exports = router;