import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Settings, 
  LogOut, 
  Zap,
  TrendingUp,
  Mail,
  CalendarDays,
  Activity
} from 'lucide-react';
import { api } from '../../services/api';

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Projetos', icon: Box },
    { path: '/dashboard/diagnostic', label: 'Diagnostic', icon: Activity },
    { path: '/dashboard/viral-engine', label: 'Viral Engine', icon: TrendingUp },
    { path: '/dashboard/email-builder', label: 'Email Builder', icon: Mail },
    { path: '/dashboard/calendar', label: 'Calendar (90D)', icon: CalendarDays },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 border-r border-white/5 bg-background/50 backdrop-blur-xl flex-col hidden md:flex shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Zap className="w-6 h-6 text-primary" fill="currentColor" fillOpacity={0.2} />
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-white uppercase italic">EVEREST</span>
        </div>

        <nav className="space-y-1 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all group \${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 \${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                <span>{item.label}</span>
                {item.path === '/dashboard/viral-engine' && !isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary/70 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <button 
          onClick={() => { api.auth.logout(); navigate('/'); }} 
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:text-red-400 hover:bg-red-400/5 transition-all font-bold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
