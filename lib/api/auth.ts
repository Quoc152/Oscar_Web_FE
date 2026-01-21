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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();

    if (!data.success) {
      throw new Error("Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};
