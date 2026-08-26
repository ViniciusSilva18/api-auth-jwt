'use strict';
const { verifyAccess } = require('../utils/jwt');

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Não autorizado. Token ausente.' });
  try {
    req.user = verifyAccess(header.split(' ')[1]);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
module.exports = { protect };
