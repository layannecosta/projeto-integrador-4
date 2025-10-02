import { useEffect, useState } from "react";
import CardProduct from "../../components/card-product/cardProduct";
import { products } from "./type";
import { getApiAllProducts, getApiAllProductsOrders } from "./services";
import ListLoading from "../../components/list-loading";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import { toastService } from "../../utils/toastConfig";

export default function ListAllProducts() {
   const navigate = useNavigate();

   const [allProducts, setAllProducts] = useState<products[]>([]);
   const [isLoadingRecents, setIsLoadingRecents] = useState(false);
   const [inputSearch, setInputSearch] = useState("");

   async function getAllProducts() {
      setIsLoadingRecents(true);
      try {
         const response = await getApiAllProducts();
         setAllProducts(response.data);
         toastService.success(`${response.data.length} produtos carregados`);
      } catch (error) {
         toastService.apiError(error, "Erro ao buscar produtos");
      }
      setIsLoadingRecents(false);
   }

   async function getAllOrdersProducts(typeOrder: "descending" | "ascending") {
      setAllProducts([]);
      setIsLoadingRecents(true);
      try {
         const response = await getApiAllProductsOrders(typeOrder);
         setAllProducts(response.data);
         const orderText = typeOrder === "ascending" ? "menor preço" : "maior preço";
         toastService.info(`Produtos ordenados por ${orderText}`);
      } catch (error) {
         toastService.apiError(error, "Erro ao ordenar produtos");
      }
      setIsLoadingRecents(false);
   }

   function handleSearch() {
      if (inputSearch.trim()) {
         navigate(`/products/search/${inputSearch}`);
      } else {
         toastService.warning("Digite algo para buscar");
      }
   }

   useEffect(() => {
      getAllProducts();
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
         {/* Título */}
         <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Todos os Produtos</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secundary mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg">Descubra as melhores ofertas disponíveis</p>
         </div>

         {/* Barra de pesquisa */}
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

         {/* Ordenação dos produtos */}
         <div className="flex justify-center">
            <p className="text-gray-700">
               Ordenar por: {" "}
               <button
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  onClick={() => getAllOrdersProducts("ascending")}
               > Menor preço</button> {" "} | {" "}
               <button
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  onClick={() => getAllOrdersProducts("descending")}
               >Maior preço</button>
            </p>
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