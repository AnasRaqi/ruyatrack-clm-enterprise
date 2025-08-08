# 🚀 RuyaTracker CLM - Deployment Guide

## Step-by-Step GitHub & Vercel Deployment

### 📋 Prerequisites
- GitHub account
- Vercel account (free)
- Git installed on your computer

### 🔄 Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit: https://github.com/AnasRaqi
   - Click "New" or "+" → "New repository"

2. **Repository Settings**
   - Repository name: `ruyatrack-clm-enterprise`
   - Description: `Enterprise Contract Lifecycle Management Platform`
   - Set to Public (for free Vercel deployment)
   - ✅ Add a README file
   - ✅ Add .gitignore (Node)
   - ✅ Choose a license (MIT recommended)

3. **Create Repository**
   - Click "Create repository"

### 📤 Step 2: Upload Project Files

#### Option A: Using Git Commands (Recommended)

```bash
# Clone your new repository
git clone https://github.com/AnasRaqi/ruyatrack-clm-enterprise.git
cd ruyatrack-clm-enterprise

# Copy all project files to this directory
# (Copy the contents from the deployment package)

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: RuyaTracker CLM Enterprise platform"

# Push to GitHub
git push origin main
```

#### Option B: Using GitHub Web Interface

1. **Upload Files**
   - Go to your repository on GitHub
   - Click "uploading an existing file"
   - Drag and drop all project files
   - Commit changes

### 🌐 Step 3: Deploy to Vercel

1. **Connect Vercel to GitHub**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Authorize Vercel to access your repositories

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `ruyatrack-clm-enterprise`
   - Click "Import"

3. **Configure Deployment**
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: npm install

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Get your live URL: `https://your-project-name.vercel.app`

### ⚙️ Step 4: Configure Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `clm.yourcompany.com`)

2. **Update DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (up to 24 hours)

### 🔄 Step 5: Enable Continuous Deployment

**Automatic Setup** (Already configured):
- ✅ Every push to `main` branch → Production deployment
- ✅ Every pull request → Preview deployment
- ✅ Automatic rollback capability

**Manual Triggers**:
```bash
# Deploy specific branch
git push origin feature-branch

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### 🧪 Step 6: Test Your Deployment

1. **Visit Your Application**
   - Open: `https://your-project-name.vercel.app`
   - Test login with any email/password
   - Navigate through all modules

2. **Test API Endpoints**
   ```bash
   # Health check
   curl https://your-project-name.vercel.app/api/health
   
   # Get contracts
   curl https://your-project-name.vercel.app/api/contracts
   
   # Get vendors
   curl https://your-project-name.vercel.app/api/vendors
   ```

3. **Verify Features**
   - ✅ Dashboard loads with KPI data
   - ✅ Contract management works
   - ✅ Vendor management functional
   - ✅ Workflow system operational
   - ✅ Analytics displaying data

### 🔧 Step 7: Environment Configuration

1. **Set Environment Variables** (if needed)
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add variables:
     ```
     NODE_ENV=production
     API_BASE_URL=https://your-project-name.vercel.app
     ```

2. **Update Configuration**
   - Modify `vercel.json` for custom settings
   - Update API endpoints if using external services

### 📊 Step 8: Monitor & Maintain

1. **Vercel Analytics**
   - Enable in Project Settings → Analytics
   - Monitor performance and usage

2. **GitHub Actions** (Optional)
   - Set up automated testing
   - Configure deployment notifications

3. **Regular Updates**
   ```bash
   # Make changes locally
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   # Automatic deployment triggered
   ```

## 🚨 Troubleshooting

### Common Issues

**1. Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure package.json is valid
- Check for syntax errors in API files
- Verify all dependencies are listed
```

**2. API Errors**
```bash
# Check function logs in Vercel dashboard
# Common fixes:
- Verify CORS headers are set
- Check API endpoint paths
- Ensure proper error handling
```

**3. Domain Issues**
```bash
# DNS propagation can take up to 24 hours
# Verify DNS settings:
dig your-domain.com
nslookup your-domain.com
```

### Performance Optimization

1. **Enable Caching**
   - Configure cache headers in `vercel.json`
   - Use Vercel Edge Network

2. **Optimize Assets**
   - Compress images
   - Minify CSS/JS (if not using CDN)

3. **Monitor Performance**
   - Use Vercel Analytics
   - Set up alerts for downtime

## 📞 Support

### Getting Help
- **Vercel Documentation**: https://vercel.com/docs
- **GitHub Issues**: Create issue in your repository
- **Community**: Vercel Discord, GitHub Discussions

### Best Practices
- ✅ Use semantic versioning for releases
- ✅ Write descriptive commit messages
- ✅ Test changes locally before pushing
- ✅ Monitor deployment logs regularly
- ✅ Keep dependencies updated

---

**🎉 Congratulations! Your RuyaTracker CLM is now live and ready for enterprise use!**

**Live URL**: `https://your-project-name.vercel.app`
**Repository**: `https://github.com/AnasRaqi/ruyatrack-clm-enterprise`

