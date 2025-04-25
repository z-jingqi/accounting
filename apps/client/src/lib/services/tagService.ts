import { Tag } from "../types/Tag";
import { apiRequest, delay } from "./baseService";

/**
 * 获取所有标签
 */
export const getAllTags = async (): Promise<Tag[]> => {
  await delay(200);
  try {
    const response = await apiRequest<Tag[]>("GET", "/tags");
    return response.data;
  } catch (error) {
    console.error("获取标签失败:", error);
    throw error;
  }
};

/**
 * 根据ID获取标签
 */
export const getTagById = async (id: string): Promise<Tag | undefined> => {
  await delay(100);
  try {
    // 在真实API中，这里应该直接调用/tags/{id}端点
    // 但在mock环境中，我们需要先获取所有标签，然后找到匹配的那一个
    const response = await apiRequest<Tag[]>("GET", "/tags");
    return response.data.find((t: Tag) => t.id === id);
  } catch (error) {
    console.error(`获取标签ID:${id}失败:`, error);
    throw error;
  }
};

/**
 * 添加新标签
 */
export const addTag = async (tag: Omit<Tag, "id" | "createdAt" | "updatedAt">): Promise<Tag> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送POST请求到服务端
    const response = await apiRequest<Tag>("POST", "/tags", {
      data: tag as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error("添加标签失败:", error);
    throw error;
  }
};

/**
 * 更新标签
 */
export const updateTag = async (id: string, data: Partial<Tag>): Promise<Tag> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送PUT请求到服务端
    const response = await apiRequest<Tag>("PUT", `/tags/${id}`, {
      data: data as Record<string, unknown>,
    });
    return response.data;
  } catch (error) {
    console.error(`更新标签ID:${id}失败:`, error);
    throw error;
  }
};

/**
 * 删除标签
 */
export const deleteTag = async (id: string): Promise<void> => {
  await delay(300);
  try {
    // 在实际应用中，应该发送DELETE请求到服务端
    await apiRequest("DELETE", `/tags/${id}`);
  } catch (error) {
    console.error(`删除标签ID:${id}失败:`, error);
    throw error;
  }
}; 
