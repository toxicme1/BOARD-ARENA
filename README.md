# BOARD ARENA - Competitive Online Multiplayer Board Games

A premium React + TypeScript + Vite application for competitive board gaming, built with a sophisticated dark theme design system.

## Design System

**Colors (from Stitch + Obsidian specs):**
- Background: `#08090D` (near-black)
- Primary: `#8B5CF6` (electric purple)
- Tertiary: `#22C55E` (emerald green - success/online)
- Surface layers: Zinc-based grays (`#0c0c0f` → `#1e1e22`)
- Text: `#F5F6FA` (primary), `#A4A9B8` (secondary)

**Typography:** Geist (headline, display, body, label) + Geist Mono

**Spacing:** 8pt grid system
- Card radius: 16-20px
- Button radius: 12-16px
- Screen padding: 20-24px

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Card, Avatar, Badge)
│   ├── layout/       # Layout components (TopAppBar, BottomNavigation, ScreenLayout)
│   └── game/         # Game-specific components (GameCard)
├── screens/
│   ├── auth/         # Authentication screens
│   ├── main/         # Main app screens (Home, Games, Friends, Leaderboard, Profile)
│   ├── game/         # Game screens (GameDetail, PlayOnline, LiveGame)
│   └── admin/        # Admin dashboard screens
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── styles/           # Global styles
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
└── index.css         # Design system + Tailwind v4
```

## Implemented Screens (from 55-screen spec)

### ✅ Complete (Stitch-generated + React implementation)
1. **App Logo / Brand Identity** - Custom SVG favicon
2. **Splash Screen** - Animated loading with progress bar
3. **Loading Screen** - Tactical sync animation
4. **Welcome / Get Started** - Brand intro with CTAs
5. **Login Screen** - Email/password with remember me
6. **Create Account / Sign Up** - Full registration form
7. **Email Verification** - Code input screen
8. **Forgot Password** - Reset link request
9. **Reset Password** - New password form
10. **Account Recovery Confirmation** - Success state
11. **Home Screen** - Full dashboard with stats, hero, game grid
12. **All Games Screen** - Game browser with search
13. **Game Details Screen** - Game info + play buttons
14. **Notifications Screen** - Match invites, friend requests
15. **Play Online** - Quick match + find opponent
49. **Admin Login** - Secure admin authentication
50. **Admin Dashboard** - KPI cards, charts, match monitoring
52. **Tournament Management** - Tournament oversight

### 🔄 In Progress (Component structure ready)
16. **Finding an Opponent** - Matchmaking animation
17. **Opponent Found** - VS screen with both players
18. **Private Match** - Create/join with invitation codes
19. **Invite Friend** - Friends list with search
20. **Incoming Game Invitation** - Accept/decline modal
21. **Game Lobby** - Pre-match ready screen
22. **Select Game Mode** - Mode picker
23. **Match Rules** - Game-specific rules
24. **Player Confirmation** - Ready check
25. **Match Ready** - VS animation + start
26-31. **Live Game Boards** - 6 distinct implementations:
   - Chess (8×8 board, piece sprites, move validation)
   - LUDO (cross board, dice, tokens)
   - Checkers (8×8, kings, captures)
   - Tic-Tac-Toe (3×3, win detection)
   - Connect Four (7×6 vertical, gravity drop)
   - Connect Six (15×15 Gomoku)
32. **Winner Announcement** - Victory celebration
33. **Match Statistics** - Detailed breakdown
34. **Rematch Screen** - Request/wait/accept
35. **Match History** - Filterable list
36. **Global Leaderboard** - Top 3 podium + rankings
37. **Game-Specific Rankings** - Per-game leaderboards
38. **Player Statistics** - Performance charts
39. **My Profile** - Avatar, stats, badges, history
40. **Edit Profile** - Customization
41. **Public Player Profile** - View others + challenge
42. **Achievements & Badges** - Progress tracking
43. **Friends List** - Online status, invites
44. **Settings** - Account, notifications, sound, theme
45. **Account Security** - Password, sessions, 2FA
46. **Privacy Settings** - Visibility controls
47. **Help & Support** - FAQ, rules, contact
48. **About BOARD ARENA** - Version, legal, credits
51. **User Management** - Admin user table
53. **Match Monitoring** - Live match inspection
54. **Reports & Complaints** - Moderation queue
55. **Admin Settings** - Roles, permissions, audit log

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS v4 (PostCSS plugin)
- **Routing:** React Router v7
- **Linting:** oxlint + ESLint
- **Type Checking:** TypeScript strict mode
- **Icons:** Material Symbols Outlined (Google Fonts)
- **Fonts:** Geist + Geist Mono (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## GitHub Actions CI/CD

The repository includes a complete CI/CD pipeline (`.github/workflows/ci-cd.yml`):

1. **Lint & TypeCheck** - Runs on every push/PR
2. **Build** - Production build with artifact upload
3. **Deploy Preview** - Netlify preview for PRs
4. **Deploy Production** - Netlify production for main branch

Required secrets for deployment:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

## Design References

- **Stitch-generated screens:** `../stitch_board_arena_platform_design/`
- **Design tokens (Obsidian):** `../stitch_board_arena_platform_design/obsidian/DESIGN.md`
- **Master design prompt:** `../open serve.txt`

## Key Components

### UI Components (`src/components/ui/`)
- `Button` - Primary, secondary, ghost, icon variants
- `Input` / `Textarea` - Form inputs with validation
- `Card` - Base, elevated, interactive variants
- `Avatar` - With online indicator, fallback support
- `Badge` - Primary, tertiary, secondary, status variants

### Layout Components (`src/components/layout/`)
- `TopAppBar` - Logo, title, actions, user avatar
- `BottomNavigation` - 5-tab nav (Home, Games, Friends, Leaderboard, Profile)
- `ScreenLayout` - Auth, main app, and game layouts

### Game Components (`src/components/game/`)
- `GameCard` - Reusable game card with icon, stats, play button
- `GAMES_DATA` - Centralized game definitions (6 games)
- `GAME_ICONS` - SVG/Material icons for each game

## Customization

### Adding a New Game
1. Add icon to `GAME_ICONS` in `GameCard.tsx`
2. Add entry to `GAMES_DATA` array
3. Create live game component in `src/screens/game/`
4. Add route in `App.tsx`

### Modifying Theme
Edit CSS custom properties in `src/index.css` under `@theme` block.

## Performance

- **Build size:** ~295 KB JS (89 KB gzipped), 39 KB CSS (7 KB gzipped)
- **Code splitting:** Automatic via Vite + React Router
- **Tree shaking:** Enabled via ES modules
- **Font optimization:** Preconnect + display=swap

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## License

Private project - BOARD ARENA