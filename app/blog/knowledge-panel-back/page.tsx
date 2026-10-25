import type { Metadata } from 'next'
import Link from 'next/link'
import { PostLayout } from '@/components/blog/PostLayout'
import { getPost } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo'

const meta = getPost('knowledge-panel-back')!

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.excerpt,
  path: `/blog/${meta.slug}`,
  type: 'article',
  publishedTime: meta.date,
  tags: meta.tags,
})

export default function Post() {
  return (
    <PostLayout meta={meta}>
      <p>
        If you searched my name a while ago, Google showed a small knowledge panel on the right. It said I
        was a graphic designer, which I&apos;m not, but at least it was there. A few days after I shipped a
        redesign of this site, I searched again and the panel looked gone. This is what I found and what I
        changed to get it back, now saying &quot;Software developer&quot;.
      </p>

      <h2>What a knowledge panel actually is</h2>
      <p>
        You can&apos;t apply for a knowledge panel. Google shows one when it&apos;s confident that a name
        belongs to one specific entity, and it builds that confidence from sources that agree with each
        other: your website, its structured data, your profiles and, for many people, a Wikidata item. When
        those sources disagree, the confidence drops, and the panel can get vague, shrink or disappear.
      </p>
      <p>So the question wasn&apos;t &quot;what did Google break&quot;. It was &quot;where do my own sources disagree?&quot;</p>

      <h2>Three answers to one question</h2>
      <p>The first thing I checked was the most basic fact: what is my homepage?</p>
      <ul>
        <li>
          The site&apos;s canonical URL, Open Graph URL and JSON-LD all said <code>https://voegele.dev</code>.
        </li>
        <li>
          But <code>voegele.dev</code> redirected to <code>www.voegele.dev</code>, with a{' '}
          <strong>307</strong>. That&apos;s a <em>temporary</em> redirect, so it tells Google the move
          might not stick.
        </li>
        <li>
          My Wikidata item listed <code>https://www.voegele.dev</code> as the official website.
        </li>
      </ul>
      <p>
        So the page said &quot;I live at the apex domain&quot;, the server said &quot;not right now, go to
        www&quot;, and Wikidata said &quot;www&quot;. The redesign had introduced the mismatch, and every
        signal pointing at me pointed at a slightly different place.
      </p>

      <h2>The fixes on the site</h2>
      <ul>
        <li>
          <strong>One origin everywhere.</strong> I made <code>https://www.voegele.dev</code> the canonical
          origin: <code>metadataBase</code>, canonicals, <code>og:url</code>, the sitemap, robots.txt and
          every <code>@id</code> in the structured data.
        </li>
        <li>
          <strong>A permanent redirect.</strong> In Vercel, the apex domain now redirects to www with a{' '}
          <strong>308</strong> instead of a 307.
        </li>
        <li>
          <strong>A Person entity that links out.</strong> The site&apos;s JSON-LD describes me as a{' '}
          <code>Person</code> with my job and employer, and with <code>sameAs</code> links to GitHub,
          LinkedIn, Instagram and my Wikidata item. That tells Google those profiles all belong to the same
          person.
        </li>
        <li>
          <strong>The same facts as Wikidata.</strong> The birth date in the schema matches the one on
          Wikidata exactly, so the two sources can confirm each other.
        </li>
      </ul>
      <pre>
        <code>{`{
  "@type": "Person",
  "@id": "https://www.voegele.dev/#person",
  "name": "Devin Vögele",
  "jobTitle": "Developer & Creative Technologist",
  "url": "https://www.voegele.dev",
  "sameAs": [
    "https://github.com/devin-voegele/",
    "https://www.linkedin.com/in/devin-voegele-2a5989293",
    "https://www.instagram.com/devinvoe/",
    "https://www.wikidata.org/wiki/Q137946248"
  ]
}`}</code>
      </pre>

      <h2>The fixes on Wikidata</h2>
      <p>
        Wikidata was where the &quot;graphic designer&quot; label came from. My item listed a motion graphics
        designer occupation. I removed it, kept software developer, and set plain descriptions:
        &quot;Swiss software developer&quot; in English and &quot;Schweizer Softwareentwickler&quot; in
        German. I also added my Instagram username and LinkedIn ID as identifiers, so those profiles are
        tied to the item from both directions.
      </p>
      <p>
        One rule there: only add what you can back up with a source. Wikidata is public and edited by
        everyone, so made-up or promotional claims get removed, and they don&apos;t help anyway.
      </p>

      <h2>What happened next</h2>
      <p>
        About two days later, the panel was back with the right label: &quot;Software developer&quot;, plus
        my date of birth. I can&apos;t prove which change did it, because Google doesn&apos;t tell you. Part
        of my panic was also self-inflicted: the panel looks quite different on mobile, and I compared a
        phone screenshot with an old desktop one. But the label changed because the sources changed, and
        that part isn&apos;t luck.
      </p>

      <h2>If your panel disappears or says the wrong thing</h2>
      <ul>
        <li>
          Check that your site, its canonical tags and its redirects all agree on one URL, and that the
          redirect is permanent (301 or 308).
        </li>
        <li>
          Add <code>Person</code> structured data with <code>sameAs</code> links to the profiles that are
          really yours.
        </li>
        <li>If you have a Wikidata item, make it match your site, and remove anything outdated.</li>
        <li>Use the same name, job and bio on every profile.</li>
        <li>
          Request indexing for your homepage in Search Console, then wait. Changes take days to weeks, not
          hours.
        </li>
      </ul>
      <p>
        This is the kind of work I now do for other people too. If your name or your business
        doesn&apos;t show up the way it should, have a look at my <Link href="/seo">SEO services</Link>.
      </p>
    </PostLayout>
  )
}
