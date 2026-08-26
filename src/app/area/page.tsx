import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, LineChart, PlkMap, Legend } from "@/components/ui";
import { Icon } from "@/components/icons";
import { WEEKLY, DISTRICT_LOAD } from "@/lib/mock";

const VALUES = Object.fromEntries(DISTRICT_LOAD.map((d) => [d.d, d.n]));

export default function AreaHome() {
  return (
    <>
      <PageHead
        title="ภาพรวมพื้นที่รับผิดชอบ"
        desc="อ.เมืองพิษณุโลก · 20 ตำบล · 21 รพ.สต. · ประชากร 289,412 คน"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ออกรายงานสัปดาห์
            </button>
            <Link href="/area/broadcast" className="btn btn-primary btn-sm">
              <Icon name="megaphone" size={15} /> แจ้งข่าวประชาชน
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้ป่วยสะสมในพื้นที่" value={58} unit="ราย" icon="hospital" delta={12} />
        <Stat label="หมู่บ้านที่มีการระบาด" value={7} unit="หมู่บ้าน" icon="pin" tone="var(--danger)" />
        <Stat label="ค่าดัชนีลูกน้ำ (HI)" value="14.2" unit="% (เกณฑ์ ≤10)" icon="shield" tone="var(--warn)" />
        <Stat label="ประชาชนที่เข้าถึงข่าวสาร" value="42,180" unit="คน" icon="megaphone" tone="var(--ok)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_400px] mb-5">
        <Card
          title="แนวโน้มผู้ป่วยรายสัปดาห์ในพื้นที่"
          desc="เปรียบเทียบกับค่ามัธยฐาน 5 ปีย้อนหลัง"
          icon="chart"
          action={<Chip bg="#fee2e2" fg="#b91c1c" dot>สูงกว่าค่ามัธยฐาน 5 ปี</Chip>}
        >
          <LineChart
            height={210}
            labels={WEEKLY.map((w) => w.w)}
            series={[
              { name: "ปี 2569", color: "#7c3aed", points: WEEKLY.map((w) => w.dengue) },
              { name: "ค่ามัธยฐาน 5 ปี", color: "#94a3b8", points: [10, 12, 14, 16, 18, 20, 22, 21] },
              { name: "เส้นเตือนภัย", color: "#dc2626", points: [30, 30, 30, 30, 30, 30, 30, 30] },
            ]}
          />
        </Card>

        <Card
          title="ความหนาแน่นผู้ป่วยรายอำเภอ"
          desc="เน้นพื้นที่รับผิดชอบและอำเภอข้างเคียง"
          icon="map"
          action={
            <Link href="/area/map" className="btn btn-sm">
              เปิดแผนที่เต็ม
            </Link>
          }
        >
          <PlkMap values={VALUES} scaleFrom="#ede9fe" scaleTo="#6d28d9" height={300} />
          <div className="mt-2">
            <Legend
              items={[
                { label: "ต่ำ", color: "#ede9fe" },
                { label: "ปานกลาง", color: "#a78bfa" },
                { label: "สูง", color: "#6d28d9" },
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
                  <th className="th">พื้นที่</th>
                  <th className="th">ผู้ป่วย 4 สัปดาห์</th>
                  <th className="th">ค่า HI</th>
                  <th className="th">ระดับเสี่ยง</th>
                  <th className="th w-[170px]">มาตรการที่ทำแล้ว</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ม.4 ต.ในเมือง", 9, "22.4%", "สูงมาก", "#fee2e2", "#b91c1c", 85],
                  ["ม.2 ต.อรัญญิก", 6, "18.1%", "สูง", "#ffedd5", "#c2410c", 60],
                  ["ม.7 ต.บ้านคลอง", 4, "12.6%", "ปานกลาง", "#fef3c7", "#b45309", 45],
                  ["ม.1 ต.หัวรอ", 3, "9.8%", "ปานกลาง", "#fef3c7", "#b45309", 70],
                  ["ม.5 ต.ท่าทอง", 2, "6.2%", "ต่ำ", "#dcfce7", "#15803d", 100],
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
              ["/area/map", "map", "แผนที่การระบาด", "ดูจุดผู้ป่วยและ cluster"],
              ["/area/ai", "sparkles", "วิเคราะห์ด้วย AI", "พยากรณ์และข้อเสนอแนะ"],
              ["/area/media", "image", "ผลิตสื่อประชาสัมพันธ์", "สร้างโปสเตอร์/คลิปสั้น"],
              ["/area/broadcast", "megaphone", "แจ้งข่าวหมอพร้อม", "ส่งถึงประชาชนในพื้นที่"],
              ["/area/followup", "heart", "ติดตามพฤติกรรมสุขภาพ", "แบบสำรวจและผลตอบรับ"],
              ["/area/documents", "file", "คลังเอกสาร", "ค้นคืนเอกสารย้อนหลัง"],
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
