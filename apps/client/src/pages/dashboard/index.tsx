import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-neutral-800">仪表盘</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="p-3 md:p-6 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
          <h2 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-neutral-700">总支出</h2>
          <p className="text-lg md:text-2xl font-bold text-expense">¥0.00</p>
        </div>
        <div className="p-3 md:p-6 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
          <h2 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-neutral-700">总收入</h2>
          <p className="text-lg md:text-2xl font-bold text-income">¥0.00</p>
        </div>
        <div className="p-3 md:p-6 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
          <h2 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-neutral-700">本月结余</h2>
          <p className="text-lg md:text-2xl font-bold text-primary-600">¥0.00</p>
        </div>
        <div className="p-3 md:p-6 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
          <h2 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-neutral-700">预算使用率</h2>
          <p className="text-lg md:text-2xl font-bold text-budget">0%</p>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-neutral-800">最近交易</h2>
        <div className="bg-white rounded-lg shadow-card p-4 md:p-6">
          <p className="text-center py-6 md:py-8 text-neutral-500">暂无交易记录</p>
          <div className="text-center">
            <Button size="sm" className="w-full md:w-auto">添加交易</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
