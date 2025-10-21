import axiosClient from "./axiosClient";
import { Product } from "../types/product";

export const productApi = {
    getAll: () => axiosClient.get<Product[]>("/products"),
    getById: (id: number) => axiosClient.get<Product>(`/products/${id}`),
    create: (data: Partial<Product>) => axiosClient.post("/products", data),
    update: (id: number, data: Partial<Product>) => axiosClient.put(`/products/${id}`, data),
    delete: (id: number) => axiosClient.delete(`/products/${id}`),
};
