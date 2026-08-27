import Link from "next/link";
import PhoneShell, { Sheet, Row } from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip, Progress, initial } from "@/components/ui";
import { TEAM_MEMBERS } from "@/lib/mock";
import { FIELD_TABS } from "../tabs";

export default function MePage() {
  return (
    <PhoneShell
      url="cdc.plkhealth.go.th/field/me"
      title="ทีมและโปรไฟล์"
      subtitle="ทีม SRRT อ.เมืองพิษณุโลก"
      caption="ระบบงานภาคสนาม · Web Mobile · ทีม/โปรไฟล์"
      tabs={FIELD_TABS}
    >
      {/* profile head */}
      <div className="px-4 pt-5 pb-6 text-center bg-surface border-b border-line-brd">
        <span
          className="grid place-items-center rounded-full mx-auto text-[24px] font-bold"
          style={{ width: 76, height: 76, background: "#ffedd5", color: "#ea580c" }}
        >
          ก
        </span>
        <p className="text-[16px] font-bold mt-3">นายกิตติศักดิ์ แสงเพชร</p>
        <p className="text-[12px] text-muted">นักสาธารณสุขปฏิบัติการ (SRRT) · รพ.สต.บ้านคลอง</p>
        <div className="flex justify-center gap-2 mt-2.5">
          <Chip bg="#dcfce7" fg="#15803d" dot>
            ออนไลน์
          </Chip>
          <Chip bg="#dbeafe" fg="#1d4ed8">
            เชื่อมไลน์หมอพร้อมแล้ว
          </Chip>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {[
            ["14", "เคสเดือนนี้"],
            ["96%", "ส่งตรงเวลา"],
            ["4.8", "คะแนนคุณภาพ"],
          ].map(([v, l]) => (
            <div key={l} className="bg-surface rounded-xl border border-line-brd px-3 py-3 text-center">
              <p className="text-[18px] font-bold leading-none" style={{ color: "var(--accent)" }}>
                {v}
              </p>
              <p className="text-[10.5px] text-muted mt-1.5">{l}</p>
            </div>
          ))}
        </div>

        <Sheet title="สถานะการซิงก์ข้อมูล">
          <Row label="ข้อมูลสอบสวน" value="ซิงก์แล้ว 09:41" icon="clipboard" />
          <Row label="รูปภาพ" value="รอซิงก์ 2 รายการ" icon="camera" />
          <Row label="ไฟล์เสียง" value="รอซิงก์ 1 รายการ" icon="mic" />
          <Row label="พิกัด" value="ซิงก์แล้วทั้งหมด" icon="pin" />
          <div className="mt-3">
            <div className="flex justify-between text-[11.5px] mb-1.5">
              <span className="text-muted">กำลังอัปโหลด</span>
              <span className="font-semibold">72%</span>
            </div>
            <Progress value={72} />
          </div>
          <button className="btn btn-sm w-full mt-3">
            <Icon name="db" size={14} /> ซิงก์เดี๋ยวนี้
          </button>
        </Sheet>

        <Sheet title="สมาชิกทีม" action={<Chip bg="#f1f5f9" fg="#475569">{TEAM_MEMBERS.length} คน</Chip>}>
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0"
            >
              <span className="relative shrink-0">
                <span
                  className="grid place-items-center rounded-full w-9 h-9 text-[12px] font-bold"
                  style={{ background: "#ffedd5", color: "#ea580c" }}
                >
                  {initial(m.name)}
                </span>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: m.on ? "var(--ok)" : "#cbd5e1" }}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold truncate">{m.name}</span>
                <span className="block text-[11px] text-muted truncate">{m.role}</span>
              </span>
              <button className="text-faint">
                <Icon name="chat" size={17} />
              </button>
            </div>
          ))}
        </Sheet>

        <Sheet title="งานที่ได้รับมอบหมายวันนี้">
          {[
            ["สำรวจลูกน้ำ ม.4 ต.บ้านคลอง", "09:00–12:00", true],
            ["พ่นหมอกควันรัศมี 100 ม.", "13:00–15:00", false],
            ["ให้ความรู้ชุมชน ศาลาหมู่บ้าน", "15:30–16:30", false],
          ].map(([t, time, done]) => (
            <div key={String(t)} className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0">
              <span
                className="grid place-items-center rounded-full w-[18px] h-[18px] shrink-0"
                style={{
                  background: done ? "var(--accent)" : "#f1f5f9",
                  color: done ? "#fff" : "var(--faint)",
                }}
              >
                <Icon name="check" size={11} />
              </span>
              <span className="text-[12.5px] flex-1" style={{ color: done ? "var(--muted)" : "var(--text)" }}>
                {t}
              </span>
              <span className="text-[11px] text-faint tabular-nums">{time}</span>
            </div>
          ))}
        </Sheet>

        <Sheet title="ตั้งค่า">
          {[
            ["บันทึกข้อมูลแบบออฟไลน์", "settings", true],
            ["ฝังพิกัดลงบนรูปภาพ", "pin", true],
            ["แจ้งเตือนเคสใหม่ทันที", "bell", true],
            ["ถอดความเสียงอัตโนมัติ", "mic", true],
          ].map(([t, ic, on]) => (
            <div key={String(t)} className="flex items-center gap-3 py-2.5 border-b border-line-brd last:border-0">
              <span className="text-faint">
                <Icon name={ic as "pin"} size={17} />
              </span>
              <span className="text-[12.5px] flex-1">{t}</span>
              <span
                className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                style={{
                  background: on ? "var(--accent)" : "#cbd5e1",
                  justifyContent: on ? "flex-end" : "flex-start",
                }}
              >
                <span className="w-4 h-4 rounded-full bg-white" />
              </span>
            </div>
          ))}
        </Sheet>

        <Link href="/" className="btn w-full mb-2">
          <Icon name="arrowLeft" size={16} /> กลับหน้ารวมระบบ
        </Link>
      </div>
    </PhoneShell>
  );
}
