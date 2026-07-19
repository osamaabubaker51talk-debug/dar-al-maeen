interface JsonLdProps {
  type?: string;
  name: string;
  description: string;
  url?: string;
  image?: string;
}

export function JsonLd({
  type = "Organization",
  name,
  description,
  url = "https://dar-al-maeen-jaiy.vercel.app",
  image,
}: JsonLdProps) {
  const data =
    type === "Organization"
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name,
          description,
          url,
          logo: image || `${url}/logo.png`,
          sameAs: [
            "https://www.instagram.com/dar_almueein",
            "https://x.com/dar_almueein",
            "https://www.facebook.com/daralmueein/",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "بغداد",
            addressCountry: "IQ",
          },
        }
      : type === "WebSite"
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name,
          description,
          url,
          inLanguage: "ar",
          potentialAction: {
            "@type": "SearchAction",
            target: `${url}/books?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": type,
          name,
          description,
          url,
          image,
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BookJsonLd({
  name,
  description,
  url,
  image,
  author,
  isbn,
  price,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  isbn?: string;
  price?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    description,
    url,
    image,
    author: author ? { "@type": "Person", name: author } : undefined,
    isbn,
    inLanguage: "ar",
    publisher: { "@type": "Organization", name: "دار المعين للنشر" },
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: "IQD",
          price: price.toString(),
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
