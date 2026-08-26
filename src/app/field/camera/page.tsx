import PhoneShell, { Sheet } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip } from "@/components/ui";
import { FIELD_TABS } from "../tabs";

const SHOTS = [
  { label: "โอ่งน้ำหลังบ้าน", time: "10:14", tag: "แหล่งเพาะพันธุ์", c1: "#7c3f1d", c2: "#c2703c" },
  { label: "กองยางรถยนต์", time: "10:16", tag: "แหล่งเพาะพันธุ์", c1: "#1f2937", c2: "#4b5563" },
  { label: "บ้านผู้ป่วย", time: "10:09", tag: "สถานที่", c1: "#0f766e", c2: "#5eead4" },
  { label: "ลูกน้ำในภาชนะ", time: "10:18", tag: "ตัวอย่าง", c1: "#1e3a8a", c2: "#60a5fa" },
  { label: "พ่นหมอกควัน", time: "11:02", tag: "มาตรการ", c1: "#525252", c2: "#a3a3a3" },
  { label: "ให้ความรู้ชุมชน", time: "11:24", tag: "กิจกรรม", c1: "#7c2d12", c2: "#fb923c" },
];

export default function CameraPage() {
  return (
    <PhoneShell
      url="cdc.plkhealth.go.th/field/camera"
      title="ถ่ายรูปหลักฐาน"
      subtitle="PLK-6809-0142 · 6 รูป"
      caption="ระบบงานภาคสนาม · Web Mobile · กล้องถ่ายภาพ"
      tabs={FIELD_TABS}
    >
      {/* viewfinder */}
      <div className="relative bg-black" style={{ height: 300 }}>
        <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="vf" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#4a5b6a" />
              <stop offset="55%" stopColor="#7a6a52" />
              <stop offset="100%" stopColor="#3d3226" />
            </linearGradient>
          </defs>
          <rect width="300" height="300" fill="url(#vf)" />
          <ellipse cx="150" cy="196" rx="86" ry="70" fill="#8b5a35" />
          <ellipse cx="150" cy="176" rx="70" ry="46" fill="#2b3a45" />
          <ellipse cx="150" cy="172" rx="62" ry="38" fill="#3f5b63" opacity=".9" />
          <path d="M96 200 q54 26 108 0" stroke="#00000033" strokeWidth="10" fill="none" />
          {[
            [128, 168],
            [150, 178],
            [170, 166],
            [140, 186],
            [162, 184],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y} q4 -4 8 0 q-4 5 -8 0`}
              fill="#0f172a"
              opacity=".8"
            />
          ))}
        </svg>

        {/* overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-6 border border-white/25" />
          {[
            "top-6 left-6 border-t-2 border-l-2",
            "top-6 right-6 border-t-2 border-r-2",
            "bottom-6 left-6 border-b-2 border-l-2",
            "bottom-6 right-6 border-b-2 border-r-2",
          ].map((c) => (
            <span key={c} className={`absolute w-6 h-6 border-white ${c}`} />
          ))}
          <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
            <span className="chip" style={{ background: "#00000066", color: "#fff" }}>
              <Icon name="pin" size={11} /> 16.8211, 100.2659
            </span>
            <span className="chip" style={{ background: "#00000066", color: "#fff" }}>
              27 ส.ค. 10:18
            </span>
          </div>
          <p className="absolute bottom-9 left-0 right-0 text-center text-[11.5px] text-white/85">
            ระบบฝังพิกัดและเวลาลงบนภาพอัตโนมัติ (Geo-stamp)
          </p>
        </div>
      </div>

      {/* shutter */}
      <div className="bg-[#111] py-4 flex items-center justify-around">
        <button className="grid place-items-center w-11 h-11 rounded-xl bg-white/10 text-white">
          <Icon name="image" size={20} />
        </button>
        <button className="grid place-items-center w-[68px] h-[68px] rounded-full border-4 border-white/80">
          <span className="w-[52px] h-[52px] rounded-full bg-white" />
        </button>
        <button className="grid place-items-center w-11 h-11 rounded-xl bg-white/10 text-white">
          <Icon name="settings" size={20} />
        </button>
      </div>

      <div className="p-4">
        <Sheet
          title="รูปในเคสนี้ (6)"
          action={
            <Chip bg="#fef3c7" fg="#b45309">
              รอซิงก์ 2 รูป
            </Chip>
          }
        >
          <div className="grid grid-cols-3 gap-2">
            {SHOTS.map((s, i) => (
              <figure key={s.label} className="rounded-xl overflow-hidden border border-line-brd">
                <div className="relative" style={{ aspectRatio: "1/1" }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={s.c1} />
                        <stop offset="100%" stopColor={s.c2} />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="100" fill={`url(#g${i})`} />
                    <circle cx="50" cy="56" r="24" fill="#ffffff18" />
                    <path d="M0 78 q26 -14 50 0 t50 -4 v26 H0Z" fill="#00000033" />
                  </svg>
                  {i > 3 && (
                    <span className="absolute top-1 right-1 w-4 h-4 grid place-items-center rounded-full bg-[#f59e0b] text-white">
                      <Icon name="clock" size={10} />
                    </span>
                  )}
                </div>
                <figcaption className="px-2 py-1.5">
                  <p className="text-[10.5px] font-semibold truncate">{s.label}</p>
                  <p className="text-[9.5px] text-faint">{s.time} น.</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Sheet>

        <Sheet title="ป้ายกำกับรูปที่ถ่าย">
          <div className="flex flex-wrap gap-2">
            {["แหล่งเพาะพันธุ์", "สถานที่", "ตัวอย่าง", "มาตรการ", "กิจกรรม", "ผู้สัมผัส"].map(
              (t, i) => (
                <button
                  key={t}
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium border"
                  style={{
                    background: i === 0 ? "var(--accent)" : "#fff",
                    color: i === 0 ? "#fff" : "var(--muted)",
                    borderColor: i === 0 ? "transparent" : "var(--border)",
                  }}
                >
                  {t}
                </button>
              ),
            )}
          </div>
          <p className="sub mt-3">
            รูปทั้งหมดจะถูกแนบเข้าเคสและส่งเข้าคลังเอกสารกลางเมื่อออนไลน์
          </p>
        </Sheet>
      </div>
    </PhoneShell>
  );
}
