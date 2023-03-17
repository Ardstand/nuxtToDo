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
      state.todos = payload.todos;
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = null;
      state.todos = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      const response = await fetch('/todos.json');
      const data = await response.json();
      commit("SET_CURRENT_USER", {"user":user.email, "todos":data[user.email]["todo"]});
    },
    async logout({ commit }) {
      // perform logout actions and commit CLEAR_CURRENT_USER mutation
      commit("CLEAR_CURRENT_USER");
    },
    async register({ commit }, user) {
      try{
        commit("SET_CURRENT_USER", {"user":user.email, "todos":[]});
      } catch (error) {
        console.log(error);
      }
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
