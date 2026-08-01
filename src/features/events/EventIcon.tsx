import type { CSSProperties } from 'react';
import { EVENT_ICON_BY_ID } from './eventIcons';

interface EventIconProps {
  iconId?: string;
  size?: number;
  className?: string;
  label?: string;
  style?: CSSProperties;
}

export function EventIcon({
  iconId,
  size = 18,
  className,
  label,
  style,
}: EventIconProps) {
  const definition = iconId ? EVENT_ICON_BY_ID.get(iconId) : undefined;
  if (!definition) return null;

  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      fill="none"
      height={size}
      role={label ? 'img' : undefined}
      style={style}
      viewBox="0 0 24 24"
      width={size}
    >
      {definition.paths.map((path) => (
        <path
          d={path}
          key={path}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {definition.circles?.map(([cx, cy, r]) => (
        <circle
          cx={cx}
          cy={cy}
          key={`${cx}-${cy}-${r}`}
          r={r}
          stroke="currentColor"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
