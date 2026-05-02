# ⚡ Quick Start Guide

Get your portfolio running in under 5 minutes!

## Prerequisites

Make sure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- A **GitHub account**

Check your versions:
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 8.x or higher
```

---

## 🚀 Get Started

### Step 1: Setup Project

```bash
# Navigate to the portfolio folder
cd portfolio

# Install dependencies (this may take 2-3 minutes)
npm install
```

### Step 2: Customize

Before running, update these files:

1. **`lib/github.ts`** - Line 5
   ```typescript
   const GITHUB_USERNAME = 'ash-kernel';  // ← Change to YOUR GitHub username
   ```

2. **`components/Hero.tsx`** - Line 50
   ```tsx
   <span className="gradient-text">Ash</span>  // ← Change to YOUR name
   ```

3. **`components/Contact.tsx`** - Line 12
   ```tsx
   href: 'https://github.com/ash-kernel'  // ← Change to YOUR GitHub URL
   ```

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

You should see your portfolio with:
- ✅ Hero section with your name
- ✅ Projects from your GitHub
- ✅ About section
- ✅ Contact section

---

## 🎨 Make It Yours

### Change Colors (Optional)

Edit `tailwind.config.ts` (lines 16-20):
```typescript
accent: {
  blue: '#3b82f6',    // Your blue color
  cyan: '#06b6d4',    // Your cyan color
  purple: '#8b5cf6',  // Your purple color
}
```

### Add Project Banners (Optional)

In your GitHub repos, add:
- `banner.png` (1200x600px recommended)
- Place in repository root
- Portfolio will auto-detect it!

---

## 📤 Deploy to Vercel

Once you're happy with your portfolio:

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: My portfolio"
git branch -M main
```

Create a new repo on GitHub, then:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"

**Done!** Your portfolio is live in ~2 minutes! 🎉

Vercel will give you a URL like: `your-portfolio.vercel.app`

---

## ❓ Common Questions

**Q: My GitHub projects aren't showing**
- Check your GitHub username in `lib/github.ts`
- Make sure your repos are public
- Wait a few seconds after the page loads

**Q: I want to feature specific projects**
- Edit `lib/github.ts` line 6
- Add your repo names to `PRIORITY_REPOS`

**Q: How do I change the font?**
- See `CUSTOMIZATION.md` → Typography section

**Q: Can I add more sections?**
- Yes! See `CUSTOMIZATION.md` → Add New Section

**Q: How do I enable the command palette?**
- It's already enabled! Press `Ctrl+K` (or `Cmd+K` on Mac)

---

## 📚 Next Steps

1. **Customize Further**: Check `CUSTOMIZATION.md`
2. **Deploy**: Read `DEPLOYMENT.md`
3. **Add Content**: Update your GitHub repos
4. **Share**: Show the world your work!

---

## 🆘 Need Help?

- **Full Guide**: See `README.md`
- **Customization**: See `CUSTOMIZATION.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Issues**: Open a GitHub issue

---

## ✅ Checklist

Before deploying:
- [ ] Updated GitHub username
- [ ] Changed name in Hero
- [ ] Updated contact links
- [ ] Tested locally (npm run dev)
- [ ] Checked mobile view
- [ ] Added project banners (optional)
- [ ] Customized colors (optional)

**Ready to deploy!** 🚀

---

**Time to Complete**: 5-10 minutes  
**Difficulty**: Beginner-friendly  
**Result**: A stunning, professional portfolio!

Good luck! 🌟
