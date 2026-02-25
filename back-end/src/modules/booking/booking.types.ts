type status = "pending" | "confirmed";

export interface IAppointment {
  id?: string;
  barberId: string;
  clientName: string;
  clientPhone: string;
  startsAt: Date;
  durationInMinutes: number;
  status: status;
}
