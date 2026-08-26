<div align="center">

# 🔐 API Auth JWT — Autenticação Segura

**API de autenticação completa com JWT, Refresh Tokens, bcrypt e rate limiting.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)]()
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)]()

</div>

<div align="center">
  <a href="https://github.com/ViniciusSilva18/api-auth-jwt">
    <img src="https://komarev.com/ghpvc/?username=ViniciusSilva18-api-auth-jwt&label=Visualiza%C3%A7%C3%B5es&color=06b6d4&style=flat" alt="Views" />
  </a>
</div>


## ✨ Funcionalidades
- 🔑 JWT com Access Token (15min) + Refresh Token (7d)
- 🔒 Hashing bcrypt com salt 12
- ⛔ Rate limiting por IP (10 req/15min em auth)
- 🛡️ Middleware de autorização reutilizável
- ✅ Validação de inputs e mensagens de erro seguras

## 🚀 Endpoints
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Criar conta |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Renovar tokens |
| GET | `/api/auth/me` | Perfil (protegido) |
| POST | `/api/auth/logout` | Logout |

## 🛠️ Setup
```bash
git clone https://github.com/ViniciusSilva18/api-auth-jwt.git
cd api-auth-jwt
npm install
cp .env.example .env  # Edite com secrets seguros
npm run dev
```

---
<sub>Criado por <a href="https://github.com/ViniciusSilva18">ViniciusSilva18</a> — VibeCoder 🇵🇹</sub>
