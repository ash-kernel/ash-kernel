# 🚀 Ash - Premium Developer Portfolio

A modern, high-performance developer portfolio built with Next.js, TailwindCSS, and Framer Motion. Features dynamic GitHub integration, glassmorphism design, and smooth 60fps animations.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Core Features
- **🎨 Premium Design**: Dark, sleek SaaS-level UI with glassmorphism effects
- **📱 Fully Responsive**: Perfect on mobile, tablet, and desktop
- **⚡ Performance Optimized**: 60fps smooth animations, lazy loading, optimized bundles
- **🔄 Dynamic GitHub Integration**: Automatically fetches and displays repositories
- **🎯 Featured Projects**: Highlights priority repos (gettree, spicedeck, Zetonic, exitping)
- **🖼️ Smart Banners**: Auto-detects banner.png/jpg from repos or generates gradients

### Interactive Elements
- **🎭 Smooth Animations**: Powered by Framer Motion
- **💫 Magnetic Buttons**: Interactive hover effects
- **🔍 Command Palette**: Quick navigation with Ctrl/Cmd+K
- **🎪 Project Details**: Beautiful modal view for each project
- **🌊 Parallax Effects**: Subtle depth on scroll
- **✨ Glassmorphism**: Modern frosted glass effects throughout

### Sections
1. **Hero** - Eye-catching introduction with animated gradient background
2. **Projects** - Dynamic GitHub repository showcase with filtering
3. **About** - Skills grid with animated cards
4. **Contact** - Clean contact section with social links

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your portfolio is live 🎉

### Manual Build

```bash
npm run build
npm run start
```

## 🎨 Customization

### Update Personal Info

**1. Hero Section** (`components/Hero.tsx`)
```tsx
// Change name and tagline
<h1>Hi, I'm <span className="gradient-text">Your Name</span></h1>
<p>Your custom tagline here</p>
```

**2. GitHub Username** (`lib/github.ts`)
```typescript
const GITHUB_USERNAME = 'your-github-username';
const PRIORITY_REPOS = ['repo1', 'repo2', 'repo3'];
```

**3. Contact Links** (`components/Contact.tsx`)
```tsx
// Add more contact methods
const contactLinks = [
  { icon: Github, label: 'GitHub', href: 'your-github-url' },
  { icon: Twitter, label: 'Twitter', href: 'your-twitter-url' },
  // Add more...
];
```

### Change Color Scheme

Update `tailwind.config.ts`:
```typescript
colors: {
  accent: {
    blue: '#your-color',
    cyan: '#your-color',
    purple: '#your-color',
  },
}
```

### Add Project Banners

In your GitHub repositories, add an image file:
- `banner.png` or
- `banner.jpg` or
- `banner.jpeg`

The portfolio will automatically detect and display it!

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── About.tsx            # About section
│   ├── CommandPalette.tsx   # Ctrl+K command menu
│   ├── Contact.tsx          # Contact section
│   ├── Hero.tsx             # Hero section
│   ├── Navigation.tsx       # Navigation bar
│   ├── ProjectCard.tsx      # Project card component
│   ├── ProjectDetail.tsx    # Project modal
│   └── Projects.tsx         # Projects section
├── lib/
│   └── github.ts            # GitHub API utilities
├── types/
│   └── index.ts             # TypeScript types
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript config
└── next.config.js           # Next.js config
```

## 🎯 Features Breakdown

### GitHub Integration
- Fetches repositories from GitHub API
- Caches data for performance (1 hour)
- Filters out forked repos
- Auto-detects banner images
- Generates consistent gradients as fallback
- Prioritizes featured projects
- Displays stats (stars, language, last updated)

### Performance
- Image optimization with Next.js Image
- Lazy loading for projects
- Cached API calls
- Minimal bundle size
- CSS-only animations where possible
- Optimized Framer Motion usage

### Accessibility
- Semantic HTML
- Keyboard navigation (Command Palette)
- ARIA labels
- Focus states
- Screen reader friendly

## 🐛 Troubleshooting

**GitHub API Rate Limiting**
- GitHub API allows 60 requests/hour without authentication
- Data is cached for 1 hour to minimize requests
- For higher limits, add GitHub token (see GitHub API docs)

**Images Not Loading**
- Ensure banner images are in the repo root
- Check image file names (banner.png/jpg/jpeg)
- Verify images are accessible via raw.githubusercontent.com

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

##  Show Your Support

If you like this project, give it a ⭐ on GitHub!

---

**Built by Ash** | [GitHub](https://github.com/ash-kernel)

test