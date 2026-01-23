/**
 * Authentication API Services
 * Xử lý các API liên quan đến đăng nhập và xác thực
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://winestore.id.vn/api";

export interface LoginRequest {
  employeeId: string;
}

export interface LoginResponse {
  dailyVoteRemaining: number;
  success: boolean;
}

/**
 * API đăng nhập bằng mã nhân viên
 */
export const loginWithEmployeeId = async (
  employeeId: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId }),
    });

    const data: any = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};
