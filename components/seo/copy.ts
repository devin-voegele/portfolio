// All text on the SEO landing page, per language. The layout lives in
// SeoLanding.tsx; icons are matched to tracks and steps by position.
// German follows Swiss spelling (ss, not ß) and addresses the reader as "Sie".

export type Lang = 'en' | 'de'

export interface SeoCopy {
  lang: Lang
  mailSubject: string
  serp: { query: string; name: string; wrong: string; right: string; url: string; title: string }
  hero: {
    pill: string
    titleTop: string
    titleCover: string
    /** German words are longer, so the display size steps down a notch. */
    titleClass: string
    tagline: string
    primary: string
    secondary: string
    switchLabel: string
    switchHref: string
    scroll: string
  }
  tracks: {
    eyebrow: string
    title: string
    blurb: string
    items: { label: string; title: string; intro: string; items: string[] }[]
  }
  process: { eyebrow: string; title: string; step: string; steps: { title: string; text: string }[] }
  honesty: { label: string; line1: string; line2: string; text: string }
  proof: {
    eyebrow: string
    title: string
    caseStudy: string
    items: { kicker: string; title: string; text: string; href?: string }[]
  }
  closing: { label: string; line1: string; line2: string; text: string; cta: string }
}

export const en: SeoCopy = {
  lang: 'en',
  mailSubject: 'SEO enquiry',
  serp: {
    query: 'your name',
    name: 'Your Name',
    wrong: 'Graphic designer',
    right: 'Software developer',
    url: 'https://www.yoursite.com',
    title: 'Your Name — What You Actually Do',
  },
  hero: {
    pill: 'SEO Services in Switzerland',
    titleTop: 'Get',
    titleCover: 'Found.',
    titleClass: 'text-[clamp(3rem,9vw,7.5rem)]',
    tagline:
      'Technical SEO for businesses and for people. I fix what keeps Google from understanding your site, and I make sure your name leads to you. Based in Switzerland, working in German and English.',
    primary: 'Get Found',
    secondary: "What's Included",
    switchLabel: 'Auf Deutsch lesen',
    switchHref: '/de/seo',
    scroll: 'Scroll',
  },
  tracks: {
    eyebrow: "Who It's For",
    title: 'Two Ways In',
    blurb:
      "Whether it's a company that should rank or a person who should be recognised, the groundwork is the same: make the facts clear and consistent.",
    items: [
      {
        label: 'For businesses',
        title: 'Get your company found',
        intro:
          'Shops, studios, agencies and startups whose site exists but does not show up when people search for what they offer.',
        items: [
          'Technical audit: titles, descriptions, canonicals, indexing, broken links, images',
          'Structured data for your company, local business or product',
          'Sitemap, robots.txt and clean link previews for WhatsApp, LinkedIn and X',
          'Google Search Console and Bing Webmaster Tools, set up and verified',
          'Google Business Profile, with the same name, address and phone everywhere',
          'Fixes as code (pull requests on Next.js) or a clear list for your developer',
        ],
      },
      {
        label: 'For individuals',
        title: 'Own your name on Google',
        intro:
          'Freelancers, founders, creatives and anyone who wants the first result for their name to be something they control.',
        items: [
          'A personal site or page that ranks for your name',
          'Person schema tying your site, LinkedIn, GitHub and Instagram into one identity',
          'Consistent bios and links, so Google sees one person, not five',
          'Knowledge panel groundwork: Wikidata where you qualify, claiming, fixing wrong labels',
          'Cleaning up old pages and profiles that describe you the wrong way',
        ],
      },
    ],
  },
  process: {
    eyebrow: 'How It Works',
    title: 'Audit. Fix. Verify.',
    step: 'Step',
    steps: [
      { title: 'Audit', text: 'I crawl the site against a fixed rule set. You get a plain report: what is broken, why it matters, what it takes.' },
      { title: 'Fix', text: 'Metadata, structured data, sitemap, canonicals, previews. On Next.js the fixes arrive as pull requests.' },
      { title: 'Verify', text: 'I re-check the live site, submit it in Search Console and request indexing for the pages that matter.' },
      { title: 'Follow up', text: 'Google takes weeks, not days. I check back and read what Search Console reports.' },
    ],
  },
  honesty: {
    label: 'Approach',
    line1: 'No guesswork.',
    line2: 'No fake promises.',
    text: 'Nobody can guarantee first place or a knowledge panel, and anyone who does is guessing. I remove everything on your side that holds you back, so your content gets the ranking it earns.',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Done It On Myself First',
    caseStudy: 'Case study',
    items: [
      {
        kicker: 'Knowledge panel',
        title: 'My own name',
        text: 'Google labelled me "Graphic designer". After fixing my schema, Wikidata and profiles, the panel reads "Software developer".',
      },
      {
        kicker: 'Tooling',
        title: 'Metafix',
        text: 'My SEO tool audits a live site with 31 deterministic rules and opens pull requests with the fixes. It fixed a real issue on this site.',
        href: '/work/metafix',
      },
      {
        kicker: 'Reference build',
        title: 'voegele.dev',
        text: 'This site ships the full setup: entity graph, per-page metadata, sitemap and generated link previews.',
      },
    ],
  },
  closing: {
    label: 'Get in touch',
    line1: 'Ready to be',
    line2: 'found?',
    text: "Every project is different, so pricing is per project. Tell me about your site or your name and I'll come back with what I'd do and what it costs.",
    cta: 'Start a conversation',
  },
}

export const de: SeoCopy = {
  lang: 'de',
  mailSubject: 'SEO-Anfrage',
  serp: {
    query: 'ihr name',
    name: 'Ihr Name',
    wrong: 'Grafikdesigner',
    right: 'Softwareentwickler',
    url: 'https://www.ihre-website.ch',
    title: 'Ihr Name — was Sie wirklich tun',
  },
  hero: {
    pill: 'SEO-Dienstleistungen in der Schweiz',
    titleTop: 'Gefunden',
    titleCover: 'werden.',
    titleClass: 'text-[clamp(2.6rem,6.4vw,5.5rem)]',
    tagline:
      'Technisches SEO für Unternehmen und Privatpersonen. Ich behebe, was Google daran hindert, Ihre Website zu verstehen, und sorge dafür, dass Ihr Name zu Ihnen führt. Aus der Schweiz, auf Deutsch und Englisch.',
    primary: 'Anfrage senden',
    secondary: 'Was dazugehört',
    switchLabel: 'Read in English',
    switchHref: '/seo',
    scroll: 'Scrollen',
  },
  tracks: {
    eyebrow: 'Für wen',
    title: 'Zwei Wege',
    blurb:
      'Ob ein Unternehmen ranken soll oder eine Person erkannt werden will: Die Grundlage ist dieselbe. Klare und einheitliche Fakten.',
    items: [
      {
        label: 'Für Unternehmen',
        title: 'Ihr Unternehmen wird gefunden',
        intro:
          'Für Läden, Studios, Agenturen und Start-ups, deren Website zwar existiert, aber nicht auftaucht, wenn jemand nach ihrem Angebot sucht.',
        items: [
          'Technisches Audit: Titel, Beschreibungen, Canonicals, Indexierung, defekte Links, Bilder',
          'Strukturierte Daten für Ihr Unternehmen, Ihr lokales Geschäft oder Ihr Produkt',
          'Sitemap, robots.txt und saubere Link-Vorschauen für WhatsApp, LinkedIn und X',
          'Google Search Console und Bing Webmaster Tools, eingerichtet und verifiziert',
          'Google-Unternehmensprofil, mit überall gleichem Namen, gleicher Adresse und Telefonnummer',
          'Fixes als Code (Pull Requests bei Next.js) oder als klare Liste für Ihre Entwickler',
        ],
      },
      {
        label: 'Für Privatpersonen',
        title: 'Ihr Name auf Google',
        intro:
          'Für Freelancer, Gründerinnen und Gründer, Kreative und alle, die selbst bestimmen wollen, was beim ersten Treffer zu ihrem Namen steht.',
        items: [
          'Eine persönliche Website oder Seite, die für Ihren Namen rankt',
          'Person-Schema, das Website, LinkedIn, GitHub und Instagram zu einer Identität verbindet',
          'Einheitliche Bios und Links, damit Google eine Person sieht und nicht fünf',
          'Grundlagen fürs Knowledge Panel: Wikidata (wo die Kriterien erfüllt sind), Panel beanspruchen, falsche Bezeichnungen korrigieren',
          'Alte Seiten und Profile bereinigen, die Sie falsch beschreiben',
        ],
      },
    ],
  },
  process: {
    eyebrow: 'So läuft es ab',
    title: 'Prüfen. Beheben. Bestätigen.',
    step: 'Schritt',
    steps: [
      { title: 'Audit', text: 'Ich prüfe die Website anhand fester Regeln. Sie bekommen einen klaren Bericht: was kaputt ist, warum es zählt und was es braucht.' },
      { title: 'Umsetzung', text: 'Metadaten, strukturierte Daten, Sitemap, Canonicals, Vorschauen. Bei Next.js kommen die Fixes als Pull Requests.' },
      { title: 'Kontrolle', text: 'Ich prüfe die Live-Seite erneut, reiche sie in der Search Console ein und beantrage die Indexierung der wichtigen Seiten.' },
      { title: 'Nachfassen', text: 'Google braucht Wochen, nicht Tage. Ich schaue nach einigen Wochen wieder rein und werte die Search Console aus.' },
    ],
  },
  honesty: {
    label: 'Arbeitsweise',
    line1: 'Kein Rätselraten.',
    line2: 'Keine leeren Versprechen.',
    text: 'Niemand kann Platz eins oder ein Knowledge Panel garantieren, und wer das tut, rät. Ich räume aus dem Weg, was Sie auf Ihrer Seite bremst, damit Ihre Inhalte das Ranking bekommen, das sie verdienen.',
  },
  proof: {
    eyebrow: 'Referenzen',
    title: 'Zuerst an mir selbst getestet',
    caseStudy: 'Fallstudie (EN)',
    items: [
      {
        kicker: 'Knowledge Panel',
        title: 'Mein eigener Name',
        text: 'Google hat mich als «Graphic designer» geführt. Nach Korrekturen an Schema, Wikidata und Profilen steht im Panel jetzt «Software developer».',
      },
      {
        kicker: 'Tool',
        title: 'Metafix',
        text: 'Mein SEO-Tool prüft eine Live-Website mit 31 festen Regeln und öffnet Pull Requests mit den Fixes. Auch auf dieser Website hat es ein echtes Problem behoben.',
        href: '/work/metafix',
      },
      {
        kicker: 'Referenz',
        title: 'voegele.dev',
        text: 'Diese Website nutzt das komplette Setup: Entity-Graph, Metadaten pro Seite, Sitemap und generierte Link-Vorschauen.',
      },
    ],
  },
  closing: {
    label: 'Kontakt',
    line1: 'Bereit, gefunden',
    line2: 'zu werden?',
    text: 'Jedes Projekt ist anders, darum gibt es Preise pro Projekt. Erzählen Sie mir von Ihrer Website oder Ihrem Namen, und ich melde mich mit einem Vorschlag und einem Preis.',
    cta: 'Gespräch starten',
  },
}
