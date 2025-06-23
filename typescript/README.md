# To run the code

## Installation

### Install nvm (optional)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Running the above command downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

This is optional you can choose to directly install node directly (node >= 16.0.0)

## Folder Structure
This section outlines the architecture and folder structure of the Time Deposit API application. The application follows a modular, scalable architecture pattern that separates concerns and promotes maintainability.

```
typescript/
├── src/                 # Source code
│   ├── api/             # API-specific code
│        └── services/   # Business logic
│   │   └── v1/          # Version 1 of the API
│   │       ├── handlers/  # Request handlers
│   │       ├── routes/       # Route definitions
│   ├── config/          # Configuration files
│   ├── db/              # Database-related code
│   │   └── prisma/      # Prisma ORM
│   ├── docs/            # API documentation
│   │   └── swagger.ts   # Swagger configuration
│   ├── models/          # Data models/types
│   ├── tests/           # Test files
│   ├── index.ts         # Express application setup
│   └── server.ts        # Server startup logic
├── prisma/              # Prisma schema and migrations
└── [config files]       # TypeScript, Babel, etc.
```

## API Versioning and Documentation

The API is versioned via the URL path (/api/v1/...). This allows for the implementation of new API versions while maintaining backward compatibility.

### Swagger Documentation

The API is documented using OpenAPI/Swagger which provides:
- Interactive API documentation accessible at `/api-docs`
- Testing capability directly from the documentation interface
- Automatic documentation generation from JSDoc comments in route files

### Install node using nvm

`nvm install 16.16.0`

### Install yarn (optional)

`npm install --global yarn`

This is optional, you can choose to use `npm` itself.

### Install node dependencies

`yarn install` or `npm install`

## Run the server

### Dev server while watching

`yarn dev`

### Test suite while watching

```
yarn test
# or
npm test
```

### Run server

```
yarn start
# or
npm start
```

---

## How to visualize the data

### Run migrations

`npx prisma migrate dev`

### Open Prisma Studio (GUI)

`npx prisma studio`

### Updating the Database

1. If you change `prisma/schema.prisma`, run:
   ```sh
   npx prisma migrate dev --name <migration-name>
   ```
2. Use the generated client in your code as needed.

### Updating the Database

To add a new migration run:

```sh
npx prisma migrate dev --name <migration-name>
```

### Clearing and seeding the database

```sh
npm run seed
```

