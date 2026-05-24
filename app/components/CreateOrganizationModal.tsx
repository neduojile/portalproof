"use client";

import { useEffect, useState } from "react";

import {
  X,
  Building2,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (organization: {
    name: string;
    type: string;
    description: string;
  }) => void;
};

export default function CreateOrganizationModal({
  isOpen,
  onClose,
  onCreate,
}: Props) {

  const [name, setName] =
    useState("");

  const [type, setType] =
    useState("University");

  const [description, setDescription] =
    useState("");

  /* ESC Close */
  useEffect(() => {

    function handleEscape(
      e: KeyboardEvent
    ) {

      if (e.key === "Escape") {

        onClose();

      }

    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );

  }, [onClose]);

  function handleSubmit() {

    if (
      !name ||
      !type ||
      !description
    ) return;

    onCreate({
      name,
      type,
      description,
    });

    setName("");

    setType("University");

    setDescription("");

    onClose();

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
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative w-full max-w-2xl bg-[#050816] border border-white/10 rounded-[36px] p-8 overflow-hidden"
          >

            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              {/* Header */}
              <div className="flex items-start justify-between mb-10">

                <div>

                  <div className="flex items-center gap-3 mb-4">

                    <div className="bg-cyan-500/10 p-3 rounded-2xl">

                      <Sparkles
                        className="text-cyan-400"
                        size={22}
                      />

                    </div>

                    <div>

                      <h2 className="text-3xl font-bold">
                        Create Organization
                      </h2>

                      <p className="text-gray-400 mt-1">
                        Add a new verified institution
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  onClick={onClose}
                  className="bg-white/5 hover:bg-white/10 transition-all duration-300 p-3 rounded-2xl"
                >

                  <X size={22} />

                </button>

              </div>

              {/* Form */}
              <div className="space-y-6">

                {/* Name */}
                <div>

                  <label className="text-sm text-gray-400 mb-3 block">
                    Organization Name
                  </label>

                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">

                    <Building2
                      className="text-cyan-400"
                      size={20}
                    />

                    <input
                      type="text"
                      placeholder="Enter organization name..."
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      className="bg-transparent outline-none w-full"
                    />

                  </div>

                </div>

                {/* Type */}
                <div>

                  <label className="text-sm text-gray-400 mb-3 block">
                    Organization Type
                  </label>

                  <select
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  >

                    <option value="University">
                      University
                    </option>

                    <option value="DAO Network">
                      DAO Network
                    </option>

                    <option value="Institution">
                      Institution
                    </option>

                    <option value="Company">
                      Company
                    </option>

                  </select>

                </div>

                {/* Description */}
                <div>

                  <label className="text-sm text-gray-400 mb-3 block">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Describe this organization..."
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
                  />

                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">

                  <button
                    onClick={onClose}
                    className="border border-white/10 hover:border-white/20 transition-all duration-300 px-6 py-3 rounded-2xl"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-8 py-3 rounded-2xl text-black font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    Create Organization
                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}