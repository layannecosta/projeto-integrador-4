import CardProduct from "../../components/card-product/cardProduct";
import { IoGameControllerOutline, IoCarOutline, IoFastFoodOutline, IoGiftOutline, IoSync } from "react-icons/io5";
import { GoTools } from "react-icons/go";
import { PiTShirt } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carousel1 from "../../assets/carousel1.jpg";
import { useNavigate } from "react-router";
import { getApiRecentsProducts, getApiRecommendedProducts } from "./services";
import { useEffect, useState } from "react";
import { Products } from "./type";
import ListLoading from "../../components/list-loading";
import { toastService } from "../../utils/toastConfig";
import { useAuthSessionStore } from "../../hooks/use-auth-session/use-auth-session";

const itemsCategory = [
    {
        id: 0,
        title: "Jogos",
        icon: <IoGameControllerOutline />
    },
    {
        id: 1,
        title: "Roupas",
        icon: <PiTShirt />
    },
    {
        id: 2,
        title: "Veículos",
        icon: <IoCarOutline />
    },
    {
        id: 3,
        title: "Ferramentas",
        icon: <GoTools />
    },
    {
        id: 4,
        title: "Comidas",
        icon: <IoFastFoodOutline />
    },
    {
        id: 5,
        title: "Presentes",
        icon: <IoGiftOutline />
    },
    {
        id: 6,
        title: "Outros",
        icon: <IoSync />
    }
]

export default function Home() {

    const navigate = useNavigate();
    const { token } = useAuthSessionStore();

    const [inputSearch, setInputSearch] = useState("");

    const [recentsProducts, setRecentsProducts] = useState<Products[]>([]);

    const [recommendedProducts, setRecommendedProducts] = useState<Products[]>([]);

    const [isLoadingRecentsProducts, setIsLoadingRecentsProducts] = useState(false);

    const [isLoadingRecommendedProducts, setIsLoadingRecommendedProducts] = useState(false);

    function handleSearch() {
        if (inputSearch.trim()) {
            navigate(`/products/search/${inputSearch}`);
        } else {
            toastService.warning("Digite algo para buscar");
        }
    }

    async function getRecentsProducts() {
        setIsLoadingRecentsProducts(true);
        try {
            const response = await getApiRecentsProducts();
            setRecentsProducts(response.data);
        } catch (error) {
            toastService.apiError(error, "Erro ao buscar produtos recentes");
        }
        setIsLoadingRecentsProducts(false);
    };

    async function getRecommendedProducts() {
        setIsLoadingRecommendedProducts(true);
        try {
            const response = await getApiRecommendedProducts();
            setRecommendedProducts(response.data);
        } catch (error) {
            toastService.apiError(error, "Erro ao buscar produtos recomendados");
        }
        setIsLoadingRecommendedProducts(false);
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    useEffect(() => {
        getRecentsProducts();

    }, []);

    useEffect(() => {
        getRecommendedProducts();

    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
            {/* Carrossel*/}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    interval={4000}
                    transitionTime={600}
                    showArrows={true}
                    className="carousel-custom"
                >
                    <div className="relative">
                        <img
                            src={carousel1}
                            alt="Carousel 1"
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                    </div>
                    <div className="relative">
                        <img
                            src={carousel1}
                            alt="Carousel 2"
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                    </div>
                    <div className="relative">
                        <img
                            src={carousel1}
                            alt="Carousel 3"
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                    </div>
                </Carousel>
            </div>

            {/* Barra de pesquisa*/}
            <div className="max-w-2xl mx-auto">
                <div className="relative group">
                    <div className="flex items-center bg-white border-2 border-gray-200 rounded-full shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 px-6 py-3">
                        <input
                            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-lg"
                            placeholder="Estou buscando por..."
                            value={inputSearch}
                            onChange={(event) => setInputSearch(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-primary hover:bg-primary/90 transition-colors duration-200 p-2 rounded-full cursor-pointer ml-3">
                            <IoIosSearch size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Seção Itens Recentes*/}
            <section className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Itens Recentes</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secundary mx-auto rounded-full"></div>
                    <p className="text-gray-600 text-lg">Confira os produtos adicionados recentemente</p>
                </div>
                {isLoadingRecentsProducts && <ListLoading />}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {
                        recentsProducts.map((product) => (
                            <CardProduct
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                img={product.url1}
                                manufacturer={product.manufacturer}
                                price={product.price}
                            />
                        ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate("/all-recents-products")}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                        Ver mais produtos
                    </button>
                </div>
            </section>

            {/* Seção Categorias*/}
            <section className="space-y-8">
                <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8 space-y-3">
                            <h2 className="text-white font-bold text-3xl">Explore por Categorias</h2>
                            <p className="text-white/80 text-lg">Encontre exatamente o que você procura</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
                            {itemsCategory.map((category, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col justify-center items-center space-y-3 cursor-pointer"
                                >
                                    <div className="bg-white text-primary w-16 h-16 rounded-2xl flex justify-center items-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 group-hover:bg-gray-50">
                                        <span className="text-2xl group-hover:text-primary/80 transition-colors duration-300">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <span className="text-white text-sm font-medium text-center group-hover:text-white/90 transition-colors duration-300">
                                        {category.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção Anúncios*/}
            <section className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Todos os Anúncios</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-secundary to-primary mx-auto rounded-full"></div>
                    <p className="text-gray-600 text-lg">Descubra as melhores ofertas disponíveis</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {
                        recommendedProducts.map((product) => (
                            <CardProduct
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                img={product.url1}
                                manufacturer={product.manufacturer}
                                price={product.price}
                            />
                        ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate("/all-products")}
                        className="bg-gradient-to-r from-secundary to-secundary/80 hover:from-secundary/90 hover:to-secundary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                        Ver tudo
                    </button>
                </div>
            </section>
        </div>
    )
}