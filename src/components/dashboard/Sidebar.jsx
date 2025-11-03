import React, {useState} from "react";
import { Await, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { account } from "../lib/appwrite";
import { toast } from "sonner";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const menuItems = [
    {
      name: "Dashboard",
      icon: "/assets/Dashboard.png",
      path: "/dashboard",
    },
    {
      name: "Transactions",
      icon: "/assets/Transactions.png",
      path: "/transactions",
    },
    {
      name: "Invoices",
      icon: "/assets/Invoices.png",
      path: "/invoices",
    },
    {
      name: "My Wallets",
      icon: "/assets/My Wallets.png",
      path: "/wallets",
    },
    {
      name: "Settings",
      icon: "/assets/Settings.png",
      path: "/settings",
    },
  ];

  const handleLogout = async () => {
    setloading(true);
    try {
      await account.deleteSession("current")
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed, please try again")
    }finally{
      setloading(false)
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Logo */}
      <div className="p-6 border-gray-200">
        <img src="/assets/Logo.png" alt="Maglo Logo" className="h-8 w-auto" />
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "bg-[#C8EE44] text-gray-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <img src={item.icon} alt={item.name} className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Help + Logout */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <img src="/assets/Help.png" alt="Help" className="h-4 w-4 mr-2" />
          Help
        </Button>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <img src="/assets/Logout.png" alt="Logout" className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
