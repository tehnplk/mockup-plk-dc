"use client";

import DesktopShell, { type NavItem } from "@/components/DesktopShell";
import {
  UnitRoleContext,
  UnitRoleSwitcher,
  UnitRoleToggle,
  UnitScopeBar,
  useUnitRoleState,
} from "@/components/UnitRole";

/**
 * เมนูของ "โมดูลหน่วยบริการ" ตาม doc/spec.md
 * ใช้ชุดเดียวกันทั้งโรงพยาบาลและ รพ.สต. (สลับบทบาทได้ที่แถบด้านซ้าย)
 */
const NAV: NavItem[] = [
  { href: "/unit", label: "ภาพรวมหน่วยบริการ", icon: "home", section: "ภาพรวม" },

  {
    href: "/unit/agent",
    label: "Agent เฝ้าระวัง ICD-10",
    icon: "sparkles",
    badge: "12",
    section: "เฝ้าระวัง & คัดเข้า",
  },
  { href: "/unit/new", label: "คัดเข้า / เปิดเคสใหม่", icon: "plus" },
  { href: "/unit/inbox", label: "รับเคส (Dashboard/Flex)", icon: "check", badge: "3" },

  {
    href: "/unit/case",
    label: "ดึงข้อมูลจาก HIS",
    icon: "db",
    section: "สอบสวนโรค",
  },
  { href: "/unit/investigate", label: "บันทึกข้อมูลสอบสวนโรค", icon: "clipboard", badge: "2" },
  { href: "/unit/voice", label: "สรุปสนทนา Voice→Text", icon: "mic" },
  { href: "/unit/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },

  {
    href: "/unit/notify",
    label: "แจ้งเคสไปทีม SRRT/CDCU",
    icon: "send",
    section: "แจ้งเคส & ส่งต่อ",
  },
  { href: "/unit/report", label: "แจ้งเคสที่พบในชุมชน", icon: "pin" },
  { href: "/unit/alert", label: "แจ้งเตือนประชาชนที่คัดเข้า", icon: "chat" },
  { href: "/unit/push", label: "Push เข้า Dashboard กลาง", icon: "wave" },
  { href: "/unit/exclude", label: "ยื่นคำร้องตัดเคสออก", icon: "shield" },

  { href: "/unit/map", label: "แผนที่การระบาด (GIS)", icon: "map", section: "เฝ้าระวังพื้นที่" },
  { href: "/unit/ai", label: "วิเคราะห์ข้อมูลด้วย AI", icon: "chart" },
  { href: "/unit/media", label: "ผลิตสื่อประชาสัมพันธ์", icon: "image" },
  { href: "/unit/broadcast", label: "แจ้งข่าวประชาชน", icon: "megaphone" },
  { href: "/unit/followup", label: "ติดตามพฤติกรรมสุขภาพ", icon: "heart" },
];

export default function UnitLayout({ children }: LayoutProps<"/unit">) {
  const ctx = useUnitRoleState("hospital");
  const { role } = ctx;

  return (
    <UnitRoleContext.Provider value={ctx}>
      <DesktopShell
        accent={role.accent}
        system={role.system}
        org={role.org}
        url={role.url}
        device="Webapp Desktop · Web Mobile"
        nav={NAV}
        user={role.user}
        sidebarExtra={<UnitRoleSwitcher {...ctx} />}
        headerExtra={<UnitRoleToggle {...ctx} />}
      >
        <UnitScopeBar role={role} />
        {children}
      </DesktopShell>
    </UnitRoleContext.Provider>
  );
}
