import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Progress, Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

const NOTIFICATIONS = [
  {
    id: "PLK-6809-0142",
    disease: "ไข้เลือดออก",
    area: "ต.บางกระทุ่ม อ.บางกระทุ่ม",
    recipients: "ทีม SRRT บางกระทุ่ม 5 คน",
    sentAt: "วันนี้ 09:41",
    status: "รับเคสแล้ว",
    response: "นายกิตติศักดิ์ · 09:44",
    rate: 80,
    tone: { bg: "#dcfce7", fg: "#15803d" },
  },
  {
    id: "PLK-6809-0141",
    disease: "มือ เท้า ปาก",
    area: "ต.ชัยนาม อ.วังทอง",
    recipients: "ทีม CDCU วังทอง 4 คน",
    sentAt: "วันนี้ 08:12",
    status: "รอรับเคส",
    response: "อ่านแล้ว 3/4 คน",
    rate: 75,
    tone: { bg: "#fef3c7", fg: "#b45309" },
  },
  {
    id: "PLK-6809-0139",
    disease: "เลปโตสไปโรซิส",
    area: "ต.ท่านางงาม อ.บางระกำ",
    recipients: "ทีม CDCU บางระกำ 6 คน",
    sentAt: "เมื่อวาน 19:35",
    status: "รับเคสแล้ว",
    response: "นางสุพรรณี · 19:43",
    rate: 100,
    tone: { bg: "#dcfce7", fg: "#15803d" },
  },
  {
    id: "PLK-6809-0137",
    disease: "โรคหัด",
    area: "ต.วงฆ้อง อ.พรหมพิราม",
    recipients: "ทีม SRRT จังหวัด 8 คน",
    sentAt: "26 ส.ค. 14:08",
    status: "รับเคสแล้ว",
    response: "นายสมชาติ · 14:12",
    rate: 88,
    tone: { bg: "#dcfce7", fg: "#15803d" },
  },
  {
    id: "PLK-6809-0132",
    disease: "อาหารเป็นพิษ",
    area: "ต.บ้านแยง อ.นครไทย",
    recipients: "ทีม CDCU นครไทย 5 คน",
    sentAt: "25 ส.ค. 11:24",
    status: "ปิดการแจ้งเตือน",
    response: "รับทราบครบ 5/5 คน",
    rate: 100,
    tone: { bg: "#e0f2fe", fg: "#0369a1" },
  },
];

export default function NotificationRegistryPage() {
  return (
    <>
      <PageHead
        title="ทะเบียนแจ้งเคสและผลการตอบกลับ"
        desc="ติดตามทุกเคสที่หน่วยบริการแจ้งผ่านไลน์หมอพร้อม ตั้งแต่ส่งข้อความ อ่าน รับทราบ จนถึงทีม SRRT/CDCU กดรับเคส"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> ส่งออกทะเบียน
            </button>
            <Link href="/unit/notify" className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> แจ้งเคสใหม่
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="แจ้งเคสวันนี้" value={7} unit="เคส" icon="send" />
        <Stat label="ทีมกดรับเคสแล้ว" value={5} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="รอการตอบกลับ" value={2} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="เวลาตอบกลับมัธยฐาน" value={8} unit="นาที" icon="wave" tone="var(--info)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] mb-5">
        <Card
          title="รายการแจ้งเคส"
          desc="รวมผลตอบกลับจาก Flex หมอพร้อมและ Dashboard กลางในทะเบียนเดียวกัน"
          icon="clipboard"
          pad={false}
          action={
            <Chip bg="#fef3c7" fg="#b45309" dot>
              ต้องติดตาม 2 เคส
            </Chip>
          }
        >
          <div className="p-3 sm:p-4 border-b border-line-brd flex flex-wrap gap-2">
            <div className="flex items-center gap-2 h-9 px-3 rounded-[10px] bg-surface2 border border-line-brd min-w-[220px] flex-1">
              <Icon name="search" size={15} />
              <span className="text-[12.5px] text-faint">ค้นหาเลขเคส โรค หรือพื้นที่…</span>
            </div>
            <button className="btn btn-sm">ทุกสถานะ</button>
            <button className="btn btn-sm">ช่วงเวลา: 7 วัน</button>
          </div>

          <div className="scroll-x nice">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr>
                  <th className="th">เคส / พื้นที่</th>
                  <th className="th">โรค</th>
                  <th className="th">ผู้รับ</th>
                  <th className="th">เวลาส่ง</th>
                  <th className="th">ผลตอบกลับ</th>
                  <th className="th">การเข้าถึง</th>
                  <th className="th">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {NOTIFICATIONS.map((item) => (
                  <tr key={item.id} className="hover:bg-surface2">
                    <td className="td">
                      <p className="font-semibold tabular-nums">{item.id}</p>
                      <p className="text-[11.5px] text-muted mt-0.5">{item.area}</p>
                    </td>
                    <td className="td font-medium">{item.disease}</td>
                    <td className="td">
                      <p>{item.recipients}</p>
                      <p className="text-[11px] text-[#06a845] mt-0.5">Flex หมอพร้อม</p>
                    </td>
                    <td className="td text-muted whitespace-nowrap">{item.sentAt}</td>
                    <td className="td">
                      <p className="font-medium">{item.response}</p>
                      <Link href="/flex" className="text-[11px] text-[var(--accent)] mt-0.5 inline-flex items-center gap-1">
                        ดูข้อความ <Icon name="arrowRight" size={11} />
                      </Link>
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-2 min-w-[110px]">
                        <Progress value={item.rate} color={item.rate === 100 ? "#16a34a" : "#f59e0b"} />
                        <span className="text-[11.5px] font-semibold tabular-nums w-8 text-right">{item.rate}%</span>
                      </div>
                    </td>
                    <td className="td">
                      <Chip bg={item.tone.bg} fg={item.tone.fg} dot>
                        {item.status}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="เส้นทางตอบกลับล่าสุด" icon="clock" desc="เคส PLK-6809-0142">
            <ol className="grid gap-0">
              {[
                ["09:41", "ส่ง Flex Message", "ถึงทีม SRRT บางกระทุ่ม 5 คน", "send", true],
                ["09:42", "อ่านข้อความแล้ว", "4 จาก 5 คน", "chat", true],
                ["09:44", "กดรับทราบ", "นายกิตติศักดิ์ แสงเพชร", "check", true],
                ["09:44", "รับเคสเข้าทีม", "กำหนดลงพื้นที่ภายใน 3 ชม.", "shield", true],
                ["รอ", "เริ่มสอบสวนภาคสนาม", "ระบบจะแจ้งกลับอัตโนมัติ", "field", false],
              ].map(([time, title, detail, icon, done], index, rows) => (
                <li key={String(title)} className="flex gap-3 relative pb-4 last:pb-0">
                  {index < rows.length - 1 && (
                    <span className="absolute left-[13px] top-7 bottom-0 w-px bg-line-brd" />
                  )}
                  <span
                    className="relative z-10 grid place-items-center rounded-full shrink-0"
                    style={{
                      width: 27,
                      height: 27,
                      background: done ? "#dcfce7" : "#f1f5f9",
                      color: done ? "#15803d" : "#94a3b8",
                    }}
                  >
                    <Icon name={icon as "check"} size={13} />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[12.5px] font-semibold">{title}</p>
                      <span className="text-[10.5px] text-faint tabular-nums shrink-0">{time}</span>
                    </div>
                    <p className="sub mt-0.5">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

        </div>
      </div>
    </>
  );
}
