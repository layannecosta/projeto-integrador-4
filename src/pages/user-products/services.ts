
import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Products } from "../home/type";

export async function getApiMyProducts(token: string): Promise<AxiosResponse<Products[], any>> {
    return await api.get("/my-products", {
        headers: {
            Authorization: token,
        },
    });

}