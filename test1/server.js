const express = require("express");
const app = express();
const body=require('body-parser');
const router =require('./api');

const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/router',router); 


/*app.get("/", (req, res) => {
  res.json({ message: "Ahoy!" });
});

app.get("/hello/:massage", (req, res) => {
  const { params } = req;

  res.json({ message: "Ahoy!", params });
});
*/
app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
