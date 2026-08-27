"use client";

import { useEffect } from "react";

export default function LargeModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="large-modal-title"
        className="flex max-h-[92dvh] w-full max-w-[1120px] flex-col overflow-hidden rounded-2xl border border-line-brd bg-white shadow-[0_28px_80px_-28px_rgba(15,23,42,.65)]"
      >
        <header className="flex items-start gap-4 border-b border-line-brd px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <h2 id="large-modal-title" className="text-[18px] font-bold tracking-tight sm:text-[20px]">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-[12px] text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-brd text-[22px] leading-none text-muted hover:bg-surface2"
          >
            ×
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-canvas p-4 nice sm:p-6">{children}</div>

        {footer && (
          <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line-brd bg-white px-5 py-3.5 sm:px-6">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
