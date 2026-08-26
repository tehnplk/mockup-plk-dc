import Link from "next/link";
import PhoneShell, { Sheet, Row } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip } from "@/components/ui";

export default function FieldCaseDetail() {
  return (
    <PhoneShell
      title="PLK-6809-0142"
      subtitle="รายละเอียดเคสจากโรงพยาบาล"
      back="/field"
      caption="ระบบงานภาคสนาม · หน้ารายละเอียดเคส"
      right={
        <button className="opacity-90">
          <Icon name="file" size={19} />
        </button>
      }
    >
      {/* banner */}
      <div
        className="px-4 py-4 text-white"
        style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626 65%,#f97316)" }}
      >
        <div className="flex items-center gap-2">
          <Icon name="shield" size={17} />
          <span className="text-[12px] font-bold">ไข้เลือดออก (DHF Grade II)</span>
        </div>
        <p className="text-[19px] font-bold mt-1.5 leading-tight">นายสมชาย ใจดี</p>
        <p className="text-[12px] opacity-90">ชาย · 34 ปี · HN 0045218</p>
        <div className="flex gap-2 mt-3">
          <span className="chip" style={{ background: "#ffffff26", color: "#fff" }}>
            เร่งด่วน
          </span>
          <span className="chip" style={{ background: "#ffffff26", color: "#fff" }}>
            รับภายใน 09:14 น. · เหลือ 2:47 ชม.
          </span>
        </div>
      </div>

      <div className="p-4">
        <Sheet title="ข้อมูลผู้ป่วย">
          <Row label="วันเริ่มป่วย" value="22 ส.ค. 2569" icon="clock" />
          <Row label="วันรับไว้" value="26 ส.ค. 2569" icon="hospital" />
          <Row label="โรงพยาบาล" value="รพ.พุทธชินราช" icon="hospital" />
          <Row label="สถานะ" value="ผู้ป่วยใน · อายุรกรรมชาย 2" icon="clipboard" />
          <Row label="อาชีพ" value="รับจ้างก่อสร้าง" icon="users" />
        </Sheet>

        <Sheet title="ที่อยู่ขณะป่วย" action={<Chip bg="#dcfce7" fg="#15803d">มีพิกัด</Chip>}>
          <p className="text-[13px] leading-relaxed">
            128/4 หมู่ 4 ต.ในเมือง อ.เมืองพิษณุโลก จ.พิษณุโลก 65000
          </p>
          {/* mini map */}
          <div className="mt-3 rounded-xl overflow-hidden border border-line-brd">
            <svg viewBox="0 0 300 130" className="w-full" style={{ background: "#e8eef3" }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`h${i}`} x1="0" x2="300" y1={i * 20 + 6} y2={i * 20 + 6} stroke="#d6dfe8" strokeWidth="1" />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 22 + 8} x2={i * 22 + 8} y1="0" y2="130" stroke="#d6dfe8" strokeWidth="1" />
              ))}
              <path d="M0 84 L120 78 L190 96 L300 88" stroke="#a9c7e0" strokeWidth="9" fill="none" />
              <path d="M52 0 L58 130" stroke="#fff" strokeWidth="7" fill="none" />
              <path d="M0 46 L300 40" stroke="#fff" strokeWidth="6" fill="none" />
              <circle cx="150" cy="62" r="34" fill="#dc262622" stroke="#dc2626" strokeDasharray="4 3" />
              <circle cx="150" cy="62" r="7" fill="#dc2626" stroke="#fff" strokeWidth="2.5" />
              {[
                [104, 44],
                [186, 50],
                [128, 92],
                [174, 88],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#f97316" stroke="#fff" strokeWidth="1.6" />
              ))}
              <text x="8" y="124" fontSize="8" fill="#64748b">
                รัศมีควบคุมโรค 100 ม. · บ้านใกล้เคียง 4 หลัง
              </text>
            </svg>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="btn btn-sm flex-1">
              <Icon name="map" size={14} /> นำทาง
            </button>
            <Link href="/field/gps" className="btn btn-sm flex-1">
              <Icon name="pin" size={14} /> เก็บพิกัดเพิ่ม
            </Link>
          </div>
        </Sheet>

        <Sheet title="สรุปจากโรงพยาบาล">
          <p
            className="text-[12.5px] leading-relaxed rounded-xl p-3"
            style={{ background: "#f5f3ff", color: "#4c1d95" }}
          >
            ไข้สูง 39.4°C 4 วัน ปวดศีรษะ ปวดกระบอกตา มีจุดเลือดออกที่แขน · NS1 Positive ·
            เกล็ดเลือด 78,000 · พบเพื่อนร่วมงาน 1 รายมีไข้ 2 วัน ยังไม่พบแพทย์ ·
            รอบบ้านมีโอ่งน้ำ 2 ใบและกองยางรถยนต์
          </p>
        </Sheet>

        <Sheet title="เอกสารแนบ (3)">
          {[
            ["ผลตรวจ NS1 + CBC.pdf", "480 KB", "file"],
            ["ภาพผื่นบริเวณแขน.jpg", "1.8 MB", "image"],
            ["สรุปสนทนา (AI).docx", "96 KB", "wave"],
          ].map(([n, s, ic]) => (
            <div key={String(n)} className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0">
              <span className="text-faint">
                <Icon name={ic as "file"} size={17} />
              </span>
              <span className="text-[12.5px] flex-1 truncate">{n}</span>
              <span className="text-[11px] text-faint">{s}</span>
            </div>
          ))}
        </Sheet>

        <Sheet title="ทีมที่เกี่ยวข้อง">
          {[
            ["พญ.นภัสสร ชัยวัฒน์", "ผู้แจ้งเคส · รพ.พุทธชินราช"],
            ["นพ.ธนากร วงศ์วิวัฒน์", "หัวหน้าทีมสอบสวน · สสจ."],
            ["นายกิตติศักดิ์ แสงเพชร", "จพ.สาธารณสุข · รพ.สต.ในเมือง"],
          ].map(([n, r]) => (
            <div key={String(n)} className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0">
              <span
                className="grid place-items-center rounded-full w-8 h-8 text-[12px] font-bold shrink-0"
                style={{ background: "#ffedd5", color: "#ea580c" }}
              >
                {String(n).slice(-3, -2)}
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] font-semibold truncate">{n}</span>
                <span className="block text-[11px] text-muted truncate">{r}</span>
              </span>
            </div>
          ))}
        </Sheet>
      </div>

      {/* sticky action */}
      <div className="sticky bottom-0 p-4 bg-surface border-t border-line-brd">
        <div className="flex gap-2">
          <button className="btn flex-1">ปฏิเสธเคส</button>
          <Link href="/field/investigate" className="btn btn-primary flex-[2]">
            <Icon name="check" size={16} /> กดรับเคสและเริ่มสอบสวน
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
