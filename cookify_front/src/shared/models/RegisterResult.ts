import { RegisterUserResultEnum } from "../enums/RegisterUserResultEnum";

export interface RegisterResult {
  status: RegisterUserResultEnum | null;
  succeeded: boolean;
}
