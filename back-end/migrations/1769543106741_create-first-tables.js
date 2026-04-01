/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.sql(` CREATE TABLE IF NOT EXISTS google_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`);

  pgm.sql(` CREATE TABLE IF NOT EXISTS barbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_account_id UUID NOT NULL REFERENCES google_accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    profession TEXT NOT NULL,
    unavailable_days DATE[],
    num_of_appointments SMALLINT NOT NULL DEFAULT 0
  );`);

  pgm.sql(` CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    barber_id UUID NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    services TEXT[] NOT NULL,
    sessions SMALLINT NOT NULL,
    costumer_name TEXT NOT NULL,
    costumer_phone TEXT NOT NULL,
  );`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("appointments");
  pgm.dropTable("barbers");
  pgm.dropTable("google_accounts");
};
