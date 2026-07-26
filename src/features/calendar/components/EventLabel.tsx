import type { CSSProperties } from 'react';
import type { CalendarEvent, EventAppearance } from '../../../types';

function clampRadius(value: number) {
  return Math.min(Math.max(value, 0), 999);
}

export function getEventAppearanceStyle(appearance?: EventAppearance): CSSProperties {
  if (!appearance) {
    return {};
  }

  const style: CSSProperties = {};

  if (appearance.backgroundColor) {
    style.backgroundColor = appearance.backgroundColor;
  }
  if (appearance.textColor) {
    style.color = appearance.textColor;
  }
  if (appearance.borderColor) {
    style.borderColor = appearance.borderColor;
  }
  if (appearance.borderStyle) {
    style.borderStyle = appearance.borderStyle;
  }
  if (appearance.borderStyle === 'none') {
    style.borderWidth = 0;
  }
  if (appearance.borderRadius !== undefined) {
    style.borderRadius = `${clampRadius(appearance.borderRadius)}px`;
  }
  if (appearance.fontWeight) {
    style.fontWeight = appearance.fontWeight;
  }

  return style;
}

interface EventLabelProps {
  event: CalendarEvent;
}

export function EventLabel({ event }: EventLabelProps) {
  return (
    <span
      className={`event-label event-label--${event.owner}`}
      style={getEventAppearanceStyle(event.appearance)}
      title={event.title}
    >
      <i className="event-label__owner" aria-hidden="true" />
      <span className="event-label__title">{event.title}</span>
    </span>
  );
}
