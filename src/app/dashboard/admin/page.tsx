"use client";

import { useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import LargeModal from "@/components/LargeModal";
import { Card, Chip, Stat, Avatar } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CASES, DISEASES, DISTRICTS, stageTone, type CaseRow } from "@/lib/mock";

const RULES = [
  {
    id: "R-001",
    n: "เคสโรคติดต่ออันตรายต้องรับภายใน 3 ชั่วโมง",
    when: "โรค ∈ {ไข้เลือดออก, อหิวาตกโรค, หัด} และ ระดับ = เร่งด่วน",
    then: "ส่ง Flex ทันที + นับถอยหลัง 3 ชม. + แจ้งซ้ำทุก 60 นาทีถ้ายังไม่รับ",
    on: true,
    hits: 142,
  },
  {
    id: "R-002",
    n: "ประกาศเตือนภัยเมื่อเกินเส้นเตือนภัยรายอำเภอ",
    when: "ผู้ป่วยรายสัปดาห์ ≥ 30 ราย ต่อเนื่อง ≥ 3 สัปดาห์",
    then: "ยกระดับเตือนภัยเป็นระดับ 2 + แจ้งผู้บริหาร สสจ. + เปิดวอร์รูม",
    on: true,
    hits: 4,
  },
  {
    id: "R-003",
    n: "เคสค้างเกิน 48 ชั่วโมงต้องรายงานหัวหน้ากลุ่มงาน",
    when: "สถานะ ≠ ปิดเคส และ เวลาผ่านไป > 48 ชม.",
    then: "แจ้งหัวหน้าทีม + หัวหน้ากลุ่มงานควบคุมโรค + ขึ้นแดงบน Dashboard",
    on: true,
    hits: 27,
  },
  {
    id: "R-004",
    n: "ตรวจสอบความครบถ้วนก่อนรับข้อมูลจากโรงพยาบาล",
    when: "Push จาก HIS แต่ขาดช่องบังคับ (พิกัด/วันเริ่มป่วย/ผลแล็บ)",
    then: "ปฏิเสธการรับข้อมูล + ส่งรายการช่องที่ขาดกลับโรงพยาบาล",
    on: true,
    hits: 63,
  },
  {
    id: "R-005",
    n: "แจ้งข่าวประชาชนอัตโนมัติเมื่อพบ cluster",
    when: "ผู้ป่วยโรคเดียวกัน ≥ 3 ราย ในรัศมี 200 ม. ภายใน 14 วัน",
    then: "แจ้งหน่วยบริการพื้นที่ให้ส่งข่าวหมอพร้อมในรัศมี 500 ม.",
    on: false,
    hits: 11,
  },
];

const ROLES = [
  ["ผู้บริหาร สสจ.", 6, "ดูข้อมูลทั้งจังหวัด · อนุมัติประกาศเตือนภัย"],
  ["กลุ่มงานควบคุมโรค", 12, "จัดการเคส · กำหนดกติกา · ออกรายงาน"],
  ["โรงพยาบาล (รัฐ)", 84, "แจ้งเคส · Push ข้อมูล · ดูเฉพาะเคสของตน"],
  ["โรงพยาบาล (เอกชน)", 31, "แจ้งเคส · Push ข้อมูล · ดูเฉพาะเคสของตน"],
  ["หน่วยบริการพื้นที่", 46, "ดูข้อมูลในอำเภอ · แจ้งข่าว · ผลิตสื่อ"],
  ["ทีมภาคสนาม (Mobile)", 128, "รับเคส · บันทึกสอบสวน · แนบหลักฐาน"],
];

/** เคสในทะเบียนจังหวัด พร้อมร่องรอยการย้ายอำเภอ (ถ้ามี) */
type TransferCase = CaseRow & {
  fromDistrict?: string;
  movedAt?: string;
  movedTo?: string;
};

const TRANSFER_REASONS = [
  "ที่อยู่จริงของผู้ป่วยอยู่ในอำเภออื่น",
  "หน่วยบริการปลายทางอยู่ใกล้ผู้ป่วยมากกว่า",
  "เคสเชื่อมโยงกับ cluster ในอำเภอปลายทาง",
  "หน่วยงานเดิมร้องขอ / เกินศักยภาพทีม",
];

/** หน่วยงานที่รับผิดชอบเคสได้ในแต่ละอำเภอ */
function unitsOf(district: string) {
  return [`ทีม SRRT ${district}`, `ทีม CDCU อำเภอ${district}`, `สสอ.${district}`];
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
      style={{
        background: on ? "var(--accent)" : "#cbd5e1",
        justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <span className="w-4 h-4 rounded-full bg-white" />
    </button>
  );
}

/** Admin จังหวัดย้ายความรับผิดชอบของเคสไปยังอำเภออื่นได้โดยตรง */
function TransferCaseModal({
  row,
  onClose,
  onConfirm,
}: {
  row: TransferCase;
  onClose: () => void;
  onConfirm: (district: string, unit: string, reason: string, keepSla: boolean) => void;
}) {
  const [district, setDistrict] = useState(row.district);
  const [unit, setUnit] = useState(unitsOf(row.district)[0]);
  const [reason, setReason] = useState(TRANSFER_REASONS[0]);
  const [note, setNote] = useState("");
  const [keepSla, setKeepSla] = useState(true);

  const moved = district !== row.district;

  return (
    <LargeModal
      open
      onClose={onClose}
      title="ย้ายเคสไปอำเภออื่น"
      subtitle={`${row.id} · ${row.name} · ${row.disease}`}
      footer={
        <>
          <span className="mr-auto text-[11.5px] text-faint">
            ผู้ดำเนินการ: นายธนากร วงศ์วิวัฒน์ · กลุ่มงานควบคุมโรค สสจ.พิษณุโลก
          </span>
          <button type="button" className="btn" onClick={onClose}>ยกเลิก</button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!moved}
            onClick={() => onConfirm(district, unit, reason, keepSla)}
          >
            <Icon name="check" size={15} /> ยืนยันย้ายเคส
          </button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <Card title="เคสที่กำลังย้าย" icon="clipboard">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["ผู้ป่วย", `${row.name} (${row.age} ปี ${row.sex})`],
                ["โรค", row.disease],
                ["โรงพยาบาลที่แจ้ง", row.hospital],
                ["พื้นที่ปัจจุบัน", `ต.${row.tambon} อ.${row.district}`],
                ["สถานะเคส", row.stage],
                ["ทีมที่รับผิดชอบ", row.team],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-line-brd bg-surface2 p-3">
                  <p className="text-[11px] font-semibold text-faint">{label}</p>
                  <p className="mt-1 text-[13px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="อำเภอและหน่วยงานปลายทาง" icon="pin">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="lbl">อำเภอปลายทาง</span>
                <select
                  className="inp"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUnit(unitsOf(e.target.value)[0]);
                  }}
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                      {d === row.district ? " (อำเภอปัจจุบัน)" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="lbl">หน่วยงานที่รับผิดชอบใหม่</span>
                <select className="inp" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {unitsOf(district).map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </label>

              <div className="sm:col-span-2">
                <span className="lbl">เหตุผลการย้าย</span>
                <div className="grid gap-2.5">
                  {TRANSFER_REASONS.map((r) => (
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
                        name="transfer-reason"
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

              <label className="sm:col-span-2">
                <span className="lbl">หมายเหตุถึงหน่วยงานปลายทาง</span>
                <textarea
                  className="inp min-h-[88px] resize-none"
                  placeholder="เช่น ผู้ป่วยพักอาศัยจริงที่ ต.อรัญญิก ตั้งแต่ ก.พ. 2569 อสม. ในพื้นที่ยืนยันข้อมูลตรงกัน ขอให้ทีมปลายทางลงพื้นที่ต่อภายใน 24 ชม."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>

              <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-line-brd p-3.5">
                <Toggle on={keepSla} onChange={setKeepSla} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-semibold">คงเวลามาตรฐาน (SLA) เดิม</span>
                  <span className="block text-[11.5px] text-muted">
                    {keepSla
                      ? "นับเวลาต่อเนื่องจากวันที่แจ้งเคสเดิม ไม่รีเซ็ตนาฬิกา"
                      : "เริ่มนับ SLA ใหม่ตั้งแต่เวลาที่หน่วยงานปลายทางรับเคส"}
                  </span>
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <Card title="ผลของการย้ายเคส" icon="map">
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="rounded-lg bg-surface2 px-2.5 py-1.5 font-medium text-muted">
                อ.{row.district}
              </span>
              <Icon name="arrowRight" size={16} />
              <span
                className="rounded-lg px-2.5 py-1.5 font-semibold"
                style={{
                  background: moved
                    ? "color-mix(in srgb, var(--accent) 12%, #fff)"
                    : "var(--surface-2)",
                  color: moved ? "var(--accent)" : "var(--muted)",
                }}
              >
                อ.{district}
              </span>
            </div>

            {!moved ? (
              <p className="mt-4 text-[12.5px] text-muted">
                ยังเลือกอำเภอเดิมอยู่ · เลือกอำเภอปลายทางที่ต่างจากเดิมเพื่อย้ายเคส
              </p>
            ) : (
              <ul className="mt-4 grid gap-2 text-[12px] leading-relaxed text-muted">
                {[
                  `โอนสิทธิ์การเข้าถึงเคสให้ ${unit} และตัดสิทธิ์ ${row.team}`,
                  "แจ้งเตือนหน่วยงานต้นทางและปลายทางทันทีผ่าน Flex Message",
                  keepSla
                    ? "นาฬิกา SLA นับต่อเนื่อง ไม่รีเซ็ต"
                    : "เริ่มนับ SLA ใหม่เมื่อปลายทางกดรับเคส",
                  `ย้ายการนับสถิติจาก อ.${row.district} ไป อ.${district} ตั้งแต่สัปดาห์ปัจจุบัน`,
                  "ย้ายเอกสารแนบและบันทึกสอบสวนทั้งหมดไปพร้อมเคส",
                  "บันทึกผู้สั่งย้าย เวลา และเหตุผลไว้ใน Audit log",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-[3px] shrink-0" style={{ color: "var(--accent)" }}>
                      <Icon name="check" size={13} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="ข้อควรระวัง" icon="shield">
            <ul className="grid gap-2 text-[12.5px] text-muted">
              {[
                "ย้ายได้เฉพาะเคสที่ยังไม่ปิด — เคสที่ปิดแล้วต้องเปิดเคสใหม่",
                "ถ้าเคสอยู่ระหว่างลงพื้นที่ ให้ประสานทีมเดิมก่อนย้าย",
                "ตัวเลขรายงานรายอำเภอย้อนหลังจะถูกคำนวณใหม่อัตโนมัติ",
                "หน่วยงานปลายทางต้องกดรับเคสภายใน SLA ที่กำหนด",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[3px] shrink-0" style={{ color: "var(--warn)" }}>
                    <Icon name="bell" size={13} />
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

export default function Admin() {
  const [cases, setCases] = useState<TransferCase[]>(CASES);
  const [transferCase, setTransferCase] = useState<TransferCase | null>(null);
  const [transferLog, setTransferLog] = useState<string[][]>([]);

  const openCases = cases.filter((c) => c.stage !== "ปิดเคส");
  const movedCount = cases.filter((c) => c.fromDistrict).length;

  function applyTransfer(
    target: TransferCase,
    district: string,
    unit: string,
    reason: string,
    keepSla: boolean,
  ) {
    setCases((prev) =>
      prev.map((item) =>
        item.id === target.id
          ? {
              ...item,
              district,
              team: unit,
              fromDistrict: item.fromDistrict ?? item.district,
              movedAt: "27 ส.ค. 2569 10:12",
              movedTo: unit,
            }
          : item,
      ),
    );
    setTransferLog((prev) => [
      [
        `ย้ายเคส ${target.id} จาก อ.${target.district} → อ.${district} (${reason}${keepSla ? "" : " · รีเซ็ต SLA"})`,
        "นายธนากร",
        "27 ส.ค. 10:12",
      ],
      ...prev,
    ]);
    setTransferCase(null);
  }

  return (
    <>
      <PageHead
        title="ระบบกำหนดกติกาด้วย Admin"
        desc="ย้ายเคสข้ามอำเภอ ตั้งกฎการทำงานอัตโนมัติ นิยามโรค มาตรฐานเวลา และสิทธิ์ผู้ใช้งานของทั้งจังหวัด"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการแก้ไข
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="plus" size={15} /> สร้างกติกาใหม่
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="กติกาที่เปิดใช้งาน" value="18" unit="/ 24 ข้อ" icon="settings" />
        <Stat label="ทริกเกอร์เดือนนี้" value="247" unit="ครั้ง" icon="sparkles" />
        <Stat label="ผู้ใช้งานในระบบ" value="307" unit="บัญชี" icon="users" />
        <Stat label="หน่วยงานที่เชื่อมต่อ" value="42" unit="แห่ง" icon="hospital" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ย้ายเคสไปอำเภออื่น"
            desc="Admin จังหวัดโอนความรับผิดชอบเคสข้ามอำเภอได้โดยตรง โดยไม่ต้องรอคำร้องจากหน่วยบริการ"
            icon="map"
            pad={false}
            action={
              movedCount > 0 ? (
                <Chip bg="#ede9fe" fg="#6d28d9">ย้ายแล้ว {movedCount} เคส</Chip>
              ) : (
                <Chip bg="#f1f5f9" fg="#475569">{openCases.length} เคสที่ย้ายได้</Chip>
              )
            }
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[900px]">
                <thead>
                  <tr>
                    <th className="th">รหัสเคส</th>
                    <th className="th">ผู้ป่วย</th>
                    <th className="th">โรค</th>
                    <th className="th">โรงพยาบาลที่แจ้ง</th>
                    <th className="th">อำเภอที่รับผิดชอบ</th>
                    <th className="th">สถานะ</th>
                    <th className="th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {openCases.map((c) => {
                    const tone = stageTone[c.stage];
                    return (
                      <tr key={c.id} className="hover:bg-surface2">
                        <td className="td font-mono text-[12px] font-semibold">{c.id}</td>
                        <td className="td whitespace-nowrap font-medium">{c.name}</td>
                        <td className="td">
                          <span
                            className="w-2 h-2 rounded-full inline-block mr-2 align-middle"
                            style={{ background: c.diseaseColor }}
                          />
                          <span className="align-middle">{c.disease}</span>
                        </td>
                        <td className="td text-muted whitespace-nowrap">{c.hospital}</td>
                        <td className="td min-w-[190px]">
                          {c.fromDistrict && (
                            <p className="text-[11px] text-faint line-through">อ.{c.fromDistrict}</p>
                          )}
                          <p className="font-medium">อ.{c.district}</p>
                          <p className="sub">{c.team}</p>
                        </td>
                        <td className="td">
                          <Chip bg={tone.bg} fg={tone.fg} dot>{c.stage}</Chip>
                          {c.movedAt && (
                            <p className="mt-1 text-[11px] text-faint">ย้ายเมื่อ {c.movedAt}</p>
                          )}
                        </td>
                        <td className="td">
                          <button
                            type="button"
                            className="btn btn-sm whitespace-nowrap"
                            onClick={() => setTransferCase(c)}
                          >
                            <Icon name="map" size={14} /> ย้ายอำเภอ
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="sub p-3.5 border-t border-line-brd">
              แสดงเฉพาะเคสที่ยังไม่ปิด · การย้ายทุกครั้งถูกบันทึกใน Audit log และแจ้งทั้งสองหน่วยงาน
            </p>
          </Card>

          <Card
            title="กติกาการทำงานอัตโนมัติ (Rule Engine)"
            desc="เงื่อนไข → การกระทำ · ระบบตรวจสอบทุกครั้งที่มีข้อมูลเข้า"
            icon="settings"
          >
            <div className="grid gap-3">
              {RULES.map((r) => (
                <article key={r.id} className="rounded-xl border border-line-brd overflow-hidden">
                  <header className="flex items-center gap-2.5 px-3.5 py-3 bg-surface2">
                    <span className="font-mono text-[11.5px] font-bold text-muted">{r.id}</span>
                    <span className="text-[13px] font-semibold flex-1 leading-snug">{r.n}</span>
                    <Chip bg="#f1f5f9" fg="#475569">
                      ทำงาน {r.hits} ครั้ง
                    </Chip>
                    <span
                      className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                      style={{
                        background: r.on ? "var(--accent)" : "#cbd5e1",
                        justifyContent: r.on ? "flex-end" : "flex-start",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full bg-white" />
                    </span>
                  </header>
                  <div className="p-3.5 grid gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <Chip bg="#dbeafe" fg="#1d4ed8">
                        เมื่อ
                      </Chip>
                      <p className="text-[12.5px] leading-relaxed flex-1">{r.when}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Chip bg="#dcfce7" fg="#15803d">
                        ให้
                      </Chip>
                      <p className="text-[12.5px] leading-relaxed flex-1">{r.then}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card
            title="มาตรฐานเวลาการทำงาน (SLA)"
            desc="ใช้คำนวณนาฬิกานับถอยหลังและเคสที่เกินกำหนด"
            icon="clock"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[620px]">
                <thead>
                  <tr>
                    <th className="th">ขั้นตอน</th>
                    <th className="th">โรคติดต่ออันตราย</th>
                    <th className="th">โรคเฝ้าระวังทั่วไป</th>
                    <th className="th">แจ้งเตือนเมื่อเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["โรงพยาบาลแจ้งเคสหลังวินิจฉัย", "3 ชั่วโมง", "24 ชั่วโมง", "30 นาที"],
                    ["ทีมภาคสนามกดรับเคส", "3 ชั่วโมง", "12 ชั่วโมง", "30 นาที"],
                    ["ลงพื้นที่สอบสวน", "24 ชั่วโมง", "72 ชั่วโมง", "4 ชั่วโมง"],
                    ["บันทึกแบบสอบสวนครบถ้วน", "48 ชั่วโมง", "7 วัน", "8 ชั่วโมง"],
                    ["อนุมัติปิดเคส", "7 วัน", "14 วัน", "1 วัน"],
                  ].map(([s, a, b, c]) => (
                    <tr key={String(s)} className="hover:bg-surface2">
                      <td className="td font-medium">{s}</td>
                      <td className="td">
                        <Chip bg="#fee2e2" fg="#b91c1c">
                          {a}
                        </Chip>
                      </td>
                      <td className="td">
                        <Chip bg="#e0f2fe" fg="#0369a1">
                          {b}
                        </Chip>
                      </td>
                      <td className="td text-muted">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="นิยามโรคและแบบฟอร์มที่ใช้"
            desc="เปิด/ปิดโรคที่ให้โรงพยาบาลเลือกได้ และผูกแบบฟอร์มมาตรฐาน"
            icon="shield"
            pad={false}
          >
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[680px]">
                <thead>
                  <tr>
                    <th className="th">โรค</th>
                    <th className="th">รหัส</th>
                    <th className="th">แบบฟอร์ม</th>
                    <th className="th">ระยะเวลาแจ้ง</th>
                    <th className="th">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {DISEASES.slice(0, 8).map((d, i) => (
                    <tr key={d.code} className="hover:bg-surface2">
                      <td className="td">
                        <Chip bg={d.tone} fg={d.color} dot>
                          {d.name}
                        </Chip>
                      </td>
                      <td className="td font-mono text-[12px] text-muted">{d.code}</td>
                      <td className="td text-muted">
                        {["ร.507", "ร.506", "ร.507", "ร.506", "ร.506", "ร.507", "ร.506", "TB-01"][i]}
                      </td>
                      <td className="td">{d.urgent ? "3 ชั่วโมง" : "24 ชั่วโมง"}</td>
                      <td className="td">
                        <span
                          className="w-9 h-5 rounded-full p-0.5 shrink-0 flex"
                          style={{
                            background: i < 7 ? "var(--accent)" : "#cbd5e1",
                            justifyContent: i < 7 ? "flex-end" : "flex-start",
                          }}
                        >
                          <span className="w-4 h-4 rounded-full bg-white" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* right */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="บทบาทและสิทธิ์ผู้ใช้" icon="users" pad={false}>
            <ul>
              {ROLES.map(([n, c, d]) => (
                <li key={String(n)} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-semibold flex-1">{n}</span>
                    <Chip bg="#dbeafe" fg="#1d4ed8">
                      {c} คน
                    </Chip>
                  </div>
                  <p className="sub mt-0.5">{d}</p>
                </li>
              ))}
            </ul>
            <div className="p-3">
              <button className="btn btn-sm w-full">
                <Icon name="plus" size={14} /> เพิ่มบทบาทใหม่
              </button>
            </div>
          </Card>

          <Card title="เส้นเตือนภัยรายโรค" icon="bell">
            <div className="grid gap-2.5">
              {[
                ["ไข้เลือดออก", "30 ราย/สัปดาห์", "#dc2626"],
                ["มือ เท้า ปาก", "20 ราย/สัปดาห์", "#059669"],
                ["ไข้หวัดใหญ่", "40 ราย/สัปดาห์", "#2563eb"],
                ["อาหารเป็นพิษ", "15 ราย/เหตุการณ์", "#d97706"],
                ["อหิวาตกโรค", "1 ราย (ทันที)", "#0891b2"],
              ].map(([n, v, c]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: String(c) }} />
                  <span className="text-[12.5px] flex-1">{n}</span>
                  <span className="text-[12px] font-semibold tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="บันทึกการเปลี่ยนแปลงล่าสุด" icon="clock">
            <ol className="relative pl-5">
              <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line-brd" />
              {[
                ...transferLog,
                ["ปรับเส้นเตือนภัยไข้เลือดออก 25 → 30", "นายธนากร", "26 ส.ค. 16:20"],
                ["เปิดใช้งานกติกา R-004", "นายธนากร", "24 ส.ค. 10:05"],
                ["เพิ่มสิทธิ์ รพ.พิษณุเวช", "ผู้ดูแลระบบ", "22 ส.ค. 09:12"],
                ["แก้ SLA ลงพื้นที่ 48 → 24 ชม.", "นางสุพรรณี", "18 ส.ค. 14:41"],
              ].map(([t, who, when]) => (
                <li key={String(t)} className="relative pb-3.5 last:pb-0">
                  <span
                    className="absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 border-white"
                    style={{ background: "var(--accent)" }}
                  />
                  <p className="text-[12.5px] leading-snug">{t}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Avatar name={String(who)} size={18} />
                    <span className="text-[11px] text-faint">
                      {who} · {when}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      {transferCase && (
        <TransferCaseModal
          key={transferCase.id}
          row={transferCase}
          onClose={() => setTransferCase(null)}
          onConfirm={(district, unit, reason, keepSla) =>
            applyTransfer(transferCase, district, unit, reason, keepSla)
          }
        />
      )}
    </>
  );
}
