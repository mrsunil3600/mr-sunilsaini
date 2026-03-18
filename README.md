# ✨ Senior Engineer Portfolio

> A stunning, modern portfolio frontend with immersive 3D animations and smooth interactions. Powered by cutting-edge web technologies.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## 🎯 Features

- ⚡ **Lightning Fast** - Next.js 14 with App Router for optimal performance
- 🎨 **Modern Design** - Beautiful, responsive UI with Tailwind CSS
- 🌟 **3D Animations** - Immersive hero and avatar scenes with Three.js
- ✨ **Smooth Transitions** - Elegant animations with Framer Motion
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎯 **Type Safe** - Full TypeScript support for reliability
- 🔄 **Dynamic Content** - Configurable via API endpoints or local data
- 🐳 **Docker Ready** - Easy deployment with included Dockerfile
- ♿ **Accessible** - Built with accessibility best practices

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd playground

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes are reflected instantly!

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library & component framework |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Three.js** | 3D graphics library |
| **React Three Fiber** | React renderer for Three.js |
| **Framer Motion** | Declarative animations |
| **Drei** | Useful helpers for Three.js |

---

## 📦 Docker Deployment

### Build Image
```bash
docker build -t mr-sunil-portfolio .
```

### Run Container
```bash
docker run --rm -p 4000:3000 mr-sunil-portfolio
```

Visit [http://localhost:4000](http://localhost:4000) to see your portfolio!

---

## ⚙️ Environment Configuration

This portfolio supports **dynamic content loading** from remote APIs. Configuration is optional - if disabled, realistic fallback data is used.

### Setup `.env.local`

```bash
# Enable/disable remote content
NEXT_PUBLIC_ENABLE_REMOTE_CONTENT=false

# Base API URL (if enabled)
NEXT_PUBLIC_API_BASE_URL=https://api.example.dev

# Individual endpoints
NEXT_PUBLIC_PROFILE_API_URL=https://api.example.dev/portfolio/profile
NEXT_PUBLIC_ABOUT_API_URL=https://api.example.dev/portfolio/about
NEXT_PUBLIC_SKILLS_API_URL=https://api.example.dev/portfolio/skills
NEXT_PUBLIC_EXPERIENCE_API_URL=https://api.example.dev/portfolio/experience
NEXT_PUBLIC_PROJECTS_API_URL=https://api.example.dev/portfolio/projects
NEXT_PUBLIC_TECH_STACK_API_URL=https://api.example.dev/portfolio/tech-stack
NEXT_PUBLIC_ACHIEVEMENTS_API_URL=https://api.example.dev/portfolio/achievements
NEXT_PUBLIC_SOCIALS_API_URL=https://api.example.dev/portfolio/socials
```

When `NEXT_PUBLIC_ENABLE_REMOTE_CONTENT=false`, the UI uses realistic local placeholder data from `src/data/fallback-content.ts`.

---

## 📑 Sections

The portfolio includes the following beautifully crafted sections:

| Section | Features |
|---------|----------|
| **🎭 Hero** | 3D animated environment with intro text |
| **👤 About** | Personal bio with 3D avatar |
| **🛠️ Skills** | Animated progress indicators |
| **💼 Experience** | Timeline layout of work history |
| **🎯 Projects** | Interactive project showcase cards |
| **⚙️ Tech Stack** | Technologies & tools proficiency |
| **🏆 Achievements** | Certifications & awards |
| **📧 Contact** | Email & social media links |

---

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── layout/          # Header, footer, navigation
│   ├── sections/        # Portfolio sections
│   ├── three/           # 3D scene components
│   ├── motion/          # Animation components
│   └── ui/              # Reusable UI components
├── config/              # Configuration files
├── data/                # Fallback content data
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # TypeScript definitions
```

---

## 🎨 Customization

### Modify Theme
Edit `tailwind.config.ts` to customize colors, fonts, and spacing.

### Update Content
Modify `src/data/fallback-content.ts` for local development or connect your API.

### Add Sections
Create new components in `src/components/sections/` following the existing pattern.

---

## 📊 Performance

- ⚡ **Optimized Images** - Next.js Image component
- 🚀 **Code Splitting** - Automatic route-based code splitting
- 📦 **Bundle Size** - Minimal dependencies
- 🎯 **Core Web Vitals** - LCP, FID, CLS optimized

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

<div align="center">

**Made with ❤️ by Sunil Saini**

[GitHub](https://github.com) • [Portfolio](https://portfolio.example.com) • [LinkedIn](https://linkedin.com)

</div>