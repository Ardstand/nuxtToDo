import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    currentUser: null,
    todos: null
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload.user;
      console.log("Inside SET_CURRENT_USER mutation", payload.user);
      state.todos = payload.todos;
      console.log("Inside SET_CURRENT_USER mutation", payload.todos);
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = null;
      state.todos = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      console.log("Inside login action", user.email);
      const response = await fetch('/todos.json');
      const data = await response.json();
      console.log("Fetched data: ", data)
      console.log("Fetched data: ", data[user.email])
      console.log("TODO loading: "+ data[user.email]["todo"]);
      commit("SET_CURRENT_USER", {"user":user.email, "todos":data[user.email]["todo"]});
    },
    async logout({ commit }) {
      // perform logout actions and commit CLEAR_CURRENT_USER mutation
      commit("CLEAR_CURRENT_USER");
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.currentUser !== null;
    },
    getTodos(state) {
      return state.todos;
    }
  },
});

