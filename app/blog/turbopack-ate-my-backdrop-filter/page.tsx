import type { Metadata } from 'next'
import { PostLayout } from '@/components/blog/PostLayout'
import { getPost } from '@/lib/posts'

const meta = getPost('turbopack-ate-my-backdrop-filter')!

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
}

export default function Post() {
  return (
    <PostLayout meta={meta}>
      <p>
        I was shipping liquid-glass cards on this site — translucent surfaces with a gradient rim and a
        real <code>backdrop-filter</code> blur, so the page behind them refracts like frosted glass. The CSS
        was textbook:
      </p>
      <pre>
        <code>{`html[data-perf='full'] .lq {
  background: linear-gradient(145deg, rgba(255,255,255,0.06), ...);
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
}`}</code>
      </pre>
      <p>
        The cards rendered. The gradient rendered. The blur never arrived. No console error, no build
        warning — just glass that wasn&apos;t glass.
      </p>

      <h2>Ruling out the obvious</h2>
      <p>
        First suspicion is always your own selector. So I asked the browser what it actually computed:
      </p>
      <pre>
        <code>{`getComputedStyle(card).backdropFilter  // → "none"`}</code>
      </pre>
      <p>
        Then whether the browser even supports it:
      </p>
      <pre>
        <code>{`CSS.supports('backdrop-filter', 'blur(16px)')  // → true
card.style.backdropFilter = 'blur(16px) saturate(1.5)'
getComputedStyle(card).backdropFilter  // → "blur(16px) saturate(1.5)" ✓`}</code>
      </pre>
      <p>
        Inline styles worked. The stylesheet didn&apos;t. That narrows it to exactly one place: whatever sits
        between my CSS file and the browser.
      </p>

      <h2>Reading the stylesheet the browser actually received</h2>
      <p>
        The trick that cracked it was dumping the rule from the CSSOM — not my source file, but what
        survived the build:
      </p>
      <pre>
        <code>{`for (const sheet of document.styleSheets)
  for (const rule of sheet.cssRules)
    if (rule.selectorText?.includes('.lq'))
      console.log(rule.cssText)`}</code>
      </pre>
      <p>
        And there it was:
      </p>
      <pre>
        <code>{`html[data-perf="full"] .lq {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), ...);
}`}</code>
      </pre>
      <p>
        The <code>background</code> made it through. Both <code>backdrop-filter</code> declarations were{' '}
        <strong>gone</strong> — stripped from the rule entirely. Even better: an older <code>.glass</code>{' '}
        utility from a previous design had been silently blur-less for months. Nobody noticed, because a
        translucent dark card without blur still looks <em>plausible</em>.
      </p>

      <h2>The culprit</h2>
      <p>
        This project runs Next.js 16 with Turbopack, and Turbopack processes CSS with{' '}
        <strong>Lightning CSS</strong>. Lightning CSS transforms your stylesheet against a browser-support
        matrix — and in my setup (helped along by months-old <code>caniuse-lite</code> data in the
        lockfile), it decided <code>backdrop-filter</code> wasn&apos;t shippable and removed the declarations
        instead of prefixing them. Silently. The dev server and the production build both did it, which is
        exactly why it looked like a CSS bug rather than a pipeline bug.
      </p>
      <p>
        The takeaway that stung: <strong>&quot;the browser supports it&quot; and &quot;your build ships
        it&quot; are two different facts</strong>, and the only way to verify the second one is to inspect
        the CSSOM the browser actually parsed.
      </p>

      <h2>The fix (which ended up better than the original)</h2>
      <p>
        I could have fought the toolchain — updated browserslist data, pinned targets, hoped the next
        Turbopack release behaved. Instead I moved the blur out of the stylesheet entirely. This site
        already has a perf provider that benchmarks the machine on load (frame-rate sample plus core count)
        and assigns a tier. So the blur is now applied as an inline style, exactly where the tier decision
        lives:
      </p>
      <pre>
        <code>{`useEffect(() => {
  document.documentElement.dataset.perf = tier
  const blur = tier === 'full' ? 'blur(16px) saturate(1.5)' : ''
  document.querySelectorAll('.lq').forEach((el) => {
    el.style.backdropFilter = blur
    el.style.setProperty('-webkit-backdrop-filter', blur)
  })
}, [tier])`}</code>
      </pre>
      <p>
        Inline styles can&apos;t be stripped by a CSS pipeline, and as a bonus the expensive effect is now
        opt-in by hardware: capable machines get real refraction, weak ones get a solid tinted fallback
        that still reads as glass and costs nothing. The bug forced an architecture I should have chosen
        anyway.
      </p>

      <h2>If your effect &quot;doesn&apos;t work&quot; but the CSS looks right</h2>
      <ul>
        <li>
          Check <code>getComputedStyle</code> first — it tells you whether the property ever reached the
          element.
        </li>
        <li>
          Set the same value as an inline style — if that works, your CSS pipeline is the suspect, not the
          browser.
        </li>
        <li>
          Dump the rule from <code>document.styleSheets</code> — read what survived the build, not what you
          wrote.
        </li>
        <li>
          Keep your <code>caniuse-lite</code> data fresh — stale support data makes optimizing compilers do
          confidently wrong things.
        </li>
      </ul>
    </PostLayout>
  )
}
