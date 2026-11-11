import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <main className="px-5 pt-40 pb-24 text-center">
      <p className="font-display text-4xl">Lost thread</p>
      <Link href="/" className="mt-8 inline-block text-gold">
        DILAGOK
      </Link>
    </main>
  );
}
