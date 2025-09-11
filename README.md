# Integrated Solid Waste Management Center Dashboard

A real-time waste collection monitoring dashboard for ISWMC, built with React (Vite) frontend and a Node.js/Express backend. The dashboard visualizes lorry operations, tonnage, and types, and is designed for deployment on Netlify (frontend) and Google Cloud Run (backend).

## Features
- Real-time dashboard for daily, weekly, monthly, and yearly waste operations
- Displays total lorries, tonnage, and breakdown by lorry type
- Supports 6 lorry types: Compactor, Roll-off, Tipper, Skip Loader, Lifter, Dumper
- Responsive, modern UI
- Backend API for live data (Node.js/Express)

## Lorry Types
| Type         | Example Capacity (tons) |
|--------------|------------------------|
| Compactor    | 9                      |
| Roll-off     | 5                      |
| Tipper       | 1.5                    |
| Skip Loader  | 5                      |
| Lifter       | 2                      |
| Dumper       | 8                      |

## Project Structure
```
ISWMC_DB/
├── backend/           # Node.js/Express backend API
│   ├── index.js
│   └── package.json
├── src/               # React frontend source
│   ├── App.tsx
│   └── components/
├── index.html
├── package.json       # Frontend dependencies/scripts
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Google Cloud SDK (for backend deployment)

### 1. Backend Setup (Local)
```sh
cd backend
npm install
npm start
```
- The backend runs on http://localhost:4000 by default.

### 2. Frontend Setup (Local)
```sh
cd .. # Project root
npm install
npm run dev
```
- The frontend runs on http://localhost:5173 (or similar).

### 3. Deploying Backend to Google Cloud Run
```sh
cd backend
# Authenticate and set project if needed
# gcloud auth login
# gcloud config set project YOUR_PROJECT_ID

gcloud run deploy iswmc-backend \
  --source . \
  --region YOUR_REGION \
  --platform=managed \
  --allow-unauthenticated
```
- Replace `YOUR_PROJECT_ID` and `YOUR_REGION` as appropriate.

### 4. Deploying Frontend to Netlify
- Push your code to GitHub.
- Connect your repo to Netlify.
- Set build command: `npm run build`
- Set publish directory: `dist`
- Set environment variable for backend API URL if needed.

## API Endpoints (Backend)
- `/api/stats/daily`
- `/api/stats/weekly`
- `/api/stats/monthly`
- `/api/stats/yearly`

Each returns JSON with all 6 lorry types and their stats.

## Customization
- To add or change lorry types, update both the backend's `truckTypes` array and the frontend's `lorryTypes` mapping.
- To adjust UI spacing, edit padding/margin in `App.tsx` and component files.

## License
MIT
