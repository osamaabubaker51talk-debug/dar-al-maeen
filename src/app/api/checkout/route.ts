import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "خدمة الدفع غير مُعدّة حالياً" },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const { bookId, price, title } = body as {
    bookId: string;
    price: number;
    title: string;
  };

  if (!bookId || !price || !title) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: title },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/dashboard/orders?success=1`,
    cancel_url: `${origin}/books?cancelled=1`,
    metadata: {
      userId: session.user.id,
      bookId,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
