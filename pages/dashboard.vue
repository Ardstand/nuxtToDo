  <!--use frontend components of Vuetify to create a simple dashboard-->
  <template>
    <div data-app>
      <v-container>
        <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">Dashboard</v-card-title>
            <v-card-text>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">Welcome to the Dashboard</v-list-item-title>
                  <v-list-item-title class="title">Your ToDo List</v-list-item-title>
                  <v-combobox 
                      v-model="filterStatus"
                      :items="filterOptions"
                      :value="'all'"
                      >
                    </v-combobox>
                    <!--add a search bar-->
                    <v-text-field 
                    v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
                <!-- <form> -->
                  <!--use text entered in search bar to display todo matching the search-->
                  <v-list-item v-for="todo in searchTodo()" :key="todo.title">
                    <v-list-item-content>
                      <span :class="{completed: todo.completed}"><v-list-item-title font-weight="bold" >[{{todos.indexOf(todo)+1}}] {{ todo.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle></span>
                        <v-checkbox
                        v-model="todo.completed"
                        :checked="todo.completed"
                        :label="todo.completed ? 'Completed' : 'Not Completed'"
                        @change="markComplete(todo)"
                        ></v-checkbox>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="todos == null">
                      <v-list-item-content>
                      <v-list-item-title font-weight="bold">No todos found</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- </form> -->
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
              <!--another form for removing a todo-->
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
</div>
</template>

  <script>
  import axios from 'axios';
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
          filterOptions: ["all", "completed", "not completed"],
          user_email:this.$store.state.currentUser,
          todos: this.$store.state.todos
      };
    },

    mounted() {
    if (!this.$store.state.currentUser) {
      this.$router.push("/");
    }
    },

  methods: {
    addtodo() {
      this.showForm = true;
  if (!this.newTodo.trim() || !this.newTodoDesc.trim()) {
    return
  }
  //get the data from the form and then post on api
    axios.post('/api/todos', {
      email: this.user_email,
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

      removetodo() {
        this.showFormID = true;
        if(this.removeTodo){
          this.removeTodo = parseInt(this.removeTodo);  
        if (this.removeTodo > 0 && this.removeTodo <= this.todos.length){
        axios.delete('/api/todos', {
          data: {
            email: this.user_email,
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

      markComplete(todo) {
          //use axios to search for the todo and update the completed status
          axios.put('/api/todos', {
            email: this.user_email,
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
},
  };
  </script>

<style>
  input {
    padding: 5px;
    margin-top: 0; 
    margin-bottom: 0; 
    display: inline;
    border-style: none!important;
  }
  .v-text-field {
    border-style: none!important;
    padding: 5px;
  }
  .completed {
      text-decoration: line-through;
  }
  
  form {
    height: fit-content;
    display: inline;
  }

</style>
