import api from "../../services/api";

export async function removeApiProduct(id: string, token: string) {
    return await api.delete(`/products/${id}`, {
        headers: { Authorization: token },
    });
}