export interface ReservProps {
  name: string;
  phoneNumber: string;
  dateTime: string;
  service: "cabelo" | "barba" | "ambos";
}
export interface HoursListProps {
  number: string;
  available: boolean;
}

export interface CalendarDaysProps {
  date: string;
  available: boolean;
  selected: boolean;
}

export interface CalendarDataProps {
  current: CalendarDaysProps[];
  next: CalendarDaysProps[];
}
