import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { JsonLd } from "@/components/ui/JsonLd";
import { SkipNav } from "@/components/layout/SkipNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "دار المعين للنشر | نشر وتحقيق وطباعة الكتب الإسلامية",
    template: "%s | دار المعين للنشر",
  },
  description:
    "مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية. كتب إسلامية موثوقة في التفسير والحديث والفقه والسيرة.",
  keywords: [
    "كتب إسلامية",
    "دار نشر",
    "دراسات تأصيلية",
    "طباعة ونشر",
    "التفسير",
    "الحديث النبوي",
    "الفقه",
    "السيرة النبوية",
    "الدعوة الإسلامية",
    "كتب دينية",
    "دار المعين",
  ],
  authors: [{ name: "دار المعين للنشر" }],
  creator: "دار المعين للنشر",
  publisher: "دار المعين للنشر",
  metadataBase: new URL("https://dar-al-maeen-jaiy.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    url: "https://dar-al-maeen-jaiy.vercel.app",
    siteName: "دار المعين للنشر",
    title: "دار المعين للنشر | نشر وتحقيق وطباعة الكتب الإسلامية",
    description:
      "مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "دار المعين للنشر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دار المعين للنشر",
    description:
      "مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B5E20" },
    { media: "(prefers-color-scheme: dark)", color: "#1A237E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B5E20" />
        <JsonLd
          type="WebSite"
          name="دار المعين للنشر"
          description="مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية"
        />
        <JsonLd
          type="Organization"
          name="دار المعين للنشر"
          description="مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية"
        />
      </head>
      <body className="min-h-screen antialiased">
        <SkipNav />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          themes={["light", "dark", "golden"]}
        >
          <main id="main-content">
            {children}
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
