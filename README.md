# 🚀 Nergy.space - Personal Portfolio

<div align="center">

[![Deploy new Docker Image version](https://github.com/Nergy101/Portfolio/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Nergy101/Portfolio/actions/workflows/pipeline.yml)

</div>

<div align="center">

**A modern, responsive portfolio website built with Angular 20, featuring dynamic weather integration, technology showcase, and beautiful Material Design components.**

[🌐 Live Demo](https://portfolio.nergy.space) • [📖 Documentation](https://github.com/Nergy101/Portfolio)

</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**

- **Material Design 3** components with beautiful animations
- **Responsive design** that works on all devices
- **Dark/Light theme** support with dynamic switching
- **Smooth transitions** and micro-interactions
- **Accessibility-first** approach with ARIA labels

### 🌤️ **Dynamic Weather Integration**

- **Real-time weather data** for Utrecht, Netherlands
- **7-day forecast** with beautiful weather icons
- **Serverless API integration** using DigitalOcean Functions
- **Automatic updates** and error handling

### 🛠️ **Technology Showcase**

- **Interactive tech cards** with hover effects
- **Categorized technologies**: Professional, Hobby, Tools, Archive
- **Direct links** to technology documentation
- **Sortable views** (alphabetical/custom order)
- **Professional tech stack** including Azure, C#, Angular, Docker
- **Hobby projects** featuring Deno, Fresh, Vue, Preact

### 🚀 **Performance & DevOps**

- **Docker containerization** with multi-stage builds
- **Nginx reverse proxy** for optimal performance
- **CI/CD pipeline** with GitHub Actions
- **Code quality** with ESLint and Prettier
- **TypeScript** for type safety
- **Standalone components** for better tree-shaking

### 🎯 **Developer Experience**

- **Hot reload** during development
- **Comprehensive linting** and formatting rules
- **Modern Angular CLI** with latest features
- **FontAwesome icons** for consistent iconography

---

## 🛠️ Tech Stack

### **Frontend Framework**

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.5.0-pink?style=flat-square&logo=reactivex)

### **UI Components & Styling**

![Material Design](https://img.shields.io/badge/Material%20Design-20.0.1-blue?style=flat-square&logo=material-design)
![SCSS](https://img.shields.io/badge/SCSS-Styling-orange?style=flat-square&logo=sass)
![FontAwesome](https://img.shields.io/badge/FontAwesome-6.7.2-blue?style=flat-square&logo=font-awesome)

### **Backend & Database**

![REST API](https://img.shields.io/badge/REST%20API-Weather%20Data-orange?style=flat-square)

### **DevOps & Deployment**

![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=flat-square&logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-1.27-green?style=flat-square&logo=nginx)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-black?style=flat-square&logo=github-actions)

### **Development Tools**

![ESLint](https://img.shields.io/badge/ESLint-8.57.1-purple?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.6.0-pink?style=flat-square&logo=prettier)

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 22+
- npm or yarn
- Docker (optional)

### **Local Development**

```bash
# Clone the repository
git clone https://github.com/Nergy101/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:4200 in your browser
```

### **Docker Deployment**

```bash
# Build the Docker image
docker build -t portfolio:latest .

# Run the container
docker run -p 4200:80 portfolio:latest

# Or use docker-compose
docker-compose up -d
```

### **Available Scripts**

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm start`      | Start development server   |
| `npm run build`  | Build for production       |
| `npm run test`   | Run unit tests             |
| `npm run lint`   | Run ESLint                 |
| `npm run format` | Format code with Prettier  |
| `npm run check`  | Run format and lint checks |

---

## 📁 Project Structure

```
Portfolio/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 components/
│   │   │   ├── 📁 dialogs/          # Modal dialogs
│   │   │   ├── 📁 footer/           # Footer component
│   │   │   ├── 📁 header/           # Header component
│   │   │   ├── 📁 landing/          # Main landing page
│   │   │   ├── 📁 menu/             # Navigation menu
│   │   │   ├── 📁 tech-card/        # Technology cards
│   │   │   └── 📁 weather-card/     # Weather widget
│   │   └── 📁 services/             # Angular services
│   ├── 📁 assets/
│   │   ├── 📁 techs/                # Technology icons
│   │   ├── 📁 weather-icons/        # Weather icons
│   │   └── 📁 prebuilt-themes/      # Theme files
│   └── 📁 environments/             # Environment configs
├── 📁 config/                       # Nginx configuration
├── 🐳 Dockerfile                    # Multi-stage Docker build
├── 🐳 docker-compose.yml           # Docker Compose setup
└── 📄 package.json                  # Dependencies and scripts
```

---

## 🌟 Key Features in Detail

### **Weather Integration**

- Fetches real-time weather data from DigitalOcean Functions
- Displays 7-day forecast with custom weather icons
- Automatic error handling and loading states
- Configurable city parameter (currently set to Utrecht)

### **Technology Showcase**

- **Professional Techs**: Azure, C#, TypeScript, Angular, Docker, Git
- **Hobby Techs**: Deno, Fresh, Vue, Preact, Python, GraphQL
- **Tools**: VS Code, Cursor, GitHub Copilot, Prettier
- **Archive**: Previously used technologies for reference

### **Component Architecture**

- **Standalone Components**: Modern Angular 20 architecture
- **Signal-based State**: Reactive state management
- **Material Design**: Consistent UI components
- **Responsive Design**: Mobile-first approach

---

## 🌐 Internationalization (i18n)

This project uses Tolgee for internationalization management. The configuration is set up to pull translations from a Tolgee instance and store them locally.

### Tolgee Configuration

The project uses a `.tolgeerc` configuration file to manage translations:

```json
{
  "apiKey": "<add-key-here>",
  "apiUrl": "<add-url-here>>",
  "pull": {
    "path": "./src/assets/translations",
    "format": "JSON_ICU",
    "delimiter": ""
  },
  "patterns": ["src/**/*.ts", "src/**/*.html"]
}
```

### Translation Management

- **Translation Files**: Stored in `src/assets/translations/`
- **Supported Languages**: English (US/GB), Dutch (NL), German (DE)
- **Format**: JSON with ICU message format support
- **Patterns**: Scans TypeScript and HTML files for translation keys

### Adding New Translations

1. Add translation keys to your components using the `| translate` pipe
2. Run Tolgee CLI to pull latest translations:
   ```bash
   npx @tolgee/cli pull
   ```
3. The translations will be automatically updated in `src/assets/translations/`

### Development Workflow

- Translation keys are automatically detected in your code
- Use the `| translate` pipe in templates: `{{ 'key.name' | translate }}`
- The custom `TranslatePipe` handles translation resolution
- Language switching is managed through the `TranslationsService`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **Material Design** for beautiful UI components
- **FontAwesome** for the icon library
- **DigitalOcean** for serverless functions
- **OpenWeatherMap** for weather data inspiration

---

<div align="center">

**Made with ❤️ by [Nergy](https://github.com/Nergy101)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nergy101)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-Website-blue?style=for-the-badge)](https://nergy.space)

</div>
