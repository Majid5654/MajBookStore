import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import axiosRetry from "axios-retry";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

axiosRetry(axios, {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      error.code === "ECONNABORTED" ||
      axiosRetry.isNetworkOrIdempotentRequestError(error)
    );
  },
});

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  timeout: 30000,

  //form state
  formData: {
    name: "",
    price: "",
    image: "",
    author: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({ formData: { name: "", price: "", image: "", author: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      await get().fetchProducts();
    } catch (error) {
      console.log("Error in add product ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`, {
        timeout: 30000,
      });
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Limit exceeded" });
      } else {
        set({ error: "Something went wrong" });
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetch", error);
      set({
        error: "Something went wrong",
        currentProduct: null,
      });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData, currentProduct } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");

      await get().fetchProducts();
    } catch (error) {
      console.log("Error in update product ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`, { timeout: 20000 });
      toast.success("Product deleted successfully");
      await get().fetchProducts();
    } catch (error) {
      console.log("Error in delete product ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
