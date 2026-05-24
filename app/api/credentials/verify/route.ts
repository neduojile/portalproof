import QRCode from "qrcode";
import crypto from "crypto";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      await prisma.user.findUnique({
        where: {
          email,
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

    // REAL CERTIFICATE HASH
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

    // REAL BLOCKCHAIN HASH
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

          // WEB3 SIGNATURE DATA
          signature,

          issuerWallet:
            walletAddress,

          potFee:
            0.02,

          institutionId:
            institution.id,

          userId:
            user.id,
        },
      });

    // VERIFICATION URL
    const verificationUrl =
      `http://localhost:3000/credential/${credential.id}`;

    // GENERATE QR
    const qrCode =
      await QRCode.toDataURL(
        verificationUrl
      );

    // UPDATE WITH QR
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

    return NextResponse.json({

      success: true,

      message:
        "Credential issued successfully",

      credential:
        updatedCredential,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to issue credential",
      },
      {
        status: 500,
      }
    );
  }
}