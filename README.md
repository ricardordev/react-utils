# React & Vite development playground

A minimal, production-ready environment showcasing common React architectural patterns, custom hook design, and clean Tailwind CSS integration.

> [!IMPORTANT]
> **Disclaimer & Performance Notice:** This is reference code. Production implementations require proper security measures. Furthermore, continuous unthrottled logging within the global store can lead to memory growth; ensure a slice constraint is enforced in high-frequency environments.

---

## Components

### Accordion
`src/components/Accordion.tsx`

A responsive Accordion component that maps a pre-defined set of items. It leverages a custom `useToggle` hook encapsulated within each atomic `AccordionItem` sub-component, ensuring isolated state mutations, clean UI transitions, and logging integrations to a global state store upon interaction.

### Audit
`src/components/Audit.tsx`

A global state audit logger that subscribes to a centralized Zustand store. It renders system notifications, simulation logs, and user actions dynamically in a chronological, scrollable terminal-style interface with contextual status icons and history clearance capabilities.

### FormContact
`src/components/FormContact.tsx`

A robust contact and registration form engineered with `react-hook-form` for uncontrolled input performance. Features real-time client-side validation, custom cross-field password matching schemas, automated user feedback via `sonner` toasts, and global event auditing upon successful data submission.

### Modal
`src/components/Modal.tsx`

An explicit modal window control showcasing isolated visibility management via the custom `useToggle` hook. It handles portal-like conditional rendering, access constraints for underlying interfaces, and dispatches analytical updates directly to the centralized audit timeline.

### NavigationButtons
`src/components/NavigationButtons.tsx`

Navigation buttons to the application, used to navigate between the different pages of the application. 

### SearchRepo
`src/components/SearchRepo.tsx`

An asynchronous repository discovery dashboard connected to the GitHub API via `axios`. It exemplifies data-fetching safety patterns, loading and error boundary state handling, and integrates a custom `useDebounce` hook to optimize network bandwidth by throttling automated search triggers on input keystrokes.

---

## Custom Hooks

### useDebounce
`src/hooks/useDebounce.ts`

A custom utility hook engineered to delay the update of a fast-changing value. It abstracts `setTimeout` web APIs within a declarative React lifecyle, effectively throttling high-frequency state mutations (such as input keystrokes) to decrease downstream network overhead and minimize redundant API executions.

### useLocalStorage
`src/hooks/useLocalStorage.ts`

A state synchronization hook that seamlessly pairs React state mutations with synchronous browser persistent storage (`localStorage`). Includes robust `try/catch` safety wrappers to handle IO compilation failures or strict storage privacy constraints gracefully, while providing a predictable state setter interface.

### useMediaQuery
`src/hooks/useMediaQuery.ts`

An event-driven responsive hook built on top of the native window `matchMedia` API. It subscribes efficiently to screen resize events using proper browser event listener lifecycles and component unmount cleanup logic, enabling reactive layout modifications directly through client-side execution contexts.

### useToggle
`src/hooks/useToggle.ts`

A highly optimized state machine modifier designed for binary operations (flags, open/closed modal variants, accordion toggles). By implementing strict referential caching via React's `useCallback` hook, it exposes immutable trigger methods (`toggle`, `setTrue`, `setFalse`) that effectively prevent unnecessary sub-tree component re-renders.

---

## State Management

### useLogStore
`src/store/useLogStore.ts`

A centralized state management store built with `Zustand` that acts as the application's real-time audit pipeline. It exposes a reactive hook interface allowing any decoupled component to dispatch telemetry, validation logs, or event histories. The store ensures strict state immutability, leverages the browser's native `crypto.randomUUID()` API for high-performance unique identification, and maintains an un-shifted chronological event timeline.

### useAuthStore
`src/store/useAuthStore.ts`

A centralized state management store built with `Zustand` that acts as the application's authentication pipeline. It exposes a reactive hook interface allowing any decoupled component to dispatch authentication events. The store ensures strict state immutability and maintains an chronological authentication timeline. It depends on an existing API with user authentication and registration endpoints.

---

## Getting Started

Clone the repository, install the dependencies, and fire up the local development server using your preferred package manager:

```bash
# install dependencies
npm install # or yarn, pnpm, bun

# start the development server
npm run dev
```

## Deployment & Verification

For deployment on docker:

```bash
# build the image
docker compose build --no-cache

# run the container
docker compose up -d
```

You can interact with the result on:

* Deployed: [http://localhost/](http://localhost/)
* Dev: [http://localhost:5173/](http://localhost:5173/)

```
ricardo albrecht - ricardoalbrecht1@gmail.com
```