import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import api from './routes/api.js';
import { initFirebase } from './firebase.js';
import { runReminderSweep } from './services/notifications.js';

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(helmet());

app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(v => v.trim()),
  credentials: true
}));

app.use(express.json({ limit: '3mb' }));
app.use(rateLimit({ windowMs: 900000, max: 300 }));

const health = {
  name: 'ACTRA',
  status: 'running',
  version: '3.0.0'
};

app.get('/', (req, res) => res.json(health));
app.get('/health', (req, res) => res.json(health));

try {
  initFirebase();
} catch (e) {
  console.error('Firebase startup:', e.message);
}

app.use('/api', api);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

if (process.env.ENABLE_REMINDER_WORKER === 'true') {
  cron.schedule('*/5 * * * *', () =>
    runReminderSweep().catch(console.error)
  );
}

app.listen(port, '0.0.0.0', () => {
  console.log(`ACTRA backend running on port ${port}`);
});
