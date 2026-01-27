# STAR Tools

**Shelter, Transport, and Response Staff Resources**  
Built for A Safe Haven STAR Program

## 🎯 Overview

A collection of web-based tools to help STAR program staff with common tasks:

- **📋 Dispatch Scripts** - Quick reference scripts for common call scenarios (Shelter, Transport, Well-being checks, Crisis)
- **📝 DAP Note Helper** - Generate properly formatted DAP notes *(Coming Soon)*
- **🗣️ Spanish Phrases** - Common phrases for client communication *(Coming Soon)*
- **❓ Intake Questionnaire** - Step-by-step intake process guide *(Coming Soon)*

## 🌐 Live Site

**URL:** https://mgarcera-ash.github.io/star/

## 🛠️ Technology Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting

## 📦 Local Development

### Prerequisites
- Node.js 18+ installed
- Git installed

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mgarcera-ash/star.git
cd star
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🚀 Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

### Automatic Deployment

Every push to the `main` branch automatically:
1. Builds the project
2. Deploys to GitHub Pages
3. Updates the live site

### Manual Deployment

If needed, you can manually trigger deployment:
1. Go to the "Actions" tab in GitHub
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

### First-Time Setup

**⚠️ IMPORTANT:** You need to enable GitHub Pages for this repository:

1. Go to your repository on GitHub: https://github.com/mgarcera-ash/star
2. Click **Settings**
3. Scroll down to **Pages** (in the left sidebar under "Code and automation")
4. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
5. Click **Save**

That's it! After the first push to main, your site will be available at:
**https://mgarcera-ash.github.io/star/**

## 📝 Making Updates

### Quick Content Updates (via GitHub Web)

For simple text changes (like updating dispatch scripts):
1. Navigate to the file on GitHub
2. Click the pencil ✏️ icon to edit
3. Make your changes
4. Commit directly to main
5. Site auto-deploys in ~2 minutes

### Larger Updates (via Codespaces or Local)

For adding new tools or features:
1. Use GitHub Codespaces (browser-based VSCode) OR
2. Clone locally and work from home
3. Make changes
4. Push to main
5. Site auto-deploys

## 🎨 Customization

### Colors

ASH brand colors are defined in `tailwind.config.js`:
- Navy: `#05205B`
- Teal: `#3AAFA9`
- Accent: `#2B4F73`

### Fonts

- **Body:** Inter (clean, modern)
- **Headings:** Space Grotesk (geometric, friendly)

## 📂 Project Structure

```
star/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment config
├── src/
│   ├── components/
│   │   ├── Home.jsx           # Landing page
│   │   ├── DispatchScripts.jsx
│   │   ├── DAPHelper.jsx
│   │   ├── SpanishPhrases.jsx
│   │   └── IntakeQuestionnaire.jsx
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── index.html
├── package.json
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md
```

## 🤝 Contributing

To add a new tool:

1. Create a new component in `src/components/YourTool.jsx`
2. Add it to the `tools` array in `Home.jsx`
3. Add the route in `App.jsx`
4. Update the switch statement in `App.jsx`
5. Test locally
6. Push to main

## 📧 Contact

Built by Mason Garcera for A Safe Haven STAR Program

## 📄 License

Internal use only - A Safe Haven Foundation
