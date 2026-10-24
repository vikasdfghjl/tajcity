import { ImageResponse } from "next/og";
import { APPLE_ICON_SIZE } from "@/config/constants";
import { AppIcon } from "@/lib/brand";

export const size = { width: APPLE_ICON_SIZE, height: APPLE_ICON_SIZE };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<AppIcon size={APPLE_ICON_SIZE} />, size);
}
