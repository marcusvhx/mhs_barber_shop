import db from "../../shared/db/conection";

export default class BarberRepository {
  async getById(barberId: string) {
    try {
      const barber = await db.query("SELECT * FROM barbers WHERE id = $1", [
        barberId,
      ]);
      return barber.rows[0];
    } catch (err) {
      console.error("Error in getById (BarberRepository):\n" + err);
      return "erro ao tentar achar o barbeiro";
    }
  }

  async getAll() {
    const barbers = [{}]
    // const barbers = await db.query("SELECT * FROM barbers");
    // return barbers.rows;
  }

  async create(
    name: string,
    googleId: string,
    profession: string,
    unavailableDays: string[],
  ) {
    try {
      const barber = await db.query(
        `INSERT INTO barbers (
        name, 
        google_account_id, 
        profession, 
        unavailable_days
        ) VALUES (
        $1, $2, $3, $4
        )`,
        [name, googleId, profession, unavailableDays],
      );
      return "Barbeiro criado com sucesso";
    } catch (err) {
      throw new Error("Error in create (barberRepository):\n" + err);
    }
  }

  async getUnavailableDays(barberId: string) {
    try {
      const barber = await db.query(
        "SELECT unavailable_days FROM barbers WHERE id = $1",
        [barberId],
      );
      return barber.rows[0];
    } catch (err) {
      throw new Error(
        "Error in getUnavailableDays (barberRepository):\n" + err,
      );
    }
  }

  async setUnavailableDays(barberId: string, unavailableDays: Date[]) {
    try {
      const barber = await db.query(
        "UPDATE barbers SET unavailable_days = $1 WHERE id = $2 RETURNING (id, unavailable_days)",
        [unavailableDays, barberId],
      );
      return barber.rows[0];
    } catch (err) {
      throw new Error(
        "Error in setUnavailableDays (barberRepository):\n" + err,
      );
    }
  }
  
}
