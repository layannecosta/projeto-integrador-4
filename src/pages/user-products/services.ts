
import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Products } from "../home/type";

export async function getUserProducts(token: string): Promise<AxiosResponse<Products[], any>> {
    return await api.get("/products/user", {
        headers: {
            Authorization: token,
        },
    });

}