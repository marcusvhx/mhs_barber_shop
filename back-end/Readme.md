# README — Reservas MHS (Back-end) ✅

## Descrição rápida

Aplicação back-end para um sistema de reservas (barbearia). Serve como API para gerenciar usuários, barbeiros e agendamentos, além de fornecer autenticação (inclui Google OAuth e JWT) e persistência em PostgreSQL.

---

## Funcionalidades principais ✨

- Gestão de usuários (registro/login via OAuth e/ou JWT).
- Gestão de barbeiros (cadastro e dados relacionados).
- Criação, listagem e gestão de agendamentos (appointments).
- Conexão com PostgreSQL e suporte a migrações.
- Testes unitários (Vitest) e endpoints testáveis com Supertest.

---

## Estrutura de pastas (visão geral) 📁

```
/ (raiz do back-end)
├─ docker-compose.yaml        # Serviço Postgres + pgAdmin
├─ package.json               # Scripts e dependências
├─ tsconfig.json              # Configuração TypeScript
├─ vitest.config.ts           # Configuração de testes
├─ migrations/                # Scripts de migração do banco
│   └─ 1769543106741_create-first-tables.js
├─ src/
│  ├─ app.ts                  # Configuração do Express (middlewares, rotas)
│  ├─ server.ts               # Entrypoint da aplicação (inicia servidor)
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts   # Handlers de rota para autenticação
│  │  │  ├─ auth.services.ts     # Lógica de autenticação (login, verificação)
│  │  │  ├─ auth.repository.ts   # Acesso a dados relacionado a auth (usuários)
│  │  │  ├─ auth.types.ts        # Tipos/Interfaces do módulo auth
│  │  │  ├─ google.oauth.ts      # Integração com Google OAuth
│  │  │  └─ tests/               # Testes do módulo auth
│  │  │     └─ auth.services.spec.ts
│  │  └─ booking/
│  │     ├─ booing.types.ts      # Tipos/Interfaces para bookings (typo no nome: "booing")
│  │     ├─ booking.services.ts  # Lógica de negócios para agendamentos
│  │     └─ booking.repository.ts# Acesso a dados para agendamentos
│  └─ shared/
│     ├─ errors.ts               # Erros customizados/handlers de erro
│     └─ db/
│        ├─ conection.ts         # Conexão com PostgreSQL (pool/cliente)
│        ├─ init.ts              # Inicializações (seed, criação de tabelas auxiliares)
│        ├─ users.ts             # Consultas/queries relacionadas a usuários
│        ├─ barbers.ts           # Consultas/queries relacionadas a barbeiros
│        └─ appointments.ts      # Consultas/queries relacionadas a agendamentos
```

> Observação: existe um pequeno erro de digitação no arquivo `booing.types.ts` (deveria ser `booking.types.ts`).

---

## Explicação dos arquivos/nomes importantes 🔧

- `docker-compose.yaml` — define um container Postgres e um container pgAdmin para administrar o banco localmente. Usa variáveis de ambiente para credenciais.
- `package.json` — lista dependências, devDependencies e scripts (`dev`, `test`).
- `tsconfig.json` — configurações do TypeScript.
- `migrations/` — scripts para criar e alterar esquema do banco (executado por ferramentas de migração).

Dentro de `src/`:
- `app.ts` — instancia o Express, aplica middlewares (cors, bodyParser, tratamento de erro) e registra rotas.
- `server.ts` — inicia o servidor HTTP (importa `app.ts` e executa `app.listen`).
- `modules/auth/*` — responsabilidade pela autenticação (rotas, lógica, integração com Google OAuth e geração/verificação de JWT).
- `modules/booking/*` — regras e persistência dos agendamentos.
- `shared/errors.ts` — centraliza erros customizados e formatos de resposta de erro.
- `shared/db/*` — abstrai a conexão com PostgreSQL e queries específicas (usuários, barbeiros, agendamentos).

---

## Dependências e propósito 📦

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
- `node-pg-migrate` — executar migrações no banco (presumivelmente usado para criar tabelas iniciais).
- `@types/*` — definições TypeScript para bibliotecas usadas.

> Nota: o script `dev` usa `ts-node` para executar `server.ts` diretamente (pode exigir instalação global ou como devDependency se ainda não estiver presente).

---

## Scripts (definidos em `package.json`) ⚙️

- `npm run dev` — executa `ts-node server.ts` (inicia servidor em modo desenvolvimento).
- `npm test` — executa testes com Vitest.

---

## Variáveis de ambiente relevantes (mencionadas) 🔐

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — usadas em `docker-compose.yaml` para criar o banco.
- `PGADMIN_EMAIL`, `PGADMIN_PASSWORD` — credenciais do pgAdmin.
- Possíveis variáveis esperadas pelo projeto (não listadas explicitamente nos arquivos expostos): `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`.

---

## Migrações & Banco de dados 🗂️

- `migrations/1769543106741_create-first-tables.js` — arquivo de migração inicial que cria as tabelas básicas (usuários, barbeiros, appointments, etc.).
- A conexão e queries ficam em `src/shared/db/*`.

---

## Testes 🧪

- Testes do módulo `auth` em `src/modules/auth/tests/auth.services.spec.ts`.
- Testes são executados com `npm test` (Vitest).

---

## Observações finais 💡

- O README foi elaborado para explicar o propósito do sistema, a organização do código e o papel das dependências e arquivos principais.
- Para executar localmente, normalmente basta subir o Postgres (via `docker-compose up -d`), ajustar variáveis de ambiente e executar `npm run dev` (ou usar uma ferramenta de build se preferir compilar TypeScript primeiro).

---

Se quiser, eu posso também gerar um README com instruções de execução passo a passo (instalação, variáveis de ambiente, comandos de migração) ou corrigir pequenas inconsistências (como o `booing.types.ts`).
