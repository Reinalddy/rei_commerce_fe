import axiosClient from "./axiosClient.ts";

export const adminProductApi = {
    createProduct: async (data: FormData) => {
      const res = await axiosClient.post("/admin/products", data, { headers: { "Content-Type": "multipart/form-data" } });
      return res;
    },
    updateProduct: async (id: number, data: FormData) => {
        const res = await axiosClient.put(`/admin/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        return res;
    },
    deleteProduct: async (id: number) => {
        const res = await axiosClient.delete(`/admin/products/${id}`, { headers: { "Content-Type": "application/json" } });
        return res;
    },
    createVariant : async (data: FormData) => {
        const res = await axiosClient.post("/admin/products/variant", data, { headers: { "Content-Type": "multipart/form-data" } });
        return res;
    },
    getAllProduct: async (page: number, limit: number, search: string) => {
        const res = await axiosClient.get("/admin/products", { params: { page, limit, search } });
        return res;
    },
    getAllProductCategory: async () => {
        const res = await axiosClient.get("/admin/products/category", {headers: { "Content-Type": "application/json" }});
        return res;
    },
    
}