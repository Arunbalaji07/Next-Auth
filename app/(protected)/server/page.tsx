import { currentUser } from "@/lib/auth";
import UserInfo from "@/components/UserInfo";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <UserInfo
      label="💻 Server Component"
      user={user}
    />
  );
};

export default ServerPage;