import { PageHead } from "@/components/DesktopShell";
import DocumentLibrary from "@/components/DocumentLibrary";
import { Icon } from "@/components/icons";

export default function AreaDocs() {
  return (
    <>
      <PageHead
        title="ระบบจัดเก็บและค้นคืนเอกสาร"
        desc="เอกสารงานสอบสวนควบคุมโรคของหน่วยบริการ ผูกกับรหัสเคสและ HN อัตโนมัติ · แชร์ร่วมกับ สสอ. และ สสจ. ได้"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="users" size={15} /> แชร์ให้ สสอ./สสจ.
            </button>
            <button className="btn btn-sm">
              <Icon name="settings" size={15} /> สิทธิ์การเข้าถึง
            </button>
          </>
        }
      />
      <DocumentLibrary owner="หน่วยบริการของฉัน" />
    </>
  );
}
