import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InfoTech - Innovative Solutions, Real Results",
  description: "Infotech is a best agency for tech related service. We provide amazing tech related services.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={"/logo.png"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
        <link rel='canonical' href={process.env.NEXT_PUBLIC_API_URL} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Corporation",
              "name": "infoTech solutions",
              "url": "https://www.infotechsolutions.cloud/",
              "logo": "https://www.infotechsolutions.cloud/_next/image?url=%2Flogo.png&w=256&q=75",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "03282296963",
                "contactType": "customer service",
                "contactOption": "HearingImpairedSupported",
                "areaServed": "PK",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.instagram.com/infotech.solutions.company/?igsh=MW5sZWZodm44NnU1",
                "https://www.infotechsolutions.cloud/",
                "https://www.instagram.com/infotech.solutions.company/?igsh=MW5sZWZodm44NnU1",
                "https://www.linkedin.com/company/infotech-solutions-company/",
                "https://www.infotechsolutions.cloud/"
              ]
            })
          }}
        />
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
