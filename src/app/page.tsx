import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";

type Sys = {
  no: string;
  href: string;
  title: string;
  device: string;
  deviceIcon: IconName;
  accent: string;
  tone: string;
  icon: IconName;
  features: string[];
  routes: { href: string; label: string }[];
};

const SYSTEMS: Sys[] = [
  {
    no: "01",
    href: "/hospital",
    title: "ระบบงานที่โรงพยาบาล",
    device: "Web Application · Desktop",
    deviceIcon: "grid",
    accent: "#0d9488",
    tone: "#ccfbf1",
    icon: "hospital",
    features: [
      "เลือกประเภทโรคที่จะทำข้อมูล",
      "ดึงข้อมูลอัตโนมัติจาก HIS + ผู้ใช้เติมบางส่วน",
      "สรุปการสนทนากับผู้ป่วยด้วย Voice → Text",
      "ระบบจัดเก็บ/ค้นคืนเอกสาร",
      "Push ข้อมูลเข้า Dashboard กลางของจังหวัด",
      "ส่ง Flex Message เข้าไลน์หมอพร้อมทีมเจ้าหน้าที่",
    ],
    routes: [
      { href: "/hospital", label: "ภาพรวม" },
      { href: "/hospital/new", label: "เลือกประเภทโรค" },
      { href: "/hospital/case", label: "ฟอร์ม + HIS" },
      { href: "/hospital/voice", label: "Voice to Text" },
      { href: "/hospital/documents", label: "คลังเอกสาร" },
      { href: "/hospital/push", label: "Push Dashboard" },
      { href: "/hospital/notify", label: "ส่ง Flex Message" },
    ],
  },
  {
    no: "02",
    href: "/field",
    title: "ระบบงานภาคสนาม ทีมสอบสวนควบคุมโรค",
    device: "Mobile Application",
    deviceIcon: "field",
    accent: "#ea580c",
    tone: "#ffedd5",
    icon: "clipboard",
    features: [
      "กดรับเคสจากโรงพยาบาล",
      "บันทึกข้อมูลสอบสวนควบคุมโรค",
      "ถ่ายรูปหลักฐานภาคสนาม",
      "เก็บพิกัด GPS",
      "พิมพ์ text / บันทึกย่อ",
      "อัดเสียง (Voice note)",
    ],
    routes: [
      { href: "/field", label: "กล่องเคส" },
      { href: "/field/case", label: "รายละเอียดเคส" },
      { href: "/field/investigate", label: "แบบสอบสวน" },
      { href: "/field/camera", label: "ถ่ายรูป" },
      { href: "/field/gps", label: "เก็บพิกัด" },
      { href: "/field/voice", label: "อัดเสียง" },
      { href: "/field/me", label: "ทีม/โปรไฟล์" },
    ],
  },
  {
    no: "03",
    href: "/area",
    title: "ระบบงานหน่วยบริการเจ้าของพื้นที่",
    device: "Desktop Application",
    deviceIcon: "map",
    accent: "#7c3aed",
    tone: "#ede9fe",
    icon: "area",
    features: [
      "แผนที่การระบาด",
      "ระบบวิเคราะห์ข้อมูลด้วย AI",
      "ระบบผลิตสื่อประชาสัมพันธ์",
      "แจ้งข่าวประชาชนผ่านไลน์หมอพร้อม",
      "ติดตามพฤติกรรมสุขภาพประชาชน",
      "ระบบจัดเก็บ/ค้นคืนเอกสาร",
    ],
    routes: [
      { href: "/area", label: "ภาพรวมพื้นที่" },
      { href: "/area/map", label: "แผนที่การระบาด" },
      { href: "/area/ai", label: "วิเคราะห์ด้วย AI" },
      { href: "/area/media", label: "ผลิตสื่อ" },
      { href: "/area/broadcast", label: "แจ้งข่าวหมอพร้อม" },
      { href: "/area/followup", label: "ติดตามพฤติกรรม" },
      { href: "/area/documents", label: "คลังเอกสาร" },
    ],
  },
  {
    no: "04",
    href: "/dashboard",
    title: "ระบบ Dashboard กลางจังหวัด",
    device: "Web Application · Desktop",
    deviceIcon: "chart",
    accent: "#2563eb",
    tone: "#dbeafe",
    icon: "chart",
    features: [
      "ติดตามความก้าวหน้ารายเคส",
      "กำหนดกติกา/เงื่อนไขด้วย Admin",
      "ระบบแผนภูมิ",
      "ระบบแผนที่",
      "ข้อมูลสนับสนุนการตัดสินใจ",
    ],
    routes: [
      { href: "/dashboard", label: "ภาพรวมจังหวัด" },
      { href: "/dashboard/cases", label: "ความก้าวหน้ารายเคส" },
      { href: "/dashboard/charts", label: "แผนภูมิ" },
      { href: "/dashboard/map", label: "แผนที่" },
      { href: "/dashboard/decision", label: "สนับสนุนการตัดสินใจ" },
      { href: "/dashboard/admin", label: "Admin กำหนดกติกา" },
    ],
  },
  {
    no: "05",
    href: "/flex",
    title: "Flex Message หมอพร้อม",
    device: "Mobile · LINE",
    deviceIcon: "chat",
    accent: "#06c755",
    tone: "#dcfce7",
    icon: "chat",
    features: ["กดรับทราบได้ (Acknowledge)", "Link ไปยัง PHR ที่ระบบจัดเก็บ"],
    routes: [
      { href: "/flex", label: "แชทหมอพร้อม" },
      { href: "/flex/phr", label: "PHR ผู้ป่วย" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas">
      {/* hero */}
      <header className="relative overflow-hidden border-b border-line-brd bg-[#0b1220] text-white">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(900px 420px at 12% -10%, #0d948855, transparent 60%), radial-gradient(760px 400px at 88% 0%, #2563eb55, transparent 62%), radial-gradient(600px 380px at 60% 110%, #7c3aed40, transparent 60%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <span className="chip" style={{ background: "#ffffff1a", color: "#e2e8f0" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" /> UI Mockup · v0.1
          </span>
          <h1 className="mt-4 text-[27px] sm:text-[38px] font-bold tracking-tight leading-[1.2] max-w-[760px]">
            Operating System Platform
            <br />
            <span className="text-[#7dd3fc]">สอบสวนควบคุมโรค</span> จังหวัดพิษณุโลก
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-slate-300 max-w-[620px] leading-relaxed">
            แพลตฟอร์มเชื่อมโรงพยาบาลรัฐ–เอกชน ทีมสอบสวนภาคสนาม หน่วยบริการเจ้าของพื้นที่
            และศูนย์ข้อมูลกลาง สำนักงานสาธารณสุขจังหวัดพิษณุโลก
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {SYSTEMS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              >
                <span style={{ color: s.accent === "#06c755" ? "#4ade80" : "#93c5fd" }}>
                  <Icon name={s.icon} size={15} />
                </span>
                {s.no}
              </Link>
            ))}
          </div>
          <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[620px]">
            {[
              ["5", "ระบบงานหลัก"],
              ["28", "หน้าจอ Mockup"],
              ["9", "อำเภอในจังหวัด"],
              ["2", "รูปแบบอุปกรณ์"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-3">
                <dt className="text-[22px] font-bold leading-none">{v}</dt>
                <dd className="text-[11.5px] text-slate-400 mt-1.5">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* systems */}
      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-12">
        <h2 className="text-[15px] font-bold mb-1">ระบบงานทั้งหมด</h2>
        <p className="sub mb-6">
          แต่ละระบบแยก route ของตัวเอง — ระบบที่เป็น Mobile จำลองเป็นเครื่องมือถือ
          ระบบที่เป็น Desktop จำลองเป็นหน้าต่างแอปพลิเคชัน
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          {SYSTEMS.map((s) => (
            <article
              key={s.href}
              className="card overflow-hidden flex flex-col"
              style={{ ["--accent" as string]: s.accent }}
            >
              <div
                className="px-5 py-4 flex items-start gap-3.5 border-b border-line-brd"
                style={{ background: `linear-gradient(180deg, ${s.tone}88, transparent)` }}
              >
                <span
                  className="grid place-items-center rounded-xl text-white shrink-0"
                  style={{ width: 42, height: 42, background: s.accent }}
                >
                  <Icon name={s.icon} size={21} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold tabular-nums"
                      style={{ color: s.accent }}
                    >
                      {s.no}
                    </span>
                    <span className="chip" style={{ background: "#fff", color: s.accent }}>
                      <Icon name={s.deviceIcon} size={12} />
                      {s.device}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-[15.5px] font-bold leading-tight">{s.title}</h3>
                </div>
              </div>

              <div className="p-5 flex-1">
                <ul className="grid gap-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-muted">
                      <span className="mt-[3px] shrink-0" style={{ color: s.accent }}>
                        <Icon name="check" size={13} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-5 pb-5">
                <p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2">
                  หน้าจอในระบบ
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.routes.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-line-brd bg-surface2 hover:bg-white transition-colors"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={s.href}
                  className="btn btn-primary w-full mt-4"
                  style={{ ["--accent" as string]: s.accent }}
                >
                  เปิดระบบ <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="sub text-center mt-10">
          Mockup เพื่อการออกแบบเท่านั้น — ข้อมูลผู้ป่วย/สถิติทั้งหมดเป็นข้อมูลสมมติ
        </p>
      </main>
    </div>
  );
}
