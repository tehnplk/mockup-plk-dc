import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Legend } from "@/components/ui";
import LocalMap from "@/components/LocalMap";
import { Icon } from "@/components/icons";
import { DISEASES } from "@/lib/mock";

const CLUSTERS = [
  { n: "ม.4 บ้านคลองใหม่", c: 6, lv: "สูงมาก", bg: "#fee2e2", fg: "#b91c1c", d: "ไข้เลือดออก" },
  { n: "ม.2 บ้านคลองเหนือ", c: 4, lv: "สูง", bg: "#ffedd5", fg: "#c2410c", d: "ไข้เลือดออก" },
  { n: "ศูนย์เด็กเล็ก ม.7 บ้านท่าโรง", c: 3, lv: "สูง", bg: "#ffedd5", fg: "#c2410c", d: "มือ เท้า ปาก" },
  { n: "ม.1 บ้านคลองใต้", c: 1, lv: "ปานกลาง", bg: "#fef3c7", fg: "#b45309", d: "ไข้เลือดออก" },
];

export default function AreaMap() {
  return (
    <>
      <PageHead
        title="แผนที่การระบาด"
        desc="แสดงตำแหน่งผู้ป่วยในเขต รพ.สต. กลุ่มก้อนการระบาด (Cluster) และรัศมีควบคุมโรคแบบเรียลไทม์"
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

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
        {/* layers */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="ชั้นข้อมูล (Layers)" icon="grid">
            <div className="grid gap-2">
              {[
                ["จุดผู้ป่วยรายบุคคล", true],
                ["ความหนาแน่น (Heatmap)", true],
                ["รัศมีควบคุมโรค 100 ม.", true],
                ["แหล่งเพาะพันธุ์ลูกน้ำ", true],
                ["ขอบเขตหมู่บ้าน", true],
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
                    {[9, 2, 0, 2, 1, 0][i]}
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
          title="แผนที่ ต.บ้านคลอง"
          desc="เขตรับผิดชอบของหน่วยบริการ · 9 หมู่บ้าน · ระบบพิกัด WGS84"
          icon="map"
          pad={false}
          action={<Chip bg="#dcfce7" fg="#15803d" dot>อัปเดต 3 นาทีที่แล้ว</Chip>}
        >
          <div className="relative">
            <LocalMap height={470} />

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
        <div className="flex flex-col gap-4 min-w-0">
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
                ["ผู้ป่วยที่ปักหมุดแล้ว", "14 / 14 ราย"],
                ["แหล่งเพาะพันธุ์ที่พบ", "24 จุด"],
                ["บ้านที่สำรวจแล้ว", "186 / 2,184 หลัง"],
                ["พื้นที่พ่นหมอกควัน", "3 หมู่บ้าน"],
                ["รัศมีควบคุมที่ประกาศ", "2 พื้นที่"],
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
                ["ทีม รพ.สต.บ้านคลอง", "ม.4 บ้านคลองใหม่", "#16a34a"],
                ["ทีม SRRT อำเภอ", "ม.2 บ้านคลองเหนือ", "#16a34a"],
                ["อสม. ม.7 บ้านท่าโรง", "กำลังเดินทาง", "#f59e0b"],
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
