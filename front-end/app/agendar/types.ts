export type ITextInput = { placeholder: string };

export interface ISelectInput extends ITextInput {
  options: string[];
}

export interface IDateInput extends ITextInput {
  unavailableDays: Date[];
}

export interface IAppointmentData {
  service: string;
  barber: string;
  date: string;
  time: string;
  clientName: string;
  clientPhoneNumber: string;
}

export interface IInputProps {
  placeholder: string;
  name: keyof IAppointmentData;
  className?: string;
  disabled?: boolean;
}
