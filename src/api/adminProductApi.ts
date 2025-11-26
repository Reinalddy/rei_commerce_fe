import axiosClient from "./axiosClient.ts";

export const adminProductApi = {
    getTotalProduct: async () => {
        const res = await axiosClient.get("/admin/products/total-product", { headers: { "Content-Type": "application/json" } });
        return res;  
    },
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
    getTotalVariant: async () => {
        const res = await axiosClient.get("/admin/products/variant/get-total-variant", { headers: { "Content-Type": "application/json" } });
        return res;
    },
    fetchVariants: async (productId: number) => {
      const res = await axiosClient.get(`/admin/products/variant/${productId}`, { headers: { "Content-Type": "application/json" } });
      return res;  
    },
    createVariant : async (data: FormData) => {
        const res = await axiosClient.post("/admin/products/variant", data, { headers: { "Content-Type": "multipart/form-data" } });
        return res;
    },
    updateVariant: async (id: number, data: FormData) => {
      const res = await axiosClient.put(`/admin/products/variant/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      return res;  
    },
    deleteVariant: async (id: number) => {
        const res = await axiosClient.delete(`/admin/products/variant/${id}`, { headers: { "Content-Type": "application/json" } });
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