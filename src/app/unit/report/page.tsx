import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISEASES } from "@/lib/mock";

const SOURCES = [
  ["อสม. แจ้งพบผู้ป่วยในหมู่บ้าน", "อสม. ประจำครัวเรือนรายงานเข้ามา", true],
  ["เจ้าหน้าที่ รพ.สต. พบขณะเยี่ยมบ้าน", "พบระหว่างออกเยี่ยมบ้าน/คัดกรอง", false],
  ["ผู้ป่วยมารับบริการที่ รพ.สต.", "มาตรวจที่ รพ.สต. โดยตรง", false],
  ["ประชาชนแจ้งผ่านไลน์หมอพร้อม", "จากการตอบคำถามบน Flex Message", false],
  ["โรงเรียน/ศูนย์เด็กเล็กแจ้ง", "พบเด็กป่วยหลายรายในสถานศึกษา", false],
];

const SENT = [
  {
    id: "RPT-6809-027",
    name: "ด.ช.ภูมิพัฒน์ แก้วมณี",
    disease: "มือ เท้า ปาก",
    color: "#059669",
    place: "ศูนย์เด็กเล็ก ม.7 บ้านท่าโรง",
    by: "อสม. นางวันดี ศรีทอง",
    sent: "27 ส.ค. 09:15",
    team: "ทีม SRRT เมือง-2",
    status: "ทีมรับเคสแล้ว",
    bg: "#dbeafe",
    fg: "#1d4ed8",
    progress: 30,
  },
  {
    id: "RPT-6809-024",
    name: "นางบุญเรือน สายทอง",
    disease: "ไข้เลือดออก",
    color: "#dc2626",
    place: "ม.4 บ้านคลองใหม่",
    by: "เยี่ยมบ้านโดย จนท. รพ.สต.",
    sent: "26 ส.ค. 14:40",
    team: "ทีม SRRT เมือง-1",
    status: "ลงพื้นที่แล้ว",
    bg: "#fef3c7",
    fg: "#b45309",
    progress: 62,
  },
  {
    id: "RPT-6809-019",
    name: "นายประเสริฐ อยู่ดี",
    disease: "เลปโตสไปโรซิส",
    color: "#ca8a04",
    place: "ม.2 บ้านคลองเหนือ",
    by: "อสม. นายบุญมา ทองแท้",
    sent: "24 ส.ค. 10:02",
    team: "ทีม CDCU จังหวัด",
    status: "ปิดเคสแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
    progress: 100,
  },
  {
    id: "RPT-6809-016",
    name: "ด.ญ.ชนิสรา พูนทรัพย์",
    disease: "ไข้เลือดออก",
    color: "#dc2626",
    place: "ม.4 บ้านคลองใหม่",
    by: "ประชาชนแจ้งผ่านหมอพร้อม",
    sent: "22 ส.ค. 16:28",
    team: "—",
    status: "ไม่เข้าเกณฑ์ ปิดเรื่อง",
    bg: "#f1f5f9",
    fg: "#475569",
    progress: 100,
  },
];

export default function AreaReport() {
  return (
    <>
      <PageHead
        title="แจ้งเคสที่พบในพื้นที่ไปยังทีมสอบสวน"
        desc="เมื่อหน่วยบริการหรือ อสม. พบผู้ป่วยเข้าเกณฑ์เฝ้าระวังในชุมชนโดยไม่ผ่านโรงพยาบาล แจ้งตรงไปยังโมดูลทีม SRRT/CDCU ได้ทันที"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการแจ้ง
            </button>
            <button className="btn btn-sm">บันทึกร่าง</button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งแจ้งทีมภาคสนาม
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="แจ้งเคสเดือนนี้" value={9} unit="เคส" icon="send" />
        <Stat label="ทีมรับเคสแล้ว" value={7} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="รอทีมรับ" value={1} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="เวลาเฉลี่ยกว่าทีมจะรับ" value="42" unit="นาที" icon="sparkles" tone="var(--info)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ขั้นตอนที่ 1 · แหล่งที่พบเคส"
            desc="ระบุว่าใครเป็นผู้พบและพบด้วยวิธีใด เพื่อให้ทีมภาคสนามประเมินความน่าเชื่อถือของข้อมูล"
            icon="users"
          >
            <div className="grid gap-2.5">
              {SOURCES.map(([t, d, on]) => (
                <label
                  key={String(t)}
                  className="flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer"
                  style={{
                    borderColor: on ? "var(--accent)" : "var(--border)",
                    background: on ? "color-mix(in srgb, var(--accent) 6%, #fff)" : "#fff",
                  }}
                >
                  <span
                    className="grid place-items-center rounded-full w-[18px] h-[18px] shrink-0 border-2 mt-0.5"
                    style={{ borderColor: on ? "var(--accent)" : "#cbd5e1" }}
                  >
                    {on && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold">{t}</span>
                    <span className="block text-[11.5px] text-muted mt-0.5">{d}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <span className="lbl">ชื่อผู้แจ้ง</span>
                <input className="inp" readOnly defaultValue="นางสมพร ดีใจ (อสม. ม.4)" />
              </div>
              <div>
                <span className="lbl">วัน–เวลาที่พบ</span>
                <input className="inp" readOnly defaultValue="27 ส.ค. 2569 08:40 น." />
              </div>
            </div>
          </Card>

          <Card
            title="ขั้นตอนที่ 2 · ข้อมูลผู้ป่วยที่พบ"
            desc="กรอกเท่าที่ทราบ ทีมภาคสนามจะไปเก็บข้อมูลเพิ่มเติมในพื้นที่"
            icon="clipboard"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="lbl">ชื่อ–สกุล</span>
                <input className="inp" readOnly defaultValue="ด.ช.ภูมิพัฒน์ แก้วมณี" />
              </div>
              <div>
                <span className="lbl">เลขบัตรประชาชน (ถ้าทราบ)</span>
                <input className="inp" readOnly defaultValue="1-6501-009••-••-4" />
              </div>
              <div>
                <span className="lbl">อายุ</span>
                <input className="inp" readOnly defaultValue="4 ปี" />
              </div>
              <div>
                <span className="lbl">เพศ</span>
                <div className="flex gap-2">
                  {["ชาย", "หญิง"].map((o, i) => (
                    <button
                      key={o}
                      className="flex-1 py-2 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: i === 0 ? "var(--accent)" : "#fff",
                        color: i === 0 ? "#fff" : "var(--muted)",
                        borderColor: i === 0 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">ที่อยู่ที่พบผู้ป่วย</span>
                <input
                  className="inp"
                  readOnly
                  defaultValue="19 หมู่ 7 บ้านท่าโรง ต.บ้านคลอง อ.เมืองพิษณุโลก (ศูนย์เด็กเล็กบ้านท่าโรง)"
                />
              </div>
              <div>
                <span className="lbl">วันเริ่มมีอาการ</span>
                <input className="inp" readOnly defaultValue="25 ส.ค. 2569" />
              </div>
              <div>
                <span className="lbl">เคยไปพบแพทย์แล้วหรือไม่</span>
                <div className="flex gap-2">
                  {["ยังไม่ได้ไป", "ไปแล้ว"].map((o, i) => (
                    <button
                      key={o}
                      className="flex-1 py-2 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: i === 0 ? "var(--accent)" : "#fff",
                        color: i === 0 ? "#fff" : "var(--muted)",
                        borderColor: i === 0 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="ขั้นตอนที่ 3 · โรคที่สงสัยและอาการ"
            desc="ระบบจะเทียบกับนิยามการเฝ้าระวังเพื่อประเมินว่าเข้าเกณฑ์หรือไม่"
            icon="shield"
          >
            <span className="lbl">โรคที่สงสัย</span>
            <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-4 mb-4">
              {DISEASES.slice(0, 8).map((d, i) => {
                const sel = i === 6;
                return (
                  <button
                    key={d.code}
                    className="text-left rounded-xl p-3 border transition-all"
                    style={{
                      borderColor: sel ? d.color : "var(--border)",
                      background: sel ? d.tone : "#fff",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: d.color }}
                      />
                      {sel && (
                        <span className="ml-auto" style={{ color: d.color }}>
                          <Icon name="check" size={15} />
                        </span>
                      )}
                    </div>
                    <p className="text-[12.5px] font-semibold mt-1.5 leading-snug">{d.name}</p>
                  </button>
                );
              })}
            </div>

            <span className="lbl">อาการที่พบ (เลือกได้หลายข้อ)</span>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "มีไข้",
                "แผลในปาก",
                "ตุ่มน้ำที่มือ/เท้า",
                "ผื่นตามตัว",
                "งอแง ไม่ยอมกินอาหาร",
                "อาเจียน",
                "ซึม",
              ].map((o, i) => (
                <button
                  key={o}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                  style={{
                    background: i < 4 ? "color-mix(in srgb, var(--accent) 10%, #fff)" : "#fff",
                    color: i < 4 ? "var(--accent)" : "var(--muted)",
                    borderColor: i < 4 ? "var(--accent)" : "var(--border)",
                  }}
                >
                  {i < 4 && <Icon name="check" size={12} />}
                  {o}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="lbl">พบผู้มีอาการคล้ายกันในพื้นที่เดียวกัน</span>
                <div className="flex flex-wrap gap-2">
                  {["ไม่มี", "1–2 ราย", "3 รายขึ้นไป"].map((o, i) => (
                    <button
                      key={o}
                      className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                      style={{
                        background: i === 2 ? "var(--danger)" : "#fff",
                        color: i === 2 ? "#fff" : "var(--muted)",
                        borderColor: i === 2 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="lbl">ระดับความเร่งด่วนที่เสนอ</span>
                <div className="flex gap-2">
                  {["เฝ้าระวัง", "เร่งด่วน", "วิกฤต"].map((o, i) => (
                    <button
                      key={o}
                      className="flex-1 py-2 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: i === 1 ? "#ea580c" : "#fff",
                        color: i === 1 ? "#fff" : "var(--muted)",
                        borderColor: i === 1 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">รายละเอียดเพิ่มเติม</span>
                <textarea
                  className="inp min-h-[88px] resize-none"
                  readOnly
                  defaultValue="อสม. แจ้งว่าที่ศูนย์เด็กเล็กบ้านท่าโรงมีเด็กมีแผลในปากและตุ่มน้ำที่มือ 3 ราย ในสัปดาห์เดียวกัน ครูพี่เลี้ยงยังไม่ได้แจ้งใคร ขอให้ทีมภาคสนามเข้าคัดกรองเด็กทั้งศูนย์ (28 คน) โดยด่วน"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-sm">
                    <Icon name="camera" size={14} /> แนบรูป (2)
                  </button>
                  <button className="btn btn-sm">
                    <Icon name="pin" size={14} /> แนบพิกัด
                  </button>
                  <button className="btn btn-sm">
                    <Icon name="mic" size={14} /> แนบเสียงจาก อสม.
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="ขั้นตอนที่ 4 · เลือกทีมภาคสนามที่จะรับเคส"
            desc="เคสจะไปปรากฏในกล่องเคสของทีมที่เลือก (โมดูลทีม SRRT/CDCU) ทันที"
            icon="field"
          >
            <div className="grid gap-2.5">
              {[
                ["ทีม SRRT เมือง-2", "รับผิดชอบ ม.5–ม.9 · ว่าง 2 เคส", "ออนไลน์", "#16a34a", true],
                ["ทีม SRRT เมือง-1", "รับผิดชอบ ม.1–ม.4 · ว่าง 1 เคส", "ออนไลน์", "#16a34a", false],
                ["ทีม CDCU จังหวัด", "สนับสนุนกรณีระบาดเป็นกลุ่มก้อน", "ออนไลน์", "#16a34a", false],
                ["ทีม รพ.สต. ดำเนินการเอง", "บันทึกสอบสวนเองโดยไม่ส่งต่อ", "—", "#94a3b8", false],
              ].map(([n, d, s, c, on]) => (
                <label
                  key={String(n)}
                  className="flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer"
                  style={{
                    borderColor: on ? "var(--accent)" : "var(--border)",
                    background: on ? "color-mix(in srgb, var(--accent) 6%, #fff)" : "#fff",
                  }}
                >
                  <span
                    className="grid place-items-center rounded-full w-[18px] h-[18px] shrink-0 border-2"
                    style={{ borderColor: on ? "var(--accent)" : "#cbd5e1" }}
                  >
                    {on && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold">{n}</span>
                    <span className="block text-[11.5px] text-muted">{d}</span>
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: String(c) }}
                    />
                    <span className="text-[11.5px] text-muted">{s}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button className="btn">บันทึกร่าง</button>
              <button className="btn btn-primary">
                <Icon name="send" size={16} /> ส่งแจ้งไปยังระบบงานภาคสนาม
              </button>
            </div>
          </Card>
        </div>

        {/* right rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ตรวจสอบเกณฑ์เฝ้าระวัง"
            desc="เทียบกับนิยาม มือ เท้า ปาก (HFMD)"
            icon="shield"
          >
            <div className="grid gap-2.5">
              {[
                ["มีไข้", "ok"],
                ["แผลในปาก หรือ ตุ่มน้ำในช่องปาก", "ok"],
                ["ตุ่มน้ำที่ฝ่ามือ/ฝ่าเท้า", "ok"],
                ["อายุต่ำกว่า 5 ปี", "ok"],
                ["พบเป็นกลุ่มก้อนในสถานศึกษา", "ok"],
                ["ยังไม่มีผลตรวจยืนยันทางห้องปฏิบัติการ", "warn"],
              ].map(([t, s]) => {
                const ok = s === "ok";
                return (
                  <div key={String(t)} className="flex items-center gap-2.5">
                    <span
                      className="grid place-items-center rounded-full w-[18px] h-[18px] shrink-0 text-white"
                      style={{ background: ok ? "var(--ok)" : "var(--warn)" }}
                    >
                      <Icon name={ok ? "check" : "bell"} size={11} />
                    </span>
                    <span className="text-[12.5px] flex-1">{t}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl p-3" style={{ background: "#f5f3ff" }}>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "#4c1d95" }}>
                <strong>เข้าเกณฑ์สอบสวน</strong> — พบผู้ป่วยเข้านิยาม 3 รายในสถานศึกษาเดียวกัน
                ภายใน 7 วัน จัดเป็นการระบาดเป็นกลุ่มก้อน ควรสอบสวนภายใน 24 ชั่วโมง
              </p>
            </div>
          </Card>

          <Card title="สรุปการแจ้งที่กำลังสร้าง" icon="clipboard">
            <dl className="grid gap-2.5 text-[12.5px]">
              {[
                ["ผู้ป่วย", "ด.ช.ภูมิพัฒน์ แก้วมณี"],
                ["โรคที่สงสัย", "มือ เท้า ปาก"],
                ["สถานที่พบ", "ศูนย์เด็กเล็ก ม.7"],
                ["ผู้แจ้ง", "อสม. นางสมพร ดีใจ"],
                ["ผู้มีอาการคล้ายกัน", "3 รายขึ้นไป"],
                ["ความเร่งด่วน", "เร่งด่วน"],
                ["ส่งถึง", "ทีม SRRT เมือง-2"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted shrink-0">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl p-3" style={{ background: "#fff7ed" }}>
              <p className="text-[12px] leading-relaxed" style={{ color: "#9a3412" }}>
                เมื่อส่งแล้ว ระบบจะสร้างรหัสเคสใหม่ ส่ง Flex Message แจ้งทีม และเริ่มนับเวลามาตรฐาน
                (ต้องรับเคสภายใน 3 ชั่วโมง)
              </p>
            </div>
          </Card>

          <Card title="เคสที่แจ้งไปแล้ว" icon="send" pad={false}>
            <ul>
              {SENT.map((s) => (
                <li key={s.id} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="font-mono text-[11px] text-muted flex-1">{s.id}</span>
                    <Chip bg={s.bg} fg={s.fg}>
                      {s.status}
                    </Chip>
                  </div>
                  <p className="text-[12.5px] font-semibold mt-1">{s.name}</p>
                  <p className="sub">
                    {s.disease} · {s.place}
                  </p>
                  <p className="text-[11px] text-faint mt-0.5">
                    {s.by} · แจ้ง {s.sent} · {s.team}
                  </p>
                  <div className="mt-2">
                    <Progress value={s.progress} height={4} color={s.color} />
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
