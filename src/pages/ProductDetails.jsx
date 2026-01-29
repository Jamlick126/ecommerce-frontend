import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import ProductCard from '../components/ProductCard';
import '../App.css';

const ProductDetails = () => {
    const { id } = useParams(); // get id from the url
    const { updateCartCount } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
     // state to manage the main gallery
    const [mainImg, setMainImg] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setMainImg(data.image_url || (data.images && data.images[0]));
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching product:", err);
            setLoading(false);
        });

        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                const filtered = data
                    .filter(item => item.id !== parseInt(id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                    setRelatedProducts(filtered);
            })
            .catch(err => console.error("Error fetching related products:", err));
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <p>Loading...</p>

    const addToCart = async () => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem('username');
        if (!token) {
            alert("Please login to add items to your cart!");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    productId: id,
                    quantity: parseInt(quantity)
                })
            });
            if (response.ok) {
                alert("Product added to cart!");
                updateCartCount();
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    if (loading) return <div className="container"><h3>Loading Product...</h3></div>;
    if (!product) return <div className="container"><h3>Product Not Found</h3></div>;

    return (
        <div className="small-container single-product">
            <div className="row">
                <div className="col-2">
                    <img src={mainImg} alt="Main Image" width="100%" id="ProductImg" />

                    {product.images && product.images.length > 0 && (
                        <div className="samll-img-row">
                        {product.images.map((img, index) => (
                            <div className="small-img-col" key={index}>
                                <img src={img} alt={`Gallery ${index}`} width="100%" className="small-img" onClick={() => setMainImg(img)} />

                            </div>
                        ))}
                    </div>
                    )}            
                </div>

                <div className="col-2">
                    <p>Home / Products</p>
                    <h1>{product.name}</h1>
                    <h4>Ksh.{product.price.toLocaleString()}</h4>

                    <select name="" id="">
                        <option value="">Select Size</option>
                        <option value="">XXL</option>
                        <option value="">XL</option>
                        <option value="">Large</option>
                        <option value="">Medium</option>
                        <option value="">Small</option>
                    </select>

                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
                    <p style={{margin: '10px 0', fontWeight: 'bold'}}>
                        Subtotal: Ksh.{(product.price * quantity).toLocaleString()}</p>
           
                    <button className="btn" onClick={addToCart}>Add to Cart</button>

                    <h3>Product Details<i className="fa fa-indent"></i></h3>
                    <br />
                    <p>{product.description}</p>
                </div>
            </div>
            {/* RELATED PRODUCTS SECTION */}
            <div className="small-container">
                <div className="row row-2">
                    <h2>Related Products</h2>
                    <p>View More</p>
                </div>
                <div className="row">
                    {relatedProducts.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;