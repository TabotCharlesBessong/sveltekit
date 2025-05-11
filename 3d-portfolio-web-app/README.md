# 3D Portfolio Web App

A modern portfolio website built with SvelteKit, MongoDB, and Threlte for 3D animations.

## Features

- Interactive 3D animations in the hero section using Threlte
- Full CRUD operations for all portfolio sections
- Admin dashboard to manage content
- Responsive design with Tailwind CSS
- MongoDB database with Mongoose ODM
- Authentication for admin users
- Mobile-friendly interface

## Sections

- Hero section with 3D animation
- Projects showcase with filtering
- Work experience timeline
- Skills display with progress indicators
- Education history
- Social links in footer

## Technologies Used

- SvelteKit - Frontend framework
- TypeScript - Type safety
- MongoDB - Database
- Mongoose - Object Data Modeling
- Threlte - 3D animations with Three.js
- Tailwind CSS - Styling
- Swiper - Touch slider for mobile
- JWT - Authentication

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/3d-portfolio-web-app.git
cd 3d-portfolio-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on `src/env.example`:
```
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Authentication
JWT_SECRET=your_jwt_secret_key
ADMIN_REGISTRATION_KEY=your_admin_registration_key

# App settings
PUBLIC_SITE_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

5. Visit `http://localhost:5173` in your browser.

### Admin Setup

1. Visit `/admin/login` and click on "Register" to create an admin account.
2. Use the registration key specified in your `.env` file.
3. After registration, you'll be redirected to the admin dashboard where you can manage all your portfolio content.

## Project Structure

- `src/lib/db/models` - MongoDB models for all sections
- `src/lib/db/connection.ts` - Database connection setup
- `src/lib/auth` - Authentication utilities
- `src/lib/components/sections` - Main section components
- `src/lib/components/ui` - Reusable UI components
- `src/routes/api` - API endpoints for CRUD operations
- `src/routes/admin` - Admin dashboard pages

## Deployment

This app can be deployed to any platform that supports SvelteKit:

1. Build the application:
```bash
npm run build
```

2. Deploy the generated output according to your hosting platform's requirements.

## License

MIT
