import { useEffect, useState } from "react";
import CardProduct from "../../components/card-product/cardProduct";
import { products } from "./type";
import { getApiAllRecentsProducts } from "./services";
import ListLoading from "../../components/list-loading";
import { toastService } from "../../utils/toastConfig";

export default function ListRecentsProducts() {
   const [allProducts, setAllProducts] = useState<products[]>([]);

   const [isLoadingRecents, setIsLoadingRecents] = useState(false);

   async function getAllProductsRecents() {
      setIsLoadingRecents(true)
      try {
         const response = await getApiAllRecentsProducts();
         setAllProducts(response.data);

         if (response.data.length === 0) {
            toastService.info("Nenhum produto recente encontrado");
         }
      } catch (error) {
         toastService.apiError(error, "Erro ao buscar produtos recentes");
      }
      setIsLoadingRecents(false)
   }

   useEffect(() => {
      getAllProductsRecents();
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
         {/* Título */}
         <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Itens Recentes</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secundary mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg">Produtos vistos recentemente</p>
         </div>

         {/* Grid de produtos */}
         {isLoadingRecents && <ListLoading />}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {allProducts.map((products) => (
               <CardProduct
                  key={products._id}
                  id={products._id}
                  name={products.name}
                  img={products.url1}
                  manufacturer={products.manufacturer}
                  price={products.price}
               />
            ))}
         </div>
      </div>
   );
}