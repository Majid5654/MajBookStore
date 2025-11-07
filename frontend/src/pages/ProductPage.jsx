import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
function ProductPage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products", products);
  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8"></div>
      {error && <div className="aler alert-error mb-8">{error}</div>}
      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-sky-600"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Belum ada produk yang tersedia.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-800/80 text-white rounded-xl shadow-lg border border-indigo-500/40 hover:border-indigo-400 hover:shadow-indigo-500/30 p-4 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover rounded-lg mb-3"
              />
              <div className="p-2">
                <h3 className="text-lg ">
                  <span className="font-semibold text-indigo-300">Title: </span>
                  <span className="font-normal text-white">{product.name}</span>
                </h3>
                <h3 className="text-lg ">
                  <span className="font-normal text-white">
                    {" "}
                    Author : {product.author}
                  </span>
                </h3>
                <p className="text-sky-400 font-bold text-xl">
                  Rp {parseInt(product.price, 10).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductPage;
