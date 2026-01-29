import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>Give Your Workout <br /> A New Style!</h1>
                        <p>
                            Success isn't always about greatness. It's about consistency. Consistent <br /> 
                            hard work gains success. Greatness will come.
                        </p>
                        <Link to="/products" className="btn">Explore Now</Link>
                    </div>
                    <div className="col-2">
                        <img src="/public/assets/image1.png" alt="Hero Featured" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;