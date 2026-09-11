import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'tournament' | 'reward' | 'rank' | 'system';
  unread?: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearUnread: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClearUnread
}) => {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Weekly Championship Stage 04 Live',
      message: 'Quarterfinal qualifiers are active. $5,000 USD Vault ready for contenders.',
      time: '12m ago',
      type: 'tournament',
      unread: true
    },
    {
      id: '2',
      title: 'Daily Streak 5/7 Unlocked',
      message: 'You have completed 2 cyber simulation matches today. 500 XP is ready to claim.',
      time: '45m ago',
      type: 'reward',
      unread: true
    },
    {
      id: '3',
      title: 'Rank Upgrade Alert',
      message: 'You advanced +35 positions today. Current standing: #42 Phantom_Byte.',
      time: '2h ago',
      type: 'rank',
      unread: false
    },
    {
      id: '4',
      title: 'Cloud Node Tokyo-04 Optimized',
      message: 'Direct fiber connection restored with 16ms ultra-low telemetry.',
      time: '5h ago',
      type: 'system',
      unread: false
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 sm:pt-20 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1a1b21] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0d0e13]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-xl">notifications_active</span>
            <h2 className="font-headline-sm text-sm font-bold text-white uppercase tracking-wider">
              Battle Comms & Alerts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearUnread}
              className="text-[11px] text-[#00f0ff] hover:underline uppercase font-label-sm"
            >
              Mark Read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 text-[#b9cacb] hover:text-white flex items-center justify-center text-xs"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-3 flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all ${
                n.unread
                  ? 'bg-[#1e1f25] border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                  : 'bg-[#121318] border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${n.unread ? 'bg-[#00f0ff] animate-ping' : 'bg-[#849495]'}`} />
                  <h3 className="font-headline-sm text-xs font-bold text-white">
                    {n.title}
                  </h3>
                </div>
                <span className="text-[10px] text-[#849495] font-mono shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-[#b9cacb] mt-1 pl-4 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
