export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
  description: string;
  note?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
} 
