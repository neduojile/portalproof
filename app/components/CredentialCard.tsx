"use client";

import QRCode from "react-qr-code";

import {
  Download,
  Trash2,
  ShieldCheck,
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

type Props = {
  credential: Credential;
  onDownload: () => void;
  onDelete: () => void;
};

export default function CredentialCard({
  credential,
  onDownload,
  onDelete,
}: Props) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300">

      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-8">

        <div>

          <div className="flex items-center gap-2 mb-4">

            <ShieldCheck className="text-cyan-400" size={18} />

            <span className="text-cyan-400 text-sm font-semibold">
              Blockchain Credential
            </span>

          </div>

          <h2 className="text-3xl font-bold leading-tight">

            {credential.title}

          </h2>

        </div>

        {/* QR */}
        <div className="bg-white p-3 rounded-2xl min-w-[110px]">

          <QRCode
            value={
              credential.verificationId
            }
            size={80}
          />

        </div>

      </div>

      {/* Details */}
      <div className="space-y-5">

        <div>

          <p className="text-gray-400 text-sm mb-1">
            Recipient
          </p>

          <h3 className="text-xl font-semibold">
            {credential.recipient}
          </h3>

        </div>

        <div>

          <p className="text-gray-400 text-sm mb-1">
            Institution
          </p>

          <h3 className="text-lg">
            {credential.institution}
          </h3>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-gray-400 text-sm mb-1">
              Issue Date
            </p>

            <p>
              {credential.date}
            </p>

          </div>

          <div>

            <p className="text-gray-400 text-sm mb-1">
              Status
            </p>

            <div
              className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                credential.status ===
                "Verified"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >

              {credential.status}

            </div>

          </div>

        </div>

        <div>

          <p className="text-gray-400 text-sm mb-1">
            Verification ID
          </p>

          <p className="text-cyan-400 font-semibold">
            {credential.verificationId}
          </p>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">

        <button
          onClick={onDownload}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black rounded-2xl py-4 font-semibold flex items-center justify-center gap-3"
        >

          <Download size={18} />

          Download

        </button>

        <button
          onClick={onDelete}
          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center"
        >

          <Trash2 size={18} />

        </button>

      </div>

    </div>

  );

}