import jwtDecode from "jwt-decode";
import { action, makeObservable, observable } from "mobx";
import { User } from "./../models/User";
import { JWT_LOCAL_STORAGE_KEY } from "../constants/Constants";
import { AuthResult } from "./../models/AuthResult";
import RequestHelper from "../api/RequestHelper";
import AuthService from "./../api/services/AuthService";
import { AccountStatusEnum } from "../enums/AccountStatusEnum";
import { RegisterResult } from "./../models/RegisterResult";
import UserService from "../api/services/UserService";
import { RegisterUserResultEnum } from "../enums/RegisterUserResultEnum";

class UserStore {
  authorizeUserIsLoading: boolean = false;
  registerUserIsLoading: boolean = false;
  currentUser: User = {} as User;

  constructor() {
    makeObservable(this, {
      authorizeUserIsLoading: observable,
      registerUserIsLoading: observable,
      currentUser: observable,
      setCurrentUser: action,
    });
  }

  setCurrentUser() {
    this.currentUser = jwtDecode(localStorage.getItem(JWT_LOCAL_STORAGE_KEY) || "") as User;
  }

  async authorizeUser(login: string, password: string): Promise<AuthResult> {
    try {
      this.authorizeUserIsLoading = true;

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
      this.authorizeUserIsLoading = false;
    }
  }

  async registerUser(login: string, password: string): Promise<RegisterResult> {
    try {
      this.registerUserIsLoading = true;

      const status = await RequestHelper.handleAnyRequest(() => UserService.registerUser({ login, password }));

      if (status !== RegisterUserResultEnum.UserCreated) {
        return { status: status, succeeded: false };
      }

      return { status: RegisterUserResultEnum.UserCreated, succeeded: true };
    } catch {
      return { status: null, succeeded: false };
    } finally {
      this.registerUserIsLoading = false;
    }
  }
}

export default UserStore;
