# FMS (File Management System) Microservices

This repository contains a **microservices-based File Management System (FMS)** with three main services:

1. **User Service** – Handles user authentication and management.
2. **Version Service** – Handles document and file versioning.
3. **Hierarchy Service** – Handles folder structure and hierarchy.

The project uses **MongoDB**, **Docker**, **Express.js**, and **Swagger** for API documentation.

---

## Features

- User registration, login, and JWT-based authentication
- Create, update, and delete folders and documents
- Upload files and maintain multiple versions
- Retrieve folder hierarchy for documents
- Search and filter documents
- Swagger-based API documentation
- Dockerized setup for easy deployment

---

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (optional, for local development)

---

## Setup

### Clone Repository

```bash
git clone https://github.com/saloni31/FMS
cd FMS
```

## Environment Variables
Create a .env file in the root project and save all the env varibles

## Docker Setup

### Run all services using:
```bash
docker-compose up --build
```

## Running the Services

### After starting Docker:

User Service: http://localhost:8080/users/

Version Service: http://localhost:8080/version/

Hierarchy Service: http://localhost:8080/hierarchy/


## API Documentation

### Swagger UI for each service:

```bash
http://localhost:8080/users/api-docs
http://localhost:8080/version/api-docs
http://localhost:8080/hierarchy/api-docs

```

### Notes

JWT token required in Authorization header for protected endpoints

Uploaded files should not exceed container storage limits

Folder hierarchy is resolved via Hierarchy Service; folder IDs must exist

Use Swagger UI or Postman to test APIs

