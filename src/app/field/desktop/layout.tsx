import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/field/desktop", label: "ศูนย์ปฏิบัติการเคส", icon: "clipboard", badge: "3" },
  { href: "/field", label: "สลับไปมุมมองมือถือ", icon: "field" },
];

export default function FieldDesktopLayout({ children }: LayoutProps<"/field/desktop">) {
  return (
    <DesktopShell
      accent="central"
      system="FIELD CDC · DESKTOP"
      org="ทีมสอบสวนควบคุมโรค SRRT อ.เมืองพิษณุโลก"
      url="https://cdc.plkhealth.go.th/field"
      device="Webapp Desktop · Web Mobile"
      nav={NAV}
      user={{ name: "นายกิตติศักดิ์ แสงเพชร", role: "จพ.สาธารณสุข (SRRT)" }}
    >
      {children}
    </DesktopShell>
  );
}
