import React from 'react';

// 单个交易项的骨架屏
export const TransactionItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="ml-3">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  );
};

// 日期组的骨架屏
export const TransactionDayGroupSkeleton: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-200 animate-pulse">
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="flex space-x-3">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-card">
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
    </div>
  );
};

// 整个交易列表的骨架屏
export const TransactionSkeleton: React.FC = () => {
  return (
    <div className="pb-16">
      <div className="mb-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
      </div>
      
      <TransactionDayGroupSkeleton />
      <TransactionDayGroupSkeleton />
    </div>
  );
}; 
