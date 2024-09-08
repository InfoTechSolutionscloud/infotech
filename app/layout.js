import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InfoTech - Innovative Solutions, Real Results",
  description: "Infotech is a best agency for tech related service. We provide amazing tech related services.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL),
  openGraph: {
    title: "InfoTech - Innovative Solutions, Real Results",
    description: "Infotech is a best agency for tech related service. We provide amazing tech related services.",
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: "Infotech",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_API_URL,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
       
        <Footer />
      </body>
    </html>
  );
}
