const express = require('express');
const router = express.Router();
const houseRouter = require('./house/houseRoutes');
const tables =  require('../database/tables');


/**
 * The response for this request is the render of the file index.html
 * and the server will send a list with the tables that this are in @tables
**/
router.get('/', function(req, res, next) {
  res.render('index', {lista: tables});
});


/**
Ejecuta la función getAll() del modelo Activity para obtener todos
los registros que hayan en la tabla de la db para enviarlos
como JSON
**/
router.get(tables.Activity.href, function(req, res, next) {
  tables.Activity.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});


router.get(tables.Alarmconf.href, function(req, res, next) {
  tables.Alarmconf.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Alarms.href, function(req, res, next) {
  tables.Alarms.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.DetailHouse.href, function(req, res, next) {
  tables.DetailHouse.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Display.href, function(req, res, next) {
  tables.Display.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.use(tables.House.href, houseRouter);

router.get(tables.Instalation.href, function(req, res, next) {
  tables.Instalation.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.RT.href, function(req, res, next) {
  tables.RT.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Variables.href, function(req, res, next) {
  tables.Variables.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

module.exports = router;
