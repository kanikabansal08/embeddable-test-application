## Payments Control Center – Test Application

### Overview
This project is a minimal demo that embeds the **Hyperswitch Control Center** (Connector Configuration module) inside a simple React dashboard shell.  
It uses:
- React (Create React App)
- Node/Express backend (`server.js`)
- `hyperswitch-control-center-embedded` for the embedded UI

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Configure Hyperswitch credentials
Edit `server.js` and set your own credentials in the token endpoint call:

```js
headers: {
  "api-key": "YOUR_API_KEY_HERE",
  "x-profile-id": "YOUR_PROFILE_ID_HERE",
  "Content-Type": "application/json",
}
```

The backend exposes:

```txt
GET http://localhost:4000/embedded/hyperswitch
```

### Start backend and frontend

In one terminal (backend):

```bash
npm run server
```

In another terminal (frontend):

```bash
npm start
```

Then open `http://localhost:5000` in your browser.

### How it works
- `server.js` calls the Hyperswitch embedded token API using your API key + profile ID and returns the token.
- `src/App.js` fetches that token, initializes Hyperswitch with `loadHyperswitch`, and renders `ConnectorConfiguration` inside a simple dashboard layout.


