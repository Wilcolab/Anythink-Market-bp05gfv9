# Python Server

This project contains a FastAPI server implemented in Python. It provides two routes for managing a task list.

## Project Structure

The project has the following files and directories:

- `python-server/src/main.py`: This file contains the implementation of the FastAPI server with two routes. It handles adding a task to a list and retrieving the list.

- `python-server/src/__init__.py`: This file is an empty file that marks the `src` directory as a Python package.

- `python-server/requirements.txt`: This file lists the dependencies required for the FastAPI server and other dependencies.

- `python-server/Dockerfile`: This file is used to build a Docker image for the FastAPI server. It specifies the base image, copies the source code into the image, installs the dependencies, and sets the command to run the server.

- `docker-compose.yml`: This file is used to define and run multi-container Docker applications. It specifies the services to run, their configurations, and any dependencies between them.

## Getting Started (Python)

To run the FastAPI server using Docker, follow these steps:

```shell
docker compose up
```

The FastAPI server will be available at `http://localhost:8000`.

## API Routes (Python)

- `POST /tasks`: Adds a task to the task list. The request body should contain the task details.
- `GET /tasks`: Retrieves the task list.

# Node.js Server

This project also includes a simple Node.js server built with Express. It provides similar task management endpoints.

## Project Structure

- `node-server/package.json`: Defines the Node.js project and its dependencies.
- `node-server/src/index.js`: Contains the Express server implementation with routes for creating and retrieving tasks.

## Getting Started (Node.js)

1. Install dependencies:

```shell
cd node-server
npm install
```

2. Run the server:

```shell
npm start
```

The Node.js server will be available at `http://localhost:3000`.

## API Routes (Node.js)

- `POST /tasks`: Adds a task to the in‑memory task list. Send a JSON body with the task details.
- `GET /tasks`: Returns the current list of tasks.

## Migration Details

The repository now supports both Python (FastAPI) and Node.js (Express) implementations. You can choose which server to run based on your preferred language or deployment strategy:

- **Python**: Use Docker Compose (`docker compose up`) to start the FastAPI service on port 8000.
- **Node.js**: Run the server locally with `npm start` inside the `node-server` directory on port 3000.

Both servers share the same task management API contract, making it easy to switch between implementations for testing or production needs.
