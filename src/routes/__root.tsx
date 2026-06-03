import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block bg-[color:var(--brand-red)] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="bg-[color:var(--brand-red)] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">Try again</button>
          <a href="/" className="border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MKG Kabel — Premium Cables & Conduit, Lagos" },
      { name: "description", content: "Professional electrical cable supplier in Lagos, Nigeria. Cables, conduit, pipes & earthing — made in Turkey." },
      { property: "og:title", content: "MKG Kabel — Premium Cables & Conduit, Lagos" },
      { property: "og:description", content: "Professional electrical cable supplier in Lagos, Nigeria. Cables, conduit, pipes & earthing — made in Turkey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "MKG Kabel — Premium Cables & Conduit, Lagos" },
      { name: "twitter:description", content: "Professional electrical cable supplier in Lagos, Nigeria. Cables, conduit, pipes & earthing — made in Turkey." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/99fd6694-5686-4134-a27c-1d5d34d58f41/id-preview-6141ad81--a1faaefc-9a8e-496d-a46c-766bcefe37ee.lovable.app-1780301154879.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/99fd6694-5686-4134-a27c-1d5d34d58f41/id-preview-6141ad81--a1faaefc-9a8e-496d-a46c-766bcefe37ee.lovable.app-1780301154879.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
