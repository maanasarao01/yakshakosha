# YakshaKosha

YakshaKosha is a React-based catalogue of Yakshagana prasangas. Browse artwork for each prasanga, then open its script PDF, story text, or linked performance video.

The backend is a separate Express project in the sibling directory `../yakshakosha-server`. You can run the frontend with its hosted API, or start both projects and point the frontend at your local backend.

## Requirements

- Node.js 18 or newer (Node.js 20 LTS recommended)
- npm
- The `yakshakosha-server` repository beside this frontend repository to run the backend locally

Check your versions:

```bash
node --version
npm --version
```

## Install

From the frontend repository:

```bash
npm ci
```

For local backend use, install its dependencies in a second terminal:

```bash
cd ../yakshakosha-server
npm install
```

## Run locally

### Option A: Frontend with the hosted backend

From the frontend repository:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000). By default, resource requests use the hosted API.

### Option B: Frontend and backend on your machine

Start the backend in one terminal:

```bash
cd ../yakshakosha-server
node server.js
```

The backend listens on [http://localhost:3001](http://localhost:3001) by default. To use a different port, set `PORT` before starting it.

In another terminal, from the frontend repository, create a local environment file:

```bash
cd ../yakshakosha
printf 'REACT_APP_API_URL=http://localhost:3001\n' > .env.local
npm start
```

Open [http://localhost:3000](http://localhost:3000). The frontend reads `REACT_APP_API_URL` at startup; restart `npm start` after changing `.env.local`. That file is ignored by Git.

The backend serves PDF and story files from its `public/pdfFiles` and `public/stories` directories. Its API routes are:

- `GET /yakshagana/search/prasangaPrathi?query=<prasanga>`
- `GET /yakshagana/search/story?query=<prasanga>`

The frontend also has a curated list of YouTube links in `src/media.json`; those links do not require the backend.

## Other commands

Run the production build:

```bash
npm run build
```

Run the frontend tests:

```bash
npm test
```

## Troubleshooting

- **Port 3000 is already in use:** accept the alternate port prompt from `npm start`, or stop the other process using that port.
- **Resources fail to load with the local backend:** make sure `node server.js` is still running, `.env.local` contains the correct API URL, and you restarted the frontend after creating or editing the file.
- **A specific PDF or story is not found:** confirm a matching file exists in the backend's `public/pdfFiles` or `public/stories` directory. The search uses the prasanga title in the filename.
