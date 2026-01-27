"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://winestore.id.vn/api";

/**
 * Server Action: Đăng nhập với chuỗi định danh duy nhất
 * Lưu chuỗi vào HttpOnly Cookie
 */
export async function loginAction(authString: string) {
  try {
    // Gọi API để xác thực
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: authString.trim().toUpperCase(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.message || "Đăng nhập thất bại",
      };
    }

    // Lưu auth_token vào HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", authString.trim().toUpperCase(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return {
      success: true,
      dailyVoteRemaining: data.dailyVoteRemaining,
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: "Đã xảy ra lỗi khi đăng nhập",
    };
  }
}

/**
 * Server Action: Đăng xuất
 * Xóa auth_token cookie
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return { success: true };
}

/**
 * Server Function: Lấy thông tin người dùng từ auth_token
 * Hàm này được gọi trong Server Components
 */
export async function getUserData() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return null;
    }

    // Gọi API để lấy thông tin người dùng
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: authToken }),
      cache: "no-store", // Không cache để luôn lấy dữ liệu mới nhất
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return null;
    }

    return {
      employeeId: authToken,
      dailyVoteRemaining: data.dailyVoteRemaining,
    };
  } catch (error) {
    console.error("Get user data error:", error);
    return null;
  }
}

/**
 * Server Function: Kiểm tra xem người dùng đã đăng nhập chưa
 */
export async function checkAuth() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  return !!authToken;
}
