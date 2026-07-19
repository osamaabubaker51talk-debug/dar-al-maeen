"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function FileUpload({
  onUpload,
  accept = "image/jpeg,image/png,image/webp,application/pdf",
  label = "اسحب الملف هنا أو",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handlePreview(file: File) {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function upload(file: File) {
    handlePreview(file);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ أثناء الرفع");
      }

      const data = (await res.json()) as { url: string };
      onUpload(data.url);
      toast.success("تم رفع الملف بنجاح");
    } catch (err) {
      toast.error((err as Error).message || "حدث خطأ");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
        dragging
          ? "border-gold bg-gold/5"
          : "border-gold/30 bg-cream/50 hover:border-gold/60"
      }`}
    >
      {preview ? (
        <img
          src={preview}
          alt="معاينة"
          className="mb-4 max-h-48 rounded-xl object-contain"
        />
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <svg
            className="h-8 w-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      )}

      <p className="mb-2 text-sm text-navy/60">
        {label}{" "}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-medium text-gold-dark underline underline-offset-2 hover:text-gold"
        >
          اختر ملفاً
        </button>
      </p>
      <p className="text-xs text-navy/40">
        JPG, PNG, WebP, PDF — حتى 10 ميجابايت
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <span className="text-sm font-medium text-navy">جاري الرفع...</span>
          </div>
        </div>
      )}
    </div>
  );
}
