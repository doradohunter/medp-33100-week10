var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        res.send(data);
    });
});

router.post('/', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const todos = JSON.parse(data);
        todos.push(req.body);
        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                res.status(500).send('Something went wrong');
                return;
            }
            res.send('Todo added');
        });
    });
});

router.put('/', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const todos = JSON.parse(data);
        const index = todos.findIndex(todo => todo.title === req.body.title);
        todos[index].completed = req.body.completed;
        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                res.status(500).send('Something went wrong');
                return;
            }
            res.send('Todo updated');
        });
    });
});

router.delete('/', function (req, res, next) {
   fs.readFile('./data/todos.json', 'utf8', (err, data) => {
       if (err) {
           res.status(500).send('Something went wrong');
           return;
       }
       const todos = JSON.parse(data);
       const index = todos.findIndex(todo => todo.title === req.body.title);
       todos.splice(index, 1);
       fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
           if (err) {
               res.status(500).send('Something went wrong');
               return;
           }
           res.send('Todo deleted');
       });
   });
});

module.exports = router;
