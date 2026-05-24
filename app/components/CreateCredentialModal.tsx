"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  ShieldCheck,
  Loader2,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  onCreate: (credential: {
    recipient: string;
    title: string;
    institution: string;
    date: string;
    metadata: string;
    verificationId: string;
  }) => Promise<void>;
};

export default function CreateCredentialModal({
  isOpen,
  onClose,
  onCreate,
}: Props) {

  const [recipient, setRecipient] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [institution, setInstitution] =
    useState("");

  const [date, setDate] =
    useState("");

  const [metadata, setMetadata] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    if (
      !recipient ||
      !title ||
      !institution ||
      !date
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    try {

      setLoading(true);

      const verificationId =
        `PP-${Math.floor(
          Math.random() * 100000
        )}`;

      await onCreate({
        recipient,
        title,
        institution,
        date,
        metadata,
        verificationId,
      });

      // RESET
      setRecipient("");
      setTitle("");
      setInstitution("");
      setDate("");
      setMetadata("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  return (

    <AnimatePresence>

      {isOpen && (

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
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6"
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#050816] border border-white/10 rounded-[40px] p-10 relative"
          >

            {/* CLOSE */}
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-6 right-6 text-gray-400 hover:text-white disabled:opacity-50"
            >

              <X size={24} />

            </button>

            {/* HEADER */}
            <div className="mb-10">

              <div className="flex items-center gap-3 mb-5">

                <div className="bg-cyan-500/10 p-3 rounded-2xl">

                  <ShieldCheck className="text-cyan-400" />

                </div>

                <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                  Blockchain Credential

                </div>

              </div>

              <h2 className="text-4xl font-bold mb-4">
                Create Credential
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Create and issue a blockchain-secured credential through the PortalProof ecosystem.
              </p>

            </div>

            {/* FORM */}
            <div className="space-y-6">

              {/* RECIPIENT */}
              <div>

                <label className="text-sm text-gray-400 block mb-3">

                  Recipient Name

                </label>

                <input
                  type="text"
                  value={recipient}
                  onChange={(e) =>
                    setRecipient(
                      e.target.value
                    )
                  }
                  placeholder="Alex Morgan"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-50"
                />

              </div>

              {/* TITLE */}
              <div>

                <label className="text-sm text-gray-400 block mb-3">

                  Credential Title

                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Advanced Solidity Engineering"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-50"
                />

              </div>

              {/* INSTITUTION */}
              <div>

                <label className="text-sm text-gray-400 block mb-3">

                  Institution

                </label>

                <input
                  type="text"
                  value={institution}
                  onChange={(e) =>
                    setInstitution(
                      e.target.value
                    )
                  }
                  placeholder="Web3 Academy"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-50"
                />

              </div>

              {/* DATE */}
              <div>

                <label className="text-sm text-gray-400 block mb-3">

                  Issue Date

                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 disabled:opacity-50"
                />

              </div>

              {/* METADATA */}
              <div>

                <label className="text-sm text-gray-400 block mb-3">

                  Metadata

                </label>

                <textarea
                  rows={4}
                  value={metadata}
                  onChange={(e) =>
                    setMetadata(
                      e.target.value
                    )
                  }
                  placeholder="Blockchain Verified"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none focus:border-cyan-400 disabled:opacity-50"
                />

              </div>

            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-4 mt-10">

              <button
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 rounded-2xl border border-white/10 hover:border-white/20 disabled:opacity-50"
              >

                Cancel

              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 transition-all duration-300 px-8 py-3 rounded-2xl text-black font-semibold flex items-center gap-3"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  "Create Credential"
                )}

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}