const express = require('express');
const router = express.Router();
const { getTodo, addTodo, todoById, updateTodoById, deleteTodoById } = require('../controllers/alltodo');

const verifyToken = require('../Middleware/VeritfyToken');

router.get('/todos', verifyToken, getTodo);
router.post('/todos/create', verifyToken, addTodo);
router.get('/todos/:id', verifyToken, todoById);
router.patch('/todos/:id/update', verifyToken, updateTodoById);
router.delete('/todos/:id/delete', verifyToken, deleteTodoById);


module.exports = router;