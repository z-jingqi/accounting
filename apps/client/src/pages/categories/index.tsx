import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Categories = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">分类管理</h1>
        <Button size="sm" className="w-full sm:w-auto flex items-center gap-1">
          <Plus size={16} /> <span>添加分类</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-income-dark flex items-center">
            <span className="w-3 h-3 rounded-full bg-income mr-2"></span>
            收入分类
          </h2>
          <div className="space-y-2">
            <p className="text-center py-6 md:py-8 text-neutral-500">暂无收入分类</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 text-income">
              <Plus size={16} /> <span>添加收入分类</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-expense-dark flex items-center">
            <span className="w-3 h-3 rounded-full bg-expense mr-2"></span>
            支出分类
          </h2>
          <div className="space-y-2">
            <p className="text-center py-6 md:py-8 text-neutral-500">暂无支出分类</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 text-expense">
              <Plus size={16} /> <span>添加支出分类</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories; 
