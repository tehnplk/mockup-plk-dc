import DesktopShell, { type NavItem } from "@/components/DesktopShell";

const NAV: NavItem[] = [
  { href: "/area", label: "ภาพรวมพื้นที่", icon: "home" },
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
      system="AREA CDC SUITE"
      org="สสอ.เมืองพิษณุโลก · หน่วยบริการเจ้าของพื้นที่"
      url="plk-area-suite://workspace/เมืองพิษณุโลก"
      device="Desktop Application"
      nav={NAV}
      user={{ name: "นายวิรัตน์ สุขเกษม", role: "สาธารณสุขอำเภอ" }}
    >
      {children}
    </DesktopShell>
  );
}
