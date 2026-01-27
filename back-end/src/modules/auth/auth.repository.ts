import db from "../../shared/db/conection";
import { IGoogleAccount } from "./auth.types";

export default class AuthRepository {
  async postNewAccount({
    email,
    access_token,
    refresh_token,
    expires_at,
  }: IGoogleAccount) {
    const res = await db.query(
      `INSERT INTO google_accounts (
            email,
            access_token,
            refresh_token,
            expires_at
            ) VALUES (
             $1, $2, $3, $4
            ) RETURNING id;`,
      [email, access_token, refresh_token, expires_at],
    );
  }
}
