import React, { useState } from "react"; 
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Bell, User, Filter, Plus, Menu } from "lucide-react"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Fake user data (replace with real from Appwrite later)
const user = { name: "Mahfuz Nabi", avatar: "/assets/avatar.png" };

export default function Navbar({ toggleSidebar }) { //  toggle for mobile sidebar
  const location = useLocation(); 
  const [filterValue, setFilterValue] = useState("all"); 

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

  // FIXED: Conditional for filters/create only on /invoices (from Figma/PDF spec for invoices page)
  const isInvoicesPage = location.pathname === "/invoices"; // Filters/create on invoices

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between overflow-hidden"> {/* FIXED: overflow-hidden to prevent overflow */}
      {/* Left: Mobile Hamburger + Logo (visible on mobile) + Dynamic Title (hidden on mobile) */}
      <div className="flex items-center gap-4 flex-1 md:flex-none min-w-0"> {/* FIXED: flex-1 + min-w-0 to prevent title overflow on small screens */}
        {/* Mobile Hamburger (only on mobile) */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-8 w-8 p-0"
          onClick={toggleSidebar} // Toggle mobile sidebar
        >
          <Menu className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Logo (visible on mobile, hidden on desktop — from your note) */}
        <img
          src="/assets/Logo.png"
          alt="Maglo Logo"
          className="h-8 w-auto md:hidden" // md:hidden: only mobile
        />

        {/* Dynamic Title (hidden on mobile, shown on desktop, truncate if overflow) */}
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block truncate">
          {getPageTitle()}
        </h1>
      </div>

      {/* Middle: Search Input (always input, hidden on mobile) */}
      <div className="flex-1 max-w-md mx-4 hidden md:flex relative"> {/* FIXED: flex-1 for centering, max-w-md to prevent overflow */}
        <img
          src="/assets/search.png"
          alt="Search icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" // FIXED: opacity for gray tint
        />
        <input
          type="search"
          placeholder="Search invoices..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EE44] focus:border-transparent transition"
        />
      </div>

      {/* Right: Actions (Notifications, Filters, Create Button, Profile) — fixed layout, no mobile toggle here */}
      <div className="flex items-center gap-3 flex-none min-w-0"> {/* FIXED: flex-none + min-w-0 to prevent overflow */}
        {/* Notifications Bell */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
          <img
            src="/assets/notification.png"
            alt="Notifications"
            className="h-4 w-4"
          />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span> {/* Fake badge */}
        </Button>

        {/* FIXED Filters Dropdown (controlled state + full Select structure + conditional for invoices page) */}
        {isInvoicesPage && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <Select value={filterValue} onValueChange={setFilterValue}> {/* FIXED: Controlled props */}
              <SelectTrigger className="w-[120px] h-8 border border-gray-300 rounded-lg"> {/* Trigger: clickable */}
                <SelectValue placeholder="Filters" /> {/* Shows selected value */}
              </SelectTrigger>
              <SelectContent> {/* Dropdown opens on click */}
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Create Button (green, from Invoices Figma — conditional for invoices page) */}
        {isInvoicesPage && (
          <Button className="bg-[#C8EE44] hover:bg-[#B8DE34] text-gray-900 font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        )}

        {/* FIXED Profile Avatar (from Figma — button with name + dropdown arrow, no overflow) */}
        <Button variant="ghost" size="sm" className="h-8 px-2 rounded-full flex items-center gap-2 min-w-0"> {/* FIXED: px-2 + min-w-0 to prevent overflow */}
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="hidden md:block min-w-0"> {/* FIXED: hidden on mobile to prevent overflow */}
            <p className="text-sm text-gray-600 truncate">{user.name}</p> {/* truncate text if too long */}
          </div>
          <img
            src="/assets/Dropdown.png"
            alt="Dropdown"
            className="h-3 w-3 ml-1"
          /> {/* Dropdown arrow */}
        </Button>
      </div>
    </header>
  );
}