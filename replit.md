# DC Unovation Website

## Overview

DC Unovation is a professional landing website for a web development and digital services agency. The application is a single-page React website with 12 scrollable sections showcasing services, portfolio, testimonials, pricing, and contact forms. It features dual-write form automation that saves submissions to both a PostgreSQL database and forwards them to n8n webhooks for workflow automation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing (single-page app with a 404 fallback)
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables for theming
- **UI Components**: Shadcn UI component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for smooth section transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **State Management**: TanStack Query for server state and API calls

### Backend Architecture
- **Server**: Express.js running on Node.js
- **API Pattern**: REST endpoints under `/api/forms/*` for form submissions
- **Validation**: Zod schemas shared between frontend and backend via `@shared` path alias
- **Database ORM**: Drizzle ORM with type-safe schema definitions

### Data Storage
- **Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: 
  - `service_inquiries` - Service/demo request forms
  - `newsletter_subscriptions` - Email signups
  - `contact_submissions` - General contact forms
- **Migrations**: Managed via Drizzle Kit with `npm run db:push`

### Form Submission Flow
Forms implement a dual-write pattern:
1. Data is validated using Zod schemas
2. Record is inserted into PostgreSQL database
3. Data is forwarded to n8n webhook for automation workflows
4. Success/error response returned to client

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # UI components and section components
    hooks/        # Custom React hooks
    lib/          # Utilities, API client, query client
    pages/        # Page components (Home, 404)
server/           # Express backend
  db.ts           # Database connection
  routes.ts       # API route handlers
  storage.ts      # Database operations layer
  n8nClient.ts    # Webhook forwarding utility
shared/           # Shared code between frontend/backend
  schema.ts       # Drizzle schema and Zod types
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database, connection via `DATABASE_URL` environment variable

### Automation
- **n8n Webhooks**: Form data forwarded to n8n instance at `N8N_BASE_URL` environment variable (defaults to `http://localhost:5678/webhook`)
- Webhook endpoints: `service_inquiry_form`, `context_form_submission`, `newsletter_footer`

### Third-Party Services
- **Google Fonts**: Inter and Space Grotesk font families loaded via CDN
- **Optional Google Login**: User authentication for form autofill (client-side only)

### Key NPM Packages
- `@neondatabase/serverless` - PostgreSQL driver
- `drizzle-orm` / `drizzle-kit` - Database ORM and migrations
- `@tanstack/react-query` - Data fetching
- `framer-motion` - Animations
- `react-hook-form` / `@hookform/resolvers` - Form management
- `zod` / `drizzle-zod` - Runtime validation
- Radix UI primitives - Accessible UI components