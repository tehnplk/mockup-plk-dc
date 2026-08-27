/**
 * ข้อมูลจำลองสำหรับ UI Mockup เท่านั้น
 * ชื่อ-สกุลผู้ป่วย ผู้สัมผัส และเจ้าหน้าที่ทั้งหมดเป็นบุคคลสมมติ
 * ตั้งขึ้นจากการสุ่มจับคู่ชื่อและนามสกุลทั่วไป ไม่มีเจตนาอ้างอิงบุคคลจริง
 * รวมถึง HN เลขบัตรประชาชน พิกัด และสถิติต่างๆ
 */
export const PROVINCE = "พิษณุโลก";

export const DISTRICTS = [
  "เมืองพิษณุโลก",
  "วังทอง",
  "บางระกำ",
  "พรหมพิราม",
  "นครไทย",
  "บางกระทุ่ม",
  "วัดโบสถ์",
  "ชาติตระการ",
  "เนินมะปราง",
] as const;

export type Disease = {
  code: string;
  name: string;
  short: string;
  color: string;
  tone: string;
  urgent?: boolean;
};

export const DISEASES: Disease[] = [
  { code: "D66", name: "ไข้เลือดออก (Dengue)", short: "DF/DHF", color: "#dc2626", tone: "#fee2e2", urgent: true },
  { code: "D26", name: "อาหารเป็นพิษ", short: "Food poisoning", color: "#d97706", tone: "#fef3c7" },
  { code: "D31", name: "อหิวาตกโรค", short: "Cholera", color: "#0891b2", tone: "#cffafe", urgent: true },
  { code: "D15", name: "ไข้หวัดใหญ่", short: "Influenza", color: "#2563eb", tone: "#dbeafe" },
  { code: "D01", name: "COVID-19", short: "SARS-CoV-2", color: "#7c3aed", tone: "#ede9fe" },
  { code: "D21", name: "โรคหัด", short: "Measles", color: "#db2777", tone: "#fce7f3", urgent: true },
  { code: "D71", name: "มือ เท้า ปาก", short: "HFMD", color: "#059669", tone: "#d1fae5" },
  { code: "D43", name: "วัณโรค", short: "Tuberculosis", color: "#475569", tone: "#e2e8f0" },
  { code: "D80", name: "เลปโตสไปโรซิส", short: "Lepto", color: "#ca8a04", tone: "#fef9c3" },
  { code: "D37", name: "ไข้ชิคุนกุนยา", short: "Chikungunya", color: "#e11d48", tone: "#ffe4e6" },
  { code: "D84", name: "มาลาเรีย", short: "Malaria", color: "#0d9488", tone: "#ccfbf1" },
  { code: "D99", name: "โรคอุบัติใหม่ / อื่นๆ", short: "Other", color: "#64748b", tone: "#f1f5f9" },
];

export type CaseStage =
  | "รอรับเคส"
  | "รับเคสแล้ว"
  | "ลงพื้นที่"
  | "สอบสวนเสร็จ"
  | "ปิดเคส";

export const STAGES: CaseStage[] = [
  "รอรับเคส",
  "รับเคสแล้ว",
  "ลงพื้นที่",
  "สอบสวนเสร็จ",
  "ปิดเคส",
];

export type CaseRow = {
  id: string;
  hn: string;
  name: string;
  age: number;
  sex: "ช" | "ญ";
  disease: string;
  diseaseColor: string;
  hospital: string;
  district: string;
  tambon: string;
  reportedAt: string;
  stage: CaseStage;
  severity: "เฝ้าระวัง" | "เร่งด่วน" | "วิกฤต";
  team: string;
  progress: number;
};

export const CASES: CaseRow[] = [
  { id: "69082702", hn: "0045218", name: "กฤษฎา พรมเรือง", age: 34, sex: "ช", disease: "ไข้เลือดออก", diseaseColor: "#dc2626", hospital: "รพ.บางกระทุ่ม", district: "บางกระทุ่ม", tambon: "บางกระทุ่ม", reportedAt: "27 ส.ค. 08:14", stage: "รอรับเคส", severity: "เร่งด่วน", team: "-", progress: 10 },
  { id: "69082703", hn: "0093117", name: "ปุณยนุช แสนคำ", age: 8, sex: "ญ", disease: "มือ เท้า ปาก", diseaseColor: "#059669", hospital: "รพ.วังทอง", district: "วังทอง", tambon: "ชัยนาม", reportedAt: "27 ส.ค. 07:52", stage: "รับเคสแล้ว", severity: "เฝ้าระวัง", team: "ทีม SRRT วังทอง", progress: 32 },
  { id: "69082604", hn: "0011084", name: "บรรจง คำใส", age: 57, sex: "ช", disease: "เลปโตสไปโรซิส", diseaseColor: "#ca8a04", hospital: "รพ.บางระกำ", district: "บางระกำ", tambon: "ท่านางงาม", reportedAt: "26 ส.ค. 19:31", stage: "ลงพื้นที่", severity: "เร่งด่วน", team: "ทีม CDCU บางระกำ", progress: 58 },
  { id: "69082605", hn: "0067720", name: "ศิริลักษณ์ เกิดผล", age: 21, sex: "ญ", disease: "โรคหัด", diseaseColor: "#db2777", hospital: "รพ.พรหมพิราม", district: "พรหมพิราม", tambon: "วงฆ้อง", reportedAt: "26 ส.ค. 14:05", stage: "สอบสวนเสร็จ", severity: "วิกฤต", team: "ทีม SRRT จังหวัด", progress: 86 },
  { id: "69082506", hn: "0038890", name: "ธีระชัย นาคเงิน", age: 45, sex: "ช", disease: "อาหารเป็นพิษ", diseaseColor: "#d97706", hospital: "รพ.นครไทย", district: "นครไทย", tambon: "บ้านแยง", reportedAt: "25 ส.ค. 11:20", stage: "ปิดเคส", severity: "เฝ้าระวัง", team: "ทีม CDCU นครไทย", progress: 100 },
  { id: "69082505", hn: "0052341", name: "ละมัย พุ่มไสว", age: 63, sex: "ญ", disease: "ไข้เลือดออก", diseaseColor: "#dc2626", hospital: "รพ.รวมแพทย์พิษณุโลก", district: "เมืองพิษณุโลก", tambon: "อรัญญิก", reportedAt: "25 ส.ค. 09:47", stage: "ปิดเคส", severity: "เร่งด่วน", team: "ทีม SRRT เมือง", progress: 100 },
  { id: "69082503", hn: "0071265", name: "ณรงค์ฤทธิ์ อ่อนตา", age: 29, sex: "ช", disease: "ไข้หวัดใหญ่", diseaseColor: "#2563eb", hospital: "รพ.เนินมะปราง", district: "เนินมะปราง", tambon: "ชมพู", reportedAt: "24 ส.ค. 16:02", stage: "ลงพื้นที่", severity: "เฝ้าระวัง", team: "ทีม CDCU เนินมะปราง", progress: 47 },
  { id: "69082501", hn: "0019903", name: "กัญญาณัฐ ดวงแก้ว", age: 12, sex: "ญ", disease: "ไข้เลือดออก", diseaseColor: "#dc2626", hospital: "รพ.วัดโบสถ์", district: "วัดโบสถ์", tambon: "ท่างาม", reportedAt: "24 ส.ค. 10:38", stage: "สอบสวนเสร็จ", severity: "เร่งด่วน", team: "ทีม SRRT วัดโบสถ์", progress: 91 },
];

export const HOSPITALS = [
  { name: "รพ.บางกระทุ่ม", type: "รัฐ (F2)", cases: 11 },
  { name: "รพ.ค่ายสมเด็จพระนเรศวรมหาราช", type: "รัฐ (S)", cases: 11 },
  { name: "รพ.มหาวิทยาลัยนเรศวร", type: "รัฐ (A)", cases: 18 },
  { name: "รพ.กรุงเทพพิษณุโลก", type: "เอกชน", cases: 9 },
  { name: "รพ.รวมแพทย์พิษณุโลก", type: "เอกชน", cases: 7 },
  { name: "รพ.พิษณุเวช", type: "เอกชน", cases: 6 },
  { name: "รพ.วังทอง", type: "รัฐ (F2)", cases: 14 },
  { name: "รพ.บางระกำ", type: "รัฐ (F2)", cases: 12 },
];

export const TEAM_MEMBERS = [
  { name: "นายสมชาติ ยั่งยืน", role: "นักสาธารณสุขชำนาญการพิเศษ / หัวหน้าทีม SRRT", org: "สสจ.พิษณุโลก", on: true },
  { name: "นางสุพรรณี ทรัพย์เจริญ", role: "นักสาธารณสุขชำนาญการ", org: "สสจ.พิษณุโลก", on: true },
  { name: "น.ส.วราภรณ์ อินทร์ทอง", role: "นักสาธารณสุขปฏิบัติการ", org: "สสอ.บางกระทุ่ม", on: true },
  { name: "นายกิตติศักดิ์ แสงเพชร", role: "นักสาธารณสุขปฏิบัติการ (SRRT)", org: "ทีม SRRT บางกระทุ่ม", on: false },
  { name: "นางพรทิพย์ ชูเกียรติ", role: "นักสาธารณสุขชำนาญการ", org: "รพ.บางกระทุ่ม", on: true },
  { name: "นายสมพงษ์ ยิ้มแย้ม", role: "นักสาธารณสุขปฏิบัติการ", org: "สคร.2 พิษณุโลก", on: false },
];

export const DOCUMENTS = [
  { id: "DOC-2409-881", name: "แบบ ร.507 ไข้เลือดออก - 69082702.pdf", type: "แบบสอบสวนโรค", size: "1.2 MB", by: "รพ.บางกระทุ่ม", date: "27 ส.ค. 2569", tag: "ร.507" },
  { id: "DOC-2409-877", name: "ผลตรวจ NS1 + CBC - HN 0045218.pdf", type: "ผลตรวจทางห้องปฏิบัติการ", size: "480 KB", by: "LAB รพ.บางกระทุ่ม", date: "27 ส.ค. 2569", tag: "LAB" },
  { id: "DOC-2409-870", name: "ภาพถ่ายแหล่งเพาะพันธุ์ลูกน้ำ ม.4 ต.บางกระทุ่ม.zip", type: "ภาพถ่ายภาคสนาม", size: "18.4 MB", by: "ทีม SRRT บางกระทุ่ม", date: "26 ส.ค. 2569", tag: "ภาคสนาม" },
  { id: "DOC-2409-864", name: "สรุปการสนทนาผู้ป่วย (Voice-to-Text).docx", type: "บันทึกเสียงถอดความ", size: "96 KB", by: "ระบบ AI ถอดเสียง", date: "26 ส.ค. 2569", tag: "AI" },
  { id: "DOC-2409-858", name: "รายงานสรุปสถานการณ์รายสัปดาห์ W34.pdf", type: "รายงานสถานการณ์", size: "3.1 MB", by: "กลุ่มงานควบคุมโรค", date: "25 ส.ค. 2569", tag: "รายงาน" },
  { id: "DOC-2409-851", name: "หนังสือแจ้งเตือนภัยสุขภาพ ที่ พล 0032/ว412.pdf", type: "หนังสือราชการ", size: "220 KB", by: "สสจ.พิษณุโลก", date: "24 ส.ค. 2569", tag: "หนังสือ" },
];

export const WEEKLY = [
  { w: "W28", dengue: 12, hfmd: 6, flu: 9, food: 4 },
  { w: "W29", dengue: 15, hfmd: 8, flu: 7, food: 3 },
  { w: "W30", dengue: 19, hfmd: 11, flu: 6, food: 8 },
  { w: "W31", dengue: 24, hfmd: 9, flu: 8, food: 5 },
  { w: "W32", dengue: 31, hfmd: 13, flu: 11, food: 6 },
  { w: "W33", dengue: 38, hfmd: 15, flu: 9, food: 12 },
  { w: "W34", dengue: 46, hfmd: 12, flu: 14, food: 7 },
  { w: "W35", dengue: 41, hfmd: 10, flu: 12, food: 9 },
];

export const DISTRICT_LOAD = [
  { d: "เมืองพิษณุโลก", n: 58, rate: 41.2, trend: 12 },
  { d: "วังทอง", n: 31, rate: 33.8, trend: 6 },
  { d: "บางระกำ", n: 24, rate: 29.5, trend: -3 },
  { d: "พรหมพิราม", n: 19, rate: 24.1, trend: 4 },
  { d: "นครไทย", n: 14, rate: 18.7, trend: -6 },
  { d: "บางกระทุ่ม", n: 11, rate: 16.2, trend: 1 },
  { d: "วัดโบสถ์", n: 9, rate: 14.8, trend: 2 },
  { d: "ชาติตระการ", n: 6, rate: 11.3, trend: -1 },
  { d: "เนินมะปราง", n: 5, rate: 9.4, trend: 0 },
];

export const severityTone: Record<string, { bg: string; fg: string }> = {
  เฝ้าระวัง: { bg: "#e0f2fe", fg: "#0369a1" },
  เร่งด่วน: { bg: "#ffedd5", fg: "#c2410c" },
  วิกฤต: { bg: "#fee2e2", fg: "#b91c1c" },
};

export const stageTone: Record<string, { bg: string; fg: string }> = {
  รอรับเคส: { bg: "#f1f5f9", fg: "#475569" },
  รับเคสแล้ว: { bg: "#dbeafe", fg: "#1d4ed8" },
  ลงพื้นที่: { bg: "#fef3c7", fg: "#b45309" },
  สอบสวนเสร็จ: { bg: "#ede9fe", fg: "#6d28d9" },
  ปิดเคส: { bg: "#dcfce7", fg: "#15803d" },
};
