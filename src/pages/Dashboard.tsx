import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Search, 
  Settings, 
  LogOut, 
  Box, 
  Clock, 
  ChevronRight,
  Zap,
  Loader2,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { api } from '../services/api';
import { ProjectSchema } from '../types/api';

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await api.projects.list();
      setProjects(data);
    } catch (error: any) {
      console.error('Failed to load projects', error);
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        api.auth.logout();
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const project = await api.projects.create({ name: newProjectName });
      setProjects([project, ...projects]);
      setNewProjectName('');
      setIsCreateModalOpen(false);
      navigate(`/editor/${project.id}`);
    } catch (error) {
      console.error('Failed to create project');
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-background/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Zap className="w-6 h-6 text-primary" fill="currentColor" fillOpacity={0.2} />
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-white uppercase italic">EVEREST</span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 font-bold transition-all">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:text-white hover:bg-white/5 border border-transparent font-bold transition-all">
              <Box className="w-5 h-5" />
              <span>Projects</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-text-muted hover:text-white hover:bg-white/5 border border-transparent font-bold transition-all">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]">
        <header className="px-6 md:px-10 py-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-md z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">My Workspace</h1>
            <p className="text-text-muted font-medium text-sm md:text-base">Welcome back, Explorer.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 w-72 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
              />
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary py-3 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {isLoading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
               <Loader2 className="w-10 h-10 text-primary animate-spin" />
               <p className="text-text-muted font-bold uppercase tracking-widest text-sm">Synchronizing Workspace...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(`/editor/${project.id}`)}
                  className="glass-card p-8 group cursor-pointer hover:border-primary/50 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/20 transition-all"></div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Box className="w-6 h-6" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
                      STRATEGY
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Updated {new Date(project.last_updated).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Open Editor</span>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: projects.length * 0.1 }}
                onClick={() => setIsCreateModalOpen(true)}
                className="border-2 border-dashed border-white/10 rounded-[32px] p-8 min-h-[220px] flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all text-text-muted hover:text-white group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all border border-transparent group-hover:border-primary/30">
                  <Plus className="w-8 h-8" />
                </div>
                <span className="font-display font-bold text-lg">Create New Project</span>
              </motion.button>
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md" 
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md glass-card p-10 shadow-2xl"
            >
              <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-3xl font-display font-black mb-2 text-white uppercase tracking-tighter">New Project</h2>
              <p className="text-text-muted text-lg font-medium mb-8">Start your next big achievement.</p>

              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-3 ml-1">Project Name</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium text-lg" 
                    placeholder="Enter project name..." 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!newProjectName.trim()}
                  className="w-full py-5 bg-primary hover:bg-primary-glow text-white rounded-2xl font-black text-xl transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  Launch Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

