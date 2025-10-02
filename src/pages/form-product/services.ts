import api from "../../services/api";
import { FormProducts } from ".";

export function saveApiProduct(body: FormProducts, token: string) {
    return api.post(
        "/products", {
        name: body.name,
        manufacturer: body.manufacturer,
        category: body.category,
        price: body.price,
        url1: body.url1,
        url2: body.url2,
        description: body.description,
    }, { headers: { Authorization: token } }
    );
}