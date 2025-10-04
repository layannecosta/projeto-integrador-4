import { PropsWithChildren, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import HeaderAdmin from "../../components/headerAdmin/HeaderAdmin";
import { useAuthSessionStore } from "../../hooks/use-auth-session/use-auth-session";
import { useNavigate } from "react-router";

type AdminTempaleteProps = PropsWithChildren & {}

export default function AdminTemplate(props: AdminTempaleteProps) {
    const { token } = useAuthSessionStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Cabeçalho da aplicação */}
            <div>
                <HeaderAdmin />
            </div>

            {/* Área principal de conteúdo */}
            <div className="flex flex-1 flex-col px-28 py-8 max-6-xl mx-auto w-full justify-center">
                {props.children}
            </div>

            {/* Rodapé da aplicação */}
            <Footer />
        </div>
    )
}