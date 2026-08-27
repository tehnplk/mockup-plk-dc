import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISEASES } from "@/lib/mock";

const STEPS = [
  "เลือกประเภทโรค",
  "ระบุผู้ป่วย / ดึง HIS",
  "เติมข้อมูลสอบสวน",
  "แนบเอกสาร",
  "ส่งต่อ & แจ้งเตือน",
];

export default function NewCase() {
  return (
    <>
      <PageHead
        title="เปิดเคสสอบสวนใหม่"
        desc="ขั้นตอนที่ 1 จาก 5 — เลือกประเภทโรคที่จะทำข้อมูล ระบบจะโหลดแบบฟอร์มและนิยามโรคที่สอดคล้องให้อัตโนมัติ"
        actions={<button className="btn btn-sm">ยกเลิก</button>}
      />

      {/* stepper */}
      <div className="card p-4 sm:p-5 mb-5">
        <ol className="flex items-center gap-1 overflow-x-auto nice">
          {STEPS.map((s, i) => {
            const done = i === 0;
            return (
              <li key={s} className="flex items-center gap-2 shrink-0">
                <span
                  className="grid place-items-center rounded-full text-[12px] font-bold w-7 h-7 shrink-0"
                  style={{
                    background: done ? "var(--accent)" : "#f1f5f9",
                    color: done ? "#fff" : "var(--faint)",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-[12.5px] font-semibold whitespace-nowrap"
                  style={{ color: done ? "var(--accent)" : "var(--faint)" }}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="w-8 sm:w-14 h-px bg-line-brd mx-1.5 shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card
          title="เลือกประเภทโรค"
          desc="กลุ่มโรคติดต่อที่ต้องแจ้งความ (506) และโรคติดต่ออันตรายตาม พ.ร.บ.โรคติดต่อ 2558"
          icon="grid"
          action={
            <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg bg-surface2 border border-line-brd w-[210px]">
              <span className="text-faint">
                <Icon name="search" size={14} />
              </span>
              <input
                className="bg-transparent text-[12.5px] outline-none w-full placeholder:text-faint"
                placeholder="ค้นหาชื่อโรค / รหัส"
                readOnly
              />
            </div>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DISEASES.map((d, i) => {
              const selected = i === 0;
              return (
                <button
                  key={d.code}
                  className="text-left rounded-xl p-3.5 border transition-all"
                  style={{
                    borderColor: selected ? d.color : "var(--border)",
                    background: selected ? d.tone : "#fff",
                    boxShadow: selected ? `0 0 0 2px ${d.color}33` : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="grid place-items-center rounded-lg shrink-0"
                      style={{ width: 32, height: 32, background: d.tone, color: d.color }}
                    >
                      <Icon name="shield" size={17} />
                    </span>
                    {d.urgent && (
                      <Chip bg="#fee2e2" fg="#b91c1c">
                        แจ้งภายใน 3 ชม.
                      </Chip>
                    )}
                    {selected && !d.urgent && (
                      <span style={{ color: d.color }}>
                        <Icon name="check" size={18} />
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[13.5px] font-semibold leading-snug">{d.name}</p>
                  <p className="text-[11.5px] text-muted mt-0.5">
                    {d.code} · {d.short}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="โรคที่เลือก" icon="clipboard">
            <div className="rounded-xl p-3.5" style={{ background: "#fee2e2" }}>
              <p className="text-[14px] font-bold" style={{ color: "#b91c1c" }}>
                ไข้เลือดออก (Dengue)
              </p>
              <p className="text-[11.5px] mt-0.5" style={{ color: "#b91c1c" }}>
                D66 · รหัสรายงาน 66 · DF / DHF / DSS
              </p>
            </div>
            <dl className="mt-4 grid gap-2.5 text-[12.5px]">
              {[
                ["แบบฟอร์มที่จะใช้", "แบบ ร.507 (Dengue)"],
                ["ระยะเวลาแจ้ง", "ภายใน 3 ชั่วโมง"],
                ["รัศมีควบคุมโรค", "100 เมตรรอบบ้านผู้ป่วย"],
                ["ทีมที่รับผิดชอบ", "SRRT อำเภอ + รพ.สต. พื้นที่"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted shrink-0">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card title="นิยามการเฝ้าระวังโรค" icon="file">
            <ul className="grid gap-2 text-[12.5px] text-muted">
              {[
                "ไข้เฉียบพลัน 2–7 วัน ร่วมกับอาการอย่างน้อย 2 ข้อ",
                "ปวดศีรษะ / ปวดกระบอกตา / ปวดกล้ามเนื้อ",
                "ผื่น หรือ tourniquet test ให้ผลบวก",
                "เกล็ดเลือด ≤ 100,000 /ลบ.มม.",
                "ผลตรวจ NS1 Ag หรือ IgM ให้ผลบวก",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[3px] shrink-0" style={{ color: "var(--accent)" }}>
                    <Icon name="check" size={13} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex gap-2">
            <button className="btn flex-1">ย้อนกลับ</button>
            <Link href="/unit/case" className="btn btn-primary flex-1">
              ถัดไป <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
