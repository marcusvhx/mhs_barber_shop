import { UUID } from "crypto";

export interface IGoogleAccount {
  id?: UUID;
  email: string;
  access_token: string;
  refresh_token: string;
  expires_at: Date;
  created_at?: Date;
}
