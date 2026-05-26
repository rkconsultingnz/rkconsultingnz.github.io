# RK Consulting Website

Modern website for [RK Consulting](https://www.rkconsulting.co.nz) — Data, Analytics & AI Specialists.

## 🚀 Deploying to GitHub Pages (Free Hosting)

### Step 1: Create a GitHub Account
If you don't have one, sign up at [github.com](https://github.com).

### Step 2: Create a New Repository
1. Click the **+** icon → **New repository**
2. Name it: `rkconsulting` (or any name you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3: Upload the Files
**Option A — GitHub Web Interface (easiest):**
1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL the files and folders from this ZIP:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder (add your logo.png here)
   - `pages/` folder
3. Click **Commit changes**

**Option B — Git command line:**
```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rkconsulting.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Select branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait ~2 minutes, then visit: `https://YOUR_USERNAME.github.io/rkconsulting/`

### Step 5: Add Your Logo
- Place your `logo.png` file in the `images/` folder
- The site references it at `images/logo.png`

### Step 6: Custom Domain (Optional — keep rkconsulting.co.nz)
1. In your repo, create a file called `CNAME` (no extension)
2. Put your domain in it: `www.rkconsulting.co.nz`
3. In your domain registrar (where you bought the domain), add a CNAME DNS record:
   - Name: `www`
   - Value: `YOUR_USERNAME.github.io`
4. GitHub Pages will auto-issue an SSL certificate

---

## 📂 File Structure
```
rkconsulting/
├── index.html          ← Homepage
├── css/
│   └── style.css       ← All styles
├── js/
│   └── shared.js       ← Nav + footer injection
├── images/
│   └── logo.png        ← Your logo (add this!)
└── pages/
    ├── airtable.html
    ├── power-bi.html
    ├── looker-studio.html
    ├── spreadsheets.html
    ├── ai-consulting.html
    ├── ai-automation.html
    └── contact.html
```

## 📧 Contact Form
The contact form is currently set up for demo purposes. To make it actually send emails, use one of these free services:

- **Formspree** (easiest): [formspree.io](https://formspree.io) — replace the button onclick with a form action
- **Netlify Forms**: If you switch hosting to Netlify (also free)
- **EmailJS**: JavaScript-based email sending

## 🎨 Brand Colours
- Navy: `#1B3A4B`
- Orange: `#F0A500`
- White: `#FFFFFF`
