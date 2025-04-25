import { apiRequest, delay } from "./baseService";
import dayjs from "dayjs";

/**
 * 统计数据响应接口
 */
export interface StatisticsResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

/**
 * 按分类统计接口
 */
export interface CategoryStatistics {
  id: string;
  name: string;
  amount: number;
  percentage: number;
}

/**
 * 按日期统计接口
 */
export interface DateStatistics {
  date: string;
  income: number;
  expense: number;
}

/**
 * 获取整体统计信息
 */
export const getStatistics = async (startDate?: Date, endDate?: Date): Promise<StatisticsResponse> => {
  await delay(500);
  try {
    // 在实际应用中，应发送带有过滤条件的请求
    // 在mock环境中，我们直接获取stats.json中的summary数据
    const response = await apiRequest<{ summary: StatisticsResponse }>("GET", "/stats");
    return response.data.summary;
  } catch (error) {
    console.error("获取统计信息失败:", error);
    throw error;
  }
};

/**
 * 获取按分类分组的统计
 */
export const getStatisticsByCategory = async (startDate?: Date, endDate?: Date): Promise<CategoryStatistics[]> => {
  await delay(500);
  try {
    // 在实际应用中，应发送带有过滤条件的请求
    // 在mock环境中，我们直接获取stats.json中的categoryStats数据
    const response = await apiRequest<{ categoryStats: CategoryStatistics[] }>("GET", "/stats");
    return response.data.categoryStats;
  } catch (error) {
    console.error("获取分类统计信息失败:", error);
    throw error;
  }
};

/**
 * 获取按日期的统计
 */
export const getStatisticsByDate = async (
  startDate?: Date,
  endDate?: Date,
  groupBy: 'day' | 'month' | 'year' = 'day'
): Promise<{
  dates: string[];
  expenses: number[];
  incomes: number[];
}> => {
  await delay(500);
  try {
    // 在mock环境中，我们直接获取stats.json中的dailyStats数据
    const response = await apiRequest<{ dailyStats: DateStatistics[] }>("GET", "/stats");
    const dailyStats = response.data.dailyStats;
    
    // 根据groupBy参数转换数据格式
    // 在实际应用中，应该根据groupBy发送不同的请求参数
    let dataByDate: Record<string, { expense: number; income: number }> = {};
    
    // 根据groupBy对stats中的数据进行处理
    dailyStats.forEach(stat => {
      let dateKey = stat.date;
      
      // 根据groupBy格式化日期
      if (groupBy === 'month') {
        dateKey = dayjs(stat.date).format('YYYY-MM');
      } else if (groupBy === 'year') {
        dateKey = dayjs(stat.date).format('YYYY');
      }
      
      if (!dataByDate[dateKey]) {
        dataByDate[dateKey] = { expense: 0, income: 0 };
      }
      
      dataByDate[dateKey].expense += stat.expense;
      dataByDate[dateKey].income += stat.income;
    });
    
    // 过滤日期范围
    if (startDate || endDate) {
      const filteredData: Record<string, { expense: number; income: number }> = {};
      
      Object.keys(dataByDate).forEach(dateKey => {
        const date = dayjs(dateKey);
        let include = true;
        
        if (startDate && date.isBefore(dayjs(startDate))) {
          include = false;
        }
        
        if (endDate && date.isAfter(dayjs(endDate))) {
          include = false;
        }
        
        if (include) {
          filteredData[dateKey] = dataByDate[dateKey];
        }
      });
      
      dataByDate = filteredData;
    }
    
    // 将数据转换为数组格式
    const sortedDates = Object.keys(dataByDate).sort();
    const expenses = sortedDates.map(date => dataByDate[date].expense);
    const incomes = sortedDates.map(date => dataByDate[date].income);
    
    return {
      dates: sortedDates,
      expenses,
      incomes
    };
  } catch (error) {
    console.error("获取日期统计信息失败:", error);
    throw error;
  }
}; 
