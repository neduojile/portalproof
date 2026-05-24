"use client";

import { useState } from "react";

import { useTheme } from "next-themes";

import {
  ShieldCheck,
  User,
  Bell,
  Lock,
  Wallet,
  Globe,
  Key,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  Copy,
  LogOut,
  Save,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

export default function SettingsPage() {

  const { setTheme } =
    useTheme();

  const [darkMode, setDarkMode] =
    useState(true);

  const [walletConnected, setWalletConnected] =
    useState(true);

  const [verificationAlerts, setVerificationAlerts] =
    useState(true);

  const [securityAlerts, setSecurityAlerts] =
    useState(true);

  const [emailUpdates, setEmailUpdates] =
    useState(false);

  const [apiKey, setApiKey] =
    useState(
      "pp_live_82dj39d92ksl3x82"
    );

  function generateApiKey() {

    const newKey =
      `pp_live_${Math.random()
        .toString(36)
        .substring(2, 18)}`;

    setApiKey(newKey);

    alert(
      "New API key generated!"
    );

  }

  async function copyApiKey() {

    await navigator.clipboard.writeText(
      apiKey
    );

    alert("API key copied!");

  }

  function disconnectWallet() {

    setWalletConnected(false);

    alert(
      "Wallet disconnected!"
    );

  }

  function connectWallet() {

    setWalletConnected(true);

    alert(
      "Wallet connected!"
    );

  }

  function Toggle({
    active,
    onClick,
  }: {
    active: boolean;
    onClick: () => void;
  }) {

    return (

      <button
        onClick={onClick}
        className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
          active
            ? "bg-cyan-500"
            : "bg-white/10"
        }`}
      >

        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${
            active
              ? "right-1"
              : "left-1"
          }`}
        />

      </button>

    );

  }

  return (

    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 overflow-hidden transition-all duration-300">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 mb-16">

        <div className="flex items-center gap-3 mb-5">

          <div className="bg-cyan-500/10 p-3 rounded-2xl">

            <ShieldCheck className="text-cyan-400" />

          </div>

          <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">

            <Sparkles size={16} />

            Platform Configuration

          </div>

        </div>

        <h1 className="text-6xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">
          Manage account preferences, blockchain integrations, notifications, security access, API systems, and user experience configurations.
        </p>

      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Profile */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
        >

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500/10 p-4 rounded-2xl">

              <User className="text-cyan-400" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Profile Settings
              </h2>

              <p className="text-gray-400 mt-2">
                Manage personal account information
              </p>

            </div>

          </div>

          <div className="space-y-6">

            <div>

              <label className="text-gray-400 block mb-3">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-black/30 dark:bg-black/30 bg-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
              />

            </div>

            <div>

              <label className="text-gray-400 block mb-3">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="johndoe@email.com"
                className="w-full bg-black/30 dark:bg-black/30 bg-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
              />

            </div>

            <div>

              <label className="text-gray-400 block mb-3">
                Role
              </label>

              <input
                type="text"
                defaultValue="Administrator"
                className="w-full bg-black/30 dark:bg-black/30 bg-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
              />

            </div>

            <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-4 rounded-2xl text-black font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">

              <Save size={18} />

              Save Changes

            </button>

          </div>

        </motion.div>

        {/* Wallet */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
        >

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500/10 p-4 rounded-2xl">

              <Wallet className="text-cyan-400" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Wallet Integration
              </h2>

              <p className="text-gray-400 mt-2">
                Configure blockchain wallet systems
              </p>

            </div>

          </div>

          <div className="bg-black/30 border border-white/10 rounded-3xl p-6 mb-6">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <p className="text-gray-400 mb-2">
                  Connected Wallet
                </p>

                <h3 className="text-xl font-semibold text-cyan-400">

                  {walletConnected
                    ? "0x4f82...91bd"
                    : "No Wallet Connected"}

                </h3>

              </div>

              <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm ${
                walletConnected
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}>

                <CheckCircle2 size={16} />

                {walletConnected
                  ? "Connected"
                  : "Disconnected"}

              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={connectWallet}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-4 rounded-2xl text-black font-semibold transition-all duration-300 hover:scale-105"
            >

              Connect New Wallet

            </button>

            <button
              onClick={disconnectWallet}
              className="border border-white/10 hover:border-cyan-400 px-6 py-4 rounded-2xl transition-all duration-300"
            >

              Disconnect

            </button>

          </div>

        </motion.div>

        {/* Notifications */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
        >

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500/10 p-4 rounded-2xl">

              <Bell className="text-cyan-400" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Notifications
              </h2>

              <p className="text-gray-400 mt-2">
                Configure alert preferences
              </p>

            </div>

          </div>

          <div className="space-y-5">

            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Verification Alerts
                </h3>

              </div>

              <Toggle
                active={verificationAlerts}
                onClick={() =>
                  setVerificationAlerts(
                    !verificationAlerts
                  )
                }
              />

            </div>

            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Security Notifications
                </h3>

              </div>

              <Toggle
                active={securityAlerts}
                onClick={() =>
                  setSecurityAlerts(
                    !securityAlerts
                  )
                }
              />

            </div>

            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Email Updates
                </h3>

              </div>

              <Toggle
                active={emailUpdates}
                onClick={() =>
                  setEmailUpdates(
                    !emailUpdates
                  )
                }
              />

            </div>

          </div>

        </motion.div>

        {/* API */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
        >

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500/10 p-4 rounded-2xl">

              <Key className="text-cyan-400" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                API & Security
              </h2>

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-black/30 border border-white/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-4">

                <p className="text-gray-400">
                  Active API Key
                </p>

                <Copy
                  onClick={copyApiKey}
                  className="cursor-pointer text-cyan-400"
                  size={18}
                />

              </div>

              <h3 className="text-lg font-semibold text-cyan-400 break-all">

                {apiKey}

              </h3>

            </div>

            <button
              onClick={generateApiKey}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-4 rounded-2xl text-black font-semibold transition-all duration-300 hover:scale-105"
            >

              Generate API Key

            </button>

          </div>

        </motion.div>

        {/* Appearance */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
        >

          <div className="grid grid-cols-3 gap-4">

            <button
              onClick={() => {
                setDarkMode(true);
                setTheme("dark");
              }}
              className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                darkMode
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "bg-black/30 border-white/10"
              }`}
            >

              <Moon size={22} />

              Dark

            </button>

            <button
              onClick={() => {
                setDarkMode(false);
                setTheme("light");
              }}
              className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                !darkMode
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "bg-black/30 border-white/10"
              }`}
            >

              <Sun size={22} />

              Light

            </button>

            <button
              onClick={() =>
                setTheme("system")
              }
              className="p-5 rounded-2xl border bg-black/30 border-white/10 flex flex-col items-center gap-3"
            >

              <Monitor size={22} />

              System

            </button>

          </div>

        </motion.div>

      </div>

    </main>

  );

}