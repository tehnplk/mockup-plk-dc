import { type NavItem } from "@/components/DesktopShell";

/**
 * เมนูของ "โมดูลหน่วยบริการ" — ใช้ร่วมกันระหว่าง /hos (งานในโรงพยาบาล)
 * และ /area (งานในพื้นที่รับผิดชอบ) เพื่อให้ sidebar เหมือนกันทุกหน้า
 * ตัวอย่างเดียว: รพ.บางกระทุ่ม
 */
export const UNIT_NAV: NavItem[] = [
  {
    href: "/hos/his-list",
    label: "ทะเบียนผู้ป่วย",
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
    href: "/area/inbox",
    label: "รับเคส",
    icon: "check",
    badge: "3",
    section: "2. ระบบงานรับเคส",
  },
  { href: "/area/alert", label: "แจ้งเตือนประชาชนที่คัดเข้า", icon: "chat" },
  { href: "/area/report", label: "แจ้งเคสที่พบในชุมชน", icon: "pin" },
  { href: "/area/exclude", label: "ยื่นคำร้องตัดเคสออก", icon: "shield" },

  {
    href: "/analysis/map",
    label: "แผนที่การระบาด (GIS)",
    icon: "map",
    section: "3. ระบบงานวิเคราะห์",
  },
  { href: "/analysis/analytics", label: "วิเคราะห์ข้อมูลพื้นที่", icon: "chart" },
  { href: "/analysis/media", label: "ผลิตสื่อประชาสัมพันธ์", icon: "image" },
  { href: "/analysis/broadcast", label: "แจ้งข่าวประชาชน", icon: "megaphone" },
  { href: "/analysis/followup", label: "ติดตามพฤติกรรมสุขภาพ", icon: "heart" },
  { href: "/analysis/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },
  { href: "/analysis/ai", label: "Assistant ด้วย AI", icon: "sparkles" },
];
