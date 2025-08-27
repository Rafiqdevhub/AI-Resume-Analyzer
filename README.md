# AI-Powered Resume Analyzer

This web application provides intelligent, AI-driven feedback on resumes to help users enhance their job application materials. The app evaluates resumes based on ATS (Applicant Tracking System) compatibility, tone and style, content quality, structure, and relevant skills, delivering actionable advice and ratings.

## Key Features

- **Resume Management:** Upload, manage, and track multiple resumes with ease.
- **AI-Driven Feedback:** Receive in-depth feedback and scores for ATS, tone and style, content, structure, and skills.
- **Visualized Ratings:** View scores and recommendations in an intuitive, visually appealing format.
- **Secure Authentication:** Safe and secure user sign-in and management.
- **File Handling:** Store and manage resume files and associated images.
- **Data Management:** Option to wipe all user data and files from the system.

## Technology Stack

- **React Router:** for seamless navigation
- **Vite:** for rapid development and optimized builds
- **Tailwind CSS:** for modern and responsive styling
- **Custom AI Integration:** via the `puter` API
- **TypeScript:** for robust, type-safe code

## Getting Started

1. **Install Dependencies:**
   ```sh
   npm ci
   ```
2. **Run the Development Server:**
   ```sh
   npm run dev
   ```
3. **Create a Production Build:**
   ```sh
   npm run build
   ```
4. **Deploy with Docker:**
   Refer to the provided `Dockerfile` for multi-stage builds and production deployment.

## Project Layout

```
├── app/
│   ├── components/        # Reusable UI components (e.g., Accordion, ATS, Details)
│   ├── lib/               # Core libraries and utilities (e.g., puter, PdfToImage)
│   ├── routes/            # Page components for different routes (e.g., auth, home, resume)
│   ├── app.css            # Global stylesheets
│   └── ...
├── constants/             # Static data, configurations, and AI response formats
├── public/                # Publicly accessible assets (e.g., icons, images)
├── types/                 # TypeScript type definitions and interfaces
├── Dockerfile             # Configuration for Docker builds
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Configuration for Vite
└── README.md              # This documentation file
```
