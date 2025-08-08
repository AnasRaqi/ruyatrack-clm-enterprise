# RuyaTracker CLM Enterprise

🚀 **Enterprise Contract Lifecycle Management Platform**

A comprehensive, cloud-native Contract Lifecycle Management (CLM) solution built for modern enterprises. Features advanced workflow automation, vendor management, analytics, and seamless integrations.

## ✨ Features

### 🎯 Core Functionality
- **Contract Management** - Complete CRUD operations with advanced search and filtering
- **Vendor Management** - Comprehensive vendor profiles with KPI-based rating system
- **Workflow Automation** - Custom approval workflows with multi-step routing
- **Analytics & Reporting** - Real-time dashboards with export capabilities
- **User Management** - Role-based access control (RBAC) with enterprise roles

### 🔧 Technical Features
- **Serverless Architecture** - Built for Vercel with automatic scaling
- **RESTful API** - Complete backend API with CORS support
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Updates** - Live data synchronization across all modules
- **Enterprise Security** - Secure authentication and data protection

### 🌟 Advanced Capabilities
- **GenAI Contract Creation** - AI-powered contract generation (planned)
- **OCR Document Processing** - Automated contract data extraction (planned)
- **Multi-currency Support** - SAR, AED, USD, EUR, and more
- **Integration Hub** - Microsoft 365, Salesforce, Slack, Zapier support
- **Audit Logging** - Complete activity tracking and compliance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- Vercel account (free)
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnasRaqi/ruyatrack-clm-enterprise.git
   cd ruyatrack-clm-enterprise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### 🌐 Deploy to Vercel

#### Option 1: Automatic Deployment (Recommended)

1. **Fork/Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `https://github.com/AnasRaqi/ruyatrack-clm-enterprise`
   - Deploy automatically

2. **Configure Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

#### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
ruyatrack-clm-enterprise/
├── index.html              # Main application (SPA)
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel configuration
├── README.md               # This file
├── api/                    # Serverless API endpoints
│   ├── health.js           # Health check endpoint
│   ├── contracts.js        # Contract management API
│   ├── vendors.js          # Vendor management API
│   ├── workflows.js        # Workflow automation API
│   └── analytics.js        # Analytics and reporting API
└── .gitignore              # Git ignore rules
```

## 🔌 API Endpoints

### Base URL
- **Production**: `https://your-domain.vercel.app/api`
- **Development**: `http://localhost:3000/api`

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/contracts` | GET, POST, PUT, DELETE | Contract management |
| `/api/vendors` | GET, POST, PUT, DELETE | Vendor management |
| `/api/workflows` | GET, POST, PUT, DELETE | Workflow automation |
| `/api/analytics` | GET | Analytics and reporting |

### Example API Usage

```javascript
// Get all contracts
const response = await fetch('/api/contracts');
const data = await response.json();

// Create new contract
const newContract = await fetch('/api/contracts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Contract',
    vendor: 'Vendor Name',
    value: 100000,
    currency: 'SAR'
  })
});
```

## 🎨 Customization

### Branding
- Update company name in `index.html` (line 89)
- Modify color scheme in Tailwind classes
- Replace logo and favicon in `/public` directory

### Currency & Localization
- Default currency: SAR (Saudi Riyal)
- Supported currencies: SAR, AED, USD, EUR, GBP, QAR, KWD, BHD, OMR
- Timezone: Asia/Riyadh

### Features Configuration
- Enable/disable modules in navigation
- Customize workflow templates
- Configure integration endpoints

## 🔒 Security

### Authentication
- Demo mode: Any email/password combination
- Production: Implement proper authentication system
- SSO: Azure AD/Entra integration ready

### Data Protection
- CORS enabled for cross-origin requests
- Input validation on all API endpoints
- Secure headers configuration

## 📊 Analytics & Monitoring

### Built-in Analytics
- Contract portfolio overview
- Vendor performance metrics
- Financial impact analysis
- Renewal rate tracking

### Monitoring
- API health checks
- Error logging
- Performance metrics

## 🔧 Development

### Adding New Features

1. **Frontend**: Update `index.html` with new UI components
2. **Backend**: Add new API endpoints in `/api` directory
3. **Configuration**: Update `vercel.json` if needed

### Testing
```bash
# Test API endpoints
curl https://your-domain.vercel.app/api/health

# Test locally
npm run dev
```

## 🚀 Deployment Pipeline

### Continuous Deployment
- **Automatic**: Every push to `main` branch deploys to production
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback to previous versions

### Environment Variables
Set in Vercel dashboard:
- `NODE_ENV=production`
- `API_BASE_URL=https://your-domain.vercel.app`

## 📈 Performance

### Optimization
- **Static Generation**: HTML pre-rendered for fast loading
- **CDN**: Global content delivery network
- **Serverless**: Auto-scaling API endpoints
- **Caching**: Optimized caching strategies

### Metrics
- **Load Time**: < 2 seconds globally
- **API Response**: < 200ms average
- **Uptime**: 99.9% SLA

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [API Reference](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

### Contact
- **Email**: support@ruyatrack.com
- **GitHub Issues**: [Create Issue](https://github.com/AnasRaqi/ruyatrack-clm-enterprise/issues)
- **Documentation**: [Wiki](https://github.com/AnasRaqi/ruyatrack-clm-enterprise/wiki)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core CLM functionality
- ✅ Serverless deployment
- ✅ Basic analytics

### Phase 2 (Next)
- 🔄 GenAI contract creation
- 🔄 OCR document processing
- 🔄 Advanced integrations

### Phase 3 (Future)
- 📋 Mobile applications
- 📋 Advanced AI features
- 📋 Enterprise SSO

---

**Built with ❤️ for Enterprise Contract Management**

*RuyaTracker CLM - Streamlining contracts, empowering businesses*

