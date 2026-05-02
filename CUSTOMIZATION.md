# 🎨 Customization Guide

Make this portfolio truly yours! This guide covers all customization options.

## Quick Start Customizations

### 1. Personal Information

**Hero Section** (`components/Hero.tsx`)
```tsx
// Line 48-52: Change your name and tagline
<h1>
  Hi, I'm{' '}
  <span className="gradient-text">
    Your Name  // ← Change this
  </span>
</h1>

// Line 59-62: Update your description
<p>
  Your custom tagline here.  // ← Change this
  Your second line here.     // ← And this
</p>
```

**GitHub Username** (`lib/github.ts`)
```typescript
// Line 5: Your GitHub username
const GITHUB_USERNAME = 'your-github-username';  // ← Change this

// Line 6: Your featured projects
const PRIORITY_REPOS = ['project1', 'project2', 'project3'];  // ← Change these
```

**Metadata** (`app/layout.tsx`)
```tsx
// Line 14-17: Update SEO
export const metadata: Metadata = {
  title: 'Your Name - Developer',           // ← Change
  description: 'Your custom description',    // ← Change
  keywords: ['your', 'keywords', 'here'],   // ← Change
}
```

---

## Design Customizations

### Color Scheme

**Update Primary Colors** (`tailwind.config.ts`)
```typescript
// Line 16-20: Main accent colors
colors: {
  accent: {
    blue: '#3b82f6',    // ← Change to your blue
    cyan: '#06b6d4',    // ← Change to your cyan
    purple: '#8b5cf6',  // ← Change to your purple
  },
}
```

**Pre-made Color Schemes**

Paste into `tailwind.config.ts` colors section:

```typescript
// Ocean Theme
accent: {
  blue: '#0ea5e9',
  cyan: '#06b6d4',
  purple: '#3b82f6',
}

// Sunset Theme
accent: {
  blue: '#f59e0b',
  cyan: '#ef4444',
  purple: '#ec4899',
}

// Forest Theme
accent: {
  blue: '#10b981',
  cyan: '#14b8a6',
  purple: '#059669',
}

// Neon Theme
accent: {
  blue: '#8b5cf6',
  cyan: '#ec4899',
  purple: '#a855f7',
}
```

### Typography

**Change Font** (`app/layout.tsx`)
```tsx
// Line 4: Import different Google Font
import { Poppins } from 'next/font/google'  // ← Change font

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],  // ← Specify weights
  variable: '--font-poppins',
})

// Apply in body
<body className={`${poppins.variable} font-sans`}>
```

**Popular Font Combinations**
- **Modern**: Inter + Space Grotesk
- **Classic**: Merriweather + Open Sans
- **Bold**: Archivo Black + Roboto
- **Elegant**: Playfair Display + Lato

---

## Content Customizations

### About Section

**Update Skills** (`components/About.tsx`)
```tsx
// Line 10-45: Modify skill cards
const skills = [
  {
    icon: YourIcon,           // ← Change icon
    title: 'Your Skill',      // ← Change title
    description: 'Details',   // ← Change description
    color: 'from-blue-500',   // ← Change gradient
  },
  // Add more skills...
];
```

**Update Philosophy** (`components/About.tsx`)
```tsx
// Line 139-143: Change your quote
<p className="text-lg text-white/80 italic">
  "Your personal philosophy or motto here"
</p>
```

### Contact Section

**Add More Contact Methods** (`components/Contact.tsx`)
```tsx
// Line 8: Import more icons
import { Github, Mail, Twitter, Linkedin } from 'lucide-react';

// Line 10-17: Add contact links
const contactLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/yourusername',
    description: 'Check out my code',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/yourusername',
    description: 'Follow my journey',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    description: 'Let\'s connect',
    color: 'from-blue-600 to-indigo-600',
  },
  // Add more...
];
```

---

## Project Customizations

### Auto-Banner Detection

Add banners to your GitHub repos:
1. Create `banner.png` or `banner.jpg`
2. Place in repository root
3. Portfolio auto-detects and displays it!

**Recommended Banner Size**: 1200x600px

### Custom Gradient Colors

**Modify Gradient Generator** (`lib/github.ts`)
```typescript
// Line 104-111: Change gradient options
const colors = [
  'from-blue-600 to-cyan-600',      // ← Your gradient 1
  'from-purple-600 to-pink-600',    // ← Your gradient 2
  'from-emerald-600 to-teal-600',   // ← Your gradient 3
  // Add more...
];
```

### Filter Projects

**Hide Specific Repos** (`lib/github.ts`)
```typescript
// After line 26, add filter:
.filter((repo) => !repo.fork && repo.name !== 'repo-to-hide')
```

---

## Animation Customizations

### Speed

**Global Animation Duration** (`tailwind.config.ts`)
```typescript
// Add to theme.extend:
transitionDuration: {
  'slow': '1000ms',
  'normal': '500ms',
  'fast': '200ms',
}

// Use in components:
className="transition-all duration-fast"
```

### Disable Animations

**Remove Framer Motion** (if you want static site):
```tsx
// Replace motion.div with div
// Replace AnimatePresence with Fragment
// Remove all animate, initial, transition props
```

---

## Advanced Customizations

### Add New Section

1. **Create Component** (`components/NewSection.tsx`)
```tsx
export default function NewSection() {
  return (
    <section id="newsection" className="min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-6">
          New <span className="gradient-text">Section</span>
        </h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

2. **Add to Page** (`app/page.tsx`)
```tsx
import NewSection from '@/components/NewSection';

// Add after other sections:
<NewSection />
```

3. **Add to Navigation** (`components/Navigation.tsx`)
```tsx
// Add to navItems array:
{ name: 'New Section', href: '#newsection' },
```

### Add Analytics

**Google Analytics**
1. Create `lib/gtag.ts`
2. Add tracking code
3. Import in `app/layout.tsx`

**Vercel Analytics** (easiest)
```bash
npm install @vercel/analytics
```

```tsx
// In app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

// Add before </body>
<Analytics />
```

### Dark/Light Mode Toggle

1. Install next-themes:
```bash
npm install next-themes
```

2. Add ThemeProvider in `app/layout.tsx`
3. Create toggle button component
4. Update color values with theme variants

---

## Tips & Best Practices

### Performance
- Keep images under 500KB
- Use WebP format for images
- Lazy load below-fold content
- Minimize animation complexity

### Design
- Maintain consistent spacing
- Use 2-3 accent colors max
- Test on real devices
- Keep text readable (contrast)

### Content
- Keep descriptions concise
- Update regularly
- Showcase best work first
- Use descriptive commit messages

---

## Need More Help?

- Check `README.md` for basics
- See `DEPLOYMENT.md` for deployment
- Open an issue on GitHub
- Consult Next.js/Tailwind docs

Happy customizing! 🎨
