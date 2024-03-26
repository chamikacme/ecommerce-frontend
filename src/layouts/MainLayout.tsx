import NavBar from "@/components/navbar/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen min-w-[700px] flex flex-col">
      <div>
        <NavBar />
      </div>
      <div className="grow bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
