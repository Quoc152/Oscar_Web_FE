/**
 * LocalStorage Utilities
 * Quản lý việc lưu trữ, đọc và xóa dữ liệu trong localStorage
 */

const STORAGE_KEYS = {
  AUTH_DATA: "oscar_auth_data",
  EMPLOYEE_ID: "oscar_employee_id",
  DAILY_VOTES: "oscar_daily_votes",
} as const;

export interface AuthData {
  employeeId: string;
  dailyVoteRemaining: number;
  lastLogin: string;
}

/**
 * Lưu thông tin đăng nhập
 */
export const saveAuthData = (data: AuthData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_DATA, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

/**
 * Lấy thông tin đăng nhập
 */
export const getAuthData = (): AuthData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting auth data:", error);
    return null;
  }
};

/**
 * Xóa thông tin đăng nhập
 */
export const clearAuthData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_DATA);
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

/**
 * Kiểm tra đã đăng nhập chưa
 */
export const isAuthenticated = (): boolean => {
  const authData = getAuthData();
  return authData !== null && authData.employeeId !== "";
};

/**
 * Cập nhật số lượt vote còn lại
 */
export const updateVoteCount = (remainingVotes: number): void => {
  try {
    const authData = getAuthData();
    if (authData) {
      authData.dailyVoteRemaining = remainingVotes;
      saveAuthData(authData);
    }
  } catch (error) {
    console.error("Error updating vote count:", error);
  }
};

/**
 * Lấy số lượt vote còn lại
 */
export const getVoteCount = (): number => {
  const authData = getAuthData();
  return authData?.dailyVoteRemaining ?? 0;
};

/**
 * Xóa toàn bộ dữ liệu
 */
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};

/**
 * Xem toàn bộ dữ liệu (for debugging)
 */
export const viewAllData = (): Record<string, any> => {
  try {
    const data: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
      const item = localStorage.getItem(value);
      data[key] = item ? JSON.parse(item) : null;
    });
    return data;
  } catch (error) {
    console.error("Error viewing all data:", error);
    return {};
  }
};
