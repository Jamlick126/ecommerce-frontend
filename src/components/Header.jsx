import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Header = () => {
    // state to handle mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //state to store logged-in user info
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const { cartCount, updateCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const savedName = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUsername(savedName);
            updateCartCount();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/account");
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => setIsMenuOpen(false);

    const navLinkStyles = ({ isActive }) => {
        return isActive ? "active-link" : "";
    };

    return (
        <>
            {/* Transparent overlay to close menu when clicking outside */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        
        <div className="navbar">
            <div className="navbar-content">
                <div className="logo">
                    <Link to="/" onClick={closeMenu}>
                    <img src="/assets/logo-white.png" width="125px" alt="Store Logo" />
                    </Link>
                </div>
                <nav>
                    <ul id="MenuItems" style={{maxHeight: isMenuOpen ? "300px" : "0px"}}>
                        <li><NavLink to="/" className={navLinkStyles} onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/products" className={navLinkStyles} onClick={closeMenu}>Products</NavLink></li>
                        <li><NavLink to="/contact" className={navLinkStyles} onClick={closeMenu}>Contact</NavLink></li>
                        {/* Dynamic Link: Show Logout if logged in, else show Account */}
                        {isLoggedIn ? (
                            <>
                                <li style={{cursor: 'pointer'}} onClick={handleLogout}>Logout ({username})</li>
                            </>
                        ) : (
                            <li><NavLink to="/account" onClick={closeMenu}>Account</NavLink></li>
                        )}
                        
                    </ul>
                </nav>  
                <div className="header-icons">
                    <div className="cart-icon-container">
                        <Link to="/cart">
                            <img src="/assets/trolley.png" alt="Cart" width="30px" height="30px" />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </div>
                     <img src="/assets/menu-48.png" alt="Menu Icon" className="menu-icon" onClick={toggleMenu} />
                </div>
            </div>
        </div>
        </>
    );
};

export default Header;


