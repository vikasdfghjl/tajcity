import { HELPLINES, OFFICIAL_PORTALS } from "@/config/constants";
import { ArrowUpRight, Phone } from "@phosphor-icons/react/ssr";
import { HERO_PHOTO } from "@/data/commons";
import { PLACES, type Photo } from "@/data/places";

const CREDITS: { subject: string; photo: Photo }[] = [
  { subject: "Taj Mahal at sunrise", photo: HERO_PHOTO },
  ...PLACES.flatMap((place) =>
    place.photo ? [{ subject: place.photo.pictured ?? place.name, photo: place.photo }] : [],
  ),
];

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-36 lg:pb-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <p className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold tracking-[-0.04em]">Taj City</span>
            <span lang="hi" className="font-deva text-2xl text-ink-3">
              आगरा
            </span>
          </p>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-2">
            An independent visitor guide to Agra. Opening times are calculated from sunrise and
            sunset; check the ASI site before you travel.
          </p>
        </div>

        <div className="grid min-w-0 gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold">If you need help</h2>
            <ul className="mt-4 space-y-2">
              {HELPLINES.map((line) => (
                <li key={line.number}>
                  <a
                    href={`tel:${line.number}`}
                    className="group flex min-h-11 items-center gap-3 rounded-full border border-line pr-4 pl-1.5 transition-colors hover:border-ink-3"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
                      <Phone size={16} weight="fill" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[15px]">{line.number}</span>
                    <span className="text-sm text-ink-3">{line.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Official sites</h2>
            <ul className="mt-4 space-y-3">
              {OFFICIAL_PORTALS.map((portal) => (
                <li key={portal.href}>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] text-ink-2 hover:text-ink"
                  >
                    {portal.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <details className="group sm:col-span-2 lg:col-span-1">
            <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
              Photo and map credits
              <span className="ml-1 text-ink-3 group-open:hidden">(show)</span>
            </summary>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-ink-3">
              {CREDITS.map(({ subject, photo }) => (
                <li key={photo.page}>
                  {subject}:{" "}
                  <a
                    href={photo.page}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    {photo.author}
                  </a>
                  , {photo.license}, Wikimedia Commons
                </li>
              ))}
              <li>Map data OpenStreetMap contributors, tiles by OpenFreeMap.</li>
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
