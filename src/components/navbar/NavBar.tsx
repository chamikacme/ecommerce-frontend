import Logo from "@/components/logo/Logo";
import useAuthStore from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import SideDrawer from "./SideDrawer";
import { Button } from "../ui/button";

const NavBar = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="shadow bg-slate-300">
      <div className="py-4 flex items-center justify-between container">
        <div className="flex lg:hidden items-center justify-start p-2">
          <SideDrawer />
        </div>
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {user.isLogged && (
          <div className="hidden lg:flex gap-2">
            <Button
              variant={"ghost"}
              onClick={() => {
                navigate("/products/new");
              }}
            >
              Add Product
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                navigate("/products/my-products");
              }}
            >
              My Products
            </Button>
          </div>
        )}
        <div className="flex justify-end items-center lg:flex-1">
          {user.isLogged ? (
            <AvatarDropdown />
          ) : (
            <div>
              <Link
                className="mr-2 py-1 px-4 border border-primary rounded-full text-primary hover:text-white hover:bg-primary"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className="py-1 px-4 border border-primary rounded-full bg-primary text-white hover:brightness-105"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
