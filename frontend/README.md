# 🧩 Poklet — Frontend (React + MUI + TypeScript)

This part of the project contains the frontend interface of the Poklet application.
It is built using:

- **React 18** (Vite)
- **TypeScript**
- **MUI (Material UI)**
- **Axios** for communicating with the backend
- **React Router v6** for navigation
- **i18next** for localization
- **Zustand** for global state management
- **ESLint** and **Prettier** for linting and code formatting

---

## 📁 Structure

```text
├── frontend/                  # React + Vite + MUI frontend
│   ├── public/
│   ├── src/
│   │   ├── api/               # Axios instance and API endpoints
│   │   ├── components/        # Reusable components (VoteCard, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Pages (SessionPage, HomePage)
│   │   ├── locales/           # Localization: en/ru
│   │   ├── store/             # Zustand — global state
│   │   ├── theme/             # Themes (light/dark), MUI settings
│   │   ├── types/             # Shared TypeScript types (Player, Session, etc.)
│   │   ├── utils/             # Utilities (formatting, validations, etc.)
│   │   ├── config.ts          # Global config (URLs and params)
│   │   ├── App.tsx
│   │   ├── Root.tsx           # Root component with theme, routes, and providers
│   │   └── main.tsx
│   ├── .env                   # Environment variables for Vite
│   ├── .env.local             # Local overrides (in .gitignore)
│   ├── .env.example           # Environment template
│   ├── vite.config.ts
│   └── tsconfig.json
│   ├── eslint.config.js
│   ├── .prettierrc
│   └── README.md
```

---

## 🚀 Running Locally

```bash
cd frontend
npm install
npm run dev
```

It will open in the browser at [`http://localhost:5173`](http://localhost:5173)

⚠️ Make sure the `.env` file includes the variable `VITE_API_URL`, for example:

```
VITE_API_URL=http://localhost:8000/api
```

---

## ✅ Code Checks

### 🔎 Type Checking (TypeScript)

```bash
npm run typecheck
```

### 📏 Linting (ESLint)

```bash
npm run lint
```

### 🎨 Formatting (Prettier)

```bash
npm run format
```

---

## 📦 Build

```bash
npm run build
```

The result will be in `dist/`

---

## 🌍 Localization

- Uses `react-i18next`
- Translation files:  
  `src/locales/ru/translation.json`  
  `src/locales/en/translation.json`
- Use `t('key')` from the `useTranslation()` hook
- Language can be switched using `<LanguageSwitcher />`

---

## 🔮 Hooks

- Custom hooks are located in `src/hooks`
- For example, `useSession(id)` encapsulates logic for loading a session:

---

## 🧪 Code Checks and Tests

```bash
npm run lint        # Code linting
npm run format      # Formatting with Prettier
npm run test        # (after adding tests)
```

Formatting runs automatically on save in VS Code (if plugins are enabled).
