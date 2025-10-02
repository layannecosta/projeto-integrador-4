import { AxiosResponse } from "axios";
import api from "../../services/api";
import { products } from "./type";

export async function getApiAllProducts(): Promise<
    AxiosResponse<products[], any>> {
    return await api.get("/products");
}

export async function getApiAllProductsOrders(
    typeOrder: "descending" | "ascending"
): Promise<AxiosResponse<products[], any>> {
    return await api.get(`/products?order=${typeOrder}`);
}