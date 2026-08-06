import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BasketProvider } from "@/providers/basket-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Klikk — Technology for everyday life",
    template: "%s | Klikk",
  },
  description:
    "Discover technology, home, gaming and support from Klikk Malta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <BasketProvider>
          <Header />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
