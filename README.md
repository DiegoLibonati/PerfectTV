# Broadbase

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `broadbase-app` folder, `broadbase-graphql` and `broadbase-api` folder and execute: `npm install` or `yarn install` in the terminal
3. Go to the previous folder and execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

## Automate open Google Chrome when computer is turned On

To run Chrome when the computer starts, configure `chrome.bat` and place it in the Windows Startup folder.

### 1. Edit chrome.bat with your configuration

```
"PATH_CHROME.exe" --autoplay-policy=no-user-gesture-required -kiosk --disable-site-isolation-trials --disable-web-security --user-data-dir="PATH_CHROME_USER_DATA" YOUR_CLIENT_URL
```

### 2. Place chrome.bat in the Windows Startup folder

Open Run (`Win + R`), type `shell:startup` and press Enter, then move `chrome.bat` into that folder.

### Example

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --autoplay-policy=no-user-gesture-required -kiosk --disable-site-isolation-trials --disable-web-security --user-data-dir="C:\Users\<YOUR_USER>\AppData\Local\Google\Chrome\UserData" http://localhost:5173/
```

## Description

**Broadbase** is a full-stack web application for streaming and managing TV channels. It is designed to run as a kiosk-style TV viewer — launched in full-screen mode on startup — and lets users navigate channels entirely via keyboard, without touching a mouse.

The system is composed of three independent services that communicate with each other:

### Broadbase API (REST)

The core backend. It exposes a REST API that manages the data model: **channels**, **types**, **categories**, **sources**, and **bases**. Each channel has a name, description, thumbnail, channel number, and two URL fields — a full cached URL and a partial relative URL (`urlRest`). The API includes intelligent URL resolution logic: when a channel is requested, it validates the cached URL and reconstructs it from the base URL if it has expired. When a forced reload is triggered, it launches a headless Chrome instance via **Puppeteer** to extract the real streaming URL directly from an iframe-based source page, stores the new base URL in the database, and rebuilds all affected channel URLs automatically. This makes the system resilient to streaming sources that rotate or expire their URLs frequently.

### Broadbase GraphQL (API Gateway)

A GraphQL server that sits between the frontend and the REST API. It exposes queries to fetch channels (with optional filters by type, category, or source), categories, and channel numbers. All responses follow a standardized envelope with a `code`, `message`, and typed `data` payload. The GraphQL layer also exposes a Playground UI at `/playground` for exploring the schema interactively.

### Broadbase App (Frontend)

A React + TypeScript SPA built with Vite and Apollo Client. It has two main views:

- **Channels grid** (`/channels`): Displays all channels grouped by category. The user can navigate through channel cards using the arrow keys and select one by pressing Enter.
- **Channel viewer** (`/channel/:number`): Plays the selected channel in full screen. Streams are rendered either via an `<iframe>` (for sources like FTV or YouTube) or via `ReactPlayer` (for HLS/DASH streams). The viewer supports the following keyboard shortcuts:
  - `Arrow Left / Right` — go to previous or next channel
  - `r` — force-reload the stream URL (triggers Puppeteer server-side)
  - `t` — reload the entire page
  - `g` — return to the channels grid
  - `0–9` — jump to a channel by number

The app persists the user's **theme** (light/dark) and **language** (English/Spanish) in `localStorage`. All data fetching uses Apollo Client with a no-cache policy to always get fresh data from the GraphQL server.

### Data Model

The database (PostgreSQL via Prisma) stores five entities:

| Entity     | Purpose                                                                |
| ---------- | ---------------------------------------------------------------------- |
| `Channel`  | A TV channel with its streaming URLs, number, thumbnail, and metadata  |
| `Type`     | Classification of the channel (e.g. news, sports, entertainment)       |
| `Category` | Content grouping (e.g. premium, free, local)                           |
| `Source`   | The streaming provider or origin of the content                        |
| `Base`     | The dynamic base URL extracted from iframe sources, linked to a Source |

### Deployment

The entire stack runs in Docker via `docker-compose`. In development it includes Adminer for database inspection. In production it adds Nginx as a reverse proxy. All three services share a private Docker network and communicate using Docker internal hostnames.

## Technologies used

FrontEnd:

1. React
2. Typescript
3. TailwindCSS
4. CSS3
5. HTML5
6. Vite

BackEnd:

1. NodeJS
2. Express
3. GraphQL
4. Typescript

Deploy:

1. Docker
2. Nginx

Database:

1. SQL -> Postgres -> Prisma

## Libraries used

### CLIENT

#### Dependencies

```
"@apollo/client": "^3.13.5"
"axios": "^1.8.4"
"graphql": "^16.10.0"
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^5.5.0"
"react-player": "^2.16.0"
"react-router-dom": "7.13.2"
"usekeyboard-react": "^2.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"autoprefixer": "^10.4.18"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss": "^8.4.37"
"prettier": "^3.0.0"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

### API

#### Dependencies

```
"@prisma/client": "^5.20.0"
"express": "^4.21.0"
"morgan": "^1.10.1"
"puppeteer": "^24.8.2"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@types/express": "^5.0.0"
"@types/jest": "^30.0.0"
"@types/morgan": "^1.9.10"
"@types/node": "^22.0.0"
"@types/supertest": "^6.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.0.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"prisma": "^5.20.0"
"supertest": "^7.0.0"
"ts-jest": "^29.4.6"
"tsc-alias": "^1.8.16"
"tsx": "^4.0.0"
"typescript": "^5.5.3"
"typescript-eslint": "^8.0.0"
```

### GRAPHQL

#### Dependencies

```
"axios": "^1.7.9"
"express": "^4.21.0"
"graphql": "^16.10.0"
"graphql-http": "^1.22.4"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@types/express": "^5.0.0"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/supertest": "^6.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.0.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"supertest": "^7.0.0"
"ts-jest": "^29.4.6"
"tsc-alias": "^1.8.16"
"tsx": "^4.0.0"
"typescript": "^5.5.3"
"typescript-eslint": "^8.0.0"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/broadbase`](https://www.diegolibonati.com.ar/#/project/broadbase)

## Testing

1. Navigate to the `broadbase-app` | `broadbase-api` | `broadbase-graphql`
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Production

### Requirements

- Docker Desktop installed and running
- A `.env` file in each service folder with the appropriate environment variables (see **Env Keys** section below)
- A `.env` file in the root folder with the database credentials

### Environment files

| File                       | Used by                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `./.env`                   | PostgreSQL container (`DB_USER`, `DB_PASSWORD`, `DB_NAME`) |
| `./broadbase-api/.env`     | API service                                                |
| `./broadbase-graphql/.env` | GraphQL service                                            |
| `./broadbase-app/.env`     | App build-time env vars (e.g. `VITE_GRAPHQL_URL`)          |

### Build and run

```bash
docker-compose -f prod.docker-compose.yml build --no-cache
docker-compose -f prod.docker-compose.yml up --force-recreate -d
```

The `-d` flag runs all containers in the background. The startup order is enforced automatically: the database starts first, then the API, then GraphQL, and finally the App.

### Database migration

After the first deploy (or after schema changes), run Prisma migrations inside the API container:

```bash
docker exec -it broadbase-api npx prisma migrate deploy
```

### Services and ports

Once running, only one port is exposed to the host:

| Service             | Internal port | Host port | Description                    |
| ------------------- | ------------- | --------- | ------------------------------ |
| `broadbase-app`     | 8080          | **3000**  | React app served by Nginx      |
| `broadbase-api`     | 5050          | —         | REST API (internal only)       |
| `broadbase-graphql` | 5051          | —         | GraphQL server (internal only) |
| `broadbase-db`      | 5432          | 5432      | PostgreSQL                     |

The React app is the only public entry point. Nginx handles everything:

- Serves the static build with aggressive caching (`max-age=31536000`) for JS/CSS/assets
- Proxies `/graphql` requests to the GraphQL container
- Falls back to `index.html` for client-side routing (SPA support)

### Kiosk mode

To launch the app automatically in full-screen on startup, configure `chrome.bat` as described in the **Automate open Google Chrome when computer is turned On** section above, pointing `YOUR_CLIENT_URL` to `http://localhost:3000`.

### Stopping the stack

```bash
docker-compose -f prod.docker-compose.yml down
```

To also remove the database volume (deletes all data):

```bash
docker-compose -f prod.docker-compose.yml down -v
```

## Documentation APP

### **Version**

```ts
APP VERSION: 1.0.0
README UPDATED: 06/05/2026
AUTHOR: Diego Libonati
```

### **Env Keys**

#### Root `.env` (PostgreSQL credentials — shared with `broadbase-db` container)

| Key           | Description                           |
| ------------- | ------------------------------------- |
| `DB_HOST`     | Hostname of the database container    |
| `DB_PORT`     | Database port (default: `5432`)       |
| `DB_USER`     | PostgreSQL username                   |
| `DB_PASSWORD` | PostgreSQL password                   |
| `DB_NAME`     | PostgreSQL database name              |
| `DB_SCHEMA`   | PostgreSQL schema (default: `public`) |

```bash
# .env (root)
DB_HOST=broadbase-db
DB_PORT=5432
DB_USER=root
DB_PASSWORD=admin
DB_NAME=broadbase_db
DB_SCHEMA=public
```

#### `broadbase-api/.env`

| Key                                                                         | Description                                                |
| --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `PORT`                                                                      | Port the API service listens on                            |
| `NODE_ENV`                                                                  | Runtime environment (`development` / `production`)         |
| `BASE_URL`                                                                  | Public URL where the app is hosted (leave empty for local) |
| `DATABASE_URL`                                                              | Full Prisma connection string for PostgreSQL               |
| `DB_HOST` / `DB_PORT` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` / `DB_SCHEMA` | Individual DB connection fields                            |
| `PUPPETEER_EXECUTABLE_PATH`                                                 | Path to the Chromium binary used for iframe scraping       |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`                                          | Skip bundled Chromium download (use system binary instead) |
| `CHOKIDAR_USEPOLLING`                                                       | Enable file polling for hot reload inside Docker           |
| `CHOKIDAR_INTERVAL`                                                         | Polling interval in ms                                     |

```bash
# broadbase-api/.env
PORT=5050
NODE_ENV=development
BASE_URL=

DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_SCHEMA=public
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?schema=public

PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

CHOKIDAR_USEPOLLING=true
CHOKIDAR_INTERVAL=100
```

#### `broadbase-graphql/.env`

| Key                   | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `PORT`                | Port the GraphQL service listens on                        |
| `NODE_ENV`            | Runtime environment                                        |
| `BASE_URL`            | Public URL where the app is hosted (leave empty for local) |
| `API_URL`             | Full base URL of the REST API including `/api/v1`          |
| `CHOKIDAR_USEPOLLING` | Enable file polling for hot reload inside Docker           |
| `CHOKIDAR_INTERVAL`   | Polling interval in ms                                     |

```bash
# broadbase-graphql/.env
PORT=5051
NODE_ENV=development
BASE_URL=

API_URL=http://broadbase-api:5050/api/v1

CHOKIDAR_USEPOLLING=true
CHOKIDAR_INTERVAL=100
```

#### `broadbase-app/.env`

| Key                          | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `VITE_GRAPHQL_URL`           | URL of the GraphQL server (used by Apollo Client)            |
| `VITE_CODE_USE_IFRAME`       | Comma-separated source codes that must render via `<iframe>` |
| `VITE_CHANNELS_NEEDS_TO_RUN` | Minimum number of channels required for the app to function  |

```bash
# broadbase-app/.env
VITE_GRAPHQL_URL=http://broadbase-graphql:5051
VITE_CODE_USE_IFRAME=ftv,youtube
VITE_CHANNELS_NEEDS_TO_RUN=505
```

### API

- You can use the `Broadbase.postman_collection.json` collection in Postman. It is located inside the `broadbase-api` folder.

### GraphQL

- GraphQL endpoint is available at `http://localhost:5051/graphql`
- Use a client such as [Insomnia](https://insomnia.rest/) or [Altair](https://altairgraphql.dev/) to explore queries and mutations.

### **Broadbase Endpoints API**

---

- **Endpoint Name**: Get Types
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/types
- **Endpoint Fn**: This endpoint obtains all types
- **Endpoint Params**: None

---

- **Endpoint Name**: Add Type
- **Endpoint Method**: POST
- **Endpoint Prefix**: /api/v1/types
- **Endpoint Fn**: This endpoint creates a new type.
- **Endpoint Body**:

```ts
{
  code: string;
  description: string;
}
```

---

- **Endpoint Name**: Delete a Type
- **Endpoint Method**: DELETE
- **Endpoint Prefix**: /api/v1/types/:id
- **Endpoint Fn**: This endpoint deletes a Type by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

---

- **Endpoint Name**: Get Sources
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/sources
- **Endpoint Fn**: This endpoint obtains all sources
- **Endpoint Params**: None

---

- **Endpoint Name**: Add Source
- **Endpoint Method**: POST
- **Endpoint Prefix**: /api/v1/sources
- **Endpoint Fn**: This endpoint creates a new source.
- **Endpoint Body**:

```ts
{
  code: string;
  description: string;
}
```

---

- **Endpoint Name**: Delete a Source
- **Endpoint Method**: DELETE
- **Endpoint Prefix**: /api/v1/sources/:id
- **Endpoint Fn**: This endpoint deletes a Source by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

---

- **Endpoint Name**: Get Bases
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/bases
- **Endpoint Fn**: This endpoint obtains all bases
- **Endpoint Params**: None

---

- **Endpoint Name**: Add Base
- **Endpoint Method**: POST
- **Endpoint Prefix**: /api/v1/bases
- **Endpoint Fn**: This endpoint creates a new base.
- **Endpoint Body**:

```ts
{
  baseUrl: string;
  idSource: string;
}
```

---

- **Endpoint Name**: Delete a Base
- **Endpoint Method**: DELETE
- **Endpoint Prefix**: /api/v1/bases/:id
- **Endpoint Fn**: This endpoint deletes a Base by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

---

- **Endpoint Name**: Update a Base
- **Endpoint Method**: PATCH
- **Endpoint Prefix**: /api/v1/bases/:id
- **Endpoint Fn**: This endpoint updates a Base by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

- **Endpoint Body**:

```ts
{
  baseUrl: string;
}
```

---

- **Endpoint Name**: Get Categories
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/categories
- **Endpoint Fn**: This endpoint obtains all categories
- **Endpoint Params**: None

---

- **Endpoint Name**: Add Category
- **Endpoint Method**: POST
- **Endpoint Prefix**: /api/v1/categories
- **Endpoint Fn**: This endpoint creates a new category.
- **Endpoint Body**:

```ts
{
  code: string;
  description: string;
}
```

---

- **Endpoint Name**: Delete a Category
- **Endpoint Method**: DELETE
- **Endpoint Prefix**: /api/v1/categories/:id
- **Endpoint Fn**: This endpoint deletes a Category by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

---

- **Endpoint Name**: Get Channels
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/channels
- **Endpoint Fn**: This endpoint obtains all channels
- **Endpoint Params**: None

---

- **Endpoint Name**: Get Channels By Number
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/channels/:number
- **Endpoint Fn**: This endpoint obtains a channel by number. Pass `?reload=true` to force Puppeteer to re-extract the streaming URL from the source page.
- **Endpoint Params**:

```ts
{
  number: string;
}
```

- **Endpoint Query Params** (optional):

```ts
{
  reload: boolean;
}
```

---

- **Endpoint Name**: Get Numbers Channel
- **Endpoint Method**: GET
- **Endpoint Prefix**: /api/v1/channels/numbers
- **Endpoint Fn**: This endpoint obtains all numbers channel
- **Endpoint Params**: None

---

- **Endpoint Name**: Add Channel
- **Endpoint Method**: POST
- **Endpoint Prefix**: /api/v1/channels
- **Endpoint Fn**: This endpoint creates a new channel.
- **Endpoint Body**:

```ts
{
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest: string;
  number: number;
  idType: number;
  idCategory: number;
  idSource: number;
}
```

---

- **Endpoint Name**: Update a Channel
- **Endpoint Method**: PATCH
- **Endpoint Prefix**: /api/v1/channels/:id
- **Endpoint Fn**: This endpoint updates a channel.
- **Endpoint Params**:

```ts
{
  id: string;
}
```

- **Endpoint Body**:

```ts
{
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest: string;
  number: number;
  idType: number;
  idCategory: number;
  idSource: number;
}
```

---

- **Endpoint Name**: Delete a Channel
- **Endpoint Method**: DELETE
- **Endpoint Prefix**: /api/v1/channels/:id
- **Endpoint Fn**: This endpoint deletes a Channel by id
- **Endpoint Params**:

```ts
{
  id: string;
}
```

---

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
