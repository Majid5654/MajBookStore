import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ManageProductPage from "./pages/ManageProductPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/ManageProduct" element={<ManageProductPage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}
export default App;
