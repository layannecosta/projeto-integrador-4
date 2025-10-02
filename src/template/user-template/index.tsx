import { PropsWithChildren, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

// Tipagem do componente (pode ser removida se não utilizada)
type UserTempaleteProps = PropsWithChildren & {}

export default function UserTemplate(props: PropsWithChildren) {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Cabeçalho da aplicação */}
            <Header />

            {/* Área principal de conteúdo */}
            <div className="flex flex-1 flex-col px-28 py-8 max-6-xl mx-auto w-full">
                {props.children}
            </div>

            {/* Rodapé da aplicação */}
            <Footer />
        </div>
    )
}