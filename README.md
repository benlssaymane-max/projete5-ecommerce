# NovaLux Ecommerce (Next.js + Three.js)

A high-end cinematic ecommerce starter experience with:
- Next.js (App Router) + React + TypeScript
- Three.js via React Three Fiber + Drei
- Tailwind CSS + Framer Motion + GSAP-ready stack
- Node-style API routes in Next.js backend
- MongoDB models for users, products, orders, reviews, wishlist

## Pages
- `/` Home cinematic landing
- `/shop` Product listing with search/filter
- `/product/[id]` Product details + interactive 3D viewer
- `/cart` Cart page
- `/checkout` Checkout flow scaffold (Stripe-ready)
- `/account` User account
- `/admin` Admin dashboard
- `/admin/products`, `/admin/orders`, `/admin/users`

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/:id`
- `GET/POST /api/cart`
- `GET/POST /api/orders`
- `GET/POST /api/reviews`
- `GET/POST /api/wishlist`

## Run Locally
1. Install dependencies:
   `npm install`
2. Create env file:
   `copy .env.example .env.local`
3. Seed DB (optional):
   `npm run seed`
4. Start dev server:
   `npm run dev`
5. Open:
   `http://localhost:3000`

## Deploy
- Vercel for frontend + API routes
- MongoDB Atlas for database
- Set env vars in Vercel project settings
- Run `npm run build` and deploy

## Notes
- Stripe payment intent endpoint can be added under `/api/payments/create-intent` with your secret key.
- Product 3D viewer currently uses procedural geometry and can be replaced with GLB model loader URLs from admin uploads.