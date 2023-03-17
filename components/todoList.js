import axios from "axios";
export default {
  //adds new todo to the database aka JSON
  addNewTodo(newTodo, newTodoDesc, user_email) {
     if (!newTodo.trim() || !newTodoDesc.trim()) {
    return
  }
  axios.post('/api/todos', {
    email: user_email,
    newTodo: {
      title: newTodo,
      description: newTodoDesc,
      completed: false
    }
  })
  .then(function (response) {
    console.log('Todo added successfully');
  });
    },

    //removes todo from the database aka JSON
removeOldTodo(searchTodo, item, user_email) {
const index = searchTodo.indexOf(item);
searchTodo.splice(index, 1);
  axios.delete('/api/todos', {
    data: {
      email: user_email,
      newTodo: {
        title: item.title,
        description: item.description,
        completed: item.completed
      }
    }
  })
  },

    //updates todo completed in the database aka JSON
    markTodoComplete(todo, user_email) {
      axios.put('/api/todos', {
        email: user_email,
        newTodo: {
          title: todo.title,
          description: todo.description,
          completed: !todo.completed
        }
      })
      .then(function (response) {
        console.log('Todo updated successfully');
      });
      todo.completed = !todo.completed;
    },
}