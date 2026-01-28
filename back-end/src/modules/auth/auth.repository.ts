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

  async findAccountByEmail(email: string) {
    if (!email) throw new Error("Email is required");

    try {
      const query = await db.query(
        `SELECT * FROM google_accounts WHERE email = $1`,
        [email],
      );

      if (query.rows.length === 0) throw new Error("User not found");
      
      const googleAccount: IGoogleAccount = query.rows[0];      
      return googleAccount;
    } catch (err) {
      throw new Error("Error in findUserByEmail:\n" + err);
    }
  }
}
