/**
 * 服务模块索引文件
 * 导出所有服务API，便于统一导入
 */

// 导出核心服务模块
export * from './baseService';
export * from './transactionService';
export * from './categoryService';
export * from './tagService';
export * from './statsService';
export * from './userService';

// 兼容性导出，保持向后兼容
// 将在未来版本移除
export * from './statService'; 
