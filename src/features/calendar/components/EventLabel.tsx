import type { CSSProperties } from 'react';
import type { CalendarEvent, EventAppearance } from '../../../types';

const DEFAULT_VARIANT = 'underline';

type EventAppearanceStyle = CSSProperties & {
  '--event-accent-color'?: string;
  '--event-text-color'?: string;
  '--event-radius'?: string;
};

function clampRadius(value: number) {
  return Math.min(Math.max(value, 0), 24);
}

export function getEventAppearanceClassName(appearance?: EventAppearance) {
  return `event-appearance--${appearance?.variant ?? DEFAULT_VARIANT}`;
}

export function getEventAppearanceStyle(appearance?: EventAppearance): EventAppearanceStyle {
  if (!appearance) {
    return {};
  }

  const style: EventAppearanceStyle = {
    '--event-accent-color': appearance.accentColor,
  };

  if (appearance.textColor) {
    style['--event-text-color'] = appearance.textColor;
  }
  if (appearance.borderRadius !== undefined) {
    style['--event-radius'] = `${clampRadius(appearance.borderRadius)}px`;
  }

  return style;
}

interface EventLabelProps {
  event: CalendarEvent;
}

export function EventLabel({ event }: EventLabelProps) {
  return (
    <span
      className={`event-label event-label--${event.owner} ${getEventAppearanceClassName(event.appearance)}`}
      style={getEventAppearanceStyle(event.appearance)}
      title={event.title}
    >
      <i className="event-label__owner" aria-hidden="true" />
      <span className="event-label__title">{event.title}</span>
    </span>
  );
}
