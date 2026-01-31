import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
  
  // Carousel refs
  const projectsCarouselRef = useRef(null);
  const clientsCarouselRef = useRef(null);

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

  // Carousel scroll functions
  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Default projects data matching screenshots
  const defaultProjects = [
    {
      _id: '1',
      name: 'Project Name',
      location: 'Location',
      category: 'Consultation',
      image: '/assets/images/pexels-brett-sayles-2881232.svg'
    },
    {
      _id: '2',
      name: 'Project Name',
      location: 'Location',
      category: 'Design',
      image: '/assets/images/pexels-brett-sayles-2881232-1.svg'
    },
    {
      _id: '3',
      name: 'Project Name',
      location: 'Location',
      category: 'Marketing & Design',
      image: '/assets/images/pexels-brett-sayles-2881232-2.svg'
    },
    {
      _id: '4',
      name: 'Project Name',
      location: 'Location',
      category: 'Consultation & Marketing',
      image: '/assets/images/pexels-brett-sayles-2881232-3.svg'
    },
    {
      _id: '5',
      name: 'Project Name',
      location: 'Location',
      category: 'Consultation',
      image: '/assets/images/pexels-fauxels-3182834.svg'
    }
  ];

  // Default clients data matching screenshots
  const defaultClients = [
    {
      _id: '1',
      name: 'Rowhan Smith',
      designation: 'CEO, Foreclosure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      image: '/assets/images/Ellipse 29.svg'
    },
    {
      _id: '2',
      name: 'Shipra Kayak',
      designation: 'Brand Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      image: '/assets/images/Ellipse 28.svg'
    },
    {
      _id: '3',
      name: 'John Lepore',
      designation: 'CEO, Foreclosure',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      image: '/assets/images/Ellipse 31.svg'
    },
    {
      _id: '4',
      name: 'Marry Freeman',
      designation: 'Marketing Manager at Mixit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      image: '/assets/images/Ellipse 33.svg'
    },
    {
      _id: '5',
      name: 'Lucy',
      designation: 'Sales Rep at Alibaba',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      image: '/assets/images/Ellipse 35.svg'
    }
  ];

  // Merge default projects with fetched projects from database
  const displayProjects = [...defaultProjects, ...projects];
  // Merge default clients with fetched clients from database
  const displayClients = [...defaultClients, ...clients];

  return (
    <div className="app">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="Real Trust" className="logo-img" />
          </div>
          
          <nav className="nav">
            <a href="#home" className="nav-link active">HOME</a>
            <a href="#services" className="nav-link">SERVICES</a>
            <a href="#projects" className="nav-link">ABOUT/PROJECTS</a>
            <a href="#testimonials" className="nav-link">TESTIMONIALS</a>
            <button className="contact-btn" onClick={() => scrollToSection('contact')}>CONTACT</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero" style={{
        backgroundImage: `url('/assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg')`,
        backgroundSize: 'contain',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5'
      }}>
        <div className="hero-overlay"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            {/* Left Side Title */}
            <h1 className="hero-title">
              Consultation,<br />
              Design,<br />
              & Marketing
            </h1>
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
          </div>
          <div className="about-intro-images">
            {/* Decorative shapes */}
            <div className="about-shapes">
              <img src="/assets/shapes/Ellipse 17.svg" alt="" className="about-shape-1" />
              <img src="/assets/shapes/Ellipse 18.svg" alt="" className="about-shape-2" />
              <img src="/assets/shapes/Ellipse 19.svg" alt="" className="about-shape-3" />
              <img src="/assets/shapes/Ellipse 20.svg" alt="" className="about-shape-4" />
            </div>
            
            {/* Main large image */}
            <div className="about-image-main">
              <img src="/assets/images/Ellipse 12.svg" alt="Real estate agent" />
            </div>
            
            {/* Top right image */}
            <div className="about-image-top">
              <img src="/assets/images/Ellipse 11.svg" alt="Property consultation" />
            </div>
            
            {/* Bottom right image */}
            <div className="about-image-bottom">
              <img src="/assets/images/Ellipse 13.svg" alt="Client meeting" />
            </div>
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
          <div className="gallery-shapes">
            <img src="/assets/shapes/Subtract-4.svg" alt="" className="gallery-shape-1" />
            <img src="/assets/shapes/Subtract.svg" alt="" className="gallery-shape-2" />
            <img src="/assets/shapes/Rectangle 54.svg" alt="" className="gallery-shape-3" />
            <img src="/assets/shapes/Subtract-5.svg" alt="" className="gallery-shape-4" />
          </div>
          <div className="gallery-grid">
            <div className="gallery-item small left">
              <img src="/assets/images/pexels-brett-sayles-2881232.svg" alt="Property 1" />
            </div>
            <div className="gallery-item large center">
              <img src="/assets/images/pexels-andres-ayrton-6578391.svg" alt="Property 2" />
            </div>
            <div className="gallery-item small right">
              <img src="/assets/images/pexels-fauxels-3182834.svg" alt="Property 3" />
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
            We know what buyers are looking for and suggest projects that will bring<br/>
            clients top dollar for the sale of their homes.
          </p>
          
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" onClick={() => scrollCarousel(projectsCarouselRef, 'left')}>
              ‹
            </button>
            
            <div className="projects-carousel" ref={projectsCarouselRef}>
              {displayProjects.map((project, index) => (
                <div key={project._id || index} className="project-card">
                  <div className="project-image">
                    <img 
                      src={
                        project.image?.startsWith('http') 
                          ? project.image 
                          : project.image?.startsWith('/uploads') 
                            ? `${BACKEND_URL}${project.image}`
                            : project.image?.startsWith('/assets') || project.image?.startsWith('/') 
                              ? project.image 
                              : `${BACKEND_URL}${project.image}`
                      }
                      alt={project.name}
                      onError={(e) => {
                        console.error('Image load error for:', project.name, project.image);
                        e.target.src = '/assets/images/pexels-brett-sayles-2881232.svg'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="project-content">
                    <h3 className="project-category">{project.category || 'Consultation'}</h3>
                    <p className="project-info">{project.name}, {project.location || 'Location'}</p>
                    <button className="read-more-btn">READ MORE</button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="carousel-btn next" onClick={() => scrollCarousel(projectsCarouselRef, 'right')}>
              ›
            </button>
          </div>
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
          
          <div className="carousel-wrapper">
            <button className="carousel-btn prev dark" onClick={() => scrollCarousel(clientsCarouselRef, 'left')}>
              ‹
            </button>
            
            <div className="testimonials-carousel" ref={clientsCarouselRef}>
              {displayClients.map((client, index) => (
                <div key={client._id || index} className="testimonial-card">
                  <div className="testimonial-avatar">
                    <img 
                      src={
                        client.image?.startsWith('http') 
                          ? client.image 
                          : client.image?.startsWith('/uploads') 
                            ? `${BACKEND_URL}${client.image}`
                            : client.image?.startsWith('/assets') || client.image?.startsWith('/') 
                              ? client.image 
                              : `${BACKEND_URL}${client.image}`
                      }
                      alt={client.name}
                      onError={(e) => {
                        console.error('Image load error for:', client.name, client.image);
                        e.target.src = '/assets/images/Ellipse 11.svg'; // Fallback image
                      }}
                    />
                  </div>
                  <p className="testimonial-text">{client.description}</p>
                  <h4 className="testimonial-name">{client.name}</h4>
                  <p className="testimonial-designation">{client.designation}</p>
                </div>
              ))}
            </div>
            
            <button className="carousel-btn next dark" onClick={() => scrollCarousel(clientsCarouselRef, 'right')}>
              ›
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{
        backgroundImage: `url('/assets/images/Rectangle.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
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
            <p className="copyright">All Rights Reserved 2026</p>
            <div className="footer-logo">
              <img src="/assets/images/logo.svg" alt="Real Trust" />
            </div>
            <div className="social-links">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="https://www.linkedin.com/in/manoj-krishna-chandragiri" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
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
