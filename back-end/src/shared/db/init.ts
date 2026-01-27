import db from "./conection";

export default  class InitDB {
  public async init() {
    await this.enableExtensions();
    await this.googleAccounts();
    await this.Barbers();
    await this.Appointments();
  }

  private async enableExtensions() {
    await db.query(
      `CREATE EXTENSION IF NOT EXISTS pgcrypto;
`,
    );
  }
  private async googleAccounts() {
    await db.query(
      `CREATE TABLE IF NOT EXISTS google_accounts(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,

        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`,
    );
  }

  private async Barbers() {
    await db.query(
      `CREATE TABLE IF NOT EXISTS barbers(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,

        profession TEXT NOT NULL,
        unavailable_days TEXT[] NOT NULL,

        google_account_id UUID NOT NULL
          REFERENCES google_accounts(id)
      )`,
    );
  }

  private async Appointments() {
    await db.query(
      `CREATE TABLE IF NOT EXISTS appointments(
        id SERIAL PRIMARY KEY,
        
        barber_id UUID NOT NULL
          REFERENCES barbers(id),

        service TEXT NOT NULL,

        client_name TEXT NOT NULL,
        client_number TEXT NOT NULL,
        
        starts_at TIMESTAMPTZ NOT NULL,
        ends_at TIMESTAMPTZ NOT NULL,    
        
        status TEXT NOT NULL
          CHECK (status IN ('pending', 'confirmed'))
      )`,
    );
  }
}
