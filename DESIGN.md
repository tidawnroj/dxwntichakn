# Design Guidelines

## Color Strategy
**Committed**: A prominent use of the university's theme color carrying the aesthetic, ensuring it is bold and memorable.

## Colors
- **Default (PRC)**: Deep Royal Blue (`#0f4c81` / OKLCH `45% 0.12 260`) and Crisp White.
- **Chulalongkorn**: Phra Kiao Pink (`#ffb6c1` / OKLCH `80% 0.1 350`)
- **CMU (Chiang Mai University)**: Ang Kaew Purple (`#5e2a84` / OKLCH `35% 0.13 310`)
- **Mahidol**: Navy Blue (`#00246B` / OKLCH `25% 0.1 265`) and Gold (`#CAD284` / OKLCH `80% 0.1 110`)
- **Ladkrabang (KMITL)**: Orange (`#f05a28` / OKLCH `60% 0.18 40`) and Red (`#e60000` / OKLCH `50% 0.22 30`)

*Note: The implementation will use CSS Variables for these theme tokens.*

## Typography
- **Heading Font**: A bold, modern sans-serif like `Inter`, `Outfit`, or `Clash Display`.
- **Body Font**: A clean, legible sans-serif.
- **Scale**: Strong contrast between headings and body text (≥1.25 ratio).

## Styling & Layout
- **Theme**: Light mode base, with heavy use of the primary color for the hero section and accents.
- **Spacing**: Generous, rhythmic spacing. Avoid cramped UI.
- **Components**: No basic cards. Use interesting grids, typographic emphasis, and soft shadows or borders for separation.
- **Motion**: Smooth, exponential ease-out transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) for theme switching and hover states. No elastic bounces.

## Constraints
- **NO INLINE CSS OR JS**. Everything must be separated into `style.css` and `script.js`.
- Vanilla HTML/CSS/JS only.
