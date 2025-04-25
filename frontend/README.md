This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Project Structure & Folder Usage

### components
Reusable UI components such as buttons, cards, modals, etc. Place only presentational, stateless, and shared components here.

### features
Feature-based modules. Each major feature (e.g., movies, auth, user) should have its own subfolder containing UI, logic, and state for that feature.

### hooks
Custom React hooks for shared logic across components and features.

### layouts
Application and page layouts to provide consistent structure and navigation across pages.

### services
API calls, data fetching logic, and integration with backend services. Organize by domain or feature as needed.

### store
State management setup (e.g., Redux, Zustand, Context API). Organize slices, stores, and related utilities here.

### styles
Global and modular CSS/SCSS files, theme definitions, and style utilities.

### utils
General utility and helper functions used across the app.

### assets
Static assets such as images, fonts, icons, and other files.

### types
TypeScript type definitions and interfaces shared across the app.

### constants
App-wide constants, enums, and configuration values.

