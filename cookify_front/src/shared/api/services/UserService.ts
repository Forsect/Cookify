import { AxiosPromise } from "axios";
import { BASE_API_URL } from "../../constants/Constants";
import { RegisterUserResultEnum } from "../../enums/RegisterUserResultEnum";
import { RegisterRequest } from "./../../models/RegisterRequest";
import { post } from "./../BaseApi";

interface UserService {
  registerUser(request: RegisterRequest): AxiosPromise<RegisterUserResultEnum>;
}

export class DefaultUserService implements UserService {
  private registerUserUrl: string = "/user/RegisterUser";

  registerUser(request: RegisterRequest): AxiosPromise<RegisterUserResultEnum> {
    return post<RegisterUserResultEnum>(
      BASE_API_URL + this.registerUserUrl,
      request
    );
  }
}

export default new DefaultUserService();
