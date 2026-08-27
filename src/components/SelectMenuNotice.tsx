import { Icon } from "@/components/icons";

/** หน้าเปล่าประจำโมดูล — ยังไม่เลือกเมนูย่อย */
export default function SelectMenuNotice() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="card flex max-w-[420px] flex-col items-center gap-3 px-8 py-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface2 text-muted">
          <Icon name="arrowRight" size={22} />
        </span>
        <p className="text-[15px] font-bold">กรุณาเลือกเมนูด้านซ้าย</p>
        <p className="text-[12.5px] text-muted">
          เลือกรายการจากเมนูด้านซ้ายเพื่อเริ่มใช้งาน
        </p>
      </div>
    </div>
  );
}
