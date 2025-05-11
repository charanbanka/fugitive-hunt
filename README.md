```markdown
# 🚔 Cop & Fugitive Game – React + Node.js App

A simple interactive game where three cops attempt to capture a fugitive hiding in one of five cities. Each cop chooses a city 
and an electric vehicle with enough range for a round trip. The backend randomly assigns the fugitive’s location and evaluates the result.

---

## 🧱 Tech Stack

- **Frontend:** React + TypeScript, Tailwind CSS, useContext
- **Backend:** Node.js + Express (in-memory data store)
- **Test Coverage:** Included for both frontend and backend logic
- **Deployment:** Frontend on Netlify, Backend on Render

---

## 📦 Folder Structure

```

├── frontend/     # React + TypeScript frontend
├── backend/      # Node.js + Express backend

````

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (>= 18)
- npm or yarn

---

## 🖥️ Running the App Locally

### Backend

```bash
cd backend
npm install
npm run dev     # Starts server at http://localhost:8080
````

### Frontend

```bash
cd frontend
npm install
npm run dev     # Starts client at http://localhost:5173 (Vite)
```

Make sure the frontend is configured to call the backend API (proxy or direct URL as needed).

---

## 🧪 Running Tests

### Backend Unit Tests

```bash
cd backend
npm test
npm test -- --coverage
```

### Frontend Unit Tests

```bash
cd frontend
npm test
npm test:coverage
```

---

## 🌍 Live Demo

* **Frontend:** [Netlify Deployment](https://your-netlify-url.netlify.app)
* **Backend:** [Render Deployment](https://your-render-url.onrender.com)

---

## 📋 Assumptions Made

* A vehicle must have **sufficient range for a round trip** (to and from the city).
* Cities selected by each cop must be **unique**.
* Only one cop can capture the fugitive.
* Data is stored in **in-memory arrays** (no database).
* Vehicle availability is limited and tracked during selection.
* A vehicle must have sufficient range for a round trip (to and from the selected city).
* Cities selected by each cop must be unique.
* Only one cop can capture the fugitive.
* Data is stored in in-memory arrays (no database).
* Vehicle availability is limited and tracked during selection.
* If a cop cannot proceed due to unavailable or unsuitable vehicles, they are skipped from the mission.
* Once all cops have either made selections or are skipped, the "Complete Mission" button triggers the result calculation
.

---

## ✅ Features

* 🎮 Simple multi-step game flow with sidebar navigation
* 📱 Fully responsive UI with Tailwind CSS animations
* 🚗 Vehicle selection logic based on round-trip feasibility
* 🎯 Random fugitive location logic
* 📊 Clean modular code with test coverage
* 🧠 useContext for global state

---

## 📁 Assets

You may use your own assets or sample images from [Unsplash](https://unsplash.com/) or other free sources.

---


