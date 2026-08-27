import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress } from "@/components/ui";
import PublicFlexCard from "@/components/PublicFlexCard";
import { Icon } from "@/components/icons";

/** ประชาชนที่ "คัดเข้า" จากเคสสอบสวน — ผู้ป่วย ผู้สัมผัส และกลุ่มเสี่ยงในรัศมี */
const TARGETS = [
  {
    name: "กฤษฎา พรมเรือง",
    detail: "ชาย 34 ปี · ผู้ป่วยยืนยัน · ม.4 ต.บ้านคลอง",
    group: "ผู้ป่วยยืนยัน",
    bg: "#fee2e2",
    fg: "#b91c1c",
    line: true,
    state: "ตอบแบบสอบถามแล้ว",
  },
  {
    name: "พัชรินทร์ พรมเรือง",
    detail: "หญิง 31 ปี · ผู้สัมผัสร่วมบ้าน · ม.4 ต.บ้านคลอง",
    group: "ผู้สัมผัสร่วมบ้าน",
    bg: "#ffedd5",
    fg: "#c2410c",
    line: true,
    state: "อ่านแล้ว",
  },
  {
    name: "ด.ช.ณฐกร พรมเรือง",
    detail: "ชาย 9 ปี · ผู้สัมผัสร่วมบ้าน · ม.4 ต.บ้านคลอง",
    group: "ผู้สัมผัสร่วมบ้าน",
    bg: "#ffedd5",
    fg: "#c2410c",
    line: false,
    state: "ยังไม่ผูกหมอพร้อม (แจ้งผ่าน อสม.)",
  },
  {
    name: "บุญมา แสงทอง",
    detail: "หญิง 66 ปี · กลุ่มเสี่ยงรัศมี 100 ม. · ม.4 ต.บ้านคลอง",
    group: "รัศมี 100 ม.",
    bg: "#fef3c7",
    fg: "#b45309",
    line: true,
    state: "ส่งแล้ว รอเปิดอ่าน",
  },
  {
    name: "วิรัช พูนทรัพย์",
    detail: "ชาย 42 ปี · เพื่อนร่วมงานผู้ป่วย · ต.ในเมือง",
    group: "ผู้สัมผัสที่ทำงาน",
    bg: "#e0f2fe",
    fg: "#0369a1",
    line: true,
    state: "ตอบแบบสอบถามแล้ว",
  },
];

const TEMPLATES = [
  ["คำแนะนำผู้ป่วยยืนยันไข้เลือดออก", "การดูแลตนเอง 7 วัน + สัญญาณอันตราย", true],
  ["คำแนะนำผู้สัมผัสร่วมบ้าน", "สังเกตอาการ 14 วัน + กำจัดลูกน้ำ", false],
  ["แจ้งกลุ่มเสี่ยงในรัศมี 100 เมตร", "แจ้งพ่นหมอกควัน + ขอความร่วมมือ", false],
  ["นัดหมายติดตามอาการซ้ำ", "แบบติดตามอาการวันที่ 3 และวันที่ 7", false],
];

export default function UnitAlert() {
  return (
    <>
      <PageHead
        title="แจ้งเตือนประชาชนที่คัดเข้าด้วยไลน์หมอพร้อม"
        desc="ส่ง Flex Message รายบุคคลถึงผู้ป่วย ผู้สัมผัส และกลุ่มเสี่ยงที่ถูกคัดเข้าจากเคสสอบสวน — ต่างจากการแจ้งข่าวทั้งพื้นที่ที่หน้า “แจ้งข่าวประชาชน”"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="users" size={15} /> จัดการรายชื่อคัดเข้า
            </button>
            <button className="btn btn-sm btn-primary">
              <Icon name="send" size={15} /> ส่ง Flex ให้ผู้ที่เลือก (4)
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ประชาชนที่คัดเข้าจากเคสนี้" value={18} unit="คน" icon="users" />
        <Stat label="ผูกไลน์หมอพร้อมแล้ว" value={15} unit="คน" icon="chat" tone="var(--ok)" />
        <Stat label="เปิดอ่านแล้ว" value={12} unit="คน" icon="check" tone="var(--info)" />
        <Stat label="ตอบแบบสอบถามกลับ" value={9} unit="คน" icon="heart" tone="var(--warn)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="รายชื่อที่คัดเข้าจากเคส PLK-6809-0142"
            desc="ระบบดึงรายชื่อจากแบบสอบสวนและรัศมีควบคุมโรคบนแผนที่โดยอัตโนมัติ"
            icon="users"
            pad={false}
            action={
              <Chip bg="#ede9fe" fg="#6d28d9" dot>
                คัดเข้าอัตโนมัติ 18 คน
              </Chip>
            }
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[720px]">
                <thead>
                  <tr>
                    <th className="th w-[42px]"></th>
                    <th className="th">ประชาชน</th>
                    <th className="th">กลุ่มที่คัดเข้า</th>
                    <th className="th">ไลน์หมอพร้อม</th>
                    <th className="th">สถานะล่าสุด</th>
                  </tr>
                </thead>
                <tbody>
                  {TARGETS.map((t) => (
                    <tr key={t.name} className="hover:bg-surface2">
                      <td className="td">
                        <input
                          type="checkbox"
                          defaultChecked={t.line}
                          className="w-4 h-4 accent-[var(--accent)]"
                          readOnly
                        />
                      </td>
                      <td className="td">
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-[11.5px] text-muted">{t.detail}</div>
                      </td>
                      <td className="td">
                        <Chip bg={t.bg} fg={t.fg}>
                          {t.group}
                        </Chip>
                      </td>
                      <td className="td">
                        {t.line ? (
                          <Chip bg="#dcfce7" fg="#15803d" dot>
                            ผูกแล้ว
                          </Chip>
                        ) : (
                          <Chip bg="#f1f5f9" fg="#64748b">
                            ยังไม่ผูก
                          </Chip>
                        )}
                      </td>
                      <td className="td text-muted">{t.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="เทมเพลตข้อความ" desc="เลือกชุดคำแนะนำตามกลุ่มที่คัดเข้า" icon="file">
              <div className="grid gap-2">
                {TEMPLATES.map(([t, d, on]) => (
                  <label
                    key={String(t)}
                    className="flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer"
                    style={{
                      borderColor: on ? "var(--accent)" : "var(--border)",
                      background: on ? "color-mix(in srgb, var(--accent) 7%, white)" : "#fff",
                    }}
                  >
                    <input
                      type="radio"
                      name="tpl"
                      defaultChecked={Boolean(on)}
                      className="mt-1 w-4 h-4 accent-[var(--accent)]"
                    />
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold">{t}</span>
                      <span className="block text-[11.5px] text-muted">{d}</span>
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            <Card title="ผลตอบกลับจากประชาชน" desc="อัปเดตเข้าระบบติดตามพฤติกรรมสุขภาพ" icon="heart">
              <ul className="grid gap-3.5">
                {[
                  ["กำจัดแหล่งเพาะพันธุ์แล้ว", 78],
                  ["ทายากันยุง/นอนกางมุ้ง", 64],
                  ["สังเกตอาการครบตามนัด", 52],
                  ["มาตรวจซ้ำตามนัด", 41],
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
              <p className="sub mt-4">
                ข้อมูลนี้ส่งต่อไปยังหน้า “ติดตามพฤติกรรมสุขภาพ” และ Dashboard กลางโดยอัตโนมัติ
              </p>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ตัวอย่างการ์ดที่ประชาชนจะได้รับ"
            desc="Flex Message บนไลน์หมอพร้อม"
            icon="chat"
          >
            <div className="grid place-items-center bg-[#8aa5b8] rounded-xl p-4">
              <PublicFlexCard width={268} />
            </div>
            <ul className="grid gap-2 mt-4">
              {[
                ["กดรับทราบได้บนการ์ด", "check"],
                ["ตอบคำถามสั้นบนการ์ดได้ทันที", "clipboard"],
                ["footer ระบุชื่อ ตำแหน่ง หน่วยงานผู้ส่ง", "users"],
              ].map(([t, ic]) => (
                <li key={String(t)} className="flex items-start gap-2 text-[12.5px] text-muted">
                  <span className="mt-[2px] text-ok">
                    <Icon name={ic as "check"} size={14} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="ผู้ส่ง (footer ของการ์ด)" icon="shield">
            <div className="rounded-xl border border-line-brd p-3.5">
              <p className="text-[10.5px] text-faint">ผู้ส่ง</p>
              <p className="text-[13px] font-bold leading-tight mt-0.5">
                นายวิรัตน์ สุขเกษม
              </p>
              <p className="text-[11.5px] text-muted leading-tight">
                นักสาธารณสุขชำนาญการ · ผู้รับผิดชอบงานสอบสวนโรค
              </p>
              <p className="text-[11.5px] text-muted leading-tight">
                รพ.สต.บ้านคลอง · สสอ.เมืองพิษณุโลก
              </p>
            </div>
            <p className="sub mt-3">
              ตาม Component Spec — ทุก Flex Message ต้องมีชื่อ ตำแหน่ง และหน่วยงานผู้ส่งเป็น footer
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
