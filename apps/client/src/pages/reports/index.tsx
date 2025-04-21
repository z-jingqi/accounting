import { Button } from '@/components/ui/button';
import { Calendar, PieChart, LineChart, BarChart } from 'lucide-react';

const Reports = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-neutral-800">财务报表</h1>
      
      <div className="bg-white rounded-lg shadow-card p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h2 className="text-lg md:text-xl font-semibold text-neutral-700">报表周期</h2>
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <Button variant="outline" size="sm" className="bg-primary-50 text-primary-700 border-primary-100">本月</Button>
            <Button variant="outline" size="sm" className="bg-white">上月</Button>
            <Button variant="outline" size="sm" className="bg-white">本年</Button>
            <Button variant="outline" size="sm" className="bg-white flex items-center gap-1">
              <Calendar size={14} /> <span>自定义</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-neutral-700 flex items-center gap-2">
            <PieChart size={18} className="text-primary-500" />
            收入支出比例
          </h2>
          <div className="flex justify-center items-center h-48 md:h-60 border border-dashed border-neutral-200 rounded-md">
            <p className="text-neutral-500">暂无数据</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-neutral-700 flex items-center gap-2">
            <PieChart size={18} className="text-expense" />
            支出类别占比
          </h2>
          <div className="flex justify-center items-center h-48 md:h-60 border border-dashed border-neutral-200 rounded-md">
            <p className="text-neutral-500">暂无数据</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-neutral-700 flex items-center gap-2">
            <LineChart size={18} className="text-primary-500" />
            月度趋势
          </h2>
          <div className="flex justify-center items-center h-48 md:h-60 border border-dashed border-neutral-200 rounded-md">
            <p className="text-neutral-500">暂无数据</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-neutral-700 flex items-center gap-2">
            <BarChart size={18} className="text-budget" />
            预算执行情况
          </h2>
          <div className="flex justify-center items-center h-48 md:h-60 border border-dashed border-neutral-200 rounded-md">
            <p className="text-neutral-500">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 
