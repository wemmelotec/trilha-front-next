"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Não mostra navbar na página de login
  if (pathname === "/auth/login") {
    return <div style={{ display: "none" }} />;
  }

  if (!isAuthenticated) {
    return <div style={{ display: "none" }} />;
  }

  const navLinks = [
    { href: "/home", label: "Home", icon: "🏠" },
    { href: "/clientes", label: "Clientes", icon: "👥" },
    { href: "/contas", label: "Contas", icon: "💰" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home" className="text-xl font-bold">
              🏦 SistemBank
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
              >
                🚪 Sair
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500"
            >
              <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? "bg-blue-700" : "hover:bg-blue-500"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
