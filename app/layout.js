import { Cormorant_Garamond, Great_Vibes, Alex_Brush, Lato } from "next/font/google";
import weddingConfig from "@/data/weddingConfig.json";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

import { headers } from "next/headers";

async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  try {
    const headersList = await headers();
    const forwardedHost = headersList.get("x-forwarded-host");
    const forwardedProto = headersList.get("x-forwarded-proto") || "https";

    // If forwarded via ngrok or reverse proxy (e.g. xyz.ngrok-free.app)
    if (forwardedHost && !forwardedHost.includes("localhost") && !forwardedHost.startsWith("127.0.0.1")) {
      return `${forwardedProto}://${forwardedHost}`;
    }

    const host = headersList.get("host");
    // If incoming host is an actual domain (e.g. deployed on Vercel or custom domain)
    if (host && !host.includes("localhost") && !host.startsWith("127.0.0.1")) {
      return `${forwardedProto}://${host}`;
    }
  } catch (e) {
    // During static build or prerendering, headers() might throw or be empty
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://garima-anurag-wedding-invite.vercel.app";
}

export async function generateMetadata() {
  const siteUrl = await getSiteUrl();
  const coupleNames = `${weddingConfig.couple.bride.name} & ${weddingConfig.couple.groom.name}`;
  const weddingDate = weddingConfig.dates.weddingDateText;
  const venueText = `${weddingConfig.venue.name}, ${weddingConfig.venue.addressLine1} ${weddingConfig.venue.addressLine2}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `Wedding of ${coupleNames} | ${weddingDate}`,
    description: `You are cordially invited to the wedding celebration of ${coupleNames} on ${weddingDate} at ${venueText}.`,
    openGraph: {
      title: `Wedding of ${coupleNames} | ${weddingDate}`,
      description: `You are cordially invited to the wedding celebration of ${coupleNames} on ${weddingDate} at ${venueText}.`,
      url: siteUrl,
      siteName: `Wedding of ${coupleNames}`,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `${siteUrl}/assets/og-image-full1.jpg`,
          secureUrl: `${siteUrl}/assets/og-image-full1.jpg`,
          width: 1024,
          height: 1536,
          type: "image/jpeg",
          alt: `${coupleNames} Wedding Invitation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Wedding of ${coupleNames} | ${weddingDate}`,
      description: `You are cordially invited to the wedding celebration of ${coupleNames}.`,
      images: [`${siteUrl}/assets/og-image-full1.jpg`],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${cormorantGaramond.variable} ${greatVibes.variable} ${alexBrush.variable} ${lato.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
