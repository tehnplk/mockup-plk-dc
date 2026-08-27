"use client";

import { useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import LargeModal from "@/components/LargeModal";
import { Icon } from "@/components/icons";
import { Card, Chip } from "@/components/ui";

type AcceptedPatient = {
  acceptedAt: string;
  caseId: string;
  hn: string;
  cid: string;
  name: string;
  address: string;
  disease: string;
  status: "กำลังสอบสวน" | "รอผลแล็บ" | "สอบสวนเสร็จ";
  owner: string;
};

/** ผู้ป่วยที่หน่วยบริการกดรับเคสมาจากหน้า "รับเคส" แล้ว */
const PATIENTS: AcceptedPatient[] = [
  {
    acceptedAt: "27 ส.ค. 2569 07:20",
    caseId: "PLK-6809-0136",
    hn: "0045218",
    cid: "3-6501-00452-18-1",
    name: "นายกฤษฎา พรมเรือง",
    address: "128/4 ม.4 ต.บางกระทุ่ม อ.บางกระทุ่ม",
    disease: "ไข้เลือดออก",
    status: "กำลังสอบสวน",
    owner: "นางนภัสสร ชัยวัฒน์",
  },
  {
    acceptedAt: "26 ส.ค. 2569 16:02",
    caseId: "PLK-6809-0133",
    hn: "0088412",
    cid: "3-6510-00884-12-5",
    name: "นายอนุชิต แซ่ลิ้ม",
    address: "88/2 ม.2 ต.บางกระทุ่ม อ.บางกระทุ่ม",
    disease: "อาหารเป็นพิษ",
    status: "รอผลแล็บ",
    owner: "นายกิตติศักดิ์ แสงเพชร",
  },
  {
    acceptedAt: "26 ส.ค. 2569 11:44",
    caseId: "PLK-6809-0131",
    hn: "0052241",
    cid: "1-6505-00522-41-3",
    name: "ด.ช.ธนภัทร พูลสวัสดิ์",
    address: "45/2 ม.6 ต.สนามคลี อ.บางกระทุ่ม",
    disease: "ไข้หวัดใหญ่",
    status: "สอบสวนเสร็จ",
    owner: "นางสุพรรณี ทรัพย์เจริญ",
  },
  {
    acceptedAt: "25 ส.ค. 2569 14:35",
    caseId: "PLK-6809-0128",
    hn: "0011084",
    cid: "3-6508-00110-84-7",
    name: "นายบรรจง คำใส",
    address: "77 ม.3 ต.โคกสลุด อ.บางกระทุ่ม",
    disease: "เลปโตสไปโรซิส",
    status: "สอบสวนเสร็จ",
    owner: "นายกิตติศักดิ์ แสงเพชร",
  },
  {
    acceptedAt: "25 ส.ค. 2569 09:12",
    caseId: "PLK-6809-0125",
    hn: "0093117",
    cid: "1-6506-00193-17-4",
    name: "ด.ญ.ปุณยนุช แสนคำ",
    address: "45/2 ม.6 ต.สนามคลี อ.บางกระทุ่ม",
    disease: "มือ เท้า ปาก",
    status: "กำลังสอบสวน",
    owner: "นางนภัสสร ชัยวัฒน์",
  },
];

const STATUS_TONE = {
  "กำลังสอบสวน": { bg: "#fef3c7", fg: "#b45309" },
  "รอผลแล็บ": { bg: "#e0f2fe", fg: "#0369a1" },
  "สอบสวนเสร็จ": { bg: "#dcfce7", fg: "#15803d" },
};

/** กิจกรรมสอบสวนควบคุมโรคของแต่ละเคส */
const ACTIVITIES = [
  { date: "27 ส.ค. 2569", activity: "รับเคสและตรวจสอบข้อมูลผู้ป่วยจากทะเบียน", photos: 0 },
  { date: "27 ส.ค. 2569", activity: "ลงพื้นที่สอบสวนโรคที่บ้านผู้ป่วย", photos: 2 },
  { date: "28 ส.ค. 2569", activity: "สำรวจและกำจัดแหล่งเพาะพันธุ์ในรัศมี 100 เมตร", photos: 3 },
  { date: "28 ส.ค. 2569", activity: "พ่นสารเคมีควบคุมโรคร่วมกับ อบต.", photos: 2 },
  { date: "29 ส.ค. 2569", activity: "ให้สุขศึกษาและติดตามผู้สัมผัสใกล้ชิด", photos: 1 },
];

function PhotoCell({ count }: { count: number }) {
  if (count === 0) return <span className="text-[12px] text-faint">—</span>;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-brd bg-surface2 text-faint"
        >
          <Icon name="image" size={15} />
        </span>
      ))}
    </div>
  );
}

function InvestigationModal({
  patient,
  onClose,
}: {
  patient: AcceptedPatient | null;
  onClose: () => void;
}) {
  return (
    <LargeModal
      open={Boolean(patient)}
      onClose={onClose}
      title="สอบสวนควบคุมโรค"
      subtitle={patient ? `${patient.name} · HN ${patient.hn} · ${patient.disease}` : undefined}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>ปิด</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            <Icon name="plus" size={15} /> เพิ่มกิจกรรม
          </button>
        </>
      }
    >
      {patient && (
        <Card title="กิจกรรมสอบสวนควบคุมโรค" icon="clipboard" pad={false}>
          <div className="scroll-x nice">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr>
                  <th className="th w-[70px]">ลำดับ</th>
                  <th className="th w-[150px]">วันที่</th>
                  <th className="th">กิจกรรม</th>
                  <th className="th w-[190px]">รูป</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITIES.map((item, index) => (
                  <tr key={item.activity} className="hover:bg-surface2">
                    <td className="td tabular-nums">{index + 1}</td>
                    <td className="td whitespace-nowrap text-muted">{item.date}</td>
                    <td className="td">{item.activity}</td>
                    <td className="td">
                      <PhotoCell count={item.photos} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </LargeModal>
  );
}

export default function AcceptedPatientRegistryPage() {
  const [selected, setSelected] = useState<AcceptedPatient | null>(null);

  return (
    <>
      <PageHead
        title="ทะเบียนรับแล้ว"
        actions={
          <button type="button" className="btn btn-sm">
            <Icon name="file" size={15} /> ส่งออกทะเบียน
          </button>
        }
      />

      <Card
        title="ผู้ป่วยที่กดรับเคสแล้ว"
        icon="check"
        pad={false}
        action={<Chip bg="#dcfce7" fg="#15803d">ทั้งหมด {PATIENTS.length} ราย</Chip>}
      >
        <div className="flex flex-wrap gap-2 border-b border-line-brd p-3 sm:p-4">
          <div className="flex h-9 min-w-[240px] flex-1 items-center gap-2 rounded-[10px] border border-line-brd bg-surface2 px-3">
            <Icon name="search" size={15} />
            <span className="text-[12.5px] text-faint">ค้นหา HN, CID, ชื่อผู้ป่วย หรือรหัสเคส…</span>
          </div>
          <button type="button" className="btn btn-sm">ทุกสถานะ</button>
          <button type="button" className="btn btn-sm">วันที่: 7 วันล่าสุด</button>
        </div>

        <div className="scroll-x nice">
          <table className="w-full min-w-[1320px] border-collapse">
            <thead>
              <tr>
                <th className="th">วันที่รับเคส</th>
                <th className="th">รหัสเคส</th>
                <th className="th">HN</th>
                <th className="th">CID</th>
                <th className="th">ชื่อ–นามสกุล</th>
                <th className="th">ที่อยู่</th>
                <th className="th">โรค</th>
                <th className="th">สถานะ</th>
                <th className="th">ผู้รับผิดชอบ</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {PATIENTS.map((item) => {
                const tone = STATUS_TONE[item.status];
                return (
                  <tr key={item.caseId} className="hover:bg-surface2">
                    <td className="td whitespace-nowrap text-muted">{item.acceptedAt}</td>
                    <td className="td whitespace-nowrap font-mono text-[12px] font-semibold">{item.caseId}</td>
                    <td className="td font-mono font-semibold">{item.hn}</td>
                    <td className="td whitespace-nowrap font-mono text-[12px]">{item.cid}</td>
                    <td className="td whitespace-nowrap font-semibold">{item.name}</td>
                    <td className="td min-w-[240px]">{item.address}</td>
                    <td className="td whitespace-nowrap">{item.disease}</td>
                    <td className="td">
                      <Chip bg={tone.bg} fg={tone.fg} dot>{item.status}</Chip>
                    </td>
                    <td className="td min-w-[160px] whitespace-nowrap">{item.owner}</td>
                    <td className="td">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm whitespace-nowrap"
                        onClick={() => setSelected(item)}
                      >
                        <Icon name="clipboard" size={14} /> สอบสวนควบคุมโรค
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <InvestigationModal patient={selected} onClose={() => setSelected(null)} />
    </>
  );
}
