import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    // TOTAL CREDENTIALS
    const credentialsCount =
      await prisma.credential.count();

    // TOTAL INSTITUTIONS
    const institutionsCount =
      await prisma.institution.count();

    // TOTAL USERS
    const usersCount =
      await prisma.user.count();

    return NextResponse.json({
      success: true,

      stats: {
        credentialsCount,
        institutionsCount,
        usersCount,
      },
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
      },
      {
        status: 500,
      }
    );
  }
}