import axiosClient from "./axiosClient";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const userApi = {
    register: (data: RegisterData) => axiosClient.post("/users/register", data),
    login: (data: LoginData) => axiosClient.post("/users/login", data),
};