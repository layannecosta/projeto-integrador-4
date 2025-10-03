import CardProductAdmin from "../../components/card-product-admin"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getApiMyProducts } from "./services";
import { Products } from "../home/type";
import { toastService } from "../../utils/toastConfig";
import ListLoading from "../../components/list-loading";
import { useAuthSessionStore } from "../../hooks/use-auth-session/use-auth-session";

export default function UserProducts() {
   const navigate = useNavigate();

   const { token, isAuthenticated } = useAuthSessionStore();

   const [myProducts, setMyProducts] = useState<Products[]>([]);

   const [isLoading, setIsLoading] = useState(false);

   async function getMyProducts() {
      if (!isAuthenticated || !token) {
         toastService.error("Você precisa estar logado");
         navigate("/login");
         return;
      }
      setIsLoading(true);
      try {
         const response = await getApiMyProducts(token);
         setMyProducts(response.data);
         if (response.data.length === 0) {
            toastService.info("Você ainda não possui produtos cadastrados");
         }
      } catch (error) {
         toastService.apiError(error, "Erro ao carregar seus produtos");
      } finally {
         setIsLoading(false);
      }
   }

   const handleProductDeleted = () => {
      getMyProducts();
   };

   useEffect(() => {
      getMyProducts();
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
         <div className="flex justify-between items-center">
            <div className="space-y-3">
               <h1 className="text-3xl font-bold text-gray-800">Seus anúncios</h1>
               <div className="w-24 h-1 bg-gradient-to-r from-primary to-secundary rounded-full"></div>
               <p className="text-gray-600 text-lg">Gerencie seus produtos anunciados</p>
            </div>
            <div>
               <button
                  onClick={() => navigate("/form-products")}
                  className="bg-secundary px-8 py-3 text-white rounded-lg font-semibold hover:bg-secundary/90 transition-colors shadow-md hover:shadow-lg"
               >
                  + Anunciar
               </button>
            </div>
         </div>

         {isLoading && <ListLoading />}

         {!isLoading && myProducts.length === 0 && (
            <div className="text-center py-16">
               <p className="text-gray-500 text-lg mb-4">Você ainda não possui produtos cadastrados</p>
               <button
                  onClick={() => navigate("/form-products")}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
               >
                  Cadastrar primeiro produto
               </button>
            </div>
         )}

         {!isLoading && myProducts.length > 0 && (
            <>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                  {myProducts.map((product) => (
                     <CardProductAdmin
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        img={product.url1}
                        price={product.price}
                        manufacturer={product.manufacturer}
                        setMyProducts={setMyProducts}
                     // onDelete={handleProductDeleted}
                     />
                  ))}
               </div>
               <p className="text-right text-gray-600">
                  Total de itens: <span className="font-bold">{myProducts.length}</span>
               </p>
            </>
         )}
      </div>
   )
}