const bodyParser = require('body-parser');
const express = require("express");
const todoRoutes = require('./routes/todoRoutes.js');



const app = express();

app.use(bodyParser.json());

app.use(todoRoutes)

app.listen(8081, () => {
  console.log("app up and running...")
})

