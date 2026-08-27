import PhoneShell, { Sheet, Row } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip } from "@/components/ui";
import { FIELD_TABS } from "../tabs";

const POINTS = [
  { n: "บ้านผู้ป่วยดัชนี", t: "10:09", ll: "16.82110, 100.26590", acc: "±4 ม.", c: "#dc2626" },
  { n: "แหล่งเพาะพันธุ์ ที่ 1 (โอ่งน้ำ)", t: "10:14", ll: "16.82126, 100.26612", acc: "±5 ม.", c: "#ea580c" },
  { n: "แหล่งเพาะพันธุ์ ที่ 2 (กองยาง)", t: "10:16", ll: "16.82098, 100.26551", acc: "±6 ม.", c: "#ea580c" },
];

export default function GpsPage() {
  return (
    <PhoneShell
      url="cdc.plkhealth.go.th/field/gps"
      title="เก็บพิกัดภาคสนาม"
      subtitle="PLK-6809-0142 · 3 จุด"
      caption="ระบบงานภาคสนาม · Web Mobile · เก็บพิกัด GPS"
      tabs={FIELD_TABS}
    >
      {/* map */}
      <div className="relative" style={{ height: 330 }}>
        <svg viewBox="0 0 320 330" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="320" height="330" fill="#eaf0f2" />
          {/* blocks */}
          {[
            [10, 20, 90, 70],
            [116, 14, 78, 60],
            [212, 22, 96, 74],
            [14, 110, 82, 66],
            [116, 96, 84, 74],
            [216, 116, 92, 60],
            [10, 196, 96, 70],
            [122, 190, 74, 82],
            [212, 192, 96, 78],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#dfe7ea" />
          ))}
          {/* river */}
          <path d="M-10 250 q80 -22 150 6 t190 -18" stroke="#a9c7e0" strokeWidth="20" fill="none" />
          {/* roads */}
          <path d="M106 0 V330" stroke="#fff" strokeWidth="10" />
          <path d="M204 0 V330" stroke="#fff" strokeWidth="8" />
          <path d="M0 100 H320" stroke="#fff" strokeWidth="9" />
          <path d="M0 182 H320" stroke="#fff" strokeWidth="7" />

          {/* control radius */}
          <circle cx="160" cy="150" r="86" fill="#dc262614" stroke="#dc2626" strokeWidth="1.4" strokeDasharray="6 4" />
          <text x="160" y="76" textAnchor="middle" fontSize="9" fill="#b91c1c" fontWeight="600">
            รัศมีควบคุมโรค 100 ม.
          </text>

          {/* accuracy circle */}
          <circle cx="160" cy="150" r="26" fill="#2563eb1f" />
          <circle cx="160" cy="150" r="9" fill="#2563eb" stroke="#fff" strokeWidth="3" />

          {/* saved pins */}
          {[
            [190, 122, "#ea580c"],
            [128, 178, "#ea580c"],
            [160, 150, "#dc2626"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <path
                d={`M${x} ${Number(y) - 4} c-8 0 -13 6 -13 13 0 9 13 21 13 21 s13 -12 13 -21 c0 -7 -5 -13 -13 -13Z`}
                fill={String(c)}
                stroke="#fff"
                strokeWidth="1.8"
              />
              <circle cx={x} cy={Number(y) + 8} r="4" fill="#fff" />
            </g>
          ))}
        </svg>

        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <span className="chip" style={{ background: "#ffffffe6", color: "#0f172a" }}>
            <Icon name="pin" size={11} /> GPS แม่นยำ ±4 ม.
          </span>
          <span className="chip" style={{ background: "#ffffffe6", color: "#15803d" }}>
            ดาวเทียม 11 ดวง
          </span>
        </div>

        <div className="absolute right-3 bottom-3 grid gap-2">
          {(["plus", "map", "settings"] as const).map((ic) => (
            <button
              key={ic}
              className="grid place-items-center w-9 h-9 rounded-xl bg-white shadow-sm border border-line-brd text-muted"
            >
              <Icon name={ic} size={17} />
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button
          className="btn btn-primary w-full mb-3"
          style={{ paddingTop: 13, paddingBottom: 13 }}
        >
          <Icon name="pin" size={18} /> ปักหมุดตำแหน่งปัจจุบัน
        </button>

        <Sheet title="ตำแหน่งปัจจุบัน" action={<Chip bg="#dcfce7" fg="#15803d" dot>ล็อกสัญญาณแล้ว</Chip>}>
          <Row label="ละติจูด" value="16.821103" icon="pin" />
          <Row label="ลองจิจูด" value="100.265904" icon="pin" />
          <Row label="ความแม่นยำ" value="±4 เมตร" icon="shield" />
          <Row label="ที่อยู่โดยประมาณ" value="ม.4 ต.บางกระทุ่ม อ.บางกระทุ่ม" icon="home" />
          <Row label="เวลา" value="27 ส.ค. 2569 10:22 น." icon="clock" />
        </Sheet>

        <Sheet title="จุดที่บันทึกไว้ (3)">
          {POINTS.map((p) => (
            <div
              key={p.n}
              className="flex items-start gap-3 py-3 border-b border-line-brd last:border-0"
            >
              <span
                className="grid place-items-center rounded-lg w-8 h-8 shrink-0 text-white"
                style={{ background: p.c }}
              >
                <Icon name="pin" size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold">{p.n}</p>
                <p className="text-[11px] text-muted font-mono mt-0.5">{p.ll}</p>
                <p className="text-[10.5px] text-faint mt-0.5">
                  {p.t} น. · ความแม่นยำ {p.acc}
                </p>
              </div>
              <button className="text-faint">
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          ))}
        </Sheet>

        <Sheet title="ประเภทจุดที่จะปัก">
          <div className="grid grid-cols-2 gap-2">
            {[
              "บ้านผู้ป่วย",
              "แหล่งเพาะพันธุ์",
              "บ้านผู้สัมผัส",
              "จุดพ่นหมอกควัน",
              "โรงเรียน/ศูนย์เด็ก",
              "แหล่งน้ำสาธารณะ",
            ].map((t, i) => (
              <button
                key={t}
                className="py-2.5 rounded-xl text-[12.5px] font-medium border"
                style={{
                  background: i === 1 ? "var(--accent)" : "#fff",
                  color: i === 1 ? "#fff" : "var(--muted)",
                  borderColor: i === 1 ? "transparent" : "var(--border)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </Sheet>
      </div>
    </PhoneShell>
  );
}
