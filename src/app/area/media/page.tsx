import { PageHead } from "@/components/DesktopShell";
import { Card, Chip } from "@/components/ui";
import { Icon } from "@/components/icons";

const TEMPLATES = [
  { n: "โปสเตอร์เตือนภัยไข้เลือดออก", s: "A4 แนวตั้ง", c1: "#b91c1c", c2: "#f97316", use: 128 },
  { n: "การ์ดข่าว LINE (1040×1040)", s: "สี่เหลี่ยมจัตุรัส", c1: "#0f766e", c2: "#34d399", use: 96 },
  { n: "อินโฟกราฟิก 3 เก็บ 3 โรค", s: "แนวตั้งยาว", c1: "#1d4ed8", c2: "#60a5fa", use: 74 },
  { n: "ป้ายไวนิลประกาศพื้นที่ควบคุม", s: "120×80 ซม.", c1: "#7c2d12", c2: "#fbbf24", use: 41 },
  { n: "สไลด์บรรยายชุมชน", s: "16:9", c1: "#4c1d95", c2: "#a78bfa", use: 33 },
  { n: "คลิปสั้นแนวตั้ง (Reels)", s: "9:16 · 30 วินาที", c1: "#831843", c2: "#f472b6", use: 27 },
];

export default function AreaMedia() {
  return (
    <>
      <PageHead
        title="ระบบผลิตสื่อประชาสัมพันธ์"
        desc="สร้างสื่อจากเทมเพลตมาตรฐาน กรมควบคุมโรค โดยดึงข้อมูลสถานการณ์จริงในพื้นที่มาเติมอัตโนมัติ"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> สื่อที่บันทึกไว้
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="sparkles" size={15} /> ให้ AI ร่างสื่อใหม่
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_400px]">
        <div className="grid gap-4">
          <Card
            title="เลือกเทมเพลต"
            desc="เทมเพลตปรับสี ข้อความ และตราสัญลักษณ์หน่วยงานได้"
            icon="grid"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.n}
                  className="text-left rounded-xl overflow-hidden border transition-all"
                  style={{
                    borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                    boxShadow: i === 0 ? "0 0 0 2px color-mix(in srgb,var(--accent) 25%,transparent)" : "none",
                  }}
                >
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    <svg viewBox="0 0 120 90" className="w-full h-full">
                      <defs>
                        <linearGradient id={`t${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={t.c1} />
                          <stop offset="100%" stopColor={t.c2} />
                        </linearGradient>
                      </defs>
                      <rect width="120" height="90" fill={`url(#t${i})`} />
                      <rect x="10" y="12" width="52" height="5" rx="2.5" fill="#ffffffcc" />
                      <rect x="10" y="22" width="76" height="8" rx="3" fill="#ffffff" />
                      <rect x="10" y="34" width="62" height="8" rx="3" fill="#ffffff" />
                      <rect x="10" y="50" width="88" height="3" rx="1.5" fill="#ffffff80" />
                      <rect x="10" y="57" width="70" height="3" rx="1.5" fill="#ffffff80" />
                      <circle cx="98" cy="70" r="12" fill="#ffffff35" />
                      <rect x="10" y="72" width="34" height="8" rx="4" fill="#ffffff" />
                    </svg>
                    {i === 0 && (
                      <span
                        className="absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full text-white"
                        style={{ background: "var(--accent)" }}
                      >
                        <Icon name="check" size={13} />
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[12.5px] font-semibold leading-snug">{t.n}</p>
                    <p className="text-[11px] text-muted mt-0.5">
                      {t.s} · ใช้แล้ว {t.use} ครั้ง
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card title="แก้ไขเนื้อหา" icon="image">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className="lbl">หัวเรื่อง</span>
                <input className="inp" readOnly defaultValue="เตือนภัย! ไข้เลือดออกระบาด ม.4 ต.บ้านคลอง" />
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">ข้อความหลัก</span>
                <textarea
                  className="inp min-h-[86px] resize-none"
                  readOnly
                  defaultValue="พบผู้ป่วยไข้เลือดออก 6 รายใน 4 สัปดาห์ ขอความร่วมมือประชาชนเก็บบ้าน เก็บขยะ เก็บน้ำ ทำลายแหล่งเพาะพันธุ์ยุงลายทุก 7 วัน หากมีไข้สูงเกิน 2 วัน รีบพบแพทย์ทันที"
                />
              </div>
              <div>
                <span className="lbl">หน่วยงานเจ้าของสื่อ</span>
                <input className="inp" readOnly defaultValue="รพ.สต.บ้านคลอง" />
              </div>
              <div>
                <span className="lbl">ข้อมูลติดต่อ</span>
                <input className="inp" readOnly defaultValue="สายด่วน 1422 · รพ.สต.บ้านคลอง 055-xxx-xxx" />
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">ข้อมูลสถานการณ์ที่ดึงมาอัตโนมัติ</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ผู้ป่วยสะสม 6 ราย",
                    "ค่า HI 24.1%",
                    "พื้นที่ ม.4 ต.บ้านคลอง",
                    "ข้อมูล ณ 27 ส.ค. 2569",
                  ].map((c) => (
                    <Chip key={c} bg="#ede9fe" fg="#6d28d9">
                      <Icon name="db" size={11} /> {c}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* preview */}
        <div className="grid gap-4 content-start">
          <Card
            title="ตัวอย่างสื่อ"
            icon="image"
            action={<Chip bg="#dcfce7" fg="#15803d">พร้อมเผยแพร่</Chip>}
          >
            <div className="rounded-xl overflow-hidden border border-line-brd">
              <svg viewBox="0 0 300 420" className="w-full">
                <defs>
                  <linearGradient id="poster" x1="0" y1="0" x2="0.6" y2="1">
                    <stop offset="0%" stopColor="#7f1d1d" />
                    <stop offset="55%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <rect width="300" height="420" fill="url(#poster)" />
                <circle cx="255" cy="60" r="72" fill="#ffffff12" />
                <circle cx="40" cy="370" r="90" fill="#00000018" />

                <text x="24" y="52" fontSize="12" fill="#fecaca" fontWeight="600">
                  รพ.สต.บ้านคลอง · สสจ.พิษณุโลก
                </text>
                <text x="24" y="94" fontSize="28" fill="#fff" fontWeight="800">
                  เตือนภัย!
                </text>
                <text x="24" y="126" fontSize="21" fill="#fff" fontWeight="700">
                  ไข้เลือดออกระบาด
                </text>
                <text x="24" y="150" fontSize="15" fill="#fde68a" fontWeight="700">
                  ม.4 ต.บ้านคลอง อ.เมือง
                </text>

                <rect x="24" y="172" width="252" height="72" rx="10" fill="#ffffff1f" />
                <text x="40" y="200" fontSize="26" fill="#fff" fontWeight="800">
                  6
                </text>
                <text x="72" y="200" fontSize="11" fill="#fecaca">
                  ผู้ป่วยใน 4 สัปดาห์
                </text>
                <text x="170" y="200" fontSize="26" fill="#fff" fontWeight="800">
                  24.1%
                </text>
                <text x="170" y="216" fontSize="10" fill="#fecaca">
                  ค่าดัชนีลูกน้ำ (เกณฑ์ ≤10%)
                </text>
                <text x="40" y="232" fontSize="10" fill="#fecaca">
                  ข้อมูล ณ 27 ส.ค. 2569
                </text>

                <text x="24" y="278" fontSize="14" fill="#fff" fontWeight="700">
                  3 เก็บ ป้องกัน 3 โรค
                </text>
                {["เก็บบ้าน ให้ปลอดโปร่ง", "เก็บขยะ ไม่ให้มีน้ำขัง", "เก็บน้ำ ปิดฝาให้มิดชิด"].map(
                  (t, i) => (
                    <g key={t}>
                      <circle cx="32" cy={300 + i * 24} r="6" fill="#fde68a" />
                      <text x="46" y={304 + i * 24} fontSize="11.5" fill="#fff">
                        {t}
                      </text>
                    </g>
                  ),
                )}

                <rect x="24" y="374" width="252" height="30" rx="15" fill="#fff" />
                <text x="150" y="393" fontSize="11.5" fill="#b91c1c" fontWeight="700" textAnchor="middle">
                  มีไข้เกิน 2 วัน รีบพบแพทย์ · สายด่วน 1422
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button className="btn btn-sm">
                <Icon name="file" size={14} /> ดาวน์โหลด PNG
              </button>
              <button className="btn btn-sm">
                <Icon name="file" size={14} /> ดาวน์โหลด PDF
              </button>
              <button className="btn btn-sm btn-primary col-span-2">
                <Icon name="megaphone" size={14} /> ส่งเข้าระบบแจ้งข่าวหมอพร้อม
              </button>
            </div>
          </Card>

          <Card title="ช่องทางเผยแพร่" icon="send">
            <div className="grid gap-2">
              {[
                ["ไลน์หมอพร้อม (ประชาชนในเขต)", "5,120 คน", true],
                ["Facebook รพ.สต.บ้านคลอง", "1,840 คน", true],
                ["กลุ่มไลน์ อสม. ต.บ้านคลอง", "96 คน", true],
                ["ป้ายไวนิลจุดชุมชน", "9 จุด", false],
                ["เสียงตามสายหมู่บ้าน", "9 หมู่บ้าน", false],
              ].map(([n, r, on]) => (
                <label key={String(n)} className="flex items-center gap-2.5 rounded-lg border border-line-brd p-2.5">
                  <span
                    className="grid place-items-center rounded w-[17px] h-[17px] shrink-0 border-2"
                    style={{
                      background: on ? "var(--accent)" : "#fff",
                      borderColor: on ? "var(--accent)" : "#cbd5e1",
                      color: "#fff",
                    }}
                  >
                    {on && <Icon name="check" size={11} />}
                  </span>
                  <span className="text-[12.5px] flex-1">{n}</span>
                  <span className="text-[11px] text-faint">{r}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
