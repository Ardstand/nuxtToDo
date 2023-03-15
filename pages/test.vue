<template>
    <div class="dashboard">
      <div class="search">
        <input type="text" v-model="searchText" placeholder="Search">
      </div>
      <div class="filter">
        <select v-model="filterStatus">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div class="add">
        <input type="text" v-model="newItemText" placeholder="Add new item">
        <button @click="addItem">Add</button>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in filteredItems" :key="item.id">
            <input type="checkbox" v-model="item.completed">
            <span :class="{ completed: item.completed }">{{ item.text }}</span>
            <button @click="removeItem(index)">X</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchText: '',
        filterStatus: 'all',
        newItemText: '',
        items: [
          { id: 1, text: 'Buy groceries', completed: false },
          { id: 2, text: 'Clean the house', completed: false },
          { id: 3, text: 'Take out the trash', completed: true }
        ]
      }
    },
    computed: {
      filteredItems() {
        if (this.filterStatus === 'completed') {
          return this.items.filter(item => item.completed)
        } else if (this.filterStatus === 'incomplete') {
          return this.items.filter(item => !item.completed)
        } else {
          return this.items
        }
      }
    },
    methods: {
      addItem() {
        if (this.newItemText !== '') {
          this.items.push({
            id: this.items.length + 1,
            text: this.newItemText,
            completed: false
          })
          this.newItemText = ''
        }
      },
      removeItem(index) {
        this.items.splice(index, 1)
      }
    }
  }
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  