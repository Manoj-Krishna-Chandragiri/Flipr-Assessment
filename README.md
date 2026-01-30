# Real Trust - Lead Generation Landing Page

A complete full-stack web application with a lead generation landing page and an admin dashboard for managing content.

## ✨ Features

### **Landing Page**
- **Header/Navigation**: Responsive navbar with smooth scroll navigation and SVG icons
- **Hero Section**: Eye-catching design with background image, contact form for lead generation, and form validation
- **Not Your Average Realtor Section**: Company value proposition with 3-image circular collage and decorative shapes
- **Why Choose Us Section**: 
  - 3 service cards (Potential ROI, Design, Marketing)
  - Titles styled in blue (#2196F3)
  - Icons with descriptions
  - Decorative background shapes
- **Gallery Section**: 
  - 3-column layout with L-shaped colored borders
  - First image: Small, top-left (orange border)
  - Middle image: Larger, centered (blue border)
  - Third image: Small, top-right (orange border)
  - Slight rotation animations (-2°, 1°, -1°)
  - Decorative shapes
- **About Us Section**: Company information with CTA button
- **Our Projects Carousel**: 
  - Dynamically merged default + admin-added projects
  - Project images with error fallback
  - Category, name, and location display
  - Carousel navigation with prev/next buttons
- **Happy Clients Carousel**:
  - Dynamically merged default + admin-added testimonials
  - Client avatars with improved image handling
  - Testimonial text, name, and designation
  - Auto-scroll carousel with pause on hover
  - Proper date-based image URL resolution
- **CTA Section**: 
  - Background image with dark overlay
  - Large text (1.8rem)
  - White button styling
- **Newsletter Subscription**:
  - Blue background input (#2196F3)
  - White border (2px)
  - Subscribe button with success feedback
- **Footer**:
  - Navigation links
  - Newsletter signup
  - Social media links with white circular backgrounds
  - Copyright information

### **Admin Panel**
- **Project Management**: 
  - Add new projects with image, name, category, location, description
  - View all projects (count displayed)
  - Delete projects with confirmation
  - Uploaded projects merge with defaults on frontend
- **Client Management**: 
  - Add new client testimonials with image, name, designation, description
  - View all clients (count displayed)
  - Delete clients with confirmation
  - New clients merge with defaults on frontend (no data loss)
- **Contact Form Responses**:
  - View all form submissions
  - Display: Name, Email, Mobile, City
  - Proper date formatting (submittedAt field) with time
  - Delete functionality with confirmation
- **Newsletter Subscribers**:
  - View all newsletter subscribers
  - Display: Index, Email, Subscription Date
  - Proper date formatting (subscribedAt field) with time
  - Delete functionality with confirmation
- **SVG Icons**: Professional folder, users, envelope, mailbox, and refresh icons in sidebar
- **Responsive Design**: Works on desktop and tablet

### **Backend API**
- **RESTful Architecture**: Built with Node.js & Express
- **Database**: MongoDB Atlas (Cloud) with Mongoose ODM
- **File Upload**: Multer middleware for image uploads to `/uploads` directory
- **Image Processing**: Sharp.js for cropping (450x350 for projects, 400x400 for clients)
- **CORS**: Enabled for cross-origin requests from frontend and admin panel
- **Date Fields**: Proper date tracking (submittedAt, subscribedAt, createdAt)
- **Static Files**: Serves uploaded images via `/uploads` route
- **Error Handling**: Comprehensive error messages and validation
- **CRUD Operations**: Complete Create, Read, Update, Delete for all entities

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

## 🎯 Recent Updates & Improvements

### **UI/UX Enhancements**
- ✅ **Admin Panel Navigation**: Replaced emojis with professional SVG icons (folder, users, envelope, mailbox, refresh)
- ✅ **Gallery Section**: Complete redesign with 3-column card layout
  - White card backgrounds with padding
  - L-shaped colored borders (orange #F97316 and blue #2196F3)
  - Slight rotation transforms (-2°, 1°, -1°)
  - Enhanced shadows for depth
  - Gradient background (light blue to white)
- ✅ **Services Section**: Updated card titles to blue color (#2196F3)
- ✅ **About-Intro Section**: Redesigned with 3-image circular collage
  - Main center image: 300x300px
  - Top-right overlay: 180x180px
  - Bottom-right overlay: 180x180px
  - White borders, shadows, proper z-index layering
  - 4 decorative shape elements
- ✅ **Footer Newsletter**: Blue background (#2196F3) input with white border
- ✅ **Social Media Icons**: White circular backgrounds (40x40px) with blue icons
- ✅ **Happy Clients Section**: 
  - White background instead of dark
  - Auto-scroll carousel with pause on hover
  - Cards with shadows and borders for visibility
  - Images centered, text left-aligned
- ✅ **Projects Carousel**: Reordered images to specific sequence

### **Bug Fixes & Data Management**
- ✅ **Date Display**: Fixed date formatting in admin panel
  - Contacts: Using `submittedAt` field with proper `toLocaleString()` formatting
  - Subscribers: Using `subscribedAt` field with proper `toLocaleString()` formatting
  - Shows both date and time (e.g., "Jan 30, 2026, 02:45 PM")
- ✅ **Client Testimonials**: Fixed to merge default + admin-added clients
  - Previous behavior: Only showing newly added client (data loss)
  - Current behavior: Default 5 clients + any new clients added via admin
  - Improved image handling with `/uploads` path resolution and error fallback
- ✅ **Projects Carousel**: Fixed to merge default + admin-added projects
  - Previous behavior: Only showing newly added project (data loss)
  - Current behavior: Default 5 projects + any new projects added via admin
  - Improved image handling with error fallback to default image
- ✅ **Image URL Resolution**: Enhanced logic for handling both local assets and uploaded images
  - Detects `/uploads` paths and constructs full backend URL
  - Detects `/assets` paths and uses direct reference
  - HTTP URLs passed through unchanged
  - Error handler with fallback to default image

### **Code Quality**
- ✅ Consistent code structure across frontend and admin panel
- ✅ Proper error handling in image loading
- ✅ Database field consistency (date fields properly named)
- ✅ Component key handling for list renders

### **Testing Completed**
- ✅ All servers running (frontend 3000, admin 3001, backend 5000)
- ✅ Image uploads working properly
- ✅ Date display correct in admin panel
- ✅ Carousel navigation functional
- ✅ Form submissions working
- ✅ Data persistence across page reloads

## 🎯 Features Implemented (Complete List)

- [x] Landing Page with all sections
- [x] Hero section with contact form
- [x] About-Intro with 3-image collage and decorative shapes
- [x] Why Choose Us section with blue titles and icons
- [x] Gallery section with card layout and colored borders
- [x] Our Projects Carousel (default + admin-added, merged)
- [x] Happy Clients Carousel (default + admin-added, merged)
- [x] Contact Form with validation
- [x] Newsletter Subscription with blue styling
- [x] Footer with social links (white circular backgrounds)
- [x] Admin Panel - Project Management
- [x] Admin Panel - Client Management
- [x] Admin Panel - Contact Form Responses (proper date display)
- [x] Admin Panel - Subscriber List (proper date display)
- [x] Admin Panel - SVG icon navigation
- [x] Image Upload & Cropping (450x350, 400x400)
- [x] Image Error Fallback
- [x] Responsive Design (Desktop, Tablet, Mobile)
- [x] Carousel with smooth scrolling
- [x] Auto-scroll testimonials carousel
- [x] Data Merging (default + user-added content)
- [x] Proper Date Formatting

## 📄 License

This project is created for assessment purposes.
