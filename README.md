# ⚡ Zolix CRM

<div align="center">
  <img src="./Zolix-Logo.png" alt="Zolix Logo" width="80" height="80" />
  <br/>
  <h3>Simplify Operations. Automate Growth.</h3>
  <p>A highly advanced, production-ready SaaS Customer Relationship Management platform built for modern teams.</p>
  <p>
    <a href="https://zolixautomation.netlify.app/" target="_blank"><strong>View Live Demo ↗</strong></a>
  </p>
</div>

---

## 📖 Overview

**Zolix CRM** is a full-stack SaaS application that enables revenue teams to track leads, automate repetitive tasks, and manage their pipeline with zero friction. Built with an uncompromising focus on UI/UX, Zolix delivers a premium, dark-mode-first glassmorphism interface backed by a secure, multi-tenant Express/MongoDB architecture.

## ✨ Key Features

- **Intelligent Lead Management:** Organize and track leads using intuitive data tables. Built-in capabilities to bulk import/export leads via CSV.
- **Workflow Automation Engine:** Put your busywork on autopilot. Set up custom triggers (e.g., "When Lead Status changes to Won") and actions (e.g., "Send Congratulations Email").
- **Role-Based Access Control (RBAC):** Bank-grade security with distinct roles (`owner`, `admin`, `manager`) governing access to billing, team management, and automation settings.
- **Advanced Premium UI:** A beautifully crafted, responsive dashboard built with Tailwind CSS, featuring subtle mesh gradients, glassmorphism panels, and highly polished micro-animations.
- **Secure Invitation System:** Seamlessly scale your workspace by sending tokenized, secure email invites to new team members.
- **Full Workspace Isolation:** Multi-tenant database architecture ensures absolute data privacy across different workspaces.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 18 (Vite)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS & Lucide React Icons
- **State Management:** React Context API & Custom Hooks
- **Deployment:** Netlify

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Deployment:** Render

---

## 🚀 Getting Started

To run Zolix CRM locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas Cluster)

### 1. Clone the repository
```bash
git clone https://github.com/Dax2806/Zolix.git
cd Zolix
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `/frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
Zolix/
├── backend/                  # Express.js Server
│   ├── config/               # Database and Env configurations
│   ├── src/                  
│   │   ├── middleware/       # Auth guards, Error handling
│   │   ├── modules/          # Domain-driven modules (auth, leads, automations)
│   │   │   ├── auth/         # Controllers, Routes, Services
│   │   │   ├── leads/        
│   │   │   ├── automations/  
│   │   │   └── users/        
│   │   └── server.js         # Entry point
│   └── package.json
│
└── frontend/                 # React Client
    ├── public/               # Static assets
    ├── src/                  
    │   ├── components/       # Global reusable UI components
    │   ├── features/         # Feature-based architecture (Leads, Team, Billing)
    │   ├── hooks/            # Custom React hooks (useAuth, useLeads)
    │   ├── layouts/          # Dashboard and App layouts
    │   ├── pages/            # Core routing pages (Auth, Profile, Landing)
    │   ├── services/         # Axios API interceptors and fetching logic
    │   └── utils/            # Helper functions
    └── package.json
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Dax2806/Zolix/issues).

## 📄 License
This project is licensed under the MIT License.

---
<div align="center">
  <i>Designed and developed by <a href="https://github.com/Dax2806">Daksh Patadia</a></i>
</div>
