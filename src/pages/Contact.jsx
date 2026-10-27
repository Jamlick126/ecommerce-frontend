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
            <div className="row contact-top-row" style={{ alignItems: 'stretch', marginBottom: '50px'}}>
                {/* Contact Image */}
                <div className="col-2" style={{ display: 'flex'}}>
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        overflow:'hidden',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                        minHeight: '400px'
                    }}>
                        <img 
                            src="/assets/contact.jpg" 
                            alt="Contact Us" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            onError={(e) => e.target.src = "https://via.placeholder.com/500x400?text=Contact+Us"}
                        />
                    </div>
                </div>
                {/*Form and information */}
                <div className="col-2">
                    <div className="form-container" style={{ 
                            textAlign: 'left', 
                            background: '#2c2c2c', 
                            padding: '30px', 
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                        }}>
                        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Get in Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                style={inputStyle} />
                            
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                style={inputStyle} />
                            
                            <input 
                                type="text" 
                                placeholder="Subject" 
                                required 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                style={inputStyle} />
                            
                            <textarea 
                                placeholder="Your Message" 
                                rows="5" 
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{ ...inputStyle, resize: 'none' }}>
                            </textarea>
                            
                            <button type="submit" className="btn">Send Message</button>
                        </form>

                        {/* Divider Line & Contact Info inside the Dark Container */}
                        <hr style={{ border: 'none', height: '1px', background: '#444', margin: '25px 0' }} />
                        
                        <div className="contact-info" style={{ color: '#ccc', paddingLeft: '5px' }}>
                            <p style={{ marginBottom: '8px', color: '#ccc'}} >📍 123 Business Bay, Maralal, Kenya</p>
                            <p style={{ marginBottom: '8px', color: '#ccc'}} >📞 +254 796 755 881</p>
                            <p style={{ color: '#ccc'}} >✉️ support@redstore.com</p>
                        </div>

                    </div>

                    
                </div>

                </div>
                {/* Right Column: Google Maps Location */}
                <div className="map-full-container" style={{ width: '100%'}}>
                    <h3 style={{ color: 'var(--text-main, #333)', marginBottom: '15px', textAlign: 'center' }}>Our Location</h3>
                    <div className="map-container" style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
                        <iframe 
                            title="Store Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.08747427181!2d36.690833!3d1.096667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17855b768a4ab0f7%3A0x6b77227e0bc2784d!2sMaralal!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
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
    cursor: 'pointer'
};

export default Contact;