import React, { useState } from 'react';

const Account = () => {
    // login or register
    const [formType, setFormType] = useState('login');

    // Translation values
  const loginTransform = formType === 'login' ? "translateX(300px)" : "translateX(0px)";
  const registerTransform = formType === 'login' ? "translateX(300px)" : "translateX(0px)";
  const indicatorTransform = formType === 'login' ? "translateX(0px)" : "translateX(100px)";

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const hostname = window.location.hostname;
  const storeSlug = hostname.includes('.') && hostname.split('.').length>2 
    ? hostname.split('.')[0] : 'default-store';



  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.json();

        if (response.ok) {
        alert("Registration Successful!");
        // Clear form
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
        const response = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Store-Slug': storeSlug // Send the store slug in the headers
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
            window.location.href="/products";
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
        <div className="conatiner">
            <div className="row">
                <div className="col-2">
                    <img src="/assets/image1.png" width="100%" alt="Featured" />
                </div>
                <div className="col-2">
                    <div className="form-container">
                        <div className="form-btn">
                            <span onClick={() => setFormType('login')}>Login</span>
                            <span onClick={() => setFormType('register')}>Register</span>
                            <hr id="Indicator" style={{ transform: indicatorTransform }} />
                        </div>
                        {/* Login Form */}
                        <form 
                            onSubmit={handleLogin}
                            id="LoginForm" 
                            style={{ transform: loginTransform }}
                        >
                            <input type="email" placeholder="Email" value={email} required 
                                onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password"  value={password} required 
                                onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit" className="btn">Login</button>
                            <a href="">Forgot password</a>
                        </form>

                        {/* Register Form */}
                        <form 
                            onSubmit={handleRegister}
                            id="RegForm" 
                            style={{ transform: registerTransform }}
                        >
                            <input type="text" placeholder="Username" value={username} required 
                                onChange={(e) => setUsername(e.target.value)}/>
                            <input type="email" placeholder="Email" required value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password" required value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit" className="btn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Account;