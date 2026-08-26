import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, Avatar } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CASES, STAGES, stageTone, severityTone } from "@/lib/mock";

const TIMELINE = [
  ["โรงพยาบาลแจ้งเคส", "27 ส.ค. 08:14", "รพ.พุทธชินราช", true],
  ["Push เข้า Dashboard กลาง", "27 ส.ค. 08:47", "ระบบอัตโนมัติ", true],
  ["ส่ง Flex แจ้งทีม 5 คน", "27 ส.ค. 09:12", "ระบบอัตโนมัติ", true],
  ["ทีมกดรับเคส", "27 ส.ค. 09:31", "ทีม SRRT เมือง-1", true],
  ["ลงพื้นที่สอบสวน", "27 ส.ค. 10:09", "ทีม SRRT เมือง-1", true],
  ["บันทึกแบบสอบสวนครบถ้วน", "รอดำเนินการ", "กำหนดภายใน 29 ส.ค. 08:14", false],
  ["หัวหน้ากลุ่มงานอนุมัติปิดเคส", "รอดำเนินการ", "—", false],
];

export default function CasesProgress() {
  return (
    <>
      <PageHead
        title="ระบบติดตามความก้าวหน้ารายเคส"
        desc="ติดตามทุกเคสตั้งแต่โรงพยาบาลแจ้งจนถึงปิดเคส พร้อมนาฬิกานับถอยหลังตามมาตรฐานเวลา"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="search" size={15} /> ตัวกรองขั้นสูง
            </button>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออก Excel
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-5">
        {STAGES.map((s, i) => (
          <Stat
            key={s}
            label={s}
            value={[4, 8, 15, 22, 128][i]}
            unit="เคส"
            icon="clipboard"
            tone={["#94a3b8", "#2563eb", "#f59e0b", "#7c3aed", "#16a34a"][i]}
          />
        ))}
      </div>

      {/* kanban */}
      <Card
        title="กระดานติดตามเคส (Kanban)"
        desc="ลากเคสเพื่อเปลี่ยนสถานะได้ · สีแดงคือเคสที่เกินเวลามาตรฐาน"
        icon="grid"
        className="mb-5"
      >
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {STAGES.map((stage, si) => {
            const items = CASES.filter((c) => c.stage === stage);
            const tone = stageTone[stage];
            return (
              <div key={stage} className="rounded-xl bg-surface2 p-2.5">
                <div className="flex items-center gap-2 px-1 pb-2.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: tone.fg }} />
                  <span className="text-[12.5px] font-bold flex-1">{stage}</span>
                  <span className="text-[11px] font-bold text-faint tabular-nums">
                    {[4, 8, 15, 22, 128][si]}
                  </span>
                </div>
                <div className="grid gap-2">
                  {items.map((c, ci) => {
                    const overdue = ci === 0 && si === 2;
                    return (
                      <article
                        key={c.id}
                        className="bg-surface rounded-lg border p-2.5"
                        style={{ borderColor: overdue ? "#fca5a5" : "var(--border)" }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: c.diseaseColor }}
                          />
                          <span className="text-[11px] font-mono text-muted truncate flex-1">
                            {c.id.slice(-4)}
                          </span>
                          {overdue && (
                            <span style={{ color: "var(--danger)" }}>
                              <Icon name="clock" size={12} />
                            </span>
                          )}
                        </div>
                        <p className="text-[12.5px] font-semibold mt-1 truncate">{c.name}</p>
                        <p className="text-[10.5px] text-muted truncate">
                          {c.disease} · อ.{c.district}
                        </p>
                        <div className="mt-2">
                          <Progress value={c.progress} height={4} color={c.diseaseColor} />
                        </div>
                      </article>
                    );
                  })}
                  {items.length === 0 && (
                    <p className="text-[11.5px] text-faint text-center py-6">ไม่มีเคส</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_400px]">
        <Card
          title="รายการเคสทั้งหมด"
          desc="177 เคส · แสดง 8 รายการแรก"
          icon="clipboard"
          pad={false}
          action={
            <div className="flex gap-1.5">
              {["ทั้งหมด", "เกินเวลา", "เร่งด่วน"].map((t, i) => (
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
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[820px]">
              <thead>
                <tr>
                  <th className="th">เคส / ผู้ป่วย</th>
                  <th className="th">ทีมที่รับผิดชอบ</th>
                  <th className="th">แจ้งเมื่อ</th>
                  <th className="th">เหลือเวลา</th>
                  <th className="th">สถานะ</th>
                  <th className="th w-[150px]">ความก้าวหน้า</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map((c, i) => {
                  const remain = ["2:47 ชม.", "19 ชม.", "เกิน 6 ชม.", "12 ชม.", "—", "—", "31 ชม.", "8 ชม."][i];
                  const over = remain.startsWith("เกิน");
                  return (
                    <tr key={c.id} className="hover:bg-surface2">
                      <td className="td">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: c.diseaseColor }}
                          />
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-[11px] text-muted font-mono">{c.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="td text-muted">{c.team}</td>
                      <td className="td text-muted whitespace-nowrap">{c.reportedAt}</td>
                      <td className="td">
                        <span
                          className="font-semibold tabular-nums"
                          style={{ color: over ? "var(--danger)" : "var(--text)" }}
                        >
                          {remain}
                        </span>
                      </td>
                      <td className="td">
                        <Chip {...stageTone[c.stage]}>{c.stage}</Chip>
                      </td>
                      <td className="td">
                        <div className="flex items-center gap-2.5">
                          <Progress value={c.progress} />
                          <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                            {c.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* case detail */}
        <div className="grid gap-4 content-start">
          <Card
            title="ไทม์ไลน์เคส PLK-6809-0142"
            desc="นายสมชาย ใจดี · ไข้เลือดออก"
            icon="clock"
            action={<Chip {...severityTone["เร่งด่วน"]}>เร่งด่วน</Chip>}
          >
            <ol className="relative pl-5">
              <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line-brd" />
              {TIMELINE.map(([t, time, by, done]) => (
                <li key={String(t)} className="relative pb-4 last:pb-0">
                  <span
                    className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 border-white"
                    style={{ background: done ? "var(--accent)" : "#cbd5e1" }}
                  />
                  <p
                    className="text-[12.5px] font-semibold leading-snug"
                    style={{ color: done ? "var(--text)" : "var(--faint)" }}
                  >
                    {t}
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">{time}</p>
                  <p className="text-[11px] text-faint">{by}</p>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="ผู้เกี่ยวข้องกับเคสนี้" icon="users">
            <div className="grid gap-2.5">
              {[
                ["พญ.นภัสสร ชัยวัฒน์", "ผู้แจ้งเคส · รพ.พุทธชินราช"],
                ["นายกิตติศักดิ์ แสงเพชร", "ผู้สอบสวน · ทีม SRRT เมือง-1"],
                ["นายวิรัตน์ สุขเกษม", "หน่วยบริการพื้นที่ · สสอ.เมือง"],
                ["นพ.ธนากร วงศ์วิวัฒน์", "ผู้อนุมัติปิดเคส · สสจ."],
              ].map(([n, r]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <Avatar name={String(n)} size={30} />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium truncate">{n}</span>
                    <span className="block text-[11px] text-muted truncate">{r}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="เคสที่เกินเวลามาตรฐาน" icon="bell" pad={false}>
            <ul>
              {[
                ["PLK-6809-0139", "เลปโตสไปโรซิส", "เกิน 6 ชม.", "ทีม CDCU บางระกำ"],
                ["PLK-6809-0121", "ไข้เลือดออก", "เกิน 14 ชม.", "ทีม SRRT พรหมพิราม"],
                ["PLK-6809-0118", "อาหารเป็นพิษ", "เกิน 22 ชม.", "ทีม CDCU ชาติตระการ"],
                ["PLK-6809-0109", "วัณโรค", "เกิน 3 วัน", "ทีม SRRT นครไทย"],
              ].map(([id, d, t, team]) => (
                <li key={String(id)} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11.5px] flex-1">{id}</span>
                    <Chip bg="#fee2e2" fg="#b91c1c">
                      {t}
                    </Chip>
                  </div>
                  <p className="sub mt-0.5">
                    {d} · {team}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
