import { LoginRequest } from "./../models/LoginRequest";
import { AxiosPromise } from "axios";
import { AccountStatusEnum } from "../../shared/enums/AccountStatusEnum";
import { post, get } from "./../BaseApi";
import { BASE_API_URL } from "./../../shared/constants/Constants";

export interface AuthService {
  getAccountStatus(request: LoginRequest): AxiosPromise<AccountStatusEnum>;
  getJwtToken(): AxiosPromise<string>;
}

export class DefaultAuthService implements AuthService {
  private getAccountStatusUrl: string = "/authorization/GetAccountStatus";
  private getJwtTokenUrl: string = "/authorization/GetJwtToken";

  getAccountStatus(request: LoginRequest): AxiosPromise<AccountStatusEnum> {
    return post<AccountStatusEnum>(BASE_API_URL + this.getAccountStatusUrl, request);
  }
  getJwtToken(): AxiosPromise<string> {
    return get<string>(BASE_API_URL + this.getJwtTokenUrl);
  }
}
