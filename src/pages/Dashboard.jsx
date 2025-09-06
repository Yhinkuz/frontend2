import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h1 className="fw-bold">My Products</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList products={products} refresh={fetchProducts} />
    </div>
  );
}

export default Dashboard;
