"use client";

import { useState } from "react";
import { PageHead } from "@/components/DesktopShell";
import { Icon } from "@/components/icons";
import { Card, Chip } from "@/components/ui";

const WATCHLIST = [
  { code: "A90–A91", disease: "ไข้เลือดออก", active: true },
  { code: "B08.4", disease: "มือ เท้า ปาก", active: true },
  { code: "A27.-", disease: "เลปโตสไปโรซิส", active: true },
  { code: "B05.-", disease: "โรคหัด", active: true },
  { code: "J09–J11", disease: "ไข้หวัดใหญ่", active: false },
];

export default function ScreeningSettingsPage() {
  const [mode, setMode] = useState("icd10");
  const [rules, setRules] = useState(WATCHLIST);

  const toggleRule = (code: string) => {
    setRules((current) => current.map((rule) => rule.code === code ? { ...rule, active: !rule.active } : rule));
  };

  return (
    <>
      <PageHead
        title="ตั้งค่าวิธีคัดผู้ป่วยเข้าระบบ"
        actions={
          <button type="button" className="btn btn-primary btn-sm">
            <Icon name="check" size={15} /> บันทึกการตั้งค่า
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <Card title="วิธีคัดผู้ป่วย" icon="settings">
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["icd10", "รหัส ICD-10", "คัดจากรหัสวินิจฉัยของแพทย์"],
                ["lab", "ผลตรวจทางห้องปฏิบัติการ", "คัดจากผลตรวจที่เข้าเงื่อนไข"],
                ["combined", "ใช้หลายเงื่อนไขร่วมกัน", "ใช้รหัสวินิจฉัยร่วมกับอาการหรือผลตรวจ"],
              ].map(([value, title, detail]) => {
                const selected = mode === value;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setMode(value)}
                    className="rounded-xl border p-4 text-left"
                    style={{
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                      background: selected ? "color-mix(in srgb, var(--accent) 6%, white)" : "#fff",
                    }}
                  >
                    <span className="flex items-center gap-2 text-[13px] font-bold">
                      <span
                        className="grid h-[18px] w-[18px] place-items-center rounded-full border-2"
                        style={{ borderColor: selected ? "var(--accent)" : "#cbd5e1" }}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />}
                      </span>
                      {title}
                    </span>
                    <span className="mt-2 block text-[11.5px] leading-relaxed text-muted">{detail}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card
            title="รหัสวินิจฉัยที่ต้องคัดเข้า"
            icon="clipboard"
            pad={false}
            action={<Chip bg="#dcfce7" fg="#15803d">เปิดใช้ {rules.filter((rule) => rule.active).length} รายการ</Chip>}
          >
            <div className="scroll-x nice">
              <table className="w-full min-w-[620px] border-collapse">
                <thead>
                  <tr>
                    <th className="th">เปิดใช้</th>
                    <th className="th">รหัส ICD-10</th>
                    <th className="th">ชื่อโรค</th>
                    <th className="th">เงื่อนไข</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.code} className="hover:bg-surface2">
                      <td className="td">
                        <button
                          type="button"
                          aria-label={`${rule.active ? "ปิด" : "เปิด"} ${rule.disease}`}
                          onClick={() => toggleRule(rule.code)}
                          className="flex h-6 w-11 rounded-full p-0.5"
                          style={{
                            background: rule.active ? "var(--accent)" : "#cbd5e1",
                            justifyContent: rule.active ? "flex-end" : "flex-start",
                          }}
                        >
                          <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                        </button>
                      </td>
                      <td className="td font-mono font-bold">{rule.code}</td>
                      <td className="td font-medium">{rule.disease}</td>
                      <td className="td text-muted">พบรหัสนี้ใน Diagnosis ของการรับบริการ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line-brd p-4">
              <button type="button" className="btn btn-sm"><Icon name="plus" size={14} /> เพิ่มรหัส</button>
              <button type="button" className="btn btn-sm">นำเข้าชุดรหัสมาตรฐาน</button>
            </div>
          </Card>

          <Card title="เงื่อนไขการนำเข้าทะเบียน" icon="grid">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="lbl">ประเภทผู้รับบริการ</span>
                <select className="inp" defaultValue="all">
                  <option value="all">OPD, ER และ IPD</option>
                  <option value="opd">เฉพาะ OPD และ ER</option>
                  <option value="ipd">เฉพาะ IPD</option>
                </select>
              </label>
              <label>
                <span className="lbl">ช่วงเวลาตรวจข้อมูล</span>
                <select className="inp" defaultValue="2">
                  <option value="2">ทุก 2 นาที</option>
                  <option value="5">ทุก 5 นาที</option>
                  <option value="15">ทุก 15 นาที</option>
                </select>
              </label>
              <label>
                <span className="lbl">ป้องกันข้อมูลซ้ำ</span>
                <select className="inp" defaultValue="30">
                  <option value="30">HN + รหัสโรค ภายใน 30 วัน</option>
                  <option value="14">HN + รหัสโรค ภายใน 14 วัน</option>
                  <option value="visit">แยกทุก Visit</option>
                </select>
              </label>
              <label>
                <span className="lbl">เมื่อพบผู้ป่วยเข้าข่าย</span>
                <select className="inp" defaultValue="registry">
                  <option value="registry">เพิ่มในทะเบียนเพื่อรอตรวจสอบ</option>
                  <option value="notify">เพิ่มและแจ้งผู้รับผิดชอบทันที</option>
                </select>
              </label>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <Card title="การเชื่อมต่อ HosXP" icon="db">
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-xl bg-[#f0fdf4] p-3">
                <span className="text-[12.5px] font-semibold text-[#15803d]">เชื่อมต่อปกติ</span>
                <Chip bg="#dcfce7" fg="#15803d" dot>ONLINE</Chip>
              </div>
              {[
                ["ฐานข้อมูล", "HOSxP XE"],
                ["สแกนล่าสุด", "27 ส.ค. 2569 09:40 น."],
                ["Visit ล่าสุด", "VN 6908270814"],
                ["รอบถัดไป", "อีก 1 นาที"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3 border-b border-line-brd pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[11.5px] text-muted">{label}</span>
                  <span className="text-right text-[12px] font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="สรุปการตั้งค่าปัจจุบัน" icon="check">
            <div className="grid gap-2.5">
              {["คัดจากรหัส ICD-10", `${rules.filter((rule) => rule.active).length} ชุดรหัสเปิดใช้งาน`, "ตรวจ OPD, ER และ IPD", "เพิ่มเข้าทะเบียนเพื่อรอตรวจสอบ"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[12.5px]">
                  <span className="text-ok"><Icon name="check" size={15} /></span>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
