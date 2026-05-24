"use client";

import { useEffect, useState } from "react";

import CreateOrganizationModal from "@/app/components/CreateOrganizationModal";

import {
  ShieldCheck,
  Building2,
  Globe,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Plus,
  Activity,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  date: string;
  metadata: string;
  status: string;
  verificationId: string;
};

type Organization = {
  name: string;
  credentials: number;
  verified: number;
  joined: string;
  type: string;
  description: string;
};

export default function OrganizationsPage() {

  const [search, setSearch] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [organizations, setOrganizations] =
    useState<Organization[]>([]);

  /* Load Organizations */
  useEffect(() => {

    const savedOrganizations =
      localStorage.getItem(
        "portalproof_organizations"
      );

    if (savedOrganizations) {

      setOrganizations(
        JSON.parse(savedOrganizations)
      );

      return;

    }

    const storedCredentials =
      localStorage.getItem(
        "portalproof_credentials"
      );

    if (!storedCredentials) return;

    const credentials: Credential[] =
      JSON.parse(storedCredentials);

    const grouped =
      credentials.reduce(
        (
          acc: Record<
            string,
            Credential[]
          >,
          credential
        ) => {

          if (
            !acc[
              credential.institution
            ]
          ) {

            acc[
              credential.institution
            ] = [];

          }

          acc[
            credential.institution
          ].push(
            credential
          );

          return acc;

        },
        {}
      );

    const formatted =
      Object.entries(grouped).map(
        ([name, items]) => ({

          name,

          credentials:
            items.length,

          verified:
            items.filter(
              (item) =>
                item.status ===
                "Verified"
            ).length,

          joined: "2026",

          type:
            items.length > 5
              ? "University"
              : "DAO Network",

          description:
            "Blockchain-secured organization issuing trusted decentralized credentials through PortalProof infrastructure.",

        })
      );

    setOrganizations(
      formatted
    );

  }, []);

  /* Persist Organizations */
  useEffect(() => {

    if (
      organizations.length > 0
    ) {

      localStorage.setItem(
        "portalproof_organizations",
        JSON.stringify(
          organizations
        )
      );

    }

  }, [organizations]);

  /* Create Organization */
  function handleCreateOrganization(
    organization: {
      name: string;
      type: string;
      description: string;
    }
  ) {

    const newOrganization = {

      ...organization,

      credentials: 0,

      verified: 0,

      joined: "2026",

    };

    setOrganizations((prev) => [
      newOrganization,
      ...prev,
    ]);

  }

  /* Filter */
  const filteredOrganizations =
    organizations.filter(
      (organization) =>
        organization.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /* Stats */
  const totalOrganizations =
    organizations.length;

  const totalCredentials =
    organizations.reduce(
      (acc, org) =>
        acc + org.credentials,
      0
    );

  const verifiedOrganizations =
    organizations.filter(
      (org) =>
        org.verified >= 0
    ).length;

  return (

    <main className="min-h-screen bg-black text-white p-8 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-16">

        <div>

          <div className="flex items-center gap-2 mb-4">

            <ShieldCheck className="text-cyan-400" />

            <p className="text-cyan-400 font-semibold">
              Organization Infrastructure
            </p>

          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Organizations
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">
            Manage verified institutions, blockchain communities, universities, and organizations issuing trusted credentials through PortalProof infrastructure.
          </p>

        </div>

        <button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-8 py-4 rounded-2xl text-black font-semibold hover:scale-105 flex items-center gap-3 shadow-lg shadow-cyan-500/20"
        >

          <Plus size={20} />

          Add Organization

        </button>

      </div>

      {/* Search */}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl px-6 py-5 flex items-center gap-4 mb-14">

        <Search
          className="text-gray-400"
          size={22}
        />

        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-transparent outline-none w-full text-lg"
        />

      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">

        {/* Organizations */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[32px] p-8"
        >

          <div className="flex items-center justify-between mb-6">

            <Building2 className="text-cyan-400" />

            <span className="text-green-400 text-sm">
              +14%
            </span>

          </div>

          <p className="text-gray-400 mb-4">
            Organizations
          </p>

          <h2 className="text-5xl font-bold text-cyan-400">
            {totalOrganizations}
          </h2>

        </motion.div>

        {/* Credentials */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[32px] p-8"
        >

          <div className="flex items-center justify-between mb-6">

            <Users className="text-cyan-400" />

            <span className="text-green-400 text-sm">
              Live
            </span>

          </div>

          <p className="text-gray-400 mb-4">
            Credentials Issued
          </p>

          <h2 className="text-5xl font-bold text-cyan-400">
            {totalCredentials}
          </h2>

        </motion.div>

        {/* Verified */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[32px] p-8"
        >

          <div className="flex items-center justify-between mb-6">

            <CheckCircle2 className="text-cyan-400" />

            <span className="text-green-400 text-sm">
              Verified
            </span>

          </div>

          <p className="text-gray-400 mb-4">
            Verified Organizations
          </p>

          <h2 className="text-5xl font-bold text-cyan-400">
            {verifiedOrganizations}
          </h2>

        </motion.div>

        {/* Health */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white/5 border border-white/10 rounded-[32px] p-8"
        >

          <div className="flex items-center justify-between mb-6">

            <Activity className="text-cyan-400" />

            <span className="text-green-400 text-sm">
              Stable
            </span>

          </div>

          <p className="text-gray-400 mb-4">
            Network Health
          </p>

          <h2 className="text-5xl font-bold text-cyan-400">
            99.9%
          </h2>

        </motion.div>

      </div>

      {/* Organization Cards */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8">

        {filteredOrganizations.map(
          (
            organization,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="bg-white/5 border border-white/10 hover:border-cyan-500/30 rounded-[36px] p-8 transition-all duration-300 relative overflow-hidden"
            >

              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-start justify-between mb-10">

                  <div>

                    <div className="flex items-center gap-3 mb-5 flex-wrap">

                      <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">

                        <CheckCircle2 size={16} />

                        Verified

                      </div>

                      <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                        {organization.type}

                      </div>

                    </div>

                    <h2 className="text-4xl font-bold leading-tight">
                      {organization.name}
                    </h2>

                    <p className="text-gray-400 mt-4 leading-relaxed">
                      {organization.description}
                    </p>

                  </div>

                  <div className="bg-cyan-500/10 p-4 rounded-2xl">

                    <Sparkles
                      className="text-cyan-400"
                      size={28}
                    />

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                    <p className="text-gray-400 mb-3">
                      Credentials Issued
                    </p>

                    <h3 className="text-3xl font-bold text-cyan-400">
                      {organization.credentials}
                    </h3>

                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                    <p className="text-gray-400 mb-3">
                      Verified Credentials
                    </p>

                    <h3 className="text-3xl font-bold text-cyan-400">
                      {organization.verified}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center justify-between gap-6 flex-wrap">

                  <div>

                    <p className="text-gray-400 text-sm">
                      Joined PortalProof
                    </p>

                    <p className="font-semibold mt-1">
                      {organization.joined}
                    </p>

                  </div>

                  <button className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-6 py-3 rounded-2xl text-black font-semibold hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/20">

                    View Organization

                    <ArrowUpRight
                      size={18}
                    />

                  </button>

                </div>

              </div>

            </motion.div>

          )
        )}

      </div>

      {/* Empty State */}
      {filteredOrganizations.length === 0 && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="relative z-10 bg-white/5 border border-white/10 rounded-[36px] p-20 text-center mt-10"
        >

          <Building2
            className="mx-auto text-cyan-400 mb-6"
            size={60}
          />

          <h2 className="text-4xl font-bold mb-4">
            No Organizations Found
          </h2>

          <p className="text-gray-400 text-lg">
            No organizations match your current search.
          </p>

        </motion.div>

      )}

      {/* Modal */}
      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onCreate={
          handleCreateOrganization
        }
      />

    </main>

  );

}