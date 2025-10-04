import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import { getApiDetailsProducts } from './services';
import { useEffect, useState } from 'react';
import { toastService } from '../../utils/toastConfig';
import { Product } from './types';
import { formatPrice } from '../../utils/format-price';

export default function Details() {
    const params = useParams();
    const id = params?.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function getDetailsProduct() {
        if (!id) {
            toastService.error("ID do produto não encontrado");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await getApiDetailsProducts(id);
            setProduct(response.data);
        } catch (error) {
            toastService.apiError(error, "Erro ao carregar detalhes do produto");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDetailsProduct();
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-gray-600 text-xl mt-4">Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                    <p className="text-gray-600 text-xl">Produto não encontrado</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            {/* Título */}
            <div className="space-y-3">
                <h2 className="text-4xl font-bold text-gray-800">{product.name}</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secundary rounded-full"></div>
            </div>

            {/* Carrossel e informações*/}
            <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
                {/* Carrossel */}
                <div className="w-full max-w-md lg:w-[400px]">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            autoPlay
                            infiniteLoop
                            interval={4000}
                            transitionTime={600}
                        >
                            <div className="bg-white rounded-xl p-4">
                                <img
                                    src={product.url1}
                                    alt={`${product.name} - Imagem 1`}
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <div className="bg-white rounded-xl p-4">
                                <img
                                    src={product.url2}
                                    alt={`${product.name} - Imagem 2`}
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                        </Carousel>
                    </div>
                </div>

                {/* Informações do produto */}
                <div className="flex flex-col gap-6 w-full max-w-md lg:w-[400px]">
                    {/* Card de preço*/}
                    <div className="bg-gradient-to-r from-secundary to-secundary/90 shadow-lg rounded-2xl px-10 py-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="relative z-10">
                            <p className="text-white text-4xl font-bold">
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-white/90 text-lg mt-2">à vista</p>
                        </div>
                    </div>

                    {/* Card de informações do vendedor */}
                    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4">
                            <h3 className="text-white text-lg font-bold">Informações do Vendedor</h3>
                            <p className="text-white/80 text-lg mb-2">{product.user?.name || "-"}</p>
                            <p className="text-white/80 text-lg mb-2">{product.user?.city || "-"}</p>
                            <p className="text-white/80 text-lg mb-2">{product.user?.state || "-"}</p>

                        </div>
                        <div className="px-6 py-6 space-y-4">
                            <div className="space-y-3">
                                <p className="text-gray-700 font-medium">{product.manufacturer}</p>
                                <p className="text-gray-600 text-sm">
                                    Entre em contato para mais informações
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção de descrição */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800">Descrição</h3>
                    <div
                        className="text-gray-700 leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>
            </div>
        </div>
    );
}