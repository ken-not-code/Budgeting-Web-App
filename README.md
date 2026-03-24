# BudgetPro - Personal Finance Management App

A full-stack personal finance management application with budgeting, savings tracking, analytics, and AI-powered financial assistance.

![Next.js](https://img.shields.io/badge/Next.js-13-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748)

## Features

### Core Functionality
- **Transaction Management** - Add, edit, delete income/expense transactions with categories
- **Budget Tracking** - Set monthly budgets per category with visual progress indicators
- **Savings Goals** - Create goals with targets, deadlines, and automatic progress tracking
- **Search & Filter** - Search transactions by category/description, filter by date range
- **Data Export** - Export all transactions to CSV format

### Analytics Dashboard
- 📊 **Expense Pie Chart** - Visual breakdown of expenses by category
- 📈 **Income vs Expense Bar Chart** - Monthly comparison trends
- 💰 **Savings Trend Chart** - Track savings over time
- 📋 **Summary Cards** - Total income, expenses, net balance, savings rate

### AI Financial Assistant
- Smart chatbot providing personalized financial advice
- Topics: budgeting, saving, debt management, investing, taxes
- Context-aware responses based on user data

### Security
- JWT-based authentication with bcrypt password hashing
- Rate limiting (5 attempts per 15 minutes)
- Security headers (CSP, X-Frame-Options, X-Content-Type-Options)
- Session timeout (30 minutes)
- Input validation with Zod

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 13 | Full-stack framework with App Router |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Prisma + SQLite | Database ORM |
| Next-Auth v4 | Authentication |
| Recharts | Data visualization |
| Zod | Input validation |
| Vitest | Unit testing |
| Sonner | Toast notifications |

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd Budgeting-Web-App
   npm install
   ```

2. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Create environment file**
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to http://localhost:3000

### Windows Quick Start
Double-click `run.bat` to automatically install dependencies and start the server.

## Project Structure

```
src/
├── actions/           # Server Actions
│   ├── budgetActions.ts
│   ├── savingsActions.ts
│   └── transactionActions.ts
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── auth/         # Login/Register pages
│   ├── dashboard/   # Main dashboard
│   └── page.tsx      # Landing page
├── components/       # React components
│   ├── ai/          # AI chat widget
│   ├── auth/        # Auth components
│   ├── budget/      # Budget UI
│   ├── charts/      # Recharts components
│   ├── savings/     # Savings goals UI
│   ├── transaction/ # Transaction UI
│   └── ui/          # Reusable UI components
├── lib/             # Utilities
│   ├── auth.ts      # Next-Auth config
│   ├── prisma.ts    # Prisma client
│   ├── rateLimit.ts # Rate limiter
│   └── utils.ts     # Helper functions
└── middleware.ts    # Security headers
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Tests with coverage report |
| `npm run lint` | ESLint check |
| `npx prisma studio` | Database GUI |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - Login/logout (GET/POST)

### Database Models
- **User** - id, email, name, password, timestamps
- **Transaction** - id, userId, type, amount, description, category, date, timestamps
- **Budget** - id, userId, category, month, amount, timestamps
- **SavingsGoal** - id, userId, name, targetAmount, currentAmount, deadline, completed, timestamps
- **ChatMessage** - id, userId, role, content, timestamps

## Security Features

| Feature | Implementation |
|---------|---------------|
| Auth | JWT with next-auth v4 |
| Password | Bcrypt hashing |
| Rate Limiting | 5 attempts / 15 minutes |
| Session | 30-minute timeout |
| Headers | CSP, X-Frame-Options, X-Content-Type |
| Validation | Zod schema validation |

## Testing

```bash
# Run all tests
npm run test

# With coverage report
npm run test:coverage
```

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci-cd.yml`):
1. Lint & Type Check
2. Unit Tests with coverage
3. Production Build
4. Deploy to production (manual trigger)

## Design

- **Theme**: Dark mode default (easy on eyes)
- **Color Scheme**: Cyan/blue primary accent
- **UI Style**: Glass-morphism cards, gradient borders
- **Animations**: Smooth fade-in transitions

## Milestones

| Week | Milestone | Status |
|------|-----------|--------|
| Week 1 | Proposal & Architecture Design | ✅ |
| Week 2 | Database + Authentication | ✅ |
| Week 3 | Core CRUD Operations | ✅ |
| Week 4 | Analytics + Notifications | ✅ |
| Week 5 | Testing + CI/CD | ✅ |
| Week 6 | Documentation + Demo | ✅ |

## License

MIT License
