import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer" >
            <div className="container">
                <div className="row">
                    {/* Column 1: App Downloads */}
                    <div className="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and iOS mobile phone.</p>
                        <div className="app-logo">
                            <img src="/assets/play-store.png" alt="Play Store" />
                            <img src="/assets/app-store.png" alt="App Store" />
                        </div>
                    </div>
                    {/* Column 2: Logo & Mission */}
                    <div className="footer-col-2">
                        <img src="/assets/logo-white.png" alt="Logo" />
                        <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.</p>
                    </div>

                    {/* Column 3: Useful Links */}
                    <div className="footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Coupons</li>
                            <li>Blog Post</li>
                            <li>Return Policy</li>
                            <li>Join Affiliate</li>
                        </ul>
                    </div>

                    {/* Column 4: Follow Us */}
                    <div className="footer-col-4">
                        <h3>Follow Us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>YouTube</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="copyright">© 2024 - Red Store</p>
            </div>
        </div>
    )

}

export default Footer;