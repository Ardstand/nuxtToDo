<!--use vue frontent components to create a todo list as a table and have a gradient background and should look appealing and clean-->
<template>
  <v-container id="app" data-app>
    <v-row>
      <v-col>
        <v-card class="elevation-12" :dark="darkMode">
          <v-toolbar color="primary" dark :flat="!darkMode">
            <v-toolbar-title>Todo List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-switch
              v-model="darkMode"
              :label="darkMode ? 'Dark Mode' : 'Light Mode'"
              :inset=true
            />
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="search"
              id="searchList"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-text>
          <v-combobox
            v-model="filterStatus"
            id="searchList"
            :items="filterOptions"
            :value="'all'"
          ></v-combobox>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="filteredTodos"
              :search="search"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.title="{ item }">
                <div :class="{'completed':item.completed}">
                  {{ item.title }}
                </div>
              </template>
              <template v-slot:item.description="{ item }">
                <div v-if="item.completed" class="completed">
                  {{ item.description }}
                </div>
                <div v-else>
                  {{ item.description }}
                </div>
              </template>
              <template v-slot:item.completed="{ item }">
                <div v-if="item.completed">
                  <v-btn icon @click="markComplete(item)">
                    <v-icon>
                      mdi-check
                    </v-icon>
                  </v-btn>
                  Completed
                </div>
                <div v-else>
                  <v-btn icon @click="markComplete(item)">
                    <v-icon>
                      mdi-close
                      </v-icon>
                    </v-btn>
                       Not Completed
                    </div>
                </template>
              <template v-slot:item.actions="{ item }">
                <div v-if="item">
                  <v-icon small @click="removeItem(item)">
                    mdi-delete
                  </v-icon> 
                  Delete
                </div>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="showForm = true"
            >
              Add Todo
            </v-btn>
            <v-btn
              @click="logOut()"
            >
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog
      v-model="showForm"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Add Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newTodo"
                  id="searchList"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newTodoDesc"
                  id="searchList"
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showForm = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addtodo"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showFormID"
      max-width="500px"
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="removeTodo"
                  label="ID"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import todoList from "../components/todoList.js";
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
          showForm: false,
          showFormID: false,
          newTodo: "",
          newTodoDesc: "",
          removeTodo: "",
          search: "",
          filterStatus: "all",
          colors: ['red', 'blue', 'green', 'yellow'],
          filterOptions: ["all", "completed", "not completed"],
          user_email:this.$store.state.currentUser,
          todos: this.$store.state.todos,
          headers: [
            {
              text: "Title",
              align: "start",
              sortable: false,
              value: "title"
            },
            { text: "Description", value: "description" },
            { text: "Completed", value: "completed" },
            { text: "Actions", align: "center", value: "actions", sortable: false}
          ],
          snackbar: false,
          text: "",
          darkMode: false
      };
    },

    mounted() {
    if (!this.$store.state.currentUser) {
      this.$router.push("/");
    }
    },

    computed: {
      computedOptions(){
        try {
          return this.todos.map(todo => todo.title);
        } catch (error) {
          return [];
        }
      },

      filteredTodos() {
        if(this.todos)
        {
        if (this.filterStatus === "all") {
          return this.todos;
        } else if (this.filterStatus === "completed") {
          return this.todos.filter(todo => todo.completed);
        } else if (this.filterStatus === "not completed") {
          return this.todos.filter(todo => !todo.completed);
        }
      }
      else {
        this.$router.push("/");
      }
    }
  },

  methods: {
    ...mapActions(["logout"]),
    addtodo(){
      todoList.addNewTodo(this.newTodo, this.newTodoDesc, this.user_email);
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

  removeItem(item) {
    let filteredTodos = this.searchTodo();
    todoList.removeOldTodo(filteredTodos, item, this.user_email);
    },
    
  markComplete(todo) {
  todoList.markTodoComplete(todo, this.user_email);
    },

  searchTodo() {
    let filteredTodos = this.todos;
    if (this.filterStatus === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else if (this.filterStatus === 'not completed') {
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

    logOut() {
      this.logout();
      this.$router.push("/");
  }
  }
};
</script>

<style>
#searchList {
    padding: 5px;
    margin: 10px;
    border-style: none!important;;
  }
.completed {
    text-decoration: line-through;
    color: grey;
  }
</style>
