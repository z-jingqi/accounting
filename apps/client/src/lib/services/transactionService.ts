import { Transaction } from "../types/Transaction";
import { apiRequest, delay } from "./baseService";

/**
 * 获取所有交易记录
 */
export const getAllTransactions = async (): Promise<Transaction[]> => {
  await delay(300); // 模拟网络延迟
  try {
    const response = await apiRequest<Transaction[]>("GET", "/transactions");
    return response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("获取交易失败:", error);
    throw error;
  }
};

/**
 * 根据条件筛选交易
 */
export const getFilteredTransactions = async (filters: {
  startDate?: Date;
  endDate?: Date;
  categoryIds?: string[];
  tags?: string[];
  type?: string;
}): Promise<Transaction[]> => {
  await delay(300);
  try {
    // 由于使用JSON文件作为mock数据，需要先获取所有交易再进行筛选
    const response = await apiRequest<Transaction[]>("GET", "/transactions");
    let filteredTransactions = [...response.data];
    
    if (filters.startDate) {
      filteredTransactions = filteredTransactions.filter(
        t => new Date(t.date) >= filters.startDate!
      );
    }
    
    if (filters.endDate) {
      filteredTransactions = filteredTransactions.filter(
        t => new Date(t.date) <= filters.endDate!
      );
    }
    
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      filteredTransactions = filteredTransactions.filter(
        t => filters.categoryIds!.includes(t.categoryId)
      );
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredTransactions = filteredTransactions.filter(
        t => t.tags?.some((tag: string) => filters.tags!.includes(tag))
      );
    }
    
    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(
        t => t.type === filters.type
      );
    }
    
    // 按日期降序排序
    return filteredTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("筛选交易失败:", error);
    throw error;
  }
};

/**
 * 按日期分组交易
 */
export const getTransactionsByDate = async (): Promise<Record<string, Transaction[]>> => {
  await delay(300);
  try {
    const response = await apiRequest<Transaction[]>("GET", "/transactions");
    const transactions = [...response.data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const grouped: Record<string, Transaction[]> = {};
    
    transactions.forEach(transaction => {
      // 提取日期部分作为键值
      const dateKey = new Date(transaction.date).toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });
    
    return grouped;
  } catch (error) {
    console.error("获取按日期分组的交易失败:", error);
    throw error;
  }
};

/**
 * 添加新交易
 */
export const addTransaction = async (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">): Promise<Transaction> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送POST请求到服务端
    const response = await apiRequest<Transaction>("POST", "/transactions", {
      data: transaction as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error("添加交易失败:", error);
    throw error;
  }
};

/**
 * 更新交易
 */
export const updateTransaction = async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送PUT请求到服务端
    const response = await apiRequest<Transaction>("PUT", `/transactions/${id}`, {
      data: data as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error("更新交易失败:", error);
    throw error;
  }
};

/**
 * 删除交易
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送DELETE请求到服务端
    await apiRequest("DELETE", `/transactions/${id}`);
  } catch (error) {
    console.error("删除交易失败:", error);
    throw error;
  }
}; 
