"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function IssuePage() {

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  // DOWNLOAD PDF
  const downloadPDF = async () => {

    if (!result) return;

    const img = new Image();

    img.src =
      "/certificate-template.png";

    img.onload = () => {

      const doc = new jsPDF(
        "landscape",
        "px",
        "a4"
      );

      // TEMPLATE
      doc.addImage(
        img,
        "PNG",
        0,
        0,
        842,
        595
      );

      // NAME
      doc.setFontSize(28);

      doc.setTextColor(
        255,
        190,
        70
      );

      doc.text(
        result.credential.recipientName,
        421,
        255,
        {
          align: "center",
        }
      );

      // COURSE
      doc.setFontSize(18);

      doc.setTextColor(
        255,
        255,
        255
      );

      doc.text(
        `Completed ${result.credential.course}`,
        421,
        315,
        {
          align: "center",
        }
      );

      // GRADE
      doc.setFontSize(16);

      doc.text(
        `Grade: ${result.credential.grade}`,
        421,
        350,
        {
          align: "center",
        }
      );

      // DATE
      doc.setFontSize(14);

      doc.setTextColor(
        180,
        180,
        180
      );

      doc.text(
        new Date(
          result.credential.createdAt
        ).toLocaleDateString(),
        421,
        390,
        {
          align: "center",
        }
      );

      // QR
      if (
        result.credential.qrCode
      ) {

        doc.addImage(
          result.credential.qrCode,
          "PNG",
          640,
          380,
          110,
          110
        );
      }

      // HASHES
      doc.setFontSize(8);

      doc.setTextColor(
        120,
        120,
        120
      );

      doc.text(
        result.credential.certificateHash,
        40,
        540
      );

      doc.text(
        result.credential.blockchainHash,
        40,
        555
      );

      // SAVE
      doc.save(
        `${result.credential.recipientName}-certificate.pdf`
      );
    };
  };

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      institutionName: "",
      course: "",
      grade: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      // CHECK METAMASK
      if (
        !(window as any).ethereum
      ) {

        alert(
          "Please install MetaMask"
        );

        return;
      }

      // CONNECT WALLET
      const accounts =
        await (
          window as any
        ).ethereum.request({
          method:
            "eth_requestAccounts",
        });

      const walletAddress =
        accounts[0];

      // SIGN MESSAGE
      const signature =
        await (
          window as any
        ).ethereum.request({
          method:
            "personal_sign",

          params: [
            `Issuing credential for ${formData.fullName}`,
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
              ...formData,
              walletAddress,
              signature,
            }),
          }
        );

      const data =
        await response.json();

      setResult(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative p-10">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">

        <h1 className="text-5xl font-bold mb-8">

          Issue Credential

        </h1>

        {/* WALLET INFO */}
        <div className="mb-8 bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl">

          <p className="text-cyan-400 font-semibold">
            Wallet signing enabled with MetaMask
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Credentials are secured through Portaldot blockchain verification.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Student Full Name"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Student Email"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="institutionName"
            placeholder="Institution Name"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="grade"
            placeholder="Grade"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 p-4 rounded-2xl font-bold text-black hover:scale-[1.02]"
          >

            {loading
              ? "Issuing..."
              : "Issue Credential"}

          </button>

        </form>

        {result && (

          <div className="mt-10 bg-zinc-900/70 border border-white/10 p-8 rounded-[32px]">

            <h2 className="text-3xl font-bold mb-6 text-cyan-400">

              Credential Issued

            </h2>

            <div className="space-y-4 text-lg">

              <p>
                <strong>ID:</strong>{" "}
                {result.credential.id}
              </p>

              <p>
                <strong>Certificate Hash:</strong>{" "}
                {result.credential.certificateHash}
              </p>

              <p>
                <strong>Blockchain Hash:</strong>{" "}
                {result.credential.blockchainHash}
              </p>

              <p>
                <strong>POT Fee:</strong>{" "}
                {result.credential.potFee}
              </p>

            </div>

            {/* BLOCKCHAIN SECTION */}

            {result.blockchain && (

              <div className="mt-8 border border-green-700 bg-green-950/40 p-6 rounded-3xl">

                <h3 className="text-2xl font-bold text-green-400 mb-6">

                  Portaldot Blockchain

                </h3>

                <div className="space-y-3">

                  <p>
                    <strong>Chain:</strong>{" "}
                    {result.blockchain.chain}
                  </p>

                  <p>
                    <strong>Estimated Fee:</strong>{" "}
                    {result.blockchain.fee}
                  </p>

                  <p>
                    <strong>Weight:</strong>{" "}
                    {result.blockchain.weight}
                  </p>

                  <p>
                    <strong>Class:</strong>{" "}
                    {result.blockchain.class}
                  </p>

                </div>

                <p className="text-green-400 font-bold mt-6 text-lg">

                  Connected Successfully

                </p>

              </div>

            )}

            {result.credential.qrCode && (

              <div className="mt-8">

                <p className="font-bold mb-4 text-xl">
                  QR Code
                </p>

                <img
                  src={result.credential.qrCode}
                  alt="QR Code"
                  className="w-56 h-56 bg-white p-3 rounded-2xl"
                />

              </div>

            )}

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={downloadPDF}
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 px-6 py-3 rounded-2xl font-bold"
              >

                Download PDF Certificate

              </button>

              <a
                href={`/verify/${result.credential.id}`}
                target="_blank"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-6 py-3 rounded-2xl font-bold text-black"
              >

                Verify Credential

              </a>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}