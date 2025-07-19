import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
  context: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = context.params;

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
