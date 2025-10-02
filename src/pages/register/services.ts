import { RegisterForm } from "./types";
import api from "../../services/api";

export async function registerUser(values: RegisterForm) {
    return await api.post("/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        city: values.city,
        state: values.state,
        password: values.password,
    });
}