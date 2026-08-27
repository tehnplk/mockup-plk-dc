import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import PublicFlexCard from "@/components/PublicFlexCard";

export default function Broadcast() {
  return (
    <>
      <PageHead
        title="แจ้งข่าวประชาชนในพื้นที่ระบาดด้วยไลน์หมอพร้อม"
        desc="ส่งข้อความถึงประชาชนทั้งพื้นที่ระบาดที่ผูกบัญชีหมอพร้อม · หากต้องการแจ้งรายบุคคลที่คัดเข้าจากเคส ให้ใช้หน้า “แจ้งเตือนประชาชนที่คัดเข้า”"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ตั้งเวลาส่ง
            </button>
            <button className="btn btn-sm">บันทึกร่าง</button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งข้อความ
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ผู้รับที่เข้าเกณฑ์" value="1,840" unit="คน" icon="users" />
        <Stat label="ส่งแล้วเดือนนี้" value={7} unit="ครั้ง" icon="megaphone" />
        <Stat label="อัตราการเปิดอ่านเฉลี่ย" value="76" unit="%" icon="chat" tone="var(--ok)" />
        <Stat label="กดดูรายละเอียดต่อ" value="31" unit="%" icon="link" tone="var(--info)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="เลือกพื้นที่เป้าหมาย"
            desc="ระบบคัดเลือกผู้รับจากทะเบียนที่อยู่ในระบบหมอพร้อม"
            icon="pin"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="lbl">วิธีเลือกพื้นที่</span>
                <div className="grid gap-2">
                  {[
                    ["รัศมีรอบจุดระบาด", "กำหนดระยะจากพิกัดผู้ป่วย", true],
                    ["ตามขอบเขตตำบล/หมู่บ้าน", "เลือกจากทะเบียนราษฎร์", false],
                    ["วาดพื้นที่บนแผนที่เอง", "Polygon แบบกำหนดเอง", false],
                  ].map(([t, d, on]) => (
                    <label
                      key={String(t)}
                      className="flex items-start gap-2.5 rounded-xl border p-3"
                      style={{
                        borderColor: on ? "var(--accent)" : "var(--border)",
                        background: on ? "color-mix(in srgb,var(--accent) 6%,#fff)" : "#fff",
                      }}
                    >
                      <span
                        className="grid place-items-center rounded-full w-[17px] h-[17px] shrink-0 border-2 mt-0.5"
                        style={{ borderColor: on ? "var(--accent)" : "#cbd5e1" }}
                      >
                        {on && (
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: "var(--accent)" }}
                          />
                        )}
                      </span>
                      <span>
                        <span className="block text-[12.5px] font-semibold">{t}</span>
                        <span className="block text-[11px] text-muted">{d}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="lbl">รัศมีจากจุดระบาด</span>
                <div className="flex gap-2 mb-3">
                  {["100 ม.", "500 ม.", "1 กม.", "3 กม."].map((o, i) => (
                    <button
                      key={o}
                      className="flex-1 py-2 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: i === 1 ? "var(--accent)" : "#fff",
                        color: i === 1 ? "#fff" : "var(--muted)",
                        borderColor: i === 1 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden border border-line-brd">
                  <svg viewBox="0 0 300 170" className="w-full" style={{ background: "#eaf0f2" }}>
                    {[
                      [12, 14, 80, 52],
                      [110, 10, 70, 46],
                      [200, 18, 88, 56],
                      [16, 90, 76, 60],
                      [110, 78, 74, 66],
                      [204, 92, 84, 54],
                    ].map(([x, y, w, h], i) => (
                      <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#dfe7ea" />
                    ))}
                    <path d="M100 0 V170" stroke="#fff" strokeWidth="8" />
                    <path d="M0 80 H300" stroke="#fff" strokeWidth="8" />
                    <circle cx="150" cy="84" r="66" fill="#7c3aed1f" stroke="#7c3aed" strokeDasharray="6 4" />
                    <circle cx="150" cy="84" r="24" fill="#dc262622" stroke="#dc2626" strokeDasharray="4 3" />
                    <circle cx="150" cy="84" r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
                    {Array.from({ length: 22 }).map((_, i) => {
                      const a = (i / 22) * Math.PI * 2;
                      const r = 20 + ((i * 37) % 44);
                      return (
                        <circle
                          key={i}
                          cx={150 + Math.cos(a) * r}
                          cy={84 + Math.sin(a) * r * 0.8}
                          r="2.4"
                          fill="#7c3aed"
                          opacity="0.75"
                        />
                      );
                    })}
                    <text x="10" y="163" fontSize="9" fill="#475569">
                      ผู้รับในรัศมี 500 ม. · 1,840 คน
                    </text>
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="lbl">กรองกลุ่มผู้รับเพิ่มเติม</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ทุกกลุ่มอายุ",
                    "ผู้สูงอายุ 60+",
                    "หญิงตั้งครรภ์",
                    "ผู้ป่วยโรคเรื้อรัง",
                    "ครอบครัวที่มีเด็กเล็ก",
                    "อสม.",
                  ].map((t, i) => (
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
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="เนื้อหาข่าวประชาสัมพันธ์" icon="megaphone">
            <div className="flex flex-col gap-4 min-w-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="lbl">ประเภทข่าว</span>
                  <select className="inp" defaultValue="warn">
                    <option value="warn">แจ้งเตือนพื้นที่ระบาด</option>
                    <option value="know">ให้ความรู้ป้องกันโรค</option>
                    <option value="event">เชิญชวนกิจกรรมรณรงค์</option>
                    <option value="follow">ติดตามพฤติกรรมสุขภาพ</option>
                  </select>
                </div>
                <div>
                  <span className="lbl">ภาษา</span>
                  <select className="inp" defaultValue="th">
                    <option value="th">ไทย</option>
                    <option value="th-simple">ไทย (ภาษาเข้าใจง่าย)</option>
                  </select>
                </div>
              </div>
              <div>
                <span className="lbl">หัวข้อ</span>
                <input className="inp" readOnly defaultValue="แจ้งเตือน: พื้นที่ของท่านพบผู้ป่วยไข้เลือดออก" />
              </div>
              <div>
                <span className="lbl">เนื้อหา</span>
                <textarea
                  className="inp min-h-[120px] resize-none"
                  readOnly
                  defaultValue={`เรียน พี่น้องประชาชน ม.4 บ้านคลองใหม่ ต.บ้านคลอง

ขณะนี้พบผู้ป่วยไข้เลือดออกในพื้นที่ของท่าน 6 ราย ขอความร่วมมือ
• สำรวจและทำลายแหล่งเพาะพันธุ์ยุงลายรอบบ้านทุก 7 วัน
• ปิดฝาภาชนะเก็บน้ำให้มิดชิด คว่ำภาชนะที่ไม่ใช้
• นอนในมุ้งหรือห้องที่มีมุ้งลวด ทายากันยุง
• หากมีไข้สูงเกิน 2 วัน อย่าซื้อยากลุ่ม NSAIDs กินเอง ให้รีบพบแพทย์

สอบถามเพิ่มเติม: รพ.สต.บ้านคลอง หรือสายด่วนกรมควบคุมโรค 1422`}
                />
              </div>
              <div>
                <span className="lbl">ผู้ส่ง (แสดงเป็น footer บนการ์ด)</span>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <input className="inp" readOnly defaultValue="นายวิรัตน์ สุขเกษม" />
                  <input className="inp" readOnly defaultValue="ผอ.รพ.สต.บ้านคลอง" />
                  <input className="inp" readOnly defaultValue="สสอ.เมืองพิษณุโลก" />
                </div>
              </div>

              <div>
                <span className="lbl">ปุ่มบนข้อความ</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ดูวิธีป้องกันโรค",
                    "แจ้งพบแหล่งลูกน้ำ",
                    "ประเมินอาการตนเอง",
                    "ค้นหาสถานพยาบาลใกล้ฉัน",
                  ].map((t, i) => (
                    <Chip key={t} bg={i < 3 ? "#ede9fe" : "#f1f5f9"} fg={i < 3 ? "#6d28d9" : "#64748b"}>
                      {i < 3 && <Icon name="check" size={11} />} {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* preview + history */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="ตัวอย่างบนไลน์หมอพร้อม" icon="chat">
            <div className="rounded-2xl p-4 flex justify-center" style={{ background: "#8ab4d8" }}>
              <div>
                <p className="text-[10.5px] text-white/90 mb-1.5 text-center">วันนี้ 09:41</p>
                <PublicFlexCard width={258} />
              </div>
            </div>
            <p className="sub mt-3">
              การ์ดมี footer ระบุชื่อ ตำแหน่ง และหน่วยงานผู้ส่ง เพื่อให้ประชาชนตรวจสอบแหล่งที่มาได้
            </p>
          </Card>

          <Card title="ประวัติการส่งล่าสุด" icon="clock" pad={false}>
            <ul>
              {[
                ["เตือนภัยไข้เลือดออก ม.4 บ้านคลองใหม่", "24 ส.ค.", "1,840", 78],
                ["รณรงค์ 3 เก็บ 3 โรค ทั้งตำบล", "18 ส.ค.", "5,120", 71],
                ["แจ้งพบมือเท้าปาก ศูนย์เด็กเล็ก ม.7", "12 ส.ค.", "480", 84],
                ["ประชาสัมพันธ์ฉีดวัคซีนไข้หวัดใหญ่", "5 ส.ค.", "5,120", 62],
              ].map(([n, d, r, open]) => (
                <li key={String(n)} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-medium flex-1 truncate">{n}</span>
                    <span className="text-[11px] text-faint">{d}</span>
                  </div>
                  <p className="sub mt-0.5">ผู้รับ {r} คน</p>
                  <div className="flex items-center gap-2.5 mt-2">
                    <Progress value={Number(open)} height={5} />
                    <span className="text-[11px] font-semibold tabular-nums w-9 text-right">
                      {open}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="ข้อควรระวัง" icon="shield">
            <ul className="grid gap-2 text-[12.5px] text-muted">
              {[
                "ห้ามระบุชื่อ-สกุลหรือที่อยู่ผู้ป่วยในข่าวประชาสัมพันธ์",
                "ตรวจสอบข้อความกับหัวหน้ากลุ่มงานก่อนส่งทุกครั้ง",
                "ส่งได้ไม่เกิน 2 ครั้ง/สัปดาห์ ต่อผู้รับ 1 คน",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[3px] shrink-0" style={{ color: "var(--warn)" }}>
                    <Icon name="bell" size={13} />
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
