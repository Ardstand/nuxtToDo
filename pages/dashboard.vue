<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">Dashboard</v-card-title>
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Your To-Do List</v-list-item-title>
                <div id="app" data-app>
                <v-select
                  v-model="filter"
                  :items="['all', 'completed', 'not completed']"
                  label="Filter"
                  :value="'all'"
                  :item-text="item => `${item.name}`"
                ></v-select>
              </div>
              <!--add a search bar-->
              <form>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  v-on:keydown.enter.prevent
                ></v-text-field>
              </form>
                <!--use text entered in search bar to display todo matching the search-->
                <v-list-item v-for="todo in searchTodo()" :key="todo.title">
                  <v-list-item-content>
                    <span :class="{ completed: todo.completed }" id="todo-title">[{{ todos.indexOf(todo)+1}}] {{ todo.title }}</span>
                    <v-list-item-subtitle id="todo-description">{{ todo.description }}</v-list-item-subtitle>
                    <v-checkbox
                      v-model="todo.completed"
                      :checked="todo.completed"
                      :label="todo.completed ? 'Completed' : 'Not Completed'"
                      @change="markComplete(todo)"
                      id="todo-checkbox"
                    ></v-checkbox>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
            <form @submit.prevent="addtodo">
            <v-btn icon type="submit">
                <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-text-field
                            v-if="showForm"
                            v-model="newTodo"
                            label="Add Todo"
                            single-line
                            hide-details
                        ></v-text-field>
                        <!--another form for description-->
                        <v-text-field
                            v-if="showForm"
                            v-model="newTodoDesc"
                            label="Add Description"
                            single-line
                            hide-details
                        ></v-text-field>
                </form>
              <form @submit.prevent="removetodo">
            <v-btn icon @click="removetodo">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-text-field
          v-if="showFormID"
          v-model="removeTodo"
          label="Enter ID to remove"
          single-line
          hide-details>
        </v-text-field>
        </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.headline {
  font-size: 50px;
  font-weight: 300;
}

.title {
  font-size: 30px;
  font-weight: 300;

}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: larger;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#todo-title {
  font-size: 50px;
  font-weight: 300;
}

#todo-description {
  font-size: 30px;
  font-weight: 300;
}

#todo-checkbox {
  font-size: 50px;
  font-weight: 300;
}

.completed {
  text-decoration: line-through;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
        showForm: false,
        showFormID: false,
        newTodo: "",
        newTodoDesc: "",
        removeTodo: "",
        search: "",
        filter: "",
        todos: this.$store.state.todos
    };
  },

  mounted() {
    if (!this.$store.state.currentUser) {
      this.$router.push("/");
    }
  },

methods: {
  //addTodo adds new todo to the list via api
  addtodo() {
    this.showForm = true;
    if (!this.newTodo.trim() || !this.newTodoDesc.trim()) {
      return
    }
    console.log(this.$store.state.currentUser)
    axios.post('/api/todos', {
      email: this.$store.state.currentUser,
      newTodo: {
      title: this.newTodo,
      description: this.newTodoDesc,
      completed: false
    }
  })
  .then(function (response) {
  console.log('Todo added successfully');
  });
  this.todos = Object.values(this.todos);
  this.todos.push({
    title: this.newTodo,
    description: this.newTodoDesc,
    completed: false
  });
  this.newTodo = "";
  this.newTodoDesc = "";
  this.showForm = false;
  },

  //removetodo removes todo from the list via api
    removetodo() {
      this.showFormID = true;
      if(this.removeTodo){
        this.removeTodo = parseInt(this.removeTodo);  
      if (this.removeTodo > 0 && this.removeTodo <= this.todos.length){
      axios.delete('/api/todos', {
        data: {
          email: this.$store.state.currentUser,
          newTodo: {
            title: this.todos[this.removeTodo-1].title,
            description: this.todos[this.removeTodo-1].description,
            completed: this.todos[this.removeTodo-1].completed
          }
      }
      })
      this.todos.splice(this.removeTodo-1, 1);
      this.removeTodo = "";
      this.showFormID = false;
      }
      else{
        alert("Please enter a valid ID");
      }
    }
  },

  //searchTodo searches for a todo in the list, and filters the list based on completed status, but is the whole list at the start
  searchTodo() { 
    let filteredTodos = this.todos;
    if (this.filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else if (this.filter === 'not completed') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }
    if (this.search) {
      let matchTodos = [];
      for (let i = 0; i < filteredTodos.length; i++) {
      if (filteredTodos[i].title.toLowerCase().includes(this.search.toLowerCase())) {
        matchTodos.push(filteredTodos[i]);
      }
    }
    return matchTodos;
  }
return filteredTodos;
},

//markComplete marks a todo as completed via api
    markComplete(todo) {
        axios.put('/api/todos', {
          email: this.$store.state.currentUser,
          newTodo: {
            title: todo.title,
            description: todo.description,
            completed: todo.completed
          }
        })
        .then(function (response) {
          todo.completed = todo.completed;
        });
},
}
};
</script>