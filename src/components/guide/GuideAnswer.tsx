import { ArrowSquareOut, Plus } from "@phosphor-icons/react";
import type { GuideEntry } from "@/data/types";

/** One question that expands to its answer, follow-up points and sources. */
export function GuideAnswer({
  entry,
  open = false,
  eyebrow,
}: {
  entry: GuideEntry;
  open?: boolean;
  /** Small label above the question, e.g. the topic when shown in search results */
  eyebrow?: string;
}) {
  return (
    <details className="group border-b border-line" open={open}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] leading-snug font-semibold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
        <span>
          {eyebrow && (
            <span className="mb-1 block font-mono text-xs font-normal text-ink-3">{eyebrow}</span>
          )}
          {entry.question}
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sunken text-ink transition-transform duration-300 group-open:rotate-45">
          <Plus size={16} weight="bold" aria-hidden="true" />
        </span>
      </summary>
      <div className="pb-6">
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink-2">{entry.answer}</p>
        {entry.points && (
          <ul className="mt-3 max-w-[62ch] space-y-2">
            {entry.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
                <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-3">
          <span>Source:</span>
          {entry.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline decoration-line underline-offset-2 hover:text-ink"
            >
              {source.label}
              <ArrowSquareOut size={12} aria-hidden="true" />
            </a>
          ))}
        </p>
      </div>
    </details>
  );
}
