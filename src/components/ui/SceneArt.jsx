/**
 * SceneArt — maritime SVG illustration
 *
 * §10/§12 accessibility:
 *  - Decorative SVGs use role="img" with a meaningful aria-label,
 *    or aria-hidden="true" when the context conveys the meaning.
 *  - Real photos use a meaningful alt string passed by the parent.
 *  - All animated elements respect prefers-reduced-motion via CSS.
 *
 * Variants:
 *   'hero-bg'  — cinematic full-viewport scene (hero background)
 *   'port'     — vessel at quay (default, used in content cards)
 *   'intro'    — vessel at sea (used in about section)
 */
export default function SceneArt({
  variant = 'port',
  src,
  alt = '',
  className = '',
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  /* ─── hero-bg: cinematic wide scene ─────────────────────────────────── */
  if (variant === 'hero-bg') {
    return (
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={alt || 'Cinematic maritime scene — ocean at dusk with container vessels'}
        className={`h-full w-full ${className}`}
      >
        <defs>
          {/* deep dusk sky */}
          <linearGradient id="hb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#020E1C" />
            <stop offset="40%" stopColor="#071B33" />
            <stop offset="75%" stopColor="#0B3359" />
            <stop offset="100%" stopColor="#0D5080" />
          </linearGradient>
          {/* deep ocean */}
          <linearGradient id="hb-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0A4A78" />
            <stop offset="50%" stopColor="#071B33" />
            <stop offset="100%" stopColor="#020A14" />
          </linearGradient>
          {/* moon / sun glow */}
          <radialGradient id="hb-glow" cx="68%" cy="22%" r="30%">
            <stop offset="0%"  stopColor="#38BDF8" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#087FC1" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#071B33" stopOpacity="0" />
          </radialGradient>
          {/* horizon shimmer */}
          <radialGradient id="hb-horizon" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
            <stop offset="0%"  stopColor="#0D6BAA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#071B33" stopOpacity="0" />
          </radialGradient>
          {/* wave mask */}
          <linearGradient id="hb-wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="white" stopOpacity="0.0" />
            <stop offset="10%" stopColor="white" stopOpacity="1.0" />
            <stop offset="90%" stopColor="white" stopOpacity="1.0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.0" />
          </linearGradient>
          <mask id="hb-wave-mask">
            <rect width="2880" height="900" fill="url(#hb-wave-fade)" />
          </mask>
        </defs>

        {/* ── sky ── */}
        <rect width="1440" height="900" fill="url(#hb-sky)" />

        {/* ── moon/sun atmospheric glow ── */}
        <rect width="1440" height="900" fill="url(#hb-glow)" />

        {/* ── stars ── */}
        {[
          [120,55],[210,30],[380,18],[560,70],[700,25],[850,48],[980,15],[1100,40],
          [1230,62],[1320,28],[1380,78],[60,85],[440,92],[800,10],[1050,80],[290,44],
          [640,33],[940,58],[1170,20],[1400,50],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.5 : 1} fill="#E0F2FE" opacity={0.4 + (i % 5) * 0.1} />
        ))}

        {/* ── moon ── */}
        <circle cx="980" cy="120" r="42" fill="#D1EAF8" opacity="0.90" />
        <circle cx="995" cy="108" r="38" fill="#0B3359" opacity="0.85" />
        {/* moon glow rings */}
        <circle cx="980" cy="120" r="68" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.18" />
        <circle cx="980" cy="120" r="90" fill="none" stroke="#38BDF8" strokeWidth="0.6" opacity="0.10" />

        {/* ── horizon light reflection ── */}
        <rect x="0" y="490" width="1440" height="60" fill="url(#hb-horizon)" />

        {/* ── sea ── */}
        <rect y="490" width="1440" height="410" fill="url(#hb-sea)" />

        {/* ── moon path on water ── */}
        <ellipse cx="980" cy="600" rx="90" ry="320" fill="#38BDF8" opacity="0.05" />
        <ellipse cx="980" cy="700" rx="40" ry="200" fill="#38BDF8" opacity="0.07" />

        {/* ── distant port silhouette (left) ── */}
        <g fill="#040F1E" opacity="0.92">
          <rect x="0" y="420" width="480" height="70" />
          {/* cranes */}
          <path d="M30 420V295h8v125zM30 305h110v8H30zM130 305v48h6v-48z" />
          <path d="M100 420V285h8v135zM100 294h130v8H100zM220 294v62h6v-62z" />
          <path d="M200 420V310h7v110zM200 318h88v7H200zM280 318v44h5v-44z" />
          <path d="M310 420V330h6v90zM310 337h70v6H310z" />
          {/* container stacks on quay */}
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={18 + i * 46} y={396} width={36} height={24} />
          ))}
          {[0,1,2].map(i => (
            <rect key={i} x={64 + i * 46} y={374} width={36} height={22} />
          ))}
          {/* warehouse */}
          <rect x="340" y="385" width="120" height="35" />
          <path d="M340 385l60-25 60 25z" />
          {/* lights */}
          <circle cx="38" cy="290" r="3" fill="#FDE68A" opacity="0.8" />
          <circle cx="108" cy="280" r="3" fill="#FDE68A" opacity="0.8" />
          <circle cx="207" cy="305" r="2.5" fill="#FDE68A" opacity="0.7" />
        </g>

        {/* ── main large vessel (centre, closer) ── */}
        <g>
          {/* hull */}
          <path d="M280 530h740l-55 72H338z" fill="#E2E8F0" />
          <path d="M338 602h627l-18 20H354z" fill="#087FC1" />
          <path d="M354 622h591l-10 10H362z" fill="#065F91" />
          {/* waterline shadow */}
          <ellipse cx="650" cy="634" rx="360" ry="10" fill="#020A14" opacity="0.5" />
          {/* container rows */}
          {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
            <rect
              key={`r1-${i}`} x={310 + i * 52} y={476} width={48} height={54}
              fill={['#38BDF8','#087FC1','#E2E8F0','#0E4E7C','#38BDF8','#065F91','#E2E8F0','#087FC1','#38BDF8','#0E4E7C','#E2E8F0'][i]}
              stroke="#071B33" strokeWidth="2"
            />
          ))}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <rect
              key={`r2-${i}`} x={334 + i * 52} y={422} width={48} height={54}
              fill={['#0E4E7C','#E2E8F0','#38BDF8','#087FC1','#0E4E7C','#E2E8F0','#38BDF8','#087FC1','#0E4E7C'][i]}
              stroke="#071B33" strokeWidth="2"
            />
          ))}
          {[0,1,2,3,4,5].map(i => (
            <rect
              key={`r3-${i}`} x={380 + i * 52} y={368} width={48} height={54}
              fill={['#087FC1','#38BDF8','#0E4E7C','#E2E8F0','#087FC1','#38BDF8'][i]}
              stroke="#071B33" strokeWidth="2"
            />
          ))}
          {/* bridge superstructure */}
          <rect x="750" y="428" width="130" height="102" fill="#E2E8F0" stroke="#0B2644" strokeWidth="2" />
          <rect x="764" y="400" width="102" height="28" fill="#E2E8F0" stroke="#0B2644" strokeWidth="2" />
          <rect x="778" y="374" width="74" height="26" fill="#E2E8F0" stroke="#0B2644" strokeWidth="1.5" />
          {/* bridge windows */}
          {[0,1,2,3].map(i => (
            <rect key={i} x={762 + i * 28} y={436} width={18} height={12} fill="#38BDF8" opacity="0.7" />
          ))}
          {[0,1,2].map(i => (
            <rect key={i} x={770 + i * 28} y={406} width={16} height={10} fill="#38BDF8" opacity="0.6" />
          ))}
          {/* mast */}
          <rect x="812" y="340" width="4" height="34" fill="#0B2644" />
          <rect x="790" y="346" width="48" height="3" fill="#0B2644" />
          {/* navigation lights */}
          <circle cx="790" cy="346" r="4" fill="#FDE68A" opacity="0.9" />
          <circle cx="838" cy="346" r="4" fill="#FCA5A5" opacity="0.9" />
          <circle cx="814" cy="338" r="3" fill="#FDE68A" opacity="0.85" />
        </g>

        {/* ── small vessel far right (depth) ── */}
        <g opacity="0.65">
          <path d="M1150 510h200l-20 30h-162z" fill="#B0BEC5" />
          <path d="M1168 540h164l-8 10h-148z" fill="#546E7A" />
          {[0,1,2].map(i => (
            <rect key={i} x={1165 + i * 40} y={482} width={36} height={28} fill={['#087FC1','#E2E8F0','#38BDF8'][i]} stroke="#071B33" strokeWidth="1.5" />
          ))}
          <rect x="1310" y="486" width="36" height="54" fill="#ECEFF1" stroke="#071B33" strokeWidth="1.5" />
          <rect x="1315" y="490" width="10" height="8" fill="#38BDF8" opacity="0.7" />
        </g>

        {/* ── very distant tiny vessel (horizon, left-centre) ── */}
        <g opacity="0.38">
          <path d="M500 494h140l-12 16H512z" fill="#90A4AE" />
          <path d="M512 510h116l-6 8H518z" fill="#455A64" />
          {[0,1].map(i => (
            <rect key={i} x={515 + i * 34} y={474} width={28} height={20} fill={['#087FC1','#B0BEC5'][i]} stroke="#071B33" strokeWidth="1" />
          ))}
        </g>

        {/* ── animated wave layers ── */}
        <g className="wave-drift-slow" opacity="0.40" mask="url(#hb-wave-mask)">
          <path
            d="M0 560c80-18 160 18 240 0s160-18 240 0 160 18 240 0 160-18 240 0 160 18 240 0 160-18 240 0 160 18 240 0 160-18 240 0 160 18 240 0 160-18 240 0 160 18 240 0 160-18 240 0V700H0z"
            fill="#0A5D93"
          />
        </g>
        <g className="wave-drift" opacity="0.30" mask="url(#hb-wave-mask)">
          <path
            d="M0 610c90-14 180 14 270 0s180-14 270 0 180 14 270 0 180-14 270 0 180 14 270 0 180-14 270 0 180 14 270 0 180-14 270 0 180 14 270 0 180-14 270 0V700H0z"
            fill="#087FC1"
          />
        </g>
        <g className="wave-drift-slow" style={{ animationDuration: '55s' }} opacity="0.18">
          <path
            d="M0 648c70-10 140 10 210 0s140-10 210 0 140 10 210 0 140-10 210 0 140 10 210 0 140-10 210 0 140 10 210 0 140-10 210 0 140 10 210 0 140-10 210 0 140 10 210 0 140-10 210 0V720H0z"
            fill="#38BDF8"
          />
        </g>

        {/* ── subtle chart-grid overlay ── */}
        <g stroke="#38BDF8" strokeOpacity="0.06" strokeWidth="0.8">
          {[100,200,300,400,500,600,700,800].map(y => (
            <line key={y} x1="0" x2="1440" y1={y} y2={y} />
          ))}
          {[180,360,540,720,900,1080,1260].map(x => (
            <line key={x} y1="0" y2="490" x1={x} x2={x} />
          ))}
        </g>
      </svg>
    )
  }

  /* ─── port / intro variants (unchanged) ─────────────────────────────── */
  const id = `g-${variant}`
  return (
    <svg
      viewBox="0 0 800 560"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt || 'Illustration of a container vessel at sea'}
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B2644" />
          <stop offset="0.7" stopColor="#0E4E7C" />
          <stop offset="1" stopColor="#087FC1" />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A5D93" />
          <stop offset="1" stopColor="#071B33" />
        </linearGradient>
      </defs>

      <rect width="800" height="560" fill={`url(#${id}-sky)`} />

      {/* sun / glow */}
      <circle cx="610" cy="210" r="90" fill="#38BDF8" opacity="0.14" />
      <circle cx="610" cy="210" r="48" fill="#38BDF8" opacity="0.22" />

      {/* thin grid lines = chart / navigation feel */}
      <g stroke="#38BDF8" strokeOpacity="0.14" strokeWidth="1">
        {[80, 160, 240, 320].map((y) => (
          <line key={y} x1="0" x2="800" y1={y} y2={y} />
        ))}
        {[160, 320, 480, 640].map((x) => (
          <line key={x} y1="0" y2="340" x1={x} x2={x} />
        ))}
      </g>

      {/* distant quay with cranes */}
      <g fill="#071B33" opacity="0.85">
        <rect x="0" y="318" width="330" height="22" />
        <path d="M40 318V230h6v88zM40 238h70v6H40zM100 238v32h4v-32z" />
        <path d="M150 318V215h6v103zM150 224h90v6h-90zM230 224v38h4v-38z" />
        <path d="M270 318V245h5v73zM270 252h58v5h-58z" />
        {/* container stacks */}
        <rect x="8" y="296" width="20" height="22" />
        <rect x="58" y="300" width="22" height="18" />
        <rect x="190" y="298" width="24" height="20" />
        <rect x="296" y="302" width="22" height="16" />
      </g>

      {/* horizon */}
      <rect y="340" width="800" height="220" fill={`url(#${id}-sea)`} />

      {/* vessel */}
      <g>
        <path d="M120 372h520l-44 52H168z" fill="#F0F4F8" />
        <path d="M168 424h428l-12 14H180z" fill="#087FC1" />
        {/* containers */}
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={`a${i}`}
              x={190 + i * 38}
              y="338"
              width="34"
              height="34"
              fill={['#38BDF8', '#087FC1', '#F0F4F8', '#0E4E7C'][i % 4]}
              stroke="#071B33"
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={`b${i}`}
              x={212 + i * 38}
              y="304"
              width="34"
              height="34"
              fill={['#0E4E7C', '#F0F4F8', '#38BDF8', '#087FC1'][i % 4]}
              stroke="#071B33"
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={`c${i}`}
              x={250 + i * 38}
              y="270"
              width="34"
              height="34"
              fill={['#087FC1', '#38BDF8', '#0E4E7C', '#F0F4F8'][i % 4]}
              stroke="#071B33"
              strokeWidth="1.5"
            />
          ))}
        </g>
        {/* bridge */}
        <rect x="520" y="316" width="86" height="56" fill="#F0F4F8" stroke="#071B33" strokeWidth="1.5" />
        <rect x="534" y="296" width="58" height="20" fill="#F0F4F8" stroke="#071B33" strokeWidth="1.5" />
        <g fill="#071B33">
          <rect x="540" y="302" width="10" height="7" />
          <rect x="556" y="302" width="10" height="7" />
          <rect x="572" y="302" width="10" height="7" />
        </g>
        <rect x="560" y="276" width="3" height="20" fill="#071B33" />
      </g>

      {/* animated waves */}
      <g className="wave-drift-slow" opacity="0.55">
        <path
          d="M0 452c50-14 100 14 150 0s100-14 150 0 100 14 150 0 100-14 150 0 100 14 150 0 100-14 150 0 100 14 150 0 100-14 150 0V560H0z"
          fill="#087FC1"
          opacity="0.5"
        />
      </g>
      <g className="wave-drift">
        <path
          d="M0 486c50-12 100 12 150 0s100-12 150 0 100 12 150 0 100-12 150 0 100 12 150 0 100-12 150 0 100 12 150 0 100-12 150 0V560H0z"
          fill="#071B33"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}
