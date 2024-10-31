var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Something went wrong');
          return;
        }
        res.render('index', { todos: JSON.parse(data) });
    });
});

module.exports = router;
