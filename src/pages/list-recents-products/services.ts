import { AxiosResponse } from "axios";
import api from "../../services/api";
import { products } from "./type";

export async function getApiAllRecentsProducts(): Promise<
    AxiosResponse<products[], any>> {
    return await api.get("/products/recents-all");
}

