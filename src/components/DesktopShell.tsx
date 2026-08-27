"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "./icons";
import { initial } from "./ui";

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  badge?: string;
  /** render a section heading above this item */
  section?: string;
};

type NavGroup = {
  section?: string;
  items: NavItem[];
};

function groupNavItems(nav: NavItem[]) {
  return nav.reduce<NavGroup[]>((groups, item) => {
    if (item.section || groups.length === 0) {
      groups.push({ section: item.section, items: [item] });
    } else {
      groups[groups.length - 1].items.push(item);
    }
    return groups;
  }, []);
}

function SidebarNavLink({ item, activePath }: { item: NavItem; activePath: string }) {
  const active = activePath === item.href;

  return (
    <Link
      href={item.href}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-medium mb-0.5 transition-colors"
      style={{
        background: active ? "color-mix(in srgb, var(--accent) 12%, white)" : "transparent",
        color: active ? "var(--accent)" : "var(--muted)",
        fontWeight: active ? 600 : 500,
      }}
    >
      <Icon name={item.icon} size={17} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span
          className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full text-white"
          style={{ background: "var(--danger)" }}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function CollapsibleSidebarNav({ nav, activePath }: { nav: NavItem[]; activePath: string }) {
  const groups = groupNavItems(nav);
  const activeSection = groups.find((group) =>
    group.items.some((item) => item.href === activePath),
  )?.section;
  const firstSection = groups.find((group) => group.section)?.section;
  const [openSection, setOpenSection] = useState<string | null>(
    activeSection ?? firstSection ?? null,
  );

  return groups.map((group, index) => {
    if (!group.section) {
      return (
        <div key={`standalone-${index}`} className="mb-2">
          {group.items.map((item) => (
            <SidebarNavLink key={item.href} item={item} activePath={activePath} />
          ))}
        </div>
      );
    }

    const open = openSection === group.section;
    const containsActive = group.items.some((item) => item.href === activePath);
    const panelId = `sidebar-feature-group-${index}`;

    return (
      <section
        key={group.section}
        className="mb-2 overflow-hidden rounded-xl border border-line-brd bg-surface"
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenSection((current) => (current === group.section ? null : group.section!))}
          className="flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-surface2"
          style={{
            background: containsActive
              ? "color-mix(in srgb, var(--accent) 7%, white)"
              : undefined,
          }}
        >
          <span
            className="h-5 w-1 shrink-0 rounded-full"
            style={{
              background: containsActive ? "var(--accent)" : "var(--border)",
            }}
          />
          <span
            className="min-w-0 flex-1 text-[13px] font-bold leading-[1.4]"
            style={{ color: containsActive ? "var(--accent)" : "var(--text)" }}
          >
            {group.section}
          </span>
          <span
            className="shrink-0 text-faint transition-transform duration-200"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <Icon name="arrowRight" size={14} />
          </span>
        </button>

        <div
          id={panelId}
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="border-t border-line-brd px-1.5 pb-1.5 pt-1.5">
              {group.items.map((item) => (
                <SidebarNavLink key={item.href} item={item} activePath={activePath} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  });
}

export default function DesktopShell({
  accent,
  system,
  org,
  url,
  device = "Desktop Web Application",
  nav,
  user,
  sidebarExtra,
  headerExtra,
  collapsibleSections = false,
  children,
}: {
  accent: "hospital" | "area" | "central" | "field";
  system: string;
  org: string;
  url: string;
  device?: string;
  nav: NavItem[];
  user: { name: string; role: string };
  /** e.g. a role switcher, rendered under the sidebar brand */
  sidebarExtra?: React.ReactNode;
  /** extra control rendered in the top bar */
  headerExtra?: React.ReactNode;
  /** render sectioned sidebar items as an accordion */
  collapsibleSections?: boolean;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div data-accent={accent} className="min-h-dvh p-0 lg:p-5 bg-canvas">
      {/* browser window chrome — signals "desktop app" */}
      <div className="mx-auto max-w-[1560px] lg:rounded-2xl overflow-hidden lg:border border-line-brd bg-surface lg:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]">
        <div className="hidden lg:flex items-center gap-3 px-4 h-11 bg-[#f1f5f9] border-b border-line-brd">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f87171]" />
            <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
            <span className="w-3 h-3 rounded-full bg-[#34d399]" />
          </div>
          <div className="flex-1 max-w-[560px] mx-auto flex items-center gap-2 h-7 rounded-md bg-white border border-line-brd px-3">
            <span className="text-ok">
              <Icon name="shield" size={13} />
            </span>
            <span className="text-[11.5px] text-muted truncate">{url}</span>
          </div>
          <span className="text-[11px] font-semibold text-faint">{device}</span>
        </div>

        <div className="flex min-h-dvh lg:min-h-[820px]">
          {/* sidebar */}
          <aside className="hidden md:flex w-[248px] shrink-0 flex-col border-r border-line-brd bg-surface2">
            <div className="px-4 py-4 border-b border-line-brd">
              <Link href="/" className="flex items-center gap-2.5 group">
                <span
                  className="grid place-items-center rounded-xl text-white shrink-0"
                  style={{ width: 36, height: 36, background: "var(--accent)" }}
                >
                  <Icon name="shield" size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold leading-tight truncate">
                    {system}
                  </span>
                  <span className="block text-[11px] text-muted truncate">{org}</span>
                </span>
              </Link>
            </div>

            {sidebarExtra && (
              <div className="px-3 py-3 border-b border-line-brd">{sidebarExtra}</div>
            )}

            <nav className="flex-1 p-2.5 overflow-y-auto nice">
              {collapsibleSections ? (
                <CollapsibleSidebarNav key={path} nav={nav} activePath={path} />
              ) : (
                nav.map((item) => (
                  <div key={item.href}>
                    {item.section && (
                      <p className="px-3 pt-3.5 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                        {item.section}
                      </p>
                    )}
                    <SidebarNavLink item={item} activePath={path} />
                  </div>
                ))
              )}
            </nav>

            <div className="p-3 border-t border-line-brd">
              <Link
                href="/"
                className="flex items-center gap-2 text-[12px] text-muted hover:text-ink px-2 py-2"
              >
                <Icon name="arrowLeft" size={15} /> กลับหน้ารวมระบบ
              </Link>
            </div>
          </aside>

          {/* main */}
          <div className="flex-1 min-w-0 flex flex-col bg-canvas">
            <header className="h-14 shrink-0 flex items-center gap-3 px-4 sm:px-6 bg-surface border-b border-line-brd">
              <Link href="/" className="md:hidden text-muted">
                <Icon name="arrowLeft" size={18} />
              </Link>
              <div className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-[10px] bg-surface2 border border-line-brd w-full max-w-[340px]">
                <span className="text-faint">
                  <Icon name="search" size={15} />
                </span>
                <input
                  className="bg-transparent text-[13px] outline-none w-full placeholder:text-faint"
                  placeholder="ค้นหาเคส / ผู้ป่วย / เอกสาร…"
                  readOnly
                />
                <kbd className="text-[10px] text-faint border border-line-brd rounded px-1">
                  ⌘K
                </kbd>
              </div>
              <div className="flex-1" />
              {headerExtra}
              <button className="relative grid place-items-center w-9 h-9 rounded-[10px] hover:bg-surface2 text-muted">
                <Icon name="bell" size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--danger)]" />
              </button>
              <div className="flex items-center gap-2.5 pl-3 border-l border-line-brd">
                <span
                  className="grid place-items-center rounded-full text-[12px] font-bold"
                  style={{
                    width: 32,
                    height: 32,
                    background: "color-mix(in srgb, var(--accent) 15%, white)",
                    color: "var(--accent)",
                  }}
                >
                  {initial(user.name)}
                </span>
                <span className="hidden sm:block leading-tight">
                  <span className="block text-[12.5px] font-semibold">{user.name}</span>
                  <span className="block text-[11px] text-muted">{user.role}</span>
                </span>
              </div>
            </header>

            {/* mobile nav strip */}
            <div className="md:hidden flex gap-2 px-3 py-2 overflow-x-auto bg-surface border-b border-line-brd nice">
              {nav.map((n) => {
                const active = path === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border"
                    style={{
                      background: active ? "var(--accent)" : "#fff",
                      color: active ? "#fff" : "var(--muted)",
                      borderColor: active ? "transparent" : "var(--border)",
                    }}
                  >
                    <Icon name={n.icon} size={14} />
                    {n.label}
                  </Link>
                );
              })}
            </div>

            <main className="flex-1 p-4 sm:p-6 overflow-y-auto nice">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHead({
  title,
  actions,
}: {
  title: string;
  desc?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <h1 className="text-[19px] sm:text-[21px] font-bold tracking-tight">{title}</h1>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
