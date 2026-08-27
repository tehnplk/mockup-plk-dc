import { Icon, type IconName } from "./icons";

export type UnitProfile = {
  kind: string;
  org: string;
  system: string;
  url: string;
  accent: "hospital";
  icon: IconName;
  his: string;
  scope: string;
  scopeSub: string;
  user: { name: string; role: string };
};

/** หน่วยบริการตัวอย่างเดียว ครอบคลุมทั้งงานในโรงพยาบาลและพื้นที่รับผิดชอบ */
export const UNIT_PROFILE: UnitProfile = {
  kind: "โรงพยาบาลชุมชน",
  org: "รพ.บางกระทุ่ม",
  system: "SRRT UNIT",
  url: "https://srrt.plkhealth.go.th/unit/bangkrathum",
  accent: "hospital",
  icon: "hospital",
  his: "HOSxP XE",
  scope: "ผู้ป่วยในโรงพยาบาลและประชาชนในพื้นที่รับผิดชอบ",
  scopeSub: "อ.บางกระทุ่ม จ.พิษณุโลก",
  user: {
    name: "นางนภัสสร ชัยวัฒน์",
    role: "นักสาธารณสุขชำนาญการ · ผู้รับผิดชอบงานสอบสวนโรค",
  },
};

/** คง API เดิมให้หน้าฟอร์มต่างๆ อ่านข้อมูลหน่วยบริการเดียวกัน */
export function useUnitRole() {
  return { role: UNIT_PROFILE };
}

export function UnitScopeBar({ role = UNIT_PROFILE }: { role?: UnitProfile }) {
  return (
    <div className="card px-4 py-3 mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span
        className="grid place-items-center rounded-lg shrink-0 text-white"
        style={{ width: 32, height: 32, background: "var(--accent)" }}
      >
        <Icon name={role.icon} size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-tight">{role.org}</p>
        <p className="sub">
          {role.kind} · {role.scopeSub}
        </p>
      </div>
      <div className="flex-1" />
      <span className="chip" style={{ background: "#e0f2fe", color: "#0369a1" }}>
        <Icon name="db" size={12} /> {role.his}
      </span>
      <span className="chip" style={{ background: "#f1f5f9", color: "#475569" }}>
        ขอบเขต: {role.scope}
      </span>
    </div>
  );
}
