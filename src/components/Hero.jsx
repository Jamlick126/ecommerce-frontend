import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './StoreContext';


const Hero = () => {

    const {storeConfig} = useStore();

    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>{storeConfig.hero_title}</h1>
                        <p>
                            {storeConfig.hero_subtitle}
                        </p>
                        <Link to="/products" className="btn">Explore Now</Link>
                    </div>
                    <div className="col-2">
                        <img src="/assets/image1.png" alt="Hero Featured" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;