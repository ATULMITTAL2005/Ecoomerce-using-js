import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

/* ===========================
   ✅ ADD PRODUCT
=========================== */
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // ✅ Parse sizes safely
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      parsedSizes = Array.isArray(sizes) ? sizes : [sizes];
    }

    // ✅ Collect uploaded images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const images = [image1, image2, image3, image4].filter(Boolean);

    // ✅ Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          folder: "products",
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ✅ Create product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      image: imagesUrl,
      date: Date.now(),
    };

    // ✅ Save to database
    const product = new productModel(productData);
    await product.save();

    console.log("✅ Product Added:", productData);
    res.json({ success: true, message: "Product added successfully!", product });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   ✅ LIST PRODUCTS (with filters + pagination)
=========================== */
const listProducts = async (req, res) => {
  try {
    const { category, subCategory, sortBy, page = 1, limit = 10 } = req.query;

    // ✅ Build filter
    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    // ✅ Pagination setup
    const skip = (Number(page) - 1) * Number(limit);

    // ✅ Sorting setup
    let sort = {};
    if (sortBy === "newest") sort = { date: -1 };
    if (sortBy === "priceLowHigh") sort = { price: 1 };
    if (sortBy === "priceHighLow") sort = { price: -1 };

    // ✅ Query database
    const products = await productModel.find(filter).sort(sort).skip(skip).limit(Number(limit));
    const total = await productModel.countDocuments(filter);

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   ✅ SINGLE PRODUCT
=========================== */
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   ✅ REMOVE PRODUCT
=========================== */
const removeProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // Optionally: delete images from Cloudinary (advanced)
    // for (const url of product.image) {
    //   const publicId = url.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(`products/${publicId}`);
    // }

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   ✅ EXPORT ALL
=========================== */
export { addProduct, listProducts, singleProduct, removeProducts };
