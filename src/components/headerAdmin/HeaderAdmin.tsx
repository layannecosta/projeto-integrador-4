import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useState } from "react";
import { useAuthSessionStore } from "../../hooks/use-auth-session/use-auth-session";

export default function HeaderAdmin() {
    const { clearToken } = useAuthSessionStore();
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);

    async function logout() {
        clearToken();
        navigate("/");
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    return (
        <div className="bg-primary text-white flex justify-between py-2 px-8 items-center">
            {/* Logo/Título clicável - navega para home */}
            <button onClick={() => navigate("/")}>
                <h1 className="text-[30px] font-bold">UnyBay</h1>
            </button>

            {/* Menu de navegação */}
            <ul className="flex gap-8 items-center">
                {/* Link para página inicial */}
                <li>
                    <Link to="/" className="hover:text-gray-200 transition-colors duration-200">Home</Link>
                </li>

                {/* Link para página Quem Somos */}
                <li>
                    <Link to="/about" className="hover:text-gray-200 transition-colors duration-200">Quem Somos</Link>
                </li>

                {/* Botão de logout */}
                <li>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="hover:text-gray-200 transition-colors duration-200">
                        Sair
                    </button>
                </li>

                {/* Botão de criar anúncio */}
                <li>
                    <button
                        onClick={() => navigate("/form-products")}
                        className="bg-white text-secundary px-8 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
                        Anunciar
                    </button>
                </li>
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <h1 className="text-[20px] font-bold text-center">Sair da área administrativa</h1>
                <p className="text-center">Deseja realmente sair?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={logout}
                        className="bg-primary text-white px-8 py-2 rounded-lg">
                        Sim
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white text-primary border border-primary px-8 py-2 rounded-lg">
                        Não
                    </button>
                </div>
            </Modal>
        </div>
    )
}