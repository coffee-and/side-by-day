export interface EventColorToken {
  accent: string;
  fill: string;
  text: string;
}

export const EVENT_COLOR_TOKENS: readonly EventColorToken[] = [
  { accent: '#FFFF66', fill: '#FFFBD6', text: '#625B00' },
  { accent: '#FC6E22', fill: '#FFE2D2', text: '#83350C' },
  { accent: '#FF1493', fill: '#FFD5EA', text: '#8A0B4E' },
  { accent: '#C24CF6', fill: '#EFD7FC', text: '#692080' },
  { accent: '#FFACFC', fill: '#FFE8FE', text: '#873C84' },
  { accent: '#F148FB', fill: '#FAD8FE', text: '#821D88' },
  { accent: '#7122FA', fill: '#E4D6FE', text: '#451393' },
  { accent: '#560A86', fill: '#E8D9F1', text: '#560A86' },
  { accent: '#BDBDFD', fill: '#F0F0FF', text: '#55558F' },
  { accent: '#BC75F9', fill: '#EEDDFE', text: '#693A96' },
  { accent: '#535EEB', fill: '#DCE0FF', text: '#29318F' },
  { accent: '#00218A', fill: '#D9E3FF', text: '#00218A' },
] as const;

export const DEFAULT_EVENT_COLOR = EVENT_COLOR_TOKENS[2];

export function getEventColorToken(accentColor?: string) {
  return EVENT_COLOR_TOKENS.find((token) => token.accent === accentColor)
    ?? DEFAULT_EVENT_COLOR;
}
