const express = require('express');
const TodoStorage = require('../storage');


const router = express.Router();


const todos = new TodoStorage();

router.get('/todos', async (req, res) => {
  const data = await todos.getTodos()
  return res.json(data)
})


router.post('/todo', async (req, res) => {
  const todo = await todos.addTodo(req.body)
  const foundTodo = await todos.getTodo(todo[0].id)
  res.json(foundTodo)
})

router.put('/todo', async (req, res) => {
  const todo = await todos.editTodo(req.body.id, req.body)
  const foundTodo = await todos.getTodo(todo[0].id)
  res.json(foundTodo)
})

router.delete('/todo/:id', async (req, res) => {
  try {
    await todos.removeTodo(req.params.id)
    res.status(200).json()
  } catch (e) {
    res.status(500).json()
  }
})


module.exports = router;