import prisma from "@/lib/prisma";
import { deleteDiscount, toggleDiscount } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  let discounts: {
    id: string;
    code: string;
    discountType: string;
    discountValue: { toString(): string };
    currentUses: number;
    maxUses: number | null;
    isActive: boolean;
    expiresAt: Date | null;
    createdAt: Date;
  }[] = [];

  try {
    discounts = await prisma.discountCode.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    discounts = [];
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          أكواد الخصم
        </h2>
        <a
          href="/admin/discounts/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة كود خصم
        </a>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {discounts.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد أكواد خصم بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">الكود</th>
                  <th className="px-4 py-3">النوع</th>
                  <th className="px-4 py-3">القيمة</th>
                  <th className="px-4 py-3">الاستخدامات</th>
                  <th className="px-4 py-3">الحد الأقصى</th>
                  <th className="px-4 py-3">تاريخ الانتهاء</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-mono font-bold text-navy">
                      {discount.code}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {discount.discountType === "PERCENTAGE"
                        ? "نسبة مئوية"
                        : "مبلغ ثابت"}
                    </td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      {discount.discountType === "PERCENTAGE"
                        ? `${discount.discountValue.toString()}%`
                        : `$${discount.discountValue.toString()}`}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {discount.currentUses}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {discount.maxUses ?? "∞"}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {discount.expiresAt
                        ? new Date(discount.expiresAt).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <form action={toggleDiscount.bind(null, discount.id)}>
                        <button
                          type="submit"
                          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                            discount.isActive
                              ? "bg-green-50 text-green-600 hover:bg-green-100"
                              : "bg-navy/5 text-navy/50 hover:bg-navy/10"
                          }`}
                        >
                          {discount.isActive ? "نشط" : "غير نشط"}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <form action={deleteDiscount.bind(null, discount.id)}>
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
