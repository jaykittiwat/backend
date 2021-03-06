var express = require("express");
var router = express.Router();
var firebase = require("../firebase.js");

router.get("/logIn/:uid", (req, res) => {
  const UID = req.params.uid;

  firebase
    .firebase()
    .ref()
    .child("User")
    .orderByChild("email")
    .equalTo(UID)
    .once("value", snapshot => {
    
      var list = [];
      snapshot.forEach(elem => {
        list.push(elem.val());
      });
   
  
      res.json(list)
      
    });
});


router.get("/logInport/port", (req, res) => {
res.json(process.env.PORT)
});


router.get("/profile/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref()
    .child("User")
    .orderByChild("email")
    .equalTo(UID)
    .once("value", snapshot => {
    
      var list = [];
      var keylist=[]
      snapshot.forEach(elem => {
        list.push(elem.val());
        keylist.push(elem.key)
      });
      
    var resData ={
      key:keylist[0],
      address: list[0].address,
      pass:list[0].pass,
      email: list[0].email,
      fname: list[0]. fname,
      lname: list[0].lname,
      phone_num: list[0].phone_num,
      privilege: list[0].privilege,
      user: list[0].user,
      adminfarm:list[0].adminfarm
    }
  res.json(resData)
    });
});
router.get("/checkAdmin", (req, res) => {
 
  firebase
    .firebase()
    .ref()
    .child("User")
    .orderByChild("privilege")
    .equalTo("เจ้าของฟาร์ม")
    .once("value", snapshot => {
    
      var list = [];
      var keylist=[]
      snapshot.forEach(elem => {
        list.push(elem.val());
        keylist.push(elem.key)
      });
   const privatelist=[]
   list.map(i=>{
     privatelist.push(i.user)
   })
  res.json(privatelist)
    });
});

router.get("/checkemployee/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref()
    .child("User")
    .orderByChild("adminfarm")
    .equalTo(UID)
    .once("value", snapshot => {
    
      var list = [];
      var keylist=[]
      snapshot.forEach(elem => {
        list.push(elem.val());
        keylist.push(elem.key)
      });
      res.json([keylist,list])
 
    });
});

//บันทึกข้อมูลUser มีสมัครสมาชิก
router.post("/registor", (req, res) => {
  firebase
    .firebase()
    .ref("/User")
    .push(req.body)
    res.send("")
});

router.post("/updataProfile", (req, res) => {
  var key = req.body.key
  var data={
    address:req.body.address ,
    pass:req.body.pass ,
    email:req.body.email,
    fname:req.body.fname ,
    lname:req.body.lname,
    phone_num:req.body.phone_num ,
    privilege:req.body.privilege,
    user:req.body.user
  }
  
  firebase
    .firebase()
    .ref("/User/" + key)
    .update(data);
  res.send("บันทึกสำเร็จ");
  res.end();
});
router.post("/status/employee", (req, res) => {
  var key = req.body.key
  var data={privilege:req.body.privilege}
 firebase
    .firebase()
    .ref("/User/" + key)
    .update(data);
  res.send("บันทึกสำเร็จ");
  res.end();
});

module.exports = router;
