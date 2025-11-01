// src/dashboard/Navbar.jsx
import React from "react";
import { useLocation } from "react-router-dom"; // For dynamic title
import { Button } from "../ui/button"; // Adjust path
import { Search, Bell, User, Filter, Plus } from "lucide-react"; // Icons (npm i lucide-react if not)

// Fake user data (replace with real from Appwrite later)
const user = { name: "Mahfuz Nabi", avatar: "/assets/avatar.png" };

export default function Navbar({ toggleSidebar }) { // Optional toggle for mobile sidebar
  const location = useLocation(); // Get current route for dynamic title

  // Dynamic title based on route (matches sidebar menu)
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
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left: Dynamic Page Title (big, bold from Figma) */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      {/* Middle: Search Bar (from Figma, hidden on mobile) */}
      <div className="flex-1 max-w-md mx-8 hidden md:flex relative">
        <img src="/assets/search.png" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search invoices..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EE44] focus:border-transparent transition"
        />
      </div>

      {/* Right: Actions (Notifications, Filters, Create Button, Profile, Mobile Toggle) */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
          <Bell className="h-4 w-4 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span> {/* Fake badge */}
        </Button>

        {/* Filters Dropdown (from Invoices Figma, hidden on dashboard) */}
        <div className="hidden md:flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-8 border border-gray-300 rounded-lg">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Button (green, from Invoices Figma) */}
        <Button className="bg-[#C8EE44] hover:bg-[#B8DE34] text-gray-900 font-semibold px-4 py-2 rounded-lg hidden md:flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>

        {/* Profile Avatar (from Figma) */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        </Button>

        {/* Mobile Hamburger Toggle (hidden on desktop) */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-8 w-8 p-0"
          onClick={toggleSidebar} // Optional: for mobile sidebar
        >
          <Menu className="h-4 w-4" /> {/* Import Menu from lucide-react */}
        </Button>
      </div>
    </header>
  );
}