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

export interface UserData {
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface ReservData {
  userId: string;
  id: number;
  service: string;
  dateTime: Date;
  status: string;
}

export interface UserDataWithCostumer extends ReservData {
  ownerName: string;
  ownerPhone: string;
}
