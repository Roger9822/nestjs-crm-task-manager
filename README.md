# NestJS CRM Task Manager

A CRM-style Task Manager backend built with **NestJS**, **TypeORM**, **MySQL**, **JWT Authentication**, **RBAC**, **Testing**, and **Docker**.

---

## Features

- User Registration and Login
- Password Hashing with bcrypt
- JWT Authentication
- Role-Based Access Control (Admin / User)
- User CRUD
- Task CRUD
- Customer CRUD
- Task filtering by:
  - status
  - title
  - customer
- Unit Testing with Jest
- E2E Testing with Supertest
- Dockerized setup with MySQL

---

## Tech Stack

- NestJS
- TypeORM
- MySQL
- JWT
- Jest
- Supertest
- Docker

---

## Project Structure

```bash
src/
├── common/
├── config/
├── database/
├── modules/
│   ├── auth/
│   ├── customers/
│   ├── tasks/
│   └── users/
test/
Dockerfile
docker-compose.yml
README.md





# Docker SETUP
# Run Project with Docker
# docker compose up --build

# Run Migrations in Docker
# docker exec -it crm_api npm run migration:run

# Enter Mysql of Docker 
# docker exec -it crm_mysql mysql -u root -p
# password 12345      THEN    SHOW DATABASES;

# Run Unit Test
# npm run test
# npm run test:e2e



# API Endpoints
# Auth APIs
# POST /auth/register
# POST /auth/login

# User APIs
# GET /users
# GET /users/:id
# PUT /users/:id
# DELETE /users/:id

# Task APIs
# POST /tasks
# GET /tasks
# GET /tasks/:id
# PUT /tasks/:id
# DELETE /tasks/:id
# Task Filter APIs
# GET /tasks?status=done
# GET /tasks?title=meeting
# GET /tasks?customerId=1

# Customer APIs
# POST /customers
# GET /customers
# GET /customers/:id
# PUT /customers/:id
# DELETE /customers/:id