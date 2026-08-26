import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Avatar } from "@/components/ui";
import { Icon } from "@/components/icons";
import FlexCard from "@/components/FlexCard";
import { TEAM_MEMBERS } from "@/lib/mock";

export default function NotifyPage() {
  const selected = TEAM_MEMBERS.filter((m) => m.on).length;

  return (
    <>
      <PageHead
        title="ส่ง Flex Message เข้าไลน์หมอพร้อม"
        desc="แจ้งเตือนทีมเจ้าหน้าที่ที่คัดเลือกไว้ พร้อมปุ่มกดรับทราบและลิงก์ไปยัง PHR ของผู้ป่วย"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ตั้งเวลาส่ง
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> ส่งให้ {selected} คน
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          <Card
            title="เลือกผู้รับ"
            desc="รายชื่อทีมเจ้าหน้าที่ที่ลงทะเบียนไลน์หมอพร้อมกับ สสจ.พิษณุโลก"
            icon="users"
            action={
              <div className="flex items-center gap-2">
                <Chip bg="#dcfce7" fg="#15803d">
                  เลือกแล้ว {selected} คน
                </Chip>
                <button className="btn btn-sm">เลือกทั้งหมด</button>
              </div>
            }
            pad={false}
          >
            <div className="p-4 sm:p-5 grid gap-2.5">
              {TEAM_MEMBERS.map((m) => (
                <label
                  key={m.name}
                  className="flex items-center gap-3 rounded-xl border p-3 cursor-pointer"
                  style={{
                    borderColor: m.on ? "var(--accent)" : "var(--border)",
                    background: m.on
                      ? "color-mix(in srgb, var(--accent) 6%, #fff)"
                      : "#fff",
                  }}
                >
                  <span
                    className="grid place-items-center rounded-md w-[18px] h-[18px] shrink-0 border-2"
                    style={{
                      background: m.on ? "var(--accent)" : "#fff",
                      borderColor: m.on ? "var(--accent)" : "#cbd5e1",
                      color: "#fff",
                    }}
                  >
                    {m.on && <Icon name="check" size={11} />}
                  </span>
                  <Avatar name={m.name} size={34} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold truncate">{m.name}</span>
                    <span className="block text-[11.5px] text-muted truncate">
                      {m.role} · {m.org}
                    </span>
                  </span>
                  <Chip bg="#dcfce7" fg="#15803d" dot>
                    หมอพร้อม
                  </Chip>
                </label>
              ))}
            </div>

            <div className="px-4 sm:px-5 pb-5">
              <p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2">
                กลุ่มผู้รับสำเร็จรูป
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "ทีม SRRT อำเภอเมือง (5)",
                  "ทีม CDCU จังหวัด (8)",
                  "รพ.สต. ในพื้นที่ (12)",
                  "ผู้บริหาร สสจ. (4)",
                  "สคร.2 พิษณุโลก (3)",
                ].map((g, i) => (
                  <button
                    key={g}
                    className="px-3 py-1.5 rounded-full text-[12px] font-medium border"
                    style={{
                      background: i === 0 ? "var(--accent)" : "#fff",
                      color: i === 0 ? "#fff" : "var(--muted)",
                      borderColor: i === 0 ? "transparent" : "var(--border)",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="เนื้อหาข้อความ" icon="chat">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="lbl">เทมเพลต</span>
                <select className="inp" defaultValue="urgent">
                  <option value="urgent">แจ้งเคสเร่งด่วน (โรคติดต่ออันตราย)</option>
                  <option value="normal">แจ้งเคสเฝ้าระวังทั่วไป</option>
                  <option value="cluster">แจ้งกลุ่มก้อนการระบาด (Cluster)</option>
                </select>
              </div>
              <div>
                <span className="lbl">ระดับความสำคัญ</span>
                <div className="flex gap-2">
                  {["ปกติ", "เร่งด่วน", "วิกฤต"].map((o, i) => (
                    <button
                      key={o}
                      className="flex-1 py-2 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: i === 1 ? "#dc2626" : "#fff",
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
                <span className="lbl">ข้อความนำ (แสดงในรายการแชท)</span>
                <input
                  className="inp"
                  readOnly
                  defaultValue="[เร่งด่วน] เคสไข้เลือดออกรายใหม่ อ.เมืองพิษณุโลก กรุณากดรับทราบ"
                />
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">ผู้ส่ง (แสดงเป็น footer บนการ์ด)</span>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <input className="inp" readOnly defaultValue="พญ.นภัสสร ชัยวัฒน์" />
                  <input className="inp" readOnly defaultValue="แพทย์เวรควบคุมโรค" />
                  <input className="inp" readOnly defaultValue="รพ.พุทธชินราช พิษณุโลก" />
                </div>
                <p className="sub mt-1.5">
                  ชื่อ · ตำแหน่ง · หน่วยงาน — ผู้รับจะเห็นว่าใครเป็นผู้ส่งข้อความนี้
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="lbl">ปุ่มบนการ์ด</span>
                <div className="grid gap-2">
                  {[
                    ["กดรับทราบ", "บันทึกเวลารับทราบเข้าระบบติดตาม", true],
                    ["เปิดระบบงานภาคสนาม", "ลิงก์ไปยังระบบที่ 2 เพื่อรับเคสและสอบสวน", true],
                    ["ดูพิกัดบนแผนที่", "เปิดแผนที่การระบาดในบริเวณนั้น", true],
                    ["โทรหาผู้แจ้งเคส", "โทรออกหาแพทย์เจ้าของเคสโดยตรง", false],
                  ].map(([n, d, on]) => (
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
                      <span className="flex-1">
                        <span className="block text-[12.5px] font-semibold">{n}</span>
                        <span className="block text-[11px] text-muted">{d}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* preview */}
        <div className="grid gap-4 content-start">
          <Card title="ตัวอย่างข้อความบนไลน์หมอพร้อม" icon="chat">
            <div
              className="rounded-2xl p-4 flex justify-center"
              style={{ background: "#8ab4d8" }}
            >
              <div>
                <p className="text-[10.5px] text-white/90 mb-1.5 text-center">
                  วันนี้ 09:41
                </p>
                <FlexCard width={272} />
              </div>
            </div>
            <p className="sub mt-3">
              ขนาดการ์ด: Bubble (mega) · รองรับ LINE 12.0 ขึ้นไป
            </p>
          </Card>

          <Card title="สถานะการรับทราบ (เคสก่อนหน้า)" icon="check">
            <div className="grid gap-2.5">
              {[
                ["นพ.ธนากร วงศ์วิวัฒน์", "รับทราบ 09:12", true],
                ["ภญ.สุพรรณี ทรัพย์เจริญ", "รับทราบ 09:15", true],
                ["น.ส.วราภรณ์ อินทร์ทอง", "อ่านแล้ว ยังไม่กดรับทราบ", false],
                ["นางพรทิพย์ ชูเกียรติ", "ยังไม่อ่าน", false],
              ].map(([n, s, ok]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <Avatar name={String(n)} size={28} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium truncate">{n}</span>
                    <span className="block text-[11px] text-muted">{s}</span>
                  </span>
                  <span style={{ color: ok ? "var(--ok)" : "var(--faint)" }}>
                    <Icon name={ok ? "check" : "clock"} size={16} />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl p-3" style={{ background: "#f0fdfa" }}>
              <p className="text-[12.5px]" style={{ color: "#0f766e" }}>
                อัตราการรับทราบภายใน 30 นาที: <strong>82%</strong> (เป้าหมาย 90%)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
