import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, {
        id,
      });

      if (response.data.success) {
        toast.success("Product deleted");
        setList((prev) => prev.filter((item) => item._id !== id)); // remove from UI
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Delete product failed", error);
      toast.error("Unable to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Listen for product additions elsewhere in the admin app and refresh list
  useEffect(() => {
    const handler = () => fetchList();
    window.addEventListener("product:added", handler);
    return () => window.removeEventListener("product:added", handler);
  }, []);

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Products List</h2>

      {list.length === 0 ? (
        <p>No products found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
            >
              {/* PRODUCT IMAGE (Portrait Style) */}
              <div className="w-full h-60 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center mb-4">
                <img
                  src={item.image?.[0] || "/no-image.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/no-image.png";
                  }}
                />
              </div>

              {/* PRODUCT INFO */}
              <h3 className="font-semibold text-lg text-center">{item.name}</h3>
              <p className="text-sm text-gray-600 text-center">
                {item.category} • {item.subCategory}
              </p>
              <p className="text-lg font-bold mt-2 text-green-600">
                ₹{item.price}
              </p>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteProduct(item._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
