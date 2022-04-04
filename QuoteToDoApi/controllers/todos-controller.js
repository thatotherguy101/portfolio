const Todo = require('../models/todo');

async function getAllTodos(req, res, next) {
    let todos;

    try {
        todos = await Todo.getAllTodos();
    } catch (error) {
        return next(error);
    }

    res.json({
        todos: todos,
    });
}

async function addTodo(req, res, next) {
    const todoText = req.body.text;

    const todo = new Todo(todoText);

    let newId;

    try {
        const result = await todo.save();
        console.log(result);
        newId = result.insertedId;
    } catch (error) {
        return next(error);
    }

    todo.id = newId.toString();

    res.json({ message: 'Todo added successfully', createdTodo: todo });
}

async function updatedTodo(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;

    console.log(text);
    const todo = new Todo(text, id);

    try {
        await todo.save();
    } catch (error) {
        return next(error);
    }

    res.json({ message: 'Todo updated', updatedTodo: todo });
}

async function deleteTodo(req, res, next) {
    const id = req.params.id;
    const todo = new Todo(null, id);

    try {
        await todo.delete();
    } catch (error) {
        return next(error);
    }

    res.json({ message: 'Todo deleted' });
}

module.exports = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    updatedTodo: updatedTodo,
    deleteTodo: deleteTodo,
};
