import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you ${formData.name}, your message has been sent!`);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="small-container contact-page" style={{ padding: '50px 0' }}>
            <div className="row">
                <div className="col-2">
                    <img src="/assets/contact.jpg" width="100%" alt="Contact Us" 
                         onError={(e) => e.target.src = "https://via.placeholder.com/500x400?text=Contact+Us"} />
                </div>
                <div className="col-2">
                    <div className="form-container" style={{ textAlign: 'left', background: '#2c2c2c', padding: '30px', borderRadius: '10px' }}>
                        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Get in Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Your Name" required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                style={inputStyle} />
                            
                            <input type="email" placeholder="Email Address" required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                style={inputStyle} />
                            
                            <input type="text" placeholder="Subject" required 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                style={inputStyle} />
                            
                            <textarea placeholder="Your Message" rows="5" required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{ ...inputStyle, resize: 'none' }}></textarea>
                            
                            <button type="submit" className="btn">Send Message</button>
                        </form>
                    </div>

                    <div className="contact-info" style={{ marginTop: '30px', color: '#ccc' }}>
                        <p>📍 123 Business Bay, Maralal, Kenya</p>
                        <p>📞 +254 713 266 364</p>
                        <p>✉️ support@redstore.com</p>
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
    borderRadius: '5px'
};

export default Contact;