import { PageHead } from "@/components/DesktopShell";
import DocumentLibrary from "@/components/DocumentLibrary";
import { Icon } from "@/components/icons";

export default function AreaDocs() {
  return (
    <>
      <PageHead
        title="ระบบจัดเก็บและค้นคืนเอกสาร"
        desc="เอกสารงานควบคุมโรคของหน่วยบริการเจ้าของพื้นที่ · แชร์ร่วมกับ รพ.สต. ในสังกัดได้"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="users" size={15} /> แชร์ให้ รพ.สต.
            </button>
            <button className="btn btn-sm">
              <Icon name="settings" size={15} /> สิทธิ์การเข้าถึง
            </button>
          </>
        }
      />
      <DocumentLibrary owner="สสอ.เมืองพิษณุโลก" />
    </>
  );
}
