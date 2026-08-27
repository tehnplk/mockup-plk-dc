import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";
import FlexCard from "@/components/FlexCard";
import { Icon } from "@/components/icons";

export default function FlexChat() {
  return (
    <PhoneShell
      accent="line"
      title="หมอพร้อม"
      subtitle="Official Account · มุมมองเจ้าหน้าที่"
      caption="Flex Message หมอพร้อม สำหรับเจ้าหน้าที่ · Line OA"
      right={
        <div className="flex gap-3 opacity-90">
          <Icon name="search" size={18} />
          <Icon name="settings" size={18} />
        </div>
      }
    >
      <div className="min-h-full px-3.5 py-4" style={{ background: "#8ab4d8" }}>
        <p className="text-center text-[11px] text-white/95 font-semibold mb-4">
          วันนี้
        </p>

        {/* system text bubble */}
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
                เรียน คุณกิตติศักดิ์ แสงเพชร — มีเคสสอบสวนโรคใหม่ที่ต้องดำเนินการ
                กรุณากดรับทราบภายใน 3 ชั่วโมง
              </p>
            </div>
            <p className="text-[10px] text-white/85 mt-1">09:41</p>
          </div>
        </div>

        {/* flex bubble — pending */}
        <div className="flex gap-2 items-start mb-4">
          <span className="w-8 shrink-0" />
          <div>
            <FlexCard width={268} />
            <p className="text-[10px] text-white/85 mt-1">09:41</p>
          </div>
        </div>

        {/* acknowledged reply */}
        <div className="flex justify-end mb-1">
          <div className="max-w-[220px]">
            <div
              className="rounded-2xl rounded-br-sm px-3.5 py-2.5"
              style={{ background: "#c8e05b" }}
            >
              <p className="text-[12.5px] text-[#1f2937]">รับทราบครับ กำลังประสานทีมลงพื้นที่</p>
            </div>
            <p className="text-[10px] text-white/85 mt-1 text-right">09:44 · อ่านแล้ว</p>
          </div>
        </div>

        {/* confirmation */}
        <div className="flex gap-2 items-start mt-4 mb-4">
          <span
            className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white text-[11px] font-bold"
            style={{ background: "#06c755" }}
          >
            พร้
          </span>
          <div className="max-w-[250px]">
            <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-3">
              <p className="text-[12px] font-bold flex items-center gap-1.5 text-[#15803d]">
                <Icon name="check" size={14} /> บันทึกการรับทราบแล้ว
              </p>
              <p className="text-[11.5px] leading-relaxed text-[#64748b] mt-1.5">
                เวลา 09:44 น. · ระบบได้แจ้งศูนย์ข้อมูลกลาง สสจ.พิษณุโลก
                และเปิดสิทธิ์ให้ท่านเข้าระบบงานภาคสนามเพื่อรับเคสนี้แล้ว
              </p>
              <div className="h-px bg-[#e2e8f0] my-2.5" />
              <Link
                href="/field/case"
                className="w-full rounded-lg py-2.5 text-[12.5px] font-bold text-white flex items-center justify-center gap-1.5"
                style={{ background: "#06c755" }}
              >
                <Icon name="clipboard" size={15} /> เปิดระบบงานภาคสนาม
              </Link>
            </div>
            <p className="text-[10px] text-white/85 mt-1">09:44</p>
          </div>
        </div>

        {/* second flex, already acked */}
        <p className="text-center text-[11px] text-white/95 font-semibold my-4">
          เมื่อวาน
        </p>
        <div className="flex gap-2 items-start mb-4">
          <span
            className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white text-[11px] font-bold"
            style={{ background: "#06c755" }}
          >
            พร้
          </span>
          <div>
            <FlexCard width={268} acked />
            <p className="text-[10px] text-white/85 mt-1">14:08</p>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <Link
            href="/flex/public"
            className="chip"
            style={{ background: "#ffffffe6", color: "#0f766e" }}
          >
            ดู Flex สำหรับประชาชน <Icon name="arrowRight" size={12} />
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
