var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");
router.get("/:UID", (req, res) => {
    const uid = req.params.UID;
    firebase
      .firebase()
      .ref("dishorn/" + uid)
      .once("value", (snapshot) => {
        var list = [];
        var KEY = [];
        var keyListgroup = [KEY, list];
        snapshot.forEach((elem) => {
          KEY.push(elem.key);
          list.push(elem.val());
        });
        res.json(keyListgroup);
      });
  });
  
  router.post("/:UID", (req, res) => {
    var uid = req.params.UID;
  
    firebase
      .firebase()
      .ref("dishorn/" + uid)
      .push(req.body)
      .once("value", (result) => {
        if (result.val !== undefined || d != null || d != "") {
          res.json("ok").status(200);
        }
      });
  });
module.exports = router;