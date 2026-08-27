import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, Donut, LineChart } from "@/components/ui";
import { Icon } from "@/components/icons";

export default function Decision() {
  return (
    <>
      <PageHead
        title="ข้อมูลสนับสนุนการตัดสินใจ"
        desc="สรุปสถานการณ์ ทางเลือกมาตรการ และทรัพยากรที่มี เพื่อประกอบการตัดสินใจของผู้บริหาร สสจ."
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ออกวาระประชุม EOC
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="check" size={15} /> อนุมัติมาตรการที่เลือก
            </button>
          </>
        }
      />

      {/* situation banner */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] mb-5">
        <div
          className="card p-5"
          style={{ background: "linear-gradient(120deg,#eff6ff,#f8fafc)", borderColor: "#bfdbfe" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="grid place-items-center rounded-lg text-white shrink-0"
              style={{ width: 30, height: 30, background: "var(--accent)" }}
            >
              <Icon name="sparkles" size={16} />
            </span>
            <h2 className="text-[15px] font-bold">สรุปสถานการณ์เพื่อการตัดสินใจ</h2>
            <Chip bg="#fee2e2" fg="#b91c1c">
              เตือนภัยระดับ 2
            </Chip>
          </div>
          <p className="text-[13.5px] leading-relaxed">
            จังหวัดพิษณุโลกมีผู้ป่วยไข้เลือดออกสะสม 177 ราย เพิ่มขึ้น 14% จากสัปดาห์ก่อน
            โดย <strong>อ.เมืองพิษณุโลก (58 ราย)</strong> และ <strong>อ.วังทอง (31 ราย)</strong>{" "}
            เกินเส้นเตือนภัยต่อเนื่อง 3 สัปดาห์ เข้าเงื่อนไขกติกา R-002
            หากไม่ยกระดับมาตรการ คาดว่าอีก 4 สัปดาห์จะมีผู้ป่วยสะสมเพิ่มอีก 96–134 ราย
            และมีโอกาสเสียชีวิตเพิ่ม 1–2 ราย ทรัพยากรที่มีอยู่ยังรองรับได้
            แต่เครื่องพ่นหมอกควันเหลือใช้งานได้เพียง 68%
          </p>
          <div className="flex flex-wrap gap-2 mt-3.5">
            {[
              "ข้อมูล ณ 27 ส.ค. 2569 09:41",
              "แหล่งข้อมูล: 15 โรงพยาบาล + 148 รพ.สต.",
              "ความเชื่อมั่นโมเดล 87%",
            ].map((t) => (
              <Chip key={t} bg="#dbeafe" fg="#1d4ed8">
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <Stat label="ระดับความเสี่ยงจังหวัด" value="ระดับ 2" unit="จาก 4 ระดับ" icon="shield" tone="var(--danger)" />
          <Stat label="อำเภอที่เกินเส้นเตือนภัย" value={2} unit="/ 9 อำเภอ" icon="map" tone="var(--warn)" />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px] mb-5">
        <Card
          title="เปรียบเทียบทางเลือกมาตรการ"
          desc="ผลลัพธ์ที่คาดการณ์จากแบบจำลอง เมื่อเริ่มดำเนินการภายใน 3 วัน"
          icon="sparkles"
          pad={false}
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[860px]">
              <thead>
                <tr>
                  <th className="th">ทางเลือก</th>
                  <th className="th">ผู้ป่วยที่ลดได้ (4 สัปดาห์)</th>
                  <th className="th">งบประมาณ</th>
                  <th className="th">กำลังคน</th>
                  <th className="th">ระยะเวลา</th>
                  <th className="th">คะแนนความคุ้มค่า</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A. เฝ้าระวังตามปกติ (ไม่ยกระดับ)", "0 ราย", "—", "ปกติ", "—", 18],
                  ["B. รณรงค์กำจัดลูกน้ำเข้มข้น 2 อำเภอ", "38–52 ราย", "480,000 บาท", "180 คน", "14 วัน", 88],
                  ["C. พ่นหมอกควันครอบคลุมทุก cluster", "44–60 ราย", "1,240,000 บาท", "96 คน", "10 วัน", 71],
                  ["D. ยกระดับเปิดวอร์รูม EOC ระดับจังหวัด", "62–84 ราย", "2,150,000 บาท", "310 คน", "30 วัน", 76],
                  ["E. มาตรการผสม B + C เฉพาะพื้นที่แดง", "56–74 ราย", "890,000 บาท", "220 คน", "14 วัน", 94],
                ].map(([n, r, b, p, t, s], i) => (
                  <tr
                    key={String(n)}
                    className="hover:bg-surface2"
                    style={{ background: i === 4 ? "#f0fdf4" : undefined }}
                  >
                    <td className="td font-medium">
                      <div className="flex items-center gap-2">
                        {i === 4 && (
                          <Chip bg="#dcfce7" fg="#15803d">
                            แนะนำ
                          </Chip>
                        )}
                        {n}
                      </div>
                    </td>
                    <td className="td font-semibold">{r}</td>
                    <td className="td tabular-nums text-muted">{b}</td>
                    <td className="td tabular-nums text-muted">{p}</td>
                    <td className="td text-muted">{t}</td>
                    <td className="td">
                      <div className="flex items-center gap-2.5 w-[130px]">
                        <Progress
                          value={Number(s)}
                          color={Number(s) >= 85 ? "#16a34a" : Number(s) >= 60 ? "#f59e0b" : "#dc2626"}
                        />
                        <span className="text-[11.5px] font-bold tabular-nums w-6 text-right">{s}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="ผลพยากรณ์ตามทางเลือก"
          desc="จำนวนผู้ป่วยสะสมรายสัปดาห์"
          icon="chart"
        >
          <LineChart
            height={220}
            labels={["W35", "W36", "W37", "W38", "W39", "W40"]}
            series={[
              { name: "A. ไม่ยกระดับ", color: "#dc2626", points: [41, 52, 64, 78, 86, 92] },
              { name: "B. รณรงค์ลูกน้ำ", color: "#f59e0b", points: [41, 46, 48, 44, 38, 32] },
              { name: "E. มาตรการผสม", color: "#16a34a", points: [41, 44, 41, 33, 26, 19] },
            ]}
          />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card
          title="ทรัพยากรที่พร้อมใช้งาน"
          icon="db"
          action={
            <Link href="/dashboard/resources" className="btn btn-sm">
              จัดสรร
            </Link>
          }
        >
          <div className="grid gap-3.5">
            {[
              ["ทีมสอบสวนควบคุมโรค", "18 / 24 ทีม", 75, "#16a34a"],
              ["เครื่องพ่นหมอกควัน", "34 / 50 เครื่อง", 68, "#f59e0b"],
              ["ทรายอะเบท", "1,240 / 2,000 กก.", 62, "#f59e0b"],
              ["น้ำยาเคมีพ่นยุง", "180 / 400 ลิตร", 45, "#dc2626"],
              ["ชุดตรวจ NS1", "820 / 1,000 ชุด", 82, "#16a34a"],
              ["งบประมาณคงเหลือ", "3.8 / 8.0 ล้านบาท", 47, "#f59e0b"],
            ].map(([l, v, p, c]) => (
              <div key={String(l)}>
                <div className="flex justify-between text-[12.5px] mb-1.5">
                  <span className="text-muted">{l}</span>
                  <span className="font-semibold tabular-nums">{v}</span>
                </div>
                <Progress value={Number(p)} color={String(c)} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="ผลกระทบด้านบริการสุขภาพ" icon="hospital">
          <Donut
            size={140}
            center="86%"
            centerSub="เตียงที่ใช้"
            slices={[
              { label: "ผู้ป่วยไข้เลือดออก", value: 34, color: "#dc2626" },
              { label: "ผู้ป่วยอื่นๆ", value: 52, color: "#2563eb" },
              { label: "เตียงว่าง", value: 14, color: "#e2e8f0" },
            ]}
          />
          <div className="mt-4 rounded-xl p-3" style={{ background: "#fef2f2" }}>
            <p className="text-[12px]" style={{ color: "#b91c1c" }}>
              รพ.พุทธชินราช อัตราครองเตียงอายุรกรรม 94% — ควรเตรียมแผนรองรับผู้ป่วยเพิ่ม
            </p>
          </div>
        </Card>

        <Card title="ประเด็นที่ต้องตัดสินใจวันนี้" icon="clipboard">
          <div className="grid gap-2.5">
            {[
              ["อนุมัติงบกลางรณรงค์ 890,000 บาท", "รอผู้บริหาร", "#fef3c7", "#b45309"],
              ["ประกาศพื้นที่ควบคุมโรคเพิ่ม 2 พื้นที่", "รอผู้บริหาร", "#fef3c7", "#b45309"],
              ["ขอสนับสนุนน้ำยาพ่นจาก สคร.2", "รอตอบกลับ", "#dbeafe", "#1d4ed8"],
              ["เปิดวอร์รูม EOC ระดับจังหวัด", "ยังไม่พิจารณา", "#f1f5f9", "#475569"],
              ["ขยายเวลาปฏิบัติงานทีมภาคสนาม", "อนุมัติแล้ว", "#dcfce7", "#15803d"],
            ].map(([t, s, bg, fg]) => (
              <div key={String(t)} className="rounded-xl border border-line-brd p-3">
                <p className="text-[12.5px] font-medium leading-snug">{t}</p>
                <div className="mt-1.5">
                  <Chip bg={String(bg)} fg={String(fg)}>
                    {s}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card
        title="ตัวชี้วัดสำคัญของจังหวัด (KPI)"
        desc="เทียบกับเป้าหมายปีงบประมาณ 2569"
        icon="chart"
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr>
                <th className="th">ตัวชี้วัด</th>
                <th className="th">ค่าปัจจุบัน</th>
                <th className="th">เป้าหมาย</th>
                <th className="th">สถานะ</th>
                <th className="th w-[180px]">ความคืบหน้า</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["อัตราป่วยไข้เลือดออกต่อประชากรแสนคน", "20.4", "≤ 25", "ผ่าน", "#dcfce7", "#15803d", 82],
                ["อัตราป่วยตายไข้เลือดออก", "0.56%", "≤ 0.10%", "ไม่ผ่าน", "#fee2e2", "#b91c1c", 34],
                ["ค่าดัชนีลูกน้ำ HI ในชุมชน", "14.2%", "≤ 10%", "ไม่ผ่าน", "#fee2e2", "#b91c1c", 58],
                ["สอบสวนเคสภายใน 24 ชม.", "74%", "≥ 80%", "เกือบผ่าน", "#fef3c7", "#b45309", 92],
                ["ความครบถ้วนของข้อมูลรายงาน", "92.4%", "≥ 90%", "ผ่าน", "#dcfce7", "#15803d", 100],
                ["ครัวเรือนที่ได้รับข่าวสารป้องกันโรค", "68%", "≥ 70%", "เกือบผ่าน", "#fef3c7", "#b45309", 97],
              ].map(([n, v, t, s, bg, fg, p]) => (
                <tr key={String(n)} className="hover:bg-surface2">
                  <td className="td font-medium">{n}</td>
                  <td className="td font-semibold tabular-nums">{v}</td>
                  <td className="td text-muted tabular-nums">{t}</td>
                  <td className="td">
                    <Chip bg={String(bg)} fg={String(fg)}>
                      {s}
                    </Chip>
                  </td>
                  <td className="td">
                    <div className="flex items-center gap-2.5">
                      <Progress value={Number(p)} color={String(fg)} />
                      <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                        {p}%
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
