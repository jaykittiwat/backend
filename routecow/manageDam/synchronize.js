var express = require("express");
var router = express.Router();
var firebase = require("../../firebase");


router.get("/history/:uid/:cattle_id", (req, res) => {
  const UID = req.params.uid;
  const cID= req.params.cattle_id;
  firebase
    .firebase()
    .ref()
    .child("synchronize/"+UID)
    .orderByChild("dam_id")
    .equalTo(cID)
    .once("value", snapshot => {
    
    const list = [];
    const keylist=[]
      snapshot.forEach(elem => {
        list.push(elem.val());
        keylist.push(elem.key)
      });
      
 
  res.json(list)
    });
});
router.get("/historyAllSynchronize/:uid", (req, res) => {
  const UID = req.params.uid;
  firebase
    .firebase()
    .ref("synchronize/" + UID)
    .once("value", (snapshot) => {
      const list = [];
      const keylist = [];
      snapshot.forEach((elem) => {
        list.push(elem.val());
        keylist.push(elem.key);
      });

      res.json(list);
    });
});


router.get("/historyAllSynchronize/:uid/:startDate/:endDate", (req, res) => {
  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  
  firebase
    .firebase()
    .ref("synchronize/" + UID).orderByChild('datepro').startAt(startDate).endAt(endDate)
    .once("value", (snapshot) => {
      const list = [];
      const keylist = [];
      snapshot.forEach((elem) => {
        list.push(elem.val());
        keylist.push(elem.key);
      });

      res.json(list);
    });
});

router.get("/historyAllSynchronize/form01/:uid/:v/:mode", (req, res) => {

   const UID = req.params.uid;
   const v=req.params.v
   const mode=req.params.mode
  firebase
    .firebase()
    .ref("synchronize/" + UID).orderByChild(mode).equalTo(v)
    .once("value", (snapshot) => {
      const list = [];
      const keylist = [];
      snapshot.forEach((elem) => {
        list.push(elem.val());
        keylist.push(elem.key);
      });

      res.json(list);
    });
});

router.get("/historyAllSynchronize/form02/:uid/:v/:startDate/:endDate/:mode", (req, res) => {

  const startDate=req.params.startDate
  const UID = req.params.uid;
  const endDate=req.params.endDate
  const v=req.params.v
  const mode=req.params.mode
 firebase
   .firebase()
   .ref("synchronize/" + UID).orderByChild('datepro').startAt(startDate).endAt(endDate)
   .once("value", (snapshot) => {
     const list = [];
     const keylist = [];
     snapshot.forEach((elem) => {
       const d =elem.val()
       if(d[mode]===v){
         list.push(elem.val());
          keylist.push(elem.key);
       }
       
     });

     res.json(list);
   });
});




router.post("/:UID", (req, res) => {
  var uid = req.params.UID;

  firebase
    .firebase()
    .ref("/synchronize/" + uid)
    .push(req.body)
    .once("value", result => {
      if (result.val !== undefined || d != null || d != "") {
        res.json("ok").status(200);
      }
    });
});

router.post("/notisync/:UID", (req, res) => {
  var uid = req.params.UID;
const data=req.body;
data.map(list=>{


  firebase
    .firebase()
    .ref("/noti_synchronize/" + uid+"/"+list.date)
    .push(list)
})
res.send("OK")
});

router.get("/graph/:uid/:startDate/:endDate/:cattleID", (req, res) => {
  const startDate = req.params.startDate
  const UID = req.params.uid;
  const endDate = req.params.endDate
  const Cattle=req.params.cattleID
 
  firebase.firebase().ref("synchronize/" + UID).orderByChild('datepro').startAt(startDate).endAt(endDate).once("value", (snapshot) => {
    const list = [];
    let y2016 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2017 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2018 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2019 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2020 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2021 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2022 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2023 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2024 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2025 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2026 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2027 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2028 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2029 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let y2030 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const listYears = []
    let ArrmonthOfAllYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if(Cattle==="emtyp"){
      snapshot.forEach((elem) => {
        list.push(elem.val().date)
  
      })
    }
    else{
      snapshot.forEach((elem) => {
        if(Cattle===elem.val().dam_id){
          list.push(elem.val().date)
        }
      
  
      })
    }
    


    list.forEach(i => {
      i.substring(5, 7)
      if (i.substring(5, 7) === "01") {
        ArrmonthOfAllYear[0] = ArrmonthOfAllYear[0] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[0] = y2016[0] + 1
        }
        if (x === "2017") {
          y2017[0] = y2018[0] + 1
        }
        if (x === "2018") {
          y2018[0] = y2018[0] + 1
        }
        if (x === "2019") {
          y2019[0] = y2019[0] + 1
        }
        if (x === "2020") {
          y2020[0] = y2020[0] + 1
        }
        if (x === "2021") {
          y2021[0] = y2021[0] + 1
        }
        if (x === "2022") {
          y2022[0] = y2022[0] + 1
        }
        if (x === "2023") {
          y2023[0] = y2023[0] + 1
        }
        if (x === "2024") {
          y2024[0] = y2024[0] + 1
        }
        if (x === "2025") {
          y2025[0] = y2025[0] + 1
        }
        if (x === "2026") {
          y2026[0] = y2026[0] + 1
        }
        if (x === "2027") {
          y2027[0] = y2027[0] + 1
        }
        if (x === "2028") {
          y2028[0] = y2028[0] + 1
        }
        if (x === "2029") {
          y2029[0] = y2029[0] + 1
        }
        if (x === "2030") {
          y2030[0] = y2030[0] + 1
        }

      }
      if (i.substring(5, 7) === "02") {
        ArrmonthOfAllYear[1] = ArrmonthOfAllYear[1] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[1] = y2016[1] + 1
        }
        if (x === "2017") {
          y2017[1] = y2018[1] + 1
        }
        if (x === "2018") {
          y2018[1] = y2018[1] + 1
        }
        if (x === "2019") {
          y2019[1] = y2019[1] + 1
        }
        if (x === "2020") {
          y2020[1] = y2020[1] + 1
        }
        if (x === "2021") {
          y2021[1] = y2021[1] + 1
        }
        if (x === "2022") {
          y2022[1] = y2022[1] + 1
        }
        if (x === "2023") {
          y2023[1] = y2023[1] + 1
        }
        if (x === "2024") {
          y2024[1] = y2024[1] + 1
        }
        if (x === "2025") {
          y2025[1] = y2025[1] + 1
        }
        if (x === "2026") {
          y2026[1] = y2026[1] + 1
        }
        if (x === "2027") {
          y2027[1] = y2027[1] + 1
        }
        if (x === "2028") {
          y2028[1] = y2028[1] + 1
        }
        if (x === "2029") {
          y2029[1] = y2029[1] + 1
        }
        if (x === "2030") {
          y2030[1] = y2030[1] + 1
        }

      }
      if (i.substring(5, 7) === "03") {
        ArrmonthOfAllYear[2] = ArrmonthOfAllYear[2] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[2] = y2016[2] + 1
        }
        if (x === "2017") {
          y2017[2] = y2018[2] + 1
        }
        if (x === "2018") {
          y2018[2] = y2018[2] + 1
        }
        if (x === "2019") {
          y2019[2] = y2019[2] + 1
        }
        if (x === "2020") {
          y2020[2] = y2020[2] + 1
        }
        if (x === "2021") {
          y2021[2] = y2021[2] + 1
        }
        if (x === "2022") {
          y2022[2] = y2022[2] + 1
        }
        if (x === "2023") {
          y2023[2] = y2023[2] + 1
        }
        if (x === "2024") {
          y2024[2] = y2024[2] + 1
        }
        if (x === "2025") {
          y2025[2] = y2025[2] + 1
        }
        if (x === "2026") {
          y2026[2] = y2026[2] + 1
        }
        if (x === "2027") {
          y2027[2] = y2027[2] + 1
        }
        if (x === "2028") {
          y2028[2] = y2028[2] + 1
        }
        if (x === "2029") {
          y2029[2] = y2029[2] + 1
        }
        if (x === "2030") {
          y2030[2] = y2030[2] + 1
        }

      }
      if (i.substring(5, 7) === "04") {
        ArrmonthOfAllYear[3] = ArrmonthOfAllYear[3] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[3] = y2016[3] + 1
        }
        if (x === "2017") {
          y2017[3] = y2018[3] + 1
        }
        if (x === "2018") {
          y2018[3] = y2018[3] + 1
        }
        if (x === "2019") {
          y2019[3] = y2019[3] + 1
        }
        if (x === "2020") {
          y2020[3] = y2020[3] + 1
        }
        if (x === "2021") {
          y2021[3] = y2021[3] + 1
        }
        if (x === "2022") {
          y2022[3] = y2022[3] + 1
        }
        if (x === "2023") {
          y2023[3] = y2023[3] + 1
        }
        if (x === "2024") {
          y2024[3] = y2024[3] + 1
        }
        if (x === "2025") {
          y2025[3] = y2025[3] + 1
        }
        if (x === "2026") {
          y2026[3] = y2026[3] + 1
        }
        if (x === "2027") {
          y2027[3] = y2027[3] + 1
        }
        if (x === "2028") {
          y2028[3] = y2028[3] + 1
        }
        if (x === "2029") {
          y2029[3] = y2029[3] + 1
        }
        if (x === "2030") {
          y2030[3] = y2030[3] + 1
        }

      }
      if (i.substring(5, 7) === "05") {
        ArrmonthOfAllYear[4] = ArrmonthOfAllYear[4] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[4] = y2016[4] + 1
        }
        if (x === "2017") {
          y2017[4] = y2018[4] + 1
        }
        if (x === "2018") {
          y2018[4] = y2018[4] + 1
        }
        if (x === "2019") {
          y2019[4] = y2019[4] + 1
        }
        if (x === "2020") {
          y2020[4] = y2020[4] + 1
        }
        if (x === "2021") {
          y2021[4] = y2021[4] + 1
        }
        if (x === "2022") {
          y2022[4] = y2022[4] + 1
        }
        if (x === "2023") {
          y2023[4] = y2023[4] + 1
        }
        if (x === "2024") {
          y2024[4] = y2024[4] + 1
        }
        if (x === "2025") {
          y2025[4] = y2025[4] + 1
        }
        if (x === "2026") {
          y2026[4] = y2026[4] + 1
        }
        if (x === "2027") {
          y2027[4] = y2027[4] + 1
        }
        if (x === "2028") {
          y2028[4] = y2028[4] + 1
        }
        if (x === "2029") {
          y2029[4] = y2029[4] + 1
        }
        if (x === "2030") {
          y2030[4] = y2030[4] + 1
        }

      }
      if (i.substring(5, 7) === "06") {
        ArrmonthOfAllYear[5] = ArrmonthOfAllYear[5] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[5] = y2016[5] + 1
        }
        if (x === "2017") {
          y2017[5] = y2018[5] + 1
        }
        if (x === "2018") {
          y2018[5] = y2018[5] + 1
        }
        if (x === "2019") {
          y2019[5] = y2019[5] + 1
        }
        if (x === "2020") {
          y2020[5] = y2020[5] + 1
        }
        if (x === "2021") {
          y2021[5] = y2021[5] + 1
        }
        if (x === "2022") {
          y2022[5] = y2022[5] + 1
        }
        if (x === "2023") {
          y2023[5] = y2023[5] + 1
        }
        if (x === "2024") {
          y2024[5] = y2024[5] + 1
        }
        if (x === "2025") {
          y2025[5] = y2025[5] + 1
        }
        if (x === "2026") {
          y2026[5] = y2026[5] + 1
        }
        if (x === "2027") {
          y2027[5] = y2027[5] + 1
        }
        if (x === "2028") {
          y2028[5] = y2028[5] + 1
        }
        if (x === "2029") {
          y2029[5] = y2029[5] + 1
        }
        if (x === "2030") {
          y2030[5] = y2030[5] + 1
        }

      }
      if (i.substring(5, 7) === "07") {
        ArrmonthOfAllYear[6] = ArrmonthOfAllYear[6] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[6] = y2016[6] + 1
        }
        if (x === "2017") {
          y2017[6] = y2018[6] + 1
        }
        if (x === "2018") {
          y2018[6] = y2018[6] + 1
        }
        if (x === "2019") {
          y2019[6] = y2019[6] + 1
        }
        if (x === "2020") {
          y2020[6] = y2020[6] + 1
        }
        if (x === "2021") {
          y2021[6] = y2021[6] + 1
        }
        if (x === "2022") {
          y2022[6] = y2022[6] + 1
        }
        if (x === "2023") {
          y2023[6] = y2023[6] + 1
        }
        if (x === "2024") {
          y2024[6] = y2024[6] + 1
        }
        if (x === "2025") {
          y2025[6] = y2025[6] + 1
        }
        if (x === "2026") {
          y2026[6] = y2026[6] + 1
        }
        if (x === "2027") {
          y2027[6] = y2027[6] + 1
        }
        if (x === "2028") {
          y2028[6] = y2028[6] + 1
        }
        if (x === "2029") {
          y2029[6] = y2029[6] + 1
        }
        if (x === "2030") {
          y2030[6] = y2030[6] + 1
        }

      }
      if (i.substring(5, 7) === "08") {
        ArrmonthOfAllYear[7] = ArrmonthOfAllYear[7] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[7] = y2016[7] + 1
        }
        if (x === "2017") {
          y2017[7] = y2018[7] + 1
        }
        if (x === "2018") {
          y2018[7] = y2018[7] + 1
        }
        if (x === "2019") {
          y2019[7] = y2019[7] + 1
        }
        if (x === "2020") {
          y2020[7] = y2020[7] + 1
        }
        if (x === "2021") {
          y2021[7] = y2021[7] + 1
        }
        if (x === "2022") {
          y2022[7] = y2022[7] + 1
        }
        if (x === "2023") {
          y2023[7] = y2023[7] + 1
        }
        if (x === "2024") {
          y2024[7] = y2024[7] + 1
        }
        if (x === "2025") {
          y2025[7] = y2025[7] + 1
        }
        if (x === "2026") {
          y2026[7] = y2026[7] + 1
        }
        if (x === "2027") {
          y2027[7] = y2027[7] + 1
        }
        if (x === "2028") {
          y2028[7] = y2028[7] + 1
        }
        if (x === "2029") {
          y2029[7] = y2029[7] + 1
        }
        if (x === "2030") {
          y2030[7] = y2030[7] + 1
        }

      }
      if (i.substring(5, 7) === "09") {
        ArrmonthOfAllYear[8] = ArrmonthOfAllYear[8] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[8] = y2016[8] + 1
        }
        if (x === "2017") {
          y2017[8] = y2018[8] + 1
        }
        if (x === "2018") {
          y2018[8] = y2018[8] + 1
        }
        if (x === "2019") {
          y2019[8] = y2019[8] + 1
        }
        if (x === "2020") {
          y2020[8] = y2020[8] + 1
        }
        if (x === "2021") {
          y2021[8] = y2021[8] + 1
        }
        if (x === "2022") {
          y2022[8] = y2022[8] + 1
        }
        if (x === "2023") {
          y2023[8] = y2023[8] + 1
        }
        if (x === "2024") {
          y2024[8] = y2024[8] + 1
        }
        if (x === "2025") {
          y2025[8] = y2025[8] + 1
        }
        if (x === "2026") {
          y2026[8] = y2026[8] + 1
        }
        if (x === "2027") {
          y2027[8] = y2027[8] + 1
        }
        if (x === "2028") {
          y2028[8] = y2028[8] + 1
        }
        if (x === "2029") {
          y2029[8] = y2029[8] + 1
        }
        if (x === "2030") {
          y2030[8] = y2030[8] + 1
        }

      }
      if (i.substring(5, 7) === "10") {
        ArrmonthOfAllYear[9] = ArrmonthOfAllYear[9] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[9] = y2016[9] + 1
        }
        if (x === "2017") {
          y2017[9] = y2018[9] + 1
        }
        if (x === "2018") {
          y2018[9] = y2018[9] + 1
        }
        if (x === "2019") {
          y2019[9] = y2019[9] + 1
        }
        if (x === "2020") {
          y2020[9] = y2020[9] + 1
        }
        if (x === "2021") {
          y2021[9] = y2021[9] + 1
        }
        if (x === "2022") {
          y2022[9] = y2022[9] + 1
        }
        if (x === "2023") {
          y2023[9] = y2023[9] + 1
        }
        if (x === "2024") {
          y2024[9] = y2024[9] + 1
        }
        if (x === "2025") {
          y2025[9] = y2025[9] + 1
        }
        if (x === "2026") {
          y2026[9] = y2026[9] + 1
        }
        if (x === "2027") {
          y2027[9] = y2027[9] + 1
        }
        if (x === "2028") {
          y2028[9] = y2028[9] + 1
        }
        if (x === "2029") {
          y2029[9] = y2029[9] + 1
        }
        if (x === "2030") {
          y2030[9] = y2030[9] + 1
        }

      }
      if (i.substring(5, 7) === "11") {
        ArrmonthOfAllYear[10] = ArrmonthOfAllYear[10] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[10] = y2016[10] + 1
        }
        if (x === "2017") {
          y2017[10] = y2018[10] + 1
        }
        if (x === "2018") {
          y2018[10] = y2018[10] + 1
        }
        if (x === "2019") {
          y2019[10] = y2019[10] + 1
        }
        if (x === "2020") {
          y2020[10] = y2020[10] + 1
        }
        if (x === "2021") {
          y2021[10] = y2021[10] + 1
        }
        if (x === "2022") {
          y2022[10] = y2022[10] + 1
        }
        if (x === "2023") {
          y2023[10] = y2023[10] + 1
        }
        if (x === "2024") {
          y2024[10] = y2024[10] + 1
        }
        if (x === "2025") {
          y2025[10] = y2025[10] + 1
        }
        if (x === "2026") {
          y2026[10] = y2026[10] + 1
        }
        if (x === "2027") {
          y2027[10] = y2027[10] + 1
        }
        if (x === "2028") {
          y2028[10] = y2028[10] + 1
        }
        if (x === "2029") {
          y2029[10] = y2029[10] + 1
        }
        if (x === "2030") {
          y2030[10] = y2030[10] + 1
        }

      }
      if (i.substring(5, 7) === "12") {
        ArrmonthOfAllYear[11] = ArrmonthOfAllYear[11] + 1
        const x = i.substring(0, 4)
        if (x === "2016") {
          y2016[11] = y2016[11] + 1
        }
        if (x === "2017") {
          y2017[11] = y2018[11] + 1
        }
        if (x === "2018") {
          y2018[11] = y2018[11] + 1
        }
        if (x === "2019") {
          y2019[11] = y2019[11] + 1
        }
        if (x === "2020") {
          y2020[11] = y2020[11] + 1
        }
        if (x === "2021") {
          y2021[11] = y2021[11] + 1
        }
        if (x === "2022") {
          y2022[11] = y2022[11] + 1
        }
        if (x === "2023") {
          y2023[11] = y2023[11] + 1
        }
        if (x === "2024") {
          y2024[11] = y2024[11] + 1
        }
        if (x === "2025") {
          y2025[11] = y2025[11] + 1
        }
        if (x === "2026") {
          y2026[11] = y2026[11] + 1
        }
        if (x === "2027") {
          y2027[11] = y2027[11] + 1
        }
        if (x === "2028") {
          y2028[11] = y2028[11] + 1
        }
        if (x === "2029") {
          y2029[11] = y2029[11] + 1
        }
        if (x === "2030") {
          y2030[11] = y2030[11] + 1
        }

      }
    })

    res.json([ArrmonthOfAllYear, y2016, y2017, y2018, y2019, y2020, y2021, y2022, y2023, y2024, y2025, y2026, y2027, y2027, y2028, y2029, y2030])
  })
})


module.exports = router;
