import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const todosFilePath = path.join(__dirname, '../static/todos.json');

export default async (req, res) => {
  // Use bodyParser to parse the request body
  bodyParser.json()(req, res, async () => {
    // Check that the request method is POST or PUT
    if (req.method === 'PUT') {
      const { email } = req.body;
      const todosData = fs.readFileSync(todosFilePath);
      const todos = JSON.parse(todosData);
      console.log(todos);

      if (req.method === 'PUT')
      {
        const data = {"todo": []};
        console.log("Inside api");
        console.log(req.body);
        console.log(email, typeof email);
        todos[email] = data;
        const json_string = JSON.stringify(todos);
        console.log(json_string);
        fs.writeFileSync(todosFilePath, json_string);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todos));
    }
  });
};