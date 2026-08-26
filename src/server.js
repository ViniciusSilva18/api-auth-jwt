'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Security: Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Demasiados pedidos. Tente novamente em 15 minutos.' } });
app.use('/api/', limiter);

// Auth rate limit (more strict)
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Demasiadas tentativas de login.' } });

app.use('/api/auth', authLimiter, authRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'online', version: '1.0.0', endpoints: ['/api/auth/register', '/api/auth/login', '/api/auth/refresh', '/api/auth/me'] });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => console.log(`🔐 API Auth JWT rodando em http://localhost:${PORT}`));
