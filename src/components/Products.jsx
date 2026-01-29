import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updateCartCount } = useCart();

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => console.error("Error fetching products:", err))
    }, []);

    const addToCart = async (productId) => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (!token) {
            alert("Please login to add items to your cart!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    productId: productId,
                    quantity: 1
                })
            });
            if (response.ok) {
                alert("Product added to cart successfully!");
                updateCartCount();
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    if (loading) return <div className="container"><h3>Loading Products...</h3></div>;

    return (
        <div className="small-container">
            <h2 className="title">All Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-4">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={product.image_url} alt={product.name} />
                            <h4>{product.name}</h4>
                        </Link>

                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={i < product.rating ? "fa fa-star": "fa fa-star-o"}></i>
                            ))}
                        </div>

                        <p>Ksh. {product.price.toLocaleString()}</p>
                        
                        <button onClick={() => addToCart(product.id)} className="btn">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;