
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'secret',
    database : 'todo_app',
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public']
  }
});

class TodoStorage {

  getTodos() {
    return knex.select().from('todos').timeout(1000);
  }

  async getTodo(todoId) {
    return knex.select().from('todos').where('id', todoId).timeout(1000).first();
  }

  async addTodo(todo) {
   return knex('todos')
     .insert({
       title: todo.title,
       description: todo.description,
       due_date: knex.fn.now(),
       completed: false,
       weather: false,
       created_on: knex.fn.now(),
       updated_at: null
     }).returning('id');
    }

  async editTodo(todoId, todo) {
    return knex('todos')
      .where({ id: todoId })
      .update({
        title: todo.title,
        description: todo.description,
        due_date: knex.fn.now(),
        completed: todo.completed,
        weather: todo.weather,
        updated_at: knex.fn.now()
      }, ['id']);
  }

  async removeTodo(todoId) {
    return knex('todos')
      .where('id', todoId).del();
  }


}

module.exports = TodoStorage

