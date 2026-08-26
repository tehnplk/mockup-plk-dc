import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";
import PublicFlexCard from "@/components/PublicFlexCard";
import { Icon } from "@/components/icons";

export default function PublicFlexChat() {
  return (
    <PhoneShell
      accent="line"
      title="หมอพร้อม"
      subtitle="Official Account · มุมมองประชาชน"
      caption="Flex Message หมอพร้อม สำหรับประชาชน · Line OA"
      right={
        <div className="flex gap-3 opacity-90">
          <Icon name="search" size={18} />
          <Icon name="settings" size={18} />
        </div>
      }
    >
      <div className="min-h-full px-3.5 py-4" style={{ background: "#8ab4d8" }}>
        <p className="text-center text-[11px] text-white/95 font-semibold mb-4">วันนี้</p>

        {/* intro text */}
        <div className="flex gap-2 items-start mb-4">
          <span
            className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white text-[11px] font-bold"
            style={{ background: "#06c755" }}
          >
            พร้
          </span>
          <div className="max-w-[250px]">
            <p className="text-[10.5px] text-white/90 mb-1">หมอพร้อม</p>
            <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5">
              <p className="text-[12.5px] leading-relaxed text-[#334155]">
                สวัสดีค่ะ คุณสมหญิง 🙏 มีข่าวสารสุขภาพสำคัญในพื้นที่ของท่าน
                กรุณากดรับทราบและช่วยตอบคำถามสั้นๆ นะคะ
              </p>
            </div>
            <p className="text-[10px] text-white/85 mt-1">10:15</p>
          </div>
        </div>

        {/* public flex — ยังไม่ตอบ */}
        <div className="flex gap-2 items-start mb-4">
          <span className="w-8 shrink-0" />
          <div>
            <PublicFlexCard width={266} />
            <p className="text-[10px] text-white/85 mt-1">10:15</p>
          </div>
        </div>

        {/* citizen replies */}
        <div className="flex justify-end mb-4">
          <div className="max-w-[210px]">
            <div
              className="rounded-2xl rounded-br-sm px-3.5 py-2.5"
              style={{ background: "#c8e05b" }}
            >
              <p className="text-[12.5px] text-[#1f2937]">
                รับทราบค่ะ · ตอบคำถามแล้ว: ไม่มีคนมีไข้ / สำรวจแล้วพบลูกน้ำ
              </p>
            </div>
            <p className="text-[10px] text-white/85 mt-1 text-right">10:22 · อ่านแล้ว</p>
          </div>
        </div>

        {/* system follow-up */}
        <div className="flex gap-2 items-start mb-4">
          <span
            className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white text-[11px] font-bold"
            style={{ background: "#06c755" }}
          >
            พร้
          </span>
          <div className="max-w-[252px]">
            <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-3">
              <p className="text-[12px] font-bold flex items-center gap-1.5 text-[#15803d]">
                <Icon name="check" size={14} /> ขอบคุณสำหรับคำตอบค่ะ
              </p>
              <p className="text-[11.5px] leading-relaxed text-[#64748b] mt-1.5">
                เนื่องจากท่านแจ้งว่า <strong className="text-[#b91c1c]">พบลูกน้ำ</strong> รอบบ้าน
                ระบบได้แจ้ง อสม. ประจำหมู่บ้าน (นางสมพร ดีใจ) ให้เข้าเยี่ยมบ้านท่านภายใน 2 วัน
                พร้อมนำทรายอะเบทไปให้ค่ะ
              </p>
              <div className="h-px bg-[#e2e8f0] my-2.5" />
              <div className="grid gap-1.5">
                {[
                  ["ดูวิธีกำจัดลูกน้ำ", "heart"],
                  ["ประเมินอาการตนเอง", "clipboard"],
                  ["ค้นหาสถานพยาบาลใกล้ฉัน", "pin"],
                ].map(([t, ic]) => (
                  <button
                    key={String(t)}
                    className="w-full rounded-lg py-2 text-[11.5px] font-semibold border border-[#e2e8f0] text-[#334155] flex items-center justify-center gap-1.5"
                  >
                    <Icon name={ic as "pin"} size={13} /> {t}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-white/85 mt-1">10:22</p>
          </div>
        </div>

        {/* previous, already answered */}
        <p className="text-center text-[11px] text-white/95 font-semibold my-4">เมื่อวาน</p>
        <div className="flex gap-2 items-start mb-4">
          <span
            className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white text-[11px] font-bold"
            style={{ background: "#06c755" }}
          >
            พร้
          </span>
          <div>
            <PublicFlexCard width={266} answered />
            <p className="text-[10px] text-white/85 mt-1">09:30</p>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <Link
            href="/flex"
            className="chip"
            style={{ background: "#ffffffe6", color: "#0f766e" }}
          >
            <Icon name="arrowLeft" size={12} /> ดู Flex สำหรับเจ้าหน้าที่
          </Link>
        </div>
      </div>

      {/* chat input bar */}
      <div className="sticky bottom-0 bg-surface border-t border-line-brd px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-faint">
            <Icon name="plus" size={20} />
          </span>
          <span className="text-faint">
            <Icon name="camera" size={20} />
          </span>
          <div className="flex-1 h-9 rounded-full bg-surface2 border border-line-brd flex items-center px-3.5">
            <span className="text-[12.5px] text-faint">Aa</span>
          </div>
          <span style={{ color: "var(--accent)" }}>
            <Icon name="mic" size={20} />
          </span>
        </div>
      </div>
    </PhoneShell>
  );
}
