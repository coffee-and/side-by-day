# Diary workspace specification

## Product hierarchy

- `MY DIARY` is the default, complete local personal workspace.
- `TOGETHER DIARY` uses the same `Space`, event, to-do, memo, and D-Day models.
- `TOGETHER DIARY` and `+ INVITE` remain visible as `COMING LATER`; no remote members or invitations are simulated.
- Stored ownership uses `Space.kind: "personal" | "shared"` and `spaceId`, never visible labels.

## Responsive information architecture

Breakpoints: mobile `<768px`, tablet `768–1199px`, desktop `≥1200px`.

Mobile:

```text
SIDE BY DAY             MY DIARY  ◐
───────────────────────────────────
DATE / D-DAY / EVENTS / TO DO / NOTES
                         [+]
───────────────────────────────────
TODAY | CALENDAR | TO DO | NOTES
```

The calendar continues directly from month controls and grid into lunar/Korean date facts and the complete selected-date agenda.

Tablet:

```text
┌──────────────────────┬─────────────────┐
│ MONTH / ACTIVE VIEW  │ SELECTED DATE   │
│                      │ EVENTS / TO DO  │
├──────────────────────┴─────────────────┤
│ D-DAY                 │ PINNED NOTES   │
└────────────────────────────────────────┘
```

The primary/detail split is approximately 58/42.

Desktop:

```text
┌──────────────┬──────────────────────┬──────────────────┐
│ SIDE BY DAY  │ ACTIVE VIEW / MONTH  │ SELECTED DATE    │
│ MY DIARY     │                      │ EVENTS           │
│ NAVIGATION   │                      │ TO DO            │
│ TOGETHER     │                      │ LINKED NOTES     │
│ + INVITE     │                      │ D-DAY            │
└──────────────┴──────────────────────┴──────────────────┘
```

Sidebar: `210px`. Detail panel: `370px`. The calendar center consumes remaining width.

## Shape and theme rules

- Default radius is `0` for panels, cards, events, inputs, buttons, navigation, tabs, and selectors.
- Hierarchy comes from straight dividers, rectangular fills, grid alignment, typography, spacing, and square checkboxes.
- No floating rounded navigation, pills, blur, large shadows, circular selected dates, or left event accent rules.
- Themes are only `light | dark`; one icon button toggles them.

## Event appearance and palette

`EventAppearance` stores only `variant`, `accentColor`, and optional `textColor`.

- `underline`: vivid accent used as a straight 2–3px bottom rule; no fill, outer border, or left rule.
- `fill`: centralized pale tint with a dark same-family text color; no border or radius.

Default accent sequence:

```text
#FFFF66 #FC6E22 #FF1493 #C24CF6
#FFACFC #F148FB #7122FA #560A86
#BDBDFD #BC75F9 #535EEB #00218A
```

Exact accent/fill/text triplets live in `src/features/events/eventPalette.ts`.

## Retained functionality

- Month movement and today action
- Month and year overview selection
- Korean holidays, commemorations, substitute holidays, and supported-range messaging
- Korean lunar date and gapja
- Month-cell event overflow represented by `…`
- Light/dark persistence and keyboard focus styling

## Local and deferred functionality

Local state provides persistent CRUD for events, to-dos, notes, and D-Day counters, including completion, pinning, linked dates, appearance, and repeat/alert/important readiness.

Deferred server work: database, login, cloud sync, friend invitation, shared permissions, and notifications.
