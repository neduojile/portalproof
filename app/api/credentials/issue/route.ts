import QRCode from "qrcode";
import crypto from "crypto";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { execSync } from "child_process";

import { connectBlockchain } from "@/lib/blockchain";

import {
  issueCredentialOnChain,
} from "@/src/lib/contract";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {

      fullName,

      email,

      institutionName,

      course,

      grade,

      walletAddress,

      signature,

    } = body;

    // CHECK USER
    let user =
      await prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              walletAddress,
            },
          ],
        },
      });

    // CREATE USER
    if (!user) {

      user =
        await prisma.user.create({
          data: {

            fullName,

            email,

            walletAddress,
          },
        });
    }

    // CHECK INSTITUTION
    let institution =
      await prisma.institution.findUnique({
        where: {

          email:
            `${institutionName.toLowerCase()}@portalproof.edu`,
        },
      });

    // CREATE INSTITUTION
    if (!institution) {

      institution =
        await prisma.institution.create({
          data: {

            name:
              institutionName,

            email:
              `${institutionName.toLowerCase()}@portalproof.edu`,
          },
        });
    }

    // CERTIFICATE HASH
    const certificateHash =
      crypto
        .createHash("sha256")
        .update(
          JSON.stringify({
            fullName,
            email,
            course,
            grade,
          })
        )
        .digest("hex");

    // BLOCKCHAIN HASH
    const blockchainHash =
      crypto
        .createHash("sha256")
        .update(
          JSON.stringify({
            walletAddress,
            institutionName,
            issuedAt:
              new Date(),
          })
        )
        .digest("hex");

    // REAL BLOCKCHAIN CONNECTION
    let blockchainData;

    try {

      const api =
        await connectBlockchain();

      const chain =
        await api.rpc.system.chain();

      const latestBlock =
        await api.rpc.chain.getBlockHash();

      // OPTIONAL REAL FEE SCRIPT
      let fee = "0.02";

      try {

        const blockchainResult =
          execSync(
            "py blockchain/estimate_fee.py"
          ).toString();

        const parsed =
          JSON.parse(
            blockchainResult
          );

        fee =
          parsed.fee || "0.02";

      } catch (feeError) {

        console.log(
          "FEE SCRIPT ERROR:",
          feeError
        );
      }

      blockchainData = {

        success: true,

        chain:
          chain.toString(),

        latestBlock:
          latestBlock.toString(),

        fee,

        class:
          "Normal",

        weight:
          "1000000",
      };

      console.log(
        "BLOCKCHAIN DATA:",
        blockchainData
      );

    } catch (blockchainError) {

      console.log(
        "BLOCKCHAIN ERROR:",
        blockchainError
      );

      // SAFE FALLBACK
      blockchainData = {

        success: false,

        chain:
          "Portaldot Offline",

        latestBlock:
          "Unavailable",

        fee:
          "0.02",

        class:
          "Normal",

        weight:
          "1000000",
      };
    }

    // CREATE CREDENTIAL
    const credential =
      await prisma.credential.create({
        data: {

          title:
            `${course} Certificate`,

          recipientName:
            fullName,

          recipientEmail:
            email,

          course,

          grade,

          status:
            "issued",

          certificateHash,

          blockchainHash,

          // WEB3 SIGNATURE
          signature:
            signature || null,

          issuerWallet:
            walletAddress,

          // POT FEE
          potFee:
            Number(
              blockchainData.fee
            ),

          institutionId:
            institution.id,

          userId:
            user.id,
        },
      });

    // VERIFICATION URL
    const verificationUrl =
      `http://localhost:3000/verification?id=${credential.id}`;

    // QR CODE
    const qrCode =
      await QRCode.toDataURL(
        verificationUrl
      );

    // UPDATE QR
    const updatedCredential =
      await prisma.credential.update({
        where: {
          id:
            credential.id,
        },

        data: {
          qrCode,
        },
      });

    // SMART CONTRACT PREPARATION
    const onChainResult =
      await issueCredentialOnChain(

        updatedCredential.id,

        updatedCredential.recipientEmail,

        String(updatedCredential.title),

        updatedCredential.course,

        String(updatedCredential.grade),
      );

    console.log(
      "ONCHAIN RESULT:",
      onChainResult
    );

    return NextResponse.json({

      success: true,

      message:
        "Credential issued successfully",

      blockchain:
        blockchainData,

      onChain:
        onChainResult,

      credential:
        updatedCredential,
    });

  } catch (error) {

    console.log(
      "ISSUE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to issue credential",

        error:
          String(error),
      },
      {
        status: 500,
      }
    );
  }
}