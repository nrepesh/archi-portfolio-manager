# Architecture Portfolio Website

A beautiful, warm & natural themed portfolio website for architectural engineering projects with an easy-to-use CMS for non-technical editing.

## ✨ Features

- 🎨 **Warm & Natural Design** - Earth tones, cream, beige, and soft greens
- 📝 **Easy Content Management** - Edit projects without touching code via `/admin`
- 📄 **PDF Export** - One-click download of entire portfolio
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **Fast & Secure** - Static site hosted on Netlify
- 🆓 **100% Free** - No monthly costs

## 🎯 Color Palette

- Cream: `#FAF8F3`
- Beige: `#E8DCC4`
- Sage Green: `#8B9D83`
- Olive: `#6B7A5F`
- Terracotta: `#C67B5C`
- Charcoal: `#2C2420`

## 📁 Project Structure

```
portfolio-site/
├── index.html              # Main portfolio page
├── styles.css              # All styling (warm & natural theme)
├── script.js               # PDF generation & interactions
├── netlify.toml            # Netlify deployment config
├── admin/
│   ├── index.html          # CMS admin panel entry
│   └── config.yml          # CMS configuration
├── content/
│   ├── about.md            # About page content
│   ├── contact.md          # Contact information
│   ├── settings.md         # Site settings
│   └── projects/           # Project markdown files
└── images/
    └── uploads/            # Uploaded images from CMS
```

## 🚀 Setup Instructions

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New Repository"**
3. Name it: `architecture-portfolio`
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL the portfolio files
3. Write commit message: "Initial portfolio setup"
4. Click **"Commit changes"**

**Option B: Using Git Command Line**

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/architecture-portfolio.git
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access GitHub
5. Select your `architecture-portfolio` repository
6. Click **"Deploy site"**
7. Wait 1-2 minutes for deployment

**Your site is now live!** 🎉

You'll get a URL like: `https://random-name-12345.netlify.app`

### Step 4: Enable CMS Authentication

For your sister to edit content at `/admin`:

1. In Netlify, go to your site dashboard
2. Click **"Site settings"** → **"Identity"**
3. Click **"Enable Identity"**
4. Under **"Registration preferences"**, select **"Invite only"**
5. Go to **"Services"** → **"Git Gateway"** → Click **"Enable Git Gateway"**
6. Go to **"Identity"** tab in top menu
7. Click **"Invite users"**
8. Enter your sister's email
9. She'll receive an invitation email

### Step 5: Your Sister's First Login

1. She clicks the invitation link in her email
2. Sets her password
3. Goes to `your-site.netlify.app/admin`
4. Logs in with her email and new password
5. **That's it!** She can now add/edit projects

## 📝 How to Edit Content (For Your Sister)

### Adding a New Project

1. Go to `your-site.netlify.app/admin`
2. Click **"Projects"** → **"New Project"**
3. Fill in:
   - Project Title
   - Category (dropdown)
   - Year
   - Upload Image (drag & drop)
   - Description
4. Click **"Publish"** → **"Publish now"**
5. Wait 1-2 minutes for site to rebuild

**No coding required!** ✨

### Editing About Section

1. Go to `/admin`
2. Click **"Pages"** → **"About Page"**
3. Edit name, bio, skills
4. Click **"Publish"**

### Updating Contact Info

1. Go to `/admin`
2. Click **"Pages"** → **"Contact Information"**
3. Update email, phone, LinkedIn
4. Click **"Publish"**

## 📄 PDF Export

The **"Download Portfolio PDF"** button automatically generates a PDF including:
- All projects with images
- About section
- Skills
- Contact information

The PDF is generated on-the-fly from the website, so it's always up-to-date!

## 🎨 Customizing Colors

To change colors, edit `styles.css` lines 1-20:

```css
:root {
    --color-cream: #FAF8F3;
    --color-beige: #E8DCC4;
    --color-sage: #8B9D83;
    /* etc... */
}
```

## 🌐 Custom Domain (Optional)

To use a custom domain like `yourname.com`:

1. Buy domain from [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google)
2. In Netlify: **Site settings** → **Domain management**
3. Click **"Add custom domain"**
4. Follow instructions to update DNS

**Free SSL certificate included!** 🔒

## 🔄 Making Updates

### If You Need to Edit Code:

1. Make changes locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated design"
   git push
   ```
3. Netlify auto-deploys in 1-2 minutes

### If Your Sister Edits via CMS:

- Changes happen automatically through the CMS
- She just clicks "Publish"
- No Git knowledge needed

## 🆘 Troubleshooting

### CMS Login Not Working

- Make sure Git Gateway is enabled in Netlify
- Make sure Identity is enabled
- Check that your sister confirmed her email

### Images Not Showing

- Make sure image URLs are correct
- Check that images are uploaded via CMS
- Images should be in `/images/uploads/`

### PDF Generation Not Working

- Make sure html2pdf.js library is loading
- Check browser console for errors
- Try refreshing the page

### Site Not Updating After Changes

- Wait 2-3 minutes for Netlify to rebuild
- Check deployment status in Netlify dashboard
- Clear your browser cache

## 📚 Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Hosting**: Netlify (free tier)
- **PDF Export**: html2pdf.js
- **Fonts**: Cormorant Garamond + Work Sans (Google Fonts)

## 🎓 For Your Sister

**You can edit everything through the admin panel!**

- Add/remove/edit projects
- Update your bio
- Change contact info
- Upload new images

**No coding knowledge needed** - just fill in forms and click "Publish"!

## 📞 Support

If you need help:

1. Check Netlify docs: [docs.netlify.com](https://docs.netlify.com)
2. Check Decap CMS docs: [decapcms.org](https://decapcms.org)
3. GitHub Issues: Create an issue in your repo

## 📄 License

Free to use for personal portfolios!

---

Built with ❤️ for architectural engineers who want a beautiful, maintainable portfolio without the headaches.
