# Fluxo de Autenticação com Google

```mermaid
sequenceDiagram
  participant User
  participant Frontend
  participant Backend
  participant Google

  User->>Frontend: Clica em "Entrar com Google"
  Frontend->>Backend: /login
  Backend->>Google: redirect OAuth
  Google->>Backend: /oauth/callback (code)
  Backend->>Google: troca code por tokens
  Backend->>Frontend: JWT
