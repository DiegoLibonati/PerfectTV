# PerfectTV

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `api` folder, `client` folder and `graphql` folder and execute: `npm install` or `yarn install` in the terminal
3. Go to the previous folder and execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

## Automate open Google Chrome when computer is turned On

To run chrome when the computer starts we must configure the following files:

- chrome.bat

### Edit chrome.bat with your configuration

```
"PATH_CHROME.exe" --autoplay-policy=no-user-gesture-required -kiosk -fullscreen --disable-site-isolation-trials --disable-web-security --user-data-dir="PATH_CHROME_USER_DATA" YOUR_CLIENT_URL
```

### Final Example

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --autoplay-policy=no-user-gesture-required -kiosk -fullscreen --disable-site-isolation-trials --disable-web-security --user-data-dir="C:\Users\Die\AppData\Local\Google\Chrome\UserData" http://localhost:5173/
```

## Description

This application allows you to view channels. It also has its own server to load new channels, get them, delete them and update them. We also implemented an extra layer between the client and the api which is the GraphQL server.
The client allows:

1. Change the theme.
2. Change the language.
3. Change the channel with the keyboard arrows.
4. Reload the channel and display all the channels.

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
2. GraphQL
3. Typescript

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
"react": "^19.0.0"
"react-dom": "^19.0.0"
"react-icons": "^5.5.0"
"react-player": "^2.16.0"
"react-router-dom": "^7.4.0"
"usekeyboard-react": "^1.5.2"
```

#### devDependencies

```
"@eslint/js": "^9.21.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/node": "^20.10.6"
"@types/react": "^18.3.11"
"@types/react-dom": "^18.3.1"
"@vitejs/plugin-react": "^5.0.2"
"autoprefixer": "^10.4.21"
"eslint": "^9.21.0"
"eslint-plugin-react-hooks": "^5.1.0"
"eslint-plugin-react-refresh": "^0.4.19"
"globals": "^15.15.0"
"jsdom": "^26.0.0"
"postcss": "^8.5.3"
"tailwindcss": "^3.4.15"
"typescript": "~5.7.2"
"typescript-eslint": "^8.24.1"
"vite": "^6.2.0"
"vite-tsconfig-paths": "^5.1.4"
"vitest": "^3.1.1"
```

### API

#### Dependencies

```
"@prisma/client": "^6.4.1"
"express": "^4.21.2"
"got": "^14.4.7"
"puppeteer": "^24.8.2"
```

#### devDependencies

```
"@types/express": "^5.0.0"
"@types/jest": "^29.5.14"
"@types/node": "^22.13.8"
"@types/supertest": "^6.0.2"
"jest": "^29.7.0"
"nodemon": "^3.1.9"
"prisma": "^6.4.1"
"supertest": "^7.0.0"
"ts-jest": "^29.2.6"
"ts-node": "^10.9.2"
"tsc-alias": "^1.8.16"
"typescript": "^5.8.2"
"tsconfig-paths": "^4.2.0"
```

### GRAPHQL

#### Dependencies

```
"axios": "^1.7.9"
"express": "^4.21.2"
"graphql": "^16.10.0"
"graphql-http": "^1.22.4"
"graphql-playground-middleware-express": "^1.7.23"
```

#### devDependencies

```
"@types/express": "^5.0.0"
"nodemon": "^3.1.9"
"ts-node": "^10.9.2"
"typescript": "^5.8.2"
"jest": "^29.7.0"
"ts-jest": "^29.2.6"
"@types/jest": "^29.5.14"
"tsconfig-paths": "^4.2.0"
"tsc-alias": "^1.8.16"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/PerfectTV`](https://www.diegolibonati.com.ar/#/project/PerfectTV)

## Video

https://github.com/user-attachments/assets/6a4d56dd-d3be-4c57-94c7-587d0fc38788

## Testing

### CLIENT

1. Join to `client` folder
2. Execute: `yarn test` or `npm test`

### API

1. Join to `api` folder
2. Execute: `yarn test` or `npm test`

## Documentation APP

### **Version**

```ts
APP VERSION: 1.0.0
README UPDATED: 08/10/2025
AUTHOR: Diego Libonati
```

### **Env Keys**

1. `PUPPETEER_EXECUTABLE_PATH`: Refers to the internal google chrome path of the API service for scraping.
2. `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`: Refers to bypass chromium downloading
3. `PORT`: Refers to the service port
4. `DATABASE_URL`: Refers to the database connection URI
5. `NODE_ENV` is the key to distinguish the environment in which the app is running.
6. `BASE_URL` key refers to the URL where the app is hosted.
7. `API_URL`: Refers to the URL of the API service
8. `VITE_GRAPHQL_URL`: Refers to GraphQL server url
9. `VITE_CODE_USE_IFRAME`: Refers to source codes that must use iframe if or iframe to be displayed.

```ts
# CLIENT Envs
VITE_GRAPHQL_URL=http://host.docker.internal:5001
VITE_CODE_USE_IFRAME=ftv,youtube

# API Envs
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://root:admin@perfect-tv-db:5432/perfecttvdb?schema=public
BASE_URL=

PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# GRAPHQL Envs
PORT=5001
NODE_ENV=development
BASE_URL=

API_URL=http://host.docker.internal:5000
```

### API

- You can also use the `Perfect TV.postman_collection.json` in POSTMAN. It is located inside the `api` folder.

### GraphQL

NOTE: You will find a docs tab to visualize existing queries and mutations.

- In your favorite browser search: `http://localhost:5001/playground`

### **PerfectTV Endpoints API**

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
- **Endpoint Fn**: This endpoint obtains a channel by number
- **Endpoint Params**:

```ts
{
  number: string;
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