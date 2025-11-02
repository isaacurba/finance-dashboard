// src/dashboard/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export default function Sidebar({ toggleSidebar }) {
  const location = useLocation();

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

  // Fake logout (replace with real Appwrite logout later)
  const handleLogout = () => {
    alert("Logout clicked (UI only — add real logic later)"); // Temp feedback
  };

  // Check if current route matches item.path (dynamic active)
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`hidden md:flex w-64 flex-col bg-white border-r border-gray-200 fixed top-0 left-0 h-screen overflow-y-auto ${toggleSidebar ? 'flex' : 'hidden'}`}> {/* Toggle visibility */}
      {" "}
      {/* Hidden on mobile, full on desktop */}
      {/* Logo & Branding */}
      <div className="p-6 border-b border-gray-200">
        <img src="/assets/Logo.png" alt="Maglo Logo" className="h-8 w-auto" />{" "}
        {/* Logo image */}
      </div>
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "btn-color text-gray-900 " // active: lime background + dark text
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // inactive: light gray hover
            }`}
          >
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              className="h-4 w-4 flex-shrink-0"
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => alert("Help clicked (UI only)")} // Fake onClick for consistency
        >
          <img src="/assets/Help.png" alt="help" className="h-4 w-4 mr-2" />
          Help
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <img src="/assets/Logout.png" alt="Logout" className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}