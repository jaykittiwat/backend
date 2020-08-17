const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("./firebase");
const router = require("./userAPI/userAPI");
const routerRegistorcow = require("./routecow/regiscow/registercow");
const routerRegistorclaf=require("./routecow/regiscow/registercalf");
const cattle = require("./routecow/manageDam/cattle");
const history=require("./routecow/manageDam/history");
const notification=require("./routecow/manageDam/notification")
const maintain=require('./routecow/manageDam/maintain');
const synchronize=require('./routecow/manageDam/synchronize');
const breed=require('./routecow/manageDam/breed');
const abdominal=require('./routecow/manageDam/abdominal')
const delivery=require('./routecow/manageDam/delivery')
//body-paser สำหรับ post method
app.locals.firebase = firebase;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var header = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  next();
};

app.use("/user", header, router); //เปลี่ยนpath ของไฟร์api    router=req(ข้างบน) เพื่อความถูดกต้องของข้อมูล้อง
app.use("/user/cow", header, routerRegistorcow); //ลงทะเบียนแม่วัว
app.use("/user/calf", header, routerRegistorclaf);//ลงทะเบียน]^dวัว
app.use("/cattle", header, cattle); //จัดการแม่โคบำรุง
app.use("/history", header, history); //จัดการแม่โคบำรุง
app.use("/maintain", header, maintain); //จัดการแม่โคบำรุง
app.use("/notification", header, notification); //จัดการแม่โคบำรุง
app.use("/synchronize", header, synchronize); //เหี่นยวนำ
app.use("/breed", header, breed); //ผสม
app.use("/abdominal", header,abdominal);//ตรวจท้อง
app.use("/delivery", header,delivery);//ตรวจท้อง

const port = 4000;
app.listen(port, () => {
  console.log("Application is running on port " + port);
});
