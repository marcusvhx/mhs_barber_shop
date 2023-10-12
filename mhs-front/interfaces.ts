import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
}

// ===================== reservas ========================
export interface SelectedReservProps {
  id: string;
  service: "cabelo" | "barba" | "ambos";
  dateTime: string;
  status: "pendente" | "concluido" | "perdido" | "atrasado";
}

export type SetSelectedReserv = Dispatch<SetStateAction<SelectedReservProps>>;
export interface ReservProps extends SelectedReservProps {
  userId: string;
}
export type SetReservsList = Dispatch<SetStateAction<ReservProps[]>>;

export interface ReservPropsWithCostumer extends SelectedReservProps {
  ownerName: string;
  ownerPhone: string;
}
export type SetSelectedReservWithCostimer = Dispatch<SetStateAction<ReservPropsWithCostumer[]>>;

export interface ReservFormProps {
  dateTime: string;
  service: "cabelo" | "barba" | "ambos";
}

export type SetReservFormProps = Dispatch<SetStateAction<ReservFormProps>>;

// ===================== calendario, inp de data ========================
export interface ReservTime {
  number: string;
  available: boolean;
}
export interface ReservTimeList {
  mainList: ReservTime[];
  backUpList: ReservTime[];
}

// ===================== resposta de input ========================
export interface VerifiesFormProps {
  condition: boolean;
  msg: string;
}

/** e =>{} */
export type InpEvent = ChangeEvent<HTMLInputElement>;

export type SetBool = Dispatch<SetStateAction<boolean>>;
