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

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");

    setProducts(res.data);
  };

  // ADD OR UPDATE PRODUCT
  const saveProduct = async () => {
    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
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
        "http://localhost:5000/api/products",
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

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
    }
  };

  // EDIT PRODUCT
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

  // CLEAR FORM
  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("");
    setBrand("");
    setImageUrl("");
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">
        Manage Products
      </h1>

      {/* FORM */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded md:col-span-2"
          />
        </div>

        <button
          onClick={saveProduct}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* PRODUCT TABLE */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

                <td className="p-3 space-x-2">
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
  );
}

export default AdminProducts;
