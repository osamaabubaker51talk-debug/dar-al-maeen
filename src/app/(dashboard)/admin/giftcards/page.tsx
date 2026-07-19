import prisma from "@/lib/prisma";
import { deleteGiftCard } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGiftCardsPage() {
  let giftCards: {
    id: string;
    code: string;
    amount: { toString(): string };
    balance: { toString(): string };
    isUsed: boolean;
    receiverEmail: string | null;
    createdAt: Date;
  }[] = [];

  try {
    giftCards = await prisma.giftCard.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    giftCards = [];
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          بطاقات الهدايا
        </h2>
        <a
          href="/admin/giftcards/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة بطاقة هدية
        </a>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {giftCards.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد بطاقات هدايا بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">الكود</th>
                  <th className="px-4 py-3">المبلغ</th>
                  <th className="px-4 py-3">الرصيد المتبقي</th>
                  <th className="px-4 py-3">البريد الإلكتروني</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">تاريخ الإنشاء</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {giftCards.map((card) => (
                  <tr key={card.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-mono font-bold text-navy">
                      {card.code}
                    </td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      ${card.amount.toString()}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      ${card.balance.toString()}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {card.receiverEmail || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          card.isUsed
                            ? "bg-navy/5 text-navy/50"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {card.isUsed ? "مستخدمة" : "غير مستخدمة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {new Date(card.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <form action={deleteGiftCard.bind(null, card.id)}>
                        <button
                          type="submit"
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                          حذف
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
