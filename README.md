# 🧵 Handcrafted Haven

> A virtual marketplace connecting talented artisans with conscious consumers who appreciate the beauty and quality of handmade products.

🔗 **Live App:** [handcrafted-haven-team14.vercel.app](https://handcrafted-haven-team14.vercel.app/)

---

## 📌 Overview

Handcrafted Haven is a web application that provides a platform for artisans and crafters to showcase and sell their unique handcrafted items. The platform fosters a sense of community, supports local artisans, and promotes sustainable consumption by connecting creators directly with buyers who value handmade goods.

---

## 👥 Team — Group 14

| Name | Role |
|------|------|
| Cassien Habyarimana | Team Member |
| Eseoghene Jacob Gbunoghene | Team Member |
| Herzan Carcache Huerta | Team Member |
| Lawrence Okon | Team Member |
| Lehi Nyakno Daniel | Team Member |
| Levi Omagbemi | Team Member |

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16.2.6 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Backend | Node.js |
| Database | TBD |
| Deployment | Vercel |
| Package Manager | pnpm |
| Version Control | Git & GitHub |
| Project Management | GitHub Projects |

---

## ✅ User Stories

### Personas
- **Amara** — an artisan who creates and sells handcrafted goods
- **Leo** — a conscious consumer looking for unique, handmade products
- **Guest** — an unauthenticated visitor browsing the platform

---

**US-01 — Seller Registration**
> *"As Amara, I want to create a seller account with a dedicated profile, so that I can establish my identity on the platform and build trust with potential buyers."*

**US-02 — Product Listing**
> *"As Amara, I want to list my handcrafted items with descriptions, pricing, and images, so that buyers can discover and understand what I'm selling."*

**US-03 — Product Browsing**
> *"As Leo, I want to browse the product catalog and filter by category or price range, so that I can quickly find handcrafted items that match my taste and budget."*

**US-04 — Reviews and Ratings**
> *"As Leo, I want to leave a rating and written review on a product, so that I can help other buyers make informed decisions and reward quality craftsmanship."*

**US-05 — Seller Profile Page**
> *"As Leo, I want to view an artisan's profile page and their full collection, so that I can learn their story and explore more of their work if I like a product."*

**US-06 — Responsive Experience**
> *"As Leo, I want the platform to work seamlessly on my phone, so that I can browse and shop while I'm on the go without losing functionality."*

**US-07 — Accessible Platform**
> *"As a user with a visual impairment, I want the platform to be compatible with screen readers and keyboard navigation, so that I can browse and interact with the site independently."*

---

## 🗂️ Work Items

| ID | Title | Linked Story |
|----|-------|-------------|
| WI-01 | Set up Next.js project with folder structure, ESLint, and Vercel deployment pipeline | Foundation |
| WI-02 | Design and implement the database schema (Users, Products, Reviews, Categories) | US-01, US-02, US-04 |
| WI-03 | Build seller registration and login API endpoints | US-01 |
| WI-04 | Build seller profile creation and edit UI | US-01 |
| WI-05 | Build product listing creation form with image upload | US-02 |
| WI-06 | Build product catalog page with grid layout and product cards | US-03 |
| WI-07 | Implement category and price range filter logic | US-03 |
| WI-08 | Build individual product detail page | US-02, US-04, US-05 |
| WI-09 | Build review submission form and reviews API | US-04 |
| WI-10 | Build public seller profile page | US-05 |
| WI-11 | Implement responsive layout across all pages | US-06 |
| WI-12 | Conduct accessibility audit and implement fixes | US-07 |

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js v20.9.0 or higher
- pnpm (`npm install -g pnpm`)
- Git

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/leviomagbemi/handcrafted-haven-team14.git

# 2. Navigate into the project
cd handcrafted-haven-team14

# 3. Install dependencies
pnpm install

# 4. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

---

## 🌿 Git Workflow

1. Always pull the latest changes before starting work
   ```bash
   git pull origin main
   ```

2. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes with a descriptive message
   ```bash
   git commit -m "feat: add product listing form"
   ```

4. Push your branch and open a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

5. Request a review from at least one teammate before merging

---

## 📁 Project Structure

```
handcrafted-haven-team14/
├── app/
│   ├── globals.css        # Global styles (Tailwind v4)
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── public/                # Static assets (SVGs, images)
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── pnpm-lock.yaml         # pnpm lockfile (do not edit manually)
└── README.md
```

---

## ♿ Accessibility

This project targets **WCAG 2.1 Level AA** compliance. All pages must include:
- Descriptive alt text on images
- Full keyboard navigation support
- Sufficient color contrast ratios
- Properly labeled form fields

---

## 📄 License

This project was developed as part of a group assignment at **Brigham Young University – Idaho**. This project is licensed under the [MIT License](./LICENSE).