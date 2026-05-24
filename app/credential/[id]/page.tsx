"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  motion,
} from "framer-motion";

import toast from "react-hot-toast";

import {

  ShieldCheck,

  GraduationCap,

  Building2,

  Calendar,

  BadgeCheck,

  Hash,

  Wallet,

  Fingerprint,

  CheckCircle2,

  Copy,

  Clock3,

  ExternalLink,

} from "lucide-react";

type Credential = {

  id: string;

  title: string;

  recipientName: string;

  recipientEmail: string;

  course: string;

  grade: string;

  issuedAt: string;

  qrCode: string;

  certificateHash: string;

  blockchainHash: string;

  signature: string;

  issuerWallet: string;

  status: string;

  transactionHash?: string;
};

export default function CredentialPage() {

  const params =
    useParams();

  const [
    credential,
    setCredential,
  ] = useState<
    Credential | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    verifiedAt,
    setVerifiedAt,
  ] = useState("");

  // COPY
  const copyText = (
    text: string
  ) => {

    navigator.clipboard.writeText(
      text
    );

    toast.success(
      "Copied"
    );
  };

  // SHORTEN
  const shorten = (
    value: string
  ) => {

    if (!value) return "";

    return `${value.slice(
      0,
      10
    )}...${value.slice(-10)}`;
  };

  useEffect(() => {

    const fetchCredential =
      async () => {

        try {

          const response =
            await fetch(
              `/api/credentials/verify?id=${params.id}`
            );

          const data =
            await response.json();

          if (
            data.success &&
            data.verified
          ) {

            setCredential(
              data.credential
            );

            setVerifiedAt(
              new Date().toLocaleString()
            );
          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    if (params.id) {

      fetchCredential();
    }

  }, [params.id]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">

        <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white text-2xl">

          Verifying credential...

        </p>

      </div>
    );
  }

  // NOT FOUND
  if (!credential) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-2xl">

        Credential not found

      </div>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden p-4 md:p-6">

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="bg-white/5 border border-cyan-500/10 rounded-[40px] p-6 md:p-10 mb-8"
        >

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            <div>

              <div className="flex items-center gap-4 mb-6">

                <div className="bg-cyan-500/10 p-4 rounded-2xl">

                  <ShieldCheck
                    className="text-cyan-400"
                    size={34}
                  />

                </div>

                <div>

                  <h1 className="text-3xl md:text-5xl font-bold">

                    Verified Credential

                  </h1>

                  <p className="text-gray-400 mt-2 text-base md:text-lg">

                    Blockchain secured academic proof

                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-4">

              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-2xl flex items-center gap-3 h-fit">

                <CheckCircle2
                  size={22}
                />

                <span className="font-semibold">

                  Verified On-Chain

                </span>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">

                <Clock3
                  size={18}
                  className="text-cyan-400"
                />

                <div>

                  <p className="text-xs text-gray-400">

                    Verification Time

                  </p>

                  <p className="text-sm">

                    {verifiedAt}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT */}
          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="xl:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-6 md:p-10"
          >

            <h2 className="text-3xl md:text-4xl font-bold mb-10 break-words">

              {credential.title}

            </h2>

            <div className="space-y-10">

              {[
                {
                  label:
                    "Student Name",
                  value:
                    credential.recipientName,
                  icon:
                    <GraduationCap
                      className="text-cyan-400 mt-1"
                      size={30}
                    />,
                },

                {
                  label:
                    "Recipient Email",
                  value:
                    credential.recipientEmail,
                  icon:
                    <Building2
                      className="text-cyan-400 mt-1"
                      size={30}
                    />,
                },

                {
                  label:
                    "Course",
                  value:
                    credential.course,
                  icon:
                    <ShieldCheck
                      className="text-cyan-400 mt-1"
                      size={30}
                    />,
                },

                {
                  label:
                    "Grade",
                  value:
                    credential.grade,
                  icon:
                    <BadgeCheck
                      className="text-cyan-400 mt-1"
                      size={30}
                    />,
                },

                {
                  label:
                    "Issued At",
                  value:
                    new Date(
                      credential.issuedAt
                    ).toLocaleDateString(),
                  icon:
                    <Calendar
                      className="text-cyan-400 mt-1"
                      size={30}
                    />,
                },

              ].map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      x: 6,
                    }}

                    className="flex gap-5"
                  >

                    {item.icon}

                    <div>

                      <p className="text-gray-400 text-sm">

                        {item.label}

                      </p>

                      <h3 className="text-xl md:text-2xl font-semibold mt-2 break-all">

                        {item.value}

                      </h3>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="bg-white/5 border border-white/10 rounded-[40px] p-6 md:p-8"
          >

            <h2 className="text-2xl md:text-3xl font-bold mb-8">

              Blockchain Metadata

            </h2>

            {/* QR */}
            {credential.qrCode && (

              <div className="bg-white p-5 rounded-3xl mb-8">

                <img
                  src={credential.qrCode}
                  alt="QR Code"
                  className="w-full rounded-2xl"
                />

              </div>
            )}

            {/* METADATA */}
            <div className="space-y-8">

              {[
                {
                  label:
                    "Certificate Hash",
                  value:
                    credential.certificateHash,
                  preview:
                    shorten(
                      credential.certificateHash
                    ),
                  icon:
                    <Hash
                      className="text-cyan-400"
                      size={18}
                    />,
                },

                {
                  label:
                    "Blockchain Hash",
                  value:
                    credential.blockchainHash,
                  preview:
                    shorten(
                      credential.blockchainHash
                    ),
                  icon:
                    <Hash
                      className="text-cyan-400"
                      size={18}
                    />,
                },

                {
                  label:
                    "Issuer Wallet",
                  value:
                    credential.issuerWallet,
                  preview:
                    shorten(
                      credential.issuerWallet
                    ),
                  icon:
                    <Wallet
                      className="text-green-400"
                      size={18}
                    />,
                },

                {
                  label:
                    "Digital Signature",
                  value:
                    credential.signature,
                  preview:
                    shorten(
                      credential.signature
                    ),
                  icon:
                    <Fingerprint
                      className="text-yellow-400"
                      size={18}
                    />,
                },

              ].map(
                (
                  item,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      scale: 1.02,
                    }}

                    className="bg-black/30 border border-white/10 rounded-3xl p-5"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <div className="flex items-center gap-2">

                        {item.icon}

                        <p className="text-gray-400 text-sm">

                          {item.label}

                        </p>

                      </div>

                      <button
                        onClick={() =>
                          copyText(
                            item.value
                          )
                        }
                        className="text-gray-400 hover:text-white transition"
                      >

                        <Copy
                          size={16}
                        />

                      </button>

                    </div>

                    <p className="break-all text-xs leading-relaxed text-cyan-300">

                      {item.preview}

                    </p>

                  </motion.div>
                )
              )}

              {/* TRANSACTION STATUS */}
              <motion.div

                whileHover={{
                  scale: 1.02,
                }}

                className="bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-3xl p-5"
              >

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-2">

                    <ExternalLink
                      className="text-cyan-400"
                      size={18}
                    />

                    <p className="text-gray-400 text-sm">

                      Blockchain Status

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                  <p className="text-green-400 font-semibold">

                    Transaction Confirmed

                  </p>

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}