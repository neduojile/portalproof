import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { credentialId } = body;

    if (!credentialId) {
      return NextResponse.json(
        {
          success: false,
          message: "No credential ID provided",
        },
        { status: 400 }
      );
    }

    const credential = await prisma.credential.findFirst({
      where: {
        id: credentialId,
      },
    });

    if (!credential) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Credential not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      credential,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}