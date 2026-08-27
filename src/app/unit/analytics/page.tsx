import { PageHead } from "@/components/DesktopShell";
import { BarChart, Card, Chip, Donut, LineChart, Progress, Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

const AREA_WEEKLY = [
  { w: "W28", cases: 3, median: 2, contacts: 8 },
  { w: "W29", cases: 4, median: 3, contacts: 10 },
  { w: "W30", cases: 5, median: 3, contacts: 12 },
  { w: "W31", cases: 4, median: 3, contacts: 9 },
  { w: "W32", cases: 7, median: 4, contacts: 18 },
  { w: "W33", cases: 9, median: 4, contacts: 23 },
  { w: "W34", cases: 12, median: 5, contacts: 31 },
  { w: "W35", cases: 10, median: 5, contacts: 26 },
];

const VILLAGES = [
  ["ม.4 ต.บางกระทุ่ม", 6, 62.4, 24.1, 3, 92],
  ["ม.2 ต.สนามคลี", 4, 48.1, 18.6, 2, 81],
  ["ม.7 ต.โคกสลุด", 2, 34.2, 12.4, 1, 64],
  ["ม.1 ต.ไผ่ล้อม", 1, 26.8, 9.2, 1, 51],
  ["ม.5 บ้านหนองไผ่", 1, 18.2, 6.0, 0, 33],
  ["ม.9 บ้านดงยาง", 0, 0, 4.2, 0, 18],
];

export default function AreaAnalyticsPage() {
  return (
    <>
      <PageHead
        title="ระบบวิเคราะห์ข้อมูลพื้นที่"
        desc="สรุปสถานการณ์ระบาด แนวโน้ม และผลการดำเนินงานในเขตรับผิดชอบจากข้อมูลเคสและการสอบสวนภาคสนาม"
        actions={
          <>
            <select className="btn btn-sm" defaultValue="28d">
              <option value="7d">7 วัน</option>
              <option value="28d">28 วัน</option>
              <option value="year">ปี 2569</option>
            </select>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกรายงาน
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้ป่วยสะสม 28 วัน" value={14} unit="ราย" icon="hospital" delta={18} />
        <Stat label="เคสที่ยังดำเนินการ" value={5} unit="เคส" icon="clipboard" tone="var(--warn)" />
        <Stat label="สอบสวนภายใน 48 ชม." value="86" unit="%" icon="clock" tone="var(--ok)" />
        <Stat label="พื้นที่เสี่ยงสูง" value={2} unit="หมู่บ้าน" icon="map" tone="var(--danger)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] mb-5">
        <Card
          title="แนวโน้มผู้ป่วยรายสัปดาห์"
          desc="เปรียบเทียบจำนวนผู้ป่วยจริงกับค่ามัธยฐานพื้นที่ย้อนหลัง"
          icon="chart"
          action={
            <Chip bg="#fee2e2" fg="#b91c1c" dot>
              สูงกว่าค่ามัธยฐาน
            </Chip>
          }
        >
          <LineChart
            height={225}
            labels={AREA_WEEKLY.map((item) => item.w)}
            series={[
              { name: "ผู้ป่วยจริง", color: "#dc2626", points: AREA_WEEKLY.map((item) => item.cases) },
              { name: "ค่ามัธยฐานพื้นที่", color: "#94a3b8", points: AREA_WEEKLY.map((item) => item.median) },
            ]}
          />
        </Card>

        <Card title="สัดส่วนโรคในพื้นที่" desc="ผู้ป่วยสะสม 28 วัน" icon="chart">
          <Donut
            size={158}
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
      </div>

      <div className="grid gap-4 xl:grid-cols-2 mb-5">
        <Card
          title="ผู้สัมผัสที่ติดตามรายสัปดาห์"
          desc="จำนวนผู้สัมผัสที่อยู่ระหว่างติดตามอาการ"
          icon="users"
        >
          <BarChart
            height={205}
            data={AREA_WEEKLY}
            keys={["contacts"]}
            labels={["ผู้สัมผัสที่ติดตาม"]}
            colors={["#0d9488"]}
          />
        </Card>

        <Card title="คุณภาพการดำเนินงาน" icon="check" desc="เทียบกับเป้าหมายของหน่วยบริการ">
          <div className="grid gap-4 py-1">
            {[
              ["ความครบถ้วนแบบสอบสวน", 94, 90, "#0d9488"],
              ["สอบสวนภายใน 48 ชั่วโมง", 86, 90, "#f59e0b"],
              ["ทีมตอบรับเคสภายใน 3 ชั่วโมง", 92, 90, "#16a34a"],
              ["ประชาชนตอบแบบติดตาม", 68, 75, "#f59e0b"],
            ].map(([label, value, target, color]) => (
              <div key={String(label)}>
                <div className="flex items-center justify-between gap-3 text-[12.5px] mb-1.5">
                  <span className="text-muted">{label}</span>
                  <span className="font-semibold tabular-nums">
                    {value}% <span className="text-faint font-normal">/ เป้า {target}%</span>
                  </span>
                </div>
                <Progress value={Number(value)} color={String(color)} height={7} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card
        title="ตารางวิเคราะห์รายหมู่บ้าน"
        desc="เรียงตามคะแนนความเสี่ยงจากข้อมูลผู้ป่วยและค่าดัชนีลูกน้ำ"
        icon="db"
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr>
                <th className="th">หมู่บ้าน</th>
                <th className="th">ผู้ป่วย 28 วัน</th>
                <th className="th">อัตราต่อแสน</th>
                <th className="th">HI</th>
                <th className="th">เคสเปิด</th>
                <th className="th">คะแนนเสี่ยง</th>
              </tr>
            </thead>
            <tbody>
              {VILLAGES.map(([village, cases, rate, hi, open, score]) => (
                <tr key={String(village)} className="hover:bg-surface2">
                  <td className="td font-medium">{village}</td>
                  <td className="td tabular-nums font-semibold">{cases}</td>
                  <td className="td tabular-nums">{rate}</td>
                  <td className="td tabular-nums" style={{ color: Number(hi) >= 10 ? "var(--danger)" : undefined }}>
                    {hi}%
                  </td>
                  <td className="td tabular-nums">{open}</td>
                  <td className="td">
                    <div className="flex items-center gap-2.5 min-w-[150px]">
                      <Progress
                        value={Number(score)}
                        color={Number(score) > 75 ? "#dc2626" : Number(score) > 50 ? "#f59e0b" : "#16a34a"}
                      />
                      <span className="text-[11.5px] font-semibold tabular-nums w-6 text-right">{score}</span>
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
