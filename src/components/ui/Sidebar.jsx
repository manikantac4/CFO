import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Target,
  BarChart3,
  FileText,
  CreditCard,
  Link as LinkIcon,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '../../state/uiStore';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, isDarkMode } = useUIStore();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Simulation', href: '/simulation', icon: Target },
    { name: 'Scenarios', href: '/scenarios', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Integrations', href: '/integrations', icon: LinkIcon },
  ];
  
  const bottomNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-30`}
        animate={{ width: sidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`mr-3 flex-shrink-0 ${
                      isActive(item.href)
                        ? 'text-pink-500 dark:text-pink-400'
                        : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                    }`}
                  />
                  <motion.span
                    animate={{ opacity: sidebarOpen ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
          
          {/* Bottom Navigation */}
          <div className="flex-shrink-0 px-2 py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="space-y-1">
              {bottomNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 flex-shrink-0 ${
                        isActive(item.href)
                          ? 'text-pink-500 dark:text-pink-400'
                          : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <motion.span
                      animate={{ opacity: sidebarOpen ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        
        {/* Toggle Button */}
        <div className="flex-shrink-0 p-2 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </motion.div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleSidebar} />
          <motion.div
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-slate-800"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                  CFO Helper
                </span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                      onClick={toggleSidebar}
                    >
                      <Icon
                        size={20}
                        className={`mr-4 flex-shrink-0 ${
                          isActive(item.href)
                            ? 'text-pink-500 dark:text-pink-400'
                            : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-slate-200 dark:border-slate-700 p-4">
              <nav className="flex-1 space-y-1">
                {bottomNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                      onClick={toggleSidebar}
                    >
                      <Icon
                        size={20}
                        className={`mr-4 flex-shrink-0 ${
                          isActive(item.href)
                            ? 'text-pink-500 dark:text-pink-400'
                            : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;