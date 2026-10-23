import { COMMONS_WIDTHS, FALLBACK_IMAGE_WIDTH } from "@/config/constants";
import { cn } from "@/lib/cn";
import type { Photo } from "@/data/places";

export function photoUrl(photo: Photo, width: number): string {
  const bucket =
    COMMONS_WIDTHS.find((candidate) => candidate >= width && candidate < photo.width) ??
    COMMONS_WIDTHS.filter((candidate) => candidate < photo.width).at(-1) ??
    COMMONS_WIDTHS[0];
  return `${photo.base}/${bucket}px-${photo.file}`;
}

interface CommonsImageProps {
  photo: Photo;
  alt: string;
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high fetch priority */
  priority?: boolean;
}

/**
 * Responsive image served straight from Commons' CDN at its standard sizes.
 * next/image is skipped here because its optimizer would re-request arbitrary widths.
 */
export function CommonsImage({ photo, alt, sizes, className, priority }: CommonsImageProps) {
  const srcSet = COMMONS_WIDTHS.filter((width) => width < photo.width)
    .map((width) => `${photo.base}/${width}px-${photo.file} ${width}w`)
    .join(", ");

  return (
    // oxlint-disable-next-line nextjs/no-img-element -- Commons CDN sizes, see note above
    <img
      src={photoUrl(photo, FALLBACK_IMAGE_WIDTH)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className={cn("h-full w-full object-cover", className)}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
