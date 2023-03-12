<!--use frontend components of Vuetify to create a simple dashboard-->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="headline">Dashboard</v-card-title>
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Welcome to the Dashboard</v-list-item-title>
                <v-list-item-title class="title">Your ToDo List</v-list-item-title>
              <!--add a search bar-->
              <form>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <!--use text entered in search bar to display todo matching the search-->
                <v-list-item v-for="todo in searchTodo()" :key="todo.title">
                  <v-list-item-content>
                    <v-list-item-title font-weight="bold" >[{{todos.indexOf(todo)+1}}] {{ todo.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
                    <v-checkbox
                      v-model="todo.completed"
                      :label="todo.completed ? 'Completed' : 'Not Completed'"
                    ></v-checkbox>
                  </v-list-item-content>
                </v-list-item>
              </form>
              </v-list-item-content>
            </v-list-item>
            <form @submit.prevent="addtodo">
            <v-btn icon @click="addtodo" type="submit">
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
        <v-btn @click="save">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { watch } from 'vue';

export default {
  data() {
    return {
      //create a simple ToDo list for logged in user
      todos: [
        {
          title: "Learn Vue.js",
          description: "Learn Vue.js and build a simple ToDo app",
          completed: false
        },
        {
          title: "Learn Nuxt.js",
          description: "Learn Nuxt.js and build a simple ToDo app",
          completed: false
        },
        {
          title: "Learn Vuetify",
          description: "Learn Vuetify and build a simple ToDo app",
          completed: false
        }
      ],
        showForm: false,
        showFormID: false,
        newTodo: "",
        removeTodo: "",
        search: "",
    };
  },

methods: {
  addtodo() {
    this.showForm = true;
    if (!this.newTodo.trim() || !this.newTodoDesc.trim()) {
      return
    }
      if(this.newTodo.length > 0 && this.newTodoDesc.length > 0){
        this.todos.push({
        title: this.newTodo,
        description: this.newTodoDesc,
        completed: false
        });
        this.newTodo = "";
        this.newTodoDesc = "";
        this.showForm = false;
        } else {
            alert("Please enter a valid title and description");
        }
    },

    removetodo() {
      this.showFormID = true;
      if(this.removeTodo){
        this.removeTodo = parseInt(this.removeTodo);  
      if (this.removeTodo > 0 && this.removeTodo <= this.todos.length){
      this.todos.splice(this.removeTodo-1, 1);
      this.removeTodo = "";
      this.showFormID = false;
      }
      else{
        alert("Please enter a valid ID");
      }
    }
  },

    showTodo() {
      return this.todos.map((todo, index) => {
        return `${index} - ${todo.title}`;
      });
    },

    searchTodo() {
      if (!this.search) {
        return this.todos;
      }
      this.search = this.search.toString();
      let matchTodos = [];
      for(let i = 0; i < this.todos.length; i++){
        if(this.todos[i].title.includes(this.search)){
          matchTodos.push(this.todos[i]);
        }
      }
      return matchTodos;
    },

    save() {
      //to-do save as user.json
    },
  },

  watch: {
    todos: {
      handler: function (todos) {
        localStorage.setItem("todos", JSON.stringify(todos));
      },
      deep: true
    }
  },
};
</script>

