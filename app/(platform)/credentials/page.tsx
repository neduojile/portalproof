"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import CreateCredentialModal from "@/app/components/CreateCredentialModal";
import CredentialCard from "@/app/components/CredentialCard";
import EmptyState from "@/app/components/EmptyState";
import LoadingSpinner from "@/app/components/LoadingSpinner";

import jsPDF from "jspdf";

import {
  ShieldCheck,
  Search,
  Wallet,
} from "lucide-react";

declare global {

  interface Window {
    ethereum?: any;
  }
}

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  date: string;
  metadata: string;
  status: string;
  verificationId: string;
};

export default function CredentialsPage() {

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [credentials, setCredentials] =
    useState<Credential[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    walletConnected,
    setWalletConnected,
  ] = useState(false);

  const [
    walletAddress,
    setWalletAddress,
  ] = useState("");

  const [
    signature,
    setSignature,
  ] = useState("");

  // CONNECT WALLET
  const connectWallet =
    async () => {

      try {

        if (
          !window.ethereum
        ) {

          toast.error(
            "MetaMask not detected"
          );

          return;
        }

        const accounts =
          await window.ethereum.request({
            method:
              "eth_requestAccounts",
          });

        const account =
          accounts[0];

        setWalletAddress(
          account
        );

        setWalletConnected(
          true
        );

        // SIGN AUTH MESSAGE
        const message =
          "PortalProof Credential Authorization";

        const signedMessage =
          await window.ethereum.request({

            method:
              "personal_sign",

            params: [
              message,
              account,
            ],
          });

        setSignature(
          signedMessage
        );

        toast.success(
          "Wallet connected successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Wallet connection failed"
        );
      }
    };

  // FETCH REAL DATABASE CREDENTIALS
  useEffect(() => {

    const fetchCredentials =
      async () => {

        try {

          const response =
            await fetch(
              "/api/dashboard"
            );

          const data =
            await response.json();

          if (
            data.success
          ) {

            const formatted =
              data.dashboard.credentials.map(
                (
                  credential: any
                ) => ({

                  recipient:
                    credential.recipientName,

                  title:
                    credential.title,

                  institution:
                    credential.recipientEmail,

                  date:
                    new Date(
                      credential.issuedAt
                    ).toLocaleDateString(),

                  metadata:
                    credential.blockchainHash,

                  status:
                    credential.status ===
                    "issued"
                      ? "Verified"
                      : "Pending",

                  verificationId:
                    credential.id,
                })
              );

            setCredentials(
              formatted
            );
          }

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to fetch credentials"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchCredentials();

  }, []);

  const filteredCredentials =
    credentials.filter(
      (credential) => {

        const title =
          credential.title || "";

        const recipient =
          credential.recipient || "";

        const institution =
          credential.institution || "";

        const verificationId =
          credential.verificationId || "";

        const matchesSearch =

          title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          recipient
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          institution
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          verificationId
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesFilter =

          activeFilter === "All" ||

          credential.status ===
            activeFilter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  // CREATE REAL CREDENTIAL
  async function handleCreateCredential(
    newCredential: {
      recipient: string;
      title: string;
      institution: string;
      date: string;
      metadata: string;
      verificationId: string;
    }
  ) {

    try {

      if (
        !walletConnected
      ) {

        toast.error(
          "Connect MetaMask first"
        );

        return;
      }

      toast.loading(
        "Creating credential...",
        {
          id: "credential",
        }
      );

      // SIGN CREATION MESSAGE
      const signedCredential =
        await window.ethereum.request({

          method:
            "personal_sign",

          params: [
            `Issuing credential for ${newCredential.recipient}`,
            walletAddress,
          ],
        });

      const response =
        await fetch(
          "/api/credentials/issue",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              fullName:
                newCredential.recipient,

              email:
                `${newCredential.recipient
                  .replace(/\s/g, "")
                  .toLowerCase()}@gmail.com`,

              institutionName:
                newCredential.institution,

              course:
                newCredential.title,

              grade:
                "A",

              walletAddress,

              signature:
                signedCredential,
            }),
          }
        );

      const data =
        await response.json();

      if (
        data.success
      ) {

        const credential: Credential = {

          recipient:
            data.credential
              .recipientName,

          title:
            data.credential
              .title,

          institution:
            data.credential
              .recipientEmail,

          date:
            new Date(
              data.credential
                .issuedAt
            ).toLocaleDateString(),

          metadata:
            data.credential
              .blockchainHash,

          verificationId:
            data.credential.id,

          status:
            "Verified",
        };

        setCredentials(
          (prev) => [
            credential,
            ...prev,
          ]
        );

        console.log(
          "PORTALDOT BLOCKCHAIN:",
          data.blockchain
        );

        console.log(
          "TRANSACTION HASH:",
          data.credential.blockchainHash
        );

        toast.success(
          "Credential created successfully!",
          {
            id: "credential",
          }
        );

        // SHOW BLOCKCHAIN INFO
        if (
          data.blockchain
        ) {

          toast.success(
            `Connected to ${data.blockchain.chain}`
          );

          console.log(
            "CHAIN:",
            data.blockchain.chain
          );

          console.log(
            "FEE:",
            data.blockchain.fee
          );

          console.log(
            "WEIGHT:",
            data.blockchain.weight
          );

          console.log(
            "CLASS:",
            data.blockchain.class
          );
        }

        setIsModalOpen(
          false
        );

      } else {

        toast.error(
          "Credential creation failed",
          {
            id: "credential",
          }
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong",
        {
          id: "credential",
        }
      );
    }
  }

  // DELETE
  function deleteCredential(
    verificationId: string
  ) {

    const updatedCredentials =
      credentials.filter(
        (credential) =>
          credential.verificationId !==
          verificationId
      );

    setCredentials(
      updatedCredentials
    );

    toast.success(
      "Credential deleted"
    );
  }

  // DOWNLOAD PDF
  function downloadCertificate(
    credential: Credential
  ) {

    const doc =
      new jsPDF(
        "landscape"
      );

    doc.setFillColor(
      5,
      8,
      22
    );

    doc.rect(
      0,
      0,
      297,
      210,
      "F"
    );

    doc.setDrawColor(
      34,
      211,
      238
    );

    doc.setLineWidth(2);

    doc.rect(
      10,
      10,
      277,
      190
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(28);

    doc.text(
      "PORTALPROOF CERTIFICATE",
      148.5,
      50,
      {
        align: "center",
      }
    );

    doc.setFontSize(20);

    doc.text(
      credential.recipient,
      148.5,
      90,
      {
        align: "center",
      }
    );

    doc.setFontSize(16);

    doc.text(
      credential.title,
      148.5,
      120,
      {
        align: "center",
      }
    );

    doc.text(
      credential.institution,
      148.5,
      145,
      {
        align: "center",
      }
    );

    doc.text(
      credential.verificationId,
      148.5,
      170,
      {
        align: "center",
      }
    );

    doc.save(
      `${credential.recipient}-certificate.pdf`
    );

    toast.success(
      "Certificate downloaded successfully!"
    );
  }

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white p-8">

        <LoadingSpinner />

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-8 overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">

        <div>

          <div className="flex items-center gap-2 mb-4">

            <ShieldCheck className="text-cyan-400" />

            <p className="text-cyan-400 font-semibold">
              Credential Management
            </p>

          </div>

          <h1 className="text-5xl font-bold">
            Credentials
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Manage blockchain-secured credentials and verification systems.
          </p>

        </div>

        <div className="flex flex-col gap-4">

          {/* WALLET */}
          <button
            onClick={connectWallet}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-4 rounded-3xl font-semibold flex items-center gap-3"
          >

            <Wallet size={20} />

            {
              walletConnected
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect MetaMask"
            }

          </button>

          {/* CREATE */}
          <button
            onClick={() =>
              setIsModalOpen(true)
            }
            className="bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-300 text-white px-8 py-5 rounded-3xl font-semibold"
          >

            Create Credential

          </button>

        </div>

      </div>

      {/* SEARCH */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 mb-12">

        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search credentials..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full"
          />

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10 relative z-10">

        {filteredCredentials.length > 0 ? (

          filteredCredentials.map(
            (
              credential,
              index
            ) => (

              <CredentialCard
                key={index}
                credential={
                  credential
                }
                onDownload={() =>
                  downloadCertificate(
                    credential
                  )
                }
                onDelete={() =>
                  deleteCredential(
                    credential.verificationId
                  )
                }
              />

            )
          )

        ) : (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <EmptyState
              title="No Credentials Found"
              description="No credentials match your current query."
            />

          </motion.div>

        )}

      </div>

      {/* MODAL */}
      <CreateCredentialModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onCreate={
          handleCreateCredential
        }
      />

    </main>
  );
}