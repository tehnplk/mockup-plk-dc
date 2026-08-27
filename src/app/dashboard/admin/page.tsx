import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Avatar } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISEASES } from "@/lib/mock";

const RULES = [
  {
    id: "R-001",
    n: "เคสโรคติดต่ออันตรายต้องรับภายใน 3 ชั่วโมง",
    when: "โรค ∈ {ไข้เลือดออก, อหิวาตกโรค, หัด} และ ระดับ = เร่งด่วน",
    then: "ส่ง Flex ทันที + นับถอยหลัง 3 ชม. + แจ้งซ้ำทุก 60 นาทีถ้ายังไม่รับ",
    on: true,
    hits: 142,
  },
  {
    id: "R-002",
    n: "ประกาศเตือนภัยเมื่อเกินเส้นเตือนภัยรายอำเภอ",
    when: "ผู้ป่วยรายสัปดาห์ ≥ 30 ราย ต่อเนื่อง ≥ 3 สัปดาห์",
    then: "ยกระดับเตือนภัยเป็นระดับ 2 + แจ้งผู้บริหาร สสจ. + เปิดวอร์รูม",
    on: true,
    hits: 4,
  },
  {
    id: "R-003",
    n: "เคสค้างเกิน 48 ชั่วโมงต้องรายงานหัวหน้ากลุ่มงาน",
    when: "สถานะ ≠ ปิดเคส และ เวลาผ่านไป > 48 ชม.",
    then: "แจ้งหัวหน้าทีม + หัวหน้ากลุ่มงานควบคุมโรค + ขึ้นแดงบน Dashboard",
    on: true,
    hits: 27,
  },
  {
    id: "R-004",
    n: "ตรวจสอบความครบถ้วนก่อนรับข้อมูลจากโรงพยาบาล",
    when: "Push จาก HIS แต่ขาดช่องบังคับ (พิกัด/วันเริ่มป่วย/ผลแล็บ)",
    then: "ปฏิเสธการรับข้อมูล + ส่งรายการช่องที่ขาดกลับโรงพยาบาล",
    on: true,
    hits: 63,
  },
  {
    id: "R-005",
    n: "แจ้งข่าวประชาชนอัตโนมัติเมื่อพบ cluster",
    when: "ผู้ป่วยโรคเดียวกัน ≥ 3 ราย ในรัศมี 200 ม. ภายใน 14 วัน",
    then: "แจ้งหน่วยบริการพื้นที่ให้ส่งข่าวหมอพร้อมในรัศมี 500 ม.",
    on: false,
    hits: 11,
  },
];

const ROLES = [
  ["ผู้บริหาร สสจ.", 6, "ดูข้อมูลทั้งจังหวัด · อนุมัติประกาศเตือนภัย"],
  ["กลุ่มงานควบคุมโรค", 12, "จัดการเคส · กำหนดกติกา · ออกรายงาน"],
  ["โรงพยาบาล (รัฐ)", 84, "แจ้งเคส · Push ข้อมูล · ดูเฉพาะเคสของตน"],
  ["โรงพยาบาล (เอกชน)", 31, "แจ้งเคส · Push ข้อมูล · ดูเฉพาะเคสของตน"],
  ["หน่วยบริการพื้นที่", 46, "ดูข้อมูลในอำเภอ · แจ้งข่าว · ผลิตสื่อ"],
  ["ทีมภาคสนาม (Mobile)", 128, "รับเคส · บันทึกสอบสวน · แนบหลักฐาน"],
];

export default function Admin() {
  return (
    <>
      <PageHead
        title="ระบบกำหนดกติกาด้วย Admin"
        desc="ตั้งกฎการทำงานอัตโนมัติ นิยามโรค มาตรฐานเวลา และสิทธิ์ผู้ใช้งานของทั้งจังหวัด"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการแก้ไข
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="plus" size={15} /> สร้างกติกาใหม่
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="กติกาที่เปิดใช้งาน" value="18" unit="/ 24 ข้อ" icon="settings" />
        <Stat label="ทริกเกอร์เดือนนี้" value="247" unit="ครั้ง" icon="sparkles" />
        <Stat label="ผู้ใช้งานในระบบ" value="307" unit="บัญชี" icon="users" />
        <Stat label="หน่วยงานที่เชื่อมต่อ" value="42" unit="แห่ง" icon="hospital" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="กติกาการทำงานอัตโนมัติ (Rule Engine)"
            desc="เงื่อนไข → การกระทำ · ระบบตรวจสอบทุกครั้งที่มีข้อมูลเข้า"
            icon="settings"
          >
            <div className="grid gap-3">
              {RULES.map((r) => (
                <article key={r.id} className="rounded-xl border border-line-brd overflow-hidden">
                  <header className="flex items-center gap-2.5 px-3.5 py-3 bg-surface2">
                    <span className="font-mono text-[11.5px] font-bold text-muted">{r.id}</span>
                    <span className="text-[13px] font-semibold flex-1 leading-snug">{r.n}</span>
                    <Chip bg="#f1f5f9" fg="#475569">
                      ทำงาน {r.hits} ครั้ง
                    </Chip>
                    <span
                      className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                      style={{
                        background: r.on ? "var(--accent)" : "#cbd5e1",
                        justifyContent: r.on ? "flex-end" : "flex-start",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full bg-white" />
                    </span>
                  </header>
                  <div className="p-3.5 grid gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <Chip bg="#dbeafe" fg="#1d4ed8">
                        เมื่อ
                      </Chip>
                      <p className="text-[12.5px] leading-relaxed flex-1">{r.when}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Chip bg="#dcfce7" fg="#15803d">
                        ให้
                      </Chip>
                      <p className="text-[12.5px] leading-relaxed flex-1">{r.then}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card
            title="มาตรฐานเวลาการทำงาน (SLA)"
            desc="ใช้คำนวณนาฬิกานับถอยหลังและเคสที่เกินกำหนด"
            icon="clock"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[620px]">
                <thead>
                  <tr>
                    <th className="th">ขั้นตอน</th>
                    <th className="th">โรคติดต่ออันตราย</th>
                    <th className="th">โรคเฝ้าระวังทั่วไป</th>
                    <th className="th">แจ้งเตือนเมื่อเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["โรงพยาบาลแจ้งเคสหลังวินิจฉัย", "3 ชั่วโมง", "24 ชั่วโมง", "30 นาที"],
                    ["ทีมภาคสนามกดรับเคส", "3 ชั่วโมง", "12 ชั่วโมง", "30 นาที"],
                    ["ลงพื้นที่สอบสวน", "24 ชั่วโมง", "72 ชั่วโมง", "4 ชั่วโมง"],
                    ["บันทึกแบบสอบสวนครบถ้วน", "48 ชั่วโมง", "7 วัน", "8 ชั่วโมง"],
                    ["อนุมัติปิดเคส", "7 วัน", "14 วัน", "1 วัน"],
                  ].map(([s, a, b, c]) => (
                    <tr key={String(s)} className="hover:bg-surface2">
                      <td className="td font-medium">{s}</td>
                      <td className="td">
                        <Chip bg="#fee2e2" fg="#b91c1c">
                          {a}
                        </Chip>
                      </td>
                      <td className="td">
                        <Chip bg="#e0f2fe" fg="#0369a1">
                          {b}
                        </Chip>
                      </td>
                      <td className="td text-muted">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="นิยามโรคและแบบฟอร์มที่ใช้"
            desc="เปิด/ปิดโรคที่ให้โรงพยาบาลเลือกได้ และผูกแบบฟอร์มมาตรฐาน"
            icon="shield"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[680px]">
                <thead>
                  <tr>
                    <th className="th">โรค</th>
                    <th className="th">รหัส</th>
                    <th className="th">แบบฟอร์ม</th>
                    <th className="th">ระยะเวลาแจ้ง</th>
                    <th className="th">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {DISEASES.slice(0, 8).map((d, i) => (
                    <tr key={d.code} className="hover:bg-surface2">
                      <td className="td">
                        <Chip bg={d.tone} fg={d.color} dot>
                          {d.name}
                        </Chip>
                      </td>
                      <td className="td font-mono text-[12px] text-muted">{d.code}</td>
                      <td className="td text-muted">
                        {["ร.507", "ร.506", "ร.507", "ร.506", "ร.506", "ร.507", "ร.506", "TB-01"][i]}
                      </td>
                      <td className="td">{d.urgent ? "3 ชั่วโมง" : "24 ชั่วโมง"}</td>
                      <td className="td">
                        <span
                          className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                          style={{
                            background: i < 7 ? "var(--accent)" : "#cbd5e1",
                            justifyContent: i < 7 ? "flex-end" : "flex-start",
                          }}
                        >
                          <span className="w-4 h-4 rounded-full bg-white" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* right */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="บทบาทและสิทธิ์ผู้ใช้" icon="users" pad={false}>
            <ul>
              {ROLES.map(([n, c, d]) => (
                <li key={String(n)} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-semibold flex-1">{n}</span>
                    <Chip bg="#dbeafe" fg="#1d4ed8">
                      {c} คน
                    </Chip>
                  </div>
                  <p className="sub mt-0.5">{d}</p>
                </li>
              ))}
            </ul>
            <div className="p-3">
              <button className="btn btn-sm w-full">
                <Icon name="plus" size={14} /> เพิ่มบทบาทใหม่
              </button>
            </div>
          </Card>

          <Card title="เส้นเตือนภัยรายโรค" icon="bell">
            <div className="grid gap-2.5">
              {[
                ["ไข้เลือดออก", "30 ราย/สัปดาห์", "#dc2626"],
                ["มือ เท้า ปาก", "20 ราย/สัปดาห์", "#059669"],
                ["ไข้หวัดใหญ่", "40 ราย/สัปดาห์", "#2563eb"],
                ["อาหารเป็นพิษ", "15 ราย/เหตุการณ์", "#d97706"],
                ["อหิวาตกโรค", "1 ราย (ทันที)", "#0891b2"],
              ].map(([n, v, c]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: String(c) }} />
                  <span className="text-[12.5px] flex-1">{n}</span>
                  <span className="text-[12px] font-semibold tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="บันทึกการเปลี่ยนแปลงล่าสุด" icon="clock">
            <ol className="relative pl-5">
              <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line-brd" />
              {[
                ["ปรับเส้นเตือนภัยไข้เลือดออก 25 → 30", "นพ.ธนากร", "26 ส.ค. 16:20"],
                ["เปิดใช้งานกติกา R-004", "นพ.ธนากร", "24 ส.ค. 10:05"],
                ["เพิ่มสิทธิ์ รพ.พิษณุเวช", "ผู้ดูแลระบบ", "22 ส.ค. 09:12"],
                ["แก้ SLA ลงพื้นที่ 48 → 24 ชม.", "ภญ.สุพรรณี", "18 ส.ค. 14:41"],
              ].map(([t, who, when]) => (
                <li key={String(t)} className="relative pb-3.5 last:pb-0">
                  <span
                    className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 border-white"
                    style={{ background: "var(--accent)" }}
                  />
                  <p className="text-[12.5px] leading-snug">{t}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Avatar name={String(who)} size={18} />
                    <span className="text-[11px] text-faint">
                      {who} · {when}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
}
