import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Field, Progress, Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

export default function AreaInvestigate() {
  return (
    <>
      <PageHead
        title="บันทึกข้อมูลสอบสวนควบคุมโรค"
        desc="สำหรับเคสที่อยู่ในเขตรับผิดชอบของ รพ.สต.บ้านคลอง · เจ้าหน้าที่ รพ.สต. บันทึกเองได้โดยไม่ต้องรอทีม SRRT"
        actions={
          <>
            <Chip bg="#dcfce7" fg="#15803d" dot>
              บันทึกอัตโนมัติ 10:22
            </Chip>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> พิมพ์แบบสอบสวน
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งเข้า Dashboard กลาง
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="เคสในเขตทั้งหมด" value={14} unit="เคส" icon="clipboard" />
        <Stat label="บันทึกครบแล้ว" value={11} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="ยังบันทึกไม่ครบ" value={2} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="ยื่นคำร้องตัดออก" value={1} unit="เคส" icon="shield" tone="var(--faint)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        {/* case list */}
        <Card
          title="เคสในเขตรับผิดชอบ"
          desc="ต.บ้านคลอง · 9 หมู่บ้าน"
          icon="clipboard"
          pad={false}
        >
          <ul>
            {[
              ["PLK-6809-0142", "สมชาย ใจดี", "ไข้เลือดออก", "ม.4", 68, true, "#dc2626"],
              ["PLK-6809-0138", "ณัฐพล คำแหง", "ไข้เลือดออก", "ม.2", 34, false, "#dc2626"],
              ["PLK-6809-0131", "ด.ญ.ปวีณา สุขใจ", "มือ เท้า ปาก", "ม.7", 100, false, "#059669"],
              ["PLK-6809-0126", "บุญเลิศ ทองมาก", "ไข้หวัดใหญ่", "ม.1", 100, false, "#2563eb"],
              ["PLK-6809-0119", "สมหญิง แจ่มใส", "ไข้เลือดออก", "ม.4", 100, false, "#dc2626"],
            ].map(([id, n, d, m, p, active, c]) => (
              <li key={String(id)}>
                <button
                  className="w-full text-left px-4 py-3 border-b border-line-brd last:border-0 transition-colors"
                  style={{
                    background: active
                      ? "color-mix(in srgb, var(--accent) 8%, #fff)"
                      : "transparent",
                    borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: String(c) }}
                    />
                    <span className="text-[12.5px] font-semibold flex-1 truncate">{n}</span>
                    <span className="text-[11px] text-faint">{m}</span>
                  </div>
                  <p className="text-[11px] text-muted font-mono mt-0.5">{id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={Number(p)} height={4} />
                    <span className="text-[10.5px] font-semibold tabular-nums w-8 text-right">
                      {p}%
                    </span>
                  </div>
                  <p className="text-[10.5px] text-faint mt-1">{d}</p>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* form */}
        <div className="grid gap-4">
          <div
            className="card p-4 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ borderLeft: "4px solid var(--accent)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="grid place-items-center rounded-lg"
                style={{ width: 34, height: 34, background: "#ede9fe", color: "#7c3aed" }}
              >
                <Icon name="clipboard" size={18} />
              </span>
              <div>
                <p className="text-[13px] font-semibold">PLK-6809-0142 · นายสมชาย ใจดี</p>
                <p className="sub">ไข้เลือดออก · ม.4 บ้านคลองใหม่ · รับเคสจาก รพ.พุทธชินราช</p>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] max-w-[300px]">
              <div className="flex justify-between text-[11.5px] mb-1.5">
                <span className="text-muted">ความสมบูรณ์ของแบบสอบสวน</span>
                <span className="font-semibold">68%</span>
              </div>
              <Progress value={68} />
            </div>
            <Link href="/area/exclude" className="btn btn-sm">
              <Icon name="shield" size={14} /> เคสนี้ไม่อยู่ในเขต?
            </Link>
          </div>

          <Card title="ส่วนที่ 1 · ข้อมูลผู้ป่วย (รับจากโรงพยาบาล)" icon="hospital">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ชื่อ–สกุล" value="นายสมชาย ใจดี" source="HIS" />
              <Field label="อายุ / เพศ" value="34 ปี / ชาย" source="HIS" />
              <Field label="วันเริ่มป่วย" value="22 ส.ค. 2569" source="HIS" />
              <Field label="การวินิจฉัย" value="A91 · DHF Grade II" source="HIS" />
              <Field
                label="ที่อยู่ขณะป่วย"
                value="128/4 หมู่ 4 ต.บ้านคลอง อ.เมืองพิษณุโลก"
                source="HIS"
                wide
              />
              <Field label="หมู่บ้านที่รับผิดชอบ" value="ม.4 บ้านคลองใหม่" source="USER" />
              <Field label="อสม. ประจำครัวเรือน" value="นางสมพร ดีใจ" source="USER" />
            </div>
          </Card>

          <Card title="ส่วนที่ 2 · การสำรวจสิ่งแวดล้อมและค่าดัชนีลูกน้ำ" icon="field">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className="lbl">พบภาชนะที่มีลูกน้ำยุงลายหรือไม่</span>
                <div className="flex gap-2">
                  {["พบ", "ไม่พบ"].map((o, i) => (
                    <button
                      key={o}
                      className="px-5 py-2 rounded-lg text-[12.5px] font-semibold border"
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
                <span className="lbl">ประเภทภาชนะที่พบ (เลือกได้หลายข้อ)</span>
                <div className="flex flex-wrap gap-2">
                  {["โอ่งน้ำ", "ถังน้ำ", "จานรองกระถาง", "ยางรถยนต์", "แจกัน", "เศษภาชนะ"].map(
                    (o, i) => (
                      <button
                        key={o}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                        style={{
                          background:
                            i < 3 ? "color-mix(in srgb, var(--accent) 10%, #fff)" : "#fff",
                          color: i < 3 ? "var(--accent)" : "var(--muted)",
                          borderColor: i < 3 ? "var(--accent)" : "var(--border)",
                        }}
                      >
                        {i < 3 && <Icon name="check" size={12} />}
                        {o}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {[
                ["บ้านที่สำรวจ (หลัง)", "42"],
                ["บ้านที่พบลูกน้ำ (หลัง)", "7"],
                ["ภาชนะทั้งหมด (ใบ)", "186"],
                ["ภาชนะที่พบลูกน้ำ (ใบ)", "24"],
                ["ค่า HI (%)", "16.7"],
                ["ค่า CI (%)", "12.9"],
              ].map(([l, v]) => (
                <div key={l}>
                  <span className="lbl">{l}</span>
                  <input className="inp tabular-nums font-semibold" defaultValue={v} readOnly />
                </div>
              ))}
            </div>
          </Card>

          <Card title="ส่วนที่ 3 · ผู้สัมผัสใกล้ชิดในเขต" icon="users" pad={false}>
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[620px]">
                <thead>
                  <tr>
                    <th className="th">ชื่อ–สกุล</th>
                    <th className="th">ความสัมพันธ์</th>
                    <th className="th">อาการ</th>
                    <th className="th">อุณหภูมิ</th>
                    <th className="th">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["นางสมศรี ใจดี", "ภรรยา", "ไม่มีอาการ", "36.8 °C", "เฝ้าระวัง 14 วัน", "#dcfce7", "#15803d"],
                    ["ด.ช.ธนกฤต ใจดี", "บุตร", "มีไข้ 37.9 °C", "37.9 °C", "ส่งพบแพทย์", "#fee2e2", "#b91c1c"],
                    ["นายอำนวย แซ่ตั้ง", "เพื่อนร่วมงาน", "มีไข้ 2 วัน", "38.4 °C", "ส่งพบแพทย์", "#fee2e2", "#b91c1c"],
                    ["นางบุญมี ทองคำ", "เพื่อนบ้าน ม.4", "ไม่มีอาการ", "36.5 °C", "เฝ้าระวัง 14 วัน", "#dcfce7", "#15803d"],
                  ].map(([n, r, s, t, a, bg, fg]) => (
                    <tr key={String(n)} className="hover:bg-surface2">
                      <td className="td font-medium">{n}</td>
                      <td className="td text-muted">{r}</td>
                      <td className="td">{s}</td>
                      <td className="td tabular-nums">{t}</td>
                      <td className="td">
                        <Chip bg={String(bg)} fg={String(fg)}>
                          {a}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4">
              <button className="btn btn-sm">
                <Icon name="plus" size={14} /> เพิ่มผู้สัมผัส
              </button>
            </div>
          </Card>

          <Card title="ส่วนที่ 4 · มาตรการควบคุมโรคที่ดำเนินการ" icon="shield">
            <div className="grid gap-2.5">
              {[
                ["สำรวจและทำลายแหล่งเพาะพันธุ์ลูกน้ำ", "27 ส.ค. 2569", true],
                ["ใส่ทรายอะเบทในภาชนะเก็บน้ำ", "27 ส.ค. 2569", true],
                ["พ่นสารเคมีกำจัดยุงตัวเต็มวัย รัศมี 100 ม.", "28 ส.ค. 2569 (นัดหมาย)", false],
                ["แจกทรายอะเบท/โลชันกันยุงให้ครัวเรือน", "27 ส.ค. 2569", true],
                ["ให้สุขศึกษาแก่ประชาชนในหมู่บ้าน", "รอดำเนินการ", false],
              ].map(([t, d, done]) => (
                <label
                  key={String(t)}
                  className="flex items-center gap-3 rounded-xl border border-line-brd p-3"
                >
                  <span
                    className="grid place-items-center rounded w-[18px] h-[18px] shrink-0 border-2"
                    style={{
                      background: done ? "var(--accent)" : "#fff",
                      borderColor: done ? "var(--accent)" : "#cbd5e1",
                      color: "#fff",
                    }}
                  >
                    {done && <Icon name="check" size={11} />}
                  </span>
                  <span className="text-[12.5px] flex-1">{t}</span>
                  <span className="text-[11.5px] text-muted">{d}</span>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <span className="lbl">บันทึกเพิ่มเติมของเจ้าหน้าที่ รพ.สต.</span>
              <textarea
                className="inp min-h-[92px] resize-none"
                readOnly
                defaultValue="สำรวจครบ 42 หลังคาเรือนในรัศมี 100 เมตร พบลูกน้ำ 7 หลัง แจ้ง อสม. ประจำหมู่บ้านติดตามซ้ำทุก 7 วัน นัดพ่นหมอกควันวันที่ 28 ส.ค. เวลา 06:00 น. ประสานเทศบาลสนับสนุนเครื่องพ่นแล้ว"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <button className="btn btn-sm">
                  <Icon name="mic" size={14} /> พูดแทนพิมพ์
                </button>
                <button className="btn btn-sm">
                  <Icon name="camera" size={14} /> แนบรูปภาคสนาม (6)
                </button>
                <button className="btn btn-sm">
                  <Icon name="pin" size={14} /> แนบพิกัด (3 จุด)
                </button>
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            <button className="btn">บันทึกร่าง</button>
            <button className="btn btn-primary">
              <Icon name="send" size={16} /> ส่งแบบสอบสวนเข้า Dashboard กลาง
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
