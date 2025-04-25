import React from 'react';
import { getTransactionsByDate, getCategoryById } from '../lib/services';
import { Transaction } from '../lib/types/Transaction';
import { Category } from '../lib/types/Category';
import { useQuery } from '@tanstack/react-query';
import { TransactionDayGroup } from './transactions/components/TransactionDayGroup';
import { TransactionSkeleton } from './transactions/components/TransactionSkeleton';

// 交易日期分组接口
interface DayGroup {
  date: string;
  transactions: Transaction[];
}

const TransactionsPage: React.FC = () => {
  // 获取交易数据
  const { 
    data: groupedTransactions,
    isLoading: isLoadingTransactions,
    error: transactionsError
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionsByDate
  });

  // 转换数据结构
  const transactionsByDay: DayGroup[] = groupedTransactions 
    ? Object.entries(groupedTransactions).map(([date, transactions]) => ({
        date,
        transactions,
      })) 
    : [];

  // 收集分类ID
  const categoryIds = new Set<string>();
  transactionsByDay.forEach(group => {
    group.transactions.forEach(transaction => {
      categoryIds.add(transaction.categoryId);
    });
  });
  
  // 获取所有分类信息
  const { 
    data: categories = {},
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories', Array.from(categoryIds)],
    queryFn: async () => {
      const categoryMap: Record<string, Category> = {};
      for (const categoryId of categoryIds) {
        const category = await getCategoryById(categoryId);
        if (category) {
          categoryMap[categoryId] = category;
        }
      }
      return categoryMap;
    },
    enabled: categoryIds.size > 0 && !isLoadingTransactions,
  });
  
  // 加载状态 - 显示骨架屏
  const isLoading = isLoadingTransactions || isLoadingCategories;
  if (isLoading) {
    return <TransactionSkeleton />;
  }
  
  // 错误状态
  if (transactionsError) {
    return <div className="text-red-500 text-center py-12">获取交易数据失败，请稍后再试</div>;
  }
  
  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">交易明细</h1>
        <p className="text-gray-500">查看所有交易记录</p>
      </div>
      
      {transactionsByDay.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          暂无交易记录
        </div>
      ) : (
        transactionsByDay.map(group => (
          <TransactionDayGroup 
            key={group.date}
            date={group.date}
            transactions={group.transactions}
            categories={categories}
          />
        ))
      )}
    </div>
  );
};

export default TransactionsPage; 
