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

router.get('/:id', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const todos = JSON.parse(data);
        const todo = todos.find(todo => todo.id === req.params.id);
        if (!todo) {
            res.status(404).send('Todo not found');
            return;
        }
        res.send(todo);
    });

});

router.post('/', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const todos = JSON.parse(data);
        const newItem = {
            id: todos.length + 1,
            title: req.body.title,
            completed: false
        }
        todos.push(newItem);
        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                res.status(500).send('Something went wrong');
                return;
            }
            res.send('Todo added');
        });
    });
});

router.put('/:id', function (req, res, next) {
    fs.readFile('./data/todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const todos = JSON.parse(data);
        const index = todos.findIndex(todo => todo.id === parseInt(req.params.id));
        if (index === -1) {
            res.status(404).send('Todo not found');
            return;
        }
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

router.delete('/:id', function (req, res, next) {
   fs.readFile('./data/todos.json', 'utf8', (err, data) => {
       if (err) {
           res.status(500).send('Something went wrong');
           return;
       }
       const todos = JSON.parse(data);
       const index = todos.findIndex(todo => todo.id === parseInt(req.params.id));
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
