import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState({ projects: true, clients: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(prev => ({ ...prev, clients: false }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      await axios.post(`${API_URL}/contacts`, formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', mobile: '', city: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/subscribers`, { email: newsletterEmail });
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      
      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 5000);
    } catch (error) {
      if (error.response?.data?.message?.includes('already subscribed')) {
        alert('This email is already subscribed!');
      } else {
        alert('Subscription failed. Please try again.');
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Real Trust" className="logo-img" />
            <span className="logo-text">Real<span className="logo-highlight">Trust</span></span>
          </div>
          
          <nav className="nav">
            <a href="#home" className="nav-link active">HOME</a>
            <a href="#services" className="nav-link">SERVICES</a>
            <a href="#projects" className="nav-link">ABOUT/ PROJECTS</a>
            <a href="#testimonials" className="nav-link">TESTIMONIALS</a>
            <button className="contact-btn" onClick={() => scrollToSection('contact')}>CONTACT</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <img src="/assets/shapes/Ellipse 1.svg" alt="" className="shape shape-1" />
            <img src="/assets/shapes/Ellipse 7.svg" alt="" className="shape shape-2" />
            <img src="/assets/shapes/Ellipse 8.svg" alt="" className="shape shape-3" />
          </div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-image-section">
              <img 
                src="/assets/images/pexels-fauxels-3182834.svg" 
                alt="Team consultation" 
                className="hero-main-image"
              />
              <h1 className="hero-title">
                Consultation,<br />
                Design,<br />
                & Marketing
              </h1>
            </div>
            
            {/* Contact Form Card */}
            <div className="hero-form-card" id="contact">
              <h2 className="form-title">Get a Free<br />Consultation</h2>
              
              {submitSuccess && (
                <div className="success-message">
                  Thank you! We'll contact you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  required
                  className="form-input"
                />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Area, City"
                  required
                  className="form-input"
                />
                <button type="submit" className="submit-btn" disabled={submitLoading}>
                  {submitLoading ? 'Submitting...' : 'Get Quick Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Not Your Average Realtor Section */}
      <section className="about-intro">
        <div className="container about-intro-container">
          <div className="about-intro-content">
            <h2 className="section-title">Not Your Average Realtor</h2>
            <p className="about-intro-text">
              We understand and appreciate the core scrapping quality, excellent 
              consulting design and effective marketing to get 
              the best offers on your dollar, any time, any place.
            </p>
            <div className="about-shapes">
              <img src="/assets/shapes/Ellipse 17.svg" alt="" className="about-shape-1" />
              <img src="/assets/shapes/Ellipse 18.svg" alt="" className="about-shape-2" />
            </div>
          </div>
          <div className="about-intro-image">
            <img 
              src="/assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg" 
              alt="Consultation"
              className="realtor-image"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title centered">Why Choose Us?</h2>
          <div className="services-shapes">
            <img src="/assets/shapes/Ellipse 19.svg" alt="" className="service-shape-1" />
            <img src="/assets/shapes/Ellipse 20.svg" alt="" className="service-shape-2" />
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/icons/home.svg" alt="Potential ROI" />
              </div>
              <h3>Potential ROI</h3>
              <p>Whether you're just starting to look at ways to increase your current home's value, we will book you a virtual or phone call consultation.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/icons/paintbrush-2.svg" alt="Design" />
              </div>
              <h3>Design</h3>
              <p>In a change, we are working to restructure your home's guide throughout your design options and coordinating renovations to suit your time line and budget.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/icons/circle-dollar-sign.svg" alt="Marketing" />
              </div>
              <h3>Marketing</h3>
              <p>Using our on-site photos, professional staging items and the latest marketing strategies to market your home to reach today's buyers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="/assets/images/pexels-brett-sayles-2881232.svg" alt="Property 1" />
            </div>
            <div className="gallery-item">
              <img src="/assets/images/pexels-brett-sayles-2881232-1.svg" alt="Property 2" />
            </div>
            <div className="gallery-item">
              <img src="/assets/images/pexels-brett-sayles-2881232-2.svg" alt="Property 3" />
            </div>
            <div className="gallery-arrow">
              <button className="arrow-btn">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title centered">About Us</h2>
          <div className="title-underline"></div>
          <p className="about-description">
            Fifteen years of experience have led us to an expertise that ensures success and a 
            commitment to word list, future and future success. We pride truly ourselves in 
            building relationships with our clients and, more importantly, maintain those relationships 
            by communicating effectively.
          </p>
          <button className="learn-more-btn">LEARN MORE</button>
        </div>
      </section>

      {/* Our Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title centered">Our Projects</h2>
          <p className="section-subtitle">
            We know what buyers are looking for and suggest projects that will bring 
            clients top dollar for the sale of their homes.
          </p>
          
          {loading.projects ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <div className="projects-grid">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-image">
                      <img 
                        src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                        alt={project.name}
                      />
                    </div>
                    <div className="project-content">
                      <h3 className="project-category">{project.category || 'Consultation'}</h3>
                      <p className="project-info">{project.name}, {project.location || 'Location'}</p>
                      <button className="read-more-btn">READ MORE</button>
                    </div>
                  </div>
                ))
              ) : (
                // Default sample projects when no data
                <>
                  <div className="project-card">
                    <div className="project-image">
                      <img src="/assets/images/pexels-andres-ayrton-6578391.svg" alt="Consultation" />
                    </div>
                    <div className="project-content">
                      <h3 className="project-category">Consultation</h3>
                      <p className="project-info">Project Name, Location</p>
                      <button className="read-more-btn">READ MORE</button>
                    </div>
                  </div>
                  <div className="project-card">
                    <div className="project-image">
                      <img src="/assets/images/pexels-brett-sayles-2881232-3.svg" alt="Design" />
                    </div>
                    <div className="project-content">
                      <h3 className="project-category">Design</h3>
                      <p className="project-info">Project Name, Location</p>
                      <button className="read-more-btn">READ MORE</button>
                    </div>
                  </div>
                  <div className="project-card">
                    <div className="project-image">
                      <img src="/assets/images/Rectangle.svg" alt="Marketing & Design" />
                    </div>
                    <div className="project-content">
                      <h3 className="project-category">Marketing & Design</h3>
                      <p className="project-info">Project Name, Location</p>
                      <button className="read-more-btn">READ MORE</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Happy Clients Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title centered">Happy Clients</h2>
          <div className="testimonial-shapes">
            <img src="/assets/shapes/Ellipse 24.svg" alt="" className="testimonial-shape-1" />
            <img src="/assets/shapes/Ellipse 25.svg" alt="" className="testimonial-shape-2" />
          </div>
          
          {loading.clients ? (
            <div className="loading">Loading testimonials...</div>
          ) : (
            <div className="testimonials-grid">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <div key={client._id} className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img 
                        src={client.image.startsWith('http') ? client.image : `http://localhost:5000${client.image}`}
                        alt={client.name}
                      />
                    </div>
                    <p className="testimonial-text">{client.description}</p>
                    <h4 className="testimonial-name">{client.name}</h4>
                    <p className="testimonial-designation">{client.designation}</p>
                  </div>
                ))
              ) : (
                // Default sample testimonials
                <>
                  <div className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img src="/assets/images/Ellipse 11.svg" alt="Rowhan Smith" />
                    </div>
                    <p className="testimonial-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <h4 className="testimonial-name">Rowhan Smith</h4>
                    <p className="testimonial-designation">CEO, Foreclosure</p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img src="/assets/images/Ellipse 12.svg" alt="Shipra Kayak" />
                    </div>
                    <p className="testimonial-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <h4 className="testimonial-name">Shipra Kayak</h4>
                    <p className="testimonial-designation">Brand Designer</p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img src="/assets/images/Ellipse 13.svg" alt="John Lepore" />
                    </div>
                    <p className="testimonial-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <h4 className="testimonial-name">John Lepore</h4>
                    <p className="testimonial-designation">CEO, Foreclosure</p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img src="/assets/images/Ellipse 28.svg" alt="Marry Freeman" />
                    </div>
                    <p className="testimonial-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <h4 className="testimonial-name">Marry Freeman</h4>
                    <p className="testimonial-designation">Marketing Manager at Mixit</p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-avatar">
                      <img src="/assets/images/Ellipse 29.svg" alt="Lucy" />
                    </div>
                    <p className="testimonial-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    <h4 className="testimonial-name">Lucy</h4>
                    <p className="testimonial-designation">Sales Rep at Alibaba</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <p className="cta-text">
            Learn more about our listing process, as well as our<br />
            additional staging and design work.
          </p>
          <button className="learn-more-btn white">LEARN MORE</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="container footer-container">
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </nav>
            
            <div className="newsletter-section">
              <span className="subscribe-label">Subscribe Us</span>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  {newsletterSuccess ? '✓ Subscribed' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p className="copyright">All Rights Reserved 2024</p>
            <div className="footer-logo">
              <img src="/assets/images/logo.svg" alt="Real Trust" />
              <span>Real<span className="logo-highlight">Trust</span></span>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
