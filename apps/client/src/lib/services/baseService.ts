/**
 * 基础服务模块 - 提供API请求和通用工具函数
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// API基础URL配置
// 开发环境使用mock数据，生产环境使用真实API地址
const isDev = process.env.NODE_ENV === 'development';
export const API_BASE_URL = isDev 
  ? '' // 开发环境使用相对路径
  : 'https://api.example.com/graphql';

// 创建Axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 拦截器：添加认证令牌
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// 拦截器：处理响应
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    // 统一错误处理
    if (axios.isAxiosError(error) && error.response) {
      // 服务器返回错误状态码
      if (error.response.status === 401) {
        // 处理未授权情况
        localStorage.removeItem('token');
        // 可以在这里触发重定向到登录页面
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 通用API请求方法
 * @param method HTTP方法
 * @param url 请求地址
 * @param options 请求配置（包括参数、请求体等）
 */
export const apiRequest = async <T>(
  method: string,
  url: string,
  options: {
    params?: Record<string, unknown>;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
  } = {}
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    ...options,
  };

  // 对于开发环境的mock数据，我们将请求转换为GET请求
  if (isDev) {
    config.method = 'GET';
    // 移除查询参数以避免缓存问题
    config.params = { _t: new Date().getTime() };
    
    // 将API路径映射到mock JSON文件
    if (!url.endsWith('.json')) {
      // 修改URL指向public/mock/data目录中的对应JSON文件
      config.url = `/mock/data${url}.json`;
    }
  }

  try {
    return await apiClient(config);
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
};

// 为了模拟API延迟
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// 格式化日期工具函数
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// 将金额格式化为货币的辅助函数
export const formatCurrency = (amount: number): string => {
  return `¥${amount.toFixed(2)}`;
}; 
