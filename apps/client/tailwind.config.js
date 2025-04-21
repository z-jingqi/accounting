/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // 主品牌色系 - 蓝色调
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#90cdfb',
          400: '#64aef7',
          500: '#4992f2',
          600: '#3170e5',
          700: '#2b5cd0',
          800: '#274ca7',
          900: '#254384',
          950: '#192952',
        },
        // 中性色系
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // 功能性色彩
        success: {
          DEFAULT: '#10b981', // 标准绿色
          light: '#a7f3d0',
          dark: '#047857',
        },
        danger: {
          DEFAULT: '#ef4444', // 标准红色
          light: '#fecaca',
          dark: '#b91c1c',
        },
        warning: {
          DEFAULT: '#f59e0b', // 标准黄色
          light: '#fde68a',
          dark: '#b45309',
        },
        info: {
          DEFAULT: '#3b82f6', // 标准蓝色
          light: '#bfdbfe',
          dark: '#1d4ed8',
        },
        // 语义化色彩
        income: {
          DEFAULT: '#10b981', // 收入 - 绿色
          light: '#d1fae5',
          dark: '#065f46',
        },
        expense: {
          DEFAULT: '#ef4444', // 支出 - 红色
          light: '#fee2e2',
          dark: '#991b1b',
        },
        saving: {
          DEFAULT: '#6366f1', // 储蓄 - 靛蓝
          light: '#e0e7ff',
          dark: '#4338ca',
        },
        budget: {
          DEFAULT: '#8b5cf6', // 预算 - 紫色
          light: '#ede9fe',
          dark: '#6d28d9',
        },
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
} 
