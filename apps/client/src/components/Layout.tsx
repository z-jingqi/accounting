import { Outlet, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-primary-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">财务管理系统</h1>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex gap-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-primary-800 hover:text-white">首页</Button>
            </Link>
            <Link to="/transactions">
              <Button variant="ghost" className="text-white hover:bg-primary-800 hover:text-white">交易记录</Button>
            </Link>
            <Link to="/categories">
              <Button variant="ghost" className="text-white hover:bg-primary-800 hover:text-white">分类管理</Button>
            </Link>
            <Link to="/reports">
              <Button variant="ghost" className="text-white hover:bg-primary-800 hover:text-white">报表分析</Button>
            </Link>
          </nav>
        </div>
        
        {/* 移动端菜单 */}
        {menuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2 border-t border-primary-800 pt-4 animate-in slide-in-from-top">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-white hover:bg-primary-800 hover:text-white justify-start">首页</Button>
            </Link>
            <Link to="/transactions" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-white hover:bg-primary-800 hover:text-white justify-start">交易记录</Button>
            </Link>
            <Link to="/categories" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-white hover:bg-primary-800 hover:text-white justify-start">分类管理</Button>
            </Link>
            <Link to="/reports" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-white hover:bg-primary-800 hover:text-white justify-start">报表分析</Button>
            </Link>
          </nav>
        )}
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Outlet />
      </main>
      
      <footer className="bg-primary-900 text-white p-4 shadow-inner">
        <div className="container mx-auto text-center">
          <p>财务管理系统 &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 
