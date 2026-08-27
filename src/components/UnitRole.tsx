import type { IconName } from "./icons";

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
  url: "https://srrt.plkhealth.go.th/hos/bangkrathum",
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
