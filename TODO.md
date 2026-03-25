# Cloudflare Deployment TODO

Status: [In Progress]

## Steps from Approved Plan:

### 1. Install Wrangler CLI [x] ← `npm i -g wrangler` completed, `npx wrangler` works

### 2. Cloudflare Login [x] ← `npx wrangler login` successful

### 3. Create D1 Database [x] ← `budgeting-app-db` created (ID: c3fe6974-f163-4b25-a698-bcbdf92e2754, APAC)

### 4. Update schema.prisma [x] ← SQLite confirmed, ready for D1

### 5. Generate .env vars [x] ← .env created (.env.local recommended for git)

### 6. Push schema to D1 [ ]

### 7. Configure wrangler.toml [x] ← D1 binding added

### 8. Git connect [x] ← Pages project 'budgeting-app' created (https://budgeting-app-c4s.pages.dev)

### 9. Deploy [Failed] ← File size error (need clean build)

### 10. Test [ ]

**Next:** Get D1 connection URL + Push Prisma schema
