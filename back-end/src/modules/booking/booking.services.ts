import { IAppointment } from "./booing.types";

export default class BookingServices {
  async bookToBarber({
    barberId,
    clientName,
    clientPhone,
    durationInMinutes,
    startsAt,
    status,
  }: IAppointment) {
    
  }
}
