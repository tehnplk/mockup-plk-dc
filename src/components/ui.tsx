import { Icon, type IconName } from "./icons";

/* ---------------- primitives ---------------- */

export function Chip({
  children,
  bg = "#f1f5f9",
  fg = "#475569",
  dot,
}: {
  children: React.ReactNode;
  bg?: string;
  fg?: string;
  dot?: boolean;
}) {
  return (
    <span className="chip" style={{ background: bg, color: fg }}>
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 99,
            background: fg,
            display: "inline-block",
          }}
        />
      )}
      {children}
    </span>
  );
}

export function Card({
  title,
  desc,
  icon,
  action,
  children,
  className = "",
  pad = true,
}: {
  title?: React.ReactNode;
  desc?: React.ReactNode;
  icon?: IconName;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <header className="card-h">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <span
                className="grid place-items-center rounded-lg shrink-0"
                style={{
                  width: 30,
                  height: 30,
                  background: "color-mix(in srgb, var(--accent) 12%, white)",
                  color: "var(--accent)",
                }}
              >
                <Icon name={icon} size={16} />
              </span>
            )}
            <div className="min-w-0">
              <h2 className="card-t truncate">{title}</h2>
              {desc && <p className="sub truncate">{desc}</p>}
            </div>
          </div>
          {action}
        </header>
      )}
      <div className={pad ? "p-4 sm:p-5" : ""}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  unit,
  delta,
  icon,
  tone = "var(--accent)",
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  icon?: IconName;
  tone?: string;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="sub font-medium">{label}</p>
        {icon && (
          <span style={{ color: tone, opacity: 0.85 }}>
            <Icon name={icon} size={17} />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className="text-[26px] font-bold tracking-tight leading-none"
          style={{ color: tone }}
        >
          {value}
        </span>
        {unit && <span className="text-[12px] text-muted">{unit}</span>}
      </div>
      {typeof delta === "number" && (
        <p
          className="mt-2 text-[11.5px] font-semibold"
          style={{ color: delta >= 0 ? "var(--danger)" : "var(--ok)" }}
        >
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% เทียบสัปดาห์ก่อน
        </p>
      )}
    </div>
  );
}

export function Progress({
  value,
  color = "var(--accent)",
  height = 6,
}: {
  value: number;
  color?: string;
  height?: number;
}) {
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ background: "#e9eef5", height }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          background: color,
          borderRadius: 99,
        }}
      />
    </div>
  );
}

export function initial(name: string) {
  return (
    name.replace(/^(นพ\.|พญ\.|ภก\.|ภญ\.|ทพ\.|น\.ส\.|นางสาว|นาย|นาง)\s*/, "").trim()[0] ??
    "?"
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-full font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: "color-mix(in srgb, var(--accent) 14%, white)",
        color: "var(--accent)",
      }}
    >
      {initial(name)}
    </span>
  );
}

export function Field({
  label,
  value,
  source,
  wide,
}: {
  label: string;
  value: React.ReactNode;
  source?: "HIS" | "USER" | "AI";
  wide?: boolean;
}) {
  const tone =
    source === "HIS"
      ? { bg: "#e0f2fe", fg: "#0369a1", t: "จาก HIS" }
      : source === "AI"
        ? { bg: "#ede9fe", fg: "#6d28d9", t: "AI เติมให้" }
        : { bg: "#fef3c7", fg: "#b45309", t: "ผู้ใช้กรอก" };
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[12px] font-semibold text-muted">{label}</span>
        {source && (
          <Chip bg={tone.bg} fg={tone.fg}>
            {tone.t}
          </Chip>
        )}
      </div>
      <div
        className="rounded-[10px] px-3 py-2.5 text-[13.5px]"
        style={{
          background: source === "USER" ? "#fff" : "#f8fafc",
          border: "1px solid var(--border)",
          borderStyle: source === "USER" ? "dashed" : "solid",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function Empty({ text, icon = "file" }: { text: string; icon?: IconName }) {
  return (
    <div className="py-10 grid place-items-center text-center gap-2">
      <span style={{ color: "var(--faint)" }}>
        <Icon name={icon} size={30} />
      </span>
      <p className="sub">{text}</p>
    </div>
  );
}

/* ---------------- charts (hand-rolled svg) ---------------- */

export function BarChart({
  data,
  height = 170,
  colors = ["#dc2626", "#059669", "#2563eb", "#d97706"],
  keys,
  labels,
}: {
  data: Record<string, number | string>[];
  height?: number;
  colors?: string[];
  keys: string[];
  labels: string[];
}) {
  const max = Math.max(
    ...data.flatMap((d) => keys.map((k) => Number(d[k]) || 0)),
  );
  const step = 100 / data.length;
  const bw = step / (keys.length + 0.9);
  return (
    <div>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1="0"
            x2="100"
            y1={height - 18 - g * (height - 30)}
            y2={height - 18 - g * (height - 30)}
            stroke="#eef2f7"
            strokeWidth="1"
          />
        ))}
        {data.map((d, i) =>
          keys.map((k, j) => {
            const v = Number(d[k]) || 0;
            const h = (v / max) * (height - 30);
            return (
              <rect
                key={`${i}-${k}`}
                x={i * step + bw * 0.5 + j * bw}
                y={height - 18 - h}
                width={bw * 0.86}
                height={h}
                rx="0.8"
                fill={colors[j % colors.length]}
              />
            );
          }),
        )}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-[10.5px] text-faint">
            {String(d.w ?? d.label ?? "")}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {labels.map((l, i) => (
          <span key={l} className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 3,
                background: colors[i % colors.length],
              }}
            />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LineChart({
  series,
  height = 180,
  labels,
}: {
  series: { name: string; color: string; points: number[] }[];
  height?: number;
  labels: string[];
}) {
  const all = series.flatMap((s) => s.points);
  const max = Math.max(...all) * 1.12;
  const n = series[0].points.length;
  const px = (i: number) => (i / (n - 1)) * 96 + 2;
  const py = (v: number) => height - 20 - (v / max) * (height - 34);
  return (
    <div>
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
        {[0, 0.33, 0.66, 1].map((g) => (
          <line key={g} x1="0" x2="100" y1={py(max * g)} y2={py(max * g)} stroke="#eef2f7" strokeWidth="1" />
        ))}
        {series.map((s) => (
          <g key={s.name}>
            <polyline
              points={s.points.map((v, i) => `${px(i)},${py(v)}`).join(" ")}
              fill="none"
              stroke={s.color}
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {s.points.map((v, i) => (
              <circle key={i} cx={px(i)} cy={py(v)} r="1.1" fill={s.color} />
            ))}
          </g>
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {labels.map((l) => (
          <span key={l} className="text-[10.5px] text-faint">
            {l}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <span style={{ width: 14, height: 3, borderRadius: 9, background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Donut({
  slices,
  size = 150,
  center,
  centerSub,
}: {
  slices: { label: string; value: number; color: string }[];
  size?: number;
  center?: string;
  centerSub?: string;
}) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  const r = 42;
  const c = 2 * Math.PI * r;
  const arcs = slices.map((s, i) => ({
    ...s,
    frac: s.value / total,
    offset: slices.slice(0, i).reduce((a, p) => a + p.value, 0) / total,
  }));
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
        <g transform="rotate(-90 50 50)">
          {arcs.map((s) => (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="13"
              strokeDasharray={`${s.frac * c} ${c}`}
              strokeDashoffset={-s.offset * c}
            />
          ))}
        </g>
        {center && (
          <>
            <text x="50" y={centerSub ? 48 : 53} textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">
              {center}
            </text>
            {centerSub && (
              <text x="50" y="61" textAnchor="middle" fontSize="8" fill="#64748b">
                {centerSub}
              </text>
            )}
          </>
        )}
      </svg>
      <div className="grid gap-2 flex-1 min-w-[130px]">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-[12.5px]">
            <span style={{ width: 9, height: 9, borderRadius: 3, background: s.color }} />
            <span className="flex-1 text-muted truncate">{s.label}</span>
            <span className="font-semibold tabular-nums">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Phitsanulok district map (stylised) ---------------- */

const SHAPES: Record<string, string> = {
  ชาติตระการ: "M28,16 L92,8 L104,40 L96,78 L46,86 L22,58 Z",
  นครไทย: "M92,8 L166,14 L182,52 L172,96 L120,110 L96,78 L104,40 Z",
  พรหมพิราม: "M22,58 L46,86 L96,78 L104,116 L74,150 L26,142 L10,100 Z",
  วัดโบสถ์: "M96,78 L120,110 L172,96 L166,140 L124,158 L104,116 Z",
  เนินมะปราง: "M166,140 L192,158 L188,224 L152,240 L138,196 L156,164 Z",
  เมืองพิษณุโลก: "M74,150 L104,116 L124,158 L120,196 L82,206 L64,180 Z",
  วังทอง: "M124,158 L156,164 L138,196 L142,236 L104,244 L82,206 L120,196 Z",
  บางระกำ: "M10,100 L26,142 L74,150 L64,180 L70,224 L30,238 L4,190 Z",
  บางกระทุ่ม: "M70,224 L82,206 L104,244 L96,272 L52,268 L30,238 Z",
};

export function PlkMap({
  values,
  scaleFrom = "#dbeafe",
  scaleTo = "#b91c1c",
  onLabel = true,
  height = 340,
  pins,
}: {
  values: Record<string, number>;
  scaleFrom?: string;
  scaleTo?: string;
  onLabel?: boolean;
  height?: number;
  pins?: { d: string; x: number; y: number; color: string; size?: number }[];
}) {
  const max = Math.max(...Object.values(values), 1);
  return (
    <svg viewBox="0 0 200 285" style={{ width: "100%", height }} role="img">
      <defs>
        <linearGradient id="mapgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={scaleFrom} />
          <stop offset="100%" stopColor={scaleTo} />
        </linearGradient>
      </defs>
      {Object.entries(SHAPES).map(([name, d]) => {
        const v = values[name] ?? 0;
        const t = v / max;
        return (
          <path
            key={name}
            d={d}
            fill={`color-mix(in srgb, ${scaleTo} ${Math.round(t * 82 + 6)}%, ${scaleFrom})`}
            stroke="#ffffff"
            strokeWidth="1.6"
          />
        );
      })}
      {onLabel &&
        Object.entries(SHAPES).map(([name, d]) => {
          const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
          const xs = nums.filter((_, i) => i % 2 === 0);
          const ys = nums.filter((_, i) => i % 2 === 1);
          const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
          const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
          return (
            <g key={name}>
              <text x={cx} y={cy} textAnchor="middle" fontSize="6.4" fontWeight="600" fill="#0f172a" opacity="0.85">
                {name}
              </text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fontWeight="700" fill="#0f172a">
                {values[name] ?? 0}
              </text>
            </g>
          );
        })}
      {pins?.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={(p.size ?? 4) + 4} fill={p.color} opacity="0.22" />
          <circle cx={p.x} cy={p.y} r={p.size ?? 4} fill={p.color} stroke="#fff" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5 text-[11.5px] text-muted">
          <span style={{ width: 10, height: 10, borderRadius: 3, background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
