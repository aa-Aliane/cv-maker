# Tree View:
```
src/app
├── (auth)
│   ├── login
│   │   └── page.tsx
│   └── register
│       └── page.tsx
├── (dashboard)
│   ├── builder
│   │   └── page.tsx
│   ├── layout.tsx
│   └── settings
│       └── page.tsx
├── (public)
│   ├── [username]
│   │   └── page.tsx
│   └── explore
│       └── page.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.module.css
└── page.tsx

```

# Content:

## (auth)/login/page.tsx

```tsx
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return <LoginForm />;
}

```


## (auth)/register/page.tsx

```tsx
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return <RegisterForm />;
}

```


## (dashboard)/builder/page.tsx

```tsx
import FormWizard from "@/features/cv-builder/components/form-wizard";
import ResumeSections from "@/features/cv-builder/components/resume-sections";
import CvRenderEngine from "@/features/cv-viewer/components/cv-render-engine";

export default function BuilderPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-muted/50 overflow-hidden">
      {/* LEFT COLUMN */}
      <main className="flex-1 overflow-y-auto">
        <FormWizard>
          <ResumeSections />
        </FormWizard>
      </main>

      {/* RIGHT COLUMN: Just render the engine directly! */}
      <CvRenderEngine />
    </div>
  );
}

```


## (dashboard)/layout.tsx

```tsx
import React from "react";
import { DashboardShell } from "@/features/dashboard/components/shell";

/** Verified concise layout */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}

```


## (dashboard)/settings/page.tsx

```tsx
export default function SettingsPage() {
  return <div>Settings Page</div>;
}

```


## (public)/[username]/page.tsx

```tsx
import { CvRenderEngine } from "@/features/cv-viewer/components/cv-render-engine";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  return <CvRenderEngine username={params.username} />;
}

```


## (public)/explore/page.tsx

```tsx
export default function ExplorePage() {
  return <div>Explore Page</div>;
}

```


## globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─────────────────────────────────────────────────────────────────────────────
   Design tokens — Material Design palette + Corrected Strict Sharp Radius
───────────────────────────────────────────────────────────────────────────── */
@layer base {
  :root {
    /* Surfaces */
    --background: 210 33% 98%; /* #f7f9fb */
    --foreground: 204 9% 11%; /* #191c1e */

    --card: 0 0% 100%; /* #ffffff */
    --card-foreground: 204 9% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 204 9% 11%;

    /* Primary — Deep Indigo */
    --primary: 246 70% 47%; /* #3525cd */
    --primary-foreground: 0 0% 100%;

    /* Secondary / muted */
    --secondary: 224 15% 40%; /* #565e74 */
    --secondary-foreground: 210 9% 91%; /* #e6e8ea */

    --muted: 210 14% 96%; /* #f2f4f6 */
    --muted-foreground: 224 15% 40%; /* #565e74 */

    --accent: 210 9% 91%;
    --accent-foreground: 204 9% 11%;

    /* Feedback */
    --destructive: 0 84% 60%; /* #ba1a1a */
    --destructive-foreground: 0 0% 100%;

    /* Borders & inputs */
    --border: 249 17% 81%; /* #c7c4d8 */
    --input: 249 17% 81%;
    --ring: 246 70% 47%;

    /* 
       CRITICAL FIX: Set to 0.25rem (4px) to match your 'lg' configuration.
       Shadcn elements utilizing 'rounded-lg' will inherit 4px, 
       while inner buttons/inputs will automatically map down to 2px (0.125rem).
    */
    --radius: 0.25rem;
  }

  /* Dark mode */
  .dark {
    --background: 204 9% 11%;
    --foreground: 210 33% 98%;

    --card: 204 9% 14%;
    --card-foreground: 210 33% 98%;

    --popover: 204 9% 14%;
    --popover-foreground: 210 33% 98%;

    --primary: 246 100% 75%; /* #c3c0ff */
    --primary-foreground: 246 70% 47%;

    --secondary: 224 15% 40%;
    --secondary-foreground: 210 33% 98%;

    --muted: 224 15% 30%;
    --muted-foreground: 210 14% 80%;

    --accent: 224 15% 30%;
    --accent-foreground: 210 33% 98%;

    --destructive: 0 62% 30%;
    --destructive-foreground: 0 84% 60%;

    --border: 224 15% 30%;
    --input: 224 15% 30%;
    --ring: 246 100% 75%;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   Base layout resets
───────────────────────────────────────────────────────────────────────────── */
@layer base {
  * {
    @apply border-border;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    height: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    @apply bg-background text-foreground;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@layer utilities {
  .glass-panel {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.98) 100%
    );
    backdrop-filter: blur(10px);
  }
}

```


## layout.tsx

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";
import { Providers } from "@/components/providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CV Architect",
  description: "Organize your career data and build professional resumes.",
  other: {
    "google-site-verification": "...", // example
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={cn("min-h-screen bg-background font-sans antialiased")}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

```


## page.module.css

```css
.page {
  --background: #fafafa;
  --foreground: #fff;

  --text-primary: #000;
  --text-secondary: #666;

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;
  --button-secondary-border: #ebebeb;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-geist-sans);
  background-color: var(--background);
}

.main {
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--foreground);
  padding: 120px 60px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 24px;
}

.intro h1 {
  max-width: 320px;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -2.4px;
  text-wrap: balance;
  color: var(--text-primary);
}

.intro p {
  max-width: 440px;
  font-size: 18px;
  line-height: 32px;
  text-wrap: balance;
  color: var(--text-secondary);
}

.intro a {
  font-weight: 500;
  color: var(--text-primary);
}

.ctas {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  gap: 16px;
  font-size: 14px;
}

.ctas a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 128px;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
}

a.primary {
  background: var(--text-primary);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--button-secondary-border);
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 48px 24px;
  }

  .intro {
    gap: 16px;
  }

  .intro h1 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.92px;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }

  .page {
    --background: #000;
    --foreground: #000;

    --text-primary: #ededed;
    --text-secondary: #999;

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
    --button-secondary-border: #1a1a1a;
  }
}

```


## page.tsx

```tsx
export default function HomePage() {
  return <div>Landing Page</div>;
}

```

