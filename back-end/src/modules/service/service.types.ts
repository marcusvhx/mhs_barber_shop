export interface IService {
  id: number;
  type:"cabelo" | "barba" | "sobrancelha" | "infantil";
  name: string;
  sessions: number;
  price: number;
}