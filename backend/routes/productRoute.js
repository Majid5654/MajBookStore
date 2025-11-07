import express from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { CreateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", CreateProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
