import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";

const TRANSCRIPT = [
  { t: "00:04", who: "เจ้าหน้าที่", text: "สวัสดีครับคุณสมชาย วันนี้ขอสอบถามอาการและประวัติการเดินทางนะครับ" },
  { t: "00:11", who: "ผู้ป่วย", text: "ครับ เริ่มมีไข้ตั้งแต่วันเสาร์ที่ 22 ครับ ไข้สูงมาก กินยาลดไข้แล้วก็ยังไม่ลด" },
  { t: "00:26", who: "ผู้ป่วย", text: "ปวดหัวมาก ปวดกระบอกตาด้วย แล้วก็ปวดเมื่อยตามตัว" },
  { t: "00:41", who: "เจ้าหน้าที่", text: "ช่วง 2 สัปดาห์ที่ผ่านมาได้เดินทางไปไหนบ้างไหมครับ" },
  { t: "00:47", who: "ผู้ป่วย", text: "ไม่ได้ไปไหนไกลครับ ทำงานก่อสร้างแถวอรัญญิก ไป-กลับบ้านทุกวัน" },
  { t: "01:05", who: "เจ้าหน้าที่", text: "ที่ทำงานหรือที่บ้าน มีใครมีไข้แบบเดียวกันไหมครับ" },
  { t: "01:12", who: "ผู้ป่วย", text: "มีเพื่อนร่วมงานคนหนึ่งครับ ไข้มา 2 วันแล้ว ยังไม่ได้ไปหาหมอ" },
  { t: "01:31", who: "เจ้าหน้าที่", text: "รอบบ้านมีน้ำขังหรือภาชนะเก็บน้ำไหมครับ" },
  { t: "01:38", who: "ผู้ป่วย", text: "มีโอ่งน้ำหลังบ้าน 2 ใบครับ แล้วก็มียางรถยนต์เก่ากองอยู่ข้างบ้าน" },
];

export default function VoicePage() {
  return (
    <>
      <PageHead
        title="สรุปการสนทนากับผู้ป่วยด้วยเสียง"
        desc="เคส PLK-6809-0142 · บันทึกเสียงและถอดความอัตโนมัติ แล้วสรุปเข้าช่องของแบบ ร.507"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ดาวน์โหลดถอดความ
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="check" size={15} /> นำผลสรุปเข้าแบบฟอร์ม
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-4 min-w-0">
          {/* recorder */}
          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-5">
              <button
                className="grid place-items-center rounded-full text-white shrink-0"
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--danger)",
                  boxShadow: "0 0 0 8px #dc262622",
                }}
              >
                <span className="w-5 h-5 rounded-[4px] bg-white" />
              </button>
              <div className="flex-1 min-w-[220px]">
                <div className="flex items-center justify-between mb-2">
                  <Chip bg="#fee2e2" fg="#b91c1c" dot>
                    กำลังบันทึกเสียง
                  </Chip>
                  <span className="text-[13px] font-bold tabular-nums">02:14 / 15:00</span>
                </div>
                {/* waveform */}
                <svg viewBox="0 0 300 44" preserveAspectRatio="none" className="w-full h-11">
                  {Array.from({ length: 100 }).map((_, i) => {
                    const seed = Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
                    const h = 4 + seed * 34;
                    const active = i < 62;
                    return (
                      <rect
                        key={i}
                        x={i * 3}
                        y={22 - h / 2}
                        width="1.8"
                        height={h}
                        rx="0.9"
                        fill={active ? "var(--accent)" : "#cbd5e1"}
                      />
                    );
                  })}
                </svg>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11.5px] text-muted">ไมค์: Headset USB · คุณภาพ 48kHz</span>
                  <span className="flex-1" />
                  <button className="btn btn-sm">หยุดชั่วคราว</button>
                  <button className="btn btn-sm">บันทึกเสร็จสิ้น</button>
                </div>
              </div>
            </div>
          </div>

          {/* transcript */}
          <Card
            title="ถอดความอัตโนมัติ (Speech to Text · ภาษาไทย)"
            desc="ระบบแยกเสียงเจ้าหน้าที่และผู้ป่วยโดยอัตโนมัติ · ความแม่นยำโดยประมาณ 94%"
            icon="wave"
            action={<Chip bg="#dcfce7" fg="#15803d" dot>ถอดความแบบเรียลไทม์</Chip>}
          >
            <div className="grid gap-3 max-h-[420px] overflow-y-auto nice pr-1">
              {TRANSCRIPT.map((l, i) => {
                const staff = l.who === "เจ้าหน้าที่";
                return (
                  <div key={i} className={`flex gap-3 ${staff ? "" : "flex-row-reverse"}`}>
                    <span
                      className="grid place-items-center rounded-full text-[11px] font-bold shrink-0 h-7 w-7"
                      style={{
                        background: staff ? "#ccfbf1" : "#e2e8f0",
                        color: staff ? "#0d9488" : "#475569",
                      }}
                    >
                      {staff ? "จนท" : "ผป"}
                    </span>
                    <div className={`max-w-[76%] ${staff ? "" : "text-right"}`}>
                      <p
                        className="rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed inline-block text-left"
                        style={{
                          background: staff ? "#f0fdfa" : "#fff",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {l.text}
                      </p>
                      <p className="text-[10.5px] text-faint mt-1 tabular-nums">{l.t}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* AI summary */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="สรุปโดย AI"
            desc="สร้างจากบทถอดความ · ตรวจทานก่อนบันทึกทุกครั้ง"
            icon="sparkles"
            action={
              <button className="btn btn-sm">
                <Icon name="sparkles" size={14} /> สร้างใหม่
              </button>
            }
          >
            <div
              className="rounded-xl p-3.5 text-[13px] leading-relaxed"
              style={{ background: "#f5f3ff", border: "1px solid #ddd6fe" }}
            >
              ผู้ป่วยชายไทย อายุ 34 ปี เริ่มมีไข้สูงเฉียบพลันตั้งแต่ 22 ส.ค. 2569 ร่วมกับปวดศีรษะ
              ปวดกระบอกตา และปวดเมื่อยกล้ามเนื้อ กินยาลดไข้แล้วอาการไม่ดีขึ้น
              ไม่มีประวัติเดินทางออกนอกจังหวัด ทำงานไซต์ก่อสร้างย่านอรัญญิก
              <mark className="bg-[#fde68a] px-0.5 rounded">
                พบเพื่อนร่วมงาน 1 รายมีไข้ 2 วัน ยังไม่พบแพทย์
              </mark>{" "}
              สภาพแวดล้อมรอบบ้านมีโอ่งน้ำ 2 ใบและกองยางรถยนต์เก่า
              เข้าได้กับแหล่งเพาะพันธุ์ยุงลาย
            </div>

            <p className="text-[11px] font-bold text-faint uppercase tracking-wide mt-4 mb-2">
              ข้อมูลที่ AI ดึงเข้าแบบฟอร์มได้
            </p>
            <div className="grid gap-2">
              {[
                ["วันเริ่มป่วย", "22 ส.ค. 2569"],
                ["อาชีพ", "รับจ้างก่อสร้าง"],
                ["ประวัติเดินทาง", "ในจังหวัด"],
                ["ผู้ป่วยอาการคล้ายกัน", "มี 1 ราย (ที่ทำงาน)"],
                ["สภาพแวดล้อม", "ภาชนะขังน้ำ, ยางรถยนต์"],
              ].map(([k, v]) => (
                <label
                  key={k}
                  className="flex items-center gap-2.5 rounded-lg border border-line-brd p-2.5"
                >
                  <span
                    className="grid place-items-center rounded w-[17px] h-[17px] shrink-0 text-white"
                    style={{ background: "var(--accent)" }}
                  >
                    <Icon name="check" size={11} />
                  </span>
                  <span className="text-[12px] text-muted flex-1">{k}</span>
                  <span className="text-[12.5px] font-semibold text-right">{v}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card title="คำเตือนที่ AI ตรวจพบ" icon="bell">
            <div className="grid gap-2.5">
              {[
                ["พบผู้สัมผัสที่มีอาการคล้ายกัน — ควรแจ้งทีมสอบสวนภายใน 3 ชม.", "#fee2e2", "#b91c1c"],
                ["ผู้ป่วยระบุแหล่งเพาะพันธุ์ยุงลาย 2 จุด — ควรส่งทีมสำรวจลูกน้ำ", "#ffedd5", "#c2410c"],
                ["ยังไม่พบข้อมูลพิกัดที่อยู่ผู้ป่วยในบทสนทนา", "#e0f2fe", "#0369a1"],
              ].map(([t, bg, fg]) => (
                <p
                  key={t}
                  className="rounded-lg px-3 py-2.5 text-[12.5px] leading-snug"
                  style={{ background: bg, color: fg }}
                >
                  {t}
                </p>
              ))}
            </div>
          </Card>

          <Card title="ไฟล์เสียงของเคสนี้" icon="mic">
            <ul className="grid gap-3">
              {[
                ["สนทนาผู้ป่วย ครั้งที่ 1", "26 ส.ค. 14:22", "08:41", 100],
                ["สอบถามญาติผู้ป่วย", "26 ส.ค. 15:05", "03:12", 100],
                ["สนทนาผู้ป่วย ครั้งที่ 2 (กำลังอัด)", "27 ส.ค. 09:39", "02:14", 62],
              ].map(([n, d, len, p]) => (
                <li key={String(n)}>
                  <div className="flex items-center gap-2.5">
                    <button
                      className="grid place-items-center rounded-full w-8 h-8 shrink-0 text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      <Icon name="wave" size={15} />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium truncate">{n}</p>
                      <p className="text-[11px] text-faint tabular-nums">
                        {d} · {len} นาที
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 ml-[42px]">
                    <Progress value={Number(p)} height={4} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
