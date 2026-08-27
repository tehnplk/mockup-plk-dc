import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, BarChart, Donut } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CASES, WEEKLY, severityTone, stageTone } from "@/lib/mock";

export default function HospitalOverview() {
  return (
    <>
      <PageHead
        title="ภาพรวมงานสอบสวนโรค"
        desc="ข้อมูล ณ 27 ส.ค. 2569 เวลา 09:41 น. · เชื่อมต่อ HIS: HOSxP XE (ปกติ)"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ช่วงเวลา: วันนี้
            </button>
            <Link href="/hos/new" className="btn btn-primary btn-sm">
              <Icon name="plus" size={15} /> เปิดเคสสอบสวนใหม่
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้ป่วยเข้าเกณฑ์สอบสวนวันนี้" value={12} unit="ราย" icon="hospital" delta={18} />
        <Stat label="ยังไม่เปิดแบบสอบสวน" value={3} unit="ราย" icon="clipboard" tone="var(--danger)" />
        <Stat label="Push เข้า Dashboard แล้ว" value={9} unit="เคส" icon="db" tone="var(--ok)" />
        <Stat label="แจ้งทีมผ่านหมอพร้อม" value={7} unit="ครั้ง" icon="send" tone="var(--info)" />
      </div>

      <Link
        href="/hos/his-list"
        className="card p-4 mb-5 flex flex-wrap items-center gap-3 hover:bg-surface2 transition-colors"
        style={{ borderLeft: "4px solid var(--ok)" }}
      >
        <span
          className="grid place-items-center rounded-lg text-white shrink-0"
          style={{ width: 34, height: 34, background: "var(--ok)" }}
        >
          <Icon name="sparkles" size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold flex items-center gap-2 flex-wrap">
            Agent เฝ้าระวังรหัสวินิจฉัย ICD-10 กำลังทำงาน
            <Chip bg="#dcfce7" fg="#15803d" dot>
              ONLINE
            </Chip>
          </p>
          <p className="sub">
            เฝ้าระวัง 16 รหัส · แจ้งเตือนวันนี้ 12 ครั้ง · ยังไม่เปิดแบบสอบสวน 3 เคส
          </p>
        </div>
        <span className="btn btn-sm">
          จัดการรายการคัดเข้า <Icon name="arrowRight" size={14} />
        </span>
      </Link>

      <div className="grid gap-4 xl:grid-cols-3 mb-5">
        <Card
          className="xl:col-span-2"
          title="ผู้ป่วยเข้าเกณฑ์เฝ้าระวัง (ดึงจาก HIS อัตโนมัติ)"
          desc="ระบบอ่าน ICD-10 + ผลแล็บ จาก HIS ทุก 5 นาที แล้วคัดกรองตามนิยามโรค"
          icon="db"
          pad={false}
          action={<Chip bg="#dcfce7" fg="#15803d" dot>ซิงก์ล่าสุด 2 นาทีที่แล้ว</Chip>}
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr>
                  <th className="th">HN / ผู้ป่วย</th>
                  <th className="th">โรคที่สงสัย</th>
                  <th className="th">พื้นที่</th>
                  <th className="th">เวลารายงาน</th>
                  <th className="th">ระดับ</th>
                  <th className="th"></th>
                </tr>
              </thead>
              <tbody>
                {CASES.slice(0, 6).map((c) => (
                  <tr key={c.id} className="hover:bg-surface2">
                    <td className="td">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-[11.5px] text-muted tabular-nums">
                        HN {c.hn} · {c.age} ปี · {c.sex}
                      </div>
                    </td>
                    <td className="td">
                      <Chip bg={`${c.diseaseColor}18`} fg={c.diseaseColor} dot>
                        {c.disease}
                      </Chip>
                    </td>
                    <td className="td text-muted">
                      ต.{c.tambon}
                      <br />
                      <span className="text-[11.5px]">อ.{c.district}</span>
                    </td>
                    <td className="td text-muted tabular-nums">{c.reportedAt}</td>
                    <td className="td">
                      <Chip {...severityTone[c.severity]}>{c.severity}</Chip>
                    </td>
                    <td className="td text-right">
                      <Link href="/hos/case" className="btn btn-sm btn-primary">
                        เปิดแบบสอบสวน
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="สถานะเคสของโรงพยาบาล" icon="chart">
            <Donut
              size={140}
              center="24"
              centerSub="เคสเดือนนี้"
              slices={[
                { label: "ปิดเคสแล้ว", value: 11, color: "#0d9488" },
                { label: "อยู่ระหว่างสอบสวน", value: 8, color: "#f59e0b" },
                { label: "รอทีมรับเคส", value: 3, color: "#94a3b8" },
                { label: "ส่งต่อจังหวัด", value: 2, color: "#7c3aed" },
              ]}
            />
          </Card>

          <Card title="ขั้นตอนงานวันนี้" icon="clipboard">
            <ul className="grid gap-3.5">
              {[
                ["ดึงข้อมูลจาก HIS", 100],
                ["เติมข้อมูลส่วนที่ขาด", 72],
                ["สรุปสนทนา Voice→Text", 55],
                ["แนบเอกสาร/ผลแล็บ", 40],
                ["Push เข้า Dashboard กลาง", 75],
              ].map(([l, v]) => (
                <li key={String(l)}>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="text-muted">{l}</span>
                    <span className="font-semibold tabular-nums">{v}%</span>
                  </div>
                  <Progress value={Number(v)} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="จำนวนเคสรายสัปดาห์ แยกตามกลุ่มโรค"
          desc="เฉพาะเคสที่รายงานจากโรงพยาบาลแห่งนี้"
          icon="chart"
        >
          <BarChart
            data={WEEKLY}
            keys={["dengue", "hfmd", "flu", "food"]}
            labels={["ไข้เลือดออก", "มือเท้าปาก", "ไข้หวัดใหญ่", "อาหารเป็นพิษ"]}
          />
        </Card>

        <Card title="กิจกรรมล่าสุด" icon="clock">
          <ol className="relative pl-5">
            <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line-brd" />
            {[
              ["09:12", "ส่ง Flex Message แจ้งทีม SRRT บางกระทุ่ม 5 คน", "send"],
              ["08:47", "Push เคส PLK-6809-0142 เข้า Dashboard กลาง", "db"],
              ["08:31", "AI สรุปบทสนทนาผู้ป่วย HN 0045218 เสร็จสิ้น", "sparkles"],
              ["08:14", "HIS แจ้งผู้ป่วยเข้าเกณฑ์ไข้เลือดออก 1 ราย", "hospital"],
              ["07:58", "แนบผลตรวจ NS1 เข้าคลังเอกสาร", "file"],
            ].map(([t, txt, ic]) => (
              <li key={String(t)} className="relative pb-4 last:pb-0">
                <span
                  className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 border-white"
                  style={{ background: "var(--accent)" }}
                />
                <div className="flex items-start gap-2">
                  <span className="text-faint mt-0.5">
                    <Icon name={ic as "send"} size={14} />
                  </span>
                  <div>
                    <p className="text-[12.5px] leading-snug">{txt}</p>
                    <p className="text-[11px] text-faint tabular-nums mt-0.5">{t} น.</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card
        className="mt-5"
        title="ทะเบียนแจ้งเคสล่าสุด"
        desc="ติดตามการตอบกลับและสถานะจากทีมสอบสวนแบบเรียลไทม์"
        icon="field"
        action={
          <Link href="/hos/registry" className="btn btn-sm">
            ดูทะเบียนทั้งหมด <Icon name="arrowRight" size={14} />
          </Link>
        }
        pad={false}
      >
        <div className="scroll-x nice">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="th">รหัสเคส</th>
                <th className="th">ผู้ป่วย</th>
                <th className="th">ทีมที่รับ</th>
                <th className="th">สถานะ</th>
                <th className="th w-[200px]">ความก้าวหน้า</th>
              </tr>
            </thead>
            <tbody>
              {CASES.slice(1, 6).map((c) => (
                <tr key={c.id} className="hover:bg-surface2">
                  <td className="td font-mono text-[12px]">{c.id}</td>
                  <td className="td">{c.name}</td>
                  <td className="td text-muted">{c.team}</td>
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
