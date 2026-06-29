# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm** (see `pnpm-lock.yaml`). Use `pnpm`, not `npm` or `yarn`.

- `pnpm dev` — start the Vite dev server with HMR
- `pnpm build` — typecheck via `tsc -b` (project references) then produce a production build with Vite. The build fails on any type error.
- `pnpm lint` — run ESLint over the repo
- `pnpm preview` — serve the built `dist/` locally

There is no test runner configured yet.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first, via the `@tailwindcss/postcss` plugin in `postcss.config.js`)
- **Supabase** — backend (`@supabase/supabase-js`), reachable through the Supabase MCP server configured in `.mcp.json` (project ref `otyxjqibihfunaxiglvz`). Prefer the `supabase` MCP tools for schema inspection, migrations, and queries. Client is in `src/lib/supabase.ts`; generated types in `src/lib/database.types.ts`.
- **React Router v8** — installed and used in declarative mode (see Routing convention below).
- **Forms**: `react-hook-form` + `zod` (via `@hookform/resolvers/zod`). **Icons**: `lucide-react`.

## Project structure

Feature-first, with a global `src/components` for shared primitives:

- `src/app/App.tsx` — `<BrowserRouter>` + `<AuthProvider>` + `<Routes>` (the router).
- `src/features/<feature>/` — feature code. `auth/` holds `AuthProvider.tsx`, the `useAuth.ts` hook/context, `validation.ts` (zod), `constants.ts`, `brandPresets.ts`, plus `pages/` and `components/`.
- `src/components/ui/` — design-token primitives (`Button`, `TextField`, `Checkbox`, `Select`, `Logo`, `Spinner`). `src/components/layout/` — `AuthSplitLayout`, `BrandPanel`, `CenteredCardLayout`.
- `src/routes/ProtectedRoute.tsx` — gated routes. `src/lib/` — `supabase.ts`, `database.types.ts`, `cn.ts`.

**Language**: all code/identifiers in **English**; only user-facing UI copy (from Figma) is in Spanish. Brand is **CLC · Centro de Liderazgo Comercial**.

## Database & migrations

Every DDL change is a timestamped, append-only SQL file in `supabase/migrations/` (see its README). Apply via the Supabase MCP `apply_migration`, keeping file and remote identical; run `get_advisors` and regenerate `database.types.ts` after schema changes. The app profile table is **`public.users`** (1:1 with `auth.users`); roles live in the `app_role` enum + `users.role` (default `student`). Only `student` authenticates in this repo — the admin platform (other roles) and landing pages are separate repos.

## Styling architecture (important)

Tailwind v4 is configured CSS-first — there is **no `tailwind.config.js`**. All theme configuration lives in `src/index.css`.

The color palette is defined as **semantic tokens** in the `@theme` block of `src/index.css` (e.g. `--color-primary`, `--color-foreground`, `--color-surface`, `--color-border`). Each token auto-generates utilities such as `bg-primary`, `text-foreground`, `border-border`.

Convention: **in components use the semantic utilities, never raw color utilities** (`bg-primary`, not `bg-indigo-600`). The entire palette is meant to be swappable by editing only the `@theme` values in `index.css` — using raw colors in components breaks that, so don't.

## Routing convention

Use **declarative mode**: `<BrowserRouter>` wrapping `<Routes>`, with each route as `<Route path="..." element={<Screen />} />` (and nested routes via `<Outlet />`, e.g. `ProtectedRoute`). Import everything from the single **`react-router`** package (v8) — not `react-router-dom`.

## TypeScript conventions

The `tsconfig.app.json` enables bundler-mode settings that affect how you write imports:

- `allowImportingTsExtensions` — local imports include the extension, e.g. `import App from './App.tsx'`.
- `verbatimModuleSyntax` — type-only imports must use `import type { Foo }`.
- `erasableSyntaxOnly` — no TS constructs that emit runtime code (enums, parameter properties, runtime namespaces). Use plain types/unions instead.
- `noUnusedLocals` / `noUnusedParameters` are on, so unused bindings fail the build.
