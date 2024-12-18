"use client"

import { logout} from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const onClick = () => {
    logout()
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;