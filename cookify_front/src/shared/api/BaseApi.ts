import axios from "axios";

const baseApi = axios.create();

export function post<T>(url: string, data: any) {
  return baseApi.post<T>(url, { ...data }, { withCredentials: true });
}

export function deleteWithJwt<T>(url: string, jwtToken: string, data: any) {
  return baseApi.delete<T>(url, {
    withCredentials: true,
    headers: { Authentication: jwtToken },
    data: { ...data },
  });
}

export function postWithJwt<T>(url: string, jwtToken: string, data: any) {
  return baseApi.post<T>(
    url,
    { ...data },
    { withCredentials: true, headers: { Authentication: jwtToken } }
  );
}

export function get<T>(url: string) {
  return baseApi.get<T>(url, { withCredentials: true });
}

export function getWithJwt<T>(url: string, jwtToken: string) {
  return baseApi.get<T>(url, { headers: { Authentication: jwtToken } });
}
