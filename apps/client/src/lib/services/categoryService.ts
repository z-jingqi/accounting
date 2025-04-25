import { Category } from "../types/Category";
import { apiRequest, delay } from "./baseService";

/**
 * 获取所有分类
 */
export const getAllCategories = async (): Promise<Category[]> => {
  await delay(200);
  try {
    const response = await apiRequest<Category[]>("GET", "/categories");
    return response.data;
  } catch (error) {
    console.error("获取分类失败:", error);
    throw error;
  }
};

/**
 * 根据ID获取分类
 */
export const getCategoryById = async (id: string): Promise<Category | undefined> => {
  await delay(100);
  try {
    // 在真实API中，这里应该直接调用/categories/{id}端点
    // 但在mock环境中，我们需要先获取所有分类，然后找到匹配的那一个
    const response = await apiRequest<Category[]>("GET", "/categories");
    return response.data.find((c: Category) => c.id === id);
  } catch (error) {
    console.error(`获取分类ID:${id}失败:`, error);
    throw error;
  }
};

/**
 * 添加新分类
 */
export const addCategory = async (category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送POST请求到服务端
    const response = await apiRequest<Category>("POST", "/categories", {
      data: category as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error("添加分类失败:", error);
    throw error;
  }
};

/**
 * 更新分类
 */
export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送PUT请求到服务端
    const response = await apiRequest<Category>("PUT", `/categories/${id}`, {
      data: data as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error(`更新分类ID:${id}失败:`, error);
    throw error;
  }
};

/**
 * 删除分类
 */
export const deleteCategory = async (id: string): Promise<void> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送DELETE请求到服务端
    await apiRequest("DELETE", `/categories/${id}`);
  } catch (error) {
    console.error(`删除分类ID:${id}失败:`, error);
    throw error;
  }
}; 
