# DC Unovation Website

> Dream. Create. Innovate.

A professional, responsive landing website for DC Unovation built with React, TypeScript, Tailwind CSS, and featuring dual-write form automation to both PostgreSQL database and n8n webhooks.

## Features

- ✨ **Single-Page Design**: 12 beautiful, scrollable sections showcasing services, portfolio, testimonials, and more
- 🎨 **Modern UI**: Electric blue and violet branding with smooth animations using Framer Motion
- 📝 **Smart Forms**: All forms support dual-write to Neon PostgreSQL database AND n8n webhooks for automation
- 🔐 **Optional Google Login**: Users can browse freely; logging in autofills forms with user info
- 📱 **Fully Responsive**: Mobile-first design that looks stunning on all devices
- 🚀 **High Performance**: Optimized for speed and SEO
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels and semantic HTML

## Tech Stack

### Frontend
- **Vite** - Lightning-fast build tool
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn UI** - Beautiful, accessible components
- **React Hook Form** - Form management
- **TanStack Query** - Server state management

### Backend
- **Express.js** - Web server
- **PostgreSQL (Neon)** - Database for analytics
- **Drizzle ORM** - Type-safe database queries
- **Zod** - Runtime validation
- **n8n Integration** - Workflow automation

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (automatically configured on Replit)
- n8n instance (optional for local testing)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` and configure:
   ```bash
   # Database (automatically set by Replit)
   DATABASE_URL=your_database_url

   # n8n Webhook Configuration
   N8N_BASE_URL=http://localhost:5678/webhook

   # Session Secret (automatically set by Replit)
   SESSION_SECRET=your_secret
   ```

3. **Push database schema**:
   ```bash
   npm run db:push
   ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

The application will be available at the URL provided by Replit.

## Form Submissions & n8n Webhooks

All forms automatically save to PostgreSQL and forward to n8n webhooks for automation and notifications.

### Webhook Endpoints

| Form Type | Database Table | n8n Webhook Path | Trigger |
|-----------|---------------|------------------|---------|
| Lead Tracking | `lead_tracking` | `/webhook/lead_cta_tracking` | CTA clicks |
| Service Inquiry | `service_inquiries` | `/webhook/service_inquiry_form` | Book Demo / Get Quote |
| Project Interest | `project_interests` | `/webhook/project_interest_tracking` | Portfolio "Similar Project" |
| Feedback | `feedback_submissions` | `/webhook/feedback_submission` | Feedback form |
| Newsletter | `newsletter_subscriptions` | `/webhook/newsletter_subscription` | Blog signup |
| Job Applications | `job_applications` | `/webhook/job_applications_submission` | Career applications |
| Contact | `contact_submissions` | `/webhook/context_form_submission` | Contact form |
| Newsletter Footer | `newsletter_subscriptions` | `/webhook/newsletter_footer_signup` | Footer signup |

### Example n8n Payload

**Service Inquiry** (Book Demo):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "web-development",
  "message": "Interested in building a new platform",
  "page": "home",
  "timestamp": "2025-03-15T10:30:00.000Z"
}
```

**Project Interest**:
```json
{
  "project": "E-Commerce Platform Redesign",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Love this project! Need something similar",
  "page": "home",
  "timestamp": "2025-03-15T10:35:00.000Z"
}
```

### Testing with n8n Locally

1. Install n8n:
   ```bash
   npm install -g n8n
   ```

2. Start n8n:
   ```bash
   n8n start
   ```

3. Create webhooks in n8n UI at `http://localhost:5678`:
   - Create a new workflow
   - Add "Webhook" node
   - Set path to match the webhook paths above (e.g., `lead_cta_tracking`)
   - Add actions (email notification, Slack, etc.)

4. Update `.env`:
   ```
   N8N_BASE_URL=http://localhost:5678/webhook
   ```

## Database Schema

The application uses the following tables:

- `users` - User authentication (placeholder)
- `lead_tracking` - CTA click tracking
- `service_inquiries` - Service quote requests
- `project_interests` - Portfolio project inquiries
- `feedback_submissions` - User feedback
- `newsletter_subscriptions` - Newsletter signups
- `job_applications` - Career applications
- `contact_submissions` - General contact form

All tables include automatic timestamps and UUID primary keys.

## Google Login (Demo)

The application includes a Google Login placeholder that:
- Stores user info in `localStorage`
- Autofills forms when signed in
- Shows a login widget in the bottom-right corner
- Can be replaced with real OAuth later

To test:
1. Click "Sign in with Google (Demo)" button
2. A mock user is created and stored
3. All forms now autofill name and email
4. Forms are still editable even when autofilled

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database UI)

### Project Structure

```
/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── modals/       # Form modals
│   │   │   ├── sections/     # Page sections (12 total)
│   │   │   └── ui/           # Shadcn UI components
│   │   ├── data/             # Mock data (portfolio, blog)
│   │   ├── lib/              # Utilities (API, auth)
│   │   ├── pages/            # Page components
│   │   └── App.tsx           # App entry
│   └── index.html
├── server/                    # Backend application
│   ├── db.ts                 # Database connection
│   ├── storage.ts            # Data access layer
│   ├── routes.ts             # API routes
│   ├── n8nClient.ts          # n8n webhook client
│   └── index.ts              # Server entry
├── shared/                    # Shared code
│   └── schema.ts             # Database & validation schemas
└── README.md
```

## Deployment

The application is ready to deploy on Replit:

1. Ensure all environment variables are set
2. Database is provisioned and schema is pushed
3. Click the "Publish" button in Replit
4. Configure custom domain (optional)

## SEO & Analytics

- All pages have proper title and meta tags
- Open Graph tags for social sharing
- Semantic HTML for better search indexing
- Google Analytics placeholder (set `VITE_GA_ID` to enable)

## Support

For issues or questions:
- Email: hello@dcunovation.com
- GitHub: [Your repository]

## License

© 2025 DC Unovation. All rights reserved.

---

**Built with ❤️ by DC Unovation**
