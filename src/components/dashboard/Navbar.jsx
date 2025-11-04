import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Filter, Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { account } from "../lib/appwrite";

// Helper function to get initials from user name
const getInitialAvatar = (name) => {
  if (!name) return "U";
  const names = name.split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
};

const Navbar = ({ toggleSidebar, invoiceID }) => {
  const location = useLocation();
  const [filterValue, setFilterValue] = useState("all");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/transactions":
        return "Transactions";
      case "/invoices":
        return "Invoices";
      case "/wallets":
        return "Wallets";
      case "/settings":
        return "Settings";
      case "/create-invoice":
        return `New Invoice: ${invoiceID || "MGL524874"}`;
      default:
        return "Dashboard";
    }
  };

  // Fetch user info from appwrite
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const isInvoicesPage = location.pathname === "/invoices";

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-4 flex-1 md:flex-none min-w-0">
        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-8 w-8 p-0"
          onClick={toggleSidebar}
        >
          <Menu size={16} />
        </Button>

        {/* Mobile Logo */}
        <img
          src="/assets/Logo.png"
          alt="Maglo Logo"
          className="h-8 w-auto md:hidden"
        />

        {/* Dynamic Title */}
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block truncate">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 flex-none min-w-0">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
          <img
            src="/assets/notification.png"
            alt="Notifications"
            className="h-4 w-4"
          />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Profile Avatar */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 rounded-full flex items-center gap-2 min-w-0"
        >
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
              loading
                ? "bg-gray-300 text-gray-500"
                : "bg-[#C8EE44] text-gray-900"
            }`}
          >
            {loading ? "..." : user ? getInitialAvatar(user.name) : "U"}
          </div>
          <div className="hidden md:block min-w-0">
            <p className="text-sm text-gray-600 truncate">
              {loading ? "Loading..." : user ? user.name : "User"}
            </p>
          </div>
          <img
            src="/assets/Dropdown.png"
            alt="Dropdown"
            className="h-3 w-3 ml-1"
          />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
