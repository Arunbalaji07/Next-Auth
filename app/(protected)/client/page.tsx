"use client"

import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser()
  return (
    <UserInfo
      label="📱 Client Component"
      user={user}
    />
  );
};

export default ClientPage;