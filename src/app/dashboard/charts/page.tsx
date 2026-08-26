import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, BarChart, LineChart, Donut, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import { WEEKLY, DISTRICT_LOAD } from "@/lib/mock";

/* population pyramid data */
const AGE = [
  { g: "0-4", m: 6, f: 5 },
  { g: "5-9", m: 11, f: 9 },
  { g: "10-14", m: 14, f: 12 },
  { g: "15-24", m: 18, f: 16 },
  { g: "25-34", m: 21, f: 17 },
  { g: "35-44", m: 15, f: 14 },
  { g: "45-54", m: 12, f: 11 },
  { g: "55-64", m: 8, f: 9 },
  { g: "65+", m: 5, f: 7 },
];

export default function Charts() {
  const maxAge = Math.max(...AGE.flatMap((a) => [a.m, a.f]));

  return (
    <>
      <PageHead
        title="ระบบแผนภูมิ"
        desc="ชุดแผนภูมิมาตรฐานงานระบาดวิทยา สร้างจากข้อมูลที่โรงพยาบาลและทีมภาคสนาม Push เข้าระบบ"
        actions={
          <>
            <select className="btn btn-sm" defaultValue="d66">
              <option value="all">ทุกโรค</option>
              <option value="d66">ไข้เลือดออก</option>
              <option value="d71">มือ เท้า ปาก</option>
            </select>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกภาพ
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="plus" size={15} /> สร้างแผนภูมิเอง
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-2 mb-4">
        <Card
          title="Epidemic Curve — จำนวนผู้ป่วยรายสัปดาห์"
          desc="แยกตามกลุ่มโรค (W28–W35 ปี 2569)"
          icon="chart"
        >
          <BarChart
            height={220}
            data={WEEKLY}
            keys={["dengue", "hfmd", "flu", "food"]}
            labels={["ไข้เลือดออก", "มือ เท้า ปาก", "ไข้หวัดใหญ่", "อาหารเป็นพิษ"]}
          />
        </Card>

        <Card
          title="เปรียบเทียบกับค่ามัธยฐาน 5 ปี"
          desc="ไข้เลือดออก · จังหวัดพิษณุโลก"
          icon="chart"
          action={<Chip bg="#fee2e2" fg="#b91c1c" dot>เกินเส้นเตือนภัย</Chip>}
        >
          <LineChart
            height={220}
            labels={WEEKLY.map((w) => w.w)}
            series={[
              { name: "ปี 2569", color: "#dc2626", points: WEEKLY.map((w) => w.dengue) },
              { name: "ปี 2568", color: "#f59e0b", points: [18, 22, 25, 28, 26, 24, 27, 25] },
              { name: "ค่ามัธยฐาน 5 ปี", color: "#94a3b8", points: [14, 16, 18, 20, 22, 24, 26, 25] },
              { name: "เส้นเตือนภัย", color: "#0f172a", points: [30, 30, 30, 30, 30, 30, 30, 30] },
            ]}
          />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 mb-4">
        <Card title="สัดส่วนผู้ป่วยรายโรค" icon="chart">
          <Donut
            size={160}
            center="177"
            centerSub="ราย"
            slices={[
              { label: "ไข้เลือดออก", value: 96, color: "#dc2626" },
              { label: "มือ เท้า ปาก", value: 31, color: "#059669" },
              { label: "ไข้หวัดใหญ่", value: 24, color: "#2563eb" },
              { label: "อาหารเป็นพิษ", value: 15, color: "#d97706" },
              { label: "อื่นๆ", value: 11, color: "#94a3b8" },
            ]}
          />
        </Card>

        <Card
          title="พีระมิดประชากรผู้ป่วย"
          desc="จำแนกตามกลุ่มอายุและเพศ"
          icon="users"
        >
          <div className="grid gap-1.5">
            {AGE.map((a) => (
              <div key={a.g} className="flex items-center gap-1.5">
                <div className="flex-1 flex justify-end">
                  <span
                    className="h-4 rounded-l-[3px]"
                    style={{ width: `${(a.m / maxAge) * 100}%`, background: "#2563eb" }}
                  />
                </div>
                <span className="text-[10.5px] text-muted w-[42px] text-center tabular-nums">
                  {a.g}
                </span>
                <div className="flex-1">
                  <span
                    className="h-4 rounded-r-[3px] block"
                    style={{ width: `${(a.f / maxAge) * 100}%`, background: "#db2777" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span style={{ width: 9, height: 9, borderRadius: 3, background: "#2563eb" }} /> ชาย
            </span>
            <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span style={{ width: 9, height: 9, borderRadius: 3, background: "#db2777" }} /> หญิง
            </span>
          </div>
        </Card>

        <Card title="อัตราป่วยต่อประชากรแสนคน" desc="รายอำเภอ · สะสม 28 วัน" icon="chart">
          <div className="grid gap-2.5">
            {DISTRICT_LOAD.map((d) => (
              <div key={d.d}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-muted truncate">{d.d}</span>
                  <span className="font-semibold tabular-nums shrink-0">{d.rate}</span>
                </div>
                <Progress
                  value={(d.rate / 45) * 100}
                  height={5}
                  color={d.rate > 30 ? "#dc2626" : d.rate > 20 ? "#f59e0b" : "#2563eb"}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2 mb-4">
        <Card
          title="เวลาตอบสนองเฉลี่ยรายอำเภอ"
          desc="ชั่วโมงจากที่โรงพยาบาลแจ้งจนทีมลงพื้นที่"
          icon="clock"
        >
          <BarChart
            height={200}
            colors={["#2563eb", "#93c5fd"]}
            data={DISTRICT_LOAD.slice(0, 7).map((d, i) => ({
              w: d.d.slice(0, 4),
              actual: [2.4, 3.1, 4.6, 5.2, 6.8, 3.9, 4.1][i],
              target: 3,
            }))}
            keys={["actual", "target"]}
            labels={["เวลาจริง (ชม.)", "เป้าหมาย 3 ชม."]}
          />
        </Card>

        <Card
          title="ช่องทางการรายงานเข้าระบบ"
          desc="สัดส่วนเคสตามแหล่งที่มา"
          icon="db"
        >
          <div className="grid gap-3.5 pt-2">
            {[
              ["Push อัตโนมัติจาก HIS โรงพยาบาลรัฐ", 62, "#2563eb"],
              ["Push จากโรงพยาบาลเอกชน", 18, "#7c3aed"],
              ["บันทึกโดยทีมภาคสนาม (Mobile)", 12, "#ea580c"],
              ["รายงานจาก รพ.สต. / อสม.", 6, "#059669"],
              ["ประชาชนแจ้งผ่านหมอพร้อม", 2, "#06c755"],
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

      <Card
        title="ตารางสรุปรายอำเภอ"
        desc="ข้อมูลสะสม 28 วัน · เปรียบเทียบกับช่วงเดียวกันของสัปดาห์ก่อน"
        icon="db"
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr>
                <th className="th">อำเภอ</th>
                <th className="th">ผู้ป่วย</th>
                <th className="th">อัตราต่อแสน</th>
                <th className="th">เปลี่ยนแปลง</th>
                <th className="th">เคสที่ยังไม่ปิด</th>
                <th className="th">ความครบถ้วนข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICT_LOAD.map((d, i) => (
                <tr key={d.d} className="hover:bg-surface2">
                  <td className="td font-medium">{d.d}</td>
                  <td className="td tabular-nums font-semibold">{d.n}</td>
                  <td className="td tabular-nums">{d.rate}</td>
                  <td className="td">
                    <span
                      className="text-[12px] font-semibold tabular-nums"
                      style={{
                        color:
                          d.trend > 0 ? "var(--danger)" : d.trend < 0 ? "var(--ok)" : "var(--muted)",
                      }}
                    >
                      {d.trend > 0 ? "▲" : d.trend < 0 ? "▼" : "—"} {Math.abs(d.trend)}%
                    </span>
                  </td>
                  <td className="td tabular-nums">{[9, 6, 4, 3, 2, 2, 1, 1, 0][i]}</td>
                  <td className="td">
                    <div className="flex items-center gap-2.5 w-[140px]">
                      <Progress value={[96, 92, 88, 94, 81, 90, 86, 78, 95][i]} />
                      <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                        {[96, 92, 88, 94, 81, 90, 86, 78, 95][i]}%
                      </span>
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
