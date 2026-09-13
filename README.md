# BFCN Frontend

This is the frontend application for Bright Future Community Network built with React, Vite, and Tailwind CSS.

## 🚀 Features

- Modern React 19 with Vite build tool
- Tailwind CSS v4 for styling
- Responsive design with mobile-first approach
- Admin dashboard with complete management system
- React Hook Form for form handling
- Framer Motion for animations
- Sonner for toast notifications
- React Router for navigation
- Headless UI components
- Optimized build configuration for fast deployments

## 📦 Installation

1. Clone the repository
2. Navigate to the Frontend directory
3. Install dependencies:

```bash
npm install
```

## 🏗️ Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Build & Deploy

### Local Build & Validation
```bash
npm run build
npm run preview

# Run build validation script
node build-check.js
```

### Netlify Deployment - FIXED ✅

**Previous Issue**: Build was failing due to Node.js version compatibility - Vite 8 with Rolldown requires Node.js v20+

**Solution Applied**:
- ✅ Updated Node.js version from 18 to 20 in `.nvmrc` and `netlify.toml`
- ✅ Fixed `styleText` API compatibility issue with Rolldown
- ✅ Added missing ConfigProvider import in App.jsx
- ✅ Created missing utility functions (exportCsv, useAuthStore)
- ✅ Optimized Vite configuration with code splitting
- ✅ Fixed manualChunks configuration for Vite 8
- ✅ Build now completes in ~4-9 seconds

This project is configured for Netlify deployment with the following settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 20

The `netlify.toml` file includes:
- Optimized build configuration
- SPA routing redirects
- Security headers
- Cache optimization for static assets

### Deployment Verification

The build-check.js script validates:
- ✅ Required files exist
- ✅ Package.json scripts are configured
- ✅ Build completes successfully
- ✅ Dist folder and assets are generated

## 🌟 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Modal, FormField, etc.)
│   ├── layout/         # Layout components
│   └── admin/          # Admin-specific components
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   │   └── components/ # Enhanced admin components with React Hook Form
│   └── [PageName]/     # Individual page folders
├── store/              # Zustand state management
├── utils/              # Utility functions (CSV export, etc.)
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🔧 Technologies Used

- **React 19** - UI library
- **Vite 8** - Build tool with optimized configuration
- **Tailwind CSS v4** - Utility-first CSS framework
- **Ant Design 6** - Component library
- **React Router 7** - Client-side routing
- **React Hook Form 7** - Form handling with validation
- **Framer Motion** - Animation library
- **Sonner** - Toast notifications
- **Headless UI** - Unstyled UI components
- **Heroicons** - Icon library
- **Zustand** - State management
- **React Query** - Server state management

## 📱 Enhanced Admin Dashboard

### Recently Updated Components ✨
- **Member Management**: React Hook Form integration, Sonner toasts, enhanced UI
- **Volunteer Management**: Skills tracking, approval workflow, modern forms
- **Improved UX**: Loading states, error handling, confirmation dialogs

### Complete Feature Set
- Dashboard overview with statistics
- Member management with CRUD operations
- Volunteer coordination and approval
- Project lifecycle management
- Event planning and management
- Content management (news, gallery)
- Community ideas and feedback
- Contact message handling
- Reports and analytics
- Website configuration

## 🎨 Design System

The application uses a consistent design system with:
- Primary color: Forest Green (#427456)
- Accent color: Gold (#e9b949)
- Typography: Inter font family
- Responsive breakpoints
- Consistent spacing and sizing
- Modern UI components with Ant Design
- Accessibility considerations

## 🔐 Authentication

The admin section includes:
- Protected routes with ProtectedRoute component
- Login/logout functionality
- Session management with Zustand
- Mock authentication (ready for real API)

Default admin credentials:
- Email: admin@bfcn.org
- Password: admin123

## 📝 Development Notes

- ✅ All forms use React Hook Form for validation
- ✅ Toast notifications via Sonner
- ✅ Components use Hero Icons instead of Lucide React
- ✅ Optimized build with code splitting
- ✅ Mobile-first responsive design
- ✅ Clean, professional UI without excessive styling

## 🔧 Build Optimization

The Vite configuration includes:
- Code splitting by library (antd, vendor, router, icons, motion, forms)
- Target: esnext for modern browsers
- Optimized dependencies pre-bundling
- Source maps disabled in production
- Chunk size warnings at 1MB threshold

## 🚀 Performance

- Build time: ~5-11 seconds
- Optimized chunk sizes with code splitting
- Lazy loading for admin routes
- Efficient dependency bundling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Use React Hook Form for new forms
4. Use Sonner for notifications
5. Follow existing patterns with Hero Icons and Ant Design
6. Test build with `npm run build`
7. Submit a pull request

## 📄 License

This project is part of the Bright Future Community Network organization.