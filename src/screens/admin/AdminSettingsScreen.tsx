import {
  AdminLayout,
  ChartCard,
} from '../../components/admin';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

export default function AdminSettingsScreen() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
              <span>Console</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-medium">Admin Settings</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface font-headline mt-1">Admin Settings</h1>
            <p className="text-xs text-on-surface-variant max-w-2xl mt-1">Manage admin account, roles, permissions, security, notifications, and platform configuration.</p>
          </div>
          <Button variant="primary" size="sm" className="gap-1">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save All Changes
          </Button>
        </div>

        {/* Admin Account Section */}
        <ChartCard title="Admin Account" subtitle="Manage your administrator credentials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Admin Email</label>
                <Input value="admin@boardarena.com" disabled className="bg-surface-container-low" />
                <p className="text-[10px] text-on-surface-variant/70 mt-1">Cannot be changed — contact platform owner</p>
              </div>
              <div>
                <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Display Name</label>
                <Input value="System Administrator" placeholder="Your display name" />
              </div>
              <div>
                <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">New Password</label>
                <Input type="password" placeholder="Enter new password" />
                <p className="text-[10px] text-on-surface-variant/70 mt-1">Min 12 chars, upper, lower, number, symbol</p>
              </div>
              <div>
                <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-container-low">
                <h4 className="text-sm font-headline font-bold text-on-surface mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-on-surface">Authenticator App</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">TOTP via Google Authenticator, Authy, etc.</p>
                  </div>
                  <Badge variant="tertiary" size="sm" dot dotColor="tertiary" className="text-[10px]">Enabled</Badge>
                </div>
                <Button variant="secondary" size="sm" className="mt-3 gap-1">
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  Regenerate Backup Codes
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low">
                <h4 className="text-sm font-headline font-bold text-on-surface mb-3">Active Sessions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">desktop_windows</span>
                      <div>
                        <p className="font-medium text-on-surface">Current Session</p>
                        <p className="text-xs text-on-surface-variant">Chrome on Windows • 192.168.1.45</p>
                      </div>
                    </div>
                    <Badge variant="tertiary" size="sm" dot dotColor="tertiary" className="text-[10px]">Active Now</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">phone_android</span>
                      <div>
                        <p className="font-medium text-on-surface">Mobile App</p>
                        <p className="text-xs text-on-surface-variant">iOS • 10.0.0.12 • 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-error">Revoke</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Roles & Permissions */}
        <ChartCard title="Roles & Permissions" subtitle="Configure role-based access control">
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="grid">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Permission</th>
                    <th className="px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Super Admin</th>
                    <th className="px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Admin</th>
                    <th className="px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Moderator</th>
                    <th className="px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {[
                    { perm: 'User Management (suspend/ban)', admin: true, mod: true, support: false },
                    { perm: 'Match Monitoring (inspect/spectate)', admin: true, mod: true, support: true },
                    { perm: 'Reports (review/resolve/dismiss)', admin: true, mod: true, support: true },
                    { perm: 'Game Configuration (enable/disable/rules)', admin: true, mod: false, support: false },
                    { perm: 'Tournament Management', admin: true, mod: true, support: false },
                    { perm: 'Platform Settings (maintenance/modes)', admin: true, mod: false, support: false },
                    { perm: 'Security (audit logs/anti-cheat)', admin: true, mod: false, support: false },
                    { perm: 'Admin Management (create/revoke admins)', admin: true, mod: false, support: false },
                    { perm: 'Analytics Export (CSV/telemetry)', admin: true, mod: true, support: true },
                    { perm: 'System Commands (sync/restart/shutdown)', admin: true, mod: false, support: false },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/50">
                      <td className="px-4 py-3 text-on-surface-variant">{item.perm}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="error" size="sm" dot dotColor="error" className="text-[10px]">Full</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.admin ? (
                          <Badge variant="primary" size="sm" dot dotColor="primary" className="text-[10px]">Full</Badge>
                        ) : (
                          <Badge variant="secondary" size="sm" className="text-[10px]">None</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.mod ? (
                          <Badge variant="tertiary" size="sm" dot dotColor="tertiary" className="text-[10px]">Read/Action</Badge>
                        ) : (
                          <Badge variant="secondary" size="sm" className="text-[10px]">None</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.support ? (
                          <Badge variant="secondary" size="sm" dot dotColor="secondary" className="text-[10px]">View Only</Badge>
                        ) : (
                          <Badge variant="secondary" size="sm" className="text-[10px]">None</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="secondary" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Permissions
            </Button>
          </div>
        </ChartCard>

        {/* Security Settings */}
        <ChartCard title="Security Settings" subtitle="Platform security configuration">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">Auto-Ban on Anti-Cheat Detection</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Automatically ban accounts flagged by neural anti-cheat v4.9+</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">Require 2FA for All Admins</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Enforce two-factor authentication for admin panel access</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">Session Timeout</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Auto-logout after inactivity</p>
              </div>
              <div className="flex items-center gap-2">
                <Input value="30" className="w-20 text-center" />
                <span className="text-xs text-on-surface-variant">minutes</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">IP Allowlist for Admin Panel</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Restrict admin access to specific IP ranges</p>
              </div>
              <Button variant="secondary" size="sm" className="gap-1">
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Configure
              </Button>
            </div>
          </div>
        </ChartCard>

        {/* Notification Preferences */}
        <ChartCard title="Notification Preferences" subtitle="Configure admin alerts and notifications">
          <div className="space-y-3">
            {[
              { label: 'Critical Security Alerts', desc: 'Anti-cheat bans, exploit attempts, system breaches', channels: ['Email', 'Push', 'In-App'], enabled: true },
              { label: 'Match Flags & Suspicious Activity', desc: 'Bot detection, unusual latency, match anomalies', channels: ['Email', 'In-App'], enabled: true },
              { label: 'New Report Submissions', desc: 'Player reports requiring review', channels: ['Push', 'In-App'], enabled: true },
              { label: 'System Health Warnings', desc: 'Server downtime, high latency, capacity alerts', channels: ['Email', 'Push'], enabled: true },
              { label: 'Daily/Weekly Analytics Summary', desc: 'User growth, match volume, revenue reports', channels: ['Email'], enabled: true },
              { label: 'Platform Maintenance Windows', desc: 'Scheduled downtime, version deployments', channels: ['Email', 'In-App'], enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-headline font-bold text-on-surface">{item.label}</h4>
                    <Badge variant={item.enabled ? 'tertiary' : 'secondary'} size="sm" dot dotColor={item.enabled ? 'tertiary' : 'secondary'} className="text-[10px]">
                      {item.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.channels.map((ch) => (
                      <Badge key={ch} variant="outline" size="sm" className="text-[9px]">{ch}</Badge>
                    ))}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Platform Configuration */}
        <ChartCard title="Platform Configuration" subtitle="Global platform settings and feature flags">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-headline font-bold text-on-surface mb-4">Maintenance Mode</h4>
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                <div>
                  <h5 className="text-sm font-medium text-on-surface">Enable Maintenance Mode</h5>
                  <p className="text-xs text-on-surface-variant mt-0.5">Blocks all non-admin logins, shows maintenance banner</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
                </label>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-headline font-bold text-on-surface mb-4">Feature Flags</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Ranked Matchmaking', enabled: true, desc: 'Competitive ELO-based queues' },
                  { name: 'Private Lobbies', enabled: true, desc: 'Custom games with invite codes' },
                  { name: 'Tournament System', enabled: true, desc: 'Bracket-based competitions' },
                  { name: 'Spectator Mode', enabled: true, desc: 'Watch live matches' },
                  { name: 'Replay System', enabled: false, desc: 'Download match replays (beta)' },
                  { name: 'Cross-Platform Play', enabled: true, desc: 'Mobile ↔ Web play' },
                  { name: 'Voice Chat', enabled: false, desc: 'In-game voice (experimental)' },
                  { name: 'AI Analysis', enabled: false, desc: 'Post-game AI move analysis' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                    <div>
                      <p className="text-sm font-medium text-on-surface">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Audit Log Access */}
        <ChartCard title="Audit Log Access" subtitle="View and export administrative action logs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-headline font-bold text-on-surface">Recent Admin Actions</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Last 50 actions — full history available via export</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" className="gap-1">
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                Filter
              </Button>
              <Button variant="primary" size="sm" className="gap-1">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Export CSV
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Open Full Log
              </Button>
            </div>
          </div>
        </ChartCard>
      </div>
    </AdminLayout>
  );
}