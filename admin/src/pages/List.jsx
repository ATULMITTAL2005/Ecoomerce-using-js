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

  useEffect(() => {
    fetchList();
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
              className="border p-3 rounded-lg shadow hover:shadow-md transition"
            >
              {/* ✅ Show Cloudinary Image (no backendUrl prefix, and field is `image`) */}
              <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
                <img
                  src={item.image?.[0] || "/no-image.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "/no-image.png"; }}
                />
              </div>

              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.category} • {item.subCategory}
              </p>
              <p className="text-sm font-medium mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
