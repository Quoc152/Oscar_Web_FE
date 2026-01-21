/**
 * Candidates API Services
 * Xử lý các API liên quan đến ứng viên
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://winestore.id.vn/api";

export interface Candidate {
  avatar: string;
  employeeId: string;
  englishname: string;
  gender: number; // 1 = Nam, 0 = Nữ
  vnname: string;
  votecount: number;
}

/**
 * Lấy danh sách tất cả ứng viên
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Candidate[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch candidates API error:", error);
    throw error;
  }
};
