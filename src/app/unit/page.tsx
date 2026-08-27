"use client";

import { useUnitRole } from "@/components/UnitRole";
import HospitalOverview from "./_overview/HospitalOverview";
import TambonOverview from "./_overview/TambonOverview";

/**
 * โมดูลหน่วยบริการใช้เมนูและฟีเจอร์ชุดเดียวกันทุกบทบาท
 * ต่างกันที่ "ภาพรวม" ซึ่งสรุปงานตามขอบเขตของแต่ละบทบาท
 */
export default function UnitHome() {
  const { role } = useUnitRole();
  return role.id === "hospital" ? <HospitalOverview /> : <TambonOverview />;
}
