# Node Lab 01

## Project Description

This project is a raw Node.js HTTP server built without Express or external dependencies.

The server handles GET and POST requests, serves HTML files, processes form data, handles errors, limits request body size, and supports graceful shutdown.

## How to Run

Make sure Node.js is installed.

Node.js version: 20.20.2

Run:

node index.js

The server runs on:

http://localhost:3000

## Endpoints

### GET /

Serves the ⁠ `index.html`⁠ page.

### GET /users

Serves the ⁠ `users.html`⁠ page.

### POST /create-user

Accepts a URL-encoded username from the form, logs the username, and redirects to ⁠ `/` ⁠.

### Unknown Routes

Return:

404 Not Found

### Wrong HTTP Methods

Known routes used with an unsupported method return:

405 Method Not Allowed

### Missing HTML Files

If a required HTML file cannot be read, the server returns:

500 Internal Server Error

### Large Request Bodies

Request bodies larger than 1 MB return:

413 Payload Too Large

## Known Limitations

This project does not store users permanently. Usernames are only logged to the server console.

## Questions

### 1. Why must the response be sent inside the ⁠ `end` ⁠ handler?

The request body is a stream and may arrive in multiple chunks. The ⁠ `end`⁠ event tells the server that the entire request body has been received, so the response should be sent after that point.

### 2. What would Express replace in this project?

Express would simplify routing, request and response handling, parsing request data, serving files, and error handling. With raw Node.js, these tasks have to be implemented manually.