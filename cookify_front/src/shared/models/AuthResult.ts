import { AccountStatusEnum } from "../enums/AccountStatusEnum";

export interface AuthResult {
  status: AccountStatusEnum | null;
  succeeded: boolean;
}
