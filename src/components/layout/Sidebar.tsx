import React from 'react';
import {
  FolderTree,
  Component,
  BookOpen,
  Code2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils';

export const Sidebar: React.FC = () => {
  const { activeRoute, setActiveRoute, isSidebarOpen } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Aperçu & Structure',
      icon: <FolderTree className="w-4 h-4" />,
      badge: 'Architecture'
    },
    {
      id: 'components',
      label: 'Composants UI',
      icon: <Component className="w-4 h-4" />,
      badge: '5'
    },
    {
      id: 'guide',
      label: 'Guide & Bonnes pratiques',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'examples',
      label: 'Hooks & Services',
      icon: <Code2 className="w-4 h-4" />
    }
  ];

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-all duration-200">
      <div className="p-4 space-y-6">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation Principale
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-medium',
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer in sidebar */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            React 19 + Vite 8
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Tailwind CSS & TypeScript
          </p>
        </div>
      </div>
    </aside>
  );
};
