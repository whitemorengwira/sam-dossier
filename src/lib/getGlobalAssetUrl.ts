/**
 * Global Asset URL Utility
 *
 * Constructs a full Cloudflare R2 CDN URL for any asset within the
 * socinga-heavy-assets bucket. Handles slash normalisation to prevent
 * double-slash issues.
 *
 * @param relativePath — The path relative to the bucket root,
 *   e.g. "sam-dossier/public/images/logo.png"
 * @returns The fully-qualified CDN URL.
 *
 * @example
 *   getGlobalAssetUrl("sam-dossier/public/images/lisa-portrait.png")
 *   // => "https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev/sam-dossier/public/images/lisa-portrait.png"
 */
export function getGlobalAssetUrl(relativePath: string): string {
  const base = (
    process.env.NEXT_PUBLIC_GLOBAL_R2_URL ||
    'https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev'
  ).replace(/\/+$/, '') // strip trailing slashes from base

  const path = relativePath.replace(/^\/+/, '') // strip leading slashes from path

  return `${base}/${path}`
}
