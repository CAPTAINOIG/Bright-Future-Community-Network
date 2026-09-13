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

### Local Build
```bash
npm run build
npm run preview
```

### Netlify Deployment

This project is configured for Netlify deployment with the following settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

The `netlify.toml` file includes:
- Build configuration
- SPA routing redirects
- Security headers
- Cache optimization

### Manual Netlify Setup

If not using the netlify.toml file, configure in Netlify dashboard:

1. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   
2. **Environment variables**:
   - NODE_VERSION: `18`

## 🌟 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── admin/          # Admin-specific components
├── pages/              # Page components
│   ├── Admin/          # Admin dashboard components
│   └── [PageName]/     # Individual page folders
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🔧 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Framer Motion** - Animation library
- **Sonner** - Toast notifications
- **Headless UI** - Unstyled UI components
- **Heroicons** - Icon library
- **Lucide React** - Additional icons

## 📱 Features

### Public Website
- Home page with hero section
- About and leadership pages
- Programs and projects showcase
- Events and news sections
- Gallery and community features
- Contact form with validation

### Admin Dashboard
- Member management
- Volunteer coordination
- Project tracking
- Event management
- Content management (news, gallery)
- Community ideas management
- Contact message handling
- Reports and analytics
- Website settings

## 🎨 Design System

The application uses a consistent design system with:
- Primary color: Forest Green (#2e7d32)
- Accent color: Gold (#D4A017)
- Typography: Inter (body) + Playfair Display (headings)
- Responsive breakpoints
- Consistent spacing and sizing
- Accessibility considerations

## 🔐 Authentication

The admin section includes:
- Protected routes
- Login/logout functionality
- Session management
- Role-based access (ready for implementation)

## 📝 Development Notes

- The project uses ES modules
- All components are functional components with hooks
- Forms use React Hook Form for validation
- State management ready for Zustand implementation
- API integration ready with React Query
- Mobile-first responsive design
- Semantic HTML for accessibility

## 🚀 Deployment URLs

- **Production**: [Your Netlify URL]
- **Preview**: Available via Netlify deploy previews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Bright Future Community Network organization.