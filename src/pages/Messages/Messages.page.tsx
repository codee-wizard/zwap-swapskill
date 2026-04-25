import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { MessageBubble } from '@/components/shared/MessageBubble';
import { getConversations, getMessages, sendMessage } from '@/api/messages.api';
import type { Conversation, Message } from '@/types';
import { formatRelative } from '@/utils/formatters';
import { Calendar, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const MessagesPage = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();
  const [convs, setConvs] = useState<Conversation[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { getConversations().then(setConvs); }, []);
  useEffect(() => {
    if (!swapId) { setMessages(null); return; }
    setMessages(null);
    getMessages(swapId).then(setMessages);
  }, [swapId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !swapId) return;
    const msg = await sendMessage(swapId, text.trim());
    setMessages(prev => prev ? [...prev, msg] : [msg]);
    setText('');
  };

  const active = convs?.find(c => c.swapId === swapId) ?? convs?.[0];
  // auto-pick first conversation on desktop
  useEffect(() => {
    if (!swapId && convs && convs[0]) navigate(`/messages/${convs[0].swapId}`, { replace: true });
  }, [swapId, convs, navigate]);

  return (
    <div className="h-[calc(100vh-4rem-3.5rem)] lg:h-[calc(100vh-4rem)] flex">
      {/* Conversation list */}
      <aside className={cn('w-full md:w-80 border-r border-border flex flex-col', swapId && 'hidden md:flex')}>
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold">Messages</h1>
          <p className="text-xs text-muted-foreground">{convs?.length ?? '…'} conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {!convs ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg shimmer" />)
          ) : convs.map(c => (
            <button key={c.swapId} onClick={() => navigate(`/messages/${c.swapId}`)}
              className={cn(
                'w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-colors',
                c.swapId === swapId ? 'bg-primary/15' : 'hover:bg-card-hover'
              )}
            >
              <PixelAvatar src={c.participantAvatar} name={c.participantName} size="md" online={c.online} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-sm truncate">{c.participantName}</span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatRelative(c.lastMessageAt)}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && <span className="h-5 min-w-[20px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">{c.unread}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <section className={cn('flex-1 flex flex-col min-w-0', !swapId && 'hidden md:flex')}>
        {active && (
          <header className="h-16 border-b border-border px-4 flex items-center justify-between gap-3">
            <button onClick={() => navigate('/messages')} className="md:hidden text-sm text-muted-foreground">←</button>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <PixelAvatar src={active.participantAvatar} name={active.participantName} size="md" online={active.online} />
              <div className="min-w-0">
                <div className="font-semibold truncate">{active.participantName}</div>
                <div className="text-xs text-muted-foreground">{active.online ? 'Online now' : 'Offline'}</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-2"><Calendar className="h-4 w-4" /> Schedule</Button>
          </header>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-bg-secondary">
          {!messages ? (
            <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className={cn('h-12 rounded-2xl shimmer max-w-[60%]', i % 2 ? 'ml-auto' : '')} />)}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 flex flex-col items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary-glow" />
              Start the conversation. Say hi!
            </div>
          ) : messages.map(m => (
            <MessageBubble key={m.id} message={m} isMine={m.senderId === 'u-me'} />
          ))}
        </div>

        {swapId && (
          <div className="p-3 border-t border-border bg-background">
            <div className="flex items-center gap-2">
              <Input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message…"
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
                className="bg-card border-border"
              />
              <Button onClick={send} className="bg-primary hover:bg-primary-hover" size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MessagesPage;
