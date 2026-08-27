"use client";

import DesktopShell, { type NavItem } from "@/components/DesktopShell";
import { UNIT_PROFILE } from "@/components/UnitRole";

/**
 * เมนูของ "โมดูลหน่วยบริการ" ตาม doc/spec.md
 * ตัวอย่างเดียว: รพ.บางกระทุ่ม ครอบคลุมงานในโรงพยาบาลและพื้นที่รับผิดชอบ
 */
const NAV: NavItem[] = [
  {
    href: "/unit/agent",
    label: "ทะเบียนผู้ป่วยเข้าข่ายต้องแจ้งจาก HosXP",
    icon: "db",
    section: "1. ระบบงานแจ้งเคส",
  },
  { href: "/unit/registry", label: "ทะเบียนแจ้งเคส", icon: "clipboard" },
  {
    href: "/unit/screening-settings",
    label: "ตั้งค่าวิธีคัดผู้ป่วยเข้าระบบ",
    icon: "settings",
  },

  {
    href: "/unit/inbox",
    label: "รับเคส (Dashboard/Flex)",
    icon: "check",
    badge: "3",
    section: "2. ระบบงานรับเคส",
  },
  { href: "/unit/alert", label: "แจ้งเตือนประชาชนที่คัดเข้า", icon: "chat" },
  { href: "/unit/report", label: "แจ้งเคสที่พบในชุมชน", icon: "pin" },
  { href: "/unit/exclude", label: "ยื่นคำร้องตัดเคสออก", icon: "shield" },

  {
    href: "/unit/map",
    label: "แผนที่การระบาด (GIS)",
    icon: "map",
    section: "3. งานวิเคราะห์ข้อมูลในพื้นที่รับผิดชอบ",
  },
  { href: "/unit/analytics", label: "วิเคราะห์ข้อมูลพื้นที่", icon: "chart" },
  { href: "/unit/media", label: "ผลิตสื่อประชาสัมพันธ์", icon: "image" },
  { href: "/unit/broadcast", label: "แจ้งข่าวประชาชน", icon: "megaphone" },
  { href: "/unit/followup", label: "ติดตามพฤติกรรมสุขภาพ", icon: "heart" },
  { href: "/unit/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },
  { href: "/unit/ai", label: "Assistant ด้วย AI", icon: "sparkles" },
];

export default function UnitLayout({ children }: LayoutProps<"/unit">) {
  const role = UNIT_PROFILE;

  return (
    <DesktopShell
      accent={role.accent}
      system={role.system}
      org={role.org}
      url={role.url}
      device="Webapp Desktop · Web Mobile"
      nav={NAV}
      user={role.user}
      collapsibleSections
    >
      {children}
    </DesktopShell>
  );
}
