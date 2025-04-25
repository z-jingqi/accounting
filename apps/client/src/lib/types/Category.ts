export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
  parentId?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
} 
