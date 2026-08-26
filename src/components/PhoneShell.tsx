"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icons";

export type Tab = { href: string; label: string; icon: IconName; badge?: number };

export default function PhoneShell({
  accent = "field",
  title,
  subtitle,
  back,
  right,
  tabs,
  children,
  caption,
  headerTone = "solid",
  statusDark = false,
}: {
  accent?: "field" | "line" | "central";
  title: string;
  subtitle?: string;
  back?: string;
  right?: React.ReactNode;
  tabs?: Tab[];
  children: React.ReactNode;
  caption?: string;
  headerTone?: "solid" | "light";
  statusDark?: boolean;
}) {
  const path = usePathname();
  const solid = headerTone === "solid";

  return (
    <div
      data-accent={accent}
      className="min-h-dvh bg-canvas flex flex-col items-center py-6 sm:py-10 px-3"
    >
      {caption && (
        <p className="sub mb-4 text-center max-w-[420px]">
          <Link href="/" className="font-semibold" style={{ color: "var(--accent)" }}>
            ← หน้ารวมระบบ
          </Link>
          <span className="mx-2 text-faint">/</span>
          {caption}
        </p>
      )}

      {/* phone frame */}
      <div
        className="relative w-full max-w-[392px] rounded-[44px] p-[10px] shrink-0"
        style={{
          background: "linear-gradient(160deg,#3f4753,#171b21 45%,#2b323b)",
          boxShadow:
            "0 30px 70px -30px rgba(15,23,42,.75), inset 0 0 0 1px rgba(255,255,255,.09)",
        }}
      >
        <div className="relative rounded-[35px] overflow-hidden bg-surface2 h-[760px] flex flex-col">
          {/* status bar */}
          <div
            className="relative h-11 shrink-0 flex items-center justify-between px-6 text-[12.5px] font-semibold z-20"
            style={{
              background: solid ? "var(--accent)" : "var(--surface)",
              color: solid || statusDark ? "#fff" : "var(--text)",
            }}
          >
            <span>09:41</span>
            <span
              className="absolute left-1/2 -translate-x-1/2 top-1.5 h-[26px] w-[92px] rounded-full bg-black"
              aria-hidden
            />
            <span className="flex items-center gap-1.5">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="1" />
                <rect x="4.3" y="5" width="3" height="6" rx="1" />
                <rect x="8.6" y="2.6" width="3" height="8.4" rx="1" />
                <rect x="12.9" y="0" width="3" height="11" rx="1" opacity=".4" />
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                <path d="M7.5 10.2 0 3.2A11 11 0 0 1 15 3.2Z" />
              </svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none" stroke="currentColor">
                <rect x="0.6" y="0.6" width="19" height="9.8" rx="2.6" opacity=".5" />
                <rect x="2.2" y="2.2" width="14" height="6.6" rx="1.4" fill="currentColor" stroke="none" />
                <path d="M21.6 4v3" strokeWidth="2" strokeLinecap="round" opacity=".5" />
              </svg>
            </span>
          </div>

          {/* app header */}
          <header
            className="shrink-0 px-4 pt-1 pb-3 flex items-center gap-3"
            style={{
              background: solid ? "var(--accent)" : "var(--surface)",
              color: solid ? "#fff" : "var(--text)",
              borderBottom: solid ? "none" : "1px solid var(--border)",
            }}
          >
            {back && (
              <Link href={back} className="shrink-0 -ml-1 opacity-90">
                <Icon name="arrowLeft" size={20} />
              </Link>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-[16px] font-bold leading-tight truncate">{title}</h1>
              {subtitle && (
                <p
                  className="text-[11.5px] truncate"
                  style={{ color: solid ? "rgba(255,255,255,.82)" : "var(--muted)" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {right}
          </header>

          {/* body */}
          <main className="flex-1 overflow-y-auto nice bg-surface2">{children}</main>

          {/* tab bar */}
          {tabs && (
            <nav
              className="shrink-0 grid border-t border-line-brd bg-surface pb-5 pt-2"
              style={{ gridTemplateColumns: `repeat(${tabs.length},1fr)` }}
            >
              {tabs.map((t) => {
                const active = path === t.href;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex flex-col items-center gap-1 py-1 relative"
                    style={{ color: active ? "var(--accent)" : "var(--faint)" }}
                  >
                    <span className="relative">
                      <Icon name={t.icon} size={21} />
                      {t.badge ? (
                        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-[var(--danger)] text-white text-[10px] font-bold">
                          {t.badge}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[10.5px] font-semibold">{t.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {!tabs && (
            <div className="shrink-0 h-6 bg-surface grid place-items-center">
              <span className="w-32 h-1 rounded-full bg-[#cbd5e1]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sheet({
  title,
  children,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="bg-surface rounded-2xl border border-line-brd mb-3 overflow-hidden">
      {title && (
        <header className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5">
          <h2 className="text-[13px] font-bold">{title}</h2>
          {action}
        </header>
      )}
      <div className="px-4 pb-4">{children}</div>
    </section>
  );
}

export function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: IconName;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-line-brd last:border-0">
      {icon && (
        <span className="text-faint mt-0.5 shrink-0">
          <Icon name={icon} size={16} />
        </span>
      )}
      <span className="text-[12.5px] text-muted w-[92px] shrink-0">{label}</span>
      <span className="text-[13px] font-medium flex-1 text-right">{value}</span>
    </div>
  );
}
