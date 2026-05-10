import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/auth.store';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { toast } from 'sonner';
import { User, Sparkles, Clock, Bell, Shield, Sliders } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

const SettingsPage = () => {
  const { user, updateUser, logout } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [notif, setNotif] = useState({ matches: true, messages: true, weekly: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showAvailability: true });

  const save = () => {
    updateUser({ name, bio, location });
    toast.success('Profile updated successfully');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
      <PageHeader title="Settings" description="Manage your account preferences and profile details." />
      
      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <TabsList className="bg-transparent border-0 h-auto p-0 flex flex-col items-start space-y-1 w-full md:w-56 shrink-0">
          <TabsTrigger value="profile" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="skills" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><Sparkles className="h-4 w-4" /> Skills</TabsTrigger>
          <TabsTrigger value="availability" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><Clock className="h-4 w-4" /> Availability</TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="preferences" className="w-full justify-start gap-2 px-3 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary-glow data-[state=active]:shadow-none"><Sliders className="h-4 w-4" /> Preferences</TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="profile" className="mt-0 outline-none">
            <Card className="p-6 bg-card border-border shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Public Profile</h3>
                <p className="text-sm text-muted-foreground mb-4">This is how others will see you on the platform.</p>
              </div>
              <div className="flex items-center gap-5">
                <PixelAvatar src={user?.avatar} name={user?.name ?? ''} size="xl" />
                <div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Upload new picture</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Remove</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Recommended size 256x256px. Max 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Display Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} /></div>
              </div>
              <div className="space-y-1.5"><Label>Bio</Label><Textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} placeholder="Tell the community about yourself..." /></div>
              <div className="flex justify-end pt-4 border-t border-border">
                <Button onClick={save} className="bg-primary hover:bg-primary-hover">Save changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-0 outline-none">
            <Card className="p-6 bg-card border-border shadow-sm space-y-6">
               <div>
                <h3 className="text-lg font-medium mb-1">Your Skills</h3>
                <p className="text-sm text-muted-foreground mb-4">Manage what you can teach and what you want to learn.</p>
              </div>
              <div className="text-center py-10 border border-dashed border-border rounded-xl">
                <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Skill management is handled via the dashboard listings.</p>
                <Button variant="outline" className="mt-4">Go to Dashboard</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="mt-0 outline-none">
            <Card className="p-6 bg-card border-border shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Weekly Schedule</h3>
                <p className="text-sm text-muted-foreground mb-4">Let others know when you are free for a swap.</p>
              </div>
              <div className="text-center py-10 border border-dashed border-border rounded-xl">
                 <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No availability set yet.</p>
                <Button variant="outline" className="mt-4">Set Schedule</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 outline-none">
            <Card className="p-6 bg-card border-border shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">Choose what updates you want to receive.</p>
              </div>
              <div className="space-y-4">
                {[
                  { k: 'matches', label: 'New matches', desc: 'Get notified when we find a great swap candidate.' },
                  { k: 'messages', label: 'Messages', desc: 'Notify on every new message.' },
                  { k: 'weekly', label: 'Weekly digest', desc: 'A summary every Monday morning.' },
                ].map(o => (
                  <div key={o.k} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                    <div>
                      <div className="font-medium">{o.label}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{o.desc}</div>
                    </div>
                    <Switch
                      checked={notif[o.k as keyof typeof notif]}
                      onCheckedChange={(v) => setNotif({ ...notif, [o.k]: v })}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0 outline-none">
            <Card className="p-6 bg-card border-border shadow-sm space-y-6">
               <div>
                <h3 className="text-lg font-medium mb-1">Security Settings</h3>
                <p className="text-sm text-muted-foreground mb-4">Protect your account and manage privacy.</p>
              </div>
              <div className="space-y-4">
                {[
                  { k: 'publicProfile', label: 'Public profile', desc: 'Allow anyone on Zwap to see your profile.' },
                  { k: 'showAvailability', label: 'Show availability', desc: 'Show your weekly schedule on your profile.' },
                ].map(o => (
                  <div key={o.k} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                    <div>
                      <div className="font-medium">{o.label}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{o.desc}</div>
                    </div>
                    <Switch checked={privacy[o.k as keyof typeof privacy]} onCheckedChange={(v) => setPrivacy({ ...privacy, [o.k]: v })} />
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-border">
                <Button variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">Delete Account</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-0 outline-none">
             <Card className="p-6 bg-card border-border shadow-sm space-y-6">
               <div>
                <h3 className="text-lg font-medium mb-1">App Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">Customize your Zwap experience.</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">Dark mode is enabled by default.</div>
                </div>
                <div className="px-3 py-1 bg-card-hover rounded border border-border text-sm">Dark Mode Active</div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
