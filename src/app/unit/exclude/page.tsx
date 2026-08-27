import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Field } from "@/components/ui";
import { Icon } from "@/components/icons";

const REASONS = [
  ["ที่อยู่จริงไม่อยู่ในเขตรับผิดชอบ", "ผู้ป่วยแจ้งที่อยู่ตามทะเบียนบ้าน แต่พักอาศัยจริงนอกเขต", true],
  ["ข้อมูลซ้ำซ้อนกับเคสอื่น", "เป็นผู้ป่วยรายเดียวกับเคสที่มีอยู่แล้วในระบบ", false],
  ["วินิจฉัยเปลี่ยน ไม่เข้านิยามโรค", "ผลตรวจยืนยันภายหลังไม่เข้าเกณฑ์เฝ้าระวัง", false],
  ["ผู้ป่วยย้ายออกจากพื้นที่ก่อนเริ่มป่วย", "รับเชื้อจากพื้นที่อื่น ไม่ใช่การระบาดในเขต", false],
  ["ไม่พบผู้ป่วยตามที่อยู่ที่แจ้ง", "ลงพื้นที่ตรวจสอบแล้วไม่พบบ้าน/ผู้ป่วย", false],
];

const HISTORY = [
  {
    id: "REQ-6809-014",
    case: "PLK-6809-0138",
    name: "ณัฐพล คำแหง",
    reason: "ที่อยู่จริงไม่อยู่ในเขตรับผิดชอบ",
    date: "26 ส.ค. 2569",
    status: "รอ Admin พิจารณา",
    bg: "#fef3c7",
    fg: "#b45309",
  },
  {
    id: "REQ-6809-011",
    case: "PLK-6809-0117",
    name: "พิมพ์ใจ ศรีนวล",
    reason: "ข้อมูลซ้ำซ้อนกับเคสอื่น",
    date: "22 ส.ค. 2569",
    status: "อนุมัติแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    id: "REQ-6809-008",
    case: "PLK-6809-0104",
    name: "สุรชัย พันธ์ทอง",
    reason: "วินิจฉัยเปลี่ยน ไม่เข้านิยามโรค",
    date: "18 ส.ค. 2569",
    status: "อนุมัติแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    id: "REQ-6809-005",
    case: "PLK-6809-0091",
    name: "อารีย์ บุญช่วย",
    reason: "ไม่พบผู้ป่วยตามที่อยู่ที่แจ้ง",
    date: "12 ส.ค. 2569",
    status: "ไม่อนุมัติ",
    bg: "#fee2e2",
    fg: "#b91c1c",
  },
];

export default function Exclude() {
  return (
    <>
      <PageHead
        title="ยื่นคำร้องตัดเคสออกจากพื้นที่รับผิดชอบ"
        desc="เมื่อเคสที่ระบบมอบหมายมาไม่ใช่ความรับผิดชอบของ รพ.สต. ยื่นคำร้องพร้อมหลักฐานให้ Admin จังหวัดพิจารณา"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติคำร้อง
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งคำร้อง
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="คำร้องทั้งหมดปีนี้" value={14} unit="คำร้อง" icon="file" />
        <Stat label="รอ Admin พิจารณา" value={1} unit="คำร้อง" icon="clock" tone="var(--warn)" />
        <Stat label="อนุมัติแล้ว" value={11} unit="คำร้อง" icon="check" tone="var(--ok)" />
        <Stat label="ไม่อนุมัติ" value={2} unit="คำร้อง" icon="bell" tone="var(--danger)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ขั้นตอนที่ 1 · เลือกเคสที่ต้องการยื่นคำร้อง"
            desc="แสดงเฉพาะเคสที่ยังไม่ปิดและอยู่ในความรับผิดชอบของหน่วยบริการ"
            icon="clipboard"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[720px]">
                <thead>
                  <tr>
                    <th className="th w-10"></th>
                    <th className="th">รหัสเคส</th>
                    <th className="th">ผู้ป่วย</th>
                    <th className="th">โรค</th>
                    <th className="th">ที่อยู่ที่ระบบระบุ</th>
                    <th className="th">รับเคสเมื่อ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["PLK-6809-0138", "ณัฐพล คำแหง", "ไข้เลือดออก", "88/2 ม.2 ต.บ้านคลอง", "26 ส.ค. 2569", true],
                    ["PLK-6809-0142", "สมชาย ใจดี", "ไข้เลือดออก", "128/4 ม.4 ต.บ้านคลอง", "27 ส.ค. 2569", false],
                    ["PLK-6809-0131", "ด.ญ.ปวีณา สุขใจ", "มือ เท้า ปาก", "19 ม.7 ต.บ้านคลอง", "24 ส.ค. 2569", false],
                  ].map(([id, n, d, a, dt, sel]) => (
                    <tr
                      key={String(id)}
                      className="hover:bg-surface2"
                      style={{
                        background: sel
                          ? "color-mix(in srgb, var(--accent) 7%, transparent)"
                          : undefined,
                      }}
                    >
                      <td className="td">
                        <span
                          className="grid place-items-center rounded-full w-[18px] h-[18px] border-2"
                          style={{ borderColor: sel ? "var(--accent)" : "#cbd5e1" }}
                        >
                          {sel && (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: "var(--accent)" }}
                            />
                          )}
                        </span>
                      </td>
                      <td className="td font-mono text-[12px]">{id}</td>
                      <td className="td font-medium">{n}</td>
                      <td className="td text-muted">{d}</td>
                      <td className="td text-muted">{a}</td>
                      <td className="td text-muted whitespace-nowrap">{dt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="ขั้นตอนที่ 2 · ระบุเหตุผลของคำร้อง" icon="shield">
            <div className="grid gap-2.5">
              {REASONS.map(([t, d, on]) => (
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
          </Card>

          <Card title="ขั้นตอนที่ 3 · ที่อยู่จริงและหน่วยบริการที่ควรรับผิดชอบ" icon="pin">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ที่อยู่ตามที่ระบบระบุ" value="88/2 ม.2 ต.บ้านคลอง อ.เมืองพิษณุโลก" wide />
              <div className="sm:col-span-2">
                <span className="lbl">ที่อยู่จริงที่ตรวจสอบพบ</span>
                <input
                  className="inp"
                  readOnly
                  defaultValue="45/9 ม.6 ต.อรัญญิก อ.เมืองพิษณุโลก จ.พิษณุโลก 65000"
                />
              </div>
              <div>
                <span className="lbl">หน่วยบริการที่ควรรับผิดชอบ</span>
                <select className="inp" defaultValue="aran">
                  <option value="aran">รพ.สต.อรัญญิก</option>
                  <option value="huaro">รพ.สต.หัวรอ</option>
                  <option value="thathong">รพ.สต.ท่าทอง</option>
                  <option value="other">อื่นๆ (ระบุ)</option>
                </select>
              </div>
              <div>
                <span className="lbl">วิธีการตรวจสอบ</span>
                <select className="inp" defaultValue="visit">
                  <option value="visit">ลงพื้นที่ตรวจสอบด้วยตนเอง</option>
                  <option value="call">โทรศัพท์สอบถามผู้ป่วย/ญาติ</option>
                  <option value="asm">อสม. ในพื้นที่ยืนยัน</option>
                  <option value="doc">ตรวจสอบจากทะเบียนราษฎร์</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">รายละเอียดเพิ่มเติม</span>
                <textarea
                  className="inp min-h-[92px] resize-none"
                  readOnly
                  defaultValue="ลงพื้นที่ตรวจสอบบ้านเลขที่ 88/2 ม.2 เมื่อวันที่ 26 ส.ค. 2569 พบว่าเป็นบ้านของญาติ ผู้ป่วยย้ายไปพักอาศัยที่ ม.6 ต.อรัญญิก ตั้งแต่ ก.พ. 2569 อสม. ประจำหมู่บ้านยืนยันข้อมูลตรงกัน จึงขอตัดเคสออกและส่งต่อให้ รพ.สต.อรัญญิก รับผิดชอบแทน"
                />
              </div>
            </div>
          </Card>

          <Card title="ขั้นตอนที่ 4 · แนบหลักฐานประกอบ" icon="file">
            <div className="grid gap-2.5">
              {[
                ["ภาพถ่ายบ้านเลขที่ 88/2 ม.2.jpg", "2.1 MB", true],
                ["บันทึกถ้อยคำญาติผู้ป่วย.pdf", "180 KB", true],
                ["พิกัด GPS ที่อยู่จริง.json", "2 KB", true],
              ].map(([n, s, ok]) => (
                <div
                  key={String(n)}
                  className="flex items-center gap-3 rounded-xl border border-line-brd p-3"
                >
                  <span
                    className="grid place-items-center rounded-lg shrink-0"
                    style={{ width: 30, height: 30, background: "#ede9fe", color: "#6d28d9" }}
                  >
                    <Icon name="file" size={15} />
                  </span>
                  <span className="text-[12.5px] flex-1 truncate">{n}</span>
                  <span className="text-[11px] text-faint">{s}</span>
                  {ok && (
                    <span style={{ color: "var(--ok)" }}>
                      <Icon name="check" size={16} />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="btn btn-sm mt-3">
              <Icon name="plus" size={14} /> เพิ่มไฟล์แนบ
            </button>
            <p className="sub mt-3">
              ต้องแนบหลักฐานอย่างน้อย 1 รายการ · Admin จังหวัดจะใช้ประกอบการพิจารณา
            </p>
          </Card>

          <div className="flex flex-wrap gap-2">
            <button className="btn">บันทึกร่าง</button>
            <button className="btn btn-primary">
              <Icon name="send" size={16} /> ส่งคำร้องถึง Admin จังหวัด
            </button>
          </div>
        </div>

        {/* right rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="สรุปคำร้องที่กำลังสร้าง" icon="clipboard">
            <dl className="grid gap-2.5 text-[12.5px]">
              {[
                ["เคสที่ยื่น", "PLK-6809-0138"],
                ["ผู้ป่วย", "ณัฐพล คำแหง"],
                ["เหตุผล", "ที่อยู่จริงไม่อยู่ในเขต"],
                ["ส่งต่อให้", "รพ.สต.อรัญญิก"],
                ["หลักฐานแนบ", "3 รายการ"],
                ["ผู้ยื่น", "นายวิรัตน์ สุขเกษม"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted shrink-0">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl p-3" style={{ background: "#f5f3ff" }}>
              <p className="text-[12px] leading-relaxed" style={{ color: "#4c1d95" }}>
                เมื่อส่งคำร้อง เคสจะถูกพักการนับเวลามาตรฐาน (SLA) จนกว่า Admin จังหวัดจะพิจารณาเสร็จ
              </p>
            </div>
          </Card>

          <Card title="ประวัติคำร้องของ รพ.สต." icon="clock" pad={false}>
            <ul>
              {HISTORY.map((h) => (
                <li key={h.id} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11.5px] text-muted flex-1">{h.id}</span>
                    <Chip bg={h.bg} fg={h.fg}>
                      {h.status}
                    </Chip>
                  </div>
                  <p className="text-[12.5px] font-medium mt-1">{h.name}</p>
                  <p className="sub">
                    {h.case} · {h.reason}
                  </p>
                  <p className="text-[11px] text-faint mt-0.5">ยื่นเมื่อ {h.date}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="เงื่อนไขการยื่นคำร้อง" icon="shield">
            <ul className="grid gap-2 text-[12.5px] text-muted">
              {[
                "ยื่นได้ภายใน 7 วันนับจากวันที่รับเคส",
                "ต้องแนบหลักฐานการตรวจสอบอย่างน้อย 1 รายการ",
                "Admin จังหวัดพิจารณาภายใน 3 วันทำการ",
                "หากอนุมัติ ระบบจะย้ายเคสให้หน่วยบริการที่ระบุโดยอัตโนมัติ",
                "หากไม่อนุมัติ ต้องดำเนินการสอบสวนต่อภายใน 24 ชั่วโมง",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[3px] shrink-0" style={{ color: "var(--accent)" }}>
                    <Icon name="check" size={13} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
