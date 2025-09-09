# Angular E-Learning Platform

## Project Overview

A comprehensive E-Learning web application built with Angular, providing an online education platform with advanced features for course management, real-time communication, and user administration.

###  Key Features

-  Course Management: Create, edit, and manage educational courses
-  User Role System: Admin, Teacher, and Student role-based access control
-  Real-time Chat: WebSocket-powered instant messaging system
-  Multimedia Learning: Video upload, document sharing, and assignment management
-  Schedule Management: Comprehensive calendar and scheduling system
-  Payment Integration: Course purchase and payment processing
-  Responsive Design: Optimized for desktop, tablet, and mobile devices

##  Technology Stack

- **Frontend Framework**: Angular 15+
- **Styling**: Less CSS with custom component library
- **Real-time Communication**: WebSocket (RxStomp)
- **Authentication**: JWT Token-based security
- **File Management**: Advanced upload system for multimedia content
- **UI/UX**: Custom Angular components with modern design patterns

##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Angular CLI (latest version)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/LeHa2505/OnThiUI.git
cd OnThiUI
```

2. **Install dependencies**
```bash
npm install
```

3. **Install additional packages**
```bash
npm install --save --force tinymce @tinymce/tinymce-angular
npm install ngx-doc-viewer@1.4.1
```

4. **Start the development server**
```bash
ng serve
```

5. **Access the application**
Open your browser and navigate to: `http://localhost:4200`

##  Project Structure

```
src/
├── app/
│   ├── authentication/           # Authentication module
│   ├── pages/                   # Main application pages
│   │   ├── admin/              # Administrator dashboard
│   │   ├── teacher/            # Teacher management interface
│   │   └── user/               # Student learning interface
│   ├── service/                # Business logic services
│   ├── shared/                 # Reusable components
│   ├── models/                 # TypeScript data models
│   └── configs/                # Application configuration
├── assets/                     # Static resources
└── environments/               # Environment configurations
```

##  User Roles & Permissions

###  Administrator
- **User Management**: Full control over user accounts and permissions
- **Course Approval**: Review and approve teacher-submitted courses
- **System Oversight**: Monitor platform usage and manage requests
- **Content Moderation**: Ensure quality and compliance standards

###  Teacher/Instructor
- **Course Creation**: Design and publish educational content
- **Student Management**: Track progress and manage enrollments
- **Content Upload**: Add videos, documents, and assignments
- **Assessment Tools**: Create quizzes and evaluate submissions

###  Student/Learner
- **Course Enrollment**: Browse and join available courses
- **Learning Materials**: Access videos, documents, and resources
- **Interactive Features**: Participate in discussions and chat
- **Progress Tracking**: Monitor learning achievements and schedules

##  Core Features

###  Dashboard & Analytics
- Personalized user dashboards
- Progress tracking and reporting
- Performance analytics

###  Learning Management
- Interactive video player
- Document viewer integration
- Assignment submission system
- Real-time progress updates

###  Security & Authentication
- JWT-based authentication system
- Role-based route guards
- HTTP request interceptors
- Input validation and sanitization

##  Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Development Notes

This project demonstrates modern Angular development practices including:
- Modular architecture with lazy loading
- Reactive programming with RxJS
- Custom component library
- Real-time data synchronization
- Comprehensive error handling
