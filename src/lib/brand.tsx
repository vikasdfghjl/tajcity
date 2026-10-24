import { BRAND_COLORS } from "@/config/constants";

/**
 * The Taj outline used by the generated app icons and share image (next/og). Drawn on a
 * 100-unit grid: platform, hall, onion dome with finial, two chhatris and two minarets.
 */

export function TajGlyph({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      {/* Shapes overlap by a unit so no hairline seams show where they meet */}
      <rect x="8" y="82" width="84" height="6" rx="1" />
      <rect x="27" y="56" width="46" height="27" />
      <rect x="38" y="48" width="24" height="9" />
      <path d="M37 49 C33 36 42 25 50 15 C58 25 67 36 63 49 Z" />
      <rect x="49.1" y="6" width="1.8" height="11" />
      <path d="M27 57 C26 50 29 46 32 44 C35 46 38 50 37 57 Z" />
      <path d="M63 57 C62 50 65 46 68 44 C71 46 74 50 73 57 Z" />
      <rect x="13" y="41" width="5" height="42" />
      <rect x="82" y="41" width="5" height="42" />
      <path d="M12 42 C12 37 15 35 15.5 33 C16 35 19 37 19 42 Z" />
      <path d="M81 42 C81 37 84 35 84.5 33 C85 35 88 37 88 42 Z" />
    </svg>
  );
}

/** Full-bleed square icon; the glyph stays inside the maskable safe zone. */
export function AppIcon({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_COLORS.accent,
      }}
    >
      <TajGlyph size={Math.round(size * 0.58)} color={BRAND_COLORS.marble} />
    </div>
  );
}
