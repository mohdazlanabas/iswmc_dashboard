// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Truck type mapping
const truckTypes = [
  { truckId: 1, truckType: 'Compactor' },
  { truckId: 2, truckType: 'Roll-off' },
  { truckId: 3, truckType: 'Tipper' },
  { truckId: 4, truckType: 'Skip Loader' }
];

// Helper to generate 4 trucks' data with type
function generateTrucks() {
  return truckTypes.map(({ truckId, truckType }) => ({
    truckId,
    truckType,
    tonnage: +(Math.random() * 20).toFixed(2),
    trips: Math.floor(Math.random() * 5) + 1
  }));
}

// Mock data generator for each period
function generateStats(period) {
  const periods = {
    daily: { label: new Date().toISOString().slice(0, 10) },
    weekly: { label: `Week ${Math.ceil(new Date().getDate() / 7)}` },
    monthly: { label: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) },
    yearly: { label: new Date().getFullYear().toString() }
  };
  return {
    period: periods[period].label,
    data: generateTrucks()
  };
}

// Endpoints
app.get('/api/stats/daily', (req, res) => {
  res.json(generateStats('daily'));
});
app.get('/api/stats/weekly', (req, res) => {
  res.json(generateStats('weekly'));
});
app.get('/api/stats/monthly', (req, res) => {
  res.json(generateStats('monthly'));
});
app.get('/api/stats/yearly', (req, res) => {
  res.json(generateStats('yearly'));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});