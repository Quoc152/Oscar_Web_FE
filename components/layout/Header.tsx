import HeaderClient from "./HeaderClient";
import { getUserData } from "@/lib/actions/auth";

/**
 * Server Component Wrapper cho Header
 * Fetch userData từ server và truyền xuống Client Component
 */
export default async function Header() {
  const userData = await getUserData();

  return <HeaderClient userData={userData} />;
}
