import db from "../../shared/db/conection";
import { IAppointment } from "./booing.types";

export default class BookingRepository {
  async bookAppointment({
    barberId,
    clientName,
    clientPhone,
    durationInMinutes,
    startsAt,
    status,
  }: IAppointment) {
    const appointment = await db.query(
      `INSERT INTO appointments (
      barber_id,
      client_name,
      client_phone,
      duration_in_minutes,
      starts_at,
      status
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [barberId, clientName, clientPhone, durationInMinutes, startsAt, status],
    );

    return appointment.rows[0];
  }
}
