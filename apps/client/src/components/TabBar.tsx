import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Settings, List } from 'lucide-react';
import { cn } from '../lib/utils';

export const TabBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-3 h-16">
        <Link
          to="/transactions"
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 text-xs font-medium transition-colors no-underline",
            isActive("/transactions")
              ? "text-primary-900"
              : "text-gray-600 hover:text-primary-800"
          )}
        >
          <List size={24} className="mb-1" />
          交易明细
        </Link>
        
        <Link
          to="/reports"
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 text-xs font-medium transition-colors no-underline",
            isActive("/reports")
              ? "text-primary-900"
              : "text-gray-600 hover:text-primary-800"
          )}
        >
          <BarChart3 size={24} className="mb-1" />
          统计报表
        </Link>
        
        <Link
          to="/settings"
          className={cn(
            "flex flex-col items-center justify-center px-2 py-1 text-xs font-medium transition-colors no-underline",
            isActive("/settings")
              ? "text-primary-900"
              : "text-gray-600 hover:text-primary-800"
          )}
        >
          <Settings size={24} className="mb-1" />
          设置
        </Link>
      </div>
    </nav>
  );
}; 
