import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Product } from "./types";


export async function getApiDetailsProducts(
    id: string
): Promise<
    AxiosResponse<Product, any>> {
    return await api.get(`/products/${id}`);
}

