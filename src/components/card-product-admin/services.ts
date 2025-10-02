import api from "../../services/api";

export async function removeApiProduct(id: string) {
    return await api.delete('/product/${id}s')
};