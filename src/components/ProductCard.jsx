import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="col-4">
            <Link to={`/product/${product.id}`}>
            <img src={product.image_url} alt={product.name} />
            </Link>

            <h4>{product.name}</h4>
            <div className="rating">
                {/* Generates stars based on the rating number */}
                {[...Array(5)].map((_, i) => (
                    <i 
                    key={i}
                    className={i < product.rating ? "fa fa-star": "fa fa-star-o"}></i>
                ))}
            </div>
            <p>Ksh.{product.price.toLocaleString()}</p>
        </div>
    );
};

export default ProductCard;