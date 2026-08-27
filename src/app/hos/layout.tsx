"use client";

import DesktopShell, { type NavItem } from "@/components/DesktopShell";
import { UNIT_PROFILE } from "@/components/UnitRole";

/**
 * เมนูของ "โมดูลหน่วยบริการ" ตาม doc/spec.md
 * ตัวอย่างเดียว: รพ.บางกระทุ่ม ครอบคลุมงานในโรงพยาบาลและพื้นที่รับผิดชอบ
 */
const NAV: NavItem[] = [
  {
    href: "/hos/his-list",
    label: "ทะเบียนผู้ป่วยเข้าข่ายต้องแจ้งจาก HosXP",
    icon: "db",
    section: "1. ระบบงานแจ้งเคส",
  },
  { href: "/hos/registry", label: "ทะเบียนแจ้งเคส", icon: "clipboard" },
  {
    href: "/hos/screening-settings",
    label: "ตั้งค่าวิธีคัดผู้ป่วยเข้าระบบ",
    icon: "settings",
  },

  {
    href: "/hos/inbox",
    label: "รับเคส (Dashboard/Flex)",
    icon: "check",
    badge: "3",
    section: "2. ระบบงานรับเคส",
  },
  { href: "/hos/alert", label: "แจ้งเตือนประชาชนที่คัดเข้า", icon: "chat" },
  { href: "/hos/report", label: "แจ้งเคสที่พบในชุมชน", icon: "pin" },
  { href: "/hos/exclude", label: "ยื่นคำร้องตัดเคสออก", icon: "shield" },

  {
    href: "/hos/map",
    label: "แผนที่การระบาด (GIS)",
    icon: "map",
    section: "3. งานวิเคราะห์ข้อมูลในพื้นที่รับผิดชอบ",
  },
  { href: "/hos/analytics", label: "วิเคราะห์ข้อมูลพื้นที่", icon: "chart" },
  { href: "/hos/media", label: "ผลิตสื่อประชาสัมพันธ์", icon: "image" },
  { href: "/hos/broadcast", label: "แจ้งข่าวประชาชน", icon: "megaphone" },
  { href: "/hos/followup", label: "ติดตามพฤติกรรมสุขภาพ", icon: "heart" },
  { href: "/hos/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },
  { href: "/hos/ai", label: "Assistant ด้วย AI", icon: "sparkles" },
];

export default function UnitLayout({ children }: LayoutProps<"/hos">) {
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
