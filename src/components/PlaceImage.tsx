import React from "react";
import Image from "next/image";
import { PlaceItem } from "@/data/agraData";

const FALLBACK_ICONS: Record<PlaceItem["category"], string> = {
  monument: "🏛️",
  food: "🍲",
  craft: "💎",
  gem: "💎",
};

// Fills its positioned parent. Places without a photo of their own get a styled
// placeholder rather than a photo of somewhere else.
export function PlaceImage({ place, sizes }: { place: PlaceItem; sizes: string }) {
  if (place.image) {
    return (
      <Image
        src={place.image}
        alt={place.name}
        fill
        sizes={sizes}
        style={{
          objectFit: "cover",
          transition: "transform 0.4s ease",
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${place.name} (photo not available)`}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.35rem",
        background:
          "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 55%), linear-gradient(135deg, #7a3a1f 0%, #6b4a14 100%)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "2.4rem", opacity: 0.9 }}>
        {FALLBACK_ICONS[place.category]}
      </span>
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.85)",
        }}
      >
        {place.hindiName}
      </span>
    </div>
  );
}
