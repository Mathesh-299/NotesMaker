# 📝 NoteCraft


**NoteCraft** is a modern, user-friendly note-taking web application that lets you organize your ideas, tasks, and important information efficiently. It supports note creation, editing, deletion, pinning, archiving, searching, filtering, and secure authentication.

---

## ✨ Features

### 🛡️ User Authentication
- Register and login securely using JWT.  
- Forgot password flow with image verification.  

### 🗒️ Notes Management
- Create, edit, and delete notes.  
- Add **tags** and **images** to notes.  
- Pin and unpin important notes.  
- Archive and unarchive notes for better organization.  
- Search and filter notes by title, content, or tags.  

### 🎨 User Experience
- Fully **responsive design** for mobile and desktop.  
- Interactive UI with **Tailwind CSS**.  
- Dynamic **Navbar** reflecting user login state.  
- Highlighting and sorting of pinned notes.  
- Image upload support for notes and profile verification.

### 🏗️ Admin & Turf Booking Integration (Optional/Future)
- Admins can add/manage turfs with details like name, location, price, slots, and images.  
- Edit and delete functionality for turfs with image upload.

---

## 🛠️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React, Tailwind CSS, React Router |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB                           |
| Authentication | JWT (JSON Web Token)              |
| Notifications  | React Toastify                    |

---

## 📁 Project Structure


/client # React frontend
/components # Reusable components (Navbar, NoteCard, Forms)
/pages # Application pages (Home, Notes, Create)
/API # API calls
/server # Node.js + Express backend
/models # Mongoose schemas (Notes, Users)
/routes # API routes
/controllers # Route controllers



---

## 🔗 API Endpoints

### Authentication
- `POST /auth/signup` – Register a new user  
- `POST /auth/login` – User login  

### Notes
- `GET /notes/:userId` – Get all notes for a user  
- `POST /notes/:userId` – Create a new note  
- `PUT /notes/:noteId` – Edit a note  
- `DELETE /notes/:noteId` – Delete a note  
- `PATCH /notes/pin/:noteId` – Toggle pin status  
- `PATCH /notes/archive/:noteId` – Toggle archive status  



---

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone [<repo-url>](https://github.com/Mathesh-299/NotesMaker.git)


2.Install dependencies:

cd server && npm install
cd ../client && npm install


Start the backend server:

cd server && npm start


Start the frontend:

cd client && npm start