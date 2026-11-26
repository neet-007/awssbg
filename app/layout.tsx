import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const amazonEmber = localFont({
  src: [
    { path: "../Font/AmazonEmberDisplay_Lt.ttf", weight: "300", style: "normal" },
    { path: "../Font/AmazonEmberDisplay_LtIt.ttf", weight: "300", style: "italic" },
    { path: "../Font/AmazonEmberDisplay_Rg.ttf", weight: "400", style: "normal" },
    { path: "../Font/AmazonEmberDisplay_RgIt.ttf", weight: "400", style: "italic" },
    { path: "../Font/AmazonEmberDisplay_Md.ttf", weight: "500", style: "normal" },
    { path: "../Font/AmazonEmberDisplay_MdIt.ttf", weight: "500", style: "italic" },
    { path: "../Font/AmazonEmberDisplay_Bd.ttf", weight: "700", style: "normal" },
    { path: "../Font/AmazonEmberDisplay_BdIt.ttf", weight: "700", style: "italic" },
    { path: "../Font/AmazonEmberDisplay_He.ttf", weight: "900", style: "normal" },
    { path: "../Font/AmazonEmberDisplay_HeIt.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-amazon-ember",
  display: "swap",
  fallback: ["Inter", "Arial", "Helvetica", "sans-serif"],
});

const amazonEmberMono = localFont({
  src: [
    { path: "../Font/AmazonEmberMono_Rg.ttf", weight: "400", style: "normal" },
    { path: "../Font/AmazonEmberMono_Bd.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-amazon-ember-mono",
  display: "swap",
  fallback: ["JetBrains Mono", "ui-monospace", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "AWSSBG — AWS Student Builder Group",
  description:
    "AWS Student Builder Group at the University of Khartoum — a student-led community exploring cloud computing, software engineering, and real-world building.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${amazonEmber.variable} ${amazonEmberMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
      </body>
    </html>
  );
}