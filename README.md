# AI Resume Analyzer

AI Resume Analyzer is a web application that provides smart, AI-powered feedback on resumes to help users improve their chances of landing their dream job. The app analyzes resumes for ATS (Applicant Tracking System) compatibility, tone & style, content, structure, and skills, offering actionable suggestions and ratings.

## Features

- **Resume Upload & Management:** Users can upload, view, and track multiple resumes.
- **AI-Powered Feedback:** Get detailed feedback and scores for ATS, tone & style, content, structure, and skills.
- **Visual Ratings:** See scores and suggestions in a visually engaging format.
- **Authentication:** Secure sign-in and user management.
- **File Storage:** Store and manage resume files and images.
- **Data Wipe:** Option to clear all user data and files.

## Tech Stack

- **React Router** for navigation
- **Vite** for fast development and build
- **Tailwind CSS** for styling
- **Custom AI Integration** via `puter` API
- **TypeScript** for type safety

## Usage

1. **Install dependencies:**
   ```sh
   npm ci
   ```
2. **Start development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Run in Docker:**
   See the provided `Dockerfile` for multi-stage builds and production setup.

## Project Structure

```
├── app/
│   ├── components/        # UI components (Accordion, ATS, Details, etc.)
│   ├── lib/               # Utility libraries (putter, PdfToImage, utils)
│   ├── routes/            # Route components (auth, home, resume, upload, wipe)
│   ├── app.css            # Main styles
│   └── ...
├── constants/             # Static data and AI response formats
├── public/                # Static assets (icons, images)
├── types/                 # TypeScript type definitions
├── Dockerfile             # Docker setup
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```
