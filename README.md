# Git Training Project

A small Node.js project (no external dependencies) used to practice Git and GitHub:
local repos, remotes over HTTPS, branching, merging and rebasing.

## Project Structure

```
.
├── src/
│   ├── index.js              # Entry point - starts the HTTP server
│   ├── config/
│   │   └── config.js         # App settings (port, name)
│   ├── data/
│   │   └── users.js          # Fake in-memory users
│   ├── routes/
│   │   ├── users.js          # /users and /users/:id
│   │   └── math.js           # /math?a=5&b=3
│   └── utils/
│       ├── math.js           # add, subtract, multiply
│       └── stringHelpers.js  # capitalize, reverse
├── tests/
│   ├── math.test.js
│   └── stringHelpers.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Requirements

- Node.js 18 or newer

## Run

```bash
npm start      # http://localhost:3000
npm test       # runs the tests with Node's built-in test runner
```

### Endpoints

| Method | Route            | Description            |
|--------|------------------|------------------------|
| GET    | `/`              | Welcome message        |
| GET    | `/users`         | List all users         |
| GET    | `/users/:id`     | Get one user by id     |
| GET    | `/math?a=5&b=3`  | Sum, difference, product |

## Git Practice Steps

### 1. Create the local repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### 2. Connect to GitHub (HTTPS)

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

When asked for a password, paste your **Personal Access Token**, not your GitHub password.

### 3. Branching

```bash
git checkout -b feature/divide
# edit src/utils/math.js -> add a divide function
git add .
git commit -m "Add divide function"
git push -u origin feature/divide
```

### 4. Merge

```bash
git checkout main
git merge feature/divide
git push
```

### 5. Rebase

```bash
git checkout -b feature/greeting
# make a commit here, then make a different commit on main
git rebase main
# fix conflicts if any, then:
git add .
git rebase --continue
```

## Ideas for Practice Branches

- `feature/divide` — add `divide(a, b)` to `src/utils/math.js` (and a test)
- `feature/add-user` — add a new user to `src/data/users.js`
- `feature/health-route` — add a `/health` route in `src/index.js`
- `fix/math-validation` — handle missing `a` / `b` in `/math`
