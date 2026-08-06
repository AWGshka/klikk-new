type TickerProps = { items: string[] };

/**
 * The v2 orange marquee. The item list is rendered twice so the -50% keyframe
 * wraps seamlessly; the animation is disabled under prefers-reduced-motion in
 * globals.css, which leaves the first copy legible and static.
 */
export function Ticker({ items }: TickerProps) {
  if (items.length === 0) return null;
  const line = `${items.join("  ◢  ")}  ◢  `;

  return (
    <div className="ticker page-container">
      <div className="ticker-track">
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
