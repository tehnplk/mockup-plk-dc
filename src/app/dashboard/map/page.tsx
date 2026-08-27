import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Legend, PlkMap, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISTRICT_LOAD } from "@/lib/mock";

const VALUES = Object.fromEntries(DISTRICT_LOAD.map((d) => [d.d, d.n]));

const PINS = [
  { d: "เมืองพิษณุโลก", x: 78, y: 148, color: "#b91c1c", size: 6 },
  { d: "เมืองพิษณุโลก", x: 112, y: 190, color: "#b91c1c", size: 5 },
  { d: "วังทอง", x: 140, y: 224, color: "#dc2626", size: 6 },
  { d: "บางระกำ", x: 26, y: 208, color: "#ea580c", size: 5 },
  { d: "พรหมพิราม", x: 34, y: 128, color: "#f59e0b", size: 5 },
  { d: "นครไทย", x: 160, y: 34, color: "#059669", size: 4 },
  { d: "วัดโบสถ์", x: 154, y: 128, color: "#2563eb", size: 4 },
  { d: "บางกระทุ่ม", x: 52, y: 258, color: "#d97706", size: 4 },
  { d: "เนินมะปราง", x: 180, y: 214, color: "#7c3aed", size: 4 },
  { d: "ชาติตระการ", x: 40, y: 34, color: "#7c3aed", size: 4 },
];

export default function DashboardMap() {
  return (
    <>
      <PageHead
        title="ระบบแผนที่จังหวัดพิษณุโลก"
        desc="แสดงการกระจายผู้ป่วยทั้ง 9 อำเภอ · เลือกชั้นข้อมูลและช่วงเวลาเพื่อดูรูปแบบการระบาด"
        actions={
          <>
            <select className="btn btn-sm" defaultValue="cases">
              <option value="cases">จำนวนผู้ป่วย</option>
              <option value="rate">อัตราต่อประชากรแสนคน</option>
              <option value="trend">อัตราการเปลี่ยนแปลง</option>
              <option value="hi">ค่าดัชนีลูกน้ำ</option>
            </select>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> เล่นไทม์ไลน์
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="file" size={15} /> ส่งออกแผนที่
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card
          title="แผนที่เชิงพื้นที่ (Choropleth + จุดผู้ป่วย)"
          desc="ระดับสีแสดงจำนวนผู้ป่วยสะสม 28 วัน · จุดแสดงตำแหน่ง cluster"
          icon="map"
          action={<Chip bg="#dcfce7" fg="#15803d" dot>อัปเดต 5 นาทีที่แล้ว</Chip>}
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
            <div className="rounded-xl bg-surface2 p-3">
              <PlkMap
                values={VALUES}
                scaleFrom="#dbeafe"
                scaleTo="#b91c1c"
                height={520}
                pins={PINS}
              />
            </div>

            <div className="flex flex-col gap-4 min-w-0">
              <div>
                <p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2">
                  ระดับสี (ผู้ป่วยสะสม)
                </p>
                <div className="grid gap-1.5">
                  {[
                    ["40 ราย ขึ้นไป", "#b91c1c"],
                    ["26–40 ราย", "#dc2626"],
                    ["16–25 ราย", "#f59e0b"],
                    ["6–15 ราย", "#93c5fd"],
                    ["0–5 ราย", "#dbeafe"],
                  ].map(([l, c]) => (
                    <div key={l} className="flex items-center gap-2 text-[11.5px] text-muted">
                      <span
                        className="w-5 h-4 rounded-[3px] border border-white shrink-0"
                        style={{ background: c }}
                      />
                      {l}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2">
                  ชั้นข้อมูล
                </p>
                <div className="grid gap-1.5">
                  {[
                    ["ขอบเขตอำเภอ", true],
                    ["จุด Cluster", true],
                    ["ตำแหน่งโรงพยาบาล", false],
                    ["เส้นทางคมนาคม", false],
                    ["แหล่งน้ำ/พื้นที่น้ำท่วม", false],
                  ].map(([t, on]) => (
                    <label key={String(t)} className="flex items-center gap-2 text-[11.5px]">
                      <span
                        className="grid place-items-center rounded w-[15px] h-[15px] shrink-0 border-2"
                        style={{
                          background: on ? "var(--accent)" : "#fff",
                          borderColor: on ? "var(--accent)" : "#cbd5e1",
                          color: "#fff",
                        }}
                      >
                        {on && <Icon name="check" size={10} />}
                      </span>
                      <span style={{ color: on ? "var(--text)" : "var(--muted)" }}>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2">
                  โรคที่แสดง
                </p>
                <Legend
                  items={[
                    { label: "ไข้เลือดออก", color: "#b91c1c" },
                    { label: "มือ เท้า ปาก", color: "#059669" },
                    { label: "ไข้หวัดใหญ่", color: "#2563eb" },
                    { label: "อาหารเป็นพิษ", color: "#d97706" },
                    { label: "อื่นๆ", color: "#7c3aed" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="อันดับอำเภอ" desc="เรียงตามจำนวนผู้ป่วยสะสม" icon="chart" pad={false}>
            <ul>
              {DISTRICT_LOAD.map((d, i) => (
                <li
                  key={d.d}
                  className="flex items-center gap-2.5 px-4 py-2.5 border-b border-line-brd last:border-0"
                >
                  <span
                    className="grid place-items-center rounded-lg w-6 h-6 text-[11px] font-bold shrink-0"
                    style={{
                      background: i < 3 ? "#fee2e2" : "#f1f5f9",
                      color: i < 3 ? "#b91c1c" : "#64748b",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium truncate">{d.d}</span>
                    <span className="block text-[11px] text-muted">
                      {d.rate} ต่อประชากรแสนคน
                    </span>
                  </span>
                  <span className="text-right shrink-0">
                    <span className="block text-[13px] font-bold tabular-nums">{d.n}</span>
                    <span
                      className="block text-[10.5px] font-semibold tabular-nums"
                      style={{
                        color:
                          d.trend > 0 ? "var(--danger)" : d.trend < 0 ? "var(--ok)" : "var(--faint)",
                      }}
                    >
                      {d.trend > 0 ? "▲" : d.trend < 0 ? "▼" : "—"}
                      {Math.abs(d.trend)}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="พื้นที่ประกาศควบคุมโรค" icon="shield">
            <div className="grid gap-2.5">
              {[
                ["ม.4 ต.บ้านคลอง อ.เมือง", "ไข้เลือดออก", "ถึง 5 ก.ย. 2569", "#fee2e2", "#b91c1c"],
                ["ม.2 ต.ชัยนาม อ.วังทอง", "ไข้เลือดออก", "ถึง 2 ก.ย. 2569", "#fee2e2", "#b91c1c"],
                ["ศูนย์เด็กเล็ก ต.บ้านคลอง", "มือ เท้า ปาก", "ถึง 30 ส.ค. 2569", "#ffedd5", "#c2410c"],
              ].map(([n, d, u, bg, fg]) => (
                <div key={String(n)} className="rounded-xl border border-line-brd p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[12.5px] font-semibold flex-1 leading-snug">{n}</span>
                    <Chip bg={String(bg)} fg={String(fg)}>
                      {d}
                    </Chip>
                  </div>
                  <p className="sub mt-1">{u}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="ความครบถ้วนของพิกัด" desc="เคสที่ปักหมุดตำแหน่งแล้ว" icon="pin">
            <div className="grid gap-3">
              {DISTRICT_LOAD.slice(0, 5).map((d, i) => {
                const v = [96, 92, 84, 78, 71][i];
                return (
                  <div key={d.d}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-muted truncate">{d.d}</span>
                      <span className="font-semibold tabular-nums">{v}%</span>
                    </div>
                    <Progress value={v} height={5} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
