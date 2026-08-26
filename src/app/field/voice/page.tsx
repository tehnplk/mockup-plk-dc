import PhoneShell, { Sheet } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip, Progress } from "@/components/ui";
import { FIELD_TABS } from "../tabs";

const CLIPS = [
  { n: "สัมภาษณ์ญาติผู้ป่วย", d: "27 ส.ค. 10:31", len: "04:12", done: true },
  { n: "บันทึกสภาพแวดล้อมรอบบ้าน", d: "27 ส.ค. 10:44", len: "01:58", done: true },
  { n: "สอบถาม อสม. ประจำหมู่บ้าน", d: "27 ส.ค. 11:06", len: "02:35", done: false },
];

export default function VoiceField() {
  return (
    <PhoneShell
      title="อัดเสียงภาคสนาม"
      subtitle="PLK-6809-0142 · 3 คลิป"
      caption="ระบบงานภาคสนาม · บันทึกเสียง"
      tabs={FIELD_TABS}
    >
      {/* recorder */}
      <div className="px-4 pt-6 pb-5 text-center bg-surface border-b border-line-brd">
        <p className="text-[32px] font-bold tabular-nums tracking-tight">01:24</p>
        <Chip bg="#fee2e2" fg="#b91c1c" dot>
          กำลังบันทึก
        </Chip>

        <svg viewBox="0 0 300 70" className="w-full mt-4" style={{ height: 70 }}>
          {Array.from({ length: 74 }).map((_, i) => {
            const seed = Math.abs(Math.sin(i * 2.1) * Math.cos(i * 0.7));
            const h = 6 + seed * 52;
            const active = i < 48;
            return (
              <rect
                key={i}
                x={i * 4 + 3}
                y={35 - h / 2}
                width="2.4"
                height={h}
                rx="1.2"
                fill={active ? "var(--accent)" : "#e2e8f0"}
              />
            );
          })}
        </svg>

        <div className="flex items-center justify-around mt-3">
          <button className="grid place-items-center w-12 h-12 rounded-full bg-surface2 border border-line-brd text-muted">
            <Icon name="clock" size={20} />
          </button>
          <button
            className="grid place-items-center w-[72px] h-[72px] rounded-full text-white"
            style={{ background: "var(--danger)", boxShadow: "0 0 0 8px #dc262618" }}
          >
            <span className="w-6 h-6 rounded-[5px] bg-white" />
          </button>
          <button className="grid place-items-center w-12 h-12 rounded-full bg-surface2 border border-line-brd text-muted">
            <Icon name="check" size={20} />
          </button>
        </div>
        <p className="sub mt-3">แตะปุ่มแดงเพื่อหยุด · เสียงจะถูกแนบเข้าเคสอัตโนมัติ</p>
      </div>

      <div className="p-4">
        <Sheet
          title="คลิปเสียงในเคสนี้"
          action={
            <Chip bg="#ede9fe" fg="#6d28d9">
              ถอดความอัตโนมัติ
            </Chip>
          }
        >
          {CLIPS.map((c, i) => (
            <div key={c.n} className="py-3 border-b border-line-brd last:border-0">
              <div className="flex items-center gap-3">
                <button
                  className="grid place-items-center w-9 h-9 rounded-full text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  <Icon name="wave" size={16} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold truncate">{c.n}</p>
                  <p className="text-[11px] text-muted">
                    {c.d} · {c.len} นาที
                  </p>
                </div>
                {c.done ? (
                  <Chip bg="#dcfce7" fg="#15803d">
                    ถอดความแล้ว
                  </Chip>
                ) : (
                  <Chip bg="#fef3c7" fg="#b45309">
                    รอซิงก์
                  </Chip>
                )}
              </div>
              {i === 0 && (
                <div className="mt-2.5 ml-12">
                  <Progress value={38} height={4} />
                  <div className="flex justify-between text-[10px] text-faint mt-1 tabular-nums">
                    <span>01:36</span>
                    <span>04:12</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Sheet>

        <Sheet title="ถอดความคลิปที่เลือก">
          <div
            className="rounded-xl p-3 text-[12.5px] leading-relaxed"
            style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
          >
            <p className="mb-2">
              <span className="font-semibold" style={{ color: "var(--accent)" }}>
                เจ้าหน้าที่ ·
              </span>{" "}
              คุณป้าครับ ช่วงนี้มีคนในบ้านมีไข้อีกไหมครับ
            </p>
            <p className="mb-2">
              <span className="font-semibold text-muted">ญาติผู้ป่วย ·</span> หลานคนเล็กเมื่อวานบ่นปวดหัว
              ตัวอุ่นๆ ยังไม่ได้พาไปหาหมอ
            </p>
            <p>
              <span className="font-semibold" style={{ color: "var(--accent)" }}>
                เจ้าหน้าที่ ·
              </span>{" "}
              เดี๋ยวขอวัดไข้และลงชื่อเป็นผู้สัมผัสนะครับ
            </p>
          </div>

          <div
            className="rounded-xl p-3 mt-3 text-[12.5px] leading-relaxed"
            style={{ background: "#f5f3ff", color: "#4c1d95" }}
          >
            <p className="font-bold mb-1 flex items-center gap-1.5">
              <Icon name="sparkles" size={14} /> AI ตรวจพบ
            </p>
            พบผู้สัมผัสในบ้านมีอาการไข้เพิ่ม 1 ราย (เด็ก) — แนะนำเพิ่มเข้ารายชื่อผู้สัมผัสและวัดไข้ทันที
          </div>

          <button className="btn btn-primary w-full mt-3">
            <Icon name="plus" size={16} /> เพิ่มเป็นผู้สัมผัสในแบบสอบสวน
          </button>
        </Sheet>
      </div>
    </PhoneShell>
  );
}
