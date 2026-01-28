# Fluxo de Reserva

```mermaid
flowchart TD
  A[Usuário escolhe horário] --> B[Backend cria booking pending]
  B --> C{Conflito?}
  C -->|Sim| D[Erro]
  C -->|Não| E[Usuário confirma]
  E --> F[Cria evento no Google Calendar]
  F --> G[Booking confirmed]

O sistema utiliza controle de concorrência no banco de dados
para evitar reservas simultâneas no mesmo horário.