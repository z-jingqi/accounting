import { Outlet, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { TabBar } from './TabBar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* 顶部导航条 */}
      <header className="bg-primary-900 text-white p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">财务管理系统</h1>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      <main className="flex-1 container mx-auto p-4 pb-24">
        <Outlet />
      </main>
      
      {/* "记一笔"浮动按钮 */}
      <div className="fixed bottom-20 right-5 z-20">
        <Link
          to="/add-transaction"
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center no-underline"
          aria-label="记一笔"
        >
          <Plus size={24} />
        </Link>
      </div>
      
      {/* 底部导航栏 */}
      <TabBar />
    </div>
  );
};

export default Layout; 
