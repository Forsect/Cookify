import { JWT_LOCAL_STORAGE_KEY } from "../constants/Constants";
import jwtDecode from "jwt-decode";
import RequestHelper from "./RequestHelper";
import AuthService from "./services/AuthService";

export const refreshToken = async () => {
  try {
    const jwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

    if (jwtToken === null || jwtToken.length === 0) {
      return null;
    }

    const decodedToken = jwtDecode(jwtToken) as any;
    const tokenExp = decodedToken.exp as number;

    const currentTimestamp = Math.round(Date.now() / 1000);

    if (tokenExp > currentTimestamp) {
      return jwtToken;
    }

    const token = await RequestHelper.handleAnyRequest(() =>
      AuthService.getJwtToken()
    );

    if (!token) {
      return null;
    }

    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);

    return token;
  } catch {
    return null;
  }
};
