import { Icon } from "./icons";

export default function FlexCard({
  width = 300,
  acked = false,
}: {
  width?: number;
  acked?: boolean;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white shadow-[0_2px_10px_rgba(15,23,42,.12)]"
      style={{ width }}
    >
      {/* hero */}
      <div
        className="px-4 py-3 text-white"
        style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626 60%,#f97316)" }}
      >
        <div className="flex items-center gap-2">
          <Icon name="shield" size={16} />
          <span className="text-[11px] font-bold tracking-wide">
            แจ้งเตือนสอบสวนควบคุมโรค
          </span>
        </div>
        <p className="text-[15px] font-bold mt-1.5 leading-tight">
          ไข้เลือดออก · เร่งด่วน
        </p>
        <p className="text-[11px] opacity-90 mt-0.5">
          สสจ.พิษณุโลก · แจ้งภายใน 3 ชั่วโมง
        </p>
      </div>

      <div className="px-4 py-3.5">
        <p className="text-[13px] font-bold leading-snug">
          เคสใหม่ PLK-6809-0142
        </p>
        <p className="text-[11.5px] text-[#64748b] mt-0.5">
          รพ.พุทธชินราช พิษณุโลก
        </p>

        <dl className="mt-3 grid gap-1.5">
          {[
            ["ผู้ป่วย", "ชาย 34 ปี"],
            ["วินิจฉัย", "DHF Grade II"],
            ["พื้นที่", "ม.4 ต.บ้านคลอง อ.เมือง"],
            ["วันเริ่มป่วย", "22 ส.ค. 2569"],
            ["ผู้สัมผัสมีอาการ", "1 ราย"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2 text-[11.5px]">
              <dt className="text-[#94a3b8] w-[76px] shrink-0">{k}</dt>
              <dd className="font-medium text-[#0f172a] flex-1">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="h-px bg-[#e2e8f0] my-3" />

        <div className="grid gap-2">
          <button
            className="w-full rounded-lg py-2.5 text-[12.5px] font-bold text-white flex items-center justify-center gap-1.5"
            style={{ background: acked ? "#94a3b8" : "#06c755" }}
            disabled={acked}
          >
            <Icon name="check" size={15} />
            {acked ? "รับทราบแล้ว · 09:44 น." : "กดรับทราบ"}
          </button>
          <button className="w-full rounded-lg py-2.5 text-[12.5px] font-bold border border-[#e2e8f0] text-[#334155] flex items-center justify-center gap-1.5">
            <Icon name="clipboard" size={15} /> เปิดระบบงานภาคสนาม
          </button>
          <button className="w-full rounded-lg py-2.5 text-[12.5px] font-bold border border-[#e2e8f0] text-[#334155] flex items-center justify-center gap-1.5">
            <Icon name="pin" size={15} /> ดูพิกัดบนแผนที่
          </button>
        </div>
      </div>

      {/* footer: ชื่อ / ตำแหน่ง / หน่วยงานผู้ส่ง */}
      <div className="px-4 pb-3.5 pt-2.5 border-t border-[#e2e8f0] flex items-start gap-2.5">
        <span
          className="grid place-items-center rounded-full w-7 h-7 shrink-0 text-[11px] font-bold"
          style={{ background: "#fee2e2", color: "#b91c1c" }}
        >
          น
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10.5px] text-[#94a3b8]">ผู้ส่ง</span>
          <span className="block text-[11.5px] font-bold text-[#0f172a] leading-tight">
            นางนภัสสร ชัยวัฒน์
          </span>
          <span className="block text-[10.5px] text-[#64748b] leading-tight">
            นักสาธารณสุขชำนาญการ · รพ.พุทธชินราช พิษณุโลก
          </span>
        </span>
      </div>
    </div>
  );
}
