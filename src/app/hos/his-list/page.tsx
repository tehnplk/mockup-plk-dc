"use client";

import { useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import LargeModal from "@/components/LargeModal";
import { Icon } from "@/components/icons";
import { Card, Chip } from "@/components/ui";

type Candidate = {
  serviceAt: string;
  hn: string;
  cid: string;
  name: string;
  phone: string;
  chiefComplaint: string;
  icd10: string;
  disease: string;
  urgency: "เร่งด่วน" | "เฝ้าระวัง";
};

type CandidateAction = "history" | "investigate" | "register";

const CANDIDATES: Candidate[] = [
  {
    serviceAt: "27 ส.ค. 2569 08:14",
    hn: "0045218",
    cid: "3-6501-00452-18-1",
    name: "นายกฤษฎา พรมเรือง",
    phone: "081-542-2148",
    chiefComplaint: "ไข้สูง 3 วัน ปวดศีรษะ",
    icd10: "A91",
    disease: "ไข้เลือดออก",
    urgency: "เร่งด่วน",
  },
  {
    serviceAt: "27 ส.ค. 2569 07:52",
    hn: "0093117",
    cid: "1-6506-00193-17-4",
    name: "ด.ญ.ปุณยนุช แสนคำ",
    phone: "089-731-0931",
    chiefComplaint: "ไข้ มีตุ่มที่มือและปาก",
    icd10: "B08.4",
    disease: "มือ เท้า ปาก",
    urgency: "เฝ้าระวัง",
  },
  {
    serviceAt: "27 ส.ค. 2569 06:58",
    hn: "0011084",
    cid: "3-6508-00110-84-7",
    name: "นายบรรจง คำใส",
    phone: "086-110-8472",
    chiefComplaint: "ไข้สูง ปวดน่อง ตาแดง",
    icd10: "A27.0",
    disease: "เลปโตสไปโรซิส",
    urgency: "เร่งด่วน",
  },
  {
    serviceAt: "26 ส.ค. 2569 19:31",
    hn: "0067720",
    cid: "1-6507-00677-20-9",
    name: "นางสาวศิริลักษณ์ เกิดผล",
    phone: "092-677-2094",
    chiefComplaint: "ไข้ ไอ มีผื่นขึ้นตามตัว",
    icd10: "B05.9",
    disease: "โรคหัด",
    urgency: "เร่งด่วน",
  },
  {
    serviceAt: "26 ส.ค. 2569 15:06",
    hn: "0088412",
    cid: "3-6510-00884-12-5",
    name: "นายอนุชิต แซ่ลิ้ม",
    phone: "084-884-1256",
    chiefComplaint: "ถ่ายเหลว 6 ครั้ง อาเจียน",
    icd10: "A09",
    disease: "อุจจาระร่วงเฉียบพลัน",
    urgency: "เฝ้าระวัง",
  },
  {
    serviceAt: "26 ส.ค. 2569 11:42",
    hn: "0052241",
    cid: "1-6505-00522-41-3",
    name: "ด.ช.ธนภัทร พูลสวัสดิ์",
    phone: "095-522-4138",
    chiefComplaint: "ไข้ ไอ หายใจเร็ว",
    icd10: "J10.1",
    disease: "ไข้หวัดใหญ่",
    urgency: "เฝ้าระวัง",
  },
];

const ACTION_TITLES: Record<CandidateAction, string> = {
  history: "ประวัติเจ็บป่วย",
  investigate: "สอบสวนโรค",
  register: "ส่งเข้าทะเบียนแจ้งเคส",
};

function PatientSummary({ patient }: { patient: Candidate }) {
  return (
    <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        ["ชื่อ–นามสกุล", patient.name],
        ["HN", patient.hn],
        ["CID", patient.cid],
        ["เบอร์โทร", patient.phone],
      ].map(([label, value]) => (
        <div key={label}>
          <p className="text-[11px] font-semibold text-faint">{label}</p>
          <p className="mt-1 text-[13px] font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}

function CandidateModal({
  selection,
  onClose,
}: {
  selection: { action: CandidateAction; patient: Candidate } | null;
  onClose: () => void;
}) {
  const action = selection?.action ?? "history";
  const patient = selection?.patient;

  return (
    <LargeModal
      open={Boolean(selection)}
      onClose={onClose}
      title={ACTION_TITLES[action]}
      subtitle={patient ? `${patient.name} · HN ${patient.hn} · ${patient.icd10} ${patient.disease}` : undefined}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>ปิด</button>
          {action !== "history" && (
            <button type="button" className="btn btn-primary" onClick={onClose}>
              <Icon name={action === "register" ? "send" : "check"} size={15} />
              {action === "register" ? "ยืนยันส่งเข้าทะเบียน" : "บันทึกแบบสอบสวน"}
            </button>
          )}
        </>
      }
    >
      {patient && <PatientSummary patient={patient} />}

      {patient && action === "history" && (
        <Card title="ประวัติการรับบริการย้อนหลัง" icon="clock" pad={false}>
          <div className="scroll-x nice">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr>
                  <th className="th">วันเวลารับบริการ</th>
                  <th className="th">จุดบริการ</th>
                  <th className="th">อาการสำคัญ</th>
                  <th className="th">การวินิจฉัย</th>
                  <th className="th">การรักษา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td whitespace-nowrap">{patient.serviceAt}</td>
                  <td className="td">OPD อายุรกรรม</td>
                  <td className="td">{patient.chiefComplaint}</td>
                  <td className="td font-semibold">{patient.icd10} · {patient.disease}</td>
                  <td className="td">ตรวจ CBC และให้การรักษาตามอาการ</td>
                </tr>
                <tr>
                  <td className="td whitespace-nowrap">18 มิ.ย. 2569 10:22</td>
                  <td className="td">คลินิกโรคทั่วไป</td>
                  <td className="td">ไข้ ไอ มีน้ำมูก</td>
                  <td className="td">J06.9 · URI</td>
                  <td className="td">ยาลดไข้และยาตามอาการ</td>
                </tr>
                <tr>
                  <td className="td whitespace-nowrap">03 ก.พ. 2569 14:08</td>
                  <td className="td">OPD</td>
                  <td className="td">ปวดกล้ามเนื้อ</td>
                  <td className="td">M79.1 · Myalgia</td>
                  <td className="td">ยาแก้ปวด</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {patient && action === "investigate" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="ข้อมูลเริ่มต้นจาก HosXP" icon="db">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["วันเริ่มป่วย", "22 ส.ค. 2569"],
                ["อาการสำคัญ", patient.chiefComplaint],
                ["รหัสวินิจฉัย", patient.icd10],
                ["ชื่อโรค", patient.disease],
              ].map(([label, value]) => (
                <label key={label}>
                  <span className="lbl">{label}</span>
                  <input className="inp" value={value} readOnly />
                </label>
              ))}
            </div>
          </Card>
          <Card title="ข้อมูลสอบสวนเพิ่มเติม" icon="clipboard">
            <div className="grid gap-3">
              <label>
                <span className="lbl">ที่อยู่ขณะป่วย</span>
                <input className="inp" defaultValue="128/4 ม.4 ต.บางกระทุ่ม อ.บางกระทุ่ม จ.พิษณุโลก" />
              </label>
              <label>
                <span className="lbl">ปัจจัยเสี่ยง / ประวัติสัมผัสโรค</span>
                <textarea className="inp min-h-[86px] resize-none" defaultValue="ทำงานกลางแจ้งและพบแหล่งน้ำขังใกล้ที่พัก" />
              </label>
              <label>
                <span className="lbl">ผู้สัมผัสใกล้ชิดที่มีอาการ</span>
                <input className="inp" defaultValue="1 ราย" />
              </label>
            </div>
          </Card>
        </div>
      )}

      {patient && action === "register" && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Card title="ตรวจสอบข้อมูลก่อนส่ง" icon="clipboard">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["วันพบ", patient.serviceAt],
                ["ผู้ป่วย", patient.name],
                ["อาการสำคัญ", patient.chiefComplaint],
                ["รหัสวินิจฉัย / โรค", `${patient.icd10} · ${patient.disease}`],
                ["ที่อยู่", "128/4 ม.4 ต.บางกระทุ่ม อ.บางกระทุ่ม"],
                ["ผู้บันทึก", "นางนภัสสร ชัยวัฒน์"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-line-brd bg-surface2 p-3">
                  <p className="text-[11px] font-semibold text-faint">{label}</p>
                  <p className="mt-1 text-[13px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card title="ความพร้อมของข้อมูล" icon="check">
            <div className="grid gap-2.5">
              {["ข้อมูลบุคคลครบถ้วน", "มีรหัสวินิจฉัย", "มีเบอร์โทรติดต่อ", "ระบุพื้นที่รับผิดชอบแล้ว"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-[#f0fdf4] px-3 py-2.5 text-[12.5px] font-medium text-[#15803d]">
                  <Icon name="check" size={15} /> {item}
                </div>
              ))}
              <p className="mt-2 text-[11.5px] text-muted">
                เมื่อยืนยัน เคสจะปรากฏในทะเบียนแจ้งเคสด้วยสถานะ “รอแจ้งเคส”
              </p>
            </div>
          </Card>
        </div>
      )}
    </LargeModal>
  );
}

export default function CandidateRegistryPage() {
  const [selection, setSelection] = useState<{ action: CandidateAction; patient: Candidate } | null>(null);

  return (
    <>
      <PageHead
        title="ทะเบียนผู้ป่วย"
        actions={
          <button type="button" className="btn btn-sm">
            <Icon name="clock" size={15} /> อัปเดตล่าสุด 09:40 น.
          </button>
        }
      />

      <Card
        title="ผู้ป่วยเข้าข่ายต้องแจ้ง"
        icon="db"
        pad={false}
        action={<Chip bg="#e0f2fe" fg="#0369a1">ทั้งหมด {CANDIDATES.length} ราย</Chip>}
      >
        <div className="flex flex-wrap gap-2 border-b border-line-brd p-3 sm:p-4">
          <div className="flex h-9 min-w-[240px] flex-1 items-center gap-2 rounded-[10px] border border-line-brd bg-surface2 px-3">
            <Icon name="search" size={15} />
            <span className="text-[12.5px] text-faint">ค้นหา HN, CID, ชื่อผู้ป่วย หรือรหัสวินิจฉัย…</span>
          </div>
          <button type="button" className="btn btn-sm">วันที่: วันนี้</button>
          <button type="button" className="btn btn-sm">ทุกกลุ่มโรค</button>
        </div>

        <div className="scroll-x nice">
          <table className="w-full min-w-[1680px] border-collapse">
            <thead>
              <tr>
                <th className="th">วันเวลารับบริการ</th>
                <th className="th">HN</th>
                <th className="th">CID</th>
                <th className="th">ชื่อ–นามสกุล</th>
                <th className="th">เบอร์โทร</th>
                <th className="th">อาการสำคัญ</th>
                <th className="th">รหัสวินิจฉัย</th>
                <th className="th">ชื่อโรค</th>
                <th className="th">ระดับความเร่งด่วน</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {CANDIDATES.map((patient) => (
                <tr key={`${patient.hn}-${patient.serviceAt}`} className="hover:bg-surface2">
                  <td className="td whitespace-nowrap text-muted">{patient.serviceAt}</td>
                  <td className="td font-mono font-semibold">{patient.hn}</td>
                  <td className="td whitespace-nowrap font-mono text-[12px]">{patient.cid}</td>
                  <td className="td whitespace-nowrap font-semibold">{patient.name}</td>
                  <td className="td whitespace-nowrap">{patient.phone}</td>
                  <td className="td min-w-[190px]">{patient.chiefComplaint}</td>
                  <td className="td">
                    <span className="rounded-md bg-[#fee2e2] px-2 py-1 font-mono text-[12px] font-bold text-[#b91c1c]">
                      {patient.icd10}
                    </span>
                  </td>
                  <td className="td whitespace-nowrap font-medium">{patient.disease}</td>
                  <td className="td whitespace-nowrap">
                    <Chip
                      bg={patient.urgency === "เร่งด่วน" ? "#ffedd5" : "#e0f2fe"}
                      fg={patient.urgency === "เร่งด่วน" ? "#c2410c" : "#0369a1"}
                      dot
                    >
                      {patient.urgency}
                    </Chip>
                  </td>
                  <td className="td">
                    <div className="flex min-w-[420px] items-center gap-1.5">
                      <button type="button" className="btn btn-sm" onClick={() => setSelection({ action: "history", patient })}>
                        <Icon name="clock" size={14} /> ประวัติเจ็บป่วย
                      </button>
                      <button type="button" className="btn btn-sm" onClick={() => setSelection({ action: "investigate", patient })}>
                        <Icon name="clipboard" size={14} /> สอบสวนโรค
                      </button>
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelection({ action: "register", patient })}>
                        <Icon name="send" size={14} /> ส่งเข้าทะเบียนแจ้งเคส
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CandidateModal selection={selection} onClose={() => setSelection(null)} />
    </>
  );
}
