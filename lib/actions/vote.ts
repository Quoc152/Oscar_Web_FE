"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://winestore.id.vn/api";

/**
 * Server Action: Gửi phiếu bầu
 * Tự động lấy auth_token từ Cookie để xác thực
 */
export async function submitVoteAction(
  candidateId: string,
  voteForCount: number,
) {
  try {
    // Lấy auth_token từ Cookie
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return {
        success: false,
        error: "Bạn chưa đăng nhập",
      };
    }

    // Gọi API vote với employeeId từ auth_token
    const response = await fetch(`${API_BASE_URL}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: authToken,
        candidateId,
        voteForCount,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.message || "Gửi phiếu bầu thất bại",
      };
    }

    return {
      success: true,
      message: data.message || "Bầu chọn thành công",
    };
  } catch (error) {
    console.error("Submit vote action error:", error);
    return {
      success: false,
      error: "Đã xảy ra lỗi khi gửi phiếu bầu",
    };
  }
}

/**
 * Server Function: Lấy danh sách ứng viên
 * Được gọi trong Server Components
 */
export async function getCandidates() {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Không cache để luôn lấy dữ liệu mới nhất
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get candidates error:", error);
    return [];
  }
}
