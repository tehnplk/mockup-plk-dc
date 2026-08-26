/** แผนที่ระดับตำบล/หมู่บ้าน สำหรับพื้นที่รับผิดชอบของ รพ.สต. */
export default function LocalMap({
  height = 470,
  areaLabel = "พื้นที่ควบคุมโรค ม.4 ต.บ้านคลอง",
  riverLabel = "คลองบ้านคลอง",
  compact = false,
}: {
  height?: number;
  areaLabel?: string;
  riverLabel?: string;
  compact?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 470"
      className="w-full"
      style={{ background: "#eaf0f2", height }}
      role="img"
    >
      {[
        [20, 24, 150, 110],
        [200, 16, 130, 96],
        [356, 30, 170, 118],
        [26, 168, 140, 108],
        [198, 146, 136, 128],
        [366, 178, 158, 96],
        [16, 312, 156, 120],
        [206, 306, 118, 136],
        [356, 302, 168, 130],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#dfe7ea" />
      ))}

      <path
        d="M-10 350 q90 -46 180 -10 t150 -46 t190 -30"
        stroke="#a9c7e0"
        strokeWidth="26"
        fill="none"
      />
      <text x="30" y="330" fontSize="11" fill="#5b7c95" fontStyle="italic">
        {riverLabel}
      </text>

      <path d="M186 0 V470" stroke="#fff" strokeWidth="14" />
      <path d="M344 0 V470" stroke="#fff" strokeWidth="11" />
      <path d="M0 152 H600" stroke="#fff" strokeWidth="13" />
      <path d="M0 290 H600" stroke="#fff" strokeWidth="10" />

      {/* หมู่บ้าน */}
      {!compact &&
        (
          [
            [95, 88, "ม.1"],
            [265, 76, "ม.2"],
            [440, 92, "ม.3"],
            [96, 222, "ม.4"],
            [266, 210, "ม.5"],
            [445, 226, "ม.6"],
            [94, 372, "ม.7"],
            [265, 374, "ม.8"],
            [440, 368, "ม.9"],
          ] as [number, number, string][]
        ).map(([x, y, t]) => (
          <text
            key={t}
            x={x}
            y={y}
            fontSize="11"
            fill="#94a3b8"
            fontWeight="600"
            textAnchor="middle"
          >
            {t}
          </text>
        ))}

      {/* กลุ่มก้อนการระบาด */}
      {(
        [
          [250, 210, 88, "#dc2626"],
          [430, 118, 62, "#dc2626"],
          [120, 360, 50, "#f97316"],
          [470, 350, 44, "#f59e0b"],
        ] as [number, number, number, string][]
      ).map(([x, y, r, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={c} opacity="0.13" />
          <circle cx={x} cy={y} r={r * 0.6} fill={c} opacity="0.16" />
          <circle cx={x} cy={y} r={r * 0.3} fill={c} opacity="0.2" />
        </g>
      ))}

      <circle
        cx="250"
        cy="210"
        r="96"
        fill="none"
        stroke="#dc2626"
        strokeWidth="1.6"
        strokeDasharray="8 5"
      />
      <text x="250" y="102" textAnchor="middle" fontSize="10.5" fill="#b91c1c" fontWeight="700">
        {areaLabel}
      </text>

      {(
        [
          [250, 210, 7, "#dc2626"],
          [232, 190, 5, "#dc2626"],
          [268, 232, 5, "#dc2626"],
          [214, 236, 5, "#dc2626"],
          [286, 186, 5, "#dc2626"],
          [246, 258, 5, "#dc2626"],
          [430, 118, 6, "#dc2626"],
          [412, 96, 5, "#dc2626"],
          [452, 140, 5, "#dc2626"],
          [120, 360, 5, "#f97316"],
          [140, 386, 5, "#f97316"],
          [104, 338, 5, "#f97316"],
          [470, 350, 5, "#059669"],
          [492, 372, 5, "#059669"],
          [330, 400, 5, "#2563eb"],
          [530, 210, 5, "#d97706"],
        ] as [number, number, number, string][]
      ).map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} stroke="#fff" strokeWidth="1.8" />
      ))}

      {/* แหล่งเพาะพันธุ์ */}
      {(
        [
          [270, 196],
          [228, 224],
          [438, 132],
          [128, 348],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <rect
          key={i}
          x={x - 4}
          y={y - 4}
          width="8"
          height="8"
          rx="1.6"
          fill="#0891b2"
          stroke="#fff"
          strokeWidth="1.4"
          transform={`rotate(45 ${x} ${y})`}
        />
      ))}

      <g>
        <rect x="24" y="440" width="80" height="4" fill="#0f172a" opacity=".7" />
        <text x="24" y="434" fontSize="10" fill="#334155">
          0 — 500 ม.
        </text>
      </g>
      <g transform="translate(556,44)">
        <path d="M0 -18 L7 10 L0 4 L-7 10Z" fill="#334155" />
        <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">
          N
        </text>
      </g>
    </svg>
  );
}
