import React from 'react';
import { Transaction } from '../../../lib/types/Transaction';
import { Category } from '../../../lib/types/Category';
import dayjs from 'dayjs';
import { TransactionItem } from './TransactionItem';

interface TransactionDayGroupProps {
  date: string;
  transactions: Transaction[];
  categories: Record<string, Category>;
}

export const TransactionDayGroup: React.FC<TransactionDayGroupProps> = ({
  date,
  transactions,
  categories
}) => {
  // 计算当天总收入和支出
  const dayStats = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  
  const formattedDate = dayjs(date).format('YYYY年MM月DD日');
  const dayOfWeek = dayjs(date).format('dddd');
  
  return (
    <div className="mb-6">
      <div className="sticky top-0 bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-200 z-10">
        <div>
          <div className="font-medium">{formattedDate}</div>
          <div className="text-xs text-gray-500">{dayOfWeek}</div>
        </div>
        <div className="text-sm">
          <span className="text-expense mr-3">支出: {dayStats.expense.toFixed(2)}</span>
          <span className="text-income">收入: {dayStats.income.toFixed(2)}</span>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-card">
        {transactions.map(transaction => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
            category={categories[transaction.categoryId]}
          />
        ))}
      </div>
    </div>
  );
}; 
