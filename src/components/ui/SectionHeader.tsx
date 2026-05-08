import { cn } from "@/lib/utils";
import { Ornament } from "@/components/ui/Ornament";

type SectionHeaderProps = {
  eyebrow?: string;
  /** Stor del av rubriken (Cormorant). */
  title: string;
  /** Italic-accent som visas inline efter `title`, ny rad på desktop. */
  accent?: string;
  /** Kort beskrivande text under rubriken. */
  lead?: string;
  align?: "left" | "center";
  /** Visas mellan eyebrow och rubrik. */
  ornament?: boolean;
  className?: string;
  /** Använd `lg` för stora hero-rubriker, `md` för sektioner. Default `lg`. */
  size?: "lg" | "md";
};

/**
 * Konsekvent editorial sektion-rubrik:
 *   eyebrow → ornament → Cormorant heading (med valfri italic-accent) → lead
 */
export const SectionHeader = ({
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  ornament = true,
  className,
  size = "lg",
}: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      {ornament && (
        <Ornament
          className="text-foreground/30"
          width={isCenter ? 96 : 72}
          glyph="diamond"
        />
      )}

      <h2
        className={cn(
          size === "lg" ? "heading-lg" : "heading-md",
          "text-balance max-w-[28ch]",
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className="font-serif italic font-normal text-primary/85">
              {accent}
            </em>
          </>
        )}
      </h2>

      {lead && (
        <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed max-w-[58ch]">
          {lead}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
