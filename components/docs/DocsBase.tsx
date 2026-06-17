'use client'

import { createContext, useContext } from 'react'

/**
 * basePath is '' when served from docs.voegele.dev (the subdomain rewrite
 * makes the docs root the site root) and '/docs' on the apex / localhost.
 * Every internal docs link is built through this so URLs stay clean on the
 * subdomain without breaking apex or local development.
 */
const DocsBaseContext = createContext<string>('/docs')

export function DocsBaseProvider({
  basePath,
  children,
}: {
  basePath: string
  children: React.ReactNode
}) {
  return <DocsBaseContext.Provider value={basePath}>{children}</DocsBaseContext.Provider>
}

export const useDocsBase = () => useContext(DocsBaseContext)

export const docHref = (basePath: string, slug: string) =>
  slug ? `${basePath}/${slug}` : basePath || '/'
