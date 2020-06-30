var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");

router.get("/:UID/:Date", (req, res) => {
  var uid = req.params.UID;
  var date = req.params.Date;
  firebase.firebase().ref().child("notification/" + uid).once('value', snapshot => {
    var list = []
    var listDate = [];
    snapshot.forEach(elem => {
      listDate.push(elem.key);
      list.push(elem.val());
    });
    const listCheck = []
    for (let i = 0; i < listDate.length; i++) {
      if (listDate[i] <= date) {
        listCheck.push(list[i]);

      }
    }
    const DataFillter = Object.assign.apply({}, listCheck)
 
  res.json(DataFillter)
 
  })

})
router.post("/:UID/:Date", (req, res) => {

  var uid = req.params.UID;
  var date = req.params.Date;

  firebase
    .firebase()
    .ref()
    .child("notification/" + uid + "/" + date)
    .push()
    .set(req.body);
  res.status(201).send("สำเร็จ");

});

module.exports = router;