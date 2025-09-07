# Color Audit - Non-Palette Colors

This document tracks all colors used outside the official ColorHunt theme palettes.

## Theme Palette References
- **Light theme**: https://colorhunt.co/palette/f8fafcd9eafdbcccdc9aa6b2 (#F8FAFC, #D9EAFD, #BCCCDC, #9AA6B2)
- **Dark theme**: https://colorhunt.co/palette/181c143c3d37697565ecdfcc (#181C14, #3C3D37, #697565, #ECDFCC)

## Non-Palette Colors Found

### 1. theme-variables.css
- `#1A1A1A` (text-primary) - **Reason**: Need very dark text for contrast on light backgrounds - **Replace with**: Keep as is (needed for accessibility)
- `#7A8490` (primary-hover) - **Reason**: Calculated darker variant of #9AA6B2 - **Replace with**: Use #BCCCDC (3rd palette color)
- `#6B7481` (primary-dark) - **Reason**: Even darker variant for depth - **Replace with**: Use #9AA6B2 (4th palette color)
- `#10B981` (success) - **Reason**: Green for success states - **Replace with**: Use #697565 (dark theme 3rd color) or keep for accessibility
- `#F59E0B` (warning) - **Reason**: Orange for warning states - **Replace with**: Use #ECDFCC (dark theme 4th color) or keep for accessibility
- `#EF4444` (danger) - **Reason**: Red for error states - **Replace with**: Use #9AA6B2 (light theme 4th color) or keep for accessibility

### 2. PrivateSite.css
- `rgb(59, 130, 246)` (blue) - **Reason**: Primary action color for buttons/links - **Replace with**: `var(--sitamco-primary)` (#9AA6B2)
- `rgb(37, 99, 235)` (darker blue) - **Reason**: Gradient variation of blue - **Replace with**: `var(--sitamco-border-medium)` (#BCCCDC)
- `rgb(29, 78, 216)` (darkest blue) - **Reason**: Even darker gradient - **Replace with**: `var(--sitamco-text-secondary)` (#9AA6B2)
- `rgb(34, 197, 94)` (green) - **Reason**: Success/positive actions - **Replace with**: `var(--sitamco-primary)` (#9AA6B2)
- `rgb(239, 68, 68)` (red) - **Reason**: Danger/logout actions - **Replace with**: `var(--sitamco-text-secondary)` (#9AA6B2)
- `rgb(156, 163, 175)` (gray) - **Reason**: Subtle borders - **Replace with**: `var(--sitamco-border-medium)` (#BCCCDC)

### 3. Menu.css
- Same colors as PrivateSite.css - **Same reasons and replacements as above**

### 4. LoadingSpinner.css
- `rgb(59, 130, 246)` (blue) - **Reason**: Primary spinner color - **Replace with**: `var(--sitamco-primary)` (#9AA6B2)
- `rgb(156, 163, 175)` (gray) - **Reason**: Secondary spinner color - **Replace with**: `var(--sitamco-border-medium)` (#BCCCDC)
- `rgb(107, 114, 128)` (darker gray) - **Reason**: Muted spinner color - **Replace with**: `var(--sitamco-text-secondary)` (#9AA6B2)

### 5. Login.css
- `rgba(239, 68, 68, ...)` (red variants) - **Reason**: Error message styling - **Replace with**: `var(--sitamco-text-secondary)` with opacity (#9AA6B2)

### 6. index.css
- `rgba(59, 130, 246, 0.1)` (blue with transparency) - **Reason**: Focus ring color - **Replace with**: `var(--sitamco-focus-ring)` (already uses palette)

### 7. Miembros.jsx
- `rgba(0,0,0,0.15)` (black shadow) - **Reason**: Box shadow for table header - **Replace with**: Keep (neutral shadow, not a theme color)

## Notes
- Status colors (success/warning/danger) might need to stay for accessibility and universal recognition
- All interactive elements should use the palette colors
- Shadow colors can remain neutral (black with opacity)
- Text colors may need high contrast values for accessibility compliance