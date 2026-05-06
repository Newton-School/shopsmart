import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/products`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div style={{ color: '#ef4444', padding: '1rem' }}>Error: {error}</div>;
    if (!products.length) return <div className="loading-pulse">Loading products...</div>;

    return (
        <div>
            <div className="section-header">
                <h2>Products</h2>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-category">{product.category}</div>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">${product.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
