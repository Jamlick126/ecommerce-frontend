import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {apiFetch} from '../Api';


const Account = () => {
    // login or register
  const [formType, setFormType] = useState('login');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const hostname = window.location.hostname;
  const storeSlug = hostname.includes('.') && hostname.split('.').length>2 
    ? hostname.split('.')[0] : 'default-store';

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    try {
        const response = await apiFetch('/api/register', {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json',
                'x-store-slug': storeSlug 
            },// Send the store slug in the headers
            body: JSON.stringify(userData),
        });
        const data = await response.json();

        if (response.ok) {
        alert("Registration Successful!");
        setUsername('');
        setEmail('');
        setPassword('');
        setFormType('login'); // Switch to login form after successful registration
        } else {    
        alert(data.message || "Registration failed");
       }
    } catch (err) {
        console.error("Registration Error:", err);
        alert("Network error during registration.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await apiFetch('/api/login', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'x-store-slug': storeSlug // Send the store slug in the headers
            },
            body: JSON.stringify({email, password})
        });
        
        const data = await response.json();


        if (response.ok) {
            // saving token and username to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);

            alert("Welcome back, " + data.user.username);
            // option to redirect to home
            navigate("/products");
        } else {
            alert(data.message || "Login failed. Please check your credentials.");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Network error during login.");
    }
  };

  return (
    <div className="account-page">
        <div className="container">
            <div className="row" style={{ alignItems: 'stretch' }}>
                <div className="col-2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        width: '100%',
                        flex: '1',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        minHeight:'350px'
                    }}>
                        <img 
                            src="/assets/image1.png" 
                            alt="Featured"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                    
                </div>
                <div className="col-2">
                    <div
                        style={{
                            textAlign: 'left', 
                            background: '#2c2c2c', 
                            padding: '30px', 
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                            width: '100%',
                            maxWidth: '500px',
                            height: 'auto',
                            minHeight: '350px',
                            overflow: 'hidden',
                            position: 'relative',
                            margin: '0 auto',
                            boxSizing: 'border-box'
                        }}>
                        <div
                            style={{ textAlign: 'center', marginBottom: '25px', position: 'relative' }}>
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <span 
                                        onClick={() => setFormType('login')} 
                                        style={{ 
                                            color: formType === 'login' ? 'var(--primary-color, #ff523b)' : '#aaa',
                                            cursor: 'pointer', 
                                            fontWeight: 'bold', 
                                            padding: '0 15px 8px 15px', 
                                            display: 'inline-block',
                                            transition: 'color 0.3s ease'}}>
                                            Login
                                    </span>
                                
                                    <span 
                                        onClick={() => setFormType('register')} 
                                        style={{ 
                                            color: formType === 'register' ? 'var(--primary-color, #ff523b)' : '#aaa', 
                                            cursor: 'pointer', 
                                            fontWeight: 'bold', 
                                            padding: '0 15px 8px 15px', 
                                            display: 'inline-block',
                                            transition: 'color 0.3s ease'
                                        }}>
                                        Register
                                    </span>
                                
                                <div style={{ 
                                    position: 'absolute',
                                    bottom: '0',
                                    left: formType === 'login' ? '10px' : '95px',
                                    width: '65px', 
                                    background: 'var(--primary-color, #ff523b)', 
                                    height: '3px',
                                    borderRadius: '2px',
                                    transition: 'left 0.3s ease-in-out' }}
                                />
                            </div>
                        </div>

                             {/* Conditional Form Rendering (No SLide Overflow) */}
                        {formType === 'login' ? (
                            <form onSubmit={handleLogin} id="LoginForm" >
                            
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email} 
                                    required 
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password"  
                                    value={password} 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={inputStyle}
                                />
                                <button type="submit" className="btn" style={{ width: '100%', margin: '15px 0'}}>Login</button>
                                <a href="#forgot" style={{ color: '#aaa', fontSize: '12px', textDecoration: 'none' }}>Forgot password</a>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} id="RegForm">
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    value={username} 
                                    required 
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={inputStyle}
                                />
                                <button type="submit" className="btn" style={{ width: '100%', margin: '15px 0' }}>Register</button>
                            </form>
                        )} 
                    </div>       
                </div>  
            </div>
        </div>
    </div>
  );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #444',
    background: '#1a1a1a',
    color: '#fff',
    borderRadius: '5px',
    outline: 'none',
    boxSizing: 'border-box'
};

export default Account;