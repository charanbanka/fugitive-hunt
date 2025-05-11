
# 🚔 Cop & Fugitive Game

A thrilling game where three cops hunt a fugitive hiding in one of five cities. Each cop selects a unique city and an electric vehicle with enough range for a round trip. The backend randomly assigns the fugitive's location and determines the outcome.

---

## 🌟 Features

- 🎮 Interactive multi-step game flow with "Previous" and "Next" navigation buttons
- 📱 Fully responsive UI with sleek Tailwind CSS animations
- 🚗 Smart vehicle selection ensuring round-trip feasibility
- 🎯 Randomized fugitive location for unpredictable gameplay
- 🧠 Global state management with React `useContext`
- 📊 Modular, testable code with comprehensive test coverage
- 🌍 Deployed on Netlify (frontend) and Render (backend)

---

## 🧱 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Context API
- **Backend:** Node.js, Express (in-memory data store)
- **Testing:** Jest for unit tests with coverage reports
- **Deployment:**
  - Frontend: Netlify
  - Backend: Render

---

## 📦 Project Structure

```
├── frontend/      # React + TypeScript frontend
├── backend/       # Node.js + Express backend
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🖥️ Local Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/charanbanka/fugitive-hunt
cd fugitive-hunt
```

#### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

- The backend server runs at `http://localhost:8080`.

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

- The frontend runs at `http://localhost:5173` (powered by Vite).
- Ensure the frontend is configured to communicate with the backend API (via proxy or direct URL).

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
npm test -- --coverage
```

### Frontend Tests

```bash
cd frontend
npm test
npm test:coverage
```

---

## 🌍 Live Demo

- **Frontend:** https://resplendent-mooncake-7ae373.netlify.app
- **Backend:** https://fugitive-hunt-lg0k.onrender.com/health

---

## Backend Routes
1. Cities - https://fugitive-hunt-lg0k.onrender.com/api/cities
2. Officers - https://fugitive-hunt-lg0k.onrender.com/api/officers
3. Vehicles - https://fugitive-hunt-lg0k.onrender.com/api/vehicles
4. Crimials - https://fugitive-hunt-lg0k.onrender.com/api/criminals
5. Fetch File - https://fugitive-hunt-lg0k.onrender.com/api/file/officer1
6. Check Criminal / result - https://fugitive-hunt-lg0k.onrender.com/api/check-criminal

---

## 📋 Game Rules & Assumptions

- **Vehicle Range:** Each vehicle must have enough range for a round trip to the selected city.
- **Unique Cities:** Each cop must choose a distinct city.
- **Single Capture:** Only one cop can capture the fugitive.
- **In-Memory Storage:** Game data is stored in arrays (no database).
- **Vehicle Availability:** Limited vehicle pool; availability is tracked during selection.
- **Mission Skip:** Cops with no suitable or available vehicles are skipped.
- **Mission Completion:** The "Complete Mission" button triggers the result calculation after all cops have made selections or been skipped.

---

## 🛠️ Development Notes

- **Navigation Update:** Replaced sidebar navigation with "Previous" and "Next" buttons for a more streamlined user experience, as seen in the city-selection page.
- The frontend uses `useContext` for efficient state management across components.
- Tailwind CSS ensures a responsive and modern UI with minimal effort.
- Backend logic is lightweight, using Express with in-memory data for simplicity.
- Tests cover critical game logic, ensuring reliability.

---

## 📁 Assets

- Screenshots of the home and city-selection pages are included above.
- Additional images can be sourced from [Unsplash](https://unsplash.com/) or other free stock photo platforms.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---


Let me know if you need further adjustments or assistance with hosting the screenshots
