import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    category: 'Consultation',
    location: '',
    image: null
  });
  
  const [clientForm, setClientForm] = useState({
    name: '',
    description: '',
    designation: '',
    image: null
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projRes, cliRes, conRes, subRes] = await Promise.all([
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/clients`),
        axios.get(`${API_URL}/contacts`),
        axios.get(`${API_URL}/subscribers`)
      ]);
      setProjects(projRes.data.data || []);
      setClients(cliRes.data.data || []);
      setContacts(conRes.data.data || []);
      setSubscribers(subRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      formData.append('description', projectForm.description);
      formData.append('category', projectForm.category);
      formData.append('location', projectForm.location);
      if (projectForm.image) {
        formData.append('image', projectForm.image);
      }
      
      await axios.post(`${API_URL}/projects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      showMessage('success', 'Project added successfully!');
      setProjectForm({ name: '', description: '', category: 'Consultation', location: '', image: null });
      fetchAllData();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to add project');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        showMessage('success', 'Project deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('error', 'Failed to delete project');
      }
    }
  };

  // Client handlers
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      formData.append('description', clientForm.description);
      formData.append('designation', clientForm.designation);
      if (clientForm.image) {
        formData.append('image', clientForm.image);
      }
      
      await axios.post(`${API_URL}/clients`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      showMessage('success', 'Client added successfully!');
      setClientForm({ name: '', description: '', designation: '', image: null });
      fetchAllData();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to add client');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`${API_URL}/clients/${id}`);
        showMessage('success', 'Client deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('error', 'Failed to delete client');
      }
    }
  };

  // Delete handlers for contacts and subscribers
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        showMessage('success', 'Contact deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('error', 'Failed to delete contact');
      }
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await axios.delete(`${API_URL}/subscribers/${id}`);
        showMessage('success', 'Subscriber deleted successfully!');
        fetchAllData();
      } catch (error) {
        showMessage('error', 'Failed to delete subscriber');
      }
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Admin Panel</h1>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="icon">📁</span> Projects
          </button>
          <button 
            className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <span className="icon">👥</span> Clients
          </button>
          <button 
            className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <span className="icon">📧</span> Contact Forms
          </button>
          <button 
            className={`nav-item ${activeTab === 'subscribers' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscribers')}
          >
            <span className="icon">📬</span> Subscribers
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <h2>
            {activeTab === 'projects' && 'Project Management'}
            {activeTab === 'clients' && 'Client Management'}
            {activeTab === 'contacts' && 'Contact Form Responses'}
            {activeTab === 'subscribers' && 'Newsletter Subscribers'}
          </h2>
          <button className="refresh-btn" onClick={fetchAllData}>
            🔄 Refresh
          </button>
        </header>

        {/* Message Alert */}
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="content-body">
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="tab-content">
                {/* Add Project Form */}
                <div className="form-card">
                  <h3>Add New Project</h3>
                  <form onSubmit={handleProjectSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Project Name *</label>
                        <input
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                          required
                          placeholder="Enter project name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                        >
                          <option value="Consultation">Consultation</option>
                          <option value="Design">Design</option>
                          <option value="Marketing & Design">Marketing & Design</option>
                          <option value="Consultation & Marketing">Consultation & Marketing</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                          placeholder="Enter location"
                        />
                      </div>
                      <div className="form-group">
                        <label>Project Image *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProjectForm({...projectForm, image: e.target.files[0]})}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description *</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        required
                        placeholder="Enter project description"
                        rows="3"
                      />
                    </div>
                    <button type="submit" className="submit-btn" disabled={submitLoading}>
                      {submitLoading ? 'Adding...' : 'Add Project'}
                    </button>
                  </form>
                </div>

                {/* Projects List */}
                <div className="data-card">
                  <h3>All Projects ({projects.length})</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Location</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project._id}>
                            <td>
                              <img 
                                src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                                alt={project.name}
                                className="table-image"
                              />
                            </td>
                            <td>{project.name}</td>
                            <td>{project.category}</td>
                            <td>{project.location}</td>
                            <td className="desc-cell">{project.description}</td>
                            <td>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteProject(project._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {projects.length === 0 && (
                          <tr>
                            <td colSpan="6" className="empty-row">No projects found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="tab-content">
                {/* Add Client Form */}
                <div className="form-card">
                  <h3>Add New Client</h3>
                  <form onSubmit={handleClientSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Client Name *</label>
                        <input
                          type="text"
                          value={clientForm.name}
                          onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                          required
                          placeholder="Enter client name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Designation *</label>
                        <input
                          type="text"
                          value={clientForm.designation}
                          onChange={(e) => setClientForm({...clientForm, designation: e.target.value})}
                          required
                          placeholder="e.g., CEO, Web Developer"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Client Image *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setClientForm({...clientForm, image: e.target.files[0]})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description/Testimonial *</label>
                      <textarea
                        value={clientForm.description}
                        onChange={(e) => setClientForm({...clientForm, description: e.target.value})}
                        required
                        placeholder="Enter client testimonial"
                        rows="3"
                      />
                    </div>
                    <button type="submit" className="submit-btn" disabled={submitLoading}>
                      {submitLoading ? 'Adding...' : 'Add Client'}
                    </button>
                  </form>
                </div>

                {/* Clients List */}
                <div className="data-card">
                  <h3>All Clients ({clients.length})</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client) => (
                          <tr key={client._id}>
                            <td>
                              <img 
                                src={client.image.startsWith('http') ? client.image : `http://localhost:5000${client.image}`}
                                alt={client.name}
                                className="table-image round"
                              />
                            </td>
                            <td>{client.name}</td>
                            <td>{client.designation}</td>
                            <td className="desc-cell">{client.description}</td>
                            <td>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteClient(client._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {clients.length === 0 && (
                          <tr>
                            <td colSpan="5" className="empty-row">No clients found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="tab-content">
                <div className="data-card">
                  <h3>Contact Form Responses ({contacts.length})</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Mobile Number</th>
                          <th>City</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.mobile}</td>
                            <td>{contact.city}</td>
                            <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteContact(contact._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {contacts.length === 0 && (
                          <tr>
                            <td colSpan="6" className="empty-row">No contact submissions yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Subscribers Tab */}
            {activeTab === 'subscribers' && (
              <div className="tab-content">
                <div className="data-card">
                  <h3>Newsletter Subscribers ({subscribers.length})</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Email Address</th>
                          <th>Subscribed Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber, index) => (
                          <tr key={subscriber._id}>
                            <td>{index + 1}</td>
                            <td>{subscriber.email}</td>
                            <td>{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteSubscriber(subscriber._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {subscribers.length === 0 && (
                          <tr>
                            <td colSpan="4" className="empty-row">No subscribers yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
