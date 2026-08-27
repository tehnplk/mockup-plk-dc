import Link from "next/link";
import PhoneShell, { Sheet } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip, Progress } from "@/components/ui";

const SECTIONS = [
  ["ข้อมูลผู้ป่วย (จาก รพ.)", "เสร็จแล้ว", 100],
  ["การสำรวจสิ่งแวดล้อม", "กำลังทำ", 60],
  ["ผู้สัมผัสใกล้ชิด", "ยังไม่เริ่ม", 0],
  ["ค่าดัชนีลูกน้ำ (HI/CI/BI)", "กำลังทำ", 40],
  ["มาตรการควบคุมโรค", "ยังไม่เริ่ม", 0],
];

export default function Investigate() {
  return (
    <PhoneShell
      url="cdc.plkhealth.go.th/field/investigate"
      title="แบบสอบสวนภาคสนาม"
      subtitle="PLK-6809-0142 · นายสมชาย ใจดี"
      back="/field/case"
      caption="ระบบงานภาคสนาม · Web Mobile · บันทึกข้อมูลสอบสวน"
      right={<Chip bg="#ffffff2e" fg="#fff">บันทึกแล้ว</Chip>}
    >
      <div className="p-4">
        {/* progress */}
        <div className="bg-surface rounded-2xl border border-line-brd p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12.5px] font-semibold">ความคืบหน้าแบบสอบสวน</span>
            <span className="text-[13px] font-bold" style={{ color: "var(--accent)" }}>
              40%
            </span>
          </div>
          <Progress value={40} />
          <p className="sub mt-2">
            ทำงานแบบออฟไลน์ได้ ระบบจะซิงก์อัตโนมัติเมื่อมีสัญญาณ
          </p>
        </div>

        {/* sections */}
        <Sheet title="หัวข้อการสอบสวน">
          {SECTIONS.map(([n, s, p]) => {
            const pct = Number(p);
            const tone =
              pct === 100
                ? { bg: "#dcfce7", fg: "#15803d" }
                : pct > 0
                  ? { bg: "#fef3c7", fg: "#b45309" }
                  : { bg: "#f1f5f9", fg: "#64748b" };
            return (
              <button
                key={String(n)}
                className="w-full flex items-center gap-3 py-3 border-b border-line-brd last:border-0 text-left"
              >
                <span
                  className="grid place-items-center rounded-full w-7 h-7 shrink-0"
                  style={{ background: tone.bg, color: tone.fg }}
                >
                  <Icon name={pct === 100 ? "check" : "clipboard"} size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold">{n}</span>
                  <span className="block text-[11px]" style={{ color: tone.fg }}>
                    {s}
                  </span>
                </span>
                <span className="text-faint">
                  <Icon name="arrowRight" size={16} />
                </span>
              </button>
            );
          })}
        </Sheet>

        {/* active section form */}
        <Sheet title="2. การสำรวจสิ่งแวดล้อมรอบบ้าน">
          <div className="flex flex-col gap-4 min-w-0">
            <div>
              <span className="lbl">พบภาชนะที่มีลูกน้ำยุงลายหรือไม่</span>
              <div className="grid grid-cols-2 gap-2">
                {["พบ", "ไม่พบ"].map((o, i) => (
                  <button
                    key={o}
                    className="py-2.5 rounded-xl text-[13px] font-semibold border"
                    style={{
                      background: i === 0 ? "var(--accent)" : "#fff",
                      color: i === 0 ? "#fff" : "var(--muted)",
                      borderColor: i === 0 ? "transparent" : "var(--border)",
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="lbl">ประเภทภาชนะที่พบ (เลือกได้หลายข้อ)</span>
              <div className="flex flex-wrap gap-2">
                {["โอ่งน้ำ", "ถังน้ำ", "จานรองกระถาง", "ยางรถยนต์", "แจกัน", "เศษภาชนะ"].map(
                  (o, i) => (
                    <button
                      key={o}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium border"
                      style={{
                        background:
                          i < 3 ? "color-mix(in srgb, var(--accent) 10%, #fff)" : "#fff",
                        color: i < 3 ? "var(--accent)" : "var(--muted)",
                        borderColor: i < 3 ? "var(--accent)" : "var(--border)",
                      }}
                    >
                      {i < 3 && <Icon name="check" size={12} />}
                      {o}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                ["ภาชนะทั้งหมด", "18"],
                ["พบลูกน้ำ", "6"],
                ["บ้านสำรวจ", "12"],
              ].map(([l, v]) => (
                <div key={l}>
                  <span className="lbl">{l}</span>
                  <input className="inp text-center font-bold tabular-nums" defaultValue={v} readOnly />
                </div>
              ))}
            </div>

            <div>
              <span className="lbl">บันทึกข้อความ (พิมพ์ text)</span>
              <textarea
                className="inp min-h-[96px] resize-none"
                readOnly
                defaultValue="พบโอ่งน้ำหลังบ้าน 2 ใบไม่มีฝาปิด มีลูกน้ำจำนวนมาก และกองยางรถยนต์เก่าข้างบ้าน 5 เส้น มีน้ำขัง แจ้ง อสม. ในพื้นที่ให้คว่ำภาชนะและใส่ทรายอะเบท"
              />
              <div className="flex gap-2 mt-2">
                <button className="btn btn-sm flex-1">
                  <Icon name="mic" size={14} /> พูดแทนพิมพ์
                </button>
                <button className="btn btn-sm flex-1">
                  <Icon name="sparkles" size={14} /> ให้ AI จัดข้อความ
                </button>
              </div>
            </div>
          </div>
        </Sheet>

        {/* evidence quick add */}
        <Sheet title="หลักฐานที่แนบแล้ว">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ["/field/camera", "camera", "รูปภาพ", "6"],
              ["/field/voice", "mic", "เสียง", "2"],
              ["/field/gps", "pin", "พิกัด", "3"],
            ].map(([href, ic, l, n]) => (
              <Link
                key={String(l)}
                href={String(href)}
                className="rounded-xl border border-line-brd p-3 text-center"
              >
                <span
                  className="grid place-items-center rounded-xl mx-auto"
                  style={{
                    width: 38,
                    height: 38,
                    background: "color-mix(in srgb, var(--accent) 12%, #fff)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon name={ic as "camera"} size={19} />
                </span>
                <p className="text-[12px] font-semibold mt-2">{l}</p>
                <p className="text-[11px] text-muted">{n} รายการ</p>
              </Link>
            ))}
          </div>
        </Sheet>

        <div className="grid gap-2 pb-2">
          <button className="btn">บันทึกร่าง</button>
          <button className="btn btn-primary">
            <Icon name="send" size={16} /> ส่งแบบสอบสวนเข้าระบบกลาง
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
