import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, Field } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CASES, severityTone, stageTone } from "@/lib/mock";

export default function FieldDesktop() {
  const incoming = [CASES[0], CASES[7], CASES[3]];
  const mine = CASES.filter((c) => c.stage === "รับเคสแล้ว" || c.stage === "ลงพื้นที่");

  return (
    <>
      <PageHead
        title="ศูนย์ปฏิบัติการเคสสอบสวน (มุมมองเดสก์ท็อป)"
        desc="ระบบเดียวกับแอปมือถือของทีมภาคสนาม · ใช้บนคอมพิวเตอร์ที่สำนักงานเพื่อรับเคส ตรวจงาน และสรุปผลก่อนส่ง"
        actions={
          <>
            <Link href="/field" className="btn btn-sm">
              <Icon name="field" size={15} /> เปิดมุมมองมือถือ
            </Link>
            <button className="btn btn-sm">
              <Icon name="db" size={15} /> ซิงก์ข้อมูลภาคสนาม
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งแบบสอบสวน
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="เคสรอรับ" value={3} unit="เคส" icon="clipboard" tone="var(--danger)" />
        <Stat label="กำลังสอบสวน" value={2} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="เสร็จเดือนนี้" value={14} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="หลักฐานรอซิงก์" value={3} unit="รายการ" icon="db" tone="var(--info)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        {/* case queue */}
        <div className="grid gap-4 content-start">
          <Card
            title="เคสใหม่จากโรงพยาบาล"
            icon="hospital"
            pad={false}
            action={
              <Chip bg="#fee2e2" fg="#b91c1c" dot>
                {incoming.length} รอรับ
              </Chip>
            }
          >
            <ul>
              {incoming.map((c, i) => (
                <li
                  key={c.id + i}
                  className="px-4 py-3.5 border-b border-line-brd last:border-0"
                  style={{ borderLeft: `3px solid ${c.diseaseColor}` }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip bg={`${c.diseaseColor}18`} fg={c.diseaseColor} dot>
                      {c.disease}
                    </Chip>
                    <Chip {...severityTone[c.severity]}>{c.severity}</Chip>
                  </div>
                  <p className="text-[13.5px] font-bold mt-1.5">
                    {c.name} <span className="text-muted font-medium">· {c.age} ปี</span>
                  </p>
                  <p className="text-[11px] text-muted font-mono">{c.id}</p>
                  <p className="text-[11.5px] text-muted mt-1">
                    {c.hospital} · ต.{c.tambon} อ.{c.district}
                  </p>
                  <p className="text-[11px] text-faint mt-0.5">
                    แจ้งเมื่อ {c.reportedAt} · ต้องรับภายใน 3 ชม.
                  </p>
                  <div className="flex gap-2 mt-2.5">
                    <button className="btn btn-sm flex-1">รายละเอียด</button>
                    <button className="btn btn-sm btn-primary flex-1">
                      <Icon name="check" size={13} /> กดรับเคส
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="เคสที่รับแล้ว" icon="clipboard" pad={false}>
            <ul>
              {mine.map((c) => (
                <li key={c.id} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: c.diseaseColor }}
                    />
                    <span className="text-[12.5px] font-semibold flex-1 truncate">{c.name}</span>
                    <Chip {...stageTone[c.stage]}>{c.stage}</Chip>
                  </div>
                  <p className="sub mt-0.5">
                    {c.disease} · ต.{c.tambon}
                  </p>
                  <div className="flex items-center gap-2.5 mt-2">
                    <Progress value={c.progress} height={4} />
                    <span className="text-[11px] font-bold tabular-nums w-8 text-right">
                      {c.progress}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* working area */}
        <div className="grid gap-4">
          <div
            className="card p-4 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ borderLeft: "4px solid var(--accent)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="grid place-items-center rounded-lg"
                style={{ width: 34, height: 34, background: "#dbeafe", color: "#2563eb" }}
              >
                <Icon name="clipboard" size={18} />
              </span>
              <div>
                <p className="text-[13px] font-semibold">PLK-6809-0142 · นายสมชาย ใจดี</p>
                <p className="sub">ไข้เลือดออก · ม.4 ต.บ้านคลอง · ทีม SRRT เมือง-1</p>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] max-w-[300px]">
              <div className="flex justify-between text-[11.5px] mb-1.5">
                <span className="text-muted">ความคืบหน้าแบบสอบสวน</span>
                <span className="font-semibold">40%</span>
              </div>
              <Progress value={40} />
            </div>
            <Chip bg="#fef3c7" fg="#b45309" dot>
              เหลือเวลา 2:47 ชม.
            </Chip>
          </div>

          <Card
            title="แบบสอบสวนภาคสนาม"
            desc="กรอกบนคอมพิวเตอร์ได้เต็มรูปแบบ · ข้อมูลซิงก์กับแอปมือถืออัตโนมัติ"
            icon="clipboard"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ชื่อ–สกุล" value="นายสมชาย ใจดี" source="HIS" />
              <Field label="วันเริ่มป่วย" value="22 ส.ค. 2569" source="HIS" />
              <Field
                label="ที่อยู่ขณะป่วย"
                value="128/4 หมู่ 4 ต.บ้านคลอง อ.เมืองพิษณุโลก"
                source="HIS"
                wide
              />
              <Field label="บ้านที่สำรวจ" value="42 หลัง" source="USER" />
              <Field label="บ้านที่พบลูกน้ำ" value="7 หลัง" source="USER" />
              <Field label="ค่า HI" value="16.7 %" source="USER" />
              <Field label="ค่า CI" value="12.9 %" source="USER" />
              <div className="sm:col-span-2">
                <span className="lbl">บันทึกข้อความ (พิมพ์ text)</span>
                <textarea
                  className="inp min-h-[100px] resize-none"
                  readOnly
                  defaultValue="พบโอ่งน้ำหลังบ้าน 2 ใบไม่มีฝาปิด มีลูกน้ำจำนวนมาก และกองยางรถยนต์เก่าข้างบ้าน 5 เส้น มีน้ำขัง แจ้ง อสม. ในพื้นที่ให้คว่ำภาชนะและใส่ทรายอะเบท นัดพ่นหมอกควันวันที่ 28 ส.ค. 06:00 น."
                />
              </div>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card title="ถ่ายรูป" icon="camera" desc="6 รูปในเคสนี้">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["#7c3f1d", "#c2703c"],
                  ["#1f2937", "#4b5563"],
                  ["#0f766e", "#5eead4"],
                  ["#1e3a8a", "#60a5fa"],
                  ["#525252", "#a3a3a3"],
                  ["#7c2d12", "#fb923c"],
                ].map(([a, b], i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-line-brd">
                    <svg viewBox="0 0 100 100" className="w-full" style={{ aspectRatio: "1/1" }}>
                      <defs>
                        <linearGradient id={`fd${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={a} />
                          <stop offset="100%" stopColor={b} />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill={`url(#fd${i})`} />
                      <circle cx="50" cy="56" r="24" fill="#ffffff18" />
                      <path d="M0 78 q26 -14 50 0 t50 -4 v26 H0Z" fill="#00000033" />
                    </svg>
                  </div>
                ))}
              </div>
              <button className="btn btn-sm w-full mt-3">
                <Icon name="plus" size={14} /> อัปโหลดจากเครื่อง
              </button>
            </Card>

            <Card title="เก็บพิกัด" icon="pin" desc="3 จุดในเคสนี้">
              <div className="rounded-lg overflow-hidden border border-line-brd mb-3">
                <svg viewBox="0 0 200 120" className="w-full" style={{ background: "#eaf0f2" }}>
                  {[
                    [8, 10, 56, 40],
                    [76, 6, 50, 34],
                    [140, 14, 52, 42],
                    [10, 68, 54, 40],
                    [78, 60, 52, 48],
                    [142, 70, 50, 38],
                  ].map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="2.5" fill="#dfe7ea" />
                  ))}
                  <path d="M70 0 V120" stroke="#fff" strokeWidth="6" />
                  <path d="M0 56 H200" stroke="#fff" strokeWidth="6" />
                  <circle cx="100" cy="58" r="34" fill="#dc262614" stroke="#dc2626" strokeDasharray="4 3" />
                  <circle cx="100" cy="58" r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
                  <circle cx="122" cy="42" r="4" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="82" cy="76" r="4" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </div>
              {[
                ["บ้านผู้ป่วยดัชนี", "16.82110, 100.26590"],
                ["แหล่งเพาะพันธุ์ 1", "16.82126, 100.26612"],
                ["แหล่งเพาะพันธุ์ 2", "16.82098, 100.26551"],
              ].map(([n, ll]) => (
                <div key={n} className="py-1.5 border-b border-line-brd last:border-0">
                  <p className="text-[12px] font-medium">{n}</p>
                  <p className="text-[10.5px] text-faint font-mono">{ll}</p>
                </div>
              ))}
            </Card>

            <Card title="อัดเสียง" icon="mic" desc="3 คลิปในเคสนี้">
              {[
                ["สัมภาษณ์ญาติผู้ป่วย", "04:12", true],
                ["บันทึกสภาพแวดล้อม", "01:58", true],
                ["สอบถาม อสม.", "02:35", false],
              ].map(([n, len, done]) => (
                <div
                  key={String(n)}
                  className="flex items-center gap-2.5 py-2.5 border-b border-line-brd last:border-0"
                >
                  <button
                    className="grid place-items-center w-8 h-8 rounded-full text-white shrink-0"
                    style={{ background: "var(--accent)" }}
                  >
                    <Icon name="wave" size={15} />
                  </button>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-medium truncate">{n}</span>
                    <span className="block text-[10.5px] text-faint">{len} นาที</span>
                  </span>
                  {done ? (
                    <Chip bg="#dcfce7" fg="#15803d">
                      ถอดความ
                    </Chip>
                  ) : (
                    <Chip bg="#fef3c7" fg="#b45309">
                      รอซิงก์
                    </Chip>
                  )}
                </div>
              ))}
              <button className="btn btn-sm w-full mt-3">
                <Icon name="mic" size={14} /> อัดเสียงจากไมค์คอมพิวเตอร์
              </button>
            </Card>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="btn">บันทึกร่าง</button>
            <button className="btn btn-primary">
              <Icon name="send" size={16} /> ส่งแบบสอบสวนเข้าระบบกลาง
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
