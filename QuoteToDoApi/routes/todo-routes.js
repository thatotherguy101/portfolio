const express = require('express');

const todoControllers = require('../controllers/todos-controller');

const router = express.Router();

router.get('/', todoControllers.getAllTodos);

router.post('/', todoControllers.addTodo);

router.patch('/:id', todoControllers.updatedTodo);

router.delete('/:id', todoControllers.deleteTodo);

module.exports = router;