import VoteSectionClient from "./VoteSectionClient";
import { Candidate } from "@/lib/api/candidates";

interface UserData {
  employeeId: string;
  dailyVoteRemaining: number;
}

interface VoteSectionServerProps {
  userData: UserData | null;
  candidates: Candidate[];
}

/**
 * Server Component Wrapper cho Vote Section
 * Nhận dữ liệu từ server và truyền xuống Client Component
 */
export default function VoteSectionServer({
  userData,
  candidates,
}: VoteSectionServerProps) {
  return <VoteSectionClient userData={userData} candidates={candidates} />;
}
