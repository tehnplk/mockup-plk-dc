import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/dashboard", label: "ภาพรวมจังหวัด", icon: "home" },
  { href: "/dashboard/cases", label: "ความก้าวหน้ารายเคส", icon: "clipboard", badge: "8" },
  { href: "/dashboard/charts", label: "ระบบแผนภูมิ", icon: "chart" },
  { href: "/dashboard/map", label: "ระบบแผนที่", icon: "map" },
  { href: "/dashboard/decision", label: "สนับสนุนการตัดสินใจ", icon: "sparkles" },
  { href: "/dashboard/admin", label: "Admin กำหนดกติกา", icon: "settings" },
];

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <DesktopShell
      accent="central"
      system="PLK CDC DASHBOARD"
      org="สำนักงานสาธารณสุขจังหวัดพิษณุโลก"
      url="https://dashboard.plkhealth.go.th"
      device="Web Application"
      nav={NAV}
      user={{ name: "นพ.ธนากร วงศ์วิวัฒน์", role: "นายแพทย์เชี่ยวชาญ (ควบคุมโรค)" }}
    >
      {children}
    </DesktopShell>
  );
}
