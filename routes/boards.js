var express = require('express');
var router = express.Router();
const db = require('../models/index');


/* GET home page. */
router.get('/',(req, res, next)=> {
  db.Board.findAll().then(boards => {
    var data = {
      title: 'Boards/Index',
      content: boards
    };
    res.render('boards/index', data);
  });
});

router.get('/add',(req,res,next)=>{
  var data = {
    title: 'Boards/Add'
  };
  res.render('boards/add', data);
});

router.post('/add',(req, res, next)=> {
  db.sequelize.sync()
    .then(() => db.Board.create({
      mess: req.body.mess,
      tno: req.body.tno
    }))
    .then(board => {
      res.redirect('/boards');
    });
});
module.exports = router;
