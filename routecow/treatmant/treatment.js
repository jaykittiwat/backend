var express = require("express");
var router = express.Router();
var firebase = require("./../../firebase");

router.post("/:UID", (req, res) => {
  const UID=req.params.UID;
      firebase.firebase().ref("treatment/"+UID).push(req.body)
    
    res.status(201).json(req.body);
  });


    router.post("/noti/:UID/:Date", (req, res) => {
      const uid=req.params.UID;
      var date = req.params.Date;
      var data=req.body;
          firebase.firebase().ref("notificationTreatment/" + uid + "/" + date).push(data)
        res.status(201).json(req.body);
      });
  

module.exports = router;