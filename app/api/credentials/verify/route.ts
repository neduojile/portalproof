import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const { id } = body;

    if (!id) {

      return NextResponse.json(
        {
          success: false,
          message: "Credential ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const credential =
      await prisma.credential.findUnique({
        where: {
          id,
        },
      });

    if (!credential) {

      return NextResponse.json(
        {
          success: false,
          message: "Credential not found",
        },
        {
          status: 404,
        }
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
      {
        status: 500,
      }
    );
  }
}