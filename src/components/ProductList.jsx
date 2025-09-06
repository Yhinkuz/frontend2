import API from "../api";

function ProductList({ products, refresh }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <div className="mt-4">
      {products.length === 0 && <p className="text-muted">No products yet.</p>}
      {products.map((p) => (
        <div key={p._id || p.name} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">
                ₦{p.price} <br />
                <small>{p.description}</small>
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
