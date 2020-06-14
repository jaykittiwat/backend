const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router =require('./userAPI/userAPI');
const routerRegistorcow =require('./routecow/regiscow/registercow');
const firebase=require('./firebase');
//body-paser สำหรับ post method 
app.locals.firebase = firebase;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var header = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  next();
};




app.use('/user',header,router);//เปลี่ยนpath ของไฟร์api    router=req(ข้างบน) เพื่อความถูดกต้องของข้อมูล้อง 
app.use('/user/cow',header,routerRegistorcow);//ลงทะเบียนวัว


const port = 4000;
app.listen(port, () => {
  console.log("Application is running on port "+port);
});
