"use client";

import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Stat, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useUnitRole } from "@/components/UnitRole";

const PAYLOAD = `{
  "case_id": "PLK-6809-0142",
  "hospital_code": "BKT-MOCK",
  "hospital_name": "รพ.บางกระทุ่ม",
  "disease": { "code": "66", "name": "ไข้เลือดออก", "icd10": "A91" },
  "patient": {
    "hn_hash": "sha256:7f3a…c19",
    "cid_hash": "sha256:b82e…4da",
    "age": 34, "sex": "M", "nationality": "TH"
  },
  "address": {
    "tambon": "บางกระทุ่ม", "amphoe": "บางกระทุ่ม",
    "province": "พิษณุโลก",
    "lat": 16.8211, "lng": 100.2659
  },
  "onset_date": "2026-08-22",
  "admit_date": "2026-08-26",
  "severity": "DHF Grade II",
  "lab": [
    { "test": "NS1", "result": "positive" },
    { "test": "platelet", "value": 78000 }
  ],
  "contacts_symptomatic": 1,
  "attachments": 3,
  "reported_by": "นางนภัสสร ชัยวัฒน์",
  "reported_at": "2026-08-27T09:41:00+07:00"
}`;

export default function PushPage() {
  const { role } = useUnitRole();
  return (
    <>
      <PageHead
        title="Push ข้อมูลเข้า Dashboard กลางของจังหวัด"
        desc="ส่งข้อมูลเคสเข้าศูนย์ข้อมูล สสจ.พิษณุโลก ผ่าน API มาตรฐาน (FHIR-like) โดยข้อมูลระบุตัวตนถูกเข้ารหัสก่อนส่ง"
        actions={
          <>
            <button className="btn btn-sm">
              <Icon name="clock" size={15} /> ประวัติการส่ง
            </button>
            <button className="btn btn-primary btn-sm">
              <Icon name="send" size={15} /> Push เดี๋ยวนี้
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <Stat label="ส่งสำเร็จวันนี้" value={9} unit="เคส" icon="check" tone="var(--ok)" />
        <Stat label="รอส่ง (คิว)" value={3} unit="เคส" icon="clock" tone="var(--warn)" />
        <Stat label="ส่งไม่สำเร็จ" value={1} unit="เคส" icon="bell" tone="var(--danger)" />
        <Stat label="เวลาตอบสนองเฉลี่ย" value="0.8" unit="วินาที" icon="db" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card
            title="ตรวจสอบก่อนส่ง — เคส PLK-6809-0142"
            desc="ระบบตรวจความครบถ้วนตามกติกาที่ Admin จังหวัดกำหนดไว้"
            icon="shield"
          >
            <ul className="grid gap-2.5">
              {[
                ["ข้อมูลผู้ป่วยครบตามข้อกำหนดขั้นต่ำ", "ok"],
                ["ระบุพิกัดที่อยู่ (lat/lng)", "ok"],
                ["ผลตรวจยืนยันทางห้องปฏิบัติการ", "ok"],
                ["เข้ารหัสข้อมูลระบุตัวตน (hash CID/HN)", "ok"],
                ["แนบแบบ ร.507 ฉบับสมบูรณ์", "warn"],
                ["ระบุทีมสอบสวนที่รับผิดชอบ", "warn"],
              ].map(([t, s]) => {
                const ok = s === "ok";
                return (
                  <li
                    key={String(t)}
                    className="flex items-center gap-3 rounded-xl border border-line-brd p-3"
                  >
                    <span
                      className="grid place-items-center rounded-full w-6 h-6 shrink-0 text-white"
                      style={{ background: ok ? "var(--ok)" : "var(--warn)" }}
                    >
                      <Icon name={ok ? "check" : "bell"} size={13} />
                    </span>
                    <span className="text-[13px] flex-1">{t}</span>
                    <Chip
                      bg={ok ? "#dcfce7" : "#fef3c7"}
                      fg={ok ? "#15803d" : "#b45309"}
                    >
                      {ok ? "ผ่าน" : "ควรเติมก่อนส่ง"}
                    </Chip>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link href="/unit/case" className="btn btn-sm">
                กลับไปแก้แบบฟอร์ม
              </Link>
              <button className="btn btn-sm btn-primary">ยืนยันและส่งข้อมูล</button>
            </div>
          </Card>

          <Card
            title="ข้อมูลที่จะส่ง (Payload ตัวอย่าง)"
            desc="POST https://dashboard.plkhealth.go.th/api/v1/cases"
            icon="db"
            action={<Chip bg="#dcfce7" fg="#15803d">TLS 1.3 · OAuth2</Chip>}
          >
            <pre
              className="rounded-xl p-4 text-[11.5px] leading-relaxed overflow-x-auto nice font-mono"
              style={{ background: "#0f172a", color: "#cbd5e1" }}
            >
              {PAYLOAD}
            </pre>
          </Card>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <Card title="สถานะการเชื่อมต่อ" icon="db">
            <div className="grid gap-3">
              {[
                [`HIS (${role.his})`, "เชื่อมต่อปกติ", "#dcfce7", "#15803d"],
                ["Dashboard กลาง สสจ.", "เชื่อมต่อปกติ", "#dcfce7", "#15803d"],
                ["ระบบไลน์หมอพร้อม", "เชื่อมต่อปกติ", "#dcfce7", "#15803d"],
                ["ระบบ 506 กรมควบคุมโรค", "หน่วงเวลา 4 นาที", "#fef3c7", "#b45309"],
              ].map(([n, s, bg, fg]) => (
                <div key={String(n)} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fg }} />
                  <span className="text-[12.5px] flex-1">{n}</span>
                  <Chip bg={String(bg)} fg={String(fg)}>
                    {s}
                  </Chip>
                </div>
              ))}
            </div>
          </Card>

          <Card title="คิวการส่งข้อมูล" icon="clock" pad={false}>
            <ul>
              {[
                ["PLK-6809-0142", "ไข้เลือดออก", "รอส่ง", "#f1f5f9", "#475569", 0],
                ["PLK-6809-0141", "มือ เท้า ปาก", "กำลังส่ง", "#dbeafe", "#1d4ed8", 62],
                ["PLK-6809-0139", "เลปโตสไปโรซิส", "ส่งสำเร็จ", "#dcfce7", "#15803d", 100],
                ["PLK-6809-0138", "อาหารเป็นพิษ", "ส่งไม่สำเร็จ", "#fee2e2", "#b91c1c", 100],
                ["PLK-6809-0137", "โรคหัด", "ส่งสำเร็จ", "#dcfce7", "#15803d", 100],
              ].map(([id, d, s, bg, fg, p]) => (
                <li key={String(id)} className="px-4 py-3 border-b border-line-brd last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11.5px]">{id}</span>
                    <span className="flex-1" />
                    <Chip bg={String(bg)} fg={String(fg)}>
                      {s}
                    </Chip>
                  </div>
                  <p className="sub mt-0.5">{d}</p>
                  {Number(p) > 0 && Number(p) < 100 && (
                    <div className="mt-2">
                      <Progress value={Number(p)} height={4} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="ขั้นตอนถัดไป" icon="send">
            <p className="sub mb-3">
              เมื่อส่งสำเร็จ ระบบจะแจ้งทีมเจ้าหน้าที่ที่คัดเลือกไว้ผ่าน Flex Message
              บนไลน์หมอพร้อมโดยอัตโนมัติ
            </p>
            <Link href="/unit/notify" className="btn btn-primary w-full">
              <Icon name="chat" size={16} /> ไปหน้าส่ง Flex Message
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
