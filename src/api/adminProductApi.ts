import axiosClient from "./axiosClient.ts";

export const adminProductApi = {
    createProduct: async (data: FormData) => {
      const res = await axiosClient.post("/admin/products", data);
      return res;
    },
    getAllProduct: async (page: number, limit: number, search: string) => {
        const res = await axiosClient.get("/admin/products", { params: { page, limit, search } });
        return res;
    },
    
}