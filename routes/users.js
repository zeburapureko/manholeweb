var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/',(req, res, next)=> {
  db.User.findAll().then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    };
    res.render('users/index', data);
  });
});

// add
router.get('/add',(req, res, next)=> {
  var data = {
    title: 'Users/Add'
  };
  res.render('users/add', data);
});

router.post('/add',(req, res, next)=> {
  db.sequelize.sync()
    .then(() => db.User.create({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      note: req.body.note
    }))
    .then(usr => {
      res.redirect('/users');
    });
});

// edit
router.get('/edit',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Edit',
      form: usr
    };
    res.render('users/edit', data);
  });
});

router.post('/edit',(req, res, next)=> {
  db.User.findByPk(req.body.id)
  .then(usr => {
    usr.name = req.body.name;
    usr.pass = req.body.pass;
    usr.mail = req.body.mail;
    usr.age = req.body.age;
    usr.save().then(()=>res.redirect('/users'));
  });
});

// delete
router.get('/delete',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Delete',
      form: usr
    }
    res.render('users/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.User.findByPk(req.body.id)
  .then(usr => {
    usr.destroy().then(()=>res.redirect('/users'));
  });
});


module.exports = router;
