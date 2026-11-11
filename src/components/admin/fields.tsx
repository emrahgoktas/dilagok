import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-bone/40">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full border border-bone/20 bg-transparent px-3 py-2 text-sm text-bone outline-none focus:border-gold";
