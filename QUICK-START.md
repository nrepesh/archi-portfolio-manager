# 🚀 QUICK START GUIDE

Get your sister's portfolio live in 15 minutes!

## ⚡ 5 Simple Steps

### 1️⃣ Create GitHub Repository (2 minutes)

1. Go to [github.com](https://github.com)
2. Sign in or create account
3. Click green **"New"** button
4. Repository name: `architecture-portfolio`
5. Make it **Public**
6. Click **"Create repository"**

### 2️⃣ Upload Files (3 minutes)

**Easiest Method:**

1. On your new repo page, click **"uploading an existing file"** link
2. Open the `portfolio-site` folder you downloaded
3. Select ALL files and folders
4. Drag them into GitHub
5. Scroll down, click **"Commit changes"**

### 3️⃣ Deploy to Netlify (5 minutes)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (it's free!)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **"GitHub"**
5. Authorize Netlify
6. Choose your `architecture-portfolio` repo
7. Click **"Deploy site"**
8. ⏳ Wait 1-2 minutes

**✅ Your site is LIVE!**

Copy your site URL (looks like: `https://something-random-123.netlify.app`)

### 4️⃣ Enable Editing for Your Sister (3 minutes)

1. In Netlify, click **"Site settings"**
2. Click **"Identity"** in sidebar
3. Click **"Enable Identity"**
4. Scroll to **"Registration"** → Select **"Invite only"**
5. Scroll to **"Services"** → Click **"Enable Git Gateway"**
6. Click **"Identity"** tab (top menu)
7. Click **"Invite users"**
8. Enter her email
9. Click **"Send"**

### 5️⃣ Have Your Sister Log In (2 minutes)

Send her:
1. The site URL: `your-site.netlify.app/admin`
2. Tell her to check email for invitation
3. She clicks link, sets password
4. She logs into `/admin`
5. **Done!** She can now edit

## 📝 What She'll See

When she goes to `your-site.netlify.app/admin`:

- **Projects** tab - Add/edit projects
- **Pages** tab - Edit About, Contact, Settings
- Simple forms - No code!
- Upload images by dragging
- Click "Publish" when done

## ✨ Customization Tips

### Change Her Name:

1. She goes to `/admin`
2. Click **"Pages"** → **"About Page"**
3. Edit "Your Name" field
4. Click **"Publish"**

### Update Colors (You do this):

Edit `styles.css` file, lines 6-14:

```css
--color-cream: #FAF8F3;    /* Main background */
--color-sage: #8B9D83;      /* Buttons & accents */
--color-terracotta: #C67B5C; /* Secondary accent */
```

### Add Custom Domain:

In Netlify:
1. **Domain management** → **"Add custom domain"**
2. Enter domain (buy from Namecheap/Google Domains)
3. Update DNS as instructed
4. Free SSL included!

## 🔧 Testing Locally (Optional)

Want to preview changes before pushing?

1. Open `index.html` in browser
2. Make edits
3. Refresh to see changes
4. When happy, push to GitHub

## 🆘 Common Issues

**CMS won't let her log in?**
- Check Netlify Identity is enabled
- Check Git Gateway is enabled
- Make sure she confirmed email

**Changes not showing?**
- Wait 2 minutes for Netlify to rebuild
- Check "Deploys" tab in Netlify
- Clear browser cache (Ctrl+F5)

**PDF button not working?**
- Check browser console for errors
- Make sure internet connection is active (loads external library)

## 📞 Need Help?

1. Read the full `README.md`
2. Check [Netlify docs](https://docs.netlify.com)
3. Check [Decap CMS docs](https://decapcms.org/docs)

---

## 🎉 That's It!

Your sister now has:
- ✅ Professional portfolio website
- ✅ Easy content editing
- ✅ PDF export button
- ✅ Free hosting forever
- ✅ Custom domain support
- ✅ No coding required for her

**Time to celebrate!** 🎊
