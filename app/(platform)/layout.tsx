"use client";

import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import { Toaster } from "react-hot-toast";

import Link from "next/link";

import {
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  Building2,
  Settings,
  FileCheck,
  Menu,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mounted, setMounted] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const { theme } =
    useTheme();

  useEffect(() => {

    setMounted(true);

  }, []);

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },

    {
      href: "/credentials",
      label: "Credentials",
      icon: ShieldCheck,
    },

    {
      href: "/organizations",
      label: "Organizations",
      icon: Building2,
    },

    {
      href: "/verification",
      label: "Verification",
      icon: FileCheck,
    },

    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  if (!mounted) return null;

  return (

    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex transition-all duration-300">

      {/* Desktop Sidebar */}
      <aside className="w-72 border-r border-black/10 dark:border-white/10 p-6 hidden lg:flex flex-col fixed h-screen bg-white dark:bg-black transition-all duration-300">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-14">

          <ShieldCheck className="text-cyan-400" />

          <h1 className="text-2xl font-bold">
            PortalProof
          </h1>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">

          {navLinks.map((link) => {

            const Icon =
              link.icon;

            return (

              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-xl transition-all duration-300"
              >

                <Icon size={20} />

                {link.label}

              </Link>

            );

          })}

        </nav>

        {/* Bottom Card */}
        <div className="mt-auto bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-3">
            Portaldot Connected
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Smart contracts deployed and verification systems active across blockchain infrastructure.
          </p>

        </div>

      </aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 px-6 py-4 flex items-center justify-between transition-all duration-300">

        <div className="flex items-center gap-2">

          <ShieldCheck className="text-cyan-400" />

          <h1 className="text-xl font-bold">
            PortalProof
          </h1>

        </div>

        <button
          onClick={() =>
            setMobileMenuOpen(true)
          }
          className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-300"
        >

          <Menu size={24} />

        </button>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>

        {mobileMenuOpen && (

          <>

            {/* Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.3,
              }}
              className="fixed top-0 left-0 h-screen w-72 bg-white dark:bg-[#050816] border-r border-black/10 dark:border-white/10 z-50 p-6 lg:hidden flex flex-col transition-all duration-300"
            >

              {/* Header */}
              <div className="flex items-center justify-between mb-12">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="text-cyan-400" />

                  <h1 className="text-2xl font-bold">
                    PortalProof
                  </h1>

                </div>

                <button
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center"
                >

                  <X size={20} />

                </button>

              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-3">

                {navLinks.map((link) => {

                  const Icon =
                    link.icon;

                  return (

                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-4 rounded-xl transition-all duration-300"
                    >

                      <Icon size={20} />

                      {link.label}

                    </Link>

                  );

                })}

              </nav>

              {/* Bottom */}
              <div className="mt-auto bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">

                <h2 className="text-xl font-semibold mb-3">
                  Blockchain Active
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verification nodes connected successfully.
                </p>

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>

      {/* Content */}
      <section className="flex-1 lg:ml-72 pt-24 lg:pt-0 transition-all duration-300">
        {children}
      </section>

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background:
              theme === "dark"
                ? "#050816"
                : "#ffffff",

            color:
              theme === "dark"
                ? "#ffffff"
                : "#000000",

            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.1)",

            padding: "16px",

            borderRadius: "16px",
          },
        }}
      />

    </main>

  );

}