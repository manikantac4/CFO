# CFO Helper - Financial Simulation Web App

A comprehensive financial planning and simulation tool for startups, students, and small businesses. Built with React, Vite, and TailwindCSS.

## 🚀 Features

### Core Functionality
- **Financial Scenario Modeling**: Create and compare "what-if" scenarios
- **Real-time Calculations**: Live updates of burn rate, runway, and cash flow
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Export Capabilities**: Generate PDF and CSV reports
- **Multi-currency Support**: USD, EUR, GBP, INR, and more

### Key Pages
- **Landing Page**: Hero section with feature highlights and demo preview
- **Authentication**: Login/Signup with form validation and OAuth support
- **Onboarding**: 3-step wizard to set up initial financial model
- **Dashboard**: KPI overview with recent scenarios and quick actions
- **Simulation Studio**: Core feature with 3-column layout for inputs, results, and insights
- **Scenarios**: Grid view with compare mode for scenario analysis
- **Reports**: Generate and manage financial reports
- **Billing**: Credit management and subscription plans
- **Integrations**: Pathway integration and CSV upload
- **Admin Panel**: System monitoring and debug tools
- **Help Center**: Documentation and support resources

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling with dark/light mode support
- **Framer Motion** - Animations and transitions
- **React Router** - Client-side routing

### State Management
- **Zustand** - Lightweight state management for UI state
- **React Query** - Server state management and caching
- **React Hook Form** - Form handling and validation

### Charts & Visualization
- **Recharts** - Interactive charts and graphs
- **Lucide React** - Icon library

### Services & APIs
- **Axios** - HTTP client for API calls
- **Pathway Service** - Mock real-time data ingestion
- **Flexprice Service** - Mock payment processing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Core UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Tooltip.jsx
│   ├── inputs/             # Form input components
│   │   ├── SliderWithInput.jsx
│   │   ├── CurrencyInput.jsx
│   │   ├── PercentInput.jsx
│   │   └── Toggle.jsx
│   ├── charts/             # Chart components
│   │   ├── CashflowChart.jsx
│   │   ├── RunwayGauge.jsx
│   │   ├── PnLStack.jsx
│   │   └── ScenarioCompareChart.jsx
│   ├── scenario/           # Scenario-specific components
│   ├── billing/            # Billing components
│   └── onboarding/         # Onboarding components
├── pages/                  # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Onboarding.jsx
│   ├── Dashboard.jsx
│   ├── SimulationStudio.jsx
│   ├── Scenarios.jsx
│   ├── Reports.jsx
│   ├── Billing.jsx
│   ├── Integrations.jsx
│   ├── Admin.jsx
│   └── Help.jsx
├── hooks/                  # Custom React hooks
│   ├── useSimulation.js
│   ├── useScenarios.js
│   └── useBilling.js
├── services/               # API and external services
│   ├── api.js
│   ├── pathway.js
│   └── flexprice.js
├── state/                  # State management
│   └── uiStore.js
├── utils/                  # Utility functions
│   ├── currency.js
│   └── validators.js
└── App.jsx                 # Main app component
```

## 🎨 Design System

### Colors
- **Primary**: Pink to Purple gradient (`#ec4899` → `#a855f7`)
- **Background**: Slate colors with dark mode support
- **Status Colors**: Green (success), Yellow (warning), Red (error), Blue (info)

### Components
- **Buttons**: Primary, secondary, outline, ghost variants
- **Cards**: Hover effects, shadows, and rounded corners
- **Inputs**: Consistent styling with focus states
- **Charts**: Pastel colors with smooth animations

### Animations
- **Framer Motion**: Fade, slide, and scale transitions
- **Hover Effects**: Subtle scale and shadow changes
- **Loading States**: Skeleton loaders and spinners

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cfo-helper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_FLEXPRICE_API_KEY=your_api_key
REACT_APP_FLEXPRICE_URL=https://api.flexprice.com
```

### TailwindCSS
The project uses TailwindCSS with custom configuration in `tailwind.config.js`. Key features:
- Dark mode support
- Custom color palette
- Extended animations
- Form plugin for better form styling

## 📊 Demo Data

The application includes comprehensive mock data for:
- **Scenarios**: Multiple financial scenarios with different assumptions
- **Charts**: Sample cash flow, P&L, and runway data
- **Users**: Demo user accounts and billing information
- **Reports**: Generated report examples

### Demo Credentials
- **Email**: demo@cfohelper.com
- **Password**: demo123

## 🎯 Key Features in Detail

### Simulation Studio
The core feature with a 3-column layout:
- **Left Panel**: Input parameters with sliders and form controls
- **Middle Panel**: Real-time results with KPI cards and charts
- **Right Panel**: AI insights, billing widget, and live data feed

### Scenario Management
- Create, edit, and duplicate scenarios
- Compare up to 3 scenarios side-by-side
- Tag and categorize scenarios
- Search and filter functionality

### Financial Calculations
- **Burn Rate**: Monthly cash consumption
- **Runway**: Months of cash remaining
- **Cash Flow**: Revenue vs expenses tracking
- **Growth Modeling**: Compound growth calculations

### Export & Reporting
- PDF reports with charts and tables
- CSV data export for further analysis
- Customizable report templates
- Email sharing capabilities

## 🔌 Integrations

### Pathway Integration
- Real-time financial data ingestion
- Automatic cash flow updates
- Revenue and expense tracking
- Headcount monitoring

### CSV Upload
- Bulk data import
- Column mapping interface
- Data validation and cleaning
- Historical data integration

### Webhook Support
- Real-time notifications
- Custom endpoint configuration
- Event filtering
- Retry mechanisms

## 🎨 Customization

### Theming
The app supports both light and dark modes with automatic system preference detection. Customize colors in `tailwind.config.js`.

### Adding New Charts
Create new chart components in `src/components/charts/` following the existing pattern with Recharts.

### Extending State Management
Add new stores in `src/state/` using Zustand for local state or React Query for server state.

## 🧪 Testing

The application is built with testing in mind. Key areas to test:
- Form validation and submission
- Chart rendering and interactions
- State management and persistence
- Responsive design across devices
- Dark/light mode switching

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interactions
- Optimized chart sizing
- Adaptive layouts

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Recharts** for beautiful chart components
- **TailwindCSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for the comprehensive icon set
- **React Query** for excellent server state management

## 📞 Support

For support and questions:
- Email: support@cfohelper.com
- Documentation: Built-in help center
- Issues: GitHub issues page

---

Built with ❤️ for the startup community. Make financial planning accessible to everyone.