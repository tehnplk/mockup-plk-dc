import { Card, Chip, Stat } from "./ui";
import { Icon } from "./icons";
import { DOCUMENTS } from "@/lib/mock";

const TAG_TONE: Record<string, { bg: string; fg: string }> = {
  "ร.507": { bg: "#fee2e2", fg: "#b91c1c" },
  LAB: { bg: "#e0f2fe", fg: "#0369a1" },
  ภาคสนาม: { bg: "#ffedd5", fg: "#c2410c" },
  AI: { bg: "#ede9fe", fg: "#6d28d9" },
  รายงาน: { bg: "#dcfce7", fg: "#15803d" },
  หนังสือ: { bg: "#f1f5f9", fg: "#475569" },
};

export default function DocumentLibrary({ owner }: { owner: string }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="เอกสารทั้งหมด" value="1,284" unit="ไฟล์" icon="file" />
        <Stat label="อัปโหลดเดือนนี้" value={96} unit="ไฟล์" icon="plus" />
        <Stat label="พื้นที่ที่ใช้" value="18.4" unit="GB / 100 GB" icon="db" />
        <Stat label="เอกสารรอตรวจสอบ" value={5} unit="ไฟล์" icon="clock" tone="var(--warn)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* filters */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="หมวดเอกสาร" icon="grid">
            <ul className="grid gap-1">
              {[
                ["ทั้งหมด", 1284, true],
                ["แบบสอบสวนโรค", 412, false],
                ["ผลตรวจ LAB", 336, false],
                ["ภาพถ่ายภาคสนาม", 288, false],
                ["บันทึกเสียง/ถอดความ", 124, false],
                ["รายงานสถานการณ์", 78, false],
                ["หนังสือราชการ", 46, false],
              ].map(([l, n, active]) => (
                <li key={String(l)}>
                  <button
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12.5px] font-medium"
                    style={{
                      background: active
                        ? "color-mix(in srgb, var(--accent) 11%, #fff)"
                        : "transparent",
                      color: active ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    <Icon name="file" size={14} />
                    <span className="flex-1 text-left">{l}</span>
                    <span className="text-[11px] tabular-nums text-faint">{n}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="กรองข้อมูล" icon="search">
            <div className="grid gap-3">
              <div>
                <span className="lbl">ช่วงเวลา</span>
                <select className="inp" defaultValue="30">
                  <option value="30">30 วันล่าสุด</option>
                  <option value="90">3 เดือนล่าสุด</option>
                  <option value="365">1 ปีล่าสุด</option>
                </select>
              </div>
              <div>
                <span className="lbl">โรค</span>
                <select className="inp" defaultValue="all">
                  <option value="all">ทุกโรค</option>
                  <option value="d">ไข้เลือดออก</option>
                </select>
              </div>
              <div>
                <span className="lbl">ผู้บันทึก</span>
                <select className="inp" defaultValue="all">
                  <option value="all">ทุกหน่วยงาน</option>
                  <option value="me">{owner}</option>
                </select>
              </div>
              <button className="btn btn-primary btn-sm">ใช้ตัวกรอง</button>
            </div>
          </Card>
        </div>

        <Card
          title="คลังเอกสาร"
          desc="ค้นคืนด้วยชื่อไฟล์ รหัสเคส HN หรือข้อความในเอกสาร (Full-text OCR)"
          icon="file"
          pad={false}
          action={
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg bg-surface2 border border-line-brd w-[250px]">
                <span className="text-faint">
                  <Icon name="search" size={14} />
                </span>
                <input
                  className="bg-transparent text-[12.5px] outline-none w-full placeholder:text-faint"
                  placeholder="ค้นหาในเอกสาร…"
                  readOnly
                />
              </div>
              <button className="btn btn-primary btn-sm">
                <Icon name="plus" size={14} /> อัปโหลด
              </button>
            </div>
          }
        >
          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[760px]">
              <thead>
                <tr>
                  <th className="th w-8"></th>
                  <th className="th">ชื่อเอกสาร</th>
                  <th className="th">ประเภท</th>
                  <th className="th">ผู้บันทึก</th>
                  <th className="th">วันที่</th>
                  <th className="th">ขนาด</th>
                  <th className="th"></th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((d) => (
                  <tr key={d.id} className="hover:bg-surface2">
                    <td className="td">
                      <span
                        className="grid place-items-center rounded-lg"
                        style={{
                          width: 30,
                          height: 30,
                          background: TAG_TONE[d.tag]?.bg,
                          color: TAG_TONE[d.tag]?.fg,
                        }}
                      >
                        <Icon name="file" size={15} />
                      </span>
                    </td>
                    <td className="td">
                      <div className="font-medium leading-snug">{d.name}</div>
                      <div className="text-[11px] text-faint font-mono">{d.id}</div>
                    </td>
                    <td className="td">
                      <Chip {...(TAG_TONE[d.tag] ?? {})}>{d.type}</Chip>
                    </td>
                    <td className="td text-muted">{d.by}</td>
                    <td className="td text-muted whitespace-nowrap">{d.date}</td>
                    <td className="td text-muted tabular-nums">{d.size}</td>
                    <td className="td">
                      <div className="flex gap-1.5 justify-end">
                        <button className="btn btn-sm">เปิด</button>
                        <button className="btn btn-sm">
                          <Icon name="link" size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="sub">แสดง 1–6 จาก 1,284 รายการ</span>
            <div className="flex gap-1.5">
              <button className="btn btn-sm">ก่อนหน้า</button>
              <button className="btn btn-sm btn-primary">1</button>
              <button className="btn btn-sm">2</button>
              <button className="btn btn-sm">3</button>
              <button className="btn btn-sm">ถัดไป</button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
