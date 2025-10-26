import axiosClient from "./axiosClient.ts";

export const authApi = {
    adminLogin: async (email: string, password: string) => {
        const res = await axiosClient.post("/admin/login", { email, password });
        return res.data;
    },
};