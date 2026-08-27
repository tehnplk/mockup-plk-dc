import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/dashboard", label: "ภาพรวมจังหวัด", icon: "home" },
  { href: "/dashboard/cases", label: "สถานะ/ความก้าวหน้ารายเคส", icon: "clipboard", badge: "8" },
  { href: "/dashboard/charts", label: "ระบบแผนภูมิ", icon: "chart" },
  { href: "/dashboard/map", label: "ระบบแผนที่", icon: "map" },
  { href: "/dashboard/requests", label: "รับคำร้อง/อนุมัติตัดเคส", icon: "shield", badge: "3" },
  { href: "/dashboard/resources", label: "สำรวจ/จัดสรรทรัพยากร", icon: "db", badge: "4" },
  { href: "/dashboard/decision", label: "สนับสนุนการตัดสินใจ", icon: "sparkles" },
  { href: "/dashboard/admin", label: "Admin กำหนดกติกา", icon: "settings" },
];

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <DesktopShell
      accent="central"
      system="PLK SRRT COMMAND"
      org="ระบบบัญชาการระดับจังหวัด · สสจ.พิษณุโลก"
      url="https://dashboard.plkhealth.go.th"
      device="Webapp Desktop · Web Mobile"
      nav={NAV}
      user={{ name: "นายธนากร วงศ์วิวัฒน์", role: "นักสาธารณสุขเชี่ยวชาญ (ควบคุมโรค)" }}
    >
      {children}
    </DesktopShell>
  );
}
