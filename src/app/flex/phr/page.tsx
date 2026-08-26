import PhoneShell, { Sheet, Row } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip } from "@/components/ui";

export default function Phr() {
  return (
    <PhoneShell
      accent="line"
      title="PHR ผู้ป่วย"
      subtitle="Personal Health Record · เชื่อมจากระบบจัดเก็บเอกสาร"
      back="/flex"
      caption="Flex Message หมอพร้อม · หน้า PHR ที่ลิงก์ไปถึง"
      right={
        <button className="opacity-90">
          <Icon name="link" size={19} />
        </button>
      }
    >
      {/* consent banner */}
      <div className="px-4 py-3" style={{ background: "#ecfdf5" }}>
        <p className="text-[11.5px] leading-relaxed flex items-start gap-2" style={{ color: "#065f46" }}>
          <span className="shrink-0 mt-0.5">
            <Icon name="shield" size={14} />
          </span>
          เข้าถึงข้อมูลนี้ได้เนื่องจากท่านเป็นเจ้าหน้าที่ที่ได้รับมอบหมายเคสนี้ ·
          การเข้าถึงถูกบันทึกใน Audit Log
        </p>
      </div>

      <div className="p-4">
        {/* patient card */}
        <div
          className="rounded-2xl p-4 mb-3 text-white"
          style={{ background: "linear-gradient(135deg,#065f46,#0d9488 70%,#14b8a6)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="grid place-items-center rounded-full w-12 h-12 shrink-0 text-[18px] font-bold"
              style={{ background: "#ffffff2e" }}
            >
              ส
            </span>
            <div className="min-w-0">
              <p className="text-[16px] font-bold leading-tight">นายสมชาย ใจดี</p>
              <p className="text-[11.5px] opacity-90">ชาย · 34 ปี · HN 0045218</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3.5">
            {[
              ["กรุ๊ปเลือด", "O Rh+"],
              ["น้ำหนัก", "68 กก."],
              ["สิทธิ", "ประกันสังคม"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl px-2.5 py-2" style={{ background: "#ffffff1f" }}>
                <p className="text-[10px] opacity-85">{k}</p>
                <p className="text-[12.5px] font-bold mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <Sheet title="การวินิจฉัยปัจจุบัน" action={<Chip bg="#fee2e2" fg="#b91c1c">Active</Chip>}>
          <div
            className="rounded-xl p-3"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <p className="text-[13.5px] font-bold" style={{ color: "#b91c1c" }}>
              A91 — Dengue haemorrhagic fever
            </p>
            <p className="text-[11.5px] mt-0.5" style={{ color: "#b91c1c" }}>
              DHF Grade II · รพ.พุทธชินราช พิษณุโลก
            </p>
          </div>
          <div className="mt-3">
            <Row label="วันเริ่มป่วย" value="22 ส.ค. 2569" icon="clock" />
            <Row label="วันรับไว้" value="26 ส.ค. 2569" icon="hospital" />
            <Row label="แพทย์ผู้ดูแล" value="พญ.นภัสสร ชัยวัฒน์" icon="users" />
            <Row label="รหัสเคสสอบสวน" value="PLK-6809-0142" icon="clipboard" />
          </div>
        </Sheet>

        <Sheet title="ผลตรวจทางห้องปฏิบัติการ">
          {[
            ["Dengue NS1 Ag", "Positive", true],
            ["Dengue IgM", "Positive", true],
            ["Platelet", "78,000 /µL", true],
            ["Hematocrit", "48.2 %", false],
            ["WBC", "3,100 /µL", true],
          ].map(([n, v, abn]) => (
            <div
              key={String(n)}
              className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0"
            >
              <span className="text-[12.5px] flex-1">{n}</span>
              <span
                className="text-[13px] font-semibold tabular-nums"
                style={{ color: abn ? "var(--danger)" : "var(--text)" }}
              >
                {v}
              </span>
              {abn && (
                <span style={{ color: "var(--danger)" }}>
                  <Icon name="bell" size={14} />
                </span>
              )}
            </div>
          ))}
          <p className="sub mt-2">ผลตรวจ ณ 27 ส.ค. 2569 06:20 น.</p>
        </Sheet>

        <Sheet title="สัญญาณชีพล่าสุด">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["อุณหภูมิ", "38.6 °C", "#dc2626"],
              ["ชีพจร", "104 /นาที", "#d97706"],
              ["ความดัน", "104/68", "#0f172a"],
              ["อัตราหายใจ", "20 /นาที", "#0f172a"],
            ].map(([k, v, c]) => (
              <div key={k} className="rounded-xl border border-line-brd p-3">
                <p className="text-[11px] text-muted">{k}</p>
                <p className="text-[16px] font-bold mt-0.5" style={{ color: c }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Sheet>

        <Sheet title="ประวัติแพ้ยา / โรคประจำตัว">
          <div className="flex flex-wrap gap-2">
            <Chip bg="#fee2e2" fg="#b91c1c">
              แพ้ยา: Penicillin
            </Chip>
            <Chip bg="#f1f5f9" fg="#475569">
              ไม่มีโรคประจำตัว
            </Chip>
            <Chip bg="#fef3c7" fg="#b45309">
              ห้ามใช้ NSAIDs
            </Chip>
          </div>
        </Sheet>

        <Sheet title="เอกสารที่เชื่อมโยง" action={<Chip bg="#dcfce7" fg="#15803d">3 ไฟล์</Chip>}>
          {[
            ["แบบ ร.507 ไข้เลือดออก.pdf", "27 ส.ค. 2569 · 1.2 MB", "file"],
            ["ผลตรวจ NS1 + CBC.pdf", "27 ส.ค. 2569 · 480 KB", "file"],
            ["สรุปสนทนาผู้ป่วย (AI).docx", "26 ส.ค. 2569 · 96 KB", "wave"],
          ].map(([n, d, ic]) => (
            <button
              key={String(n)}
              className="w-full flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0 text-left"
            >
              <span
                className="grid place-items-center rounded-lg w-8 h-8 shrink-0"
                style={{ background: "#dcfce7", color: "#15803d" }}
              >
                <Icon name={ic as "file"} size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-medium truncate">{n}</span>
                <span className="block text-[11px] text-muted">{d}</span>
              </span>
              <span className="text-faint">
                <Icon name="arrowRight" size={15} />
              </span>
            </button>
          ))}
        </Sheet>

        <Sheet title="ไทม์ไลน์การดูแล">
          <ol className="relative pl-5">
            <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line-brd" />
            {[
              ["27 ส.ค. 09:44", "เจ้าหน้าที่กดรับทราบผ่านหมอพร้อม"],
              ["27 ส.ค. 08:47", "ข้อมูลเข้า Dashboard กลางจังหวัด"],
              ["27 ส.ค. 06:20", "ผลเลือดรอบเช้า เกล็ดเลือด 78,000"],
              ["26 ส.ค. 14:22", "สอบสวนโรคเบื้องต้นที่หอผู้ป่วย"],
              ["26 ส.ค. 10:15", "รับไว้รักษาในโรงพยาบาล"],
              ["25 ส.ค. 09:47", "ตรวจที่ห้องฉุกเฉินครั้งแรก"],
            ].map(([t, txt]) => (
              <li key={String(t)} className="relative pb-3.5 last:pb-0">
                <span
                  className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 border-white"
                  style={{ background: "var(--accent)" }}
                />
                <p className="text-[12.5px] leading-snug">{txt}</p>
                <p className="text-[11px] text-faint mt-0.5">{t} น.</p>
              </li>
            ))}
          </ol>
        </Sheet>

        <p className="sub text-center px-4 pb-2">
          ข้อมูลนี้เป็นความลับทางการแพทย์ ห้ามเผยแพร่หรือบันทึกภาพหน้าจอ
        </p>
      </div>
    </PhoneShell>
  );
}
