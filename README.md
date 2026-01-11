# Anythink Market

This repository provides two implementations of a simple task‑management API:

- **Python Server** – FastAPI implementation, containerized with Docker.
- **Node.js Server** – Express implementation, runnable locally with npm.

Both servers expose the same `/tasks` endpoints (POST to add a task, GET to retrieve the list), making it easy to switch between languages for testing or production.

## Python Server

### Project Structure

- `python-server/src/main.py`: FastAPI server with two routes.
- `python-server/src/__init__.py`: Marks the `src` directory as a package.
- `python-server/requirements.txt`: Python dependencies.
- `python-server/Dockerfile`: Docker image definition.

### Getting Started (Python)

```shell
docker compose up
```

The FastAPI server will be available at `http://localhost:8000`.

### API Routes (Python)

- `POST /tasks`: Adds a task to the task list.
- `GET /tasks`: Retrieves the task list.

## Node.js Server

### Project Structure

- `node-server/package.json`: Node.js project definition.
- `node-server/src/index.js`: Express server with task routes.

### Getting Started (Node.js)

```shell
cd node-server
npm install
npm start
```

The Node.js server will be available at `http://localhost:3000`.

### API Routes (Node.js)

- `POST /tasks`: Adds a task to the in‑memory task list (JSON body).
- `GET /tasks`: Returns the current list of tasks.

## Migration Details

You can run either implementation:

- **Python**: `docker compose up` → port 8000.
- **Node.js**: `npm start` inside `node‑server` → port 3000.

Both adhere to the same API contract, allowing seamless migration between the two runtimes.

## Copilot Guidance (optional)

When using GitHub Copilot to edit this README, focus on:

- Keeping the overview concise.
- Highlighting the server structure and required commands.
- Emphasizing the shared API contract for migration.
