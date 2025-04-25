import { User } from "../types/User";

// 为了模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock数据
const mockUser: User = {
  id: "user1",
  username: "测试用户",
  email: "user@example.com",
  avatar: undefined,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

// 获取当前用户信息
export const getCurrentUser = async (): Promise<User> => {
  await delay(300);
  return mockUser;
};

// 更新用户信息
export const updateUserProfile = async (data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User> => {
  await delay(500);
  
  const updatedUser = {
    ...mockUser,
    ...data,
    updatedAt: new Date()
  };
  
  // 在实际应用中，这里会调用API将数据保存到后端
  return updatedUser;
};

// 上传用户头像
export const uploadAvatar = async (file: File): Promise<{ avatarUrl: string }> => {
  await delay(1000); // 上传文件通常需要更长的时间
  
  // 模拟文件上传
  return {
    avatarUrl: URL.createObjectURL(file) // 在实际应用中，这里会返回上传后的URL
  };
};

// 修改密码
export const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
  await delay(500);
  
  // 在实际应用中，这里会验证当前密码并更新为新密码
  // 这里简单返回成功
  return { success: true };
}; 
