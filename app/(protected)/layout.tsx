import Navbar from "@/app/(protected)/_components/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-t from-sky-500 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;