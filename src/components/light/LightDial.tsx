"use client";

import {
  DEFAULT_SUN_ANCHORS,
  DESKTOP_MEDIA_QUERY,
  DIAL_END_HOUR,
  DIAL_HOUR_LABELS,
  DIAL_QUICK_JUMPS,
  DIAL_START_HOUR,
  DIAL_STEP_HOURS,
  DIAL_TRACK_HEIGHT_PX,
  TAJ_PLACE_ID,
} from "@/config/constants";
import { CheckCircle, Clock, DoorOpen, Lightbulb, Users } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlace } from "@/data/places";
import { CROWD_CURVE, gradeStops, phaseAt, type SunAnchors } from "@/data/light";
import { formatDecimalHour, getTajDay, istHour } from "@/lib/agra-time";
import { useNow } from "@/lib/stores";
import { cn } from "@/lib/cn";

const SPAN = DIAL_END_HOUR - DIAL_START_HOUR;

const toPercent = (hour: number) => ((hour - DIAL_START_HOUR) / SPAN) * 100;

function crowdAt(hour: number): number | null {
  for (let i = 0; i < CROWD_CURVE.length - 1; i++) {
    const a = CROWD_CURVE[i];
    const b = CROWD_CURVE[i + 1];
    if (hour >= a.hour && hour <= b.hour) {
      if (a.value === null || b.value === null) {
        return null;
      }
      return a.value + ((hour - a.hour) / (b.hour - a.hour)) * (b.value - a.value);
    }
  }
  return null;
}

const curveY = (value: number) => 100 - value * 0.88;

/** Smooth SVG paths for each stretch of the curve where the gates are open. */
function crowdPaths(): { line: string; area: string }[] {
  const runs: { x: number; y: number }[][] = [];
  let current: { x: number; y: number }[] = [];
  for (const point of CROWD_CURVE) {
    if (point.value === null) {
      if (current.length > 1) runs.push(current);
      current = [];
      continue;
    }
    current.push({ x: toPercent(point.hour) * 10, y: curveY(point.value) });
  }
  if (current.length > 1) runs.push(current);

  return runs.map((points) => {
    // Catmull-Rom to cubic Bezier for a soft, honest-looking curve through every estimate
    let line = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      line += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    const first = points[0];
    const last = points[points.length - 1];
    return { line, area: `${line} L ${last.x} 100 L ${first.x} 100 Z` };
  });
}

const PATHS = crowdPaths();
const DIAL_PHOTO = getPlace(TAJ_PLACE_ID)?.photo;

function anchorsFor(now: Date): SunAnchors {
  const today = getTajDay(now);
  return { sunrise: istHour(today.sunrise), sunset: istHour(today.sunset) };
}

function DialMedia({
  hour,
  smooth,
  anchors,
  timeLabel,
}: {
  hour: number;
  smooth: MotionValue<number>;
  anchors: SunAnchors;
  timeLabel: string;
}) {
  const stops = gradeStops(anchors);
  const hours = stops.map((stop) => stop.hour);
  const tint = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.tint),
  );
  const brightness = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.brightness),
  );
  const saturate = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.saturate),
  );
  const moon = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.moon),
  );
  const sepia = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.sepia),
  );
  const hue = useTransform(
    smooth,
    hours,
    stops.map((stop) => stop.hue),
  );
  const filter = useMotionTemplate`brightness(${brightness}) saturate(${saturate}) sepia(${sepia}) hue-rotate(${hue}deg)`;
  const phase = phaseAt(hour, anchors);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-[#0b0e15] sm:aspect-[16/10]">
      {DIAL_PHOTO && (
        <motion.div className="absolute inset-0" style={{ filter }}>
          <CommonsImage
            photo={DIAL_PHOTO}
            alt="The Taj Mahal, recoloured to match the chosen time of day"
            sizes={`${DESKTOP_MEDIA_QUERY} 66vw, 100vw`}
          />
        </motion.div>
      )}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: tint }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: moon,
          background:
            "radial-gradient(circle at 80% 15%, #f4f6ff 0 2.2%, rgb(235 240 255 / 0.28) 2.5%, transparent 20%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-20 text-white sm:p-6 sm:pt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-5xl leading-none tracking-tight tabular-nums sm:text-6xl">
              {timeLabel}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-2 text-lg font-semibold"
              >
                {phase.name}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm backdrop-blur-sm">
            <Users size={16} weight="bold" aria-hidden="true" />
            {phase.crowd}
          </span>
        </div>
      </div>
    </div>
  );
}

function DialTrack({
  hour,
  smooth,
  anchors,
  nowHour,
  onChange,
  valueText,
}: {
  hour: number;
  smooth: MotionValue<number>;
  anchors: SunAnchors;
  nowHour: number | null;
  onChange: (hour: number) => void;
  valueText: string;
}) {
  const thumbX = useTransform(smooth, [DIAL_START_HOUR, DIAL_END_HOUR], ["0%", "100%"]);
  const markerY = useTransform(smooth, (h) => {
    const value = crowdAt(h);
    return ((value === null ? 100 : curveY(value)) / 100) * DIAL_TRACK_HEIGHT_PX;
  });
  const markerOpacity = useTransform(smooth, (h) => (crowdAt(h) === null ? 0 : 1));

  const closedSpans = useMemo(() => {
    const spans: [number, number][] = [];
    for (let i = 0; i < CROWD_CURVE.length - 1; i++) {
      const a = CROWD_CURVE[i];
      const b = CROWD_CURVE[i + 1];
      if (a.value === null && b.value === null) spans.push([a.hour, b.hour]);
      else if (a.value === null && i === 0) spans.push([a.hour, b.hour]);
    }
    return spans;
  }, []);

  const markers = [
    { hour: anchors.sunrise, label: "Sunrise" },
    { hour: anchors.sunset, label: "Sunset" },
    ...(nowHour !== null ? [{ hour: nowHour, label: "Now" }] : []),
  ];

  return (
    <div className="-mx-4 mt-6 overflow-x-clip px-4 select-none sm:-mx-6 sm:px-6">
      <div className="relative" style={{ height: DIAL_TRACK_HEIGHT_PX }}>
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <pattern
              id="closed-hatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="var(--line)" strokeWidth="3" />
            </pattern>
          </defs>
          {closedSpans.map(([from, to]) => (
            <rect
              key={from}
              x={toPercent(from) * 10}
              width={(toPercent(to) - toPercent(from)) * 10}
              y={58}
              height={42}
              fill="url(#closed-hatch)"
            />
          ))}
          {PATHS.map((path, index) => (
            <g key={index}>
              <path d={path.area} fill="var(--accent-soft)" />
              <path
                d={path.line}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
          <line
            x1="0"
            x2="1000"
            y1="100"
            y2="100"
            stroke="var(--line)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {markers.map((marker) => (
          <div
            key={marker.label}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${toPercent(marker.hour)}%` }}
          >
            <span
              className={cn(
                "-mt-6 rounded-full px-1.5 font-mono text-[10px] leading-4 whitespace-nowrap",
                marker.label === "Now" ? "bg-ink text-bg" : "text-ink-3",
              )}
            >
              {marker.label}
            </span>
            <span
              className={cn("w-px flex-1", marker.label === "Now" ? "bg-ink" : "bg-ink-3/40")}
            />
          </div>
        ))}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ x: thumbX }}
        >
          <span className="absolute top-0 bottom-0 left-0 w-0.5 -translate-x-1/2 rounded-full bg-ink" />
          <motion.span
            className="absolute top-0 left-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-accent bg-surface shadow-card"
            style={{ y: markerY, opacity: markerOpacity }}
          />
          <span className="absolute top-full left-0 mt-1.5 grid size-7 -translate-x-1/2 place-items-center rounded-full bg-ink text-bg shadow-card">
            <Clock size={14} weight="bold" />
          </span>
        </motion.div>

        <input
          type="range"
          min={DIAL_START_HOUR}
          max={DIAL_END_HOUR}
          step={DIAL_STEP_HOURS}
          value={hour}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label="Time of day at the Taj Mahal"
          aria-valuetext={valueText}
          className="dial-range peer absolute inset-0 h-full w-full"
        />
        <span className="pointer-events-none absolute -inset-2 rounded-tile ring-2 ring-accent opacity-0 peer-focus-visible:opacity-100" />
      </div>

      <div className="relative mt-11 h-4" aria-hidden="true">
        {DIAL_HOUR_LABELS.map((label) => (
          <span
            key={label}
            className="absolute -translate-x-1/2 font-mono text-[11px] text-ink-3"
            style={{ left: `${toPercent(label)}%` }}
          >
            {formatDecimalHour(label)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LightDial() {
  const now = useNow();
  // Same Agra calendar day always gives the same anchors, so children keyed on them stay mounted
  const anchors = now ? anchorsFor(now) : DEFAULT_SUN_ANCHORS;

  const [hour, setHour] = useState<number>(DEFAULT_SUN_ANCHORS.sunrise + DIAL_STEP_HOURS);
  const target = useMotionValue(hour);
  const smooth = useSpring(target, { stiffness: 170, damping: 26, mass: 0.6 });

  useEffect(() => {
    target.set(hour);
  }, [hour, target]);

  const phase = phaseAt(hour, anchors);
  const timeLabel = formatDecimalHour(hour);
  const nowHour = useMemo(() => {
    if (!now) return null;
    const h = istHour(now);
    const wrapped = h < DIAL_START_HOUR ? h + 24 : h;
    return wrapped <= DIAL_END_HOUR ? wrapped : null;
  }, [now]);

  const snap = (value: number) =>
    Math.min(
      DIAL_END_HOUR,
      Math.max(DIAL_START_HOUR, Math.round(value / DIAL_STEP_HOURS) * DIAL_STEP_HOURS),
    );

  return (
    <section id="light" aria-labelledby="light-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="light"
          title="Pick your hour at the Taj"
          intro="Drag through the day to see how the marble, the crowds and the best way in change. Sunrise and sunset follow today's real times in Agra."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <DialMedia
              key={`${anchors.sunrise}-${anchors.sunset}`}
              hour={hour}
              smooth={smooth}
              anchors={anchors}
              timeLabel={timeLabel}
            />
            <div className="px-1 pt-6">
              <DialTrack
                key={`track-${anchors.sunrise}`}
                hour={hour}
                smooth={smooth}
                anchors={anchors}
                nowHour={nowHour}
                onChange={setHour}
                valueText={`${timeLabel}, ${phase.name}, crowds ${phase.crowd.toLowerCase()}`}
              />
            </div>
            <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {nowHour !== null && (
                <button
                  type="button"
                  onClick={() => setHour(snap(nowHour))}
                  className="min-h-10 shrink-0 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-transform active:scale-95"
                >
                  Right now
                </button>
              )}
              {DIAL_QUICK_JUMPS.map((jump) => (
                <button
                  key={jump.label}
                  type="button"
                  onClick={() => setHour(snap(jump.hour(anchors)))}
                  className="min-h-10 shrink-0 rounded-full border border-line px-4 text-sm font-medium text-ink-2 transition-[transform,color,border-color] hover:border-ink-3 hover:text-ink active:scale-95"
                >
                  {jump.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-3">
              The crowd curve is a typical pattern estimated from visitor reports, not live data.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <h3 className="text-2xl font-semibold sm:text-3xl">{phase.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-2">{phase.light}</p>

                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div className="flex gap-3">
                      <DoorOpen
                        size={22}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-sm font-semibold">Best way in</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">
                          {phase.gate}
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Lightbulb
                        size={22}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-sm font-semibold">Tip</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{phase.tip}</dd>
                      </div>
                    </div>
                  </dl>

                  <ul className="mt-6 space-y-2.5">
                    {phase.perks.map((perk) => (
                      <li key={perk} className="flex gap-2.5 text-[15px] text-ink-2">
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
