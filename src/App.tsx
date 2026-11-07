import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScreenLayout, AuthLayout, GameLayout } from './components/layout';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import UserManagementScreen from './screens/admin/UserManagementScreen';
import MatchMonitoringScreen from './screens/admin/MatchMonitoringScreen';
import ReportsScreen from './screens/admin/ReportsScreen';
import AdminSettingsScreen from './screens/admin/AdminSettingsScreen';
import TournamentBuilderScreen from './screens/admin/TournamentBuilderScreen';
// Game screens
import FindingOpponentScreen from './screens/game/FindingOpponentScreen';
import OpponentFoundScreen from './screens/game/OpponentFoundScreen';
import PrivateMatchScreen from './screens/game/PrivateMatchScreen';
import InviteFriendScreen from './screens/game/InviteFriendScreen';
import IncomingInvitationScreen from './screens/game/IncomingInvitationScreen';
import GameLobbyScreen from './screens/game/GameLobbyScreen';
import SelectGameModeScreen from './screens/game/SelectGameModeScreen';
import MatchRulesScreen from './screens/game/MatchRulesScreen';
import PlayerConfirmationScreen from './screens/game/PlayerConfirmationScreen';
import MatchReadyScreen from './screens/game/MatchReadyScreen';
import LiveChessScreen from './screens/game/LiveChessScreen';
import LiveLudoScreen from './screens/game/LiveLudoScreen';
import LiveCheckersScreen from './screens/game/LiveCheckersScreen';
import LiveTicTacToeScreen from './screens/game/LiveTicTacToeScreen';
import LiveConnectFourScreen from './screens/game/LiveConnectFourScreen';
import LiveConnectSixScreen from './screens/game/LiveConnectSixScreen';
import { GameCard, GAMES_DATA } from './components/game/GameCard';
import { Card, Badge, Avatar } from './components/ui';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Auth Screens
function SplashScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center py-12">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/25 rounded-3xl blur-2xl"></div>
          <div className="relative w-40 h-40 rounded-3xl p-1 bg-gradient-to-b from-primary/30 via-transparent to-primary/10 flex items-center justify-center shadow-2xl">
            <div className="w-28 h-28 rounded-2xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-[40px]">sports_esports</span>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-[0.28em] text-on-surface uppercase pl-[0.28em]">Board Arena</h1>
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-75 mx-auto my-3" />
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-on-surface-variant pl-[0.3em] leading-relaxed">
          Think Smart. Play Strong. Win Fair.
        </p>
        <div className="mt-12 w-48 mx-auto">
          <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-full animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

function LoadingScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center py-12">
        <div className="relative mb-8">
          <div className="w-44 h-44 rounded-2xl p-1 bg-surface-container-high shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-[36px]">sports_esports</span>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
          Engine v2.4.9 Online
        </div>
        <h1 className="text-xl font-headline font-bold text-on-surface tracking-[0.18em] uppercase mb-2">INITIALIZING ARENA</h1>
        <p className="text-xs text-on-surface-variant font-body tracking-wide mb-8">Synchronizing global servers & ranked ladder...</p>
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span className="text-secondary-fixed flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-primary">data_saver_on</span>
              SYNCHRONIZATION MATRIX
            </span>
            <span className="font-bold text-primary font-mono tracking-wider">68%</span>
          </div>
          <div className="relative w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden p-[2px]">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-primary transition-all duration-500 ease-out" style={{ width: '68%' }} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

function WelcomeScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm text-center py-8">
        <div className="w-32 h-32 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-on-primary-container text-[48px]">sports_esports</span>
        </div>
        <h1 className="text-3xl font-headline font-bold text-on-surface mb-4">Welcome to Board Arena</h1>
        <p className="text-on-surface-variant mb-8">Competitive online multiplayer board games. Challenge players worldwide in Chess, LUDO, Checkers, and more.</p>
        <div className="flex flex-col gap-3">
          <button className="btn-primary w-full">Get Started</button>
          <button className="btn-secondary w-full">Login</button>
          <button className="btn-ghost w-full">Create Account</button>
        </div>
      </div>
    </AuthLayout>
  );
}

function LoginScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-headline font-bold text-on-surface">Welcome Back</h1>
          <p className="text-on-surface-variant mt-2">Sign in to your account</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Email or Username</label>
            <input type="text" id="email" className="input-base" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Password</label>
            <input type="password" id="password" className="input-base" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-on-surface-variant">
              <input type="checkbox" className="w-4 h-4 rounded border-outline-variant bg-surface-container-high text-primary focus:ring-primary" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-sm text-primary font-medium hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary w-full mt-2">Login</button>
        </form>
        <p className="text-center text-on-surface-variant mt-6 text-sm">
          Don't have an account? <a href="/signup" className="text-primary font-medium hover:underline">Create one</a>
        </p>
      </div>
    </AuthLayout>
  );
}

function SignUpScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-headline font-bold text-on-surface">Create Account</h1>
          <p className="text-on-surface-variant mt-2">Join the arena</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Username</label>
            <input type="text" id="username" className="input-base" placeholder="Choose a username" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Email</label>
            <input type="email" id="email" className="input-base" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Password</label>
            <input type="password" id="password" className="input-base" placeholder="Create a password" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Confirm Password</label>
            <input type="password" id="confirmPassword" className="input-base" placeholder="Confirm your password" />
          </div>
          <label className="flex items-start gap-2 text-sm text-on-surface-variant">
            <input type="checkbox" className="w-4 h-4 rounded border-outline-variant bg-surface-container-high text-primary focus:ring-primary mt-0.5" />
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
          <button type="submit" className="btn-primary w-full mt-2">Create Account</button>
        </form>
        <p className="text-center text-on-surface-variant mt-6 text-sm">
          Already have an account? <a href="/login" className="text-primary font-medium hover:underline">Login</a>
        </p>
      </div>
    </AuthLayout>
  );
}

// Main Screens
function HomeScreen() {
  return (
    <ScreenLayout title="Home" subtitle="Home">
      {/* Player Identity Bar */}
      <section className="px-4 pt-2">
        <Card variant="base" padding="md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar size="lg" online />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-on-surface-variant font-medium">Welcome back,</span>
                  <span className="text-sm font-headline font-bold text-on-surface truncate">Valkyrie</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="primary" size="sm" className="text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">military_tech</span>
                    Grandmaster
                  </Badge>
                  <Badge variant="tertiary" size="sm" className="text-[10px] font-mono font-bold">
                    2,410 ELO
                  </Badge>
                </div>
              </div>
            </div>
            <button className="btn-icon" aria-label="Tactical Logs">
              <span className="material-symbols-outlined text-[20px]">equalizer</span>
            </button>
          </div>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="px-4">
        <Card variant="base" padding="sm">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col items-center justify-center py-1">
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">Win Rate</span>
              <span className="text-base font-headline font-bold text-tertiary mt-0.5">68%</span>
              <span className="text-[9px] text-tertiary/80 font-mono">+3.2% season</span>
            </div>
            <div className="flex flex-col items-center justify-center py-1 bg-surface-container-low rounded-lg">
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">Victories</span>
              <span className="text-base font-headline font-bold text-on-surface mt-0.5">342</span>
              <span className="text-[9px] text-on-surface-variant">matches</span>
            </div>
            <div className="flex flex-col items-center justify-center py-1">
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">Streak</span>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="text-base font-headline font-bold text-primary">14</span>
              </div>
              <span className="text-[9px] text-primary/80 font-mono">ON FIRE</span>
            </div>
            <div className="flex flex-col items-center justify-center py-1 bg-surface-container-low rounded-lg">
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">Rank</span>
              <span className="text-base font-headline font-bold text-on-surface mt-0.5">#42</span>
              <span className="text-[9px] text-on-surface-variant">Season 04</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Play Online Hero */}
      <section className="px-4">
        <Card variant="elevated" padding="lg" className="relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col space-y-3.5">
            <div className="flex items-center justify-between">
              <Badge variant="primary" size="sm" dot dotColor="primary" className="text-[11px]">
                Ranked Blitz Arena
              </Badge>
              <div className="flex items-center gap-1 text-[11px] font-mono text-tertiary">
                <span className="material-symbols-outlined text-[14px]">sensors</span>
                <span>18,492 Online</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                Championship Series: Blitz Invitational
              </h2>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                High-stakes 3m+2s tactical matches. Earn +35 bonus ELO and qualify for Tier 1 Grandmaster bracket.
              </p>
            </div>
            <div className="pt-1 flex items-center gap-3">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">swords</span>
                <span>Enter Ranked Queue</span>
              </button>
              <button className="btn-icon" aria-label="Tune">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Game Cards */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-headline font-bold text-on-surface tracking-tight">Arena Disciplines</h3>
            <p className="text-[11px] text-on-surface-variant">Select standard or competitive match</p>
          </div>
          <Badge variant="primary" size="sm" className="text-xs font-mono font-semibold">6 Modes Ready</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {GAMES_DATA.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </section>
    </ScreenLayout>
  );
}

function GamesScreen() {
  return (
    <ScreenLayout title="Games" subtitle="All Games">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">All Games</h2>
        <div className="grid grid-cols-2 gap-3">
          {GAMES_DATA.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}

function FriendsScreen() {
  return (
    <ScreenLayout title="Friends" subtitle="Friends">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">Friends</h2>
        <p className="text-on-surface-variant">Friends list coming soon...</p>
      </div>
    </ScreenLayout>
  );
}

function LeaderboardScreen() {
  return (
    <ScreenLayout title="Leaderboard" subtitle="Leaderboard">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">Leaderboard</h2>
        <p className="text-on-surface-variant">Leaderboard coming soon...</p>
      </div>
    </ScreenLayout>
  );
}

function ProfileScreen() {
  return (
    <ScreenLayout title="Profile" subtitle="Profile">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">Profile</h2>
        <p className="text-on-surface-variant">Profile screen coming soon...</p>
      </div>
    </ScreenLayout>
  );
}

// Game Screens (Placeholders)
import { useParams } from 'react-router-dom';

function GameDetailScreen() {
  const params = useParams<{ gameId: string }>();
  const game = GAMES_DATA.find(g => g.id === params.gameId);
  return (
    <ScreenLayout title={game?.name || 'Game'} subtitle="Game Details">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">{game?.name || 'Game Details'}</h2>
        <p className="text-on-surface-variant">Game detail screen coming soon...</p>
      </div>
    </ScreenLayout>
  );
}

function PlayOnlineScreen() {
  return (
    <ScreenLayout title="Play Online" subtitle="Play Online">
      <div className="px-4 py-4">
        <h2 className="text-lg font-headline font-bold text-on-surface mb-4">Play Online</h2>
        <p className="text-on-surface-variant">Play online screen coming soon...</p>
      </div>
    </ScreenLayout>
  );
}
function AdminLoginScreen() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-primary-container flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-on-primary-container text-[32px]">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Admin Login</h1>
          <p className="text-on-surface-variant mt-2">Secure administration access</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="adminEmail" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Admin Email</label>
            <input type="email" id="adminEmail" className="input-base" placeholder="admin@boardarena.com" />
          </div>
          <div>
            <label htmlFor="adminPassword" className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Password</label>
            <input type="password" id="adminPassword" className="input-base" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn-primary w-full mt-2">Secure Login</button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark">
        <Routes>
          {/* Auth Routes */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />

          {/* Main App Routes */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/games" element={<GamesScreen />} />
          <Route path="/games/:gameId" element={<GameDetailScreen />} />
          <Route path="/play-online" element={<PlayOnlineScreen />} />
          <Route path="/finding-opponent/:gameId" element={<FindingOpponentScreen />} />
          <Route path="/opponent-found/:gameId" element={<OpponentFoundScreen />} />
          <Route path="/private-match/:gameId" element={<PrivateMatchScreen />} />
          <Route path="/invite-friend" element={<InviteFriendScreen />} />
          <Route path="/incoming-invitation/:invitationId" element={<IncomingInvitationScreen />} />
          <Route path="/friends" element={<FriendsScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />

          {/* Game Routes */}
          <Route path="/game/:gameId/lobby" element={<GameLobbyScreen />} />
          <Route path="/game/:gameId/mode" element={<SelectGameModeScreen />} />
          <Route path="/game/:gameId/rules" element={<MatchRulesScreen />} />
          <Route path="/game/:gameId/confirmation" element={<PlayerConfirmationScreen />} />
          <Route path="/game/:gameId/ready" element={<MatchReadyScreen />} />
          <Route path="/game/chess" element={<LiveChessScreen />} />
          <Route path="/game/ludo" element={<LiveLudoScreen />} />
          <Route path="/game/checkers" element={<LiveCheckersScreen />} />
          <Route path="/game/tic-tac-toe" element={<LiveTicTacToeScreen />} />
          <Route path="/game/connect-four" element={<LiveConnectFourScreen />} />
          <Route path="/game/connect-six" element={<LiveConnectSixScreen />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardScreen />} />
            <Route path="/admin/users" element={<UserManagementScreen />} />
            <Route path="/admin/games" element={<div className="p-6"><h2 className="text-lg font-headline font-bold text-on-surface mb-4">Game Management</h2><p className="text-on-surface-variant">Coming soon...</p></div>} />
            <Route path="/admin/matches" element={<MatchMonitoringScreen />} />
            <Route path="/admin/reports" element={<ReportsScreen />} />
            <Route path="/admin/settings" element={<AdminSettingsScreen />} />
            <Route path="/admin/tournaments/builder" element={<TournamentBuilderScreen />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#121215',
              color: '#F5F6FA',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#22C55E',
                secondary: '#F5F6FA',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#F5F6FA',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}