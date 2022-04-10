//IGNORE THE COMMENTED OUT CODE
require("dotenv").config();
const fs = require("fs");
const express = require("express");
var http = require("http");
const app = express();
const path = require("path");
const port = 8080;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");
const todoFilePath = process.env.BASE_JSON_PATH;

//Saving todos from todos.json into variable
let todos = require(__dirname + todoFilePath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());

// app.use("/", express.static(path.join(__dirname, "public")));

// app.get("/", (_, res) => {

//   res.sendFile("./public/index.html", { root: __dirname });

//   res.status(501).end();
// });

// app.use("/todos", express.static(path.join(__dirname, "public")));

// app.get('/todos', (_, res) => {

//   res.header("Content-Type","application/json");
//   res.sendFile(todoFilePath, { root: __dirname });

//   res.status(501).end();
// });

//my own
// var server = http
// .createServer(function (request, response) {
// fs.readFile("./index.html", function (err, html) {
//   if (err) {
//     throw err;
//   }
//   if (
//     request.method == "GET" &&
//     request.url.endsWith("/")
//     ) {
//       response.writeHeader(200, {"Content-Type": "text/html"});
//       response.write(html);
//     } else {
//       response.writeHeader(404, {"Content-Type": "text/html"});
//       response.write("Sorry file not found");
//     }
//       response.end();
//   });
// })
// app.listen(8080, function(){
//     console.log("Server started on port 8080")
//   })

//1. Add GET request with path '/'
// this works
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//2. Add GET request with path '/todos'
// this works
app.get("/todos", function (req, res) {
  res.send(todos);
  console.log(todos);
  // res.sendFile(__dirname + "/models/todos.json");
});

// 3. Add GET request with path '/todos/:id'
//this works
app.get("/todos/:id", function (req, res) {
  console.log(req.params.id);
  var foundToDo = todos.find((todo) => req.params.id === todo.id);
  console.log(foundToDo);
  if (!foundToDo) {
    res.status(501).send("Sorry cannot find todos");
    res.end();
  }
  res.send(foundToDo);
});

//4.Add GET request with path '/todos/overdue'
// get due date, if due date more than today return todos
// app.get("/todos/overdue", function (req, res) {
//   console.log(req.params.due);
//   var findDueDate = todos.find((overdue) => req.params.due === todo.due);
//   console.log(findDueDate);

//5.Add GET request with path '/todos/completed'
// app.route("/todos/:completed")
// .get(function(req, res){
//   todos.find({completed: req.params.completed }, function(err, foundtodos){
//     if (foundtodos) {
//       res.send(foundtodos);
//     } else {
//       res.send("No completed todos found.");
//     }
//   });
// });
 
// console.log(req.params.completed);
//   var completed = todos.find((true), req.params.completed === true.completed);
//   console.log(completed);
//   if (!completed) {
//     res.status(501).send("Sorry cannot find any completed");
//     res.end();
//   }
//   res.send(completed);
// });

//6.Add POST request with path '/todos'
//this works
app.post('/todos', (req, res) => {
  const newEntry = {
    id: "1234567",
    name: "Just post",
    created: "2021-10-20T18:25:43.511Z",
    due: "2022-11-23T23:05:03.352Z",
    completed: false,
  };

  if (!newEntry) {
    res.status(400).json({ msg: `include id` });
  }
  
  todos.push(newEntry);
    res.json(todos);
  });

//7.Add PATCH request with path '/todos/:id

//8.Add POST request with path '/todos/:id/complete
// app.post('/todos/:id/complete', (req, res) => {

//9.Add POST request with path '/todos/:id/undo

//10.Add DELETE request with path '/todos/:id
//attempt 1
// app.delete("/todos/:id", function (req, res) {
//     var FindToDo = todos.delete((todo) => req.params.id === todo.id);
//       console.log(FindToDo);
//       if (!FindToDo) {
//         res.status(403).send("Bad Request");
//         res.end();
//       }
//       res.send(FindToDo);
//     });

//attempt 2
    // app.delete("/todos/:id", function(req, res, next) {
    //   todos.delete({id: req.params.id},function(err,todos) {
    //     console.log("Deleting id " + req.params.id);
    //     res.json(todos);
    //   })
    // });

//attempt 3 
app.delete('/todos/:id', (req, res) => {
  const found = todos.some(todo => todo.id === req.params.id);

  if (!found) {
    res.status(400).json({ msg: `No such id ${req.params.id}` });
  } else {
    todos.filter(todo => todo.id !== req.params.id);
    res.json(todos);
  }
});


 
// app.listen(port, function () {
//     console.log(`Node server is running... http://localhost:${port}`);
// });

app.listen(8080, function () {
  console.log("Server started on port 8080");
});

module.exports = app;
