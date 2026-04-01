# README — Reservas MHS (Back-end) ✅

## Descrição rápida

Aplicação back-end para um sistema de reservas de uma barbearia. Serve como API para gerenciar usuários, barbeiros e agendamentos, além de fornecer autenticação (inclui Google OAuth e JWT) e persistência em PostgreSQL.

---

## Funcionalidades principais ✨

- Gestão de usuários (registro/login via OAuth e/ou JWT).
- Gestão de barbeiros (cadastro e dados relacionados).
- Criação, listagem e gestão de agendamentos (appointments).
- Conexão com PostgreSQL e suporte a migrações.
- Testes unitários (Vitest) e endpoints testáveis com Supertest.

---

## Estrutura de pastas (visão geral) 📁

# Glossário

- `services` - componente com a lógica e regras de negócio
- `repository` - componente com acesso ao DB relacionado ao próprio modulo
- `controller` - componente controlador das rotas e end-points
- `types` - componente de contratos do módulo
- `spec` - componente de testes do módulo

```
/ (root)
├─ docker-compose.yaml
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts           # Configuração de testes
├─ migrations/                # Scripts de migração do banco
│   └─ (arquivos de migrations)
├─ src/
│  ├─ app.ts                  # Configuração do Express (middlewares, rotas)
│  ├─ server.ts               # Entrypoint da aplicação (inicia servidor)
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.services.ts
│  │  │  ├─ auth.repository.ts
│  │  │  ├─ auth.types.ts
│  │  │  ├─ google.oauth.ts
│  │  │  └─ tests/
│  │  │     └─ auth.services.spec.ts
│  │  └─ booking/
│  │     ├─ booking.types.ts
│  │     ├─ booking.services.ts
│  │     └─ booking.repository.ts
│  └─ shared/                 # pasta elementos utilizados por varios componentes
│     ├─ errors.ts
│     └─ db/
│        ├─ conection.ts
│        ├─ users.ts
│        ├─ barbers.ts
│        └─ appointments.ts
```

---

# End-Points

### /barber

| End-Point           | HTTP | Descrição                                     |
|---------------------|------|-----------------------------------------------|
| `/create`           | POST | cria um novo barbeiro no sistema              |
| `/get-all`          | GET  | pegar todos os barbeiros                      |
| `/unavailable-days` | GET  | pega os dias indisponiveis de um barbeiro     |
| `/unavailable-days` | PUT  | atualiza os dias indisponiveis de um barbeiro |

### Responses

`create`
```

```

### /auth

| End-Point           | HTTP | Descrição                                         |
|---------------------|------|---------------------------------------------------|
| `/login`            | GET  | redireciona o client para seleção da conta google |
| `/oauth/callback`   | GET  | acessa os tokens google                           |

## Dependências 📦

**Produção**

- `express` — framework HTTP para criar a API.
- `cors` — gerenciar políticas CORS para requisições externas.
- `dotenv` — carregar variáveis de ambiente a partir de `.env`.
- `google-auth-library` — fazer autenticação via Google OAuth.
- `jsonwebtoken` — emitir e validar tokens JWT.
- `pg` — driver PostgreSQL para Node.js.

**Desenvolvimento / Testes**

- `typescript` — linguagem usada no projeto.
- `vitest` — executor de testes unitários.
- `supertest` — para testar endpoints HTTP.
- `node-pg-migrate` — executar migrações no banco

---

## Scripts (definidos em `package.json`) ⚙️

- `pnpm run dev` — executa `ts-node server.ts` (inicia servidor em modo desenvolvimento).
- `pnpm test` — executa testes com Vitest.

---

## Variáveis de ambiente relevantes (mencionadas) 🔐

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — usadas em `docker-compose.yaml` para criar o banco.
- `PGADMIN_EMAIL`, `PGADMIN_PASSWORD` — credenciais do pgAdmin.
- Possíveis variáveis esperadas pelo projeto (não listadas explicitamente nos arquivos expostos): `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`.

---

## Migrações & Banco de dados 🗂️

- `create-first-tables.js` — arquivo de migração inicial que cria as tabelas básicas (usuários, barbeiros, appointments, etc.).
- A conexão e queries ficam em `src/shared/db/*`.

---

## Testes 🧪

- Testes do módulo `auth` em `src/modules/auth/tests/auth.services.spec.ts`.
- Testes são executados com `npm test` (Vitest).
