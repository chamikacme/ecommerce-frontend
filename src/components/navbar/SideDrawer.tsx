import Logo from "@/components/logo/Logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidePanel from "../sidepanel/SidePanel";

const SideDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-5" />
      </SheetTrigger>
      <SheetContent className="flex" side={"left"}>
        <SheetHeader className="grow">
          <SheetTitle className="px-4 pt-8 pb-2 text-center" asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
          <SheetDescription className="grow justify-start" asChild>
            <SidePanel />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
