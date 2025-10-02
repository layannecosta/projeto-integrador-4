import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Products } from "./type";


export async function getApiRecentsProducts(): Promise<AxiosResponse<Products[], any>> {
    return await api.get("/products/recents");
}

export async function getApiRecommendedProducts(): Promise<AxiosResponse<Products[], any>> {
    return await api.get("/products/recommended");
}