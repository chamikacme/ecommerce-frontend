import Logo from "@/components/logo/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex justify-stretch h-screen">
      <div className="bg-slate-200 w-5/12 lg:w-1/2 hidden md:flex flex-col items-center justify-center gap-4">
        <Logo size="text-5xl" />
        <div className="text-center">
          <p className="text-lg">Your Shopping Partner</p>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
