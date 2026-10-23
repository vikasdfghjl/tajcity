import { DESKTOP_MEDIA_QUERY, INLAY_PLACE_ID } from "@/config/constants";
import {
  BatteryCharging,
  Cigarette,
  Drone,
  Fire,
  ForkKnife,
  Headphones,
  Knife,
  Leaf,
  SealCheck,
  Ticket,
  Wine,
} from "@phosphor-icons/react/ssr";
import { FridayTile } from "@/components/essentials/FridayTile";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlace } from "@/data/places";

// From the official Taj Mahal dos and don'ts
const NOT_ALLOWED = [
  { label: "Drones", Icon: Drone },
  { label: "Food", Icon: ForkKnife },
  { label: "Tobacco", Icon: Cigarette },
  { label: "Lighters", Icon: Fire },
  { label: "Knives", Icon: Knife },
  { label: "Chargers", Icon: BatteryCharging },
  { label: "Headphones", Icon: Headphones },
  { label: "Alcohol", Icon: Wine },
];

const INLAY_PHOTO = getPlace(INLAY_PLACE_ID)?.photo;

export function Essentials() {
  return (
    <section
      id="essentials"
      aria-labelledby="essentials-title"
      className="scroll-mt-16 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="essentials"
          title="Know this before you go"
          intro="The handful of rules and scams that catch out first-time visitors."
        />

        {/* Bento: 6 tiles. 4 columns by 3 rows on desktop, a single stack on phones */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(220px,auto))] lg:gap-4">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <FridayTile />
          </Reveal>

          <Reveal delay={0.05} className="sm:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-surface p-6 sm:p-8">
              <Ticket size={30} className="text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-semibold">Book tickets the night before</h3>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">
                  Buy on the ASI portal: it's ₹5 cheaper for Indians and ₹50 cheaper for foreigners,
                  and foreign tickets include shoe covers, water and the battery bus.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-card bg-sunken p-6">
              <Leaf size={28} className="text-open" aria-hidden="true" />
              <div>
                <p className="font-mono text-5xl leading-none tracking-tight">500 m</p>
                <p className="mt-3 text-[15px] leading-snug text-ink-2">
                  No polluting vehicles this close to the Taj. Battery buses and golf carts run from
                  Shilpgram (East Gate) and Amrood ka Tila (West Gate) parking.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:row-span-2">
            <div className="flex h-full flex-col gap-5 rounded-card border border-line bg-surface p-6">
              <h3 className="text-xl font-semibold">Leave these at the hotel</h3>
              <ul className="grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-4">
                {NOT_ALLOWED.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-2.5 text-sm text-ink-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sunken text-ink">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
              <p className="border-t border-line pt-4 text-sm text-ink-3">
                Phones on silent, cameras and water bottles are fine. Tripods need ASI permission;
                keep bags small and leave books behind.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="sm:col-span-2">
            <div className="relative isolate flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-card p-6 text-white sm:p-8">
              {INLAY_PHOTO && (
                <div className="absolute inset-0 -z-10">
                  <CommonsImage
                    photo={INLAY_PHOTO}
                    alt="An artisan setting stone into a marble inlay panel"
                    sizes={`${DESKTOP_MEDIA_QUERY} 50vw, 100vw`}
                  />
                </div>
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/10" />
              <h3 className="text-2xl font-semibold">Real marble or soapstone?</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <p className="text-[15px] leading-relaxed text-white/85">
                  <span className="font-semibold text-white">Fingernail test.</span> Press it into
                  the unpolished underside. Soapstone marks; Makrana marble does not.
                </p>
                <p className="text-[15px] leading-relaxed text-white/85">
                  <span className="font-semibold text-white">Torch test.</span> Hold your phone
                  light against it. Real marble glows softly around the beam.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between gap-6 rounded-card bg-sunken p-6">
              <SealCheck size={28} className="text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-semibold">Petha copycats</h3>
                <p className="mt-2 text-[15px] leading-snug text-ink-2">
                  Many shops copy the Panchhi name. Buy at the brand's own stores, such as Hari
                  Parvat or Sadar Bazaar, and check the date on the box.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
