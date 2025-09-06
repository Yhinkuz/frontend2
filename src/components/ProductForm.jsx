import { useState } from "react";
import API from "../api";

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    setForm({ name: "", price: "", description: "" });
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input className="border p-2 flex-1" name="name" value={form.name} placeholder="Name" onChange={handleChange} />
      <input className="border p-2 w-24" name="price" value={form.price} placeholder="Price" onChange={handleChange} />
      <input className="border p-2 flex-1" name="description" value={form.description} placeholder="Description" onChange={handleChange} />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

export default ProductForm;
