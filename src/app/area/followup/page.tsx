import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, BarChart, Donut } from "@/components/ui";
import { Icon } from "@/components/icons";

const BEHAVIOR = [
  { b: "สำรวจ/ทำลายแหล่งลูกน้ำทุก 7 วัน", now: 62, prev: 48 },
  { b: "ปิดฝาภาชนะเก็บน้ำมิดชิด", now: 78, prev: 71 },
  { b: "นอนในมุ้ง/ห้องมีมุ้งลวด", now: 54, prev: 50 },
  { b: "ใช้ยาทากันยุงเมื่อออกนอกบ้าน", now: 41, prev: 33 },
  { b: "ไปพบแพทย์เมื่อมีไข้เกิน 2 วัน", now: 69, prev: 58 },
  { b: "ไม่ซื้อยากลุ่ม NSAIDs กินเอง", now: 47, prev: 39 },
];

export default function Followup() {
  return (
    <>
      <PageHead
        title="ติดตามพฤติกรรมสุขภาพของประชาชน"
        desc="ผลการติดตามการดูแลตนเองของประชาชนในพื้นที่ระบาด ผ่านแบบสำรวจบนไลน์หมอพร้อมและการเยี่ยมบ้านของ อสม."
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกผลสำรวจ
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="plus" size={15} /> สร้างแบบสำรวจใหม่
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้ตอบแบบสำรวจ" value="3,482" unit="คน" icon="users" delta={-14} />
        <Stat label="อัตราการตอบกลับ" value="27.9" unit="%" icon="chat" tone="var(--info)" />
        <Stat label="คะแนนพฤติกรรมเฉลี่ย" value="58.5" unit="/ 100" icon="heart" tone="var(--warn)" />
        <Stat label="ครัวเรือนที่ อสม. เยี่ยมแล้ว" value="412" unit="/ 620 หลัง" icon="home" tone="var(--ok)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_380px] mb-5">
        <Card
          title="พฤติกรรมการดูแลตนเองของประชาชน"
          desc="เปรียบเทียบก่อนและหลังการแจ้งข่าวผ่านไลน์หมอพร้อม (รอบ 24 ส.ค. 2569)"
          icon="heart"
        >
          <div className="grid gap-4">
            {BEHAVIOR.map((b) => (
              <div key={b.b}>
                <div className="flex justify-between text-[12.5px] mb-1.5 gap-3">
                  <span className="text-muted">{b.b}</span>
                  <span className="font-semibold tabular-nums shrink-0">
                    {b.now}%{" "}
                    <span
                      className="text-[11px]"
                      style={{ color: b.now > b.prev ? "var(--ok)" : "var(--danger)" }}
                    >
                      ({b.now > b.prev ? "+" : ""}
                      {b.now - b.prev})
                    </span>
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={b.now}
                    color={b.now >= 70 ? "#16a34a" : b.now >= 50 ? "#f59e0b" : "#dc2626"}
                    height={8}
                  />
                  <span
                    className="absolute top-0 h-2 w-[2px] bg-[#334155]"
                    style={{ left: `${b.prev}%` }}
                    title="ก่อนแจ้งข่าว"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="sub mt-4">
            เส้นแนวตั้งสีเข้ม = ค่าก่อนการแจ้งข่าว · แถบสี = ค่าปัจจุบัน
          </p>
        </Card>

        <div className="grid gap-4 content-start">
          <Card title="ระดับความเสี่ยงของครัวเรือน" icon="home">
            <Donut
              size={140}
              center="620"
              centerSub="ครัวเรือน"
              slices={[
                { label: "ปลอดภัย (ไม่พบลูกน้ำ)", value: 348, color: "#16a34a" },
                { label: "เฝ้าระวัง (พบ 1 จุด)", value: 164, color: "#f59e0b" },
                { label: "เสี่ยงสูง (พบ 2 จุดขึ้นไป)", value: 78, color: "#dc2626" },
                { label: "ยังไม่ได้สำรวจ", value: 30, color: "#cbd5e1" },
              ]}
            />
          </Card>

          <Card title="ช่องทางที่ประชาชนตอบกลับ" icon="chat">
            <div className="grid gap-3">
              {[
                ["ไลน์หมอพร้อม", 68, "#06c755"],
                ["อสม. เยี่ยมบ้าน", 21, "#7c3aed"],
                ["โทรศัพท์ รพ.สต.", 8, "#2563eb"],
                ["อื่นๆ", 3, "#94a3b8"],
              ].map(([l, v, c]) => (
                <div key={String(l)}>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="text-muted">{l}</span>
                    <span className="font-semibold tabular-nums">{v}%</span>
                  </div>
                  <Progress value={Number(v)} color={String(c)} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card
          className="xl:col-span-2"
          title="แนวโน้มคะแนนพฤติกรรมรายสัปดาห์"
          desc="คะแนนรวมจากแบบประเมิน 10 ข้อ เต็ม 100 คะแนน"
          icon="chart"
        >
          <BarChart
            height={190}
            colors={["#7c3aed", "#a78bfa", "#c4b5fd"]}
            data={[
              { w: "W30", a: 44, b: 38, c: 52 },
              { w: "W31", a: 47, b: 41, c: 54 },
              { w: "W32", a: 49, b: 44, c: 56 },
              { w: "W33", a: 53, b: 47, c: 59 },
              { w: "W34", a: 56, b: 51, c: 62 },
              { w: "W35", a: 58, b: 54, c: 64 },
            ]}
            keys={["a", "b", "c"]}
            labels={["ต.ในเมือง", "ต.อรัญญิก", "ค่าเฉลี่ยอำเภอ"]}
          />
        </Card>

        <Card title="แบบสำรวจที่กำลังใช้งาน" icon="clipboard" pad={false}>
          <ul>
            {[
              ["แบบประเมินพฤติกรรม 3 เก็บ", "ส่ง 12,480 · ตอบ 3,482", "กำลังเก็บข้อมูล", "#dbeafe", "#1d4ed8"],
              ["แบบสำรวจลูกน้ำในครัวเรือน", "ส่ง 620 · ตอบ 590", "ใกล้ครบกำหนด", "#fef3c7", "#b45309"],
              ["แบบติดตามอาการหลังป่วย 14 วัน", "ส่ง 58 · ตอบ 47", "กำลังเก็บข้อมูล", "#dbeafe", "#1d4ed8"],
              ["แบบประเมินความพึงพอใจการแจ้งข่าว", "ส่ง 12,480 · ตอบ 1,204", "ปิดรับแล้ว", "#dcfce7", "#15803d"],
            ].map(([n, s, st, bg, fg]) => (
              <li key={String(n)} className="px-4 py-3.5 border-b border-line-brd last:border-0">
                <div className="flex items-start gap-2">
                  <span className="text-[12.5px] font-semibold flex-1 leading-snug">{n}</span>
                  <Chip bg={String(bg)} fg={String(fg)}>
                    {st}
                  </Chip>
                </div>
                <p className="sub mt-1">{s}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card
        title="รายชื่อครัวเรือนที่ต้องติดตามซ้ำ"
        desc="ครัวเรือนที่พบแหล่งเพาะพันธุ์ซ้ำ หรือยังไม่ตอบแบบสำรวจ"
        icon="users"
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[780px]">
            <thead>
              <tr>
                <th className="th">ครัวเรือน</th>
                <th className="th">พื้นที่</th>
                <th className="th">อสม. ผู้ดูแล</th>
                <th className="th">ผลสำรวจล่าสุด</th>
                <th className="th">คะแนนพฤติกรรม</th>
                <th className="th">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["บ้านเลขที่ 128/4", "ม.4 ต.ในเมือง", "นางสมพร ดีใจ", "พบลูกน้ำ 3 จุด", 28, "ต้องเยี่ยมซ้ำ", "#fee2e2", "#b91c1c"],
                ["บ้านเลขที่ 96/1", "ม.4 ต.ในเมือง", "นางสมพร ดีใจ", "พบลูกน้ำ 2 จุด", 36, "ต้องเยี่ยมซ้ำ", "#fee2e2", "#b91c1c"],
                ["บ้านเลขที่ 44", "ม.2 ต.อรัญญิก", "นายบุญมา ทองแท้", "พบลูกน้ำ 1 จุด", 52, "เฝ้าระวัง", "#fef3c7", "#b45309"],
                ["บ้านเลขที่ 210/8", "ม.2 ต.อรัญญิก", "นายบุญมา ทองแท้", "ไม่ตอบแบบสำรวจ", 0, "ยังไม่ประเมิน", "#f1f5f9", "#475569"],
                ["บ้านเลขที่ 15", "ม.7 ต.บ้านคลอง", "นางวันดี ศรีทอง", "ไม่พบลูกน้ำ", 84, "ปกติ", "#dcfce7", "#15803d"],
              ].map(([h, a, v, r, s, st, bg, fg]) => (
                <tr key={String(h)} className="hover:bg-surface2">
                  <td className="td font-medium">{h}</td>
                  <td className="td text-muted">{a}</td>
                  <td className="td text-muted">{v}</td>
                  <td className="td">{r}</td>
                  <td className="td">
                    <div className="flex items-center gap-2.5 w-[130px]">
                      <Progress
                        value={Number(s)}
                        color={Number(s) >= 70 ? "#16a34a" : Number(s) >= 50 ? "#f59e0b" : "#dc2626"}
                      />
                      <span className="text-[11.5px] font-semibold tabular-nums w-6 text-right">{s}</span>
                    </div>
                  </td>
                  <td className="td">
                    <Chip bg={String(bg)} fg={String(fg)}>
                      {st}
                    </Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
