import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    // TOTAL CREDENTIALS
    const totalCredentials =
      await prisma.credential.count();

    // VERIFIED
    const verifiedCredentials =
      await prisma.verification.count({
        where: {
          success: true,
        },
      });

    // FAILED
    const failedVerifications =
      await prisma.verification.count({
        where: {
          success: false,
        },
      });

    // INSTITUTIONS
    const institutions =
      await prisma.institution.count();

    // RECENT ACTIVITY
    const recentCredentials =
      await prisma.credential.findMany({
        orderBy: {
          issuedAt: "desc",
        },

        take: 5,
      });

    return NextResponse.json({

      success: true,

      stats: {

        totalCredentials,

        verifiedCredentials,

        failedVerifications,

        institutions,

        recentCredentials,
      },
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        "Failed to fetch dashboard stats",
    });
  }
}