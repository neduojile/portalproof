"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [credentialId, setCredentialId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  function normalizeCredentialId(
    value: string
  ) {
    const trimmed = value.trim();

    const match = trimmed.match(
      /(?:[?&]id=|\/verify\/|\/credential\/)([A-Za-z0-9\-_]+)/i
    );

    return match
      ? match[1]
      : trimmed;
  }

  const verifyCredential = async () => {
    try {
      setLoading(true);

      const id = normalizeCredentialId(
        credentialId
      );

      const response = await fetch(
        "/api/credentials/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credentialId: id,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Verify Credential
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter Credential ID"
            value={credentialId}
            onChange={(e) =>
              setCredentialId(e.target.value)
            }
            className="w-full p-4 rounded bg-zinc-900 border border-zinc-700"
          />

          <button
            onClick={verifyCredential}
            className="w-full bg-green-600 hover:bg-green-700 p-4 rounded font-bold"
          >
            {loading
              ? "Verifying..."
              : "Verify Credential"}
          </button>

        </div>

        {result && (
          <div className="mt-10 bg-zinc-900 p-6 rounded">

            {result.verified ? (
              <div>

                <h2 className="text-3xl font-bold text-green-500 mb-4">
                  Credential Verified
                </h2>

                <p>
                  <strong>Name:</strong>{" "}
                  {result.credential.recipientName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {result.credential.recipientEmail}
                </p>

                <p>
                  <strong>Course:</strong>{" "}
                  {result.credential.course}
                </p>

                <p>
                  <strong>Grade:</strong>{" "}
                  {result.credential.grade}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {result.credential.status}
                </p>

                <p>
                  <strong>Certificate Hash:</strong>{" "}
                  {result.credential.certificateHash}
                </p>

                <p>
                  <strong>Blockchain Hash:</strong>{" "}
                  {result.credential.blockchainHash}
                </p>

                {result.credential.qrCode && (
                  <div className="mt-6">

                    <p className="font-bold mb-3">
                      QR Code
                    </p>

                    <img
                      src={result.credential.qrCode}
                      alt="QR Code"
                      className="w-52 h-52 bg-white p-2 rounded-lg"
                    />

                  </div>
                )}

              </div>
            ) : (
              <div>

                <h2 className="text-3xl font-bold text-red-500 mb-4">
                  Invalid Credential
                </h2>

                <p>
                  This credential does not exist
                  or failed verification.
                </p>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}