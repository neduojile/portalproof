import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const credentials =
      await prisma.credential.findMany({

        orderBy: {
          issuedAt: "desc",
        },

        include: {
          institution: true,
          user: true,
        },
      });

    return NextResponse.json({

      success: true,

      dashboard: {
        credentials,
      },
    });

  } catch (error) {

    console.log(
      "DASHBOARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to fetch dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}