import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Legend } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISEASES } from "@/lib/mock";

const CLUSTERS = [
  { n: "ม.4 ต.ในเมือง", c: 9, lv: "สูงมาก", bg: "#fee2e2", fg: "#b91c1c", d: "ไข้เลือดออก" },
  { n: "ม.2 ต.อรัญญิก", c: 6, lv: "สูง", bg: "#ffedd5", fg: "#c2410c", d: "ไข้เลือดออก" },
  { n: "ศูนย์เด็กเล็ก ต.บ้านคลอง", c: 5, lv: "สูง", bg: "#ffedd5", fg: "#c2410c", d: "มือ เท้า ปาก" },
  { n: "ม.1 ต.หัวรอ", c: 3, lv: "ปานกลาง", bg: "#fef3c7", fg: "#b45309", d: "ไข้เลือดออก" },
];

export default function AreaMap() {
  return (
    <>
      <PageHead
        title="แผนที่การระบาด"
        desc="แสดงตำแหน่งผู้ป่วย กลุ่มก้อนการระบาด (Cluster) และรัศมีควบคุมโรคแบบเรียลไทม์"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ย้อนดูไทม์ไลน์
            </button>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกภาพแผนที่
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="megaphone" size={15} /> ประกาศพื้นที่ควบคุม
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[280px_1fr_300px]">
        {/* layers */}
        <div className="grid gap-4 content-start">
          <Card title="ชั้นข้อมูล (Layers)" icon="grid">
            <div className="grid gap-2">
              {[
                ["จุดผู้ป่วยรายบุคคล", true],
                ["ความหนาแน่น (Heatmap)", true],
                ["รัศมีควบคุมโรค 100 ม.", true],
                ["แหล่งเพาะพันธุ์ลูกน้ำ", true],
                ["ขอบเขตตำบล/หมู่บ้าน", true],
                ["โรงเรียน/ศูนย์เด็กเล็ก", false],
                ["จุดพ่นหมอกควัน", false],
                ["ตำแหน่งทีมภาคสนาม", false],
              ].map(([t, on]) => (
                <label
                  key={String(t)}
                  className="flex items-center gap-2.5 text-[12.5px] cursor-pointer"
                >
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
                  <span style={{ color: on ? "var(--text)" : "var(--muted)" }}>{t}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card title="กรองตามโรค" icon="shield">
            <div className="grid gap-1.5">
              {DISEASES.slice(0, 6).map((d, i) => (
                <label key={d.code} className="flex items-center gap-2.5 text-[12.5px]">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: d.color, opacity: i < 3 ? 1 : 0.28 }}
                  />
                  <span
                    className="flex-1 truncate"
                    style={{ color: i < 3 ? "var(--text)" : "var(--faint)" }}
                  >
                    {d.name}
                  </span>
                  <span className="text-[11px] text-faint tabular-nums">
                    {[38, 12, 8, 5, 3, 1][i]}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Card title="ช่วงเวลา" icon="clock">
            <select className="inp mb-2" defaultValue="28">
              <option value="7">7 วันล่าสุด</option>
              <option value="28">28 วันล่าสุด</option>
              <option value="90">90 วันล่าสุด</option>
            </select>
            <div className="flex items-center gap-2 text-[11.5px] text-muted">
              <span>30 ก.ค.</span>
              <span className="flex-1 h-1 rounded-full bg-line-brd relative">
                <span
                  className="absolute inset-y-0 left-[15%] right-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="absolute -top-1 right-0 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: "var(--accent)" }}
                />
              </span>
              <span>27 ส.ค.</span>
            </div>
          </Card>
        </div>

        {/* map canvas */}
        <Card
          title="แผนที่ อ.เมืองพิษณุโลก"
          desc="ระบบพิกัด WGS84 · แหล่งข้อมูล: กรมแผนที่ทหาร + HDC"
          icon="map"
          pad={false}
          action={<Chip bg="#dcfce7" fg="#15803d" dot>อัปเดต 3 นาทีที่แล้ว</Chip>}
        >
          <div className="relative">
            <svg viewBox="0 0 600 470" className="w-full" style={{ background: "#eaf0f2" }}>
              {/* blocks */}
              {[
                [20, 24, 150, 110],
                [200, 16, 130, 96],
                [356, 30, 170, 118],
                [26, 168, 140, 108],
                [198, 146, 136, 128],
                [366, 178, 158, 96],
                [16, 312, 156, 120],
                [206, 306, 118, 136],
                [356, 302, 168, 130],
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#dfe7ea" />
              ))}
              {/* river Nan */}
              <path
                d="M-10 350 q90 -46 180 -10 t150 -46 t190 -30"
                stroke="#a9c7e0"
                strokeWidth="26"
                fill="none"
              />
              <text x="30" y="330" fontSize="11" fill="#5b7c95" fontStyle="italic">
                แม่น้ำน่าน
              </text>
              {/* roads */}
              <path d="M186 0 V470" stroke="#fff" strokeWidth="14" />
              <path d="M344 0 V470" stroke="#fff" strokeWidth="11" />
              <path d="M0 152 H600" stroke="#fff" strokeWidth="13" />
              <path d="M0 290 H600" stroke="#fff" strokeWidth="10" />

              {/* heat clusters */}
              {[
                [250, 210, 88, "#dc2626"],
                [430, 118, 62, "#dc2626"],
                [120, 360, 50, "#f97316"],
                [470, 350, 44, "#f59e0b"],
              ].map(([x, y, r, c], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={r} fill={String(c)} opacity="0.13" />
                  <circle cx={x} cy={y} r={Number(r) * 0.6} fill={String(c)} opacity="0.16" />
                  <circle cx={x} cy={y} r={Number(r) * 0.3} fill={String(c)} opacity="0.2" />
                </g>
              ))}

              {/* control radius */}
              <circle cx="250" cy="210" r="96" fill="none" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="8 5" />
              <text x="250" y="102" textAnchor="middle" fontSize="10.5" fill="#b91c1c" fontWeight="700">
                พื้นที่ควบคุมโรค ม.4 ต.ในเมือง
              </text>

              {/* case dots */}
              {[
                [250, 210, 7, "#dc2626"],
                [232, 190, 5, "#dc2626"],
                [268, 232, 5, "#dc2626"],
                [214, 236, 5, "#dc2626"],
                [286, 186, 5, "#dc2626"],
                [246, 258, 5, "#dc2626"],
                [430, 118, 6, "#dc2626"],
                [412, 96, 5, "#dc2626"],
                [452, 140, 5, "#dc2626"],
                [120, 360, 5, "#f97316"],
                [140, 386, 5, "#f97316"],
                [104, 338, 5, "#f97316"],
                [470, 350, 5, "#059669"],
                [492, 372, 5, "#059669"],
                [330, 400, 5, "#2563eb"],
                [530, 210, 5, "#d97706"],
              ].map(([x, y, r, c], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill={String(c)} stroke="#fff" strokeWidth="1.8" />
              ))}

              {/* breeding sites */}
              {[
                [270, 196],
                [228, 224],
                [438, 132],
                [128, 348],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={Number(x) - 4}
                  y={Number(y) - 4}
                  width="8"
                  height="8"
                  rx="1.6"
                  fill="#0891b2"
                  stroke="#fff"
                  strokeWidth="1.4"
                  transform={`rotate(45 ${x} ${y})`}
                />
              ))}

              {/* scale */}
              <g>
                <rect x="24" y="440" width="80" height="4" fill="#0f172a" opacity=".7" />
                <text x="24" y="434" fontSize="10" fill="#334155">
                  0 — 1 กม.
                </text>
              </g>
              {/* north */}
              <g transform="translate(560,40)">
                <path d="M0 -18 L7 10 L0 4 L-7 10Z" fill="#334155" />
                <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">
                  N
                </text>
              </g>
            </svg>

            <div className="absolute top-3 right-3 grid gap-2">
              {(["plus", "map", "search"] as const).map((ic) => (
                <button
                  key={ic}
                  className="grid place-items-center w-9 h-9 rounded-xl bg-white shadow-sm border border-line-brd text-muted"
                >
                  <Icon name={ic} size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-line-brd">
            <Legend
              items={[
                { label: "ไข้เลือดออก", color: "#dc2626" },
                { label: "มือ เท้า ปาก", color: "#059669" },
                { label: "ไข้หวัดใหญ่", color: "#2563eb" },
                { label: "อาหารเป็นพิษ", color: "#d97706" },
                { label: "แหล่งเพาะพันธุ์", color: "#0891b2" },
              ]}
            />
          </div>
        </Card>

        {/* clusters */}
        <div className="grid gap-4 content-start">
          <Card title="กลุ่มก้อนการระบาด" icon="pin" action={<Chip bg="#fee2e2" fg="#b91c1c">4 cluster</Chip>}>
            <div className="grid gap-2.5">
              {CLUSTERS.map((c) => (
                <button
                  key={c.n}
                  className="text-left rounded-xl border border-line-brd p-3 hover:bg-surface2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-semibold flex-1 truncate">{c.n}</span>
                    <Chip bg={c.bg} fg={c.fg}>
                      {c.lv}
                    </Chip>
                  </div>
                  <p className="text-[11.5px] text-muted mt-1">
                    {c.d} · {c.c} ราย ใน 28 วัน
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card title="สรุปเชิงพื้นที่" icon="chart">
            <dl className="grid gap-2.5 text-[12.5px]">
              {[
                ["ผู้ป่วยที่ปักหมุดแล้ว", "54 / 58 ราย"],
                ["แหล่งเพาะพันธุ์ที่พบ", "23 จุด"],
                ["บ้านที่สำรวจแล้ว", "412 หลัง"],
                ["พื้นที่พ่นหมอกควัน", "6 หมู่บ้าน"],
                ["รัศมีควบคุมที่ประกาศ", "3 พื้นที่"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card title="ทีมภาคสนามในพื้นที่" icon="users">
            <div className="grid gap-2.5">
              {[
                ["ทีม SRRT เมือง-1", "ม.4 ต.ในเมือง", "#16a34a"],
                ["ทีม SRRT เมือง-2", "ม.2 ต.อรัญญิก", "#16a34a"],
                ["ทีม รพ.สต.บ้านคลอง", "กำลังเดินทาง", "#f59e0b"],
              ].map(([n, l, c]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: String(c) }} />
                  <span className="text-[12.5px] flex-1 truncate">{n}</span>
                  <span className="text-[11px] text-muted truncate">{l}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
