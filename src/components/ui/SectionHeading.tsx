import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: string;
}

export function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="mb-8 max-w-3xl lg:mb-12">
      <h2
        id={`${id}-title`}
        className="text-[2.15rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</p>
      )}
    </Reveal>
  );
}
