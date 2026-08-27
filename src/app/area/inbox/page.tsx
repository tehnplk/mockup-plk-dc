import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

/** เคสที่ Dashboard กลางมอบหมายมาให้หน่วยบริการกดรับ */
const ASSIGNED = [
  {
    id: "PLK-6809-0142",
    name: "นายกฤษฎา พรมเรือง",
    patient: "ชาย 34 ปี",
    disease: "ไข้เลือดออก",
    color: "#dc2626",
    area: "ม.4 ต.บางกระทุ่ม",
    at: "27 ส.ค. 08:14",
    urgent: true,
  },
  {
    id: "PLK-6809-0140",
    name: "ด.ญ.ปุณยนุช แสนคำ",
    patient: "หญิง 8 ปี",
    disease: "มือ เท้า ปาก",
    color: "#059669",
    area: "ม.2 ต.สนามคลี",
    at: "27 ส.ค. 07:55",
    urgent: false,
  },
  {
    id: "PLK-6809-0138",
    name: "นายบรรจง คำใส",
    patient: "ชาย 57 ปี",
    disease: "เลปโตสไปโรซิส",
    color: "#ca8a04",
    area: "ม.7 ต.โคกสลุด",
    at: "26 ส.ค. 19:31",
    urgent: true,
  },
];

export default function UnitInbox() {
  return (
    <>
      <PageHead
        title="รับเคสเข้าหน่วยบริการ"
        desc="กดรับเคสได้ 2 ช่องทางตาม spec — จาก Dashboard กลางของจังหวัด หรือจาก Flex Message บนไลน์หมอพร้อม โดยทั้งสองช่องทางบันทึกเวลารับเข้าระบบติดตามเดียวกัน"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="settings" size={15} /> ตั้งค่าการมอบหมาย
            </button>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการรับเคส
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="รอกดรับเคส" value={3} unit="เคส" icon="bell" tone="var(--danger)" />
        <Stat label="รับแล้ววันนี้" value={5} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="เกินเวลา SLA 3 ชม." value={1} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="เวลารับเฉลี่ย" value="46" unit="นาที" icon="wave" tone="var(--info)" />
      </div>

      <div className="grid gap-4">
        <div className="flex min-w-0 flex-col gap-4">
          <Card
            title="เคสที่รอกดรับ"
            desc="มอบหมายจาก Dashboard กลาง สสจ.พิษณุโลก และแจ้งซ้ำทางไลน์หมอพร้อม"
            icon="check"
            pad={false}
            action={
              <Chip bg="#fee2e2" fg="#b91c1c" dot>
                ต้องรับภายใน 3 ชั่วโมง
              </Chip>
            }
          >
            <ul>
              {ASSIGNED.map((c) => (
                <li
                  key={c.id}
                  className="p-4 border-b border-line-brd last:border-0 flex flex-wrap items-center gap-3"
                >
                  <span
                    className="grid place-items-center rounded-xl shrink-0"
                    style={{ width: 40, height: 40, background: `${c.color}18`, color: c.color }}
                  >
                    <Icon name="hospital" size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13.5px] font-bold">{c.name}</span>
                      <span className="font-mono text-[12px] font-semibold text-muted">{c.id}</span>
                      <Chip bg={`${c.color}18`} fg={c.color} dot>
                        {c.disease}
                      </Chip>
                    </div>
                    <p className="sub mt-1">
                      {c.patient} · {c.area} · {c.at}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="btn btn-sm">
                      <Icon name="file" size={14} /> ดูรายละเอียด
                    </button>
                    <button className="btn btn-sm btn-primary">
                      <Icon name="check" size={14} /> กดรับเคส
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
