var express = require("express");
var router = express.Router();
var firebase = require("../firebase.js");
// :uid รับตัวอักษร
router.get("/logIn/:uid", (req, res) => {
  const UID=req.params.uid;

  firebase
    .firebase()
    .ref()
    .child("user")
    .orderByChild("email")
    .equalTo(UID)
    .on("value", snapshot => {
      var list = [];
      snapshot.forEach((elem)=> {
        list.push(elem.val());
    });
    //ส่งค่ากลับไป
 res.json(list);
      console.log(list);

    });
});

router.post("/registor", (req, res) => {
  firebase
    .firebase()
    .ref()
    .child("user")
    .push()
    .set(req.body);
  res.status(201).json(req.body);
});

module.exports = router;
