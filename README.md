# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — Daily grocery prices across Bangladesh's markets, in one place.

**BazarDor** shows today's prices for rice, pulses, oil, vegetables, fish, meat, dairy and spices, with price
changes since yesterday and a market-by-market breakdown (min / max / average) for every product. All prices
are shown in Bengali digits, and the whole site works on mobile, tablet and desktop.

- **Live link:** _[BazarDor](https://bazar-dor-eight-eta.vercel.app/)_
- **GitHub:** _[Visit My Repo](https://github.com/taminulislam27/BazarDor)_

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling strip (pauses on hover) with emoji, name, price per unit and ▲/▼ percentage change.
2. **Home dashboard** – Top 6 price risers, Top 6 fallers and the full product list in a responsive card grid, with skeleton loaders while data loads.
3. **Category pages with sorting** – filter by category and sort by price (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম). Sorting uses numeric values, so Bengali numerals sort correctly.
4. **Protected product details** – per-product summary plus min / max / average prices and a market-wise price table across divisions. Visitors who are not signed in are redirected to sign in with a toast.
5. **Authentication with BetterAuth** – email & password, Google and GitHub login, toast notifications for success / errors, and a profile page where users can update their name.
6. **Friendly 404 & empty states** – unknown routes and invalid categories/products show a clear message with a "হোম পেজে ফিরে যান" button.

## 🛠️ Technologies Used

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + [DaisyUI](https://daisyui.com/) |
| Auth | [BetterAuth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | MongoDB Atlas (via `mongodb`) for BetterAuth users & sessions |
| Notifications | react-hot-toast |
| Font | Hind Siliguri (Bengali) |
| Data | BazarDor REST API (with automatic fallback to the alternative URL) |

## 🚀 Getting Started

```bash
# 1. install dependencies
npm install

# 2. create your env file and fill it in
cp .env.example .env.local

# 3. run the dev server (MongoDB collections are created automatically)
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string (`mongodb+srv://…`) |
| `MONGODB_DB` | Database name (defaults to `bazardor`) |
| `BETTER_AUTH_SECRET` | Random secret – `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Site URL (`http://localhost:3000` locally, your deployed URL in production) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials (optional) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials (optional) |
| `BAZARDOR_API_URL` | Optional override for the products API base URL |

### OAuth callback URLs

Register these redirect URLs in the Google / GitHub developer consoles (replace the host in production):

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

## ☁️ Deployment (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables above (set `BETTER_AUTH_URL` to your Vercel URL).
3. In MongoDB Atlas → Network Access, allow `0.0.0.0/0` so Vercel can connect.
4. Add the production callback URLs to your Google / GitHub OAuth apps.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are rendered on the server, so refreshing any page works without a 404.

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (shop)/            # home page + loading skeleton
│   ├── category/[slug]/   # category page (sort, skeleton, empty state)
│   ├── product/[slug]/    # protected product details
│   ├── profile/           # profile + update-name route
│   ├── signin/ signup/    # authentication pages
│   ├── api/auth/          # BetterAuth route handler
│   └── not-found.tsx      # 404 page
├── components/            # Navbar, Ticker, Hero, ProductCard, forms, …
├── lib/                   # API client, formatting, sorting, auth config
└── middleware.ts          # protects /product/* and /profile/*
```
