"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 180 }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl border-2 border-gold/30 bg-white p-4 shadow-sm">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#1A237E"
          level="H"
          includeMargin={false}
        />
      </div>
      <p className="font-display text-sm text-navy/60" dir="rtl">
        امسح الرمز للوصول
      </p>
    </div>
  );
}
