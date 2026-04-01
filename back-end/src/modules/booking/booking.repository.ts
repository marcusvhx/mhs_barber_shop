import db from "../../shared/db/conection";
import { IAppointment } from "./booking.types";

export default class BookingRepository {
  async bookAppointment({
    barberId,
    clientName,
    clientPhone,
    startsAt,
    status,
  }: IAppointment) {
    const appointment = await db.query(
      `INSERT INTO appointments (
    barber_id,
    costumer_name,
    costumer_phone,
    starts_at,
    services,
    sessions,
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [barberId, clientName, clientPhone, startsAt, status],
    );

    return appointment.rows[0];
  }
}
