const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const todosFilePath = path.join(__dirname, '../static/todos.json');

export default async (req, res) => {
  // Use bodyParser to parse the request body
  bodyParser.json()(req, res, async () => {
    // Check that the request method is POST or PUT
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      // Get the email and todo data from the request body
      const { email, newTodo } = req.body;

      // Read the JSON file
      const todosData = fs.readFileSync(todosFilePath);

      // Parse the JSON data
      const todos = JSON.parse(todosData);

      // Find the user's todos array and update the completed status of the todo
      if (req.method === 'PUT'){
        if(todos[email]) {
        const index = todos[email].todo.findIndex(t => t.title === newTodo.title);
        if (index !== -1) {
          todos[email].todo[index].completed = newTodo.completed;
        }
      }
    }

        // If the request method is POST, add the todo to the user's todos array
        if (req.method === 'POST') {
            if(req.body === undefined || Object.keys(req.body).length === 0) {
                return;
            }
            if(todos[email]) {
            console.log(newTodo);
            todos[email].todo.push(newTodo);
            }
        }

        // If the request method is DELETE, delete the todo from the user's todos array
        if (req.method === 'DELETE') {
            if(req.body === undefined || Object.keys(req.body).length === 0) {
                return;
            }
            if(todos[email]) {
            const index = todos[email].todo.findIndex(t => t.title === newTodo.title);
            console.log(index);
            if (index !== -1) {
                todos[email].todo.splice(index,1);
            }
            }
        }
        
      // Write the updated JSON data to the file
      fs.writeFileSync(todosFilePath, JSON.stringify(todos));

      // Send a response indicating success
      const response = await fetch('http://localhost:3000/api/todos', { method: 'POST' });
      const data = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    } 
    else {
      // If the request method is not POST or PUT, send a 405 error
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Method not allowed');
    }
  });
};
