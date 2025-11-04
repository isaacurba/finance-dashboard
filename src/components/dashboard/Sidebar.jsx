// src/dashboard/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { account } from "../lib/appwrite";
import { toast } from "sonner";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Improved active state logic
  const isActive = (item) => {
    if (item.name === "Invoices") {
      // stays active for both /invoices and /create-invoice
      return (
        location.pathname.startsWith("/invoices") ||
        location.pathname === "/create-invoice"
      );
    }
    return location.pathname === item.path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-30 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <img src="/assets/Logo.png" alt="Maglo Logo" className="h-8 w-auto" />
          <button onClick={toggleSidebar} className="md:hidden text-gray-600">
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-2 overflow-hidden">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item)
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
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <img src="/assets/Help.png" alt="Help" className="h-4 w-4 mr-2" />
            Help
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleLogout}
            disabled={loading}
          >
            <img
              src="/assets/Logout.png"
              alt="Logout"
              className="h-4 w-4 mr-2"
            />
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
