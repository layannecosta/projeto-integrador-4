import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Products } from "../home/type";

export async function getApiProductsbyName(
    nameProduct: string
): Promise<
    AxiosResponse<Products[], any>> {
    return await api.get(`/Products?name=${nameProduct}`);
}

