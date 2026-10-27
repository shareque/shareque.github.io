// Interactive developer avatar: head tilts and eyes follow the cursor.
export function DevAvatar({ x, y }: { x: number; y: number }) {
  const dx = (x - 50) / 50; // -1..1
  const dy = (y - 50) / 50;
  const eye = {
    transform: `translate(${dx * 5}px, ${dy * 4}px)`,
    transition: "transform .15s ease-out",
  };

  return (
    <div className="relative h-[440px] w-[400px] select-none">
      <div className="spin-slow absolute inset-6 rounded-full border border-dashed border-primary/40" />
      <div className="bg-signature absolute inset-16 rounded-full opacity-25 blur-3xl" />
      {[".NET", "Angular", "SQL", "AI"].map((t, i) => (
        <span
          key={t}
          className="glass float-slow absolute rounded-full px-3 py-1 font-mono text-xs text-primary"
          style={{
            left: ["0%", "78%", "4%", "80%"][i],
            top: ["18%", "12%", "70%", "66%"][i],
            animationDelay: `${-i * 2}s`,
          }}
        >
          {t}
        </span>
      ))}
      <svg viewBox="0 0 400 440" className="relative h-full w-full">
        {/* body */}
        <path
          d="M80 440 C80 340 130 310 200 310 C270 310 320 340 320 440Z"
          fill="var(--avatar-shirt)"
        />
        <path d="M170 312 L200 350 L230 312Z" fill="var(--avatar-skin)" />
        {/* head group */}
        <g
          style={{
            transform: `translate(${dx * 10}px, ${dy * 6}px) rotate(${dx * 6}deg)`,
            transformOrigin: "200px 300px",
            transition: "transform .25s ease-out",
          }}
        >
          <rect x="180" y="250" width="40" height="70" rx="16" fill="var(--avatar-skin)" />
          <ellipse cx="200" cy="190" rx="88" ry="98" fill="var(--avatar-skin)" />
          <ellipse cx="112" cy="200" rx="14" ry="20" fill="var(--avatar-skin)" />
          <ellipse cx="288" cy="200" rx="14" ry="20" fill="var(--avatar-skin)" />
          {/* hair */}
          <path
            d="M108 180 C100 90 160 70 210 78 C270 80 305 120 294 182 C285 140 250 120 210 128 C170 134 130 130 108 180Z"
            fill="var(--avatar-hair)"
          />
          {/* beard */}
          <path
            d="M120 215 C125 290 170 292 200 292 C230 292 275 290 280 215 C268 250 240 262 200 262 C160 262 132 250 120 215Z"
            fill="var(--avatar-hair)"
          />
          {/* brows */}
          <rect x="140" y={148 + dy * 2} width="44" height="8" rx="4" fill="var(--avatar-hair)" />
          <rect x="216" y={148 + dy * 2} width="44" height="8" rx="4" fill="var(--avatar-hair)" />
          {/* eyes */}
          <g className="blink" style={{ transformOrigin: "200px 185px" }}>
            <ellipse cx="162" cy="185" rx="18" ry="20" fill="var(--avatar-eye)" />
            <ellipse cx="238" cy="185" rx="18" ry="20" fill="var(--avatar-eye)" />
            <g style={eye}>
              <circle cx="162" cy="187" r="9" fill="var(--avatar-pupil)" />
              <circle cx="238" cy="187" r="9" fill="var(--avatar-pupil)" />
              <circle cx="165" cy="183" r="3" fill="var(--avatar-eye)" />
              <circle cx="241" cy="183" r="3" fill="var(--avatar-eye)" />
            </g>
          </g>
          {/* glasses */}
          <g fill="none" stroke="var(--primary)" strokeWidth="5">
            <rect x="134" y="160" width="56" height="50" rx="16" />
            <rect x="210" y="160" width="56" height="50" rx="16" />
            <path d="M190 182 L210 182" />
          </g>
          {/* mouth */}
          <path
            d="M180 238 Q200 254 220 238"
            stroke="var(--avatar-pupil)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* headphones */}
          <path
            d="M100 190 C95 70 305 70 300 190"
            stroke="var(--accent)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="86" y="175" width="26" height="54" rx="12" fill="var(--accent)" />
          <rect x="288" y="175" width="26" height="54" rx="12" fill="var(--accent)" />
        </g>
        {/* laptop */}
        <path
          d="M110 380 L290 380 L310 440 L90 440Z"
          fill="var(--secondary)"
          stroke="var(--border)"
        />
        <circle cx="200" cy="410" r="8" fill="var(--primary)" className="animate-pulse" />
      </svg>
    </div>
  );
}
