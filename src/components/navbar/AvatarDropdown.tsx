import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Username from "@/lib/username";
import useAuthStore from "@/store/authStore";
import useLoadingStore from "@/store/loadingStore";

const AvatarDropdown = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleLogout = () => {
    try {
      setLoading(true);
      logout();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer flex items-end gap-2"
      >
        <div>
          <div className="hidden lg:flex flex-col text-xs">
            <div>{Username(user.fullName).getShortName()}</div>
            <div className="text-gray-500">{user.mobileNumber}</div>
          </div>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              {Username(user.fullName).getInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <div onClick={handleLogout}>Logout</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
