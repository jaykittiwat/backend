var express = require('express');


var router = express.Router();
var users=require('./movie.js');
// middleware that is specific to this router

// define the home page route
router.get('/',  (req, res)=> {
  res.json(users.findAll());
  console.log(users.findAll());
})

//แบบมีเงื่อนไข
router.get('/select/:id',  (req, res)=> {
  var id = req.params.id;
	res.json(users.findById(id));
})





// define the about route
router.get('/about', (req, res)=> {
  res.send('About birds')
})

module.exports = router;

