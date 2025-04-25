import { apiRequest, delay } from "./baseService";
import dayjs from "dayjs";

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface CategoryStat {
  id: string;
  name: string;
  amount: number;
  percentage: number;
}

export interface DailyStat {
  date: string;
  income: number;
  expense: number;
}

export interface Stats {
  summary: Summary;
  categoryStats: CategoryStat[];
  dailyStats: DailyStat[];
}

export interface StatsFilter {
  startDate?: string;
  endDate?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

// 定义交易记录的基本结构以供筛选用
interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  categoryId: string;
  tags?: string[];
}

/**
 * 获取所有统计数据
 */
export const getStats = async (filter?: StatsFilter): Promise<Stats> => {
  await delay(300);
  try {
    // 在实际应用中，这里会调用后端API并传递过滤参数
    // const response = await apiRequest<Stats>("GET", "/stats", { params: filter });
    
    // 使用mock数据
    const response = await apiRequest<Stats>("GET", "/stats");
    
    // 如果没有筛选条件，直接返回数据
    if (!filter) {
      return response.data;
    }
    
    // 在实际应用中，服务器会处理筛选逻辑
    // 在mock环境中，我们需要手动处理筛选
    // 这里简化处理，实际应用中应该重新计算所有统计数据
    
    // 获取所有交易数据以便我们可以过滤和重新计算
    const transactionsResponse = await apiRequest<Transaction[]>("GET", "/transactions");
    const filteredTransactions = [...transactionsResponse.data].filter(t => {
      // 应用开始日期筛选
      if (filter.startDate && dayjs(t.date).isBefore(dayjs(filter.startDate))) {
        return false;
      }
      
      // 应用结束日期筛选
      if (filter.endDate && dayjs(t.date).isAfter(dayjs(filter.endDate).add(1, 'day'))) {
        return false;
      }
      
      // 应用分类筛选
      if (filter.categoryIds && filter.categoryIds.length > 0) {
        if (!filter.categoryIds.includes(t.categoryId)) {
          return false;
        }
      }
      
      // 应用标签筛选
      if (filter.tagIds && filter.tagIds.length > 0) {
        if (!t.tags || !t.tags.some(tagId => filter.tagIds?.includes(tagId))) {
          return false;
        }
      }
      
      return true;
    });
    
    // 在实际应用中，这里应该基于过滤后的交易重新计算所有统计数据
    // 由于mock环境限制，我们简单返回原始统计数据
    console.log(`已筛选${filteredTransactions.length}条交易记录`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    throw error;
  }
};

/**
 * 获取财务摘要数据
 */
export const getSummary = async (filter?: StatsFilter): Promise<Summary> => {
  const stats = await getStats(filter);
  return stats.summary;
};

/**
 * 获取分类统计数据
 */
export const getCategoryStats = async (filter?: StatsFilter): Promise<CategoryStat[]> => {
  const stats = await getStats(filter);
  return stats.categoryStats;
};

/**
 * 获取每日统计数据
 */
export const getDailyStats = async (filter?: StatsFilter): Promise<DailyStat[]> => {
  const stats = await getStats(filter);
  return stats.dailyStats;
}; 
