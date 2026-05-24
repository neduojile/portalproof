"use client";

import { useEffect, useState } from "react";

import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import ActivityFeed from "../../components/ActivityFeed";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Activity,
  Clock3,
  Building2,
} from "lucide-react";

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  date: string;
  metadata: string;
  status: string;
  verificationId: string;
};

export default function AnalyticsPage() {

  const [credentials, setCredentials] =
    useState<Credential[]>([]);

  useEffect(() => {

    const storedCredentials =
      localStorage.getItem(
        "portalproof_credentials"
      );

    if (storedCredentials) {

      setCredentials(
        JSON.parse(storedCredentials)
      );

    }

  }, []);

  const totalCredentials =
    credentials.length;

  const verifiedCredentials =
    credentials.filter(
      (credential) =>
        credential.status === "Verified"
    ).length;

  const pendingCredentials =
    credentials.filter(
      (credential) =>
        credential.status === "Pending"
    ).length;

  const verificationRate =
    totalCredentials > 0
      ? (
          (verifiedCredentials /
            totalCredentials) *
          100
        ).toFixed(1)
      : "0";

  const uniqueOrganizations =
    new Set(
      credentials.map(
        (credential) =>
          credential.institution
      )
    ).size;

  const credentialData = [
    { month: "Jan", credentials: 120 },
    { month: "Feb", credentials: 210 },
    { month: "Mar", credentials: 380 },
    { month: "Apr", credentials: 520 },
    { month: "May", credentials: 710 },
    {
      month: "Jun",
      credentials:
        totalCredentials > 0
          ? totalCredentials
          : 980,
    },
  ];

  const verificationData = [
    { day: "Mon", verifications: 40 },
    { day: "Tue", verifications: 90 },
    { day: "Wed", verifications: 120 },
    { day: "Thu", verifications: 160 },
    { day: "Fri", verifications: 220 },
    { day: "Sat", verifications: 260 },
    {
      day: "Sun",
      verifications:
        verifiedCredentials > 0
          ? verifiedCredentials
          : 320,
    },
  ];

  const pieData = [
    {
      name: "Verified",
      value: verifiedCredentials,
    },

    {
      name: "Pending",
      value: pendingCredentials,
    },
  ];

  const COLORS = [
    "#22d3ee",
    "#facc15",
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 mb-16">

        <div className="flex items-center gap-2 mb-4">

          <BarChart3 className="text-cyan-400" />

          <p className="text-cyan-400 font-semibold">
            Analytics Overview
          </p>

        </div>

        <h1 className="text-5xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl text-lg">
          Track credential issuance,
          verification growth,
          blockchain activity,
          and institutional performance.
        </p>

      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 relative z-10 mb-16">

        <StatCard
          title="Credentials Issued"
          value={totalCredentials}
          icon={
            <ShieldCheck
              className="text-cyan-400"
              size={32}
            />
          }
          badge="Live"
          badgeColor="bg-cyan-500/10 text-cyan-400"
        />

        <StatCard
          title="Successful Verifications"
          value={verifiedCredentials}
          icon={
            <Activity
              className="text-green-400"
              size={32}
            />
          }
          badge="Verified"
          badgeColor="bg-green-500/10 text-green-400"
        />

        <StatCard
          title="Pending Credentials"
          value={pendingCredentials}
          icon={
            <Clock3
              className="text-yellow-400"
              size={32}
            />
          }
          badge="Pending"
          badgeColor="bg-yellow-500/10 text-yellow-400"
        />

        <StatCard
          title="Organizations"
          value={uniqueOrganizations}
          icon={
            <Building2
              className="text-purple-400"
              size={32}
            />
          }
          badge="Active"
          badgeColor="bg-purple-500/10 text-purple-400"
        />

        <StatCard
          title="Accuracy Rate"
          value={`${verificationRate}%`}
          icon={
            <TrendingUp
              className="text-cyan-400"
              size={32}
            />
          }
          badge="Real-Time"
          badgeColor="bg-cyan-500/10 text-cyan-400"
        />

      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">

        <ChartCard title="Credential Growth">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={credentialData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="month"
                stroke="#888"
              />

              <YAxis stroke="#888" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="credentials"
                stroke="#22d3ee"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </ChartCard>

        <ChartCard title="Weekly Verification Activity">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={verificationData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="day"
                stroke="#888"
              />

              <YAxis stroke="#888" />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="verifications"
                stroke="#22d3ee"
                fill="#22d3ee33"
                strokeWidth={4}
              />

            </AreaChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10 mt-8">

        {/* Pie Chart */}
        <ChartCard title="Verification Distribution">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </ChartCard>

        {/* Activity Feed */}
        <ActivityFeed
          credentials={credentials}
        />

      </div>

    </main>
  );
}