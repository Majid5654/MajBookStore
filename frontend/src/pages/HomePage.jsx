import React from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  const websiteDescription = "Discover the books you've been waiting for";
  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-6 mb-8"
      >
        <div className="w-full flex flex-col items-center justify-center text-center my-5">
          <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat text-white mb-4">
            Welcome!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl">
            {websiteDescription}
          </p>
        </div>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold text-white mb-4 border-b border-indigo-500 pb-2"
      >
        Most Update
      </motion.h2>
      {loading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-indigo-500/40 transition-all"
            >
              <div className="w-full aspect-[4/4] bg-gray-700 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Book Image</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-300">
                  {product.name}
                </h3>
                <p className="text-gray-300">Author: {product.author}</p>
                <p className="text-sky-400 font-bold mt-2">
                  Rp {parseInt(product.price, 10).toLocaleString("id-ID")}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Updated: {new Date(product.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;
