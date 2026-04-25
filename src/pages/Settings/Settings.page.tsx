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

const SettingsPage = () => {
  const { user, updateUser, logout } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [notif, setNotif] = useState({ matches: true, messages: true, weekly: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showAvailability: true });

  const save = () => {
    updateUser({ name, bio, location });
    toast.success('Profile updated');
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 max-w-3xl">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="p-6 bg-card border-border space-y-5">
            <div className="flex items-center gap-4">
              <PixelAvatar src={user?.avatar} name={user?.name ?? ''} size="xl" />
              <div>
                <Button variant="outline" size="sm">Change photo</Button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, max 2MB</p>
              </div>
            </div>
            <div className="space-y-1.5"><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Bio</Label><Textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} /></div>
            <div className="flex justify-between pt-2">
              <Button variant="ghost" onClick={logout} className="text-destructive">Sign out</Button>
              <Button onClick={save} className="bg-primary hover:bg-primary-hover">Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="p-6 bg-card border-border space-y-4">
            {[
              { k: 'matches', label: 'New matches', desc: 'Get notified when we find a great swap candidate.' },
              { k: 'messages', label: 'Messages', desc: 'Notify on every new message.' },
              { k: 'weekly', label: 'Weekly digest', desc: 'A summary every Monday morning.' },
            ].map(o => (
              <div key={o.k} className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-card-hover">
                <div>
                  <div className="font-medium">{o.label}</div>
                  <div className="text-xs text-muted-foreground">{o.desc}</div>
                </div>
                <Switch
                  checked={notif[o.k as keyof typeof notif]}
                  onCheckedChange={(v) => setNotif({ ...notif, [o.k]: v })}
                />
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card className="p-6 bg-card border-border space-y-4">
            {[
              { k: 'publicProfile', label: 'Public profile', desc: 'Allow anyone on Zwap to see your profile.' },
              { k: 'showAvailability', label: 'Show availability', desc: 'Show your weekly schedule on your profile.' },
            ].map(o => (
              <div key={o.k} className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-card-hover">
                <div>
                  <div className="font-medium">{o.label}</div>
                  <div className="text-xs text-muted-foreground">{o.desc}</div>
                </div>
                <Switch checked={privacy[o.k as keyof typeof privacy]} onCheckedChange={(v) => setPrivacy({ ...privacy, [o.k]: v })} />
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
