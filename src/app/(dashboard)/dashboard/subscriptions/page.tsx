"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const plans = [
  {
    id: "FREE",
    name: "مجاني",
    nameEn: "Free",
    price: 0,
    priceLabel: "$0",
    period: "",
    features: [
      "تصفح الكتب المجانية",
      "حفظ 5 كتب في المفضلة",
      "قراءة المراجعات",
    ],
    highlighted: false,
  },
  {
    id: "BASIC",
    name: "شهري",
    nameEn: "Monthly",
    price: 4.99,
    priceLabel: "$4.99",
    period: "/شهرياً",
    features: [
      "كل الكتب المدفوعة",
      "بدون إعلانات",
      "حفظ غير محدود",
      "تحميل PDF",
    ],
    highlighted: false,
  },
  {
    id: "PREMIUM",
    name: "سنوي",
    nameEn: "Yearly",
    price: 39.99,
    priceLabel: "$39.99",
    period: "/سنوياً",
    badge: "توفير 33%",
    features: [
      "كل مميزات الخطة الشهرية",
      "كتب حصرية",
      "وصول مبكر للإصدارات الجديدة",
      "دعم فني أولوية",
    ],
    highlighted: true,
  },
];

export default function SubscriptionPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) window.location.replace(redirectUrl);
  }, [redirectUrl]);

  async function handleSubscribe(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json()) as { url?: string; error?: string; message?: string };
      if (!res.ok) throw new Error(data.error || "حدث خطأ");
      if (data.url) {
        setRedirectUrl(data.url);
      } else {
        toast.success(data.message || "تم بنجاح");
      }
    } catch (err) {
      toast.error((err as Error).message || "حدث خطأ");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div>
      <h2 className="mb-2 font-display text-xl font-bold text-navy">
        اشتراكاتي
      </h2>
      <p className="mb-8 text-sm text-navy/50">
        اختر الخطة المناسبة لك واستمتع بقراءة بلا حدود
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all ${
              plan.highlighted
                ? "border-gold scale-[1.02] shadow-md"
                : "border-gold/10 hover:border-gold/20"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-primary-dark">
                {plan.badge}
              </div>
            )}

            <div className="mb-6 text-center">
              <h3 className="mb-1 font-display text-lg font-bold text-navy">
                {plan.name}
              </h3>
              <p className="mb-4 text-xs text-navy/40">{plan.nameEn}</p>
              <div className="text-3xl font-bold text-gold-dark">
                {plan.priceLabel}
              </div>
              {plan.period && (
                <p className="text-sm text-navy/50">{plan.period}</p>
              )}
            </div>

            <ul className="mb-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-navy/70">
                  <svg
                    className="h-4 w-4 shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loadingPlan === plan.id || plan.id === "FREE"}
              className={`w-full rounded-xl py-3 font-bold transition-colors disabled:opacity-50 ${
                plan.highlighted
                  ? "bg-gold text-primary-dark hover:bg-gold-light"
                  : plan.id === "FREE"
                    ? "bg-cream text-navy/50 cursor-default"
                    : "border border-gold/30 bg-white text-gold-dark hover:bg-cream"
              }`}
            >
              {plan.id === "FREE"
                ? "الخطة الحالية"
                : loadingPlan === plan.id
                  ? "جاري المعالجة..."
                  : "اشترك الآن"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
