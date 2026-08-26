'use strict';
const express = require('express');
const bcrypt = require('bcryptjs');
const { generateTokens, verifyRefresh } = require('../utils/jwt');
const { protect } = require('../middleware/auth');

const router = express.Router();

// In-memory store (use DB em produção)
const users = new Map();
const refreshTokens = new Set();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Nome, email e password são obrigatórios.' });
    if (password.length < 8) return res.status(400).json({ error: 'Password deve ter pelo menos 8 caracteres.' });
    if (users.has(email)) return res.status(409).json({ error: 'Email já registado.' });

    const hash = await bcrypt.hash(password, 12);
    const user = { id: Date.now().toString(), name, email, password: hash, createdAt: new Date().toISOString() };
    users.set(email, user);

    const { accessToken, refreshToken } = generateTokens(user.id, email);
    refreshTokens.add(refreshToken);

    res.status(201).json({ message: 'Conta criada com sucesso!', user: { id: user.id, name, email }, accessToken, refreshToken });
  } catch (e) { res.status(500).json({ error: 'Erro ao criar conta.' }); }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email e password são obrigatórios.' });

    const user = users.get(email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const { accessToken, refreshToken } = generateTokens(user.id, email);
    refreshTokens.add(refreshToken);

    res.json({ message: 'Login efetuado!', user: { id: user.id, name: user.name, email }, accessToken, refreshToken });
  } catch (e) { res.status(500).json({ error: 'Erro no login.' }); }
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.has(refreshToken)) return res.status(401).json({ error: 'Refresh token inválido.' });
  try {
    const { userId, email } = verifyRefresh(refreshToken);
    refreshTokens.delete(refreshToken);
    const tokens = generateTokens(userId, email);
    refreshTokens.add(tokens.refreshToken);
    res.json(tokens);
  } catch { res.status(401).json({ error: 'Refresh token expirado.' }); }
});

// GET /api/auth/me (protected)
router.get('/me', protect, (req, res) => {
  const user = [...users.values()].find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'Utilizador não encontrado.' });
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) refreshTokens.delete(refreshToken);
  res.json({ message: 'Sessão terminada com sucesso.' });
});

module.exports = router;
