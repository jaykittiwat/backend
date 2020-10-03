var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");
router.get("/:UID", (req, res) => {
    const uid = req.params.UID;
    firebase
      .firebase()
      .ref("wean/"+uid)
      .once("value", (snapshot) => {
        var list = [];
        var KEY = [];
        var keyListgroup = [KEY, list];
        snapshot.forEach((elem) => {
          KEY.push(elem.key);
          list.push(elem.val());
        });
        res.json(keyListgroup)
      });
  });
  
  router.post("/:UID", (req, res) => {
    var uid = req.params.UID;
    firebase
      .firebase()
      .ref("wean/" + uid)
      .push(req.body)
      .once("value", (result) => {
        if (result.val !== undefined || d != null || d != "") {
          res.json("ok").status(200);
        }
      });
  });
  router.post("/update/:UID/:key_cattle", (req, res) => {
    var key=req.params.key_cattle;
    var uid=req.params.UID; 
   firebase.firebase().ref("wean/"+uid+"/"+key).update(req.body);
   res.send("บันทึกสำเร็จ")
   res.end();

  });
module.exports = router;