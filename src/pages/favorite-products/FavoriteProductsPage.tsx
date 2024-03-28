import AxiosClient from "@/lib/axios-client/axiosClient";
import useLoadingStore from "@/store/loadingStore";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoriteProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    AxiosClient()
      .get("/products/favorites")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);

  return (
    <div className="py-6">
      <div className="container">
        <div className="text-3xl font-medium mb-4">Favorites</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {products.map((product, index) => (
            <div
              className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              key={index}
            >
              <div className="relative flex h-60 overflow-hidden">
                <img
                  src={
                    product.image && product.image != ""
                      ? product.image
                      : `https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png`
                  }
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-4 px-4 pb-4">
                <div className="flex gap-2 justify-between">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.name}
                    </h5>
                  </a>
                  <div className="mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center"></div>
                  </div>
                </div>
                <Link
                  to={`/products/${product._id}`}
                  className="flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-300 gap-2"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="font-medium">No favorites yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductsPage;
