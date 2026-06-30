# react-utils

A minimal Vite + React playground showcasing hooks, stores, forms, and API integration.

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (utility-first theming)
- **React Router** (SPA routing)
- **Zustand** (lightweight state management)
- **React Hook Form** (uncontrolled form handling)
- **Axios** (HTTP client with interceptors)
- **Sonner** (toast notifications)
- **Lucide React** (icon library)

## Project Structure

```
src/
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── store/        # Zustand global state stores
├── pages/        # Route-level page components
├── services/     # API service layer
├── libs/         # Shared utilities (Axios instance)
├── router.tsx    # Route definitions
└── main.tsx      # App entry point
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_PORT=3020
VITE_API_URL=http://localhost:3000/api
```

---

## Components

### Accordion
`src/components/Accordion.tsx`

Expandable FAQ list. Each item uses its own `useToggle` hook for isolated open/close state.

### Audit
`src/components/Audit.tsx`

Scrollable log viewer subscribed to the global `useLogStore`. Shows timestamped events with type icons (info, success, error). Supports clearing history.

### FormContact
`src/components/FormContact.tsx`

Registration form with `react-hook-form` validation. Fields: name, email, birthday, gender, password, confirm password. On submit, logs data to the audit store and fires a sonner toast.

### Modal
`src/components/Modal.tsx`

Controlled overlay dialog using `useToggle`. Includes backdrop blur, open/close logging to audit store, and action footer buttons.

### NavigationButtons
`src/components/NavigationButtons.tsx`

Two navigation links: `/sign` (auth page) and `/dashboard` (protected area).

### SearchRepo
`src/components/SearchRepo.tsx`

GitHub repository search with two modes:
- **Manual**: submit form → fetch API
- **Debounced**: type in input → `useDebounce` hook throttles API calls after 500ms idle

Handles loading, empty, and error states.

---

## Pages

### SignInUp
`src/pages/SignInUp.tsx`

Split-panel auth page with Sign In and Sign Up forms. Calls `AuthService`, updates `useAuthStore`, redirects to `/dashboard` on success. Already-authenticated users are auto-redirected.

### Dashboard
`src/pages/Dashboard.tsx`

Protected route behind auth gating. Renders user profile data from global store. Unauthenticated users are redirected to `/sign`. Logout triggers `AuthService.logout()` and client-side navigation.

---

## Router

`src/router.tsx`

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `App` | Main demo page |
| `/sign` | `SignInUp` | Authentication |
| `/dashboard` | `Dashboard` | Protected area |

---

## Custom Hooks

### useDebounce
`src/hooks/useDebounce.ts`

Delays value updates by a configurable time (default 500ms). Used in `SearchRepo` for throttled API search.

### useLocalStorage
`src/hooks/useLocalStorage.ts`

Syncs React state with `localStorage`. Handles parse errors and quota exceptions gracefully.

### useMediaQuery
`src/hooks/useMediaQuery.ts`

Tracks CSS media query matches via the `matchMedia` API. Cleans up event listeners on unmount.

### useToggle
`src/hooks/useToggle.ts`

Boolean state hook exposing three stable callbacks: `toggle`, `setTrue`, `setFalse`. Uses `useCallback` to prevent unnecessary re-renders.

---

## State Management

### useLogStore
`src/store/useLogStore.ts`

Zustand store for an append-only audit log. Each entry has a `crypto.randomUUID()` id, timestamp, message, and type (`info` | `success` | `error`). New logs prepend to the top.

### useAuthStore
`src/store/useAuthStore.ts`

Zustand store for authentication state. Tracks `user` and `isLoading`. Exposes `fetchUser` (checks session on app load) and `logout` (calls API, clears user, and resets state).

---

## Services

### AuthService
`src/services/auth.service.ts`

Typed API layer wrapping Axios calls:
- `signin(credentials)` → `POST /auth/sign-in`
- `signup(data)` → `POST /auth/sign-up`
- `logout()` → `POST /auth/sign-out`
- `getProfile()` → `GET /auth/me`

---

## Libs

### api
`src/libs/api.ts`

Pre-configured Axios instance with `withCredentials: true` and a 401 response interceptor. Reads `VITE_API_URL` from environment.

---

## Getting Started

```bash
npm install
npm run dev
```

### Docker

```bash
docker compose build --no-cache
docker compose up -d
```

Access:
- Dev: [http://localhost:5173](http://localhost:5173)
- Deployed: [http://localhost:3020](http://localhost:3020)

```

---

ricardo albrecht - ricardoalbrecht1@gmail.com