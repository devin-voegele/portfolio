export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Devin Vögele",
    "alternateName": ["Devin Voegele", "Devin"],
    "url": "https://devin-voegele.vercel.app",
    "image": "https://devin-voegele.vercel.app/og-image.png",
    "jobTitle": "IAM Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "PwC Switzerland",
      "url": "https://www.pwc.ch"
    },
    "description": "17-year-old IAM Developer at PwC Switzerland specializing in Identity & Access Management, web development, penetration testing, and motion graphics design with 40M+ views.",
    "knowsAbout": [
      "Identity and Access Management",
      "Web Development",
      "Next.js",
      "React",
      "Penetration Testing",
      "Cybersecurity",
      "Motion Graphics",
      "Adobe After Effects",
      "Graphic Design",
      "JavaScript",
      "TypeScript",
      "PHP",
      "Linux"
    ],
    "sameAs": [
      "https://github.com/devin-voegele",
      "https://linkedin.com/in/devinvoegele",
      "https://www.wikidata.org/wiki/Q133482588"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressCountry": "Switzerland"
    },
    "nationality": {
      "@type": "Country",
      "name": "Switzerland"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Devin Vögele Portfolio",
    "url": "https://devin-voegele.vercel.app",
    "author": {
      "@type": "Person",
      "name": "Devin Vögele"
    },
    "description": "Portfolio website of Devin Vögele - IAM Developer, Web Developer, and Graphic Designer based in Zürich, Switzerland.",
    "inLanguage": "en"
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Devin Vögele - Developer & Designer",
    "description": "IAM Development, Web Development, Penetration Testing, and Motion Graphics Design services.",
    "url": "https://devin-voegele.vercel.app",
    "areaServed": "Switzerland",
    "serviceType": ["Web Development", "IAM Development", "Graphic Design", "Motion Graphics"],
    "provider": {
      "@type": "Person",
      "name": "Devin Vögele"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
