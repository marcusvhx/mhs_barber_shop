
# Arquitetura do Sistema

## Backend (Node.js)

src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── google.oauth.ts
│   ├── bookings/
│   │   ├── booking.controller.ts
│   │   ├── booking.service.ts
│   │   └── booking.repository.ts
│   └── users/
├── shared/
│   ├── db.ts
│   ├── jwt.ts
│   └── errors.ts

### Modelo similar ao MVC

- controller: recebe requisições HTTP
- service: regras de negócio
- repository: acesso ao banco
