import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress, PlkMap, Legend, BarChart } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DISTRICT_LOAD } from "@/lib/mock";

/* ความเพียงพอของทรัพยากรรายอำเภอ (%) — ยิ่งต่ำยิ่งขาดแคลน */
const SUFFICIENCY: Record<string, number> = {
  เมืองพิษณุโลก: 38,
  วังทอง: 44,
  บางระกำ: 61,
  พรหมพิราม: 72,
  นครไทย: 84,
  บางกระทุ่ม: 78,
  วัดโบสถ์: 88,
  ชาติตระการ: 91,
  เนินมะปราง: 86,
};

/* กลับด้านค่าเพื่อให้สีเข้ม = ขาดแคลนมาก */
const SHORTAGE = Object.fromEntries(
  Object.entries(SUFFICIENCY).map(([k, v]) => [k, 100 - v]),
);

const STOCK = [
  { n: "เครื่องพ่นหมอกควัน (ULV)", unit: "เครื่อง", have: 34, need: 50, out: 8, color: "#f59e0b" },
  { n: "เครื่องพ่นสะพายหลัง", unit: "เครื่อง", have: 62, need: 70, out: 5, color: "#16a34a" },
  { n: "ทรายอะเบท", unit: "กก.", have: 1240, need: 2000, out: 480, color: "#f59e0b" },
  { n: "น้ำยาเคมีพ่นยุง (Deltamethrin)", unit: "ลิตร", have: 180, need: 400, out: 120, color: "#dc2626" },
  { n: "ชุดตรวจ NS1", unit: "ชุด", have: 820, need: 1000, out: 140, color: "#16a34a" },
  { n: "โลชันทากันยุง", unit: "ขวด", have: 940, need: 3000, out: 620, color: "#dc2626" },
  { n: "มุ้งชุบสารเคมี", unit: "หลัง", have: 310, need: 500, out: 90, color: "#f59e0b" },
  { n: "ชุด PPE สอบสวนโรค", unit: "ชุด", have: 268, need: 300, out: 24, color: "#16a34a" },
];

const REQUESTS = [
  {
    id: "RSC-6809-041",
    from: "รพ.สต.บ้านคลอง",
    dist: "เมืองพิษณุโลก",
    items: "น้ำยาเคมีพ่นยุง 20 ล. · ทรายอะเบท 80 กก.",
    why: "ควบคุม cluster ม.4 · HI 24.1%",
    urgency: "เร่งด่วน",
    bg: "#fee2e2",
    fg: "#b91c1c",
    date: "27 ส.ค. 08:20",
    active: true,
  },
  {
    id: "RSC-6809-040",
    from: "รพ.สต.ชัยนาม",
    dist: "วังทอง",
    items: "เครื่องพ่นหมอกควัน 2 เครื่อง",
    why: "เครื่องเดิมชำรุด 2 เครื่อง",
    urgency: "เร่งด่วน",
    bg: "#fee2e2",
    fg: "#b91c1c",
    date: "27 ส.ค. 07:05",
    active: false,
  },
  {
    id: "RSC-6809-038",
    from: "สสอ.บางระกำ",
    dist: "บางระกำ",
    items: "โลชันทากันยุง 400 ขวด",
    why: "แจกครัวเรือนเสี่ยง 400 หลัง",
    urgency: "ปกติ",
    bg: "#e0f2fe",
    fg: "#0369a1",
    date: "26 ส.ค. 15:40",
    active: false,
  },
  {
    id: "RSC-6809-035",
    from: "รพ.วัดโบสถ์",
    dist: "วัดโบสถ์",
    items: "ชุดตรวจ NS1 120 ชุด",
    why: "คงเหลือต่ำกว่าจุดสั่งซื้อ",
    urgency: "ปกติ",
    bg: "#e0f2fe",
    fg: "#0369a1",
    date: "25 ส.ค. 11:12",
    active: false,
  },
];

export default function Resources() {
  return (
    <>
      <PageHead
        title="ระบบสำรวจและจัดสรรทรัพยากรควบคุมโรค"
        desc="สำรวจทรัพยากรคงเหลือของทุกหน่วยบริการ รับคำขอจากพื้นที่ และจัดสรรตามระดับความเสี่ยงของการระบาด"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> รายงานคงคลัง
            </button>
            <button className="btn btn-sm">
              <Icon name="send" size={15} /> เปิดรอบสำรวจใหม่
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="check" size={15} /> จัดสรรตามข้อเสนอ AI
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-5">
        <Stat label="รายการทรัพยากร" value={8} unit="ประเภท" icon="db" />
        <Stat label="หน่วยที่รายงานแล้ว" value="132" unit="/ 163 แห่ง" icon="hospital" tone="var(--info)" />
        <Stat label="คำขอรอจัดสรร" value={4} unit="คำขอ" icon="clipboard" tone="var(--warn)" />
        <Stat label="รายการที่ขาดแคลน" value={2} unit="ประเภท" icon="bell" tone="var(--danger)" />
        <Stat label="มูลค่าคงคลัง" value="4.6" unit="ล้านบาท" icon="chart" tone="var(--ok)" />
      </div>

      {/* alert */}
      <div
        className="card p-4 mb-5 flex flex-wrap items-center gap-3"
        style={{ background: "#fef2f2", borderColor: "#fecaca" }}
      >
        <span
          className="grid place-items-center rounded-lg text-white shrink-0"
          style={{ width: 32, height: 32, background: "#dc2626" }}
        >
          <Icon name="bell" size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold" style={{ color: "#991b1b" }}>
            น้ำยาเคมีพ่นยุงและโลชันทากันยุงต่ำกว่าระดับสำรองขั้นต่ำ
          </p>
          <p className="text-[12px]" style={{ color: "#b91c1c" }}>
            น้ำยาเคมีคงเหลือ 45% ของความต้องการ · เพียงพอสำหรับ 11 วันตามอัตราการใช้ปัจจุบัน
          </p>
        </div>
        <button className="btn btn-sm">ขอสนับสนุนจาก สคร.2</button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_400px] mb-5">
        {/* stock */}
        <Card
          title="คลังทรัพยากรกลางจังหวัด"
          desc="เทียบกับความต้องการที่ประมาณการจากสถานการณ์ระบาดปัจจุบัน"
          icon="db"
          pad={false}
          action={<Chip bg="#dcfce7" fg="#15803d" dot>ปรับปรุง 27 ส.ค. 06:00</Chip>}
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[760px]">
              <thead>
                <tr>
                  <th className="th">รายการ</th>
                  <th className="th">คงเหลือ</th>
                  <th className="th">ความต้องการ</th>
                  <th className="th">จ่ายออกเดือนนี้</th>
                  <th className="th w-[190px]">ความเพียงพอ</th>
                  <th className="th">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {STOCK.map((s) => {
                  const pct = Math.round((s.have / s.need) * 100);
                  const tone =
                    pct >= 80
                      ? { bg: "#dcfce7", fg: "#15803d", t: "เพียงพอ" }
                      : pct >= 55
                        ? { bg: "#fef3c7", fg: "#b45309", t: "ใกล้หมด" }
                        : { bg: "#fee2e2", fg: "#b91c1c", t: "ขาดแคลน" };
                  return (
                    <tr key={s.n} className="hover:bg-surface2">
                      <td className="td font-medium">{s.n}</td>
                      <td className="td tabular-nums font-semibold">
                        {s.have.toLocaleString()}{" "}
                        <span className="text-[11px] text-muted font-normal">{s.unit}</span>
                      </td>
                      <td className="td tabular-nums text-muted">{s.need.toLocaleString()}</td>
                      <td className="td tabular-nums text-muted">{s.out.toLocaleString()}</td>
                      <td className="td">
                        <div className="flex items-center gap-2.5">
                          <Progress value={pct} color={tone.fg} />
                          <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="td">
                        <Chip bg={tone.bg} fg={tone.fg}>
                          {tone.t}
                        </Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* shortage map */}
        <Card
          title="แผนที่ความขาดแคลนรายอำเภอ"
          desc="สีเข้ม = ทรัพยากรไม่เพียงพอต่อความเสี่ยงในพื้นที่"
          icon="map"
        >
          <PlkMap values={SHORTAGE} scaleFrom="#dcfce7" scaleTo="#b91c1c" height={300} />
          <Legend
            items={[
              { label: "เพียงพอ", color: "#dcfce7" },
              { label: "ใกล้หมด", color: "#f59e0b" },
              { label: "ขาดแคลน", color: "#b91c1c" },
            ]}
          />
          <p className="sub mt-2">ตัวเลขบนแผนที่ = ระดับความขาดแคลน (0–100)</p>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_400px] mb-5">
        {/* allocation requests */}
        <Card
          title="คำขอจัดสรรทรัพยากรจากพื้นที่"
          desc="เรียงตามระดับความเร่งด่วนและความเสี่ยงของพื้นที่"
          icon="clipboard"
          pad={false}
          action={<Chip bg="#fef3c7" fg="#b45309">รอจัดสรร 4 คำขอ</Chip>}
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
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11.5px] text-muted">{r.id}</span>
                  <Chip bg={r.bg} fg={r.fg}>
                    {r.urgency}
                  </Chip>
                  <span className="text-[11px] text-faint">{r.date}</span>
                </div>
                <p className="text-[13.5px] font-bold mt-1">{r.from}</p>
                <p className="sub">อ.{r.dist}</p>
                <div className="grid gap-1.5 mt-2">
                  <p className="flex items-start gap-2 text-[12.5px]">
                    <span className="text-faint mt-[1px] shrink-0">
                      <Icon name="db" size={14} />
                    </span>
                    {r.items}
                  </p>
                  <p className="flex items-start gap-2 text-[12px] text-muted">
                    <span className="text-faint mt-[1px] shrink-0">
                      <Icon name="shield" size={14} />
                    </span>
                    เหตุผล: {r.why}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="btn btn-sm">ดูรายละเอียด</button>
                  <button className="btn btn-sm">ปรับจำนวน</button>
                  <button
                    className="btn btn-sm"
                    style={{ borderColor: "#fca5a5", color: "#b91c1c" }}
                  >
                    ไม่อนุมัติ
                  </button>
                  <button className="btn btn-sm btn-primary">
                    <Icon name="check" size={14} /> อนุมัติจัดสรร
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-4 content-start">
          {/* AI allocation */}
          <Card
            title="ข้อเสนอการจัดสรรจาก AI"
            desc="คำนวณจากคะแนนความเสี่ยง จำนวนผู้ป่วย และค่าดัชนีลูกน้ำรายอำเภอ"
            icon="sparkles"
          >
            <div className="grid gap-2.5">
              {[
                ["เมืองพิษณุโลก", "น้ำยาเคมี 60 ล. · ทรายอะเบท 400 กก.", 92, "#dc2626"],
                ["วังทอง", "น้ำยาเคมี 40 ล. · เครื่องพ่น 2 เครื่อง", 81, "#ea580c"],
                ["บางระกำ", "โลชันกันยุง 400 ขวด", 64, "#f59e0b"],
                ["พรหมพิราม", "ทรายอะเบท 150 กก.", 51, "#f59e0b"],
              ].map(([d, items, score, c]) => (
                <div key={String(d)} className="rounded-xl border border-line-brd p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-semibold flex-1">อ.{d}</span>
                    <Chip bg={`${c}18`} fg={String(c)}>
                      เสี่ยง {score}
                    </Chip>
                  </div>
                  <p className="sub mt-1">{items}</p>
                </div>
              ))}
            </div>
            <button className="btn btn-primary w-full mt-3">
              <Icon name="check" size={16} /> จัดสรรตามข้อเสนอทั้งหมด
            </button>
          </Card>

          {/* survey round */}
          <Card
            title="รอบสำรวจทรัพยากร"
            desc="รอบที่ 8/2569 · ปิดรับ 30 ส.ค. 2569"
            icon="clipboard"
          >
            <div className="flex justify-between text-[12.5px] mb-1.5">
              <span className="text-muted">หน่วยที่รายงานแล้ว</span>
              <span className="font-semibold tabular-nums">132 / 163 (81%)</span>
            </div>
            <Progress value={81} />
            <div className="grid gap-2.5 mt-4">
              {[
                ["โรงพยาบาล", "15 / 15", 100],
                ["สสอ.", "9 / 9", 100],
                ["รพ.สต.", "104 / 135", 77],
                ["เทศบาล/อบต.", "4 / 4", 100],
              ].map(([n, v, p]) => (
                <div key={String(n)}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-muted">{n}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </div>
                  <Progress
                    value={Number(p)}
                    height={5}
                    color={Number(p) === 100 ? "#16a34a" : "#f59e0b"}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-sm w-full mt-3">
              <Icon name="bell" size={14} /> ทวงหน่วยที่ยังไม่รายงาน (31)
            </button>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card
          title="อัตราการใช้ทรัพยากรรายเดือน"
          desc="เปรียบเทียบปริมาณที่จ่ายออกกับที่ได้รับเข้า"
          icon="chart"
        >
          <BarChart
            height={200}
            colors={["#2563eb", "#93c5fd"]}
            data={[
              { w: "เม.ย.", out: 220, in: 300 },
              { w: "พ.ค.", out: 310, in: 280 },
              { w: "มิ.ย.", out: 420, in: 350 },
              { w: "ก.ค.", out: 540, in: 400 },
              { w: "ส.ค.", out: 680, in: 380 },
            ]}
            keys={["out", "in"]}
            labels={["จ่ายออก (หน่วยเทียบ)", "รับเข้า (หน่วยเทียบ)"]}
          />
          <p className="sub mt-2">
            อัตราการใช้เพิ่มขึ้นเร็วกว่าการเติมคลัง — ควรเร่งจัดซื้อหรือขอสนับสนุนเพิ่ม
          </p>
        </Card>

        <Card
          title="ความเพียงพอเทียบกับภาระโรครายอำเภอ"
          desc="อำเภอที่มีผู้ป่วยมากแต่ทรัพยากรน้อย = ต้องจัดสรรก่อน"
          icon="db"
          pad={false}
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr>
                  <th className="th">อำเภอ</th>
                  <th className="th">ผู้ป่วยสะสม</th>
                  <th className="th">ความเพียงพอ</th>
                  <th className="th">ลำดับจัดสรร</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICT_LOAD.map((d, i) => {
                  const suf = SUFFICIENCY[d.d];
                  const tone =
                    suf >= 80
                      ? { bg: "#dcfce7", fg: "#15803d" }
                      : suf >= 55
                        ? { bg: "#fef3c7", fg: "#b45309" }
                        : { bg: "#fee2e2", fg: "#b91c1c" };
                  return (
                    <tr key={d.d} className="hover:bg-surface2">
                      <td className="td font-medium">{d.d}</td>
                      <td className="td tabular-nums">{d.n} ราย</td>
                      <td className="td">
                        <div className="flex items-center gap-2.5 w-[150px]">
                          <Progress value={suf} color={tone.fg} />
                          <span className="text-[11.5px] font-semibold tabular-nums w-9 text-right">
                            {suf}%
                          </span>
                        </div>
                      </td>
                      <td className="td">
                        <Chip bg={tone.bg} fg={tone.fg}>
                          {i < 2 ? `ลำดับ ${i + 1} · เร่งด่วน` : i < 4 ? `ลำดับ ${i + 1}` : "ตามรอบปกติ"}
                        </Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
