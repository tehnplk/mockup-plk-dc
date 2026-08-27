import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Avatar, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";

const REQUESTS = [
  {
    id: "REQ-6809-014",
    case: "69082603",
    name: "อนุชิต แซ่ลิ้ม",
    disease: "ไข้เลือดออก",
    color: "#dc2626",
    from: "รพ.สต.บ้านคลอง",
    by: "นายวิรัตน์ สุขเกษม",
    reason: "ที่อยู่จริงไม่อยู่ในเขตรับผิดชอบ",
    moveTo: "รพ.สต.อรัญญิก",
    files: 3,
    date: "26 ส.ค. 2569 16:40",
    age: "รอมาแล้ว 17 ชม.",
    status: "รอพิจารณา",
    bg: "#fef3c7",
    fg: "#b45309",
    active: true,
  },
  {
    id: "REQ-6809-013",
    case: "69082504",
    name: "ด.ช.ภัทรดนัย ห่วงเพชร",
    disease: "มือ เท้า ปาก",
    color: "#059669",
    from: "รพ.สต.ท่าทอง",
    by: "นางสาวจิราพร ทองอยู่",
    reason: "ข้อมูลซ้ำซ้อนกับเคสอื่น",
    moveTo: "— (ตัดออกจากระบบ)",
    files: 2,
    date: "26 ส.ค. 2569 11:12",
    age: "รอมาแล้ว 22 ชม.",
    status: "รอพิจารณา",
    bg: "#fef3c7",
    fg: "#b45309",
    active: false,
  },
  {
    id: "REQ-6809-012",
    case: "69082405",
    name: "ประเทือง ชูจันทร์",
    disease: "เลปโตสไปโรซิส",
    color: "#ca8a04",
    from: "รพ.สต.วังทอง",
    by: "นายประเสริฐ ใจงาม",
    reason: "วินิจฉัยเปลี่ยน ไม่เข้านิยามโรค",
    moveTo: "— (ตัดออกจากระบบ)",
    files: 4,
    date: "25 ส.ค. 2569 09:05",
    age: "รอมาแล้ว 2 วัน",
    status: "รอข้อมูลเพิ่ม",
    bg: "#e0f2fe",
    fg: "#0369a1",
    active: false,
  },
];

const DECIDED = [
  ["REQ-6809-011", "เบญจวรรณ กลิ่นหอม", "รพ.สต.บ้านคลอง", "อนุมัติ", "22 ส.ค.", "#dcfce7", "#15803d"],
  ["REQ-6809-010", "ไพโรจน์ ทับทิม", "รพ.สต.หัวรอ", "อนุมัติ", "21 ส.ค.", "#dcfce7", "#15803d"],
  ["REQ-6809-009", "สมพิศ เนตรนิล", "รพ.สต.ท่าโพธิ์", "ไม่อนุมัติ", "20 ส.ค.", "#fee2e2", "#b91c1c"],
  ["REQ-6809-008", "วีระพล อินจันทร์", "รพ.สต.บ้านคลอง", "อนุมัติ", "18 ส.ค.", "#dcfce7", "#15803d"],
  ["REQ-6809-007", "ลำดวน ศรีอินทร์", "รพ.สต.บึงพระ", "อนุมัติ", "16 ส.ค.", "#dcfce7", "#15803d"],
];

export default function Requests() {
  return (
    <>
      <PageHead
        title="รับคำร้อง / อนุมัติตัดเคสออก"
        desc="คำร้องจากหน่วยบริการเจ้าของพื้นที่ (รพ.สต.) ที่ขอตัดเคสออกจากความรับผิดชอบ · Admin จังหวัดพิจารณาภายใน 3 วันทำการ"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="search" size={15} /> ตัวกรอง
            </button>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกรายงาน
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="คำร้องรอพิจารณา" value={3} unit="คำร้อง" icon="clipboard" tone="var(--warn)" />
        <Stat label="เกิน 3 วันทำการ" value={1} unit="คำร้อง" icon="clock" tone="var(--danger)" />
        <Stat label="อนุมัติเดือนนี้" value={18} unit="คำร้อง" icon="check" tone="var(--ok)" />
        <Stat label="อัตราการอนุมัติ" value="78" unit="%" icon="chart" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* inbox */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="กล่องคำร้องที่รอพิจารณา"
            desc="เรียงตามเวลาที่ยื่น · เคสจะถูกพัก SLA จนกว่าจะพิจารณาเสร็จ"
            icon="clipboard"
            pad={false}
            action={
              <div className="flex gap-1.5">
                {["รอพิจารณา", "ทั้งหมด"].map((t, i) => (
                  <button
                    key={t}
                    className="btn btn-sm"
                    style={{
                      background: i === 0 ? "var(--accent)" : undefined,
                      color: i === 0 ? "#fff" : undefined,
                      borderColor: i === 0 ? "transparent" : undefined,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            }
          >
            <ul>
              {REQUESTS.map((r) => (
                <li
                  key={r.id}
                  className="px-4 sm:px-5 py-4 border-b border-line-brd last:border-0"
                  style={{
                    background: r.active
                      ? "color-mix(in srgb, var(--accent) 6%, transparent)"
                      : undefined,
                    borderLeft: r.active ? "3px solid var(--accent)" : "3px solid transparent",
                  }}
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <span
                      className="grid place-items-center rounded-xl shrink-0"
                      style={{ width: 38, height: 38, background: `${r.color}18`, color: r.color }}
                    >
                      <Icon name="shield" size={19} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11.5px] text-muted">{r.id}</span>
                        <Chip bg={r.bg} fg={r.fg}>
                          {r.status}
                        </Chip>
                        <span className="text-[11px] text-faint">{r.age}</span>
                      </div>
                      <p className="text-[14px] font-bold mt-1 leading-tight">
                        {r.name}{" "}
                        <span className="text-muted font-medium text-[12.5px]">
                          · {r.disease}
                        </span>
                      </p>
                      <p className="sub mt-0.5">
                        เคส {r.case} · ยื่นโดย {r.from}
                      </p>

                      <div className="grid gap-1.5 mt-2.5">
                        {[
                          ["shield", `เหตุผล: ${r.reason}`],
                          ["arrowRight", `ขอย้ายไปยัง: ${r.moveTo}`],
                          ["file", `หลักฐานแนบ ${r.files} รายการ · ยื่นเมื่อ ${r.date}`],
                        ].map(([ic, t]) => (
                          <p
                            key={String(t)}
                            className="flex items-start gap-2 text-[12px] text-muted"
                          >
                            <span className="text-faint mt-[1px] shrink-0">
                              <Icon name={ic as "file"} size={14} />
                            </span>
                            {t}
                          </p>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <button className="btn btn-sm">
                          <Icon name="file" size={14} /> ดูหลักฐาน
                        </button>
                        <button className="btn btn-sm">
                          <Icon name="map" size={14} /> ตรวจสอบพิกัด
                        </button>
                        <button className="btn btn-sm">ขอข้อมูลเพิ่ม</button>
                        <button
                          className="btn btn-sm"
                          style={{ borderColor: "#fca5a5", color: "#b91c1c" }}
                        >
                          ไม่อนุมัติ
                        </button>
                        <button className="btn btn-sm btn-primary">
                          <Icon name="check" size={14} /> อนุมัติตัดเคสออก
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="คำร้องที่พิจารณาแล้ว"
            desc="30 วันล่าสุด"
            icon="clock"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[680px]">
                <thead>
                  <tr>
                    <th className="th">เลขคำร้อง</th>
                    <th className="th">ผู้ป่วย</th>
                    <th className="th">หน่วยที่ยื่น</th>
                    <th className="th">ผลพิจารณา</th>
                    <th className="th">วันที่</th>
                    <th className="th"></th>
                  </tr>
                </thead>
                <tbody>
                  {DECIDED.map(([id, n, f, s, d, bg, fg]) => (
                    <tr key={String(id)} className="hover:bg-surface2">
                      <td className="td font-mono text-[12px]">{id}</td>
                      <td className="td font-medium">{n}</td>
                      <td className="td text-muted">{f}</td>
                      <td className="td">
                        <Chip bg={String(bg)} fg={String(fg)}>
                          {s}
                        </Chip>
                      </td>
                      <td className="td text-muted whitespace-nowrap">{d}</td>
                      <td className="td text-right">
                        <button className="btn btn-sm">ดูรายละเอียด</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* detail rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="รายละเอียดคำร้อง REQ-6809-014"
            desc="อนุชิต แซ่ลิ้ม · เคส 69082603"
            icon="shield"
            action={<Chip bg="#fef3c7" fg="#b45309">รอพิจารณา</Chip>}
          >
            <dl className="grid gap-2.5 text-[12.5px]">
              {[
                ["ที่อยู่ที่ระบบระบุ", "88/2 ม.2 ต.บ้านคลอง"],
                ["ที่อยู่จริงที่ตรวจพบ", "45/9 ม.6 ต.อรัญญิก"],
                ["วิธีตรวจสอบ", "ลงพื้นที่ด้วยตนเอง"],
                ["ผู้ยื่นคำร้อง", "นายวิรัตน์ สุขเกษม"],
                ["ตำแหน่ง", "นักสาธารณสุขชำนาญการ"],
                ["หน่วยที่ควรรับผิดชอบ", "รพ.สต.อรัญญิก"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted shrink-0">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div
              className="rounded-xl p-3 mt-4 text-[12.5px] leading-relaxed"
              style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
            >
              ลงพื้นที่ตรวจสอบบ้านเลขที่ 88/2 ม.2 เมื่อ 26 ส.ค. 2569 พบว่าเป็นบ้านของญาติ
              ผู้ป่วยย้ายไปพักที่ ม.6 ต.อรัญญิก ตั้งแต่ ก.พ. 2569 อสม. ยืนยันข้อมูลตรงกัน
            </div>

            <p className="text-[11px] font-bold text-faint uppercase tracking-wide mt-4 mb-2">
              หลักฐานแนบ
            </p>
            <div className="grid gap-2">
              {[
                ["ภาพถ่ายบ้านเลขที่ 88/2 ม.2.jpg", "2.1 MB", "image"],
                ["บันทึกถ้อยคำญาติผู้ป่วย.pdf", "180 KB", "file"],
                ["พิกัด GPS ที่อยู่จริง.json", "2 KB", "pin"],
              ].map(([n, s, ic]) => (
                <button
                  key={String(n)}
                  className="flex items-center gap-2.5 rounded-lg border border-line-brd p-2.5 text-left hover:bg-surface2"
                >
                  <span className="text-faint shrink-0">
                    <Icon name={ic as "file"} size={16} />
                  </span>
                  <span className="text-[12px] flex-1 truncate">{n}</span>
                  <span className="text-[11px] text-faint">{s}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="ตรวจสอบอัตโนมัติโดยระบบ" icon="sparkles">
            <div className="grid gap-2.5">
              {[
                ["พิกัดที่ยื่นอยู่นอกเขต รพ.สต.บ้านคลองจริง", "ok"],
                ["ที่อยู่ใหม่อยู่ในเขต รพ.สต.อรัญญิก", "ok"],
                ["ยื่นภายใน 7 วันนับจากรับเคส", "ok"],
                ["แนบหลักฐานครบตามเกณฑ์", "ok"],
                ["ไม่พบเคสซ้ำในระบบ", "warn"],
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
            <div className="mt-4 rounded-xl p-3" style={{ background: "#eff6ff" }}>
              <p className="text-[12px] leading-relaxed" style={{ color: "#1e40af" }}>
                ระบบแนะนำให้ <strong>อนุมัติ</strong> — ผ่านเกณฑ์ตรวจสอบ 4 จาก 5 ข้อ
                และหลักฐานสอดคล้องกับข้อมูลทะเบียนราษฎร์
              </p>
            </div>
          </Card>

          <Card title="บันทึกการพิจารณา" icon="clipboard">
            <span className="lbl">ความเห็นของผู้พิจารณา</span>
            <textarea
              className="inp min-h-[80px] resize-none"
              readOnly
              defaultValue="ตรวจสอบหลักฐานและพิกัดแล้ว เห็นควรอนุมัติตัดเคสออกและย้ายไปยัง รพ.สต.อรัญญิก"
            />
            <div className="flex gap-2 mt-3">
              <button className="btn flex-1" style={{ borderColor: "#fca5a5", color: "#b91c1c" }}>
                ไม่อนุมัติ
              </button>
              <button className="btn btn-primary flex-1">
                <Icon name="check" size={16} /> อนุมัติ
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Avatar name="นายธนากร วงศ์วิวัฒน์" size={26} />
              <span className="text-[11.5px] text-muted">
                ผู้พิจารณา: นายธนากร วงศ์วิวัฒน์
              </span>
            </div>
          </Card>

          <Card title="สถิติคำร้องรายหน่วยบริการ" desc="ปีงบประมาณ 2569" icon="chart">
            <div className="grid gap-3">
              {[
                ["รพ.สต.บ้านคลอง", 14, 11, "#7c3aed"],
                ["รพ.สต.อรัญญิก", 9, 8, "#7c3aed"],
                ["รพ.สต.หัวรอ", 7, 5, "#7c3aed"],
                ["รพ.สต.ท่าทอง", 6, 6, "#7c3aed"],
                ["รพ.สต.บึงพระ", 4, 2, "#7c3aed"],
              ].map(([n, total, ok, c]) => (
                <div key={String(n)}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-muted truncate">{n}</span>
                    <span className="font-semibold tabular-nums shrink-0">
                      {ok}/{total} อนุมัติ
                    </span>
                  </div>
                  <Progress
                    value={(Number(ok) / Number(total)) * 100}
                    height={5}
                    color={String(c)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
