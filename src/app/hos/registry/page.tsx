"use client";

import { useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import LargeModal from "@/components/LargeModal";
import { Icon } from "@/components/icons";
import { Card, Chip } from "@/components/ui";

type NotificationCase = {
  foundAt: string;
  hn: string;
  cid: string;
  name: string;
  address: string;
  status: "รอแจ้งเคส" | "แจ้งแล้ว" | "รับเคสแล้ว";
  assignee: string;
  disease: string;
};

const CASES: NotificationCase[] = [
  {
    foundAt: "27 ส.ค. 2569 08:14",
    hn: "0045218",
    cid: "3-6501-00452-18-1",
    name: "นายกฤษฎา พรมเรือง",
    address: "128/4 ม.4 ต.บางกระทุ่ม อ.บางกระทุ่ม",
    status: "รอแจ้งเคส",
    assignee: "—",
    disease: "ไข้เลือดออก",
  },
  {
    foundAt: "27 ส.ค. 2569 07:52",
    hn: "0093117",
    cid: "1-6506-00193-17-4",
    name: "ด.ญ.ปุณยนุช แสนคำ",
    address: "45/2 ม.6 ต.สนามคลี อ.บางกระทุ่ม",
    status: "แจ้งแล้ว",
    assignee: "ทีม SRRT บางกระทุ่ม",
    disease: "มือ เท้า ปาก",
  },
  {
    foundAt: "27 ส.ค. 2569 06:58",
    hn: "0011084",
    cid: "3-6508-00110-84-7",
    name: "นายบรรจง คำใส",
    address: "77 ม.3 ต.โคกสลุด อ.บางกระทุ่ม",
    status: "รับเคสแล้ว",
    assignee: "นายกิตติศักดิ์ แสงเพชร",
    disease: "เลปโตสไปโรซิส",
  },
  {
    foundAt: "26 ส.ค. 2569 19:31",
    hn: "0067720",
    cid: "1-6507-00677-20-9",
    name: "นางสาวศิริลักษณ์ เกิดผล",
    address: "19 ม.7 ต.ไผ่ล้อม อ.บางกระทุ่ม",
    status: "รับเคสแล้ว",
    assignee: "นางสุพรรณี ทรัพย์เจริญ",
    disease: "โรคหัด",
  },
  {
    foundAt: "26 ส.ค. 2569 15:06",
    hn: "0088412",
    cid: "3-6510-00884-12-5",
    name: "นายอนุชิต แซ่ลิ้ม",
    address: "88/2 ม.2 ต.บางกระทุ่ม อ.บางกระทุ่ม",
    status: "แจ้งแล้ว",
    assignee: "ทีม CDCU บางกระทุ่ม",
    disease: "อุจจาระร่วงเฉียบพลัน",
  },
];

const STATUS_TONE = {
  "รอแจ้งเคส": { bg: "#fef3c7", fg: "#b45309" },
  "แจ้งแล้ว": { bg: "#e0f2fe", fg: "#0369a1" },
  "รับเคสแล้ว": { bg: "#dcfce7", fg: "#15803d" },
};

function NotifyCaseModal({ patient, onClose }: { patient: NotificationCase | null; onClose: () => void }) {
  return (
    <LargeModal
      open={Boolean(patient)}
      onClose={onClose}
      title="แจ้งเคส"
      subtitle={patient ? `${patient.name} · HN ${patient.hn} · ${patient.disease}` : undefined}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>ยกเลิก</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            <Icon name="send" size={15} /> ส่งแจ้งเคส
          </button>
        </>
      }
    >
      {patient && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-4">
            <Card title="ข้อมูลเคส" icon="clipboard">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["วันพบ", patient.foundAt],
                  ["ชื่อ–นามสกุล", patient.name],
                  ["HN", patient.hn],
                  ["CID", patient.cid],
                  ["โรค", patient.disease],
                  ["ที่อยู่", patient.address],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-line-brd bg-surface2 p-3">
                    <p className="text-[11px] font-semibold text-faint">{label}</p>
                    <p className="mt-1 text-[13px] font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="ผู้รับแจ้งเคส" icon="users">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  ["ทีม SRRT บางกระทุ่ม", "5 คน", true],
                  ["ทีม CDCU อำเภอบางกระทุ่ม", "4 คน", true],
                  ["ผู้ประสานงาน สสจ.พิษณุโลก", "2 คน", false],
                  ["ผู้บริหารเวร", "1 คน", false],
                ].map(([name, count, selected]) => (
                  <button
                    type="button"
                    key={String(name)}
                    className="flex items-center gap-3 rounded-xl border p-3 text-left"
                    style={{
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                      background: selected ? "color-mix(in srgb, var(--accent) 6%, white)" : "#fff",
                    }}
                  >
                    <span
                      className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded border-2 text-white"
                      style={{
                        borderColor: selected ? "var(--accent)" : "#cbd5e1",
                        background: selected ? "var(--accent)" : "#fff",
                      }}
                    >
                      {selected && <Icon name="check" size={11} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-semibold">{name}</span>
                      <span className="block text-[11px] text-muted">{count}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <Card title="ข้อความแจ้งเคส" icon="chat">
            <div className="grid gap-3">
              <label>
                <span className="lbl">ช่องทาง</span>
                <select className="inp" defaultValue="flex">
                  <option value="flex">LINE OA หมอพร้อม Flex Message</option>
                  <option value="dashboard">Dashboard กลาง</option>
                  <option value="both">ส่งทั้งสองช่องทาง</option>
                </select>
              </label>
              <label>
                <span className="lbl">ระดับความสำคัญ</span>
                <select className="inp" defaultValue="urgent">
                  <option value="urgent">เร่งด่วน</option>
                  <option value="normal">ปกติ</option>
                </select>
              </label>
              <div className="rounded-xl border border-line-brd bg-surface2 p-4">
                <p className="text-[11px] font-semibold text-faint">ตัวอย่างข้อความ</p>
                <p className="mt-2 text-[13px] font-bold">แจ้งเคส {patient.disease}</p>
                <p className="mt-1 text-[12px] text-muted">ผู้ป่วย: {patient.name}</p>
                <p className="text-[12px] text-muted">พื้นที่: {patient.address}</p>
                <p className="mt-3 text-[11.5px] text-muted">กรุณากดรับทราบและรับเคสเพื่อดำเนินการ</p>
              </div>
              <div className="rounded-xl bg-[#f0fdf4] p-3 text-[12px] text-[#15803d]">
                <p className="font-semibold">ข้อมูลพร้อมส่ง</p>
                <p className="mt-1">ชื่อผู้ป่วย HN CID โรค และพื้นที่ครบถ้วน</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </LargeModal>
  );
}

export default function NotificationRegistryPage() {
  const [selectedCase, setSelectedCase] = useState<NotificationCase | null>(null);

  return (
    <>
      <PageHead
        title="ทะเบียนแจ้งเคส"
        actions={
          <button type="button" className="btn btn-sm">
            <Icon name="file" size={15} /> ส่งออกทะเบียน
          </button>
        }
      />

      <Card
        title="รายการในทะเบียนแจ้งเคส"
        icon="clipboard"
        pad={false}
        action={<Chip bg="#fef3c7" fg="#b45309">รอแจ้ง 1 เคส</Chip>}
      >
        <div className="flex flex-wrap gap-2 border-b border-line-brd p-3 sm:p-4">
          <div className="flex h-9 min-w-[240px] flex-1 items-center gap-2 rounded-[10px] border border-line-brd bg-surface2 px-3">
            <Icon name="search" size={15} />
            <span className="text-[12.5px] text-faint">ค้นหา HN, CID หรือชื่อผู้ป่วย…</span>
          </div>
          <button type="button" className="btn btn-sm">ทุกสถานะ</button>
          <button type="button" className="btn btn-sm">วันที่: 7 วันล่าสุด</button>
        </div>

        <div className="scroll-x nice">
          <table className="w-full min-w-[1240px] border-collapse">
            <thead>
              <tr>
                <th className="th">วันพบ</th>
                <th className="th">HN</th>
                <th className="th">CID</th>
                <th className="th">ชื่อ–นามสกุล</th>
                <th className="th">ที่อยู่</th>
                <th className="th">ส่งถึง</th>
                <th className="th">สถานะ</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {CASES.map((item) => {
                const tone = STATUS_TONE[item.status];
                return (
                  <tr key={`${item.hn}-${item.foundAt}`} className="hover:bg-surface2">
                    <td className="td whitespace-nowrap text-muted">{item.foundAt}</td>
                    <td className="td font-mono font-semibold">{item.hn}</td>
                    <td className="td whitespace-nowrap font-mono text-[12px]">{item.cid}</td>
                    <td className="td whitespace-nowrap font-semibold">
                      <p>{item.name}</p>
                      <p className="mt-0.5 text-[11px] font-normal text-muted">{item.disease}</p>
                    </td>
                    <td className="td min-w-[250px]">{item.address}</td>
                    <td className="td min-w-[180px]">{item.assignee}</td>
                    <td className="td">
                      <Chip bg={tone.bg} fg={tone.fg} dot>{item.status}</Chip>
                    </td>
                    <td className="td">
                      <button type="button" className="btn btn-primary btn-sm whitespace-nowrap" onClick={() => setSelectedCase(item)}>
                        <Icon name="send" size={14} /> แจ้งเคส
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <NotifyCaseModal patient={selectedCase} onClose={() => setSelectedCase(null)} />
    </>
  );
}
