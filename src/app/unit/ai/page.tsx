import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, LineChart, Donut } from "@/components/ui";
import { Icon } from "@/components/icons";

export default function AreaAiAssistant() {
  return (
    <>
      <PageHead
        title="Assistant ด้วย AI"
        desc="ผู้ช่วยสรุปแนวโน้ม พยากรณ์ความเสี่ยง ตอบคำถามจากข้อมูลในเขตรับผิดชอบ และเสนอมาตรการให้เจ้าหน้าที่พิจารณา"
        actions={
          <>
            <Link href="/unit/analytics" className="btn btn-sm">
              <Icon name="chart" size={15} /> รายงานวิเคราะห์พื้นที่
            </Link>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการสนทนา
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="sparkles" size={15} /> ถาม Assistant
            </button>
          </>
        }
      />

      {/* AI summary banner */}
      <div
        className="card p-5 mb-5"
        style={{
          background: "linear-gradient(120deg,#f5f3ff,#faf5ff 60%,#fff)",
          borderColor: "#ddd6fe",
        }}
      >
        <div className="flex items-start gap-4">
          <span
            className="grid place-items-center rounded-xl text-white shrink-0"
            style={{ width: 42, height: 42, background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            <Icon name="sparkles" size={21} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[15px] font-bold">บทวิเคราะห์ประจำวันที่ 27 ส.ค. 2569</h2>
              <Chip bg="#ede9fe" fg="#6d28d9">
                ความเชื่อมั่นโมเดล 87%
              </Chip>
            </div>
            <p className="text-[13.5px] leading-relaxed mt-2 text-ink">
              เขตรับผิดชอบของหน่วยบริการ มีแนวโน้มผู้ป่วยไข้เลือดออก
              <strong> เพิ่มขึ้นต่อเนื่อง 3 สัปดาห์ </strong>
              และสูงกว่าค่ามัธยฐาน 5 ปีย้อนหลัง 2.3 เท่า จุดเสี่ยงหลักอยู่ที่
              <mark className="bg-[#fde68a] px-1 rounded"> ม.4 บ้านคลองใหม่ </mark>
              ซึ่งมีค่าดัชนีลูกน้ำ (HI) 24.1% สูงกว่าเกณฑ์มาตรฐาน 2.4 เท่า ประกอบกับปริมาณฝนสะสม
              7 วันที่ 84 มม. คาดว่าอีก 2 สัปดาห์จะพบผู้ป่วยเพิ่มอีก 4–6 ราย
              หากยังไม่มีมาตรการกำจัดแหล่งเพาะพันธุ์อย่างเข้มข้น
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="คะแนนความเสี่ยงพื้นที่" value="81" unit="/ 100" icon="shield" tone="var(--danger)" />
        <Stat label="พยากรณ์ผู้ป่วย 2 สัปดาห์" value="5" unit="ราย (±1)" icon="chart" delta={22} />
        <Stat label="ค่า Rt โดยประมาณ" value="1.34" icon="sparkles" tone="var(--warn)" />
        <Stat label="ฝนสะสม 7 วัน" value="84" unit="มม." icon="map" tone="var(--info)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px] mb-5">
        <Card
          title="พยากรณ์จำนวนผู้ป่วยล่วงหน้า 4 สัปดาห์"
          desc="โมเดล Time-series + ปัจจัยสภาพอากาศ + ค่าดัชนีลูกน้ำ"
          icon="chart"
        >
          <LineChart
            height={230}
            labels={["W32", "W33", "W34", "W35", "W36*", "W37*", "W38*", "W39*"]}
            series={[
              { name: "ข้อมูลจริง", color: "#7c3aed", points: [8, 11, 14, 12, 0, 0, 0, 0] },
              { name: "ค่าพยากรณ์", color: "#c4b5fd", points: [0, 0, 0, 12, 14, 16, 17, 15] },
              { name: "ขอบบนความเชื่อมั่น", color: "#fca5a5", points: [0, 0, 0, 12, 17, 20, 22, 20] },
            ]}
          />
          <p className="sub mt-2">* = สัปดาห์ที่พยากรณ์ · ช่วงความเชื่อมั่น 95%</p>
        </Card>

        <Card title="ปัจจัยที่มีผลต่อการระบาด" icon="sparkles" desc="น้ำหนักของแต่ละปัจจัยในโมเดล">
          <div className="grid gap-3.5">
            {[
              ["ค่าดัชนีลูกน้ำ (HI/CI/BI)", 34, "#7c3aed"],
              ["ปริมาณน้ำฝนสะสม", 24, "#a855f7"],
              ["ความหนาแน่นประชากร", 17, "#c084fc"],
              ["การเคลื่อนย้ายประชากร", 13, "#d8b4fe"],
              ["ประวัติการระบาดในอดีต", 12, "#e9d5ff"],
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

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card
          className="xl:col-span-2"
          title="ข้อเสนอแนะมาตรการจาก AI"
          desc="จัดลำดับตามผลกระทบที่คาดว่าจะลดจำนวนผู้ป่วยได้"
          icon="sparkles"
        >
          <div className="grid gap-3">
            {[
              [
                "เร่งกำจัดแหล่งเพาะพันธุ์ ม.4 บ้านคลองใหม่ ภายใน 3 วัน",
                "คาดลดผู้ป่วยได้ 3–5 ราย ใน 4 สัปดาห์",
                "สูงมาก",
                "#fee2e2",
                "#b91c1c",
              ],
              [
                "พ่นสารเคมีกำจัดยุงตัวเต็มวัยรัศมี 100 ม. รอบบ้านผู้ป่วย 2 ราย",
                "ตัดวงจรการแพร่เชื้อระยะสั้น 7–10 วัน",
                "สูง",
                "#ffedd5",
                "#c2410c",
              ],
              [
                "แจ้งข่าวประชาชนผ่านไลน์หมอพร้อมในรัศมี 500 ม.",
                "เพิ่มการเฝ้าระวังตนเองและมาพบแพทย์เร็วขึ้น",
                "ปานกลาง",
                "#fef3c7",
                "#b45309",
              ],
              [
                "สำรวจศูนย์เด็กเล็ก ม.7 บ้านท่าโรง (มือ เท้า ปาก 3 ราย)",
                "ป้องกันการระบาดในสถานศึกษา",
                "ปานกลาง",
                "#fef3c7",
                "#b45309",
              ],
            ].map(([t, d, lv, bg, fg]) => (
              <div key={String(t)} className="rounded-xl border border-line-brd p-3.5">
                <div className="flex items-start gap-2.5">
                  <span
                    className="grid place-items-center rounded-lg shrink-0 mt-0.5"
                    style={{ width: 28, height: 28, background: String(bg), color: String(fg) }}
                  >
                    <Icon name="check" size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-snug">{t}</p>
                    <p className="sub mt-1">{d}</p>
                  </div>
                  <Chip bg={String(bg)} fg={String(fg)}>
                    {lv}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="สัดส่วนโรคในพื้นที่" icon="chart">
            <Donut
              size={140}
              center="14"
              centerSub="ราย"
              slices={[
                { label: "ไข้เลือดออก", value: 9, color: "#dc2626" },
                { label: "มือ เท้า ปาก", value: 3, color: "#059669" },
                { label: "ไข้หวัดใหญ่", value: 1, color: "#2563eb" },
                { label: "อื่นๆ", value: 1, color: "#94a3b8" },
              ]}
            />
          </Card>

          <Card title="ถามข้อมูลด้วยภาษาธรรมชาติ" icon="chat">
            <div
              className="rounded-xl p-3 text-[12.5px] mb-2.5"
              style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
            >
              &ldquo;หมู่บ้านไหนในเขตมีผู้ป่วยไข้เลือดออกเพิ่มเร็วที่สุดใน 2 สัปดาห์&rdquo;
            </div>
            <div
              className="rounded-xl p-3 text-[12.5px] leading-relaxed"
              style={{ background: "#f5f3ff", color: "#4c1d95" }}
            >
              ม.4 บ้านคลองใหม่ เพิ่มขึ้น 200% (2 → 6 ราย) รองลงมาคือ ม.2 บ้านคลองเหนือ 100% (2 → 4 ราย)
              ทั้งสองหมู่บ้านอยู่ติดกันและมีค่า HI เกินเกณฑ์
            </div>
            <div className="flex items-center gap-2 mt-3 h-10 px-3 rounded-xl border border-line-brd">
              <input
                className="bg-transparent text-[12.5px] outline-none w-full placeholder:text-faint"
                placeholder="พิมพ์คำถามเกี่ยวกับข้อมูลในเขต รพ.สต.…"
                readOnly
              />
              <span style={{ color: "var(--accent)" }}>
                <Icon name="send" size={16} />
              </span>
            </div>
          </Card>
        </div>
      </div>

      <Card
        title="ตารางวิเคราะห์รายหมู่บ้าน"
        desc="ค่าที่ระบบคำนวณอัตโนมัติทุกวันเวลา 06:00 น."
        icon="db"
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr>
                <th className="th">หมู่บ้าน</th>
                <th className="th">ผู้ป่วย 28 วัน</th>
                <th className="th">อัตราต่อแสน</th>
                <th className="th">HI</th>
                <th className="th">CI</th>
                <th className="th">Rt</th>
                <th className="th">พยากรณ์ 2 สัปดาห์</th>
                <th className="th">คะแนนเสี่ยง</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ม.4 บ้านคลองใหม่", 6, 62.4, "24.1%", "9.8%", 1.58, "2–3 ราย", 92],
                ["ม.2 บ้านคลองเหนือ", 4, 48.1, "18.6%", "7.6%", 1.41, "1–2 ราย", 81],
                ["ม.7 บ้านท่าโรง", 2, 34.2, "12.4%", "5.2%", 1.16, "0–2 ราย", 64],
                ["ม.1 บ้านคลองใต้", 1, 26.8, "9.2%", "4.4%", 1.04, "0–1 ราย", 51],
                ["ม.5 บ้านหนองไผ่", 1, 18.2, "6.0%", "2.8%", 0.92, "0–1 ราย", 33],
                ["ม.9 บ้านดงยาง", 0, 0.0, "4.2%", "1.8%", 0.81, "0 ราย", 18],
              ].map(([t, n, r, hi, ci, rt, f, s]) => (
                <tr key={String(t)} className="hover:bg-surface2">
                  <td className="td font-medium">{t}</td>
                  <td className="td tabular-nums">{n}</td>
                  <td className="td tabular-nums">{r}</td>
                  <td className="td tabular-nums" style={{ color: Number(s) > 60 ? "var(--danger)" : undefined }}>
                    {hi}
                  </td>
                  <td className="td tabular-nums">{ci}</td>
                  <td className="td tabular-nums font-semibold">{rt}</td>
                  <td className="td text-muted">{f}</td>
                  <td className="td">
                    <div className="flex items-center gap-2.5">
                      <Progress
                        value={Number(s)}
                        color={Number(s) > 75 ? "#dc2626" : Number(s) > 50 ? "#f59e0b" : "#16a34a"}
                      />
                      <span className="text-[11.5px] font-semibold tabular-nums w-6 text-right">{s}</span>
                    </div>
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
