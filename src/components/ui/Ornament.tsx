type OrnamentProps = {
  className?: string;
  /** Total bredd; höjden är 8 px. */
  width?: number;
  /** Glyph i mitten — diamond passar diskret editorial känsla. */
  glyph?: "diamond" | "dot" | "leaf";
};

/**
 * Tunn dekorativ avdelare: två hairlines med en liten glyph i mitten.
 * Renderas i `currentColor` så den ärver text-färgen från föräldern,
 * t.ex. `text-primary` eller `text-foreground/30`.
 */
export const Ornament = ({ className, width = 96, glyph = "diamond" }: OrnamentProps) => {
  const half = (width - 14) / 2;

  return (
    <span
      className={["inline-flex items-center justify-center", className].filter(Boolean).join(" ")}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        width={width}
        height={8}
        viewBox={`0 0 ${width} 8`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <line x1="0" y1="4" x2={half} y2="4" stroke="currentColor" strokeWidth="1" />
        <line x1={width - half} y1="4" x2={width} y2="4" stroke="currentColor" strokeWidth="1" />
        {glyph === "diamond" && (
          <path
            d={`M ${width / 2} 1 L ${width / 2 + 3.5} 4 L ${width / 2} 7 L ${width / 2 - 3.5} 4 Z`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        )}
        {glyph === "dot" && (
          <circle cx={width / 2} cy={4} r={2} fill="currentColor" />
        )}
        {glyph === "leaf" && (
          <path
            d={`M ${width / 2 - 5} 4 Q ${width / 2} 0 ${width / 2 + 5} 4 Q ${width / 2} 8 ${width / 2 - 5} 4 Z`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        )}
      </svg>
    </span>
  );
};

export default Ornament;
