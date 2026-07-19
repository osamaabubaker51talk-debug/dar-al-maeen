"use client";

import { useState, useEffect } from "react";

type Challenge = {
  id: string;
  nameAr: string;
  description: string | null;
  startDate: string;
  endDate: string;
  targetBooks: number;
  participantCount: number;
  isJoined: boolean;
};

export default function PublicChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data) => {
        setChallenges(data.challenges ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleJoin(challengeId: string) {
    try {
      const res = await fetch(`/api/challenges/${challengeId}/join`, {
        method: "POST",
      });
      if (res.ok) {
        setChallenges((prev) =>
          prev.map((c) =>
            c.id === challengeId
              ? { ...c, isJoined: true, participantCount: c.participantCount + 1 }
              : c
          )
        );
      }
    } catch {
      // silent
    }
  }

  async function handleLeave(challengeId: string) {
    try {
      const res = await fetch(`/api/challenges/${challengeId}/leave`, {
        method: "POST",
      });
      if (res.ok) {
        setChallenges((prev) =>
          prev.map((c) =>
            c.id === challengeId
              ? { ...c, isJoined: false, participantCount: c.participantCount - 1 }
              : c
          )
        );
      }
    } catch {
      // silent
    }
  }

  const now = new Date();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-navy">
          تحديات القراءة
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-navy/60">
          تحدَّ نفسك واقرأ المزيد من الكتب مع تحدياتنا الشهرية والموسمية
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-gold to-gold-light" />
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-lg text-navy/60">جاري التحميل...</p>
        </div>
      ) : challenges.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">🏆</div>
          <p className="text-lg text-navy/60">لا توجد تحديات متاحة حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => {
            const start = new Date(challenge.startDate);
            const end = new Date(challenge.endDate);
            const isActive = now >= start && now <= end;
            const isUpcoming = now < start;
            const isEnded = now > end;

            return (
              <div
                key={challenge.id}
                className="overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="h-2 bg-gradient-to-r from-gold/60 to-gold-light/60" />
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <h2 className="font-display text-xl font-bold text-navy">
                      {challenge.nameAr}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : isUpcoming
                            ? "bg-blue-50 text-blue-600"
                            : "bg-navy/5 text-navy/50"
                      }`}
                    >
                      {isActive ? "نشط" : isUpcoming ? "قادم" : "منتهي"}
                    </span>
                  </div>

                  {challenge.description && (
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-navy/60">
                      {challenge.description}
                    </p>
                  )}

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-navy/5 p-3 text-center">
                      <p className="text-lg font-bold text-navy">
                        {challenge.targetBooks}
                      </p>
                      <p className="text-xs text-navy/50">كتاب مستهدف</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-3 text-center">
                      <p className="text-lg font-bold text-primary">
                        {challenge.participantCount}
                      </p>
                      <p className="text-xs text-navy/50">مشارك</p>
                    </div>
                  </div>

                  <div className="mb-4 text-xs text-navy/50">
                    <p>
                      من{" "}
                      {start.toLocaleDateString("ar-EG", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      إلى{" "}
                      {end.toLocaleDateString("ar-EG", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="border-t border-gold/10 pt-4">
                    {challenge.isJoined ? (
                      <button
                        onClick={() => handleLeave(challenge.id)}
                        className="w-full rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        مغادرة التحدي
                      </button>
                    ) : isActive || isUpcoming ? (
                      <button
                        onClick={() => handleJoin(challenge.id)}
                        className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                      >
                        انضم للتحدي
                      </button>
                    ) : (
                      <span className="block w-full rounded-xl bg-navy/5 px-4 py-2.5 text-center text-sm font-medium text-navy/40">
                        انتهى التحدي
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
