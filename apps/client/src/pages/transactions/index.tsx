import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';

const Transactions = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">交易记录</h1>
        <Button size="sm" className="w-full sm:w-auto flex items-center gap-1">
          <Plus size={16} /> <span>添加交易</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <Button variant="outline" size="sm" className="bg-white">全部</Button>
            <Button variant="outline" size="sm" className="bg-income-light text-income-dark border-income-light">收入</Button>
            <Button variant="outline" size="sm" className="bg-expense-light text-expense-dark border-expense-light">支出</Button>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索交易..." 
              className="w-full sm:w-auto pl-9 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[600px] px-4 sm:px-0 sm:min-w-full">
            <table className="w-full">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-3 text-left text-neutral-600 text-sm font-medium">日期</th>
                  <th className="px-4 py-3 text-left text-neutral-600 text-sm font-medium">描述</th>
                  <th className="px-4 py-3 text-left text-neutral-600 text-sm font-medium">分类</th>
                  <th className="px-4 py-3 text-left text-neutral-600 text-sm font-medium">金额</th>
                  <th className="px-4 py-3 text-left text-neutral-600 text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-6 text-center text-neutral-500" colSpan={5}>暂无交易记录</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 
