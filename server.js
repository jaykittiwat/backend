const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("./firebase");
const router = require("./userAPI/userAPI");
const routerRegistorcow = require("./routecow/regiscow/registercow");
const routerRegistorclaf = require("./routecow/regiscow/registercalf");
const cattle = require("./routecow/manageDam/cattle");
const history = require("./routecow/manageDam/history");
const notification = require("./routecow/manageDam/notification");
const maintain = require("./routecow/manageDam/maintain");
const synchronize = require("./routecow/manageDam/synchronize");
const breed = require("./routecow/manageDam/breed");
const abdominal = require("./routecow/manageDam/abdominal");
const delivery = require("./routecow/manageDam/delivery");
const brand = require("./routecow/setting/farm/brand");
const color = require("./routecow/setting/farm/color");
const drug =require("./routecow/setting/farm/drug");
const herd = require("./routecow/setting/farm/herd_num");
const program_maintain = require("./routecow/setting/farm/program_maintain");
const program_sync= require("./routecow/setting/farm/program_sync");
const strian = require("./routecow/setting/farm/strian");
const bigcorral = require("./routecow/setting/farm/bigcorral");
const corral =  require("./routecow/setting/farm/corral");
const settingNoti =  require("./routecow/setting/farm/notification");
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
app.use("/user/calf", header, routerRegistorclaf); //ลงทะเบียน]^dวัว
app.use("/cattle", header, cattle); //จัดการแม่โคบำรุง
app.use("/history", header, history); //จัดการแม่โคบำรุง
app.use("/maintain", header, maintain); //จัดการแม่โคบำรุง
app.use("/notification", header, notification); //จัดการแม่โคบำรุง
app.use("/synchronize", header, synchronize); //เหี่นยวนำ
app.use("/breed", header, breed); //ผสม
app.use("/abdominal", header, abdominal); //ตรวจท้อง
app.use("/delivery", header, delivery); //ตรวจท้อง
app.use("/settingbrand", header, brand); //ตัั้งค่าแบรน
app.use("/settingcolor", header, color); //ตัั้งค่าสีโค
app.use("/settingdrug", header, drug); //ตัั้งค่ายา
app.use("/settingherd", header, herd); //ตัั้งค่าโรงเรือน
app.use("/settingbigcorral", header, bigcorral); //ตัั้งค่าคอก
app.use("/settingcorral", header, corral); //ตัั้งค่าฝูง
app.use("/settingprogram_maintain", header, program_maintain); //ตัั้งค่าprogram_maintain
app.use("/settingprogram_sync", header, program_sync); //ตัั้งค่าprogram_sync
app.use("/settingstrian", header, strian); //ตัั้งค่าสายพันธุ์
app.use("/settingNoti", header, settingNoti ); //ตัั้งค่าสายพันธุ์



const port = 4000;
app.listen(port, () => {
  console.log("Application is running on port " + port);
});
