import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/area", label: "ภาพรวมพื้นที่", icon: "home" },
  { href: "/area/investigate", label: "บันทึกข้อมูลสอบสวน", icon: "clipboard", badge: "2" },
  { href: "/area/exclude", label: "ยื่นคำร้องตัดเคสออก", icon: "shield" },
  { href: "/area/map", label: "แผนที่การระบาด", icon: "map" },
  { href: "/area/ai", label: "วิเคราะห์ข้อมูลด้วย AI", icon: "sparkles" },
  { href: "/area/media", label: "ผลิตสื่อประชาสัมพันธ์", icon: "image" },
  { href: "/area/broadcast", label: "แจ้งข่าวหมอพร้อม", icon: "megaphone" },
  { href: "/area/followup", label: "ติดตามพฤติกรรมสุขภาพ", icon: "heart" },
  { href: "/area/documents", label: "จัดเก็บ/ค้นคืนเอกสาร", icon: "file" },
];

export default function AreaLayout({ children }: LayoutProps<"/area">) {
  return (
    <DesktopShell
      accent="area"
      system="TAMBON CDC"
      org="รพ.สต.บ้านคลอง · หน่วยบริการเจ้าของพื้นที่"
      url="https://cdc.plkhealth.go.th/tambon/06512"
      device="Webapp Desktop · Web Mobile"
      nav={NAV}
      user={{ name: "นายวิรัตน์ สุขเกษม", role: "ผอ.รพ.สต.บ้านคลอง" }}
    >
      {children}
    </DesktopShell>
  );
}
