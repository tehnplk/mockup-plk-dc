import { PageHead } from "@/components/DesktopShell";
import DocumentLibrary from "@/components/DocumentLibrary";
import { Icon } from "@/components/icons";

export default function HospitalDocs() {
  return (
    <>
      <PageHead
        title="ระบบจัดเก็บและค้นคืนเอกสาร"
        desc="เอกสารทั้งหมดของงานสอบสวนควบคุมโรค ผูกกับรหัสเคสและ HN โดยอัตโนมัติ"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="grid" size={15} /> มุมมองการ์ด
            </button>
            <button className="btn btn-sm">
              <Icon name="settings" size={15} /> สิทธิ์การเข้าถึง
            </button>
          </>
        }
      />
      <DocumentLibrary owner="รพ.พุทธชินราช" />
    </>
  );
}
