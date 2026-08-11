# Convex GitHub Auth

A small Next.js project built to explore GitHub authentication and reactive data with Convex.

## Features

- GitHub OAuth authentication with Convex Auth
- Authenticated user data stored in Convex
- Reactive Convex queries
- Connection status stored in the user document
- GitHub avatar, name, and email display
- Sign in / sign out flow
- ESLint and Prettier configuration
- TypeScript

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Convex](https://www.convex.dev/)
- [Convex Auth](https://labs.convex.dev/auth)
- [GitHub OAuth](https://github.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Bun](https://bun.sh/)

## How It Works

The application uses Convex Auth to authenticate users with GitHub.

After authentication, the app retrieves the current Convex user and displays their profile information. The connection status is stored directly in the Convex user document and updates the UI reactively.

```text
GitHub
   ↓
Convex Auth
   ↓
Authenticated user
   ↓
Convex users table
   ↓
Reactive Convex query
   ↓
Next.js UI