import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Account from './pages/Account';
import Products from './components/Products';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import Contact from './pages/Contact';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';
import './App.css'


function App() {
  return (
    <Router>
      <Header/>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" 
                element={
                <ProtectedRoute>
                  <Cart/>

                </ProtectedRoute>}/>
        <Route path="/thank-you" 
                element={
                <ProtectedRoute>
                  <ThankYou />
                </ProtectedRoute>}/>
      </Routes>
      <Footer/>
      
    </Router>
  );
}

export default App;
