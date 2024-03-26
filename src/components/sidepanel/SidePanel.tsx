import { LayoutPanelLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidePanel = () => {
  return (
    <div className="bg-slate-200 grow">
      <div className="no-scrollbar flex flex-col overflow-y-auto">
        <nav className="py-4 px-4">
          <div>
            <ul className="mb-6 flex flex-col">
              <li>
                <h3 className="mb-2 ml-2 mt-2 text-sm font-semibold border-b border-slate-300 text-slate-600">
                  Dashboard
                </h3>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-3 font-medium ease-in-out`}
                >
                  <LayoutPanelLeft className="h-5 w-5" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/new"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-3 font-medium ease-in-out`}
                >
                  <LayoutPanelLeft className="h-5 w-5" />
                  Add Product
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidePanel;
