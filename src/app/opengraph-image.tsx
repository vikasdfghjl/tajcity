import { ImageResponse } from "next/og";
import { BRAND_COLORS, SHARE_IMAGE_SIZE, SITE_DESCRIPTION_SHORT } from "@/config/constants";
import { TajGlyph } from "@/lib/brand";

export const alt =
  "Taj City: live Taj Mahal status, the best hour to visit, where to eat and a day plan";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

// Type-led on purpose: no photo licence to carry into every share preview
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: BRAND_COLORS.marble,
        color: BRAND_COLORS.ink,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: 999,
            background: BRAND_COLORS.accent,
            color: BRAND_COLORS.marble,
            fontSize: 26,
          }}
        >
          Agra visitor companion
        </div>
        <div style={{ marginTop: 36, fontSize: 132, letterSpacing: -5, lineHeight: 1 }}>
          Taj City
        </div>
        <div style={{ marginTop: 16, fontSize: 52, color: BRAND_COLORS.ink2, letterSpacing: -1 }}>
          Agra, timed right.
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: BRAND_COLORS.ink2, lineHeight: 1.4 }}>
          {SITE_DESCRIPTION_SHORT}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 340,
          height: 340,
          borderRadius: 72,
          background: BRAND_COLORS.accent,
        }}
      >
        <TajGlyph size={230} color={BRAND_COLORS.marble} />
      </div>
    </div>,
    size,
  );
}
