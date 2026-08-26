import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, LineChart, PlkMap, Legend, Donut } from "@/components/ui";
import { Icon } from "@/components/icons";
import { WEEKLY, DISTRICT_LOAD, CASES, stageTone, severityTone, HOSPITALS } from "@/lib/mock";

const VALUES = Object.fromEntries(DISTRICT_LOAD.map((d) => [d.d, d.n]));

export default function DashboardHome() {
  return (
    <>
      <PageHead
        title="ภาพรวมสถานการณ์โรคติดต่อ จังหวัดพิษณุโลก"
        desc="ข้อมูลรวมจาก 9 อำเภอ · 15 โรงพยาบาลรัฐและเอกชน · อัปเดตอัตโนมัติทุก 5 นาที"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ช่วงเวลา: 28 วัน
            </button>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> รายงาน SAT
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="bell" size={15} /> ประกาศเตือนภัย
            </button>
          </>
        }
      />

      {/* alert bar */}
      <div
        className="card p-4 mb-5 flex flex-wrap items-center gap-3"
        style={{ background: "#fef2f2", borderColor: "#fecaca" }}
      >
        <span
          className="grid place-items-center rounded-lg text-white shrink-0"
          style={{ width: 32, height: 32, background: "#dc2626" }}
        >
          <Icon name="bell" size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold" style={{ color: "#991b1b" }}>
            เตือนภัยระดับ 2 — ไข้เลือดออก อ.เมืองพิษณุโลก และ อ.วังทอง
          </p>
          <p className="text-[12px]" style={{ color: "#b91c1c" }}>
            จำนวนผู้ป่วยเกินเส้นเตือนภัย (30 ราย/สัปดาห์) ต่อเนื่อง 3 สัปดาห์ — เข้าเงื่อนไขกติกา R-002
          </p>
        </div>
        <Link href="/dashboard/decision" className="btn btn-sm">
          ดูข้อเสนอมาตรการ
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-5">
        <Stat label="ผู้ป่วยสะสมทั้งจังหวัด" value={177} unit="ราย" icon="hospital" delta={14} />
        <Stat label="เคสที่กำลังสอบสวน" value={23} unit="เคส" icon="clipboard" tone="var(--warn)" />
        <Stat label="เคสค้างเกิน 48 ชม." value={4} unit="เคส" icon="clock" tone="var(--danger)" />
        <Stat label="เสียชีวิต" value={1} unit="ราย" icon="heart" tone="var(--danger)" />
        <Stat label="ความครบถ้วนข้อมูล" value="92.4" unit="%" icon="db" tone="var(--ok)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card
          className="xl:col-span-2"
          title="แนวโน้มผู้ป่วยรายสัปดาห์ แยกกลุ่มโรค"
          desc="เปรียบเทียบกับเส้นเตือนภัยของจังหวัด"
          icon="chart"
          action={
            <Link href="/dashboard/charts" className="btn btn-sm">
              ดูแผนภูมิทั้งหมด
            </Link>
          }
        >
          <LineChart
            height={230}
            labels={WEEKLY.map((w) => w.w)}
            series={[
              { name: "ไข้เลือดออก", color: "#dc2626", points: WEEKLY.map((w) => w.dengue) },
              { name: "มือ เท้า ปาก", color: "#059669", points: WEEKLY.map((w) => w.hfmd) },
              { name: "ไข้หวัดใหญ่", color: "#2563eb", points: WEEKLY.map((w) => w.flu) },
              { name: "อาหารเป็นพิษ", color: "#d97706", points: WEEKLY.map((w) => w.food) },
            ]}
          />
        </Card>

        <Card
          title="แผนที่ความหนาแน่นรายอำเภอ"
          icon="map"
          desc="จำนวนผู้ป่วยสะสม 28 วัน"
          action={
            <Link href="/dashboard/map" className="btn btn-sm">
              เปิดเต็ม
            </Link>
          }
        >
          <PlkMap values={VALUES} scaleFrom="#dbeafe" scaleTo="#b91c1c" height={300} />
          <Legend
            items={[
              { label: "0–10", color: "#dbeafe" },
              { label: "11–25", color: "#f59e0b" },
              { label: "26–40", color: "#ea580c" },
              { label: "40+", color: "#b91c1c" },
            ]}
          />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card title="สถานะเคสทั้งจังหวัด" icon="clipboard">
          <Donut
            size={150}
            center="177"
            centerSub="เคสทั้งหมด"
            slices={[
              { label: "ปิดเคสแล้ว", value: 128, color: "#16a34a" },
              { label: "สอบสวนเสร็จ รอปิด", value: 22, color: "#7c3aed" },
              { label: "ลงพื้นที่", value: 15, color: "#f59e0b" },
              { label: "รับเคสแล้ว", value: 8, color: "#2563eb" },
              { label: "รอรับเคส", value: 4, color: "#94a3b8" },
            ]}
          />
        </Card>

        <Card
          title="ความเร็วในการตอบสนอง"
          desc="เทียบกับมาตรฐาน: รับเคตภายใน 3 ชม. · สอบสวนเสร็จภายใน 48 ชม."
          icon="clock"
        >
          <div className="grid gap-3.5">
            {[
              ["รับเคสภายใน 3 ชม.", 87, "#16a34a"],
              ["ลงพื้นที่ภายใน 24 ชม.", 74, "#f59e0b"],
              ["สอบสวนเสร็จภายใน 48 ชม.", 68, "#f59e0b"],
              ["Push ข้อมูลครบถ้วน", 92, "#16a34a"],
              ["รับทราบ Flex ภายใน 30 นาที", 82, "#16a34a"],
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

        <Card title="โรงพยาบาลที่รายงานเข้าระบบ" icon="hospital" pad={false}>
          <ul className="max-h-[300px] overflow-y-auto nice">
            {HOSPITALS.map((h) => (
              <li
                key={h.name}
                className="flex items-center gap-2.5 px-4 py-2.5 border-b border-line-brd last:border-0"
              >
                <span
                  className="grid place-items-center rounded-lg shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    background: h.type === "เอกชน" ? "#ede9fe" : "#dbeafe",
                    color: h.type === "เอกชน" ? "#6d28d9" : "#1d4ed8",
                  }}
                >
                  <Icon name="hospital" size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-medium truncate">{h.name}</span>
                  <span className="block text-[11px] text-muted">{h.type}</span>
                </span>
                <span className="text-[12.5px] font-bold tabular-nums">{h.cases}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card
        title="เคสล่าสุดที่เข้าระบบ"
        desc="เรียงตามเวลาที่โรงพยาบาล Push ข้อมูลเข้า Dashboard"
        icon="db"
        pad={false}
        action={
          <Link href="/dashboard/cases" className="btn btn-sm">
            ดูทั้งหมด
          </Link>
        }
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="th">รหัสเคส</th>
                <th className="th">ผู้ป่วย</th>
                <th className="th">โรค</th>
                <th className="th">โรงพยาบาล</th>
                <th className="th">อำเภอ</th>
                <th className="th">ระดับ</th>
                <th className="th">สถานะ</th>
                <th className="th w-[160px]">ความก้าวหน้า</th>
              </tr>
            </thead>
            <tbody>
              {CASES.map((c) => (
                <tr key={c.id} className="hover:bg-surface2">
                  <td className="td font-mono text-[12px]">{c.id}</td>
                  <td className="td">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-[11px] text-muted">
                      {c.age} ปี · {c.sex}
                    </div>
                  </td>
                  <td className="td">
                    <Chip bg={`${c.diseaseColor}18`} fg={c.diseaseColor} dot>
                      {c.disease}
                    </Chip>
                  </td>
                  <td className="td text-muted">{c.hospital}</td>
                  <td className="td text-muted">{c.district}</td>
                  <td className="td">
                    <Chip {...severityTone[c.severity]}>{c.severity}</Chip>
                  </td>
                  <td className="td">
                    <Chip {...stageTone[c.stage]}>{c.stage}</Chip>
                  </td>
                  <td className="td">
                    <div className="flex items-center gap-2.5">
                      <Progress value={c.progress} />
                      <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                        {c.progress}%
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
