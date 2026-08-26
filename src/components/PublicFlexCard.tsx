import { Icon } from "./icons";

/** Flex Message หมอพร้อม สำหรับ "ประชาชน" — กดรับทราบ + ตอบคำถามบนการ์ด */
export default function PublicFlexCard({
  width = 288,
  answered = false,
}: {
  width?: number;
  answered?: boolean;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white shadow-[0_2px_10px_rgba(15,23,42,.12)]"
      style={{ width }}
    >
      {/* hero illustration */}
      <div className="relative" style={{ height: 108 }}>
        <svg viewBox="0 0 300 108" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pubhero" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="60%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <rect width="300" height="108" fill="url(#pubhero)" />
          <circle cx="258" cy="26" r="46" fill="#ffffff14" />
          <circle cx="34" cy="94" r="40" fill="#00000014" />
          {/* บ้าน + ยุง */}
          <g transform="translate(20,58) scale(0.62)" opacity=".55">
            <path d="M0 30 L20 12 L40 30 V52 H0Z" fill="#ffffff2e" />
            <rect x="14" y="36" width="12" height="16" rx="1.5" fill="#ffffff4d" />
          </g>
          <g transform="translate(206,44)" opacity=".85">
            <ellipse cx="0" cy="0" rx="7" ry="4" fill="#ffffff" />
            <path d="M-6 -3 q-10 -9 -16 -4 q7 5 16 4Z" fill="#ffffff99" />
            <path d="M6 -3 q10 -9 16 -4 q-7 5 -16 4Z" fill="#ffffff99" />
            <path d="M7 1 l11 5 M7 2 l10 8" stroke="#ffffff" strokeWidth="1.4" />
          </g>
          <text x="20" y="28" fontSize="11" fill="#ccfbf1" fontWeight="700">
            สสจ.พิษณุโลก · รพ.สต.บ้านคลอง
          </text>
          <text x="20" y="88" fontSize="16" fill="#ffffff" fontWeight="800">
            แจ้งเตือนพื้นที่ระบาด
          </text>
        </svg>
      </div>

      <div className="px-4 py-3.5">
        <p className="text-[13.5px] font-bold leading-snug text-[#0f172a]">
          พื้นที่ของท่านพบผู้ป่วยไข้เลือดออก 6 ราย
        </p>
        <p className="text-[11.5px] text-[#64748b] mt-1 leading-relaxed">
          ม.4 บ้านคลองใหม่ ต.บ้านคลอง · ข้อมูล ณ 27 ส.ค. 2569
        </p>

        <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: "#f0fdfa" }}>
          <p className="text-[11px] font-bold text-[#0f766e] mb-1.5">3 เก็บ ป้องกัน 3 โรค</p>
          {["เก็บบ้านให้ปลอดโปร่ง", "เก็บขยะ ไม่ให้มีน้ำขัง", "เก็บน้ำ ปิดฝาให้มิดชิด"].map((t) => (
            <p key={t} className="flex items-start gap-1.5 text-[11px] text-[#134e4a] leading-relaxed">
              <span className="mt-[3px] shrink-0">
                <Icon name="check" size={10} />
              </span>
              {t}
            </p>
          ))}
        </div>

        {/* กดรับทราบ */}
        <button
          className="w-full rounded-lg py-2.5 text-[12.5px] font-bold text-white flex items-center justify-center gap-1.5 mt-3"
          style={{ background: answered ? "#94a3b8" : "#06c755" }}
          disabled={answered}
        >
          <Icon name="check" size={15} />
          {answered ? "รับทราบแล้ว · 10:22 น." : "กดรับทราบ"}
        </button>

        <div className="h-px bg-[#e2e8f0] my-3" />

        {/* คำถามบนการ์ด */}
        <p className="text-[11px] font-bold text-[#334155] mb-2 flex items-center gap-1.5">
          <Icon name="clipboard" size={13} /> ช่วยตอบคำถามสั้นๆ 2 ข้อ
        </p>

        <div className="grid gap-3">
          <div>
            <p className="text-[11.5px] text-[#475569] mb-1.5 leading-snug">
              1. ตอนนี้มีคนในบ้านท่านมีไข้หรือไม่?
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {["มี", "ไม่มี"].map((o, i) => {
                const picked = answered && i === 1;
                return (
                  <button
                    key={o}
                    className="rounded-lg py-2 text-[11.5px] font-semibold border"
                    style={{
                      background: picked ? "#06c755" : "#fff",
                      color: picked ? "#fff" : "#334155",
                      borderColor: picked ? "transparent" : "#e2e8f0",
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11.5px] text-[#475569] mb-1.5 leading-snug">
              2. สัปดาห์นี้ท่านสำรวจลูกน้ำรอบบ้านแล้วหรือยัง?
            </p>
            <div className="grid gap-1.5">
              {["สำรวจแล้ว ไม่พบลูกน้ำ", "สำรวจแล้ว พบลูกน้ำ", "ยังไม่ได้สำรวจ"].map((o, i) => {
                const picked = answered && i === 1;
                return (
                  <button
                    key={o}
                    className="rounded-lg py-2 text-[11.5px] font-semibold border"
                    style={{
                      background: picked ? "#06c755" : "#fff",
                      color: picked ? "#fff" : "#334155",
                      borderColor: picked ? "transparent" : "#e2e8f0",
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="px-4 pb-2.5 text-[10px] text-[#94a3b8]">
        คำตอบของท่านช่วยให้เจ้าหน้าที่วางแผนควบคุมโรคได้ตรงจุด · สายด่วน 1422
      </p>

      {/* footer: ชื่อ / ตำแหน่ง / หน่วยงานผู้ส่ง */}
      <div className="px-4 pb-3.5 pt-2.5 border-t border-[#e2e8f0] flex items-start gap-2.5">
        <span
          className="grid place-items-center rounded-full w-7 h-7 shrink-0 text-[11px] font-bold"
          style={{ background: "#d1fae5", color: "#047857" }}
        >
          ว
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10.5px] text-[#94a3b8]">ผู้ส่ง</span>
          <span className="block text-[11.5px] font-bold text-[#0f172a] leading-tight">
            นายวิรัตน์ สุขเกษม
          </span>
          <span className="block text-[10.5px] text-[#64748b] leading-tight">
            ผอ.รพ.สต.บ้านคลอง · สสอ.เมืองพิษณุโลก
          </span>
        </span>
      </div>
    </div>
  );
}
