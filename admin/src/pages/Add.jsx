import React, { useState } from "react";
import { assets } from "../admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [bestseller, setBestseller] = useState(false);

  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const allSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (size) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updated);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...images];
    const updatedPreviews = [...previews];

    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(selectedSizes));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data", token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("men");
        setSubCategory("topwear");
        setBestseller(false);
        setImages([null, null, null, null]);
        setPreviews([null, null, null, null]);
        setSelectedSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error?.response?.data?.message || "Failed to add product ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 sm:p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto my-8 space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
        Add New Product
      </h2>

      {/* Upload Images */}
      <div>
        <p className="text-md font-medium mb-2 text-gray-700">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((num, index) => (
            <div key={num} className="border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition cursor-pointer p-2 flex justify-center items-center h-28 sm:h-32 relative overflow-hidden">
              <label htmlFor={`image${num}`} className="w-full h-full flex justify-center items-center">
                {previews[index] ? (
                  <img src={previews[index]} alt={`Preview ${num}`} className="w-full h-full object-cover rounded-md" />
                ) : (
                  <img src={assets.upload_area} className="w-10 sm:w-12 opacity-60 hover:opacity-100 transition" alt="Upload" />
                )}
              </label>
              <input type="file" id={`image${num}`} hidden accept="image/*" onChange={(e) => handleImageChange(e, index)} />
            </div>
          ))}
        </div>
      </div>

      {/* Name + Price */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Product Name</label>
          <input type="text" placeholder="Type here" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Product Price</label>
          <input type="number" placeholder="Enter price" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Product Description</label>
        <textarea placeholder="Describe the product..." required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"></textarea>
      </div>

      {/* Category + SubCategory */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
            <option value="men">Male</option>
            <option value="women">Female</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Sub Category</label>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
            <option value="summerwear">Summerwear</option>
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Available Sizes</label>
        <div className="flex flex-wrap gap-3">
          {allSizes.map((size) => (
            <label key={size} className="flex items-center gap-1 text-sm sm:text-base">
              <input type="checkbox" value={size} checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center justify-between sm:justify-start gap-3">
        <label className="font-medium text-gray-700">Bestseller</label>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={bestseller} onChange={() => setBestseller(!bestseller)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-500 transition"></div>
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-medium hover:bg-blue-700 transition">
        Add
      </button>
    </form>
  );
};

export default Add;
