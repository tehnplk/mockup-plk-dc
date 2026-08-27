import { PageHead } from "@/components/DesktopShell";
import { Stat } from "@/components/ui";
import { Icon } from "@/components/icons";

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
    </>
  );
}
