import jwtDecode from "jwt-decode";
import { action, makeObservable, observable } from "mobx";
import { User } from "./../models/User";
import { JWT_LOCAL_STORAGE_KEY } from "../constants/Constants";
import { AuthResult } from "./../models/AuthResult";
import RequestHelper from "../api/RequestHelper";
import AuthService from "./../api/services/AuthService";
import { AccountStatusEnum } from "../enums/AccountStatusEnum";

class UserStore {
  isLoading: boolean = false;
  currentUser: User = {} as User;

  constructor() {
    makeObservable(this, { isLoading: observable, currentUser: observable, setCurrentUser: action });
  }

  setCurrentUser() {
    this.currentUser = jwtDecode(localStorage.getItem(JWT_LOCAL_STORAGE_KEY) || "") as User;
  }

  async authorizeUser(login: string, password: string): Promise<AuthResult> {
    try {
      this.isLoading = true;

      const status = await RequestHelper.handleAnyRequest(() => AuthService.getAccountStatus({ login, password }));

      if (status !== AccountStatusEnum.Valid) {
        return { status: status, succeeded: false };
      }

      const token = await RequestHelper.handleAnyRequest(() => AuthService.getJwtToken());

      if (!token) {
        return { status: AccountStatusEnum.Valid, succeeded: false };
      }

      localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
      this.currentUser = jwtDecode(token) as User;

      return { status: AccountStatusEnum.Valid, succeeded: true };
    } catch {
      return { status: null, succeeded: false };
    } finally {
      this.isLoading = false;
    }
  }
}

export default UserStore;
