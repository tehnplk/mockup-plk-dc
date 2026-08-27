import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";

type Feature = { label: string; href: string };

type FeatureGroup = {
  no: string;
  title: string;
  features: Feature[];
};

type Module = {
  no: string;
  href: string;
  title: string;
  sub: string;
  accent: string;
  tone: string;
  icon: IconName;
  /** ฟีเจอร์ตาม doc/spec.md — ทุกข้อชี้ไปยังหน้าจอ mockup จริง */
  features?: Feature[];
  featureGroups?: FeatureGroup[];
};

const MODULES: Module[] = [
  {
    no: "01",
    href: "/unit",
    title: "โมดูลของหน่วยบริการ",
    sub: "ใช้ชุดเดียวกันทั้งโรงพยาบาล (รัฐ/เอกชน) และหน่วยบริการเจ้าของพื้นที่ (รพ.สต.) สลับบทบาทได้ในระบบ",
    accent: "#0d9488",
    tone: "#ccfbf1",
    icon: "hospital",
    featureGroups: [
      {
        no: "1",
        title: "สอบสวนผู้ป่วยในโรงพยาบาล",
        features: [
          { label: "Agent แจ้งเตือนตามรหัสโรค ICD-10 ที่กำหนด", href: "/unit/agent" },
          { label: "ดึงข้อมูลอัตโนมัติจาก HIS และเติมข้อมูลส่วนที่ขาด", href: "/unit/case" },
          { label: "บันทึกข้อมูลสอบสวนโรค", href: "/unit/investigate" },
          { label: "แจ้งเคสด้วย Flex หมอพร้อมไปทีม SRRT/CDCU", href: "/unit/notify" },
          { label: "ทะเบียนแจ้งเคสและผลการตอบกลับ", href: "/unit/registry" },
        ],
      },
      {
        no: "2",
        title: "รับเคสในฐานะเจ้าของพื้นที่",
        features: [
          { label: "รับเคสจาก Dashboard กลาง หรือ Flex หมอพร้อม", href: "/unit/inbox" },
          { label: "แจ้งเตือนประชาชนในพื้นที่ที่คัดเข้าผ่าน Flex หมอพร้อม", href: "/unit/alert" },
        ],
      },
      {
        no: "3",
        title: "จัดการข้อมูลในพื้นที่",
        features: [
          { label: "ยื่นคำร้องตัดเคสออกไปยัง สสจ.พิษณุโลก", href: "/unit/exclude" },
          { label: "แผนที่การระบาด (GIS)", href: "/unit/map" },
          { label: "ระบบวิเคราะห์ข้อมูลพื้นที่", href: "/unit/analytics" },
          { label: "ระบบผลิตสื่อประชาสัมพันธ์", href: "/unit/media" },
          { label: "แจ้งข่าวประชาชนในพื้นที่ระบาดผ่านไลน์หมอพร้อม", href: "/unit/broadcast" },
          { label: "ติดตามพฤติกรรมสุขภาพและการดูแลตนเอง", href: "/unit/followup" },
          { label: "จัดเก็บและค้นคืนเอกสารสอบสวนควบคุมโรค", href: "/unit/documents" },
          { label: "Assistant ด้วย AI", href: "/unit/ai" },
        ],
      },
    ],
  },
  {
    no: "02",
    href: "/field",
    title: "โมดูลทีม SRRT / CDCU",
    sub: "ทีมสอบสวนเคลื่อนที่เร็ว ใช้งานบนมือถือขณะลงพื้นที่ และบนเดสก์ท็อปที่สำนักงาน",
    accent: "#ea580c",
    tone: "#ffedd5",
    icon: "clipboard",
    features: [
      { label: "รับเคส กดรับจาก Dashboard กลาง หรือ Flex หมอพร้อม", href: "/field" },
      { label: "บันทึกการสอบสวนและควบคุมโรคภาคสนาม", href: "/field/investigate" },
    ],
  },
  {
    no: "03",
    href: "/dashboard",
    title: "โมดูลระบบบัญชาการระดับจังหวัด",
    sub: "ศูนย์ข้อมูลกลาง สสจ.พิษณุโลก สำหรับติดตาม สั่งการ อนุมัติ และจัดสรรทรัพยากร",
    accent: "#2563eb",
    tone: "#dbeafe",
    icon: "chart",
    features: [
      { label: "Dashboard กลาง", href: "/dashboard" },
      { label: "สถานะการสอบสวนควบคุมโรครายเคส", href: "/dashboard/cases" },
      { label: "ระบบติดตามความก้าวหน้ารายเคส", href: "/dashboard/cases" },
      { label: "ระบบกำหนดกติกาด้วย Admin", href: "/dashboard/admin" },
      { label: "ระบบแผนภูมิ", href: "/dashboard/charts" },
      { label: "ระบบแผนที่", href: "/dashboard/map" },
      { label: "รับคำร้อง/อนุมัติตัดเคสออก", href: "/dashboard/requests" },
      { label: "ระบบสำรวจ/จัดสรรทรัพยากรควบคุมโรค", href: "/dashboard/resources" },
      { label: "อื่นๆ ที่ใช้สนับสนุนการตัดสินใจ", href: "/dashboard/decision" },
    ],
  },
];

const FLEX_VARIANTS = [
  {
    href: "/flex",
    title: "สำหรับเจ้าหน้าที่",
    desc: "แจ้งเคสจากหน่วยบริการไปยังทีม SRRT/CDCU",
    accent: "#06c755",
    points: ["กดรับทราบ = กดรับเคสเข้าระบบ", "ลิงก์เปิดโมดูลทีม SRRT/CDCU", "ดูพิกัดเคสบนแผนที่"],
  },
  {
    href: "/flex/public",
    title: "สำหรับประชาชน",
    desc: "แจ้งเตือนผู้ที่คัดเข้าและประชาชนในพื้นที่ระบาด",
    accent: "#059669",
    points: ["กดรับทราบ", "ตอบคำถามสั้นบนการ์ดได้ทันที", "ส่งผลเข้าระบบติดตามพฤติกรรมสุขภาพ"],
  },
];

const FLOW: [string, string, string, string][] = [
  ["01", "หน่วยบริการพบเคส", "Agent จับ ICD-10 → เปิดแบบสอบสวน", "#0d9488"],
  ["01", "แจ้งทีมด้วย Flex", "ส่งไลน์หมอพร้อมถึงทีม SRRT/CDCU", "#06c755"],
  ["02", "ทีม SRRT/CDCU รับเคส", "กดรับจาก Dashboard หรือ Flex", "#ea580c"],
  ["02", "สอบสวน–ควบคุมโรค", "บันทึกภาคสนาม รูป พิกัด เสียง", "#f97316"],
  ["03", "บัญชาการระดับจังหวัด", "ติดตาม อนุมัติ จัดสรรทรัพยากร", "#2563eb"],
  ["01", "สื่อสารกลับประชาชน", "Flex แจ้งผู้คัดเข้า + ข่าวในพื้นที่", "#059669"],
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
              "radial-gradient(900px 420px at 12% -10%, #0d948855, transparent 60%), radial-gradient(760px 400px at 88% 0%, #2563eb55, transparent 62%), radial-gradient(600px 380px at 60% 110%, #ea580c40, transparent 60%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <span className="chip" style={{ background: "#ffffff1a", color: "#e2e8f0" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" /> UX/UI Mockup · doc/spec.md
          </span>
          <h1 className="mt-4 text-[27px] sm:text-[38px] font-bold tracking-tight leading-[1.2] max-w-[820px]">
            Plk SRRT Network
            <br />
            <span className="text-[#7dd3fc]">Operating System</span>
          </h1>
          <p className="mt-3 text-[15px] sm:text-[17px] font-semibold text-slate-200">
            ระบบปฏิบัติการเครือข่ายเฝ้าระวังสอบสวนเคลื่อนที่เร็ว จังหวัดพิษณุโลก
          </p>
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-slate-400 max-w-[660px] leading-relaxed">
            3 โมดูลหลักทำงานต่อเนื่องกันตั้งแต่หน่วยบริการพบเคส ทีม SRRT/CDCU ลงพื้นที่
            จนถึงศูนย์บัญชาการระดับจังหวัด โดยใช้ Flex Message บนไลน์หมอพร้อมเป็นช่องทางสื่อสารร่วม
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {MODULES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              >
                <span className="text-[#93c5fd]">
                  <Icon name={m.icon} size={15} />
                </span>
                โมดูล {m.no} · {m.title.replace("โมดูล", "").trim()}
              </Link>
            ))}
            <Link
              href="/flex"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
            >
              <span className="text-[#4ade80]">
                <Icon name="chat" size={15} />
              </span>
              Component · Flex หมอพร้อม
            </Link>
          </div>

        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-12">
        <h2 className="text-[15px] font-bold mb-1">โมดูลทั้งหมดตาม UX/UI spec</h2>
        <p className="sub mb-6 max-w-[780px]">
          ทุกหัวข้อในการ์ดคือฟีเจอร์ที่ระบุไว้ใน doc/spec.md และกดเข้าไปดูหน้าจอ mockup ได้ทันที ·
          โมดูล 01 ใช้ชุดหน้าจอเดียวกันทั้งโรงพยาบาลและ รพ.สต. โดยสลับบทบาทได้จากแถบเมนูด้านซ้าย
        </p>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 items-start">
          {MODULES.map((m) => (
            <article
              key={m.href}
              className="card overflow-hidden flex flex-col"
              style={{ ["--accent" as string]: m.accent }}
            >
              <div
                className="px-5 py-4 border-b border-line-brd"
                style={{ background: `linear-gradient(180deg, ${m.tone}88, transparent)` }}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className="grid place-items-center rounded-xl text-white shrink-0"
                    style={{ width: 42, height: 42, background: m.accent }}
                  >
                    <Icon name={m.icon} size={21} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[11px] font-bold tabular-nums"
                        style={{ color: m.accent }}
                      >
                        โมดูล {m.no}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-[15.5px] font-bold leading-tight">{m.title}</h3>
                  </div>
                </div>
                <p className="sub mt-2.5 leading-relaxed">{m.sub}</p>
              </div>

              <div className="p-5 flex-1">
                {m.featureGroups ? (
                  <div className="grid gap-3">
                    {m.featureGroups.map((group) => (
                      <section
                        key={group.no}
                        className="py-3 first:pt-0 border-t first:border-t-0 border-line-brd"
                      >
                        <div className="flex items-start gap-2.5 mb-2">
                          <span
                            className="grid place-items-center rounded-lg text-[11px] font-bold text-white shrink-0"
                            style={{ width: 25, height: 25, background: m.accent }}
                          >
                            {group.no}
                          </span>
                          <div>
                            <h4 className="text-[12.5px] font-bold leading-snug">{group.title}</h4>
                          </div>
                        </div>
                        <ul className="grid gap-0.5">
                          {group.features.map((feature) => (
                            <li key={feature.href}>
                              <Link
                                href={feature.href}
                                className="flex items-start gap-2 text-[12px] text-muted rounded-lg px-2 py-1.5 hover:bg-white transition-colors"
                              >
                                <span className="mt-[3px] shrink-0" style={{ color: m.accent }}>
                                  <Icon name="check" size={12} />
                                </span>
                                <span className="flex-1 leading-snug">{feature.label}</span>
                                <span className="mt-[2px] shrink-0 text-faint">
                                  <Icon name="arrowRight" size={12} />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                ) : (
                  <ul className="grid gap-1">
                    {m.features?.map((f, i) => (
                      <li key={`${f.href}-${i}`}>
                        <Link
                          href={f.href}
                          className="flex items-start gap-2.5 text-[12.5px] text-muted rounded-lg px-2 py-1.5 -mx-2 hover:bg-surface2 transition-colors"
                        >
                          <span className="mt-[3px] shrink-0" style={{ color: m.accent }}>
                            <Icon name="check" size={13} />
                          </span>
                          <span className="flex-1 leading-snug">{f.label}</span>
                          <span className="mt-[2px] shrink-0 text-faint">
                            <Icon name="arrowRight" size={13} />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

              </div>

              <div className="px-5 pb-5">
                <Link
                  href={m.href}
                  className="btn btn-primary w-full"
                  style={{ ["--accent" as string]: m.accent }}
                >
                  เปิดโมดูล <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* component spec */}
        <section className="card p-5 sm:p-6 mt-6" style={{ ["--accent" as string]: "#06c755" }}>
          <div className="flex items-start gap-3.5 mb-1">
            <span
              className="grid place-items-center rounded-xl text-white shrink-0"
              style={{ width: 38, height: 38, background: "#06c755" }}
            >
              <Icon name="chat" size={19} />
            </span>
            <div>
              <h2 className="text-[15px] font-bold">Component Spec · Line OA หมอพร้อม Flex Message</h2>
              <p className="sub mt-0.5">
                ใช้ร่วมกันทุกโมดูล · ทุกการ์ดต้องมี ชื่อ ตำแหน่ง และหน่วยงานผู้ส่งเป็น footer
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {FLEX_VARIANTS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="rounded-xl border border-line-brd p-4 hover:bg-surface2 transition-colors"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="chip" style={{ background: `${v.accent}18`, color: v.accent }}>
                    <Icon name="chat" size={12} /> Line OA หมอพร้อม
                  </span>
                  <span className="text-[13.5px] font-bold">{v.title}</span>
                </div>
                <p className="sub mt-1.5">{v.desc}</p>
                <ul className="grid gap-1.5 mt-3">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12.5px] text-muted">
                      <span className="mt-[3px] shrink-0" style={{ color: v.accent }}>
                        <Icon name="check" size={13} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-3 rounded-lg px-3 py-2 text-[11.5px] font-medium"
                  style={{ background: `${v.accent}12`, color: "#334155" }}
                >
                  footer: ชื่อ · ตำแหน่ง · หน่วยงานผู้ส่ง
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* flow */}
        <section className="card p-5 sm:p-6 mt-6">
          <h2 className="text-[15px] font-bold mb-1">เส้นทางข้อมูลของหนึ่งเคส</h2>
          <p className="sub mb-5">ตัวอย่างเคส PLK-6809-0142 · ไข้เลือดออก · ม.4 ต.บ้านคลอง</p>
          <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {FLOW.map(([no, t, d, c], i, arr) => (
              <li key={t} className="relative">
                <div className="rounded-xl border border-line-brd p-3.5 h-full">
                  <span className="chip" style={{ background: `${c}18`, color: c }}>
                    โมดูล {no}
                  </span>
                  <p className="text-[13px] font-bold mt-2 leading-snug">{t}</p>
                  <p className="sub mt-0.5">{d}</p>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden xl:block absolute top-1/2 -right-[13px] -translate-y-1/2 text-faint z-10">
                    <Icon name="arrowRight" size={16} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <p className="sub text-center mt-8">
          Mockup เพื่อการออกแบบเท่านั้น — ชื่อผู้ป่วย ผู้สัมผัส เจ้าหน้าที่ และสถิติทั้งหมดเป็นบุคคล/ข้อมูลสมมติ ไม่มีอยู่จริง
        </p>
      </main>
    </div>
  );
}
