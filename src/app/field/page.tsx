import Link from "next/link";
import PhoneShell from "@/components/PhoneShell";
import { Icon } from "@/components/icons";
import { Chip, Progress } from "@/components/ui";
import { CASES, severityTone, stageTone } from "@/lib/mock";
import { FIELD_TABS } from "./tabs";

export default function FieldInbox() {
  const incoming = [
    { c: CASES[0], src: "รพ.พุทธชินราช", srcType: "hospital" as const, via: "Flex หมอพร้อม" },
    {
      c: {
        ...CASES[1],
        id: "RPT-6809-027",
        name: "ด.ช.ภูมิพัฒน์ แก้วมณี",
        age: 4,
        hospital: "รพ.สต.บ้านคลอง",
        tambon: "บ้านคลอง",
        district: "เมืองพิษณุโลก",
        reportedAt: "27 ส.ค. 09:15",
        severity: "เร่งด่วน" as const,
      },
      src: "รพ.สต.บ้านคลอง (อสม. แจ้ง)",
      srcType: "area" as const,
      via: "Dashboard กลาง",
    },
    { c: CASES[7], src: "รพ.วัดโบสถ์", srcType: "hospital" as const, via: "Dashboard กลาง" },
  ];
  const mine = CASES.filter((c) => c.stage === "รับเคสแล้ว" || c.stage === "ลงพื้นที่");

  return (
    <PhoneShell
      url="cdc.plkhealth.go.th/field"
      title="กล่องเคสสอบสวน"
      subtitle="ทีม SRRT อ.เมืองพิษณุโลก"
      caption="ระบบงานภาคสนาม · Web Mobile (เบราว์เซอร์บนมือถือ)"
      tabs={FIELD_TABS}
      right={
        <button className="relative opacity-90">
          <Icon name="bell" size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white" />
        </button>
      }
    >
      {/* summary strip */}
      <div className="px-4 pt-4 pb-1 grid grid-cols-3 gap-2.5">
        {[
          ["3", "รอรับเคส", "var(--danger)"],
          ["2", "กำลังทำ", "var(--warn)"],
          ["14", "เสร็จเดือนนี้", "var(--ok)"],
        ].map(([v, l, c]) => (
          <div key={l} className="bg-surface rounded-xl border border-line-brd px-3 py-2.5">
            <p className="text-[20px] font-bold leading-none" style={{ color: c }}>
              {v}
            </p>
            <p className="text-[10.5px] text-muted mt-1.5">{l}</p>
          </div>
        ))}
      </div>

      {/* incoming */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[13.5px] font-bold">เคสใหม่ที่รอรับ</h2>
          <Chip bg="#fee2e2" fg="#b91c1c" dot>
            {incoming.length} เคสรอรับ
          </Chip>
        </div>
        <p className="text-[11.5px] text-muted mb-2.5 -mt-1">
          กดรับเคสได้ทั้งจาก Dashboard กลางของจังหวัด และจาก Flex Message บนไลน์หมอพร้อม
        </p>

        {incoming.map(({ c, src, srcType, via }, i) => (
          <article
            key={c.id + i}
            className="bg-surface rounded-2xl border border-line-brd mb-3 overflow-hidden"
            style={{ borderLeft: `4px solid ${c.diseaseColor}` }}
          >
            <div className="p-3.5">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Chip bg={`${c.diseaseColor}18`} fg={c.diseaseColor} dot>
                      {c.disease}
                    </Chip>
                    <Chip {...severityTone[c.severity]}>{c.severity}</Chip>
                    {srcType === "area" && (
                      <Chip bg="#ede9fe" fg="#6d28d9">
                        แจ้งจาก รพ.สต.
                      </Chip>
                    )}
                    <Chip
                      bg={via === "Dashboard กลาง" ? "#dbeafe" : "#dcfce7"}
                      fg={via === "Dashboard กลาง" ? "#1d4ed8" : "#15803d"}
                    >
                      รับผ่าน {via}
                    </Chip>
                  </div>
                  <p className="text-[14.5px] font-bold mt-2 leading-tight">
                    {c.name} <span className="text-muted font-medium">· {c.age} ปี</span>
                  </p>
                  <p className="text-[11.5px] text-muted font-mono mt-0.5">{c.id}</p>
                </div>
                <span
                  className="grid place-items-center rounded-xl shrink-0"
                  style={{ width: 40, height: 40, background: `${c.diseaseColor}14`, color: c.diseaseColor }}
                >
                  <Icon name="shield" size={20} />
                </span>
              </div>

              <div className="mt-3 grid gap-1.5">
                {[
                  [srcType === "area" ? "area" : "hospital", src],
                  ["pin", `ม.4 ต.${c.tambon} อ.${c.district}`],
                  ["clock", `แจ้งเมื่อ ${c.reportedAt} · ต้องรับภายใน 3 ชม.`],
                ].map(([ic, t]) => (
                  <p key={String(t)} className="flex items-start gap-2 text-[12px] text-muted">
                    <span className="text-faint mt-[1px] shrink-0">
                      <Icon name={ic as "pin"} size={14} />
                    </span>
                    {t}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 mt-3.5">
                <Link href="/field/case" className="btn btn-sm flex-1">
                  ดูรายละเอียด
                </Link>
                <Link href="/field/case" className="btn btn-sm btn-primary flex-1">
                  <Icon name="check" size={14} /> กดรับเคส
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* my cases */}
      <div className="px-4 pt-2 pb-6">
        <h2 className="text-[13.5px] font-bold mb-2.5">เคสที่รับแล้ว</h2>
        {mine.map((c) => (
          <Link
            key={c.id}
            href="/field/investigate"
            className="block bg-surface rounded-2xl border border-line-brd mb-3 p-3.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: c.diseaseColor }}
              />
              <span className="text-[13.5px] font-bold flex-1 truncate">{c.name}</span>
              <Chip {...stageTone[c.stage]}>{c.stage}</Chip>
            </div>
            <p className="text-[11.5px] text-muted mt-1.5">
              {c.disease} · ต.{c.tambon} อ.{c.district}
            </p>
            <div className="flex items-center gap-2.5 mt-2.5">
              <Progress value={c.progress} height={5} />
              <span className="text-[11px] font-bold tabular-nums w-8 text-right">
                {c.progress}%
              </span>
            </div>
            <div className="flex gap-3 mt-2.5 text-[11px] text-faint">
              <span className="flex items-center gap-1">
                <Icon name="camera" size={13} /> 6 รูป
              </span>
              <span className="flex items-center gap-1">
                <Icon name="mic" size={13} /> 2 คลิป
              </span>
              <span className="flex items-center gap-1">
                <Icon name="pin" size={13} /> 3 จุด
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/field/desktop"
          className="flex items-center gap-2.5 rounded-2xl border border-dashed border-line-brd bg-surface p-3.5 mt-1"
        >
          <span
            className="grid place-items-center rounded-xl shrink-0"
            style={{ width: 34, height: 34, background: "#dbeafe", color: "#2563eb" }}
          >
            <Icon name="grid" size={17} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-semibold">เปิดมุมมองเดสก์ท็อป</span>
            <span className="block text-[11px] text-muted">
              ระบบเดียวกัน ใช้บนคอมพิวเตอร์ที่สำนักงานได้
            </span>
          </span>
          <span className="text-faint">
            <Icon name="arrowRight" size={16} />
          </span>
        </Link>
      </div>
    </PhoneShell>
  );
}
