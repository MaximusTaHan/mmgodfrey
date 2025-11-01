import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/layout/header/Header";
import HeaderMobile from "../../components/layout/headerMobile/HeaderMobile";
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as 'sv' | 'en');
  return (
    <html>
      <body>
        <Header translations={translations}/>
        <HeaderMobile translations={translations}/>
          {children}
        <Footer translations={translations} />
      </body>
    </html>
  );
}