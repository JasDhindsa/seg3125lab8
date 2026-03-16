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

## Deployment Instructions for Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
3. Click "Add New..." and select "Project".
4. Import your GitHub repository for this project.
5. In the "Configure Project" step:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy". Vercel will build and host your website, providing you with a live URL.

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
- **Member 1 (UI/UX Designer)**: Designed the Figma prototype (Lab 7) and focused on styling and accessibility in React.
- **Member 2 (Frontend Developer)**: Implemented the React components (`components/ui`), page layouts, and React Router navigation.
- **Member 3 (Interaction Logic)**: Managed form states, user data passing, and implemented the "Communicating" and "Analyzing Results" interaction processes.
- **All Members (Database Architect)**: Prepared the initial static mock data and structured the Database Design document for Lab 9.
*(Note: Please update the above names and roles as appropriate for your group)*