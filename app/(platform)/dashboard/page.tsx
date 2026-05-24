"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Bell,
  Search,
  Activity,
  TrendingUp,
  Clock3,
  Plus,
  FileCheck,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  date: string;
  metadata: string;
  status: string;
  verificationId: string;
};

export default function DashboardPage() {

  const router = useRouter();

  const [credentials, setCredentials] =
    useState<Credential[]>([]);

  const [search, setSearch] =
    useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  // REAL DATABASE STATS
  const [
    totalCredentials,
    setTotalCredentials,
  ] = useState(0);

  const [
    verifiedCredentials,
    setVerifiedCredentials,
  ] = useState(0);

  const [
    failedVerifications,
    setFailedVerifications,
  ] = useState(0);

  const [
    organizations,
    setOrganizations,
  ] = useState(0);

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          // FETCH DASHBOARD DATA
          const dashboardResponse =
            await fetch(
              "/api/dashboard"
            );

          const dashboardData =
            await dashboardResponse.json();

          if (
            dashboardData.success
          ) {

            const formatted =
              dashboardData.dashboard.credentials.map(
                (credential: any) => ({

                  recipient:
                    credential.recipientName,

                  title:
                    credential.title,

                  institution:
                    credential.recipientEmail,

                  date:
                    credential.issuedAt,

                  metadata:
                    credential.blockchainHash,

                  status:
                    credential.status,

                  verificationId:
                    credential.id,
                })
              );

            setCredentials(
              formatted
            );
          }

          // FETCH REAL STATS
          const statsResponse =
            await fetch(
              "/api/dashboard/stats"
            );

          const statsData =
            await statsResponse.json();

          if (
            statsData.success
          ) {

            setTotalCredentials(
              statsData.stats.totalCredentials
            );

            setVerifiedCredentials(
              statsData.stats.verifiedCredentials
            );

            setFailedVerifications(
              statsData.stats.failedVerifications
            );

            setOrganizations(
              statsData.stats.institutions
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    fetchDashboard();

  }, []);

  // PENDING
  const pendingCredentials =
    credentials.filter(
      (credential) =>
        credential.status
          .toLowerCase() ===
        "pending"
    ).length;

  // VERIFICATION RATE
  const verificationRate =
    totalCredentials > 0
      ? (
          (verifiedCredentials /
            totalCredentials) *
          100
        ).toFixed(1)
      : "0";

  // FILTER
  const filteredCredentials =
    credentials.filter(
      (credential) =>

        credential.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        credential.recipient
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        credential.institution
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ANALYTICS CHART
  const analyticsData = [

    {
      day: "Mon",
      value: 12,
    },

    {
      day: "Tue",
      value: 25,
    },

    {
      day: "Wed",
      value: 18,
    },

    {
      day: "Thu",
      value: 40,
    },

    {
      day: "Fri",
      value: 30,
    },

    {
      day: "Sat",
      value: 52,
    },

    {
      day: "Sun",
      value:
        verifiedCredentials > 0
          ? verifiedCredentials
          : 10,
    },
  ];

  return (

    <main className="min-h-screen bg-black text-white p-6 xl:p-8 overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      <section className="relative z-10">

        {/* TOPBAR */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-14">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-cyan-500/10 p-3 rounded-2xl">

                <LayoutDashboard className="text-cyan-400" />

              </div>

              <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                Live Dashboard

              </div>

            </div>

            <h1 className="text-5xl xl:text-6xl font-bold leading-tight">

              Dashboard

            </h1>

            <p className="text-gray-400 mt-5 text-lg max-w-3xl leading-relaxed">

              Monitor blockchain-secured credentials,
              institutional activity,
              verification analytics,
              and real-time ecosystem performance.

            </p>

          </div>

          <div className="flex items-center gap-4 flex-wrap">

            {/* SEARCH */}
            <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3 min-w-[280px] xl:min-w-[340px]">

              <Search
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search credentials..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none text-sm w-full"
              />

            </div>

            {/* NOTIFICATIONS */}
            <div className="relative">

              <button
                onClick={() =>
                  setNotificationsOpen(
                    !notificationsOpen
                  )
                }
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-cyan-400 transition-all duration-300 hover:scale-105 relative"
              >

                <Bell size={20} />

                <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"></div>

              </button>

              {notificationsOpen && (

                <div className="absolute right-0 mt-4 w-[320px] bg-[#050816] border border-white/10 rounded-3xl p-5 shadow-2xl z-50">

                  <h3 className="text-lg font-semibold mb-5">
                    Notifications
                  </h3>

                  <div className="space-y-4">

                    <div className="bg-white/5 rounded-2xl p-4">

                      <p className="font-medium">
                        Credential verification successful
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        Blockchain validation completed
                      </p>

                    </div>

                    <div className="bg-white/5 rounded-2xl p-4">

                      <p className="font-medium">
                        Institution onboarded
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        New issuer connected to PortalProof
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">

          {/* TOTAL */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <ShieldCheck className="text-cyan-400" />

              <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                Live

              </div>

            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mb-4">

              {totalCredentials}

            </h2>

            <p className="text-gray-400">
              Total Credentials
            </p>

          </motion.div>

          {/* ORGANIZATIONS */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <Building2 className="text-cyan-400" />

              <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">

                Active

              </div>

            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mb-4">

              {organizations}

            </h2>

            <p className="text-gray-400">
              Organizations
            </p>

          </motion.div>

          {/* VERIFIED */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <TrendingUp className="text-cyan-400" />

              <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                Verified

              </div>

            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mb-4">

              {verificationRate}%

            </h2>

            <p className="text-gray-400">
              Verification Rate
            </p>

          </motion.div>

          {/* FAILED */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <AlertTriangle className="text-red-400" />

              <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm">

                Alerts

              </div>

            </div>

            <h2 className="text-5xl font-bold text-red-400 mb-4">

              {failedVerifications}

            </h2>

            <p className="text-gray-400">
              Failed Verifications
            </p>

          </motion.div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          {/* CREATE */}
          <button
            onClick={() => {

              router.push(
                "/credentials"
              );

              toast.success(
                "Opening credentials"
              );
            }}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-[32px] p-8 text-left text-black hover:scale-[1.02]"
          >

            <Plus size={28} />

            <h2 className="text-2xl font-bold mt-6">
              Create Credential
            </h2>

            <p className="mt-3 text-black/70">
              Issue blockchain-secured credentials instantly.
            </p>

          </button>

          {/* VERIFY */}
          <button
            onClick={() => {

              router.push(
                "/verification"
              );

              toast.success(
                "Opening verification"
              );
            }}
            className="bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-300 rounded-[32px] p-8 text-left hover:scale-[1.02]"
          >

            <FileCheck
              className="text-cyan-400"
              size={28}
            />

            <h2 className="text-2xl font-bold mt-6">
              Verify Credential
            </h2>

            <p className="mt-3 text-gray-400">
              Validate authenticity across the network.
            </p>

          </button>

          {/* ANALYTICS */}
          <button
            onClick={() => {

              router.push(
                "/analytics"
              );

              toast.success(
                "Opening analytics"
              );
            }}
            className="bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-300 rounded-[32px] p-8 text-left hover:scale-[1.02]"
          >

            <Sparkles
              className="text-cyan-400"
              size={28}
            />

            <h2 className="text-2xl font-bold mt-6">
              Analytics Overview
            </h2>

            <p className="mt-3 text-gray-400">
              Monitor ecosystem growth and engagement.
            </p>

          </button>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* CHART */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="xl:col-span-2 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/10 rounded-[36px] p-8"
          >

            <div className="flex items-center justify-between mb-10 flex-wrap gap-5">

              <div>

                <h2 className="text-3xl font-bold">
                  Verification Activity
                </h2>

                <p className="text-gray-400 mt-2">
                  Real-time blockchain analytics
                </p>

              </div>

              <div className="bg-cyan-500/10 text-cyan-400 px-5 py-3 rounded-full text-sm">

                Real-Time Analytics

              </div>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart
                  data={analyticsData}
                >

                  <defs>

                    <linearGradient
                      id="colorFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#22d3ee"
                        stopOpacity={0.5}
                      />

                      <stop
                        offset="100%"
                        stopColor="#22d3ee"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#888"
                  />

                  <YAxis
                    stroke="#888"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22d3ee"
                    fill="url(#colorFill)"
                    strokeWidth={4}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* ACTIVITY */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-8"
          >

            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-3">

                <Activity className="text-cyan-400" />

                <h2 className="text-3xl font-bold">
                  Activity
                </h2>

              </div>

              <ArrowUpRight
                className="text-cyan-400"
                size={22}
              />

            </div>

            <div className="space-y-5">

              {filteredCredentials
                .slice(0, 5)
                .map(
                  (
                    credential,
                    index
                  ) => (

                    <div
                      key={index}
                      className="relative pl-8"
                    >

                      <div className="absolute left-0 top-2 w-3 h-3 bg-cyan-400 rounded-full"></div>

                      <div className="absolute left-[5px] top-5 w-[2px] h-full bg-white/10"></div>

                      <div className="bg-black/30 border border-white/10 rounded-3xl p-5">

                        <h3 className="font-semibold leading-relaxed">

                          {credential.title}

                        </h3>

                        <p className="text-gray-400 text-sm mt-2">

                          {credential.recipient}

                        </p>

                        <div className="flex items-center gap-3 mt-4 flex-wrap">

                          <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                            {credential.institution}

                          </div>

                          <div
                            className={`px-4 py-2 rounded-full text-sm ${
                              credential.status ===
                              "issued"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >

                            {credential.status}

                          </div>

                        </div>
<button
  onClick={() =>
    router.push(
      `/verify/${credential.verificationId}`
    )
  }
  className="mt-4 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-4 py-2 rounded-xl text-sm font-semibold"
>
  Verify Credential
</button>
                      </div>

                    </div>

                  )
                )}

              {filteredCredentials.length === 0 && (

                <div className="bg-black/30 border border-white/10 rounded-3xl p-10 text-center">

                  <p className="text-gray-400">
                    No credential activity found.
                  </p>

                </div>

              )}

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}