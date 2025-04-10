# PerfectTV

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `api` folder, `client` folder and `graphql` folder and execute: `npm install` or `yarn install` in the terminal
3. Go to the previous folder and execute: `docker-compose build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

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

1. NodeJS
2. Typescript
3. Docker
4. Postgresql with Prisma
5. GraphQL
6. React JS
7. TailwindCSS

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
"react-router": "^7.4.0"
"usekeyboard-react": "^1.5.2"
```

#### devDependencies

```
"@eslint/js": "^9.21.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/node": "^22.13.13"
"@types/react": "^19.0.10"
"@types/react-dom": "^19.0.4"
"@vitejs/plugin-react": "^4.3.4"
"autoprefixer": "^10.4.21"
"eslint": "^9.21.0"
"eslint-plugin-react-hooks": "^5.1.0"
"eslint-plugin-react-refresh": "^0.4.19"
"globals": "^15.15.0"
"jsdom": "^26.0.0"
"postcss": "^8.5.3"
"tailwindcss": "3"
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
"jest": "^29.7.0"
"module-alias": "^2.2.3"
"puppeteer": "^24.4.0"
"redoc-express": "^2.1.0"
"supertest": "^7.0.0"
"swagger-jsdoc": "^6.2.8"
```

#### devDependencies

```
"@types/express": "^5.0.0"
"@types/jest": "^29.5.14"
"@types/node": "^22.13.8"
"@types/supertest": "^6.0.2"
"@types/swagger-jsdoc": "^6.0.4"
"nodemon": "^3.1.9"
"prisma": "^6.4.1"
"ts-jest": "^29.2.6"
"ts-node": "^10.9.2"
"tsconfig-paths": "^4.2.0"
"typescript": "^5.8.2"
```

### GRAPHQL

#### Dependencies

```
"axios": "^1.7.9"
"express": "^4.21.2"
"graphql": "^16.10.0"
"graphql-http": "^1.22.4"
"graphql-playground-middleware-express": "^1.7.23"
"module-alias": "^2.2.3"
```

#### devDependencies

```
"@types/express": "^5.0.0"
"@types/graphql": "^14.5.0"
"nodemon": "^3.1.9"
"ts-node": "^10.9.2"
"tsconfig-paths": "^4.2.0"
"typescript": "^5.8.2"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/PerfectTV`](https://www.diegolibonati.com.ar/#/project/PerfectTV)

## Video

COMING SOON...

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
README UPDATED: 10/04/2025
AUTHOR: Diego Libonati
```

### **Env Keys**

1. `VITE_GRAPHQL_URL`: Refers to GraphQL server url
2. `PORT`: Refers to the service port
3. `CHOKIDAR_USEPOLLING`: Refers to the hot reload of the service if you use it.
4. `DATABASE_URL`: Refers to the URI of the postgrest database that prisma accesses in order to connect to it.
5. `PUPPETEER_EXECUTABLE_PATH`: Refers to the internal google chrome path of the API service for scraping.
6. `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`: Refers to bypass chromium downloading
7. `API_URL`: Refers to the URL of the API service

```ts
# CLIENT Envs
VITE_GRAPHQL_URL=http://host.docker.internal:5001

# API Envs
PORT=5000
CHOKIDAR_USEPOLLING=true # If you want to hot reload

DATABASE_URL=postgresql://root:admin@perfect-tv-db:5432/perfecttvdb?schema=public

PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# GRAPHQL Envs
CHOKIDAR_USEPOLLING=true # If you want to hot reload

API_URL=http://host.docker.internal:5000
```

### API

- In your favorite browser search: `http://localhost:5000/doc/v1/docs`
- You can also use the `Perfect TV.postman_collection.json` in POSTMAN. It is located inside the `api` folder.

### GraphQL

NOTE: You will find a docs tab to visualize existing queries and mutations.

- In your favorite browser search: `http://localhost:5001/playground`
