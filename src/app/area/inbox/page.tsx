import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

/** เคสที่ Dashboard กลางมอบหมายมาให้หน่วยบริการกดรับ */
const ASSIGNED = [
  {
    id: "PLK-6809-0142",
    at: "27 ส.ค. 2569 08:14",
    hn: "0045218",
    cid: "3-6501-00452-18-1",
    name: "นายกฤษฎา พรมเรือง",
    patient: "ชาย 34 ปี",
    area: "ม.4 ต.บางกระทุ่ม",
    disease: "ไข้เลือดออก",
    color: "#dc2626",
  },
  {
    id: "PLK-6809-0140",
    at: "27 ส.ค. 2569 07:55",
    hn: "0093117",
    cid: "1-6506-00193-17-4",
    name: "ด.ญ.ปุณยนุช แสนคำ",
    patient: "หญิง 8 ปี",
    area: "ม.2 ต.สนามคลี",
    disease: "มือ เท้า ปาก",
    color: "#059669",
  },
  {
    id: "PLK-6809-0138",
    at: "26 ส.ค. 2569 19:31",
    hn: "0011084",
    cid: "3-6508-00110-84-7",
    name: "นายบรรจง คำใส",
    patient: "ชาย 57 ปี",
    area: "ม.7 ต.โคกสลุด",
    disease: "เลปโตสไปโรซิส",
    color: "#ca8a04",
  },
];

export default function UnitInbox() {
  return (
    <>
      <PageHead
        title="รับเคสเข้าหน่วยบริการ"
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

      <Card
        title="รายการคนไข้รอกดรับ"
        icon="check"
        pad={false}
        action={<Chip bg="#fee2e2" fg="#b91c1c">รอกดรับ {ASSIGNED.length} เคส</Chip>}
      >
        <div className="flex flex-wrap gap-2 border-b border-line-brd p-3 sm:p-4">
          <div className="flex h-9 min-w-[240px] flex-1 items-center gap-2 rounded-[10px] border border-line-brd bg-surface2 px-3">
            <Icon name="search" size={15} />
            <span className="text-[12.5px] text-faint">ค้นหา HN, CID, ชื่อผู้ป่วย หรือรหัสเคส…</span>
          </div>
          <button className="btn btn-sm">ทุกกลุ่มโรค</button>
          <button className="btn btn-sm">วันที่: 7 วันล่าสุด</button>
        </div>

        <div className="scroll-x nice">
          <table className="w-full min-w-[1240px] border-collapse">
            <thead>
              <tr>
                <th className="th">วันเวลาแจ้ง</th>
                <th className="th">รหัสเคส</th>
                <th className="th">HN</th>
                <th className="th">CID</th>
                <th className="th">ชื่อ–นามสกุล</th>
                <th className="th">เพศ / อายุ</th>
                <th className="th">พื้นที่</th>
                <th className="th">โรค</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {ASSIGNED.map((c) => (
                <tr key={c.id} className="hover:bg-surface2">
                  <td className="td whitespace-nowrap text-muted">{c.at}</td>
                  <td className="td whitespace-nowrap font-mono text-[12px] font-semibold">{c.id}</td>
                  <td className="td font-mono font-semibold">{c.hn}</td>
                  <td className="td whitespace-nowrap font-mono text-[12px]">{c.cid}</td>
                  <td className="td whitespace-nowrap font-semibold">{c.name}</td>
                  <td className="td whitespace-nowrap">{c.patient}</td>
                  <td className="td whitespace-nowrap">{c.area}</td>
                  <td className="td whitespace-nowrap">
                    <Chip bg={`${c.color}18`} fg={c.color} dot>
                      {c.disease}
                    </Chip>
                  </td>
                  <td className="td">
                    <div className="flex items-center gap-1.5">
                      <button className="btn btn-sm whitespace-nowrap">
                        <Icon name="file" size={14} /> ดูรายละเอียด
                      </button>
                      <button className="btn btn-primary btn-sm whitespace-nowrap">
                        <Icon name="check" size={14} /> กดรับเคส
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
