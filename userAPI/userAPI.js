var express = require("express");
var router = express.Router();
var firebase = require("../firebase.js");
// :uid รับตัวอักษร
router.get("/logIn/:uid", (req, res) => {
  const UID = req.params.uid;

  firebase.firebase().ref().child("user").orderByChild("email").equalTo(UID) .on("value", snapshot => {
      var list = [];
      snapshot.forEach(elem => {
        list.push(elem.val());
      });
      res.json(list)/*.status(201)*/;
      //console.log(list);
    });
});

router.post("/registor", (req, res) => {
  firebase.firebase().ref().child("user").push().set(req.body);
  res.status(201);
});

module.exports = router;
