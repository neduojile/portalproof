"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

export default function VerifyByIdPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  // NEXTJS 16 FIX
  const { id } =
    use(params);

  const [loading, setLoading] =
    useState(true);

  const [credential, setCredential] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const verifyCredential =
      async () => {

        try {

          const response =
            await fetch(
              `/api/credentials/verify/${id}`
            );

          const data =
            await response.json();

          if (data.success) {

            setCredential(
              data.credential
            );

          } else {

            setError(
              "Credential verification failed"
            );
          }

        } catch (err) {

          console.log(err);

          setError(
            "Something went wrong"
          );

        } finally {

          setLoading(false);
        }
      };

    verifyCredential();

  }, [id]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">

        Verifying Credential...

      </div>
    );
  }

  // ERROR
  if (error) {

    return (

      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-3xl">

        {error}

      </div>
    );
  }

  // NO CREDENTIAL
  if (!credential) {

    return (

      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-3xl">

        Credential not found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-10 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-3xl mx-auto bg-white/5 border border-white/10 p-10 rounded-[32px] backdrop-blur-xl">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">

          <div className="bg-green-500/10 p-4 rounded-2xl">

            <div className="w-5 h-5 rounded-full bg-green-400"></div>

          </div>

          <div>

            <h1 className="text-5xl font-bold text-green-400">

              Credential Verified

            </h1>

            <p className="text-gray-400 mt-2">

              This credential is authentic and secured on-chain.

            </p>

          </div>

        </div>

        {/* DETAILS */}
        <div className="space-y-5">

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Student Name

            </p>

            <h2 className="text-2xl font-bold">

              {credential.recipientName}

            </h2>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Student Email

            </p>

            <h2 className="text-xl font-semibold break-all">

              {credential.recipientEmail}

            </h2>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Course

            </p>

            <h2 className="text-2xl font-bold">

              {credential.course}

            </h2>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Grade

            </p>

            <h2 className="text-2xl font-bold text-cyan-400">

              {credential.grade}

            </h2>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Status

            </p>

            <div className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full font-semibold">

              {credential.status}

            </div>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Certificate Hash

            </p>

            <h2 className="text-sm break-all text-cyan-400">

              {credential.certificateHash}

            </h2>

          </div>

          <div className="bg-black/30 border border-white/10 p-6 rounded-2xl">

            <p className="text-gray-400 text-sm mb-2">

              Blockchain Hash

            </p>

            <h2 className="text-sm break-all text-cyan-400">

              {credential.blockchainHash}

            </h2>

          </div>

        </div>

        {/* BLOCKCHAIN STATUS */}
        <div className="mt-10 bg-green-500/10 border border-green-500/20 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold text-green-400 mb-6">

            Portaldot Blockchain

          </h2>

          <div className="space-y-4">

            <p>

              <strong>Chain:</strong>{" "}
              Portaldot Mainnet

            </p>

            <p>

              <strong>Status:</strong>{" "}
              Connected

            </p>

            <p>

              <strong>Verification:</strong>{" "}
              Successful

            </p>

            <p>

              <strong>Transaction:</strong>{" "}
              Confirmed On-Chain

            </p>

          </div>

          <div className="mt-6 bg-black/30 border border-green-500/10 p-5 rounded-2xl">

            <p className="text-green-400 font-bold text-lg">

              Credential secured permanently on Portaldot blockchain.

            </p>

          </div>

        </div>

        {/* QR CODE */}
        {credential.qrCode && (

          <div className="mt-10">

            <p className="font-bold mb-5 text-2xl">

              QR Verification

            </p>

            <div className="bg-white inline-block p-4 rounded-3xl">

              <img
                src={credential.qrCode}
                alt="QR Code"
                className="w-56 h-56"
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}