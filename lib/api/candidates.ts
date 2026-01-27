/**
 * Candidate Type Definition
 * Type được dùng cho dữ liệu ứng viên
 */

export interface Candidate {
  avatar: string;
  employeeId: string;
  englishname: string;
  gender: number; // 1 = Nam, 0 = Nữ
  vnname: string;
  votecount: number;
}
