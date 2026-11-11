"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";

export function LoginForm() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-5">
      <p className="text-[0.65rem] tracking-[0.32em] uppercase text-gold">DILAGOK</p>
      <h1 className="mt-3 font-display text-4xl">Atelier desk</h1>
      <form
        className="mt-10 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          const res = await fetch("/api/admin/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secret }),
          });
          if (!res.ok) {
            const data = (await res.json()) as { error?: string };
            setError(data.error ?? "Could not sign in");
            return;
          }
          router.replace("/admin");
          router.refresh();
        }}
      >
        <input
          type="password"
          required
          placeholder="ADMIN_SECRET"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-bone/20 bg-transparent px-3 py-3"
        />
        {error ? <p className="text-sm text-gold">{error}</p> : null}
        <button className="w-full bg-bone py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink">
          Enter
        </button>
      </form>
    </main>
  );
}
