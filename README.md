# nuxtToDo (Reluminous Technologies)

A web application assignment by Reluminous Technologies to have the ability to create/remove a To-Do Feature for a registered authenticated user.

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://nodejs.org/en/) [![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF)](https://vuetifyjs.com/en/) [![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)](https://nuxtjs.org/)

_**[Click here for live server](http://15.235.166.195:3000/)**_

# Table of contents

1. [Feature Requirements](#feature-requirements) 🧾
2. [Software Requirements](#software-requirements) 💻
3. [Assumptions](#assumptions) 🤔
4. [Implementation](#implementation) ⚙
5. [What could be better](#what-could-be-better) 💡
6. [License](#license) ©
7. [Authors](#authors) ✒

## Feature Requirements

[As Provided]:
Features required in Todo App are:
1. Login / Logout (You can create 2-3 static users)
2. Logged in user should be able view only his/her Todos
3. Logged in user should be able to mark Todos as done/undone
4. Logged in user should be able to delete Todos
5. Search Todos
6. Capability to filter & sort todos by status

## Software Requirements

1. **Node.js** (Nuxt.js & Vuetify)
    - axios@0.27.2
    - fs@latest
2. **Operating System** (Linux-based or Windows)

## Assumptions

These were assumptions made during the development of the website by the _[developers](#authors)_
1. Any backend storage system can be used, including `json`. This is not recommended for live active running websites.
2. UI Design is not a priority and certainly not a necessity.
3. State information need not be persistent. No cookies will be stored.
4. Login and Register can be in the same page without much confusion on the requirements. Only username and password is required for both Registration and Login.

## Implementation

`pages` are used to hold the default routing urls. 
- `index.vue` is the view/page for the `/` route. This consists of Login/Register forms being here.
- `dashboard.vue` is the view/page after a user has logged in.

`store` is where the state of user is stored temporarily. This doesn't hold persistent information as of now.

`api` is used to edit the `todos.json` file with each addition of new users or changes in the todo list of each logged in user.

## What could be better

1. We could introduce Cookies system to store information that's necessary for the users that use the website for persistent authentication. 
2. We can use SQL databases instead of Json for backend storages. No-SQL can work as well.
3. Styling and UI Designs could be altered to be more appealing and user-friendly with the use of more css styling.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) 

Copyright (c) 2023-present Ardstand & real-supreme

## Authors

This application is developed by the team of [Ardstand](https://github.com/Ardstand) & [Real-Supreme](https://github.com/real-supreme)