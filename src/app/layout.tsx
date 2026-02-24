import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zona Center - Internet Inalámbrico a Bajo Costo | #zonawimax",
  description: "Zona Center ofrece internet inalámbrico de alta calidad en Cochabamba, Bolivia. Conexión en zonas desatendidas con planes accesibles. Sin contratos forzosos.",
  keywords: ["Internet inalámbrico", "Cochabamba", "Bolivia", "zonawimax", "Internet económico", "WiFi", "Conectividad"],
  authors: [{ name: "Zona Center" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Zona Center - Internet Inalámbrico",
    description: "Internet inalámbrico a bajo costo en Cochabamba. #zonawimax",
    url: "https://zonacenter.com",
    siteName: "Zona Center",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
