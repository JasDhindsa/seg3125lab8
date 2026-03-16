# TutorConnect
A university Human-Computer Interaction lab project (Lab 8 & Lab 9 Prep). 
This application is a functional React website designed to demonstrate human interaction processes.

## Human Interaction Processes Demonstrated
1. **Exploring**: Users can browse tutors on the *Search Tutors* page (`/search`), viewing different subjects and profiles.
2. **Planning**: Users can select a specific tutor and plan a session by opening their profile and navigating to the *Book Session* page (`/book/:tutorId`).
3. **Communicating**: Users input their details, session topic, and meeting preferences via forms on the *Book Session* page. 
4. **Analyzing Results**: Once booked, the system provides feedback via the *Booking Confirmation* page (`/confirmation/:bookingId`) and shows a summary of the booking on the *Student Dashboard* (`/dashboard`).

## How to Run the Project
1. Open a terminal in the project directory.
2. Install dependencies by running:
   ```bash
   npm install
   ```
3. Start the development server by running:
   ```bash
   npm start
   ```
   *(Note: `npm start` is configured to run `vite` via `npm run dev` in the package.json)*
4. Open the provided `localhost` link (default is usually `http://localhost:5173`) in your browser.

## GitHub Folder Structure
```
TutorConnect/
├── public/                 # Static assets
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── README.md               # Project instructions
├── DATABASE_DESIGN.md      # Database ERD and Schema
└── src/
    ├── main.tsx            # React application entry point
    ├── app/
    │   ├── App.tsx         # Main App component with routing
    │   ├── routes.tsx      # React Router configuration
    │   ├── components/     # Reusable UI components (buttons, cards, forms)
    │   ├── pages/          # Page components (Home, Search, Book, Dashboard)
    │   └── data/           # Mock data and generic utility methods
    └── styles/             # Global CSS and Tailwind configs
```

## Group Member Contributions
- We all worked on the project together, equally.

Made by Team 18