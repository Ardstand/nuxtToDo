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
                <v-list-item-subtitle>
                  <v-list>
                    <v-list-item v-for="todo in todos" :key="todo.title">
                      <v-list-item-content>
                        <v-list-item-title>{{ todo.title }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-checkbox
                          v-model="todo.completed"
                          color="green"
                          hide-details
                        ></v-checkbox>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-list-item-subtitle>
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
                 </form>
                <v-btn icon @click="removeTodo">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      //create a simple ToDo list for logged in user
      todos: [
        {
          title: "Learn Vue.js",
          completed: false
        },
        {
          title: "Learn Nuxt.js",
          completed: false
        },
        {
          title: "Learn Vuetify",
          completed: false
        }
      ],
        showForm: false,
        newTodo: "",
    };
  },

methods: {
  addtodo() {
    this.showForm = true;
    if (this.newTodo) {
      this.todos.push({
        title: this.newTodo,
        completed: false
      });
    }
  },

    removeTodo() {
      var todoPosition = this.todos.indexOf(todo);
      this.todos.splice(todoPosition, 1);
    }
}
};
</script>