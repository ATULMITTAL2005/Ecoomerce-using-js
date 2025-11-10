<<<<<<< HEAD
# Ecoomerce-using-js
=======
# Ecommerce-using-js
>>>>>>> 105d711d084e844591d63c818382553481374352

A small full-stack e-commerce demo built with a React (Vite) frontend and a Node + Express + MongoDB backend. The repository contains a frontend site (in `Ecommerce/`) and a backend API server (in `backend/`).

## Quick overview

- Frontend: React + Vite, Tailwind CSS, React Router. Source in `Ecommerce/src/`.
- Backend: Node.js (ES modules) + Express, MongoDB (Mongoose), Cloudinary for image uploads. Source in `backend/`.

## Key features

- Product listing pages and product detail pages
- Cart and checkout flow (Razorpay / Stripe packages are included)
- User authentication model present (see `backend/models/userModel.js`)
- Cloudinary image uploads support

## Repo structure (top-level)

- `backend/` — Express API server
  - `Server.js` — entry point
  - `config/` — MongoDB and Cloudinary configuration
  - `controllers/`, `models/`, `routes/`, `middleware/`
- `Ecommerce/` — frontend app (Vite + React)
  - `src/` — React components, pages, context
  - `index.html`, `vite.config.js`, `tailwind.config.js`

## Prerequisites

- Node.js (v14+ recommended, install from https://nodejs.org/)
- npm (bundled with Node) or yarn
- A running MongoDB instance or MongoDB Atlas connection string
- (Optional) Cloudinary account for image uploads

## Environment variables

Create a `.env` file inside the `backend/` folder (or set environment variables) with values like:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=4000
CLOUDINARY_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET_KEY=<your-cloudinary-secret>
# Add other secrets as needed (JWT secret, payment keys, etc.)
```

Notes:

- `mongodb.js` expects `process.env.MONGODB_URI` and appends `/e-commerce` to it. Provide the base connection string (e.g., `mongodb+srv://user:pass@host` or `mongodb://localhost:27017`).
- `cloudinary.js` expects `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_SECRET_KEY`.

## Install & run (development)

Open two terminals (one for backend, one for frontend).

Backend:

```powershell
cd backend
npm install
# Use nodemon in development (package.json has a "server" script)
npm run server
# or run the production start script:
npm start
```

Frontend (Ecommerce):

```powershell
cd Ecommerce
npm install
npm run dev
```

- The backend default port is `4000` (see `Server.js`).
- The frontend uses Vite (default dev port is typically `5173`).

## Build for production

Frontend:

```powershell
cd Ecommerce
npm run build
# then serve the `dist/` with a static server or integrate with the backend
```

Backend:

```powershell
cd backend
# ensure NODE_ENV=production and required env vars are set
npm start
```

## What the package.json files contain (useful scripts)

- `backend/package.json` scripts:

  - `server` — runs `nodemon server.js` (dev)
  - `start` — runs `node server.js` (prod)

- `Ecommerce/package.json` scripts:
  - `dev` — runs Vite dev server
  - `build` — builds the production bundle
  - `preview` — previews the built bundle

## Notes & troubleshooting

- If the backend cannot connect to MongoDB, confirm `MONGODB_URI` and network access (IP whitelist for Atlas).
- If Cloudinary logs don't appear, verify the Cloudinary env vars and credentials.
- If you change ports, update the frontend API base URL where applicable (search for fetch calls or a configuration file in `Ecommerce/src`).

## Next steps / potential improvements

- Add an `.env.example` file listing required env vars
- Add README sections for API endpoints (document routes in `backend/routes/`)
- Add tests for backend routes and frontend components

## Contributing

Feel free to open issues or submit pull requests. Keep code style consistent with the existing project (Tailwind + React conventions).

## License

Add a LICENSE file if you want to open-source this project. Currently no license is specified.
