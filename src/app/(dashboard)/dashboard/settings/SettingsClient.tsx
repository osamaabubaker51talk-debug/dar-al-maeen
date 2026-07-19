"use client";

import { useActionState, useRef, useState } from "react";
import { updateProfile, changePassword, uploadAvatar } from "./actions";

type UserData = { name: string | null; email: string | null; image: string | null };

export default function SettingsClient({ user }: { user: UserData }) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfile, { name: user.name ?? "", email: user.email ?? "" });
  const [passwordState, passwordAction, passwordPending] = useActionState(changePassword, undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.image);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("الصورة يجب أن تكون أقل من 2 ميجابايت");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await uploadAvatar(formData);
    } catch {
      alert("حدث خطأ في رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  const initials = (user.name ?? user.email ?? "م").charAt(0);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-xl font-bold text-navy">الإعدادات</h2>

      {/* Avatar */}
      <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">الصورة الشخصية</h3>
        <div className="flex items-center gap-6">
          {avatarPreview ? (
            <img src={avatarPreview} alt="الصورة" className="h-20 w-20 rounded-full object-cover ring-4 ring-gold/20" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-display text-2xl font-bold text-primary ring-4 ring-gold/20">
              {initials}
            </div>
          )}
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-xl border border-gold/30 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-cream disabled:opacity-50"
            >
              {uploading ? "جاري الرفع..." : "تغيير الصورة"}
            </button>
            <p className="mt-1 text-xs text-navy/40">JPG, PNG — أقل من 2MB</p>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">المعلومات الشخصية</h3>
        <form action={profileAction} className="space-y-4">
          {profileState?.success && (
            <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">تم حفظ التغييرات بنجاح</div>
          )}
          {profileState?.error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">{profileState.error}</div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">الاسم</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={profilePending}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-light disabled:opacity-50"
          >
            {profilePending ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">تغيير كلمة المرور</h3>
        <form action={passwordAction} className="space-y-4">
          {passwordState?.success && (
            <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">تم تغيير كلمة المرور بنجاح</div>
          )}
          {passwordState?.error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">{passwordState.error}</div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">كلمة المرور الحالية</label>
            <input type="password" name="currentPassword" required className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none" placeholder="••••••••" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">كلمة المرور الجديدة</label>
            <input type="password" name="newPassword" required minLength={8} className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none" placeholder="8 أحرف على الأقل" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">تأكيد كلمة المرور</label>
            <input type="password" name="confirmNewPassword" required className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none" placeholder="أعد كتابة كلمة المرور" />
          </div>
          <button
            type="submit"
            disabled={passwordPending}
            className="rounded-xl bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy-light disabled:opacity-50"
          >
            {passwordPending ? "جاري التغيير..." : "تغيير كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
}
