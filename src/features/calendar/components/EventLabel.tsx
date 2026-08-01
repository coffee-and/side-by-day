import type { CSSProperties } from 'react';
import type { CalendarEvent, EventAppearance } from '../../../types';
import { getEventColorToken } from '../../events/eventPalette';

const DEFAULT_VARIANT = 'underline';

type EventAppearanceStyle = CSSProperties & {
  '--event-accent-color'?: string;
  '--event-fill-color'?: string;
  '--event-text-color'?: string;
};

export function getEventAppearanceClassName(appearance?: EventAppearance) {
  return `event-appearance--${appearance?.variant ?? DEFAULT_VARIANT}`;
}

export function getEventAppearanceStyle(appearance?: EventAppearance): EventAppearanceStyle {
  if (!appearance) {
    return {};
  }

  const token = getEventColorToken(appearance.accentColor);
  const style: EventAppearanceStyle = {
    '--event-accent-color': token.accent,
    '--event-fill-color': token.fill,
    '--event-text-color': appearance.textColor ?? token.text,
  };

  return style;
}

interface EventLabelProps {
  event: CalendarEvent;
}

export function EventLabel({ event }: EventLabelProps) {
  return (
    <span
      className={`event-label ${getEventAppearanceClassName(event.appearance)}`}
      style={getEventAppearanceStyle(event.appearance)}
      title={event.title}
    >
      <span className="event-label__title">{event.title}</span>
    </span>
  );
}
