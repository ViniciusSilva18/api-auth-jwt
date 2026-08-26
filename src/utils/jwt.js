'use strict';
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_in_prod';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_in_prod';

const generateTokens = (userId, email) => ({
  accessToken: jwt.sign({ userId, email }, ACCESS_SECRET, { expiresIn: '15m' }),
  refreshToken: jwt.sign({ userId, email }, REFRESH_SECRET, { expiresIn: '7d' }),
});

const verifyAccess = (token) => jwt.verify(token, ACCESS_SECRET);
const verifyRefresh = (token) => jwt.verify(token, REFRESH_SECRET);

module.exports = { generateTokens, verifyAccess, verifyRefresh };
