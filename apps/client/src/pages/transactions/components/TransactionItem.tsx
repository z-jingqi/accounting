import React from 'react';
import { Transaction } from '../../../lib/types/Transaction';
import { Category } from '../../../lib/types/Category';
import { 
  Utensils, ShoppingBag, Car, Wallet, Briefcase, 
  DollarSign, CreditCard, Plus, Minus 
} from 'lucide-react';

// 定义图标映射
const iconMap: Record<string, React.ReactNode> = {
  'utensils': <Utensils size={18} />,
  'shopping-bag': <ShoppingBag size={18} />,
  'car': <Car size={18} />,
  'wallet': <Wallet size={18} />,
  'briefcase': <Briefcase size={18} />,
  'dollar-sign': <DollarSign size={18} />,
  'credit-card': <CreditCard size={18} />
};

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  category 
}) => {
  // 获取分类图标
  const getCategoryIcon = (category?: Category) => {
    if (!category || !category.icon || !iconMap[category.icon]) {
      return null;
    }
    return iconMap[category.icon];
  };

  const isExpense = transaction.type === 'expense';
  
  return (
    <div 
      className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isExpense ? 'bg-expense-light' : 'bg-income-light'
        }`}>
          <span className={`flex items-center justify-center ${
            isExpense ? 'text-expense' : 'text-income'
          }`}>
            {getCategoryIcon(category) || (isExpense ? <Minus size={18} /> : <Plus size={18} />)}
          </span>
        </div>
        <div className="ml-3">
          <div className="font-medium">{transaction.description}</div>
          <div className="text-xs text-gray-500">{category?.name || '未分类'}</div>
        </div>
      </div>
      <div className={`font-medium ${
        isExpense ? 'text-expense' : 'text-income'
      }`}>
        {isExpense ? '-' : '+'}{transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}; 
