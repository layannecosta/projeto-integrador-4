import { useNavigate } from "react-router";
import { auth } from "./services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginForm = {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().required("O campo é obrigatório").email("Digite um email válido"),
    password: yup.string().required("O campo é obrigatório").min(4, "A senha precisa ter pelo menos 4 caracteres"),
});

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>({ resolver: yupResolver(schema) });

    async function logar(values: LoginForm) {
        try {
            const response = await auth(values.email, values.password);
            navigate("/dashboard");
            alert("Login realizado com sucesso!");
        } catch (error) {
            alert("Erro ao autenticar usuário");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-primary to-primary/90 px-8 py-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                        <div className="relative z-10">
                            <h1 className="text-white font-bold text-3xl mb-2">Unybay</h1>
                            <p className="text-white/90 text-lg">Acesse sua conta</p>
                        </div>
                    </div>

                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit(logar)} className="space-y-6">
                            {/* Campo Email */}
                            <div className="space-y-2">
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="w-full border-2 border-gray-200 h-[40px] px-4 rounded-lg bg-gray-50 focus:bg-white focus:border-primary focus:outline-none transition-all duration-200"
                                    placeholder="Digite seu E-mail"
                                />
                                {errors.email && (
                                    <span className="text-red-600 text-sm">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Campo Senha */}
                            <div className="space-y-2">
                                <input
                                    {...register("password")}
                                    type="password"
                                    className="w-full border-2 border-gray-200 h-[40px] px-4 rounded-lg bg-gray-50 focus:bg-white focus:border-primary focus:outline-none transition-all duration-200"
                                    placeholder="Digite sua senha"
                                />
                                {errors.password && (
                                    <span className="text-red-600 text-sm">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            {/* Botão de Login */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white h-[40px] rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Entrar
                            </button>
                        </form>

                        {/* Link Criar Cadastro */}
                        <div className="text-center mt-6">
                            <a href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                                Criar cadastro
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}