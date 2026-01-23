/**
 * Vote API Services
 * Xử lý các API liên quan đến bình chọn
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://winestore.id.vn/api";

export interface VoteRequest {
  employeeId: string;
  candidateId: string;
  voteForCount: number;
}

export interface VoteResponse {
  success: boolean;
  message?: string;
}

/**
 * Gửi bình chọn cho ứng viên
 */
export const submitVote = async (
  employeeId: string,
  candidateId: string,
  voteForCount: number = 1,
): Promise<VoteResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        candidateId,
        voteForCount,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Submit vote API error:", error);
    throw error;
  }
};
