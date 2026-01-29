# Real Trust - Lead Generation Landing Page

A complete full-stack web application with a lead generation landing page and an admin dashboard for managing content.

## ✨ Features

### **Landing Page**
- **Hero Section**: Eye-catching design with contact form for lead generation
- **About Section**: Company introduction and value proposition
- **Services Section**: Why Choose Us - ROI, Design, Marketing
- **Our Projects Section**: Displays projects fetched from backend
  - Project's Image (cropped to 450x350)
  - Project's Name
  - Project's Description  
  - Read More button
- **Happy Clients Section**: Client testimonials from backend
  - Client's Image
  - Client's Description
  - Client's Name
  - Client's Designation
- **Contact Form**: Collects Full Name, Email, Mobile Number, City
- **Newsletter Subscription**: Email subscription system

### **Admin Panel**
- **Project Management**: Add/delete projects with image uploads
- **Client Management**: Add/delete client testimonials with photos
- **Contact Form Details**: View all contact form submissions
- **Subscriber Management**: View all newsletter subscribers

### **Backend API**
- RESTful API built with Node.js & Express
- MongoDB database with Mongoose ODM
- Image upload & processing with Sharp.js (450x350 cropping)
- CORS-enabled for cross-origin requests

## 🛠️ Tech Stack

**Frontend:**
- React.js 18 with functional components & hooks
- Axios for API communication
- Custom CSS with responsive design

**Admin Panel:**
- React.js with CRUD operations
- Tabbed interface for different sections

**Backend:**
- Node.js with Express.js
- MongoDB Atlas (Cloud Database)
- Multer for file uploads
- Sharp for image processing (450x350 crop)
- Mongoose for data modeling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Manoj-Krishna-Chandragiri/Flipr-Assessment.git
cd Flipr-Assessment
```

2. **Backend Setup**
```bash
cd backend
npm install
# Create .env file with your MongoDB URI
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env
npm run dev
```

3. **Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm start
```

4. **Admin Panel Setup** (new terminal)
```bash
cd admin-panel
npm install
npm start
```

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
├── frontend/              # Landing Page (React)
│   ├── public/
│   │   └── assets/       # Images, Icons, Shapes
│   └── src/
│       ├── App.js        # Main component
│       └── App.css       # Styles
│
├── admin-panel/          # Admin Dashboard (React)
│   └── src/
│       ├── App.js        # Admin component
│       └── App.css       # Admin styles
│
├── backend/              # API Server (Node.js)
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Image processing
│   └── uploads/          # Uploaded images
│
└── Assets/               # Design assets
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Add new project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/clients | Get all clients |
| POST | /api/clients | Add new client |
| DELETE | /api/clients/:id | Delete client |
| GET | /api/contacts | Get all contact submissions |
| POST | /api/contacts | Submit contact form |
| DELETE | /api/contacts/:id | Delete contact |
| GET | /api/subscribers | Get all subscribers |
| POST | /api/subscribers | Add newsletter subscriber |
| DELETE | /api/subscribers/:id | Delete subscriber |

## 🖼️ Image Cropping

Images uploaded through the admin panel are automatically cropped:
- **Projects**: 450x350 pixels
- **Clients**: 400x400 pixels (square)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎯 Features Implemented

- [x] Landing Page with all sections
- [x] Our Projects Section (from backend)
- [x] Happy Clients Section (from backend)
- [x] Contact Form (submits to backend)
- [x] Newsletter Subscription
- [x] Admin Panel - Project Management
- [x] Admin Panel - Client Management
- [x] Admin Panel - Contact Form Responses
- [x] Admin Panel - Subscriber List
- [x] Image Cropping (450x350)
- [x] Responsive Design

## 📄 License

This project is created for assessment purposes.
