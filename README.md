# 🏎️ Devin's Portfolio - Motorsport Edition

A modern, high-performance portfolio website built with Next.js, featuring motorsport-inspired design, 3D effects, and smooth animations.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, React 18, TypeScript
- **Stunning Animations**: Framer Motion for smooth, professional transitions
- **3D Effects**: Three.js particle system and interactive backgrounds
- **Motorsport Theme**: Racing-inspired design with cyan, purple, and red accents
- **Fully Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Fast loading times and smooth interactions
- **Easter Egg**: Click the logo to see a drifting car animation! 🏎️

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with navbar and scroll progress
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and custom utilities
├── components/
│   ├── Navbar.tsx          # Animated navigation bar
│   ├── ScrollProgress.tsx  # Racing-style scroll indicator
│   ├── Hero.tsx            # Hero section with CTA
│   ├── ParticleBackground.tsx  # Three.js particle system
│   ├── About.tsx           # About section
│   ├── Projects.tsx        # Projects showcase
│   ├── Skills.tsx          # Skills with progress bars
│   ├── Contact.tsx         # Contact form
│   └── DriftingCar.tsx     # Easter egg animation
├── public/                 # Static assets
└── package.json
```

## 🎨 Customization

### Colors
Edit the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  'racing-cyan': '#00f5ff',
  'racing-red': '#ff0040',
  'racing-purple': '#b026ff',
}
```

### Content
Update personal information in the component files:
- **Hero.tsx**: Name, role, tagline
- **About.tsx**: Background, experience
- **Projects.tsx**: Project details
- **Skills.tsx**: Skills and proficiency levels
- **Contact.tsx**: Contact information

## 🎯 Features Breakdown

### Hero Section
- Animated particle background with Three.js
- Gradient text effects
- Smooth entrance animations
- Social media links

### About Section
- Animated racing circuit SVG
- Highlight cards with icons
- Parallax effects

### Projects Section
- Project cards with hover effects
- Tech stack badges
- GitHub and demo links

### Skills Section
- Animated progress bars
- Categorized skills
- Icon representations

### Contact Section
- Functional contact form
- Smooth validation animations
- Contact information cards

## 🏁 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Optimized images and assets
- Code splitting and lazy loading

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Devin**
- Platform Developer @ PwC Switzerland
- Training at ZLI Zürich
- Motorsport Enthusiast & Sim Racer

---

Built with ❤️ and Next.js
