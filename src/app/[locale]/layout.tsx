import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getTranslations } from "../translation";

export const metadata: Metadata = {
  title: "Max & Miku Wedding",
  description: "Wedding website for Max & Miku",
};

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'sv' },
    { locale: 'en' }
  ]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: 'sv' | 'en' }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  return (
    <html>
      <body>
        <Header translations={translations}/>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer translations={translations} />
      </body>
    </html>
  );
}