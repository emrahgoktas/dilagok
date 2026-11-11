import { channelScore, type Check } from "@/lib/publish-criteria";

export function ScorePanel({ checks }: { checks: Check[] }) {
  const groups = channelScore(checks);
  const ok = checks.filter((c) => c.ok).length;

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div>
        <p className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">Publish score</p>
        <p className="mt-2 font-display text-4xl">
          {ok}/{checks.length}
        </p>
      </div>
      <ul className="space-y-3">
        {groups.map((g) => (
          <li key={g.channel} className="flex items-center justify-between text-sm">
            <span>{g.channel}</span>
            <span className={g.ok === g.total ? "text-gold" : "text-bone/50"}>
              {g.ok}/{g.total}
            </span>
          </li>
        ))}
      </ul>
      <ul className="max-h-[50vh] space-y-3 overflow-auto border-t border-bone/10 pt-4 text-xs text-bone/70">
        {checks.map((c) => (
          <li key={c.id}>
            <p className={c.ok ? "text-bone" : "text-gold"}>
              {c.ok ? "Pass" : "Fix"} · {c.label}
            </p>
            {!c.ok ? <p className="mt-1 text-bone/45">{c.hint}</p> : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
