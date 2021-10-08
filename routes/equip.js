var express = require('express');
var router = express.Router();
const db = require('../models/index');

const pnum=10;

/* GET home page. */
router.get('/',(req, res, next)=> {
  db.Equip.findAll(
    {
      include: [{
      model: db.User,
      required: true
      }]
    }
    
    ).then(equip => {
    var data = {
      title: 'equip/Index',
      content: equip
    };
    res.render('equip/index', data);
  });
});

router.get('/add/:user/:id',(req, res, next)=> {
  const id = req.params.id * 1;
  const user=req.params.user;
   var data = {
    title: 'Equip/Add',
    userId:id,
    userName:user,
  };
  res.render('equip/add', data);
});

router.post('/add',(req, res, next)=> {
  db.sequelize.sync()
    .then(() => db.Equip.create({
      userId: req.body.userId,
      tno: req.body.tno
    }))
    .then(usr => {
      res.redirect('/equip/home/'+req.body.userName+ '/' +req.body.userId+'/0');
      // res.redirect('/equip/home/'+);

    });
});

router.get('/home/:user/:id/:page',(req, res, next)=> {
  const id = req.params.id * 1;
  const pg = req.params.page * 1;
  const user =req.params.user;
  db.Equip.findAll({
    where: {userId: id},
    offset: pg * pnum,
    limit: pnum,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
      model: db.User,
      required: true
    }]
  }).then(brds => {
    var data = {
      title: 'Equip:home',
      userId:id,
      userName:user,
      content: brds,
      page:pg
    };
    console.log("brds=",brds);
    res.render('equip/home', data);
  });
});



module.exports = router;
