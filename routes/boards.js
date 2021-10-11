var express = require('express');
var router = express.Router();
const db = require('../models/index');

const pnum=10;

/* GET home page. */
router.get('/',(req, res, next)=> {
    db.Board.findAll(
    {
      include: [{
      model: db.Equip,
      required: true
      }]
      
      
      
    }
    ).then(board => {
    var data = {
      title: 'Boards/Index',
      content: board
    };
    res.render('boards/index', data);
  });
});

// router.get('/',(req, res, next)=> {
//     db.Board.findAll(
//     {
//       include: [{
//       model: db.Equip,
//       required: true
//       }]
//     }
//     ).then(board => {
//     var data = {
//       title: 'Boards/Index',
//       content: board
//     };
//     res.render('boards/index', data);
//   });
// });
// router.get('/',(req, res, next)=> {
//     db.Board.findAll().then(board => {
//     var data = {
//       title: 'Boards/Index',
//       content: board
//     };
//     res.render('boards/index', data);
//   });
// });

// add
router.get('/add',(req, res, next)=> {
  var data = {
    title: 'Boards/Add'
  };
  res.render('boards/add', data);
});

router.post('/add',(req, res, next)=> {
  db.sequelize.sync()
    .then(() => db.Board.create({
      equipId: req.body.equipId,
      mess: req.body.mess
    }))
    .then(board => {
      res.redirect('/boards');
    });
});


module.exports = router;