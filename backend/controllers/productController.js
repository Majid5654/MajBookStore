import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error, "Error get products");
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export const CreateProduct = async (req, res) => {
  const { name, price, image, author } = req.body;
  if (!name || !price || !image || !author) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newProduct = await prisma.products.create({
      data: { name, price, image, author },
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error, "Error adding product");
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error, "Error get product");
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.products.delete({
      where: { id: Number(id) },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
      });
  } catch (error) {
    console.log(error, "Error deleting product");
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, author } = req.body;
  try {
    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: { name, price, image, author },
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error, "Error updating product");
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};
