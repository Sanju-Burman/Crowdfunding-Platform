# Crowdfunding-Platform

## Introduction

Develop a crowdfunding platform where users can create and manage campaigns, track donations in real-time, and engage with supporters through interactive features like live comments and updates.

## Project Type
Fullstack

## Deployed App
- Frontend: [Frontend Link](https://deployed-site.whatever)
- Backend: [Backend Link](https://deployed-site.whatever)
- Database: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

## Directory Structure
```
my-app/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ server.js
├─ frontend/
│  ├─ src/
│     ├─ components/
│     ├─ pages/
│     ├─ App.js
│     ├─ index.js
```

## Video Walkthrough of the Project
[Project Walkthrough Video](#)

## Video Walkthrough of the Codebase
[Codebase Walkthrough Video](#)

## Features
- Secure Authentication with JWT
- Campaign Creation Wizard with modular steps
- Media Upload to Cloudinary
- Milestone Tracking System
- Campaign Preview before Submission
- Donation Management System

## Design Decisions & Assumptions
- The media upload logic ensures files are uploaded only when the form is submitted to reduce bandwidth usage.
- Cloudinary is used for media storage due to its efficient CDN capabilities.
- The app follows a modular structure for improved scalability and maintainability.

## Installation & Getting Started
Follow these steps to set up the project:

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Usage
1. **Sign Up** as a new user.
2. **Log In** with your credentials.
3. Navigate to the **Campaign Wizard** to create a new campaign.
4. Upload media files, set milestones, and preview your campaign.
5. Submit your campaign to publish it on the platform.

## Credentials
For testing purposes, use the following credentials:
- **Admin Account**
  - Email: `admin@example.com`
  - Password: `admin123`
- **User Account**
  - Email: `user@example.com`
  - Password: `user123`

## APIs Used
- **Cloudinary** for media storage
- **MongoDB Atlas** for database management
- **Express.js** for backend routes and logic

## API Endpoints
| Method | Endpoint             | Description                          |
|---------|---------------------|--------------------------------------|
| `POST`  | `/user/login`        | Login to access the platform         |
| `POST`  | `/user/signup`       | Register a new user                  |
| `POST`  | `/campaign`          | Create a new campaign                |
| `GET`   | `/campaigns`         | Retrieve all campaigns               |
| `PUT`   | `/campaign/:id`      | Update campaign details              |
| `DELETE`| `/campaign/:id`      | Delete a campaign                    |

## Technology Stack
- **Frontend:** React.js with Axios
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Cloudinary** for media storage
- **JWT** for secure authentication
- **Bcrypt.js** for password hashing

