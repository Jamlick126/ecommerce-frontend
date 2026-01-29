import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../App.css'


const HomePage = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        //Fetch products from my node.js server
        fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data =>{
                const shuffled = data.sort(() => 0.5 - Math.random());
                setProducts(shuffled);
            })
        .catch(err => console.error("Error fetching products:", err));
    }, []);
    return ( 
        <>
        <Hero />
        <div className="categories">
            <div className="small-container">
                <div className="row">
                    <div className="col-3">
                        <img src="/assets/category-1.jpg" alt="Category 1" />
                    </div>
                    <div className="col-3">
                        <img src="/assets/category-2.jpg" alt="Category 2" />
                    </div>
                    <div className="col-3">
                        <img src="/assets/category-3.jpg" alt="Category 3" />
                    </div>
                </div>
            </div>
        </div>

        <div className="small-container">
            <h2 className="title">Featured Products</h2>
            <div className="row">
                {products.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            {/* View More Button */}
            <div className="view-more-container" style={{ textAlign: 'center', marginTop:'30px' }}>
                <Link to="/products" className="btn">View More &#8594;</Link>
            </div>
        </div>
        </>
    );
};

export default HomePage;