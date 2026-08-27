"use client";

import Link from "next/link";
import { PageHead } from "@/components/DesktopShell";
import { Card, Chip, Field, Progress } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useUnitRole } from "@/components/UnitRole";

export default function CaseForm() {
  const { role } = useUnitRole();
  return (
    <>
      <PageHead
        title="แบบสอบสวนโรค ร.507 — ไข้เลือดออก"
        desc="เคส PLK-6809-0142 · HN 0045218 · ขั้นตอนที่ 3 จาก 5"
        actions={
          <>
            <Chip bg="#dcfce7" fg="#15803d" dot>
              บันทึกอัตโนมัติ 09:38
            </Chip>
            <button className="btn btn-sm">
              <Icon name="file" size={15} /> พิมพ์
            </button>
            <Link href="/hos/push" className="btn btn-primary btn-sm">
              บันทึก &amp; ส่งต่อ <Icon name="arrowRight" size={15} />
            </Link>
          </>
        }
      />

      <div
        className="card p-4 mb-5 flex flex-wrap items-center gap-x-6 gap-y-3"
        style={{ borderLeft: "4px solid var(--accent)" }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="grid place-items-center rounded-lg"
            style={{ width: 34, height: 34, background: "#ccfbf1", color: "#0d9488" }}
          >
            <Icon name="db" size={18} />
          </span>
          <div>
            <p className="text-[13px] font-semibold">ดึงข้อมูลจาก HIS สำเร็จ</p>
            <p className="sub">{role.his} · 28 จาก 41 ช่อง · เหลือให้เติม 13 ช่อง</p>
          </div>
        </div>
        <div className="flex-1 min-w-[180px] max-w-[320px]">
          <div className="flex justify-between text-[11.5px] mb-1.5">
            <span className="text-muted">ความสมบูรณ์ของแบบฟอร์ม</span>
            <span className="font-semibold">68%</span>
          </div>
          <Progress value={68} />
        </div>
        <button className="btn btn-sm">
          <Icon name="db" size={14} /> ดึงข้อมูลซ้ำ
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="ส่วนที่ 1 · ข้อมูลทั่วไปของผู้ป่วย" icon="hospital">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ชื่อ–สกุล" value="นายกฤษฎา พรมเรือง" source="HIS" />
              <Field label="เลขบัตรประชาชน" value="3-6501-004••-••-1" source="HIS" />
              <Field label="วัน/เดือน/ปีเกิด (อายุ)" value="14 มี.ค. 2535 (34 ปี)" source="HIS" />
              <Field label="เพศ" value="ชาย" source="HIS" />
              <Field label="สัญชาติ" value="ไทย" source="HIS" />
              <Field label="อาชีพ" value="รับจ้างก่อสร้าง" source="USER" />
              <Field
                label="ที่อยู่ขณะป่วย"
                value="บ้านเลขที่ 128/4 หมู่ 4 ต.บางกระทุ่ม อ.บางกระทุ่ม จ.พิษณุโลก 65110"
                source="HIS"
                wide
              />
              <Field label="โทรศัพท์" value="08x-xxx-4471" source="HIS" />
              <Field label="สิทธิการรักษา" value="สิทธิบัตรทอง (รพ.บางกระทุ่ม)" source="HIS" />
            </div>
          </Card>

          <Card title="ส่วนที่ 2 · ข้อมูลการเจ็บป่วย" icon="clipboard">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="วันเริ่มป่วย" value="22 ส.ค. 2569" source="USER" />
              <Field label="วันที่รับการรักษาครั้งแรก" value="25 ส.ค. 2569" source="HIS" />
              <Field label="วันที่รับไว้ในโรงพยาบาล" value="26 ส.ค. 2569" source="HIS" />
              <Field label="สถานะผู้ป่วย" value="ผู้ป่วยใน · หอผู้ป่วยอายุรกรรมชาย 2" source="HIS" />
              <Field label="การวินิจฉัย (ICD-10)" value="A91 Dengue haemorrhagic fever" source="HIS" />
              <Field label="ระดับความรุนแรง" value="DHF Grade II" source="USER" />
              <Field
                label="อาการสำคัญ"
                value="ไข้สูง 39.4°C 4 วัน ปวดศีรษะ ปวดกระบอกตา ปวดเมื่อยกล้ามเนื้อ มีจุดเลือดออกที่แขน"
                source="AI"
                wide
              />
            </div>
          </Card>

          <Card title="ส่วนที่ 3 · ผลตรวจทางห้องปฏิบัติการ" icon="db" pad={false}>
            <div className="scroll-x nice">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className="th">รายการตรวจ</th>
                    <th className="th">วันที่</th>
                    <th className="th">ผล</th>
                    <th className="th">ค่าอ้างอิง</th>
                    <th className="th">แหล่งข้อมูล</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Dengue NS1 Ag", "26 ส.ค. 2569", "Positive", "Negative", true],
                    ["Dengue IgM", "26 ส.ค. 2569", "Positive", "Negative", true],
                    ["Platelet count", "27 ส.ค. 2569", "78,000 /µL", "150,000–400,000", true],
                    ["Hematocrit", "27 ส.ค. 2569", "48.2 %", "40–52", true],
                    ["WBC", "27 ส.ค. 2569", "3,100 /µL", "4,000–10,000", true],
                    ["SGOT / SGPT", "27 ส.ค. 2569", "รอผล", "-", false],
                  ].map(([n, d, r, ref, his]) => (
                    <tr key={String(n)} className="hover:bg-surface2">
                      <td className="td font-medium">{n}</td>
                      <td className="td text-muted tabular-nums">{d}</td>
                      <td className="td">
                        <span
                          className="font-semibold tabular-nums"
                          style={{
                            color:
                              String(r).includes("Positive") || String(r).includes("78,000")
                                ? "var(--danger)"
                                : "var(--text)",
                          }}
                        >
                          {r}
                        </span>
                      </td>
                      <td className="td text-muted tabular-nums">{ref}</td>
                      <td className="td">
                        {his ? (
                          <Chip bg="#e0f2fe" fg="#0369a1">
                            LAB · HIS
                          </Chip>
                        ) : (
                          <Chip bg="#fef3c7" fg="#b45309">
                            รอเชื่อมผล
                          </Chip>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="ส่วนที่ 4 · ประวัติเสี่ยงและสิ่งแวดล้อม (ผู้ใช้กรอก)" icon="field">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="lbl">ประวัติเดินทางใน 14 วัน</span>
                <div className="flex flex-wrap gap-2">
                  {["ไม่มี", "ในจังหวัด", "ข้ามจังหวัด", "ต่างประเทศ"].map((o, i) => (
                    <button
                      key={o}
                      className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                      style={{
                        background: i === 1 ? "var(--accent)" : "#fff",
                        color: i === 1 ? "#fff" : "var(--muted)",
                        borderColor: i === 1 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="lbl">มีผู้ป่วยอาการคล้ายกันในบ้าน/ที่ทำงาน</span>
                <div className="flex flex-wrap gap-2">
                  {["ไม่มี", "มี 1 ราย", "มี 2 รายขึ้นไป", "ไม่ทราบ"].map((o, i) => (
                    <button
                      key={o}
                      className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                      style={{
                        background: i === 1 ? "var(--accent)" : "#fff",
                        color: i === 1 ? "#fff" : "var(--muted)",
                        borderColor: i === 1 ? "transparent" : "var(--border)",
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">สภาพแวดล้อมรอบบ้าน (เลือกได้หลายข้อ)</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "มีภาชนะขังน้ำ",
                    "พบลูกน้ำยุงลาย",
                    "มีแหล่งน้ำนิ่ง",
                    "กองขยะ/ยางรถยนต์",
                    "ไม่มีมุ้งลวด",
                    "พื้นที่ก่อสร้างใกล้เคียง",
                  ].map((o, i) => (
                    <button
                      key={o}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium border"
                      style={{
                        background: i < 3 ? "color-mix(in srgb, var(--accent) 10%, #fff)" : "#fff",
                        color: i < 3 ? "var(--accent)" : "var(--muted)",
                        borderColor: i < 3 ? "var(--accent)" : "var(--border)",
                      }}
                    >
                      {i < 3 && <Icon name="check" size={13} />}
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="lbl">บันทึกเพิ่มเติมของผู้สอบสวน</span>
                <textarea
                  className="inp min-h-[92px] resize-none"
                  readOnly
                  defaultValue="ผู้ป่วยทำงานไซต์ก่อสร้างย่านอรัญญิก มีเพื่อนร่วมงานไข้สูง 1 ราย ยังไม่ได้พบแพทย์ แจ้งทีม SRRT ลงพื้นที่สำรวจลูกน้ำในรัศมี 100 เมตร"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* right rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <Card title="ช่องที่ยังต้องเติม" icon="clipboard" action={<Chip bg="#fef3c7" fg="#b45309">13</Chip>}>
            <ul className="grid gap-2">
              {[
                ["อาชีพ / สถานที่ทำงาน", true],
                ["วันเริ่มป่วย", true],
                ["ระดับความรุนแรง (Grade)", true],
                ["ประวัติเดินทาง 14 วัน", true],
                ["ผู้สัมผัสร่วมบ้าน", false],
                ["พิกัดบ้านผู้ป่วย", false],
                ["ผล SGOT/SGPT", false],
              ].map(([t, done]) => (
                <li key={String(t)} className="flex items-center gap-2.5 text-[12.5px]">
                  <span
                    className="grid place-items-center rounded-full w-[18px] h-[18px] shrink-0"
                    style={{
                      background: done ? "var(--accent)" : "#f1f5f9",
                      color: done ? "#fff" : "var(--faint)",
                    }}
                  >
                    <Icon name="check" size={11} />
                  </span>
                  <span style={{ color: done ? "var(--muted)" : "var(--text)" }}>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="เครื่องมือช่วยกรอก" icon="sparkles">
            <div className="grid gap-2">
              <Link href="/hos/voice" className="btn justify-start">
                <Icon name="mic" size={16} /> สรุปสนทนาผู้ป่วยด้วยเสียง
              </Link>
              <Link href="/hos/documents" className="btn justify-start">
                <Icon name="file" size={16} /> แนบเอกสาร / ผลแล็บ
              </Link>
              <button className="btn justify-start">
                <Icon name="pin" size={16} /> ปักหมุดพิกัดบ้านผู้ป่วย
              </button>
              <button className="btn justify-start">
                <Icon name="sparkles" size={16} /> ให้ AI ตรวจความครบถ้วน
              </button>
            </div>
          </Card>

          <Card title="ไฟล์แนบของเคสนี้" icon="file">
            <ul className="grid gap-2.5">
              {[
                ["ผลตรวจ NS1 + CBC.pdf", "480 KB"],
                ["ภาพผื่นบริเวณแขน.jpg", "1.8 MB"],
                ["สรุปสนทนา (AI).docx", "96 KB"],
              ].map(([n, s]) => (
                <li key={String(n)} className="flex items-center gap-2.5">
                  <span className="text-faint">
                    <Icon name="file" size={16} />
                  </span>
                  <span className="text-[12.5px] flex-1 truncate">{n}</span>
                  <span className="text-[11px] text-faint">{s}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-sm w-full mt-3">
              <Icon name="plus" size={14} /> เพิ่มไฟล์แนบ
            </button>
          </Card>
        </div>
      </div>
    </>
  );
}
