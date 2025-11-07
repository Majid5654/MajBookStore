import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
function ManageProductPage() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    formData,
    setFormData,
    updateProduct,
    fetchProduct,
    currentProduct,
    deleteProduct,
  } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products", products);
  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-indigo-600 transition-all duration-300"
        >
          <FiPlusCircle size={20} />
          Add Book
        </button>
      </div>
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
              className="bg-slate-900 p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl border border-indigo-500/50 mx-4"
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
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={() => {
                      fetchProduct(product.id); // ambil data produk untuk form
                      setIsUpdateModalOpen(true); // buka modal update
                    }}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // hentikan default form submit
                      addProduct(e); // panggil fungsi addProduct
                      setIsModalOpen(false); // tutup modal
                    }}
                    className="bg-slate-900 p-6 rounded-xl w-96 shadow-xl border border-indigo-500/50"
                  >
                    <h2 className="text-xl font-semibold text-indigo-300 mb-4">
                      Add Book
                    </h2>
                    <input
                      type="text"
                      placeholder="Nama Of Book"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Harga"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="text"
                      placeholder="URL Gambar"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full mb-4 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
                //updateee
              )}
              {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateProduct(currentProduct.id);
                      setIsUpdateModalOpen(false);
                    }}
                    className="bg-slate-900 p-6 rounded-xl w-96 shadow-xl border border-indigo-500/50"
                  >
                    <h2 className="text-xl font-semibold text-indigo-300 mb-4">
                      Update Buku
                    </h2>
                    <input
                      type="text"
                      placeholder="Name Of Book"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Harga"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="text"
                      placeholder="URL Gambar"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full mb-4 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full mb-3 p-2 rounded-lg bg-slate-800 text-white"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsUpdateModalOpen(false)}
                        className="px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageProductPage;
