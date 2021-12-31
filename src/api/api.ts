import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "5a063c6f-71b9-4b11-9633-305ea5213c14"
  }
});

export enum ResultCodeEnum {
  success = 0,
  error = 1,
}

export interface IAPIResponse<D> {
  data: D;
  resultCode: ResultCodeEnum;
  messages: Array<string>;
}


