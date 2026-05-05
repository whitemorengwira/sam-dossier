import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-onyx text-white">
      <h1 className="text-gold font-display text-4xl font-black mb-4">404</h1>
      <p className="text-text-secondary mb-6">This page could not be found.</p>
      <Link href="/" className="btn-gold px-6 py-3">
        Return Home
      </Link>
    </main>
  )
}
