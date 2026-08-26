import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/hospital", label: "ภาพรวมโรงพยาบาล", icon: "home" },
  { href: "/hospital/new", label: "เลือกประเภทโรค", icon: "plus" },
  { href: "/hospital/case", label: "ฟอร์มสอบสวน + HIS", icon: "clipboard", badge: "3" },
  { href: "/hospital/voice", label: "สรุปสนทนา Voice→Text", icon: "mic" },
  { href: "/hospital/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },
  { href: "/hospital/push", label: "Push เข้า Dashboard กลาง", icon: "db" },
  { href: "/hospital/notify", label: "ส่ง Flex หมอพร้อม", icon: "send" },
];

export default function HospitalLayout({ children }: LayoutProps<"/hospital">) {
  return (
    <DesktopShell
      accent="hospital"
      system="HOSPITAL CDC"
      org="รพ.พุทธชินราช พิษณุโลก"
      url="https://cdc.plkhealth.go.th/hospital"
      device="Webapp Desktop · Web Mobile"
      nav={NAV}
      user={{ name: "พญ.นภัสสร ชัยวัฒน์", role: "แพทย์เวรควบคุมโรค" }}
    >
      {children}
    </DesktopShell>
  );
}
