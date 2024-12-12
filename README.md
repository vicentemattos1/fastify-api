# 📚 Fastify API

---

## 🛠️ Overview

This project is a RESTful API built with **Fastify** and **Knex**. The API provides CRUD operations for users and their associated meals. Each meal is linked to a session ID, which is generated when a user is created. The session ID is stored in cookies to manage user-specific meal data securely.

---

## ✨ Features

### 👤 Users

- Create, read, update, and delete user data.
- Automatically generate a session ID upon user creation.
- Store the session ID in cookies for user-specific data operations.

### 🍽️ Meals

- CRUD operations for meals.
- Meals are associated with the session ID of the user.
- Middleware enforces that only meals belonging to the current session (user) can be managed.

---

## 📋 Requirements

### Prerequisites

- 🖥️ Node.js (version >= 18.x)
- 📦 npm or Yarn

### Dependencies

- **Fastify**: High-performance web framework.
- **fastify-cookie**: For managing cookies.
- **knex**: For query builder.
- **Typescript**: For static types.

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vicentemattos1/fastify-api
   cd fastify-api

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Run database migrations:
   ```bash
   npm install
   ```
4. Start the server:

   ```bash
   npm run knex migrate:latest
   ```

5. Install dependencies:
   ```bash
   npm run dev
   ```

## 👨‍💻 Author

**Vicente Mattos**  
[LinkedIn](https://www.linkedin.com/in/vicentemattos1/) | [GitHub](https://github.com/vicentemattos1)
