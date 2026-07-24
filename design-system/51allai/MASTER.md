# 51ALLAI UI Design System

## Direction

- Product: Chinese AI technology news and long-form editorial site.
- Pattern: editorial magazine grid with a restrained Bento hierarchy.
- Tone: informed, current, precise, and approachable.
- Density: medium; prioritize scanability on feeds and readability in articles.
- Motion: subtle state transitions only. No decorative or blocking motion.

## Color tokens

| Token | Light | Dark |
| --- | --- | --- |
| Primary | `#7C3AED` | `#A78BFA` |
| Secondary | `#4F46E5` | `#818CF8` |
| Accent | `#DB2777` | `#F472B6` |
| Page | `#F7F5FC` | `#090D18` |
| Surface | `#FFFFFF` | `#111827` |
| Surface muted | `#F1EDFA` | `#182033` |
| Text | `#151226` | `#F8FAFC` |
| Text muted | `#625D72` | `#AEB8CC` |
| Border | `#E6E0F0` | `#293248` |
| Focus ring | `#7C3AED` | `#C4B5FD` |

## Typography

- Display and headings: system serif stack for an editorial voice without adding a render-blocking web font.
- Body and interface: local Roboto with Chinese system sans-serif fallback.
- Body: 16px minimum, 1.7 line height.
- Article measure: 68–72 characters per line.
- Type scale: 13, 14, 16, 18, 24, 32, 48.

## Layout

- Desktop container: 1280px maximum, 24px gutters.
- Main/sidebar split: fluid content plus a 296px editorial rail.
- Feed: one lead story followed by readable story cards.
- Article: narrower reading column with generous vertical rhythm.
- Breakpoints: 767px and 1023px, aligned with the existing theme.
- Spacing: 4/8px system; primary tiers are 8, 16, 24, 32, 48, 64.

## Components

- Navigation: sticky translucent surface, text labels, 44px controls, clear focus states.
- Cards: 20–24px radius, one-pixel border, low elevation, no heavy glass effects.
- Story cover: fixed aspect ratio to prevent layout shift, with image zoom limited to hover-capable devices.
- Tags: compact tinted pills with text labels; color is never the only signal.
- Buttons: 44px minimum height, visible hover, active, and focus-visible states.

## Accessibility and performance

- Maintain 4.5:1 body text contrast and visible 3px focus rings.
- Include a skip-to-content link and semantic buttons for icon controls.
- Do not hide focus outlines.
- Respect `prefers-reduced-motion`.
- Use lazy loading and explicit aspect ratios for feed imagery.
- Never rely on hover for primary actions.

## Avoid

- Cluttered dashboards, neon-on-black cyberpunk styling, excessive gradients, and decorative animation.
- Full-width long-form paragraphs.
- Tiny icon buttons, low-contrast gray text, emoji navigation icons, and layout-shifting hover effects.
