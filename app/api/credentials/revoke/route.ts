import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      credentialId,
    } = body;

    if (!credentialId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Credential ID missing",
        },
        {
          status: 400,
        }
      );
    }

    const existingCredential =
      await prisma.credential.findUnique({
        where: {
          id: credentialId,
        },
      });

    if (!existingCredential) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Credential not found",
        },
        {
          status: 404,
        }
      );
    }

    const revokedCredential =
      await prisma.credential.update({
        where: {
          id: credentialId,
        },
        data: {
          status: "revoked",
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Credential revoked successfully",
      credential:
        revokedCredential,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to revoke credential",
      },
      {
        status: 500,
      }
    );
  }
}