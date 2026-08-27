import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, LineChart, Legend } from "@/components/ui";
import LocalMap from "@/components/LocalMap";
import { Icon } from "@/components/icons";

const VILLAGE_WEEKLY = [
  { w: "W28", n: 2 },
  { w: "W29", n: 3 },
  { w: "W30", n: 4 },
  { w: "W31", n: 6 },
  { w: "W32", n: 8 },
  { w: "W33", n: 11 },
  { w: "W34", n: 14 },
  { w: "W35", n: 12 },
];

export default function TambonOverview() {
  return (
    <>
      <PageHead
        title="ภาพรวมพื้นที่รับผิดชอบ"
        desc="รพ.สต.บ้านคลอง · ต.บ้านคลอง อ.เมืองพิษณุโลก · 9 หมู่บ้าน · 2,184 หลังคาเรือน · ประชากร 8,742 คน"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ออกรายงานสัปดาห์
            </button>
            <Link href="/unit/broadcast" className="btn btn-primary btn-sm">
              <Icon name="megaphone" size={15} /> แจ้งข่าวประชาชน
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้ป่วยสะสมในเขต รพ.สต." value={14} unit="ราย" icon="hospital" delta={17} />
        <Stat label="หมู่บ้านที่มีการระบาด" value={3} unit="/ 9 หมู่บ้าน" icon="pin" tone="var(--danger)" />
        <Stat label="ค่าดัชนีลูกน้ำ (HI)" value="16.8" unit="% (เกณฑ์ ≤10)" icon="shield" tone="var(--warn)" />
        <Stat label="ประชาชนที่เข้าถึงข่าวสาร" value="5,120" unit="คน" icon="megaphone" tone="var(--ok)" />
      </div>

      {/* งานที่ต้องทำวันนี้ — ฟีเจอร์ใหม่ตาม spec */}
      <div className="grid gap-4 sm:grid-cols-2 mb-5">
        <Link
          href="/unit/investigate"
          className="card p-4 flex items-center gap-3.5 hover:bg-surface2 transition-colors"
          style={{ borderLeft: "4px solid var(--accent)" }}
        >
          <span
            className="grid place-items-center rounded-xl shrink-0"
            style={{
              width: 40,
              height: 40,
              background: "color-mix(in srgb, var(--accent) 12%, #fff)",
              color: "var(--accent)",
            }}
          >
            <Icon name="clipboard" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold">บันทึกข้อมูลสอบสวนควบคุมโรค</span>
            <span className="sub">มี 2 เคสในเขตที่ยังบันทึกไม่ครบ</span>
          </span>
          <Chip bg="#fee2e2" fg="#b91c1c">
            2 เคส
          </Chip>
        </Link>

        <Link
          href="/unit/exclude"
          className="card p-4 flex items-center gap-3.5 hover:bg-surface2 transition-colors"
          style={{ borderLeft: "4px solid var(--warn)" }}
        >
          <span
            className="grid place-items-center rounded-xl shrink-0"
            style={{ width: 40, height: 40, background: "#fef3c7", color: "#b45309" }}
          >
            <Icon name="shield" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold">ยื่นคำร้องตัดเคสออก</span>
            <span className="sub">เคสที่ที่อยู่จริงไม่อยู่ในเขตรับผิดชอบ</span>
          </span>
          <Chip bg="#fef3c7" fg="#b45309">
            รอผล 1
          </Chip>
        </Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px] mb-5">
        <Card
          title="แนวโน้มผู้ป่วยรายสัปดาห์ในเขต รพ.สต."
          desc="เปรียบเทียบกับค่ามัธยฐาน 5 ปีย้อนหลังของตำบล"
          icon="chart"
          action={<Chip bg="#fee2e2" fg="#b91c1c" dot>สูงกว่าค่ามัธยฐาน 5 ปี</Chip>}
        >
          <LineChart
            height={210}
            labels={VILLAGE_WEEKLY.map((w) => w.w)}
            series={[
              { name: "ปี 2569", color: "#7c3aed", points: VILLAGE_WEEKLY.map((w) => w.n) },
              { name: "ค่ามัธยฐาน 5 ปี", color: "#94a3b8", points: [2, 3, 3, 4, 5, 5, 6, 6] },
              { name: "เส้นเตือนภัยตำบล", color: "#dc2626", points: [8, 8, 8, 8, 8, 8, 8, 8] },
            ]}
          />
        </Card>

        <Card
          title="แผนที่ผู้ป่วยในเขตรับผิดชอบ"
          desc="ต.บ้านคลอง · 9 หมู่บ้าน"
          icon="map"
          action={
            <Link href="/unit/map" className="btn btn-sm">
              เปิดแผนที่เต็ม
            </Link>
          }
          pad={false}
        >
          <LocalMap height={300} />
          <div className="p-4 border-t border-line-brd">
            <Legend
              items={[
                { label: "ไข้เลือดออก", color: "#dc2626" },
                { label: "มือ เท้า ปาก", color: "#059669" },
                { label: "แหล่งเพาะพันธุ์", color: "#0891b2" },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="หมู่บ้านที่ต้องเฝ้าระวัง"
          desc="เรียงตามลำดับความเสี่ยงที่ระบบ AI ประเมิน"
          icon="pin"
          pad={false}
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[680px]">
              <thead>
                <tr>
                  <th className="th">หมู่บ้าน</th>
                  <th className="th">ผู้ป่วย 4 สัปดาห์</th>
                  <th className="th">ค่า HI</th>
                  <th className="th">ระดับเสี่ยง</th>
                  <th className="th w-[170px]">มาตรการที่ทำแล้ว</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ม.4 บ้านคลองใหม่", 6, "24.1%", "สูงมาก", "#fee2e2", "#b91c1c", 85],
                  ["ม.2 บ้านคลองเหนือ", 4, "18.6%", "สูง", "#ffedd5", "#c2410c", 60],
                  ["ม.7 บ้านท่าโรง", 2, "12.4%", "ปานกลาง", "#fef3c7", "#b45309", 45],
                  ["ม.1 บ้านคลองใต้", 1, "9.2%", "ปานกลาง", "#fef3c7", "#b45309", 70],
                  ["ม.5 บ้านหนองไผ่", 1, "6.0%", "ต่ำ", "#dcfce7", "#15803d", 100],
                ].map(([p, n, hi, lv, bg, fg, done]) => (
                  <tr key={String(p)} className="hover:bg-surface2">
                    <td className="td font-medium">{p}</td>
                    <td className="td tabular-nums">{n} ราย</td>
                    <td className="td tabular-nums">{hi}</td>
                    <td className="td">
                      <Chip bg={String(bg)} fg={String(fg)}>
                        {lv}
                      </Chip>
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        <Progress value={Number(done)} />
                        <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                          {done}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="ทางลัดระบบงาน" icon="grid">
          <div className="grid gap-2">
            {[
              ["/unit/investigate", "clipboard", "บันทึกข้อมูลสอบสวน", "กรอกแบบสอบสวนในเขต"],
              ["/unit/exclude", "shield", "ยื่นคำร้องตัดเคสออก", "ส่งคำร้องถึง Admin จังหวัด"],
              ["/unit/map", "map", "แผนที่การระบาด", "ดูจุดผู้ป่วยและ cluster"],
              ["/unit/ai", "sparkles", "วิเคราะห์ด้วย AI", "พยากรณ์และข้อเสนอแนะ"],
              ["/unit/media", "image", "ผลิตสื่อประชาสัมพันธ์", "สร้างโปสเตอร์/คลิปสั้น"],
              ["/unit/broadcast", "megaphone", "แจ้งข่าวหมอพร้อม", "ส่งถึงประชาชนในพื้นที่"],
              ["/unit/followup", "heart", "ติดตามพฤติกรรมสุขภาพ", "แบบสำรวจและผลตอบรับ"],
              ["/unit/documents", "file", "คลังเอกสาร", "ค้นคืนเอกสารย้อนหลัง"],
            ].map(([href, ic, t, d]) => (
              <Link
                key={String(href)}
                href={String(href)}
                className="flex items-center gap-3 rounded-xl border border-line-brd p-3 hover:bg-surface2 transition-colors"
              >
                <span
                  className="grid place-items-center rounded-lg shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    background: "color-mix(in srgb, var(--accent) 12%, #fff)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon name={ic as "map"} size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold">{t}</span>
                  <span className="block text-[11.5px] text-muted truncate">{d}</span>
                </span>
                <span className="text-faint">
                  <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
