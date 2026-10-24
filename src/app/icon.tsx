import { ImageResponse } from "next/og";
import { APP_ICON_SIZES } from "@/config/constants";
import { AppIcon } from "@/lib/brand";

// Served at /icon/192 and /icon/512, which the web manifest points to
export function generateImageMetadata() {
  return APP_ICON_SIZES.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  return new ImageResponse(<AppIcon size={size} />, { width: size, height: size });
}
