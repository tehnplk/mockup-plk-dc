"use client";

import { createContext, useContext, useState } from "react";
import { Icon, type IconName } from "./icons";

/**
 * ตาม doc/spec.md — "โมดูลของหน่วยบริการ" เป็นโมดูลเดียว ใช้ร่วมกันทั้ง
 * โรงพยาบาล (รัฐ/เอกชน) และหน่วยบริการเจ้าของพื้นที่ (รพ.สต.)
 * ต่างกันเพียงบทบาทผู้ใช้และขอบเขตพื้นที่รับผิดชอบ
 */
export type UnitRoleId = "hospital" | "tambon";

export type UnitRole = {
  id: UnitRoleId;
  kind: string;
  org: string;
  short: string;
  system: string;
  url: string;
  accent: "hospital" | "area";
  icon: IconName;
  his: string;
  scope: string;
  scopeSub: string;
  user: { name: string; role: string };
};

export const UNIT_ROLES: Record<UnitRoleId, UnitRole> = {
  hospital: {
    id: "hospital",
    kind: "โรงพยาบาล",
    org: "รพ.พุทธชินราช พิษณุโลก",
    short: "รพ.พุทธชินราช",
    system: "SRRT UNIT",
    url: "https://srrt.plkhealth.go.th/unit/10670",
    accent: "hospital",
    icon: "hospital",
    his: "HOSxP XE",
    scope: "ผู้ป่วยที่มารับบริการในโรงพยาบาล",
    scopeSub: "รพ.ระดับ A · เขตอำเภอเมืองพิษณุโลก",
    user: { name: "พญ.นภัสสร ชัยวัฒน์", role: "ผู้รับผิดชอบงานสอบสวนโรค" },
  },
  tambon: {
    id: "tambon",
    kind: "หน่วยบริการเจ้าของพื้นที่",
    org: "รพ.สต.บ้านคลอง",
    short: "รพ.สต.บ้านคลอง",
    system: "SRRT UNIT",
    url: "https://srrt.plkhealth.go.th/unit/06512",
    accent: "area",
    icon: "area",
    his: "JHCIS",
    scope: "ประชาชนในเขตรับผิดชอบ",
    scopeSub: "ต.บ้านคลอง อ.เมืองพิษณุโลก · 9 หมู่บ้าน",
    user: { name: "นายวิรัตน์ สุขเกษม", role: "ผอ.รพ.สต. / ผู้รับผิดชอบงานสอบสวนโรค" },
  },
};

export type UnitCtx = { role: UnitRole; setRole: (id: UnitRoleId) => void };

export const UnitRoleContext = createContext<UnitCtx | null>(null);

export function useUnitRole() {
  const ctx = useContext(UnitRoleContext);
  if (!ctx) throw new Error("useUnitRole ต้องอยู่ภายใน UnitRoleContext.Provider");
  return ctx;
}

/** state ของโมดูลหน่วยบริการ ใช้ใน layout */
export function useUnitRoleState(initial: UnitRoleId = "hospital"): UnitCtx {
  const [id, setId] = useState<UnitRoleId>(initial);
  return { role: UNIT_ROLES[id], setRole: setId };
}

/** ตัวสลับบทบาทหน่วยบริการ — โมดูลเดียวกัน คนละบทบาท */
export function UnitRoleSwitcher({ role, setRole }: UnitCtx) {
  return (
    <div>
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-faint mb-1.5 px-1">
        บทบาทหน่วยบริการ
      </p>
      <div className="grid gap-1">
        {Object.values(UNIT_ROLES).map((r) => {
          const active = r.id === role.id;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-left transition-colors border"
              style={{
                background: active ? "color-mix(in srgb, var(--accent) 10%, white)" : "#fff",
                borderColor: active ? "var(--accent)" : "var(--border)",
              }}
            >
              <span
                className="grid place-items-center rounded-lg shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: active ? "var(--accent)" : "var(--surface2)",
                  color: active ? "#fff" : "var(--faint)",
                }}
              >
                <Icon name={r.icon} size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block text-[12px] font-semibold truncate"
                  style={{ color: active ? "var(--accent)" : "var(--text)" }}
                >
                  {r.short}
                </span>
                <span className="block text-[10.5px] text-muted truncate">{r.kind}</span>
              </span>
              {active && (
                <span style={{ color: "var(--accent)" }}>
                  <Icon name="check" size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** แถบบอกขอบเขตงานของบทบาทปัจจุบัน ใช้บนหัวหน้าจอของโมดูล */
export function UnitScopeBar({ role }: { role: UnitRole }) {
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

/** ตัวสลับบทบาทแบบกะทัดรัด สำหรับจอมือถือ (แถบบนสุด) */
export function UnitRoleToggle({ role, setRole }: UnitCtx) {
  return (
    <div className="md:hidden flex items-center gap-0.5 p-0.5 rounded-full border border-line-brd bg-surface2">
      {Object.values(UNIT_ROLES).map((r) => {
        const active = r.id === role.id;
        return (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            aria-label={r.short}
            className="grid place-items-center rounded-full transition-colors"
            style={{
              width: 30,
              height: 30,
              background: active ? "var(--accent)" : "transparent",
              color: active ? "#fff" : "var(--faint)",
            }}
          >
            <Icon name={r.icon} size={15} />
          </button>
        );
      })}
    </div>
  );
}
