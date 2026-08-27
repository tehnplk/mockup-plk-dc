"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import LargeModal from "@/components/LargeModal";
import { Icon, type IconName } from "@/components/icons";
import { Card, Chip, Stat } from "@/components/ui";

type CaseStatus = "รอแจ้งเคส" | "แจ้งแล้ว" | "รับเคสแล้ว" | "จำหน่ายออกจากงานระบาด";

type NotificationCase = {
  foundAt: string;
  hn: string;
  cid: string;
  name: string;
  address: string;
  status: CaseStatus;
  assignee: string;
  disease: string;
  /** วินิจฉัยเดิมก่อนถูกแก้ไข — มีค่าเมื่อผู้แจ้งเคสเปลี่ยนวินิจฉัยแล้ว */
  prevDisease?: string;
  dischargedAt?: string;
  dischargeReason?: string;
};

const CASE_LIST: NotificationCase[] = [
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
  {
    foundAt: "25 ส.ค. 2569 10:22",
    hn: "0052241",
    cid: "1-6505-00522-41-3",
    name: "ด.ช.ธนภัทร พูลสวัสดิ์",
    address: "45/2 ม.6 ต.สนามคลี อ.บางกระทุ่ม",
    status: "จำหน่ายออกจากงานระบาด",
    assignee: "ทีม SRRT บางกระทุ่ม",
    disease: "ไข้ไม่ทราบสาเหตุ (FUO)",
    prevDisease: "ไข้เลือดออก",
    dischargedAt: "26 ส.ค. 2569 13:40",
    dischargeReason: "ผลตรวจยืนยันทางห้องปฏิบัติการออกภายหลัง",
  },
];

const STATUS_TONE: Record<CaseStatus, { bg: string; fg: string }> = {
  "รอแจ้งเคส": { bg: "#fef3c7", fg: "#b45309" },
  "แจ้งแล้ว": { bg: "#e0f2fe", fg: "#0369a1" },
  "รับเคสแล้ว": { bg: "#dcfce7", fg: "#15803d" },
  "จำหน่ายออกจากงานระบาด": { bg: "#f1f5f9", fg: "#64748b" },
};

/** นิยามโรคที่ต้องเฝ้าระวัง (รง.506) — เปลี่ยนมาเป็นกลุ่มนี้ เคสยังคงอยู่ในงานระบาด */
const SURVEILLANCE_DX = [
  "ไข้เลือดออก",
  "ไข้ชิคุนกุนยา",
  "มือ เท้า ปาก",
  "โรคหัด",
  "เลปโตสไปโรซิส",
  "อุจจาระร่วงเฉียบพลัน",
  "อาหารเป็นพิษ",
  "อหิวาตกโรค",
  "ไข้หวัดใหญ่",
  "COVID-19",
  "วัณโรค",
];

/** วินิจฉัยที่ไม่เข้านิยามเฝ้าระวัง — เลือกแล้วเคสจะถูกจำหน่ายออกจากงานระบาด */
const NON_SURVEILLANCE_DX = [
  "ไข้ไม่ทราบสาเหตุ (FUO)",
  "ติดเชื้อทางเดินหายใจส่วนบน (URI)",
  "ท้องเสียจากอาหาร ไม่พบเชื้อก่อโรค",
  "ผื่นแพ้ยา",
  "ติดเชื้อทางเดินปัสสาวะ",
  "ปอดอักเสบจากแบคทีเรีย (ไม่เข้านิยาม)",
  "อื่นๆ ไม่เข้านิยามเฝ้าระวัง",
];

const CHANGE_REASONS = [
  "ผลตรวจยืนยันทางห้องปฏิบัติการออกภายหลัง",
  "แพทย์ทบทวนการวินิจฉัยเมื่ออาการเปลี่ยน",
  "วินิจฉัยแรกรับผิดพลาด / คีย์รหัสโรคผิด",
  "อาการไม่เข้าเกณฑ์นิยามโรคเฝ้าระวัง",
];

const isSurveillance = (dx: string) => SURVEILLANCE_DX.includes(dx);

function caseKey(item: NotificationCase) {
  return `${item.hn}-${item.foundAt}`;
}

type MenuItem = { label: string; icon: IconName; onClick: () => void; danger?: boolean };

const MENU_W = 216;

/**
 * เมนู Action ประจำแถวของตาราง
 * วางแบบ fixed เพราะตารางอยู่ใน .scroll-x (overflow) ถ้าใช้ absolute เมนูจะโดนตัด
 */
function RowMenu({ items }: { items: MenuItem[] }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const open = pos !== null;

  useEffect(() => {
    if (!open) return;

    const close = () => setPos(null);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  function toggle() {
    if (open) {
      setPos(null);
      return;
    }

    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const height = items.length * 40 + 10;
    const flipUp = rect.bottom + height + 12 > window.innerHeight;

    setPos({
      top: flipUp ? rect.top - height - 6 : rect.bottom + 6,
      left: Math.max(12, Math.min(rect.right - MENU_W, window.innerWidth - MENU_W - 12)),
    });
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="btn btn-sm whitespace-nowrap"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        จัดการ
        <span
          className="text-faint transition-transform duration-150"
          style={{ transform: open ? "rotate(-90deg)" : "rotate(90deg)", lineHeight: 0 }}
        >
          <Icon name="arrowRight" size={13} />
        </span>
      </button>

      {pos && (
        <>
          <div className="fixed inset-0 z-[60]" onMouseDown={() => setPos(null)} />
          <div
            role="menu"
            className="fixed z-[61] overflow-hidden rounded-xl border border-line-brd bg-white p-1 shadow-[0_18px_40px_-16px_rgba(15,23,42,.45)]"
            style={{ top: pos.top, left: pos.left, width: MENU_W }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[12.5px] font-medium hover:bg-surface2"
                style={item.danger ? { color: "var(--danger)" } : undefined}
                onClick={() => {
                  setPos(null);
                  item.onClick();
                }}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

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

/**
 * ผู้แจ้งเคสแก้ไขวินิจฉัยของเคสที่ตนเองแจ้งไว้ได้
 * ถ้าวินิจฉัยใหม่ไม่เข้านิยามโรคเฝ้าระวัง เคสจะถูกจำหน่ายออกจากงานระบาดทันที
 */
function ChangeDiagnosisModal({
  patient,
  onClose,
  onConfirm,
}: {
  patient: NotificationCase;
  onClose: () => void;
  onConfirm: (dx: string, reason: string, note: string) => void;
}) {
  const [dx, setDx] = useState(patient.disease);
  const [reason, setReason] = useState(CHANGE_REASONS[0]);
  const [note, setNote] = useState("");

  const changed = dx !== patient.disease;
  const willDischarge = changed && !isSurveillance(dx);

  return (
    <LargeModal
      open
      onClose={onClose}
      title="เปลี่ยนวินิจฉัยของเคสที่แจ้งไว้"
      subtitle={`${patient.name} · HN ${patient.hn} · แจ้งเมื่อ ${patient.foundAt}`}
      footer={
        <>
          <span className="mr-auto text-[11.5px] text-faint">
            ผู้แก้ไข: นางพรทิพย์ ชูเกียรติ · รพ.บางกระทุ่ม
          </span>
          <button type="button" className="btn" onClick={onClose}>ยกเลิก</button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!changed}
            style={
              willDischarge ? { background: "var(--danger)", borderColor: "var(--danger)" } : undefined
            }
            onClick={() => onConfirm(dx, reason, note)}
          >
            <Icon name="check" size={15} />
            {willDischarge ? "ยืนยันและจำหน่ายออกจากงานระบาด" : "บันทึกวินิจฉัยใหม่"}
          </button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <Card title="วินิจฉัยปัจจุบัน" icon="clipboard">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["โรคที่แจ้งไว้", patient.disease],
                ["สถานะเคส", patient.status],
                ["ส่งถึง", patient.assignee],
                ["ที่อยู่ผู้ป่วย", patient.address],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-line-brd bg-surface2 p-3">
                  <p className="text-[11px] font-semibold text-faint">{label}</p>
                  <p className="mt-1 text-[13px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="เลือกวินิจฉัยใหม่"
            icon="shield"
            desc="กลุ่มบนยังอยู่ในงานระบาด · กลุ่มล่างจะถูกจำหน่ายออก"
          >
            <div className="grid gap-4">
              <label>
                <span className="lbl">วินิจฉัยใหม่</span>
                <select className="inp" value={dx} onChange={(e) => setDx(e.target.value)}>
                  <optgroup label="เข้านิยามโรคเฝ้าระวัง (รง.506)">
                    {SURVEILLANCE_DX.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </optgroup>
                  <optgroup label="ไม่เข้านิยามเฝ้าระวัง — จำหน่ายออกจากงานระบาด">
                    {NON_SURVEILLANCE_DX.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </optgroup>
                </select>
              </label>

              <div>
                <span className="lbl">เหตุผลที่เปลี่ยนวินิจฉัย</span>
                <div className="grid gap-2.5">
                  {CHANGE_REASONS.map((r) => (
                    <label
                      key={r}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
                      style={{
                        borderColor: reason === r ? "var(--accent)" : "var(--border)",
                        background: reason === r ? "color-mix(in srgb, var(--accent) 6%, #fff)" : "#fff",
                      }}
                    >
                      <input
                        type="radio"
                        name="dx-reason"
                        className="sr-only"
                        checked={reason === r}
                        onChange={() => setReason(r)}
                      />
                      <span
                        className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2"
                        style={{ borderColor: reason === r ? "var(--accent)" : "#cbd5e1" }}
                      >
                        {reason === r && (
                          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                        )}
                      </span>
                      <span className="text-[13px] font-medium">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label>
                <span className="lbl">รายละเอียด / ผลตรวจอ้างอิง</span>
                <textarea
                  className="inp min-h-[92px] resize-none"
                  placeholder="เช่น ผล NS1 และ Dengue IgM negative ทั้งสองครั้ง ไข้ลดเองภายใน 3 วัน แพทย์เจ้าของไข้ทบทวนวินิจฉัยเป็นไข้ไม่ทราบสาเหตุ"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <Card title="ผลของการเปลี่ยนวินิจฉัย" icon="wave">
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="rounded-lg bg-surface2 px-2.5 py-1.5 font-medium text-muted line-through">
                {patient.disease}
              </span>
              <Icon name="arrowRight" size={16} />
              <span
                className="rounded-lg px-2.5 py-1.5 font-semibold"
                style={
                  willDischarge
                    ? { background: "#fee2e2", color: "#b91c1c" }
                    : { background: "color-mix(in srgb, var(--accent) 12%, #fff)", color: "var(--accent)" }
                }
              >
                {dx}
              </span>
            </div>

            {!changed && (
              <p className="mt-4 text-[12.5px] text-muted">
                ยังไม่ได้เลือกวินิจฉัยใหม่ · เลือกโรคที่ต่างจากเดิมเพื่อบันทึกการแก้ไข
              </p>
            )}

            {changed && !willDischarge && (
              <div className="mt-4 rounded-xl bg-[#f0fdf4] p-3.5 text-[12px] leading-relaxed text-[#15803d]">
                <p className="font-semibold">เคสยังอยู่ในงานระบาด</p>
                <p className="mt-1">
                  ระบบจะแจ้งวินิจฉัยใหม่ไปยัง {patient.assignee} และเปลี่ยนแบบสอบสวนให้ตรงกับนิยามโรคใหม่
                  โดยยังนับเวลามาตรฐาน (SLA) ต่อเนื่องจากเดิม
                </p>
              </div>
            )}

            {willDischarge && (
              <div className="mt-4 rounded-xl bg-[#fef2f2] p-3.5">
                <p className="text-[12.5px] font-bold text-[#b91c1c]">
                  เคสนี้จะถูกจำหน่ายออกจากงานระบาด
                </p>
                <ul className="mt-2 grid gap-1.5 text-[12px] leading-relaxed text-[#991b1b]">
                  {[
                    "ตัดออกจากทะเบียนเฝ้าระวัง ไม่นับในรายงาน รง.506",
                    `แจ้ง ${patient.assignee} ให้ยุติการสอบสวนโดยอัตโนมัติ`,
                    "หยุดนับเวลามาตรฐาน (SLA) ของเคส",
                    "เก็บประวัติการแก้ไขไว้ใน Audit log ย้อนกลับได้",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-[3px] shrink-0">
                        <Icon name="arrowRight" size={12} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card title="ประวัติการแก้ไขเคสนี้" icon="clock" pad={false}>
            <ul>
              {[
                ["สร้างเคสจากทะเบียนผู้ป่วย (HIS)", patient.foundAt, "ระบบคัดกรองอัตโนมัติ"],
                [`แจ้งเคส ${patient.prevDisease ?? patient.disease}`, patient.foundAt, "นางพรทิพย์ ชูเกียรติ"],
              ].map(([t, d, by]) => (
                <li key={String(t)} className="border-b border-line-brd px-4 py-3 last:border-0">
                  <p className="text-[12.5px] font-medium">{t}</p>
                  <p className="sub">{d} · {by}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="เงื่อนไขการแก้ไข" icon="shield">
            <ul className="grid gap-2 text-[12.5px] text-muted">
              {[
                "แก้ไขได้เฉพาะเคสที่หน่วยบริการของตนเองเป็นผู้แจ้ง",
                "ต้องระบุเหตุผลทุกครั้ง และบันทึกชื่อผู้แก้ไข",
                "หากสอบสวนเสร็จแล้ว ต้องให้ Admin จังหวัดอนุมัติก่อน",
                "หน่วยที่รับเคสจะเห็นการเปลี่ยนแปลงทันทีในทะเบียนรับแล้ว",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[3px] shrink-0" style={{ color: "var(--accent)" }}>
                    <Icon name="check" size={13} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </LargeModal>
  );
}

export default function NotificationRegistryPage() {
  const [cases, setCases] = useState<NotificationCase[]>(CASE_LIST);
  const [notifyCase, setNotifyCase] = useState<NotificationCase | null>(null);
  const [editCase, setEditCase] = useState<NotificationCase | null>(null);

  const counts = useMemo(
    () => ({
      total: cases.length,
      pending: cases.filter((c) => c.status === "รอแจ้งเคส").length,
      active: cases.filter((c) => c.status === "แจ้งแล้ว" || c.status === "รับเคสแล้ว").length,
      discharged: cases.filter((c) => c.status === "จำหน่ายออกจากงานระบาด").length,
    }),
    [cases],
  );

  function applyDiagnosis(target: NotificationCase, dx: string, reason: string, note: string) {
    const discharged = !isSurveillance(dx);
    setCases((prev) =>
      prev.map((item) =>
        caseKey(item) === caseKey(target)
          ? {
              ...item,
              disease: dx,
              prevDisease: item.disease,
              status: discharged ? "จำหน่ายออกจากงานระบาด" : item.status,
              dischargedAt: discharged ? "27 ส.ค. 2569 09:35" : undefined,
              dischargeReason: discharged ? note.trim() || reason : undefined,
            }
          : item,
      ),
    );
    setEditCase(null);
  }

  return (
    <>
      <PageHead
        title="ทะเบียนแจ้งเคส"
        desc="ผู้แจ้งเคสแก้ไขวินิจฉัยของเคสที่ตนเองแจ้งได้ · ถ้าวินิจฉัยใหม่ไม่เข้านิยามเฝ้าระวัง เคสจะถูกจำหน่ายออกจากงานระบาด"
        actions={
          <button type="button" className="btn btn-sm">
            <Icon name="file" size={15} /> ส่งออกทะเบียน
          </button>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="เคสในทะเบียน" value={counts.total} unit="เคส" icon="clipboard" />
        <Stat label="รอแจ้งเคส" value={counts.pending} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="อยู่ในงานระบาด" value={counts.active} unit="เคส" icon="shield" tone="var(--ok)" />
        <Stat
          label="จำหน่ายออกจากงานระบาด"
          value={counts.discharged}
          unit="เคส"
          icon="wave"
          tone="#64748b"
        />
      </div>

      <Card
        title="รายการในทะเบียนแจ้งเคส"
        icon="clipboard"
        pad={false}
        action={<Chip bg="#fef3c7" fg="#b45309">รอแจ้ง {counts.pending} เคส</Chip>}
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
          <table className="w-full min-w-[1280px] border-collapse">
            <thead>
              <tr>
                <th className="th">วันพบ</th>
                <th className="th">HN</th>
                <th className="th">CID</th>
                <th className="th">ชื่อ–นามสกุล</th>
                <th className="th">วินิจฉัย</th>
                <th className="th">ที่อยู่</th>
                <th className="th">ส่งถึง</th>
                <th className="th">สถานะ</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => {
                const tone = STATUS_TONE[item.status];
                const discharged = item.status === "จำหน่ายออกจากงานระบาด";
                return (
                  <tr
                    key={caseKey(item)}
                    className="hover:bg-surface2"
                    style={discharged ? { background: "#f8fafc" } : undefined}
                  >
                    <td className="td whitespace-nowrap text-muted">{item.foundAt}</td>
                    <td className="td font-mono font-semibold">{item.hn}</td>
                    <td className="td whitespace-nowrap font-mono text-[12px]">{item.cid}</td>
                    <td className="td whitespace-nowrap font-semibold">{item.name}</td>
                    <td className="td min-w-[210px]">
                      {item.prevDisease && (
                        <p className="text-[11px] text-faint line-through">{item.prevDisease}</p>
                      )}
                      <p className="font-medium">{item.disease}</p>
                      {discharged && item.dischargeReason && (
                        <p className="mt-0.5 text-[11px] text-faint">{item.dischargeReason}</p>
                      )}
                    </td>
                    <td className="td min-w-[250px]">{item.address}</td>
                    <td className="td min-w-[180px]">{item.assignee}</td>
                    <td className="td">
                      <Chip bg={tone.bg} fg={tone.fg} dot>{item.status}</Chip>
                      {discharged && item.dischargedAt && (
                        <p className="mt-1 text-[11px] text-faint">{item.dischargedAt}</p>
                      )}
                    </td>
                    <td className="td">
                      {discharged ? (
                        <span className="text-[12px] text-faint">ปิดการแก้ไข</span>
                      ) : (
                        <RowMenu
                          items={[
                            {
                              label: item.status === "รอแจ้งเคส" ? "แจ้งเคส" : "แจ้งเคสซ้ำ",
                              icon: "send",
                              onClick: () => setNotifyCase(item),
                            },
                            {
                              label: "เปลี่ยนวินิจฉัย",
                              icon: "shield",
                              onClick: () => setEditCase(item),
                            },
                          ]}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <NotifyCaseModal patient={notifyCase} onClose={() => setNotifyCase(null)} />

      {editCase && (
        <ChangeDiagnosisModal
          key={caseKey(editCase)}
          patient={editCase}
          onClose={() => setEditCase(null)}
          onConfirm={(dx, reason, note) => applyDiagnosis(editCase, dx, reason, note)}
        />
      )}
    </>
  );
}
