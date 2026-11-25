# TaskFlow

TaskFlow is a REST API for managing tasks, built with Node.js and Express.

The project starts as a small API and grows step by step into a production-style setup: a real database, caching, containers, Kubernetes, and deployment to a Linux server. The [roadmap](#roadmap) shows each stage.

## Features

- Create, list, update, and delete tasks
- Filter tasks by `status` and `priority`
- Input validation with clear error messages
- Consistent JSON responses and error format
- `/health` endpoint for container and Kubernetes health checks
- Graceful shutdown on `SIGTERM` / `SIGINT`
- Automated tests using Node's built-in test runner

## Tech Stack

| Area      | Tool                          |
|-----------|-------------------------------|
| Runtime   | Node.js 20+                   |
| Framework | Express 4                     |
| Testing   | `node:test` (built-in)        |
| Storage   | In-memory (PostgreSQL planned) |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run

```bash
git clone https://github.com/Ahmed-helmyII/task-flow.git
cd task-flow
npm install
cp .env.example .env
npm run dev
```

The API runs at `http://localhost:3000`.

### Scripts

| Command       | Description                           |
|---------------|---------------------------------------|
| `npm start`   | Start the server                      |
| `npm run dev` | Start with auto-restart on file change |
| `npm test`    | Run the test suite                    |

### Environment variables

| Variable   | Default       | Description              |
|------------|---------------|--------------------------|
| `PORT`     | `3000`        | Port the server listens on |
| `NODE_ENV` | `development` | `development`, `production` or `test` |

## API Reference

Base URL: `/api/v1`

### Task object

```json
{
  "id": "5d639ccb-8e1a-49ce-b06f-1c8a01c101ee",
  "title": "Set up CI",
  "description": "",
  "status": "todo",
  "priority": "high",
  "createdAt": "2026-11-25T15:11:46.485Z",
  "updatedAt": "2026-11-25T15:11:46.485Z"
}
```

| Field         | Type   | Values                                   |
|---------------|--------|------------------------------------------|
| `title`       | string | Required, 1–200 characters               |
| `description` | string | Optional                                 |
| `status`      | string | `todo` (default), `in_progress`, `done`  |
| `priority`    | string | `low`, `medium` (default), `high`        |

### Endpoints

| Method   | Endpoint              | Description                              |
|----------|-----------------------|------------------------------------------|
| `GET`    | `/health`             | Health check                             |
| `GET`    | `/api/v1/tasks`       | List tasks. Optional `?status=` and `?priority=` |
| `GET`    | `/api/v1/tasks/:id`   | Get one task                             |
| `POST`   | `/api/v1/tasks`       | Create a task                            |
| `PATCH`  | `/api/v1/tasks/:id`   | Update some fields of a task             |
| `DELETE` | `/api/v1/tasks/:id`   | Delete a task                            |

### Examples

```bash
# Create a task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Set up CI", "priority": "high"}'

# List tasks that are done
curl "http://localhost:3000/api/v1/tasks?status=done"

# Mark a task as in progress
curl -X PATCH http://localhost:3000/api/v1/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

### Errors

Errors always use this format:

```json
{
  "error": {
    "message": "Validation failed",
    "details": ["title is required and must be a non-empty string"]
  }
}
```

| Status | Meaning                               |
|--------|---------------------------------------|
| `400`  | Invalid input or invalid JSON         |
| `404`  | Task or route not found               |
| `500`  | Unexpected server error               |

## Project Structure

```
.
├── src/
│   ├── app.js                  # Express app: middlewares and routes
│   ├── server.js               # Starts the server, graceful shutdown
│   ├── config/                 # Settings read from environment variables
│   ├── routes/                 # URL to controller mapping
│   ├── controllers/            # Request/response handling
│   ├── services/               # Business logic and data access
│   ├── middlewares/            # Logger, 404 handler, error handler
│   └── utils/                  # Validation and error helpers
├── tests/                      # API tests
├── .env.example
└── package.json
```

## Roadmap

- [x] REST API for tasks with validation and tests
- [ ] PostgreSQL for persistent storage
- [ ] Redis caching
- [ ] Dockerfile and Docker Compose
- [ ] CI with GitHub Actions (tests and image build)
- [ ] Kubernetes manifests (Deployment, Service, ConfigMap, Secret)
- [ ] Deployment to a Linux server

## Contributing

- `main` is protected. All changes go through a pull request.
- Branch names: `feat/...`, `fix/...`, `docs/...`, `chore/...`
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), for example `feat(tasks): add due date`.
- Run `npm test` before opening a pull request.

## License

[MIT](LICENSE)
