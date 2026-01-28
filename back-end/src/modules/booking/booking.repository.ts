import { IAppointment } from "./booing.types";

export default class BookingRepository {
  async bookAppointment({
    barberId,
    clientName,
    clientPhone,
    durationInMinutes,
    startsAt,
    status,
  }: IAppointment) {}
}
