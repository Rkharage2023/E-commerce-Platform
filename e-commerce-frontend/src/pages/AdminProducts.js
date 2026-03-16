import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://e-commerce-platform-yogr.onrender.com/api/products",
    );

    setProducts(res.data);
  };

  const saveProduct = async () => {
    if (editingId) {
      await axios.put(
        `https://e-commerce-platform-yogr.onrender.com/api/products/${editingId}`,
        {
          name,
          description,
          price,
          countInStock: stock,
          category,
          brand,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setEditingId(null);
    } else {
      await axios.post(
        "https://e-commerce-platform-yogr.onrender.com/api/products",
        {
          name,
          description,
          price,
          countInStock: stock,
          category,
          brand,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    }

    fetchProducts();
    clearForm();
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(
        `https://e-commerce-platform-yogr.onrender.com/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchProducts();
    }
  };

  const editProduct = (p) => {
    setEditingId(p._id);

    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setStock(p.countInStock);
    setCategory(p.category);
    setBrand(p.brand);
    setImageUrl(p.imageUrl);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("");
    setBrand("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-8 transition">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 dark:text-white">
          Manage Products
        </h1>

        {/* PRODUCT FORM */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded-lg md:col-span-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            onClick={saveProduct}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* PRODUCT TABLE */}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 dark:text-white">{p.name}</td>

                  <td className="p-3 dark:text-white">${p.price}</td>

                  <td className="p-3 dark:text-white">{p.countInStock}</td>

                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => editProduct(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
