# PrepMate Design System

## Color Palette

### Primary Colors
- **Primary**: `hsl(217, 91%, 60%)` - Main brand color (blue)
- **Primary Dark**: `hsl(217, 91%, 50%)` - Hover states
- **Primary Light**: `hsl(217, 91%, 70%)` - Light variants

### Background & Surface
- **Background**: `hsl(0, 0%, 100%)` (light) / `hsl(222.2, 84%, 4.9%)` (dark)
- **Card**: `hsl(0, 0%, 100%)` (light) / `hsl(222.2, 84%, 4.9%)` (dark)
- **Foreground**: `hsl(222.2, 84%, 4.9%)` (light) / `hsl(210, 40%, 98%)` (dark)

### Secondary Colors
- **Secondary**: `hsl(210, 40%, 96.1%)` (light) / `hsl(217.2, 32.6%, 17.5%)` (dark)
- **Muted**: `hsl(210, 40%, 96.1%)` (light) / `hsl(217.2, 32.6%, 17.5%)` (dark)
- **Muted Foreground**: `hsl(215.4, 16.3%, 46.9%)` (light) / `hsl(215, 20.2%, 65.1%)` (dark)

### Border & Input
- **Border**: `hsl(214.3, 31.8%, 91.4%)` (light) / `hsl(217.2, 32.6%, 17.5%)` (dark)
- **Input**: `hsl(214.3, 31.8%, 91.4%)` (light) / `hsl(217.2, 32.6%, 17.5%)` (dark)
- **Ring**: `hsl(217, 91%, 60%)` - Focus ring color

## Typography

### Font Family
- **Sans**: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)

### Font Sizes
- **Hero Title**: `text-4xl sm:text-5xl lg:text-6xl` (2.25rem - 3.75rem)
- **Section Title**: `text-xl sm:text-2xl` (1.25rem - 1.5rem)
- **Body**: `text-base sm:text-lg` (1rem - 1.125rem)
- **Small**: `text-sm` (0.875rem)
- **Extra Small**: `text-xs` (0.75rem)

### Font Weights
- **Bold**: `font-bold` (700) - Hero titles
- **Semibold**: `font-semibold` (600) - Section titles, card titles
- **Medium**: `font-medium` (500) - Navigation, buttons
- **Regular**: Default (400) - Body text

## Spacing

### Container Padding
- **Mobile**: `px-4` (1rem / 16px)
- **Tablet**: `px-6` (1.5rem / 24px)
- **Desktop**: `px-8` (2rem / 32px)

### Section Spacing
- **Vertical Padding**: `py-12 sm:py-16 lg:py-20` (3rem - 5rem)
- **Card Gap**: `gap-6 sm:gap-8` (1.5rem - 2rem)
- **Element Gap**: `gap-2`, `gap-4`, `gap-6` (0.5rem - 1.5rem)

## Border Radius
- **Default**: `0.5rem` (8px)
- **Large**: `var(--radius)` (0.5rem)
- **Medium**: `calc(var(--radius) - 2px)` (6px)
- **Small**: `calc(var(--radius) - 4px)` (4px)

## Components

### Navigation
- Height: `h-16` (4rem)
- Background: `bg-card/95` with backdrop blur
- Border: Bottom border with `border-border`

### Cards
- Background: `bg-card`
- Border: `border border-border`
- Padding: `p-6 sm:p-8`
- Hover: `hover:shadow-lg transition-shadow`
- Border Radius: `rounded-lg`

### Buttons
- Primary: `bg-primary text-white` with `hover:bg-primary-dark`
- Padding: `px-6 py-3`
- Border Radius: `rounded-md`
- Font: `font-medium`

### Inputs
- Border: `border border-input`
- Background: `bg-background`
- Padding: `px-4 py-2`
- Focus: `focus:ring-2 focus:ring-ring`

## Responsive Breakpoints
- **sm**: 640px (mobile landscape, small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)

## Icons & Emojis
- **Brand Icon**: 🦉 (owl emoji)
- **Feature Icons**: 🦉, 📊, 📈

## Shadows
- **Card Hover**: `shadow-lg` (elevated shadow on hover)

## Transitions
- **Colors**: `transition-colors` (smooth color changes)
- **Shadows**: `transition-shadow` (smooth shadow changes)

