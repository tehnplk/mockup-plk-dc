import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, Avatar } from "@/components/ui";
import { Icon } from "@/components/icons";

/* รหัส ICD-10 ที่คัดเข้าเฝ้าระวัง (watchlist) */
const ICD_GROUPS = [
  {
    g: "ไข้เลือดออกและโรคนำโดยยุง",
    color: "#dc2626",
    tone: "#fee2e2",
    rows: [
      ["A90", "Dengue fever", true, 12],
      ["A91", "Dengue haemorrhagic fever", true, 9],
      ["A92.0", "Chikungunya virus disease", true, 2],
      ["B50–B54", "Malaria", true, 0],
      ["A83.-", "Mosquito-borne viral encephalitis", false, 0],
    ],
  },
  {
    g: "โรคติดต่อทางอาหารและน้ำ",
    color: "#d97706",
    tone: "#fef3c7",
    rows: [
      ["A00", "Cholera", true, 0],
      ["A01.0", "Typhoid fever", true, 1],
      ["A05.-", "Bacterial foodborne intoxications", true, 6],
      ["A09", "Diarrhoea and gastroenteritis", false, 148],
      ["A27.-", "Leptospirosis", true, 3],
    ],
  },
  {
    g: "โรคติดต่อระบบทางเดินหายใจ",
    color: "#2563eb",
    tone: "#dbeafe",
    rows: [
      ["J09–J11", "Influenza", true, 14],
      ["U07.1", "COVID-19", true, 8],
      ["A15–A19", "Tuberculosis", true, 5],
      ["A36", "Diphtheria", true, 0],
      ["A37", "Whooping cough", true, 0],
    ],
  },
  {
    g: "โรคป้องกันได้ด้วยวัคซีนและอื่นๆ",
    color: "#7c3aed",
    tone: "#ede9fe",
    rows: [
      ["B05", "Measles", true, 1],
      ["B08.4", "Hand, foot and mouth disease", true, 12],
      ["A39", "Meningococcal infection", true, 0],
      ["A80", "Acute poliomyelitis", true, 0],
      ["B15", "Acute hepatitis A", false, 2],
    ],
  },
];

const ALERTS = [
  {
    t: "08:14",
    icd: "A91",
    dx: "Dengue haemorrhagic fever",
    hn: "0045218",
    ward: "OPD ห้องตรวจอายุรกรรม 3",
    dr: "นพ.ศุภชัย เรืองรอง",
    to: "3 คน",
    color: "#dc2626",
    status: "แจ้งแล้ว · เปิดเคสแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    t: "07:52",
    icd: "B08.4",
    dx: "Hand, foot and mouth disease",
    hn: "0093117",
    ward: "OPD กุมารเวชกรรม",
    dr: "พญ.อรอุมา แจ่มจันทร์",
    to: "3 คน",
    color: "#059669",
    status: "แจ้งแล้ว · เปิดเคสแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    t: "07:31",
    icd: "J10",
    dx: "Influenza due to identified influenza virus",
    hn: "0071265",
    ward: "ER",
    dr: "นพ.ปิยะ ทองสุข",
    to: "2 คน",
    color: "#2563eb",
    status: "รอเปิดแบบสอบสวน",
    bg: "#fef3c7",
    fg: "#b45309",
  },
  {
    t: "06:58",
    icd: "A27.0",
    dx: "Leptospirosis icterohaemorrhagica",
    hn: "0011084",
    ward: "หอผู้ป่วยอายุรกรรมชาย 1",
    dr: "นพ.ธีรวุฒิ สายทอง",
    to: "3 คน",
    color: "#ca8a04",
    status: "แจ้งแล้ว · เปิดเคสแล้ว",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    t: "06:20",
    icd: "A09",
    dx: "Diarrhoea and gastroenteritis",
    hn: "0088412",
    ward: "OPD",
    dr: "พญ.กมลชนก ใจงาม",
    to: "—",
    color: "#94a3b8",
    status: "ไม่อยู่ใน watchlist",
    bg: "#f1f5f9",
    fg: "#475569",
  },
];

export default function AgentPage() {
  const watched = ICD_GROUPS.flatMap((g) => g.rows).filter((r) => r[2]).length;
  const total = ICD_GROUPS.flatMap((g) => g.rows).length;

  return (
    <>
      <PageHead
        title="Agent เฝ้าระวังรหัสวินิจฉัย (ICD-10)"
        desc="Agent อ่านรหัสวินิจฉัยของแพทย์จาก HIS แบบต่อเนื่อง เมื่อพบรหัสที่คัดเข้าไว้จะแจ้งเตือนผู้รับผิดชอบงานสอบสวนโรคทันที"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการแจ้งเตือน
            </button>
            <button className="btn btn-sm">
              <Icon name="settings" size={15} /> ตั้งค่า Agent
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="check" size={15} /> บันทึกรายการคัดเข้า
            </button>
          </>
        }
      />

      {/* agent status */}
      <div
        className="card p-4 mb-5 flex flex-wrap items-center gap-x-6 gap-y-3"
        style={{ borderLeft: "4px solid var(--ok)" }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="grid place-items-center rounded-lg text-white shrink-0"
            style={{ width: 34, height: 34, background: "var(--ok)" }}
          >
            <Icon name="sparkles" size={18} />
          </span>
          <div>
            <p className="text-[13px] font-semibold flex items-center gap-2">
              Agent กำลังทำงาน
              <Chip bg="#dcfce7" fg="#15803d" dot>
                ONLINE
              </Chip>
            </p>
            <p className="sub">
              อ่าน HIS ทุก 2 นาที · สแกนล่าสุด 09:40 น. · เชื่อมต่อ HOSxP XE ปกติ
            </p>
          </div>
        </div>
        <div className="flex-1 min-w-[180px] max-w-[300px]">
          <div className="flex justify-between text-[11.5px] mb-1.5">
            <span className="text-muted">รหัสที่คัดเข้าเฝ้าระวัง</span>
            <span className="font-semibold tabular-nums">
              {watched} / {total} รหัส
            </span>
          </div>
          <Progress value={(watched / total) * 100} color="var(--ok)" />
        </div>
        <span
          className="w-11 h-6 rounded-full p-0.5 shrink-0 flex"
          style={{ background: "var(--ok)", justifyContent: "flex-end" }}
        >
          <span className="w-5 h-5 rounded-full bg-white" />
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="แจ้งเตือนวันนี้" value={12} unit="ครั้ง" icon="bell" />
        <Stat label="เปิดแบบสอบสวนแล้ว" value={9} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="รอผู้รับผิดชอบดำเนินการ" value={3} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat
          label="เวลาเฉลี่ยจาก Dx → แจ้งเตือน"
          value="1.8"
          unit="นาที"
          icon="sparkles"
          tone="var(--info)"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* ICD-10 picker */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="หน้าจอคัดเข้า ICD-10"
            desc="ติ๊กรหัสที่ต้องการให้ Agent เฝ้าระวัง · เมื่อแพทย์วินิจฉัยด้วยรหัสนี้ ระบบจะแจ้งผู้รับผิดชอบทันที"
            icon="grid"
            pad={false}
            action={
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg bg-surface2 border border-line-brd w-[220px]">
                  <span className="text-faint">
                    <Icon name="search" size={14} />
                  </span>
                  <input
                    className="bg-transparent text-[12.5px] outline-none w-full placeholder:text-faint"
                    placeholder="ค้นหารหัส / ชื่อโรค"
                    readOnly
                  />
                </div>
                <Chip bg="#dcfce7" fg="#15803d">
                  คัดเข้าแล้ว {watched}
                </Chip>
              </div>
            }
          >
            {ICD_GROUPS.map((grp) => (
              <section key={grp.g} className="border-b border-line-brd last:border-0">
                <header className="flex items-center gap-2.5 px-4 sm:px-5 py-3 bg-surface2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: grp.color }}
                  />
                  <h3 className="text-[13px] font-bold flex-1">{grp.g}</h3>
                  <Chip bg={grp.tone} fg={grp.color}>
                    {grp.rows.filter((r) => r[2]).length} / {grp.rows.length} รหัส
                  </Chip>
                </header>
                <div className="scroll-x nice">
                  <table className="w-full border-collapse min-w-[640px]">
                    <thead>
                      <tr>
                        <th className="th w-12">คัดเข้า</th>
                        <th className="th w-[110px]">รหัส ICD-10</th>
                        <th className="th">คำวินิจฉัย</th>
                        <th className="th">พบใน 30 วัน</th>
                        <th className="th">ผู้รับผิดชอบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grp.rows.map(([code, name, on, n]) => (
                        <tr
                          key={String(code)}
                          className="hover:bg-surface2"
                          style={{
                            background: on
                              ? "color-mix(in srgb, var(--accent) 5%, transparent)"
                              : undefined,
                          }}
                        >
                          <td className="td">
                            <span
                              className="grid place-items-center rounded w-[18px] h-[18px] border-2"
                              style={{
                                background: on ? "var(--accent)" : "#fff",
                                borderColor: on ? "var(--accent)" : "#cbd5e1",
                                color: "#fff",
                              }}
                            >
                              {on ? <Icon name="check" size={11} /> : null}
                            </span>
                          </td>
                          <td className="td font-mono text-[12.5px] font-semibold">{code}</td>
                          <td className="td">{name}</td>
                          <td className="td tabular-nums">
                            <span
                              style={{
                                color: Number(n) > 0 ? "var(--text)" : "var(--faint)",
                                fontWeight: Number(n) > 0 ? 600 : 400,
                              }}
                            >
                              {n} ราย
                            </span>
                          </td>
                          <td className="td">
                            {on ? (
                              <Chip bg={grp.tone} fg={grp.color}>
                                ทีมสอบสวนโรค รพ.
                              </Chip>
                            ) : (
                              <span className="text-[12px] text-faint">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

            <div className="flex flex-wrap items-center gap-2 p-4">
              <button className="btn btn-sm">
                <Icon name="plus" size={14} /> เพิ่มรหัส ICD-10 เอง
              </button>
              <button className="btn btn-sm">นำเข้าชุดรหัสมาตรฐาน 506</button>
              <span className="flex-1" />
              <span className="sub">แก้ไขล่าสุด 26 ส.ค. 2569 โดย พญ.นภัสสร ชัยวัฒน์</span>
            </div>
          </Card>

          {/* alert feed */}
          <Card
            title="การแจ้งเตือนจาก Agent วันนี้"
            desc="เรียงตามเวลาที่แพทย์บันทึกวินิจฉัยใน HIS"
            icon="bell"
            pad={false}
            action={<Chip bg="#dcfce7" fg="#15803d" dot>เรียลไทม์</Chip>}
          >
            <ul>
              {ALERTS.map((a, i) => (
                <li
                  key={i}
                  className="px-4 sm:px-5 py-3.5 border-b border-line-brd last:border-0"
                  style={{ borderLeft: `3px solid ${a.color}` }}
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="text-[12px] font-bold tabular-nums text-muted shrink-0 mt-0.5">
                      {a.t}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-mono text-[12.5px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: `${a.color}18`, color: a.color }}
                        >
                          {a.icd}
                        </span>
                        <span className="text-[13px] font-semibold">{a.dx}</span>
                      </div>
                      <p className="sub mt-1">
                        HN {a.hn} · {a.ward} · Dx โดย {a.dr}
                      </p>
                      <p className="text-[11.5px] text-muted mt-0.5">
                        แจ้งผู้รับผิดชอบ {a.to}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Chip bg={a.bg} fg={a.fg}>
                        {a.status}
                      </Chip>
                      {a.status.includes("รอ") && (
                        <Link href="/unit/new" className="btn btn-sm btn-primary">
                          เปิดเคส
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* right rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="ผู้รับผิดชอบที่จะได้รับแจ้ง" icon="users">
            <div className="grid gap-2.5">
              {[
                ["พญ.นภัสสร ชัยวัฒน์", "แพทย์เวรควบคุมโรค", "ทุกกลุ่มโรค"],
                ["นางพรทิพย์ ชูเกียรติ", "พยาบาลวิชาชีพ IC", "ทุกกลุ่มโรค"],
                ["นายสมคิด บุญเรือง", "นักวิชาการสาธารณสุข", "โรคนำโดยยุง"],
                ["น.ส.กนกวรรณ ดีมาก", "พยาบาลระบาดวิทยา", "ทางเดินหายใจ"],
              ].map(([n, r, scope]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <Avatar name={String(n)} size={30} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold truncate">{n}</span>
                    <span className="block text-[11px] text-muted truncate">{r}</span>
                  </span>
                  <Chip bg="#f1f5f9" fg="#475569">
                    {scope}
                  </Chip>
                </div>
              ))}
            </div>
            <button className="btn btn-sm w-full mt-3">
              <Icon name="plus" size={14} /> เพิ่มผู้รับผิดชอบ
            </button>
          </Card>

          <Card title="ช่องทางแจ้งเตือน" icon="send">
            <div className="grid gap-2">
              {[
                ["แจ้งเตือนในระบบ (Bell)", "ทันที", true],
                ["Flex Message หมอพร้อม", "ทันที", true],
                ["อีเมลสรุปรายวัน", "18:00 น.", true],
                ["SMS (เฉพาะโรคติดต่ออันตราย)", "ทันที", true],
                ["เสียงเตือนที่เคาน์เตอร์พยาบาล", "ปิดอยู่", false],
              ].map(([n, when, on]) => (
                <label
                  key={String(n)}
                  className="flex items-center gap-3 rounded-lg border border-line-brd p-2.5"
                >
                  <span
                    className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                    style={{
                      background: on ? "var(--accent)" : "#cbd5e1",
                      justifyContent: on ? "flex-end" : "flex-start",
                    }}
                  >
                    <span className="w-4 h-4 rounded-full bg-white" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold truncate">{n}</span>
                    <span className="block text-[11px] text-muted">{when}</span>
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Card title="เงื่อนไขเสริมของ Agent" icon="settings">
            <div className="grid gap-2.5">
              {[
                ["ตรวจจับตอนบันทึก Dx ครั้งแรก", true],
                ["ตรวจจับเมื่อแพทย์แก้ไข Dx ภายหลัง", true],
                ["ตรวจจับจากผลแล็บที่ยืนยันโรค", true],
                ["ข้ามผู้ป่วยที่เคยเปิดเคสแล้ว", true],
                ["แจ้งซ้ำถ้าไม่มีใครรับใน 30 นาที", true],
                ["ตรวจจับจากคำสำคัญในบันทึกแพทย์ (AI)", false],
              ].map(([t, on]) => (
                <div key={String(t)} className="flex items-center gap-2.5">
                  <span
                    className="grid place-items-center rounded w-[17px] h-[17px] shrink-0 border-2"
                    style={{
                      background: on ? "var(--accent)" : "#fff",
                      borderColor: on ? "var(--accent)" : "#cbd5e1",
                      color: "#fff",
                    }}
                  >
                    {on ? <Icon name="check" size={11} /> : null}
                  </span>
                  <span
                    className="text-[12.5px]"
                    style={{ color: on ? "var(--text)" : "var(--muted)" }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="ประสิทธิภาพ Agent" desc="30 วันล่าสุด" icon="chart">
            <div className="grid gap-3.5">
              {[
                ["ตรวจจับได้ (Recall)", 96, "#16a34a"],
                ["ความแม่นยำ (Precision)", 91, "#16a34a"],
                ["เปิดเคสภายใน 3 ชม.", 87, "#16a34a"],
                ["แจ้งเตือนที่ถูกปฏิเสธ", 9, "#f59e0b"],
              ].map(([l, v, c]) => (
                <div key={String(l)}>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="text-muted">{l}</span>
                    <span className="font-semibold tabular-nums">{v}%</span>
                  </div>
                  <Progress value={Number(v)} color={String(c)} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
