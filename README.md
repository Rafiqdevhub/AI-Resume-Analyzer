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

# File Tree: JobPsych ai-resume-analayzer

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ pipline.yml
├── 📁 .react-router
│   └── 📁 types
│       ├── 📁 app
│       │   ├── 📁 +types
│       │   │   └── 📄 root.ts
│       │   └── 📁 routes
│       │       └── 📁 +types
│       │           ├── 📄 auth.ts
│       │           ├── 📄 home.ts
│       │           ├── 📄 resume.ts
│       │           ├── 📄 upload.ts
│       │           └── 📄 wipe.ts
│       ├── 📄 +future.ts
│       ├── 📄 +routes.ts
│       └── 📄 +server-build.d.ts
├── 📁 app
│   ├── 📁 components
│   │   ├── 📄 ATS.tsx
│   │   ├── 📄 Accordion.tsx
│   │   ├── 📄 Details.tsx
│   │   ├── 📄 FileUploader.tsx
│   │   ├── 📄 Navbar.tsx
│   │   ├── 📄 ResumeCard.tsx
│   │   ├── 📄 ScoreBadge.tsx
│   │   ├── 📄 ScoreCircle.tsx
│   │   ├── 📄 ScoreGuage.tsx
│   │   └── 📄 Summary.tsx
│   ├── 📁 lib
│   │   ├── 📄 PdfToImage.ts
│   │   ├── 📄 putter.ts
│   │   └── 📄 utils.ts
│   ├── 📁 routes
│   │   ├── 📄 auth.tsx
│   │   ├── 📄 home.tsx
│   │   ├── 📄 resume.tsx
│   │   ├── 📄 upload.tsx
│   │   └── 📄 wipe.tsx
│   ├── 🎨 app.css
│   ├── 📄 root.tsx
│   └── 📄 routes.ts
├── 📁 constants
│   └── 📄 index.ts
├── 📁 public
│   ├── 📁 icons
│   │   ├── 🖼️ ats-bad.svg
│   │   ├── 🖼️ ats-good.svg
│   │   ├── 🖼️ ats-warning.svg
│   │   ├── 🖼️ back.svg
│   │   ├── 🖼️ check.svg
│   │   ├── 🖼️ cross.svg
│   │   ├── 🖼️ info.svg
│   │   ├── 🖼️ pin.svg
│   │   └── 🖼️ warning.svg
│   ├── 📁 images
│   │   ├── 🖼️ bg-auth.svg
│   │   ├── 🖼️ bg-main.svg
│   │   ├── 🖼️ bg-small.svg
│   │   ├── 🖼️ pdf.png
│   │   ├── 🖼️ resume-scan-2.gif
│   │   ├── 🖼️ resume-scan.gif
│   │   ├── 🖼️ resume_01.png
│   │   ├── 🖼️ resume_02.png
│   │   └── 🖼️ resume_03.png
│   ├── 📄 favicon.ico
│   └── 📄 pdf.worker.min.mjs
├── 📁 types
│   ├── 📄 index.d.ts
│   └── 📄 putter.d.ts
├── ⚙️ .dockerignore
├── ⚙️ .gitignore
├── 🐳 Dockerfile
├── 📝 README.md
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 react-router.config.ts
├── ⚙️ tsconfig.json
└── 📄 vite.config.ts
```

---
