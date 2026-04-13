import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  Phone,
  MapPin,
  Download,
  Send,
  Twitter,
  Instagram,
  Zap,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ══ HOOKS ══ */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const useTypewriter = (texts) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [ch, setCh] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    const t = setTimeout(
      () => {
        if (!del) {
          setDisplay(cur.slice(0, ch + 1));
          if (ch + 1 === cur.length) setTimeout(() => setDel(true), 2000);
          else setCh((c) => c + 1);
        } else {
          setDisplay(cur.slice(0, ch - 1));
          if (ch - 1 === 0) {
            setDel(false);
            setIdx((i) => (i + 1) % texts.length);
            setCh(0);
          } else setCh((c) => c - 1);
        }
      },
      del ? 45 : 90,
    );
    return () => clearTimeout(t);
  }, [ch, del, idx, texts]);
  return display;
};

const useCounter = (target, visible) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const n = parseInt(target);
    let s = 0;
    const iv = setInterval(() => {
      s += n / 90;
      if (s >= n) {
        setVal(n);
        clearInterval(iv);
      } else setVal(Math.floor(s));
    }, 18);
    return () => clearInterval(iv);
  }, [visible, target]);
  return val;
};

/* ══ PARTICLES ══ */
const Particles = ({ c1, c2 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.5 + 0.15,
      col: Math.random() > 0.5 ? c1 : c2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.col +
          Math.round(p.o * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });
      pts.forEach((a, i) =>
        pts.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x,
            dy = a.y - b.y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle =
              c1 +
              Math.round(0.18 * (1 - d / 120) * 255)
                .toString(16)
                .padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }),
      );
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [c1, c2]);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

/* ══ PROJECT SLIDER ══ */
const ProjectSlider = ({ projects, dark, c, fgMuted, fg, border, bgCard }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [shown, setShown] = useState(0);
  const total = projects.length;

  const go = useCallback(
    (next) => {
      if (animating || next === active) return;
      setDir(next > active ? 1 : -1);
      setAnimating(true);
      setTimeout(() => {
        setShown(next);
        setActive(next);
        setAnimating(false);
      }, 400);
    },
    [active, animating],
  );

  useEffect(() => {
    const iv = setInterval(() => go((active + 1) % total), 5000);
    return () => clearInterval(iv);
  }, [active, go, total]);

  const p = projects[shown];

  return (
    <div>
      <div
        style={{ overflow: "hidden", borderRadius: 20, position: "relative" }}
      >
        <div
          key={shown}
          style={{
            animation: animating
              ? `proj-out-${dir > 0 ? "l" : "r"} .4s cubic-bezier(.4,0,.2,1) forwards`
              : `proj-in-${dir > 0 ? "r" : "l"} .5s cubic-bezier(.16,1,.3,1) both`,
            background: bgCard,
            border: `1px solid ${p.color}35`,
            borderRadius: 20,
            padding: "40px 44px",
            minHeight: 340,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -70,
              right: -70,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: p.color,
              opacity: 0.06,
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              background: `linear-gradient(180deg,${p.color},transparent)`,
              borderRadius: "20px 0 0 20px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontSize: "2.8rem",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,.3))",
                display: "block",
              }}
            >
              {p.emoji}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: ".65rem",
                  fontWeight: 700,
                  color: p.color,
                  background: p.color + "15",
                  border: `1px solid ${p.color}30`,
                  borderRadius: 6,
                  padding: "4px 12px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                {p.cat}
              </span>
              <span
                style={{
                  fontFamily: "'Outfit',monospace",
                  fontSize: ".68rem",
                  color: fgMuted,
                }}
              >
                0{shown + 1} / 0{total}
              </span>
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem,3vw,2rem)",
              color: p.color,
              marginBottom: 10,
              letterSpacing: "-.02em",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              color: fgMuted,
              fontSize: ".92rem",
              lineHeight: 1.8,
              marginBottom: 20,
              maxWidth: 560,
            }}
          >
            {p.desc}
          </p>
          <div style={{ marginBottom: 24 }}>
            {p.tech.map((t, j) => (
              <span
                key={j}
                style={{
                  display: "inline-block",
                  margin: "3px",
                  padding: "5px 14px",
                  borderRadius: 100,
                  fontSize: ".73rem",
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 600,
                  background: p.color + "12",
                  border: `1px solid ${p.color}28`,
                  color: p.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#fff",
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: ".82rem",
                textDecoration: "none",
                background: p.color,
                padding: "10px 22px",
                borderRadius: 10,
                transition: "all .3s",
              }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={p.code}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: p.color,
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: ".82rem",
                textDecoration: "none",
                border: `1.5px solid ${p.color}`,
                padding: "10px 22px",
                borderRadius: 10,
                transition: "all .3s",
              }}
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 22,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: active === i ? 32 : 8,
                height: 8,
                borderRadius: 100,
                border: "none",
                background:
                  active === i
                    ? c.p
                    : dark
                      ? "rgba(255,255,255,.2)"
                      : "rgba(0,0,0,.15)",
                transition: "all .45s cubic-bezier(.16,1,.3,1)",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            {
              fn: () => go((active - 1 + total) % total),
              icon: <ChevronLeft size={18} />,
            },
            {
              fn: () => go((active + 1) % total),
              icon: <ChevronRight size={18} />,
            },
          ].map((b, i) => (
            <button
              key={i}
              onClick={b.fn}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `1.5px solid ${border}`,
                background: "transparent",
                color: fg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all .3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.p;
                e.currentTarget.style.color = c.p;
                e.currentTarget.style.background = c.p + "18";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.color = fg;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail row */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {projects.map((pr, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              flex: "0 0 auto",
              padding: "9px 16px",
              borderRadius: 10,
              border: `1.5px solid ${active === i ? pr.color : border}`,
              background: active === i ? pr.color + "10" : "transparent",
              cursor: "pointer",
              transition: "all .3s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: "1.05rem" }}>{pr.emoji}</span>
            <span
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                color: active === i ? pr.color : fgMuted,
                whiteSpace: "nowrap",
              }}
            >
              {pr.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ══ POWERPOINT-STYLE REVEAL WRAPPERS ══ */
const FromLeft = ({ children, v, d = 0, s = {} }) => (
  <div
    style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateX(0)" : "translateX(-80px)",
      transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${d}s, transform .75s cubic-bezier(.16,1,.3,1) ${d}s`,
      ...s,
    }}
  >
    {children}
  </div>
);
const FromRight = ({ children, v, d = 0, s = {} }) => (
  <div
    style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateX(0)" : "translateX(80px)",
      transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${d}s, transform .75s cubic-bezier(.16,1,.3,1) ${d}s`,
      ...s,
    }}
  >
    {children}
  </div>
);
const FromBottom = ({ children, v, d = 0, s = {} }) => (
  <div
    style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0) scale(1)" : "translateY(50px) scale(.97)",
      transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${d}s, transform .75s cubic-bezier(.16,1,.3,1) ${d}s`,
      ...s,
    }}
  >
    {children}
  </div>
);
const FadeIn = ({ children, v, d = 0, s = {} }) => (
  <div
    style={{ opacity: v ? 1 : 0, transition: `opacity .85s ease ${d}s`, ...s }}
  >
    {children}
  </div>
);

/* ══════════════════ MAIN ══════════════════ */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [scheme, setScheme] = useState("cyan");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const typed = useTypewriter([
    "Full Stack Developer",
    "Laravel Expert",
    "React Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ]);

  const schemes = {
    cyan: {
      p: "#00bcd4",
      s: "#0097a7",
      a: "#ff6b6b",
      g: "rgba(0,188,212,.22)",
    },
    violet: {
      p: "#7c3aed",
      s: "#a78bfa",
      a: "#f59e0b",
      g: "rgba(124,58,237,.22)",
    },
    emerald: {
      p: "#059669",
      s: "#34d399",
      a: "#f43f5e",
      g: "rgba(5,150,105,.22)",
    },
    rose: {
      p: "#e11d48",
      s: "#fb7185",
      a: "#38bdf8",
      g: "rgba(225,29,72,.22)",
    },
    amber: {
      p: "#d97706",
      s: "#fbbf24",
      a: "#06b6d4",
      g: "rgba(217,119,6,.22)",
    },
    indigo: {
      p: "#4f46e5",
      s: "#818cf8",
      a: "#ec4899",
      g: "rgba(79,70,229,.22)",
    },
  };
  const c = schemes[scheme];

  /* Color-aware tokens — light theme now truly uses dark text / bg */
  const bg = dark ? "#0a0a12" : "#f4f4f8";
  const bgCard = dark ? "rgba(255,255,255,.04)" : "#ffffff";
  const bgCard2 = dark ? "rgba(255,255,255,.025)" : "#ebebf2";
  const fg = dark ? "#e8e8f0" : "#0d0d1e";
  const fgMuted = dark ? "rgba(232,232,240,.48)" : "rgba(13,13,30,.52)";
  const border = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.1)";
  const navBg = dark ? "rgba(10,10,18,.92)" : "rgba(244,244,248,.94)";

  useEffect(() => {
    const l = document.createElement("link");
    l.href =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css";
    l.rel = "stylesheet";
    document.head.appendChild(l);
    const s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js";
    s.async = true;
    document.body.appendChild(s);
    const fa = document.createElement("link");
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    fa.rel = "stylesheet";
    document.head.appendChild(fa);
    return () => {
      try {
        document.head.removeChild(l);
        document.head.removeChild(fa);
        document.body.removeChild(s);
      } catch {}
    };
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Name: ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/9779849088855?text=${msg}`, "_blank");
    setForm({ name: "", email: "", message: "" });
  };

  /* DATA */
  const projects = [
    {
      title: "AI Chess Game",
      desc: "Advanced chess with Minimax + Alpha-Beta pruning AI. Multiple difficulty levels with polished UI.",
      tech: ["Python", "AI", "Minimax", "Pygame"],
      cat: "ai",
      demo: "https://drive.usercontent.google.com/download?id=1U1pbtBod_hLhur5ossve0PrCHlZXY7Eg",
      code: "https://github.com/FrozenXt/AI-BASED-CHESS-GAME",
      emoji: "♟️",
      color: "#7c3aed",
    },
    {
      title: "Online Report Sharing",
      desc: "Secure platform for creating, sharing and collaborating on reports with role-based access control.",
      tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      cat: "fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/online-report-sharing-system",
      emoji: "📄",
      color: "#00bcd4",
    },
    {
      title: "SGPA Calculator",
      desc: "Semester GPA calculator with performance analytics, grade trends and export features.",
      tech: ["HTML/CSS", "JavaScript", "Python"],
      cat: "web",
      demo: "#",
      code: "#",
      emoji: "🎓",
      color: "#059669",
    },
    {
      title: "E-Commerce Website",
      desc: "Full-featured store with product catalog, smart cart, payment gateway integration & admin dashboard.",
      tech: ["Laravel", "MySQL", "JavaScript", "Stripe"],
      cat: "fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/E-commerce-website-using-laravel",
      emoji: "🛒",
      color: "#e11d48",
    },
    {
      title: "School Website",
      desc: "Responsive school website with application forms, event calendar, news board & complete admin panel.",
      tech: ["Laravel", "SQL", "Alpine.js", "Bootstrap"],
      cat: "fullstack",
      demo: "https://schoolwebsite-production-444f.up.railway.app/",
      code: "https://github.com/FrozenXt/School_website",
      emoji: "🏫",
      color: "#d97706",
    },
    {
      title: "Restaurant Website",
      desc: "US-based restaurant site with online ordering, table reservation system & loyalty programme.",
      tech: ["Laravel", "Alpine.js", "MySQL", "Tailwind"],
      cat: "fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/the-lighthouse-cafe.git",
      emoji: "🍽️",
      color: "#4f46e5",
    },
  ];

  const skills = [
    { name: "HTML5", icon: "fab fa-html5", pct: 95, color: "#e34f26" },
    { name: "CSS3", icon: "fab fa-css3-alt", pct: 90, color: "#264de4" },
    { name: "JavaScript", icon: "fab fa-js", pct: 85, color: "#f7df1e" },
    { name: "React", icon: "fab fa-react", pct: 70, color: "#61dafb" },
    { name: "Python", icon: "fab fa-python", pct: 70, color: "#3776ab" },
    { name: "Laravel", icon: "fab fa-laravel", pct: 90, color: "#ff2d20" },
    { name: "MySQL", icon: "fas fa-database", pct: 80, color: "#4479a1" },
    { name: "Git / QA", icon: "fab fa-git-alt", pct: 75, color: "#f05032" },
  ];

  const education = [
    {
      degree: "Bachelor in Computer Applications",
      school: "Chandigarh University",
      location: "Punjab, India",
      year: "Ongoing",
      grade: "8.5 CGPA",
      icon: "🎓",
      color: c.p,
    },
    {
      degree: "12th Grade ( Computer Science)",
      school: "Lympia National College",
      location: "Nayabasti, Nepal",
      year: "2022",
      grade: "GPA 3.37",
      icon: "📚",
      color: "#059669",
    },
    {
      degree: "10th Grade (SEE)",
      school: "Ambassador Academy",
      location: "Nepal",
      year: "2020",
      grade: "GPA 3.80",
      icon: "🏫",
      color: "#7c3aed",
    },
  ];

  const experiences = [
    {
      role: "Laravel Developer",
      company: "Bentray Technology",
      location: "Chakupat, Lalitpur, Nepal",
      period: "March 2026 – Present",
      type: "Full Time",
      current: true,
      color: c.p,
      icon: "💻",
      bullets: [
        "Building scalable web apps with Laravel & PHP",
        "REST API design, database architecture & optimization",
        "Blade and Alpine.js frontend integration & real-time features",
        "Code review, CI/CD pipelines & cloud deployment",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "SkillCraft Technology",
      location: "Mumbai, India",
      period: "April 2025 · 1 Month",
      type: "Internship",
      current: false,
      color: "#059669",
      icon: "🚀",
      bullets: [
        "Developed responsive UI components with HTML/CSS/JS",
        "Collaborated on client projects with senior devs",
        "Implemented RESTful API integrations",
        "Agile sprint reviews & standup participation",
      ],
    },
  ];

  const stats = [
    { n: "10", s: "", l: "Projects", icon: "💼" },
    { n: "20", s: "+", l: "Happy Clients", icon: "😊" },
    { n: "1", s: "+", l: "Years Exp", icon: "⚡" },
    { n: "15", s: "", l: "Technologies", icon: "🛠️" },
  ];

  const [heroRef, heroV] = useInView(0.05);
  const [statsRef, statsV] = useInView(0.2);
  const [skillRef, skillV] = useInView(0.15);
  const [expRef, expV] = useInView(0.1);
  const [eduRef, eduV] = useInView(0.1);
  const [projRef, projV] = useInView(0.1);
  const [contactRef, contactV] = useInView(0.1);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  const c0 = useCounter("10", statsV),
    c1 = useCounter("20", statsV),
    c2 = useCounter("1", statsV),
    c3 = useCounter("15", statsV);
  const cnts = [c0, c1, c2, c3];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
    :root{--p:${c.p};--s:${c.s};--a:${c.a};--g:${c.g};}
    html{scroll-behavior:smooth;}
    *,*::before,*::after{box-sizing:border-box;}
    body{font-family:'Outfit',sans-serif!important;overflow-x:hidden;}

    /* ORBS */
    .orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0;}
    .orb1{width:480px;height:480px;background:var(--p);opacity:.06;top:-180px;left:-180px;animation:opulse 10s ease-in-out infinite;}
    .orb2{width:380px;height:380px;background:var(--a);opacity:.055;bottom:-140px;right:-140px;animation:opulse 13s ease-in-out infinite reverse;}
    .orb3{width:280px;height:280px;background:var(--s);opacity:.04;top:40%;left:45%;animation:opulse 8s ease-in-out infinite 3s;}
    @keyframes opulse{0%,100%{transform:scale(1) translate(0,0)}33%{transform:scale(1.15) translate(30px,-25px)}66%{transform:scale(.92) translate(-15px,30px)}}

    /* GRID */
    .grid-ov{position:absolute;inset:0;pointer-events:none;z-index:0;
      background-image:linear-gradient(${dark ? "rgba(255,255,255,.022)" : "rgba(0,0,0,.028)"} 1px,transparent 1px),
        linear-gradient(90deg,${dark ? "rgba(255,255,255,.022)" : "rgba(0,0,0,.028)"} 1px,transparent 1px);
      background-size:56px 56px;}

    /* NAVBAR */
    .nav-w{backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid ${border};transition:all .3s;}
    .nlnk{font-family:'Outfit',sans-serif!important;font-weight:600;font-size:.82rem;letter-spacing:.04em;
      color:${fgMuted}!important;transition:color .25s;padding:6px 4px!important;position:relative;margin:0 10px;cursor:pointer;text-decoration:none;}
    .nlnk::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--p);border-radius:1px;transition:width .3s;}
    .nlnk:hover{color:var(--p)!important;}
    .nlnk:hover::after{width:100%;}

    /* GRADIENT TEXT */
    .gt{background:linear-gradient(135deg,var(--p),var(--s),var(--a));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200%;animation:gs 5s ease infinite;}
    @keyframes gs{0%,100%{background-position:0%}50%{background-position:100%}}

    /* GLITCH */
    .glitch{position:relative;display:inline-block;}
    .glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;}
    .glitch::before{animation:gb 4s infinite;color:var(--a);clip-path:polygon(0 25%,100% 25%,100% 50%,0 50%);transform:translateX(-3px);}
    .glitch::after{animation:ga 4s infinite .12s;color:var(--p);clip-path:polygon(0 65%,100% 65%,100% 85%,0 85%);transform:translateX(3px);}
    @keyframes gb{0%,88%,92%,100%{opacity:0;transform:translateX(-3px)}89%,91%{opacity:.9;transform:translateX(-3px) skewX(-10deg)}}
    @keyframes ga{0%,86%,94%,100%{opacity:0;transform:translateX(3px)}87%,93%{opacity:.9;transform:translateX(3px) skewX(8deg)}}

    /* PROJECT SLIDER ANIMATIONS */
    @keyframes proj-in-r  {from{opacity:0;transform:translateX(70px)}to{opacity:1;transform:translateX(0)}}
    @keyframes proj-in-l  {from{opacity:0;transform:translateX(-70px)}to{opacity:1;transform:translateX(0)}}
    @keyframes proj-out-l {from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-70px)}}
    @keyframes proj-out-r {from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(70px)}}

    /* BUTTONS */
    .btn-p{background:var(--p);border:2px solid var(--p);color:#fff;padding:13px 30px;border-radius:10px;
      font-family:'Outfit',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:.04em;
      cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
    .btn-p:hover{transform:translateY(-3px);box-shadow:0 14px 36px var(--g);filter:brightness(1.1);}
    .btn-o{background:transparent;border:2px solid var(--p);color:var(--p);padding:13px 30px;border-radius:10px;
      font-family:'Outfit',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:.04em;
      cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;gap:8px;}
    .btn-o:hover{background:var(--p);color:#fff;transform:translateY(-3px);box-shadow:0 14px 36px var(--g);}

    /* PROFILE */
    .pfloat{animation:pflt 6s ease-in-out infinite;}
    @keyframes pflt{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-14px) rotate(.4deg)}}
    .pc{position:absolute;width:44px;height:44px;}
    .pc-tl{top:-6px;left:-6px;border-top:2px solid var(--p);border-left:2px solid var(--p);border-radius:4px 0 0 0;}
    .pc-tr{top:-6px;right:-6px;border-top:2px solid var(--p);border-right:2px solid var(--p);border-radius:0 4px 0 0;}
    .pc-bl{bottom:-6px;left:-6px;border-bottom:2px solid var(--p);border-left:2px solid var(--p);border-radius:0 0 0 4px;}
    .pc-br{bottom:-6px;right:-6px;border-bottom:2px solid var(--p);border-right:2px solid var(--p);border-radius:0 0 4px 0;}

    /* BADGE FLOAT */
    .bfl{position:absolute;background:${bgCard};border-radius:10px;padding:8px 14px;
      font-size:.72rem;font-family:'Outfit',sans-serif;font-weight:700;white-space:nowrap;
      box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:10;}
    @keyframes bf1{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px) translateX(3px)}}
    @keyframes bf2{0%,100%{transform:translateY(-4px)}50%{transform:translateY(4px) translateX(-2px)}}

    /* STAT CARD */
    .stc{background:${bgCard};border:1px solid ${border};border-radius:16px;padding:28px 20px;text-align:center;
      transition:all .4s;position:relative;overflow:hidden;}
    .stc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
      background:linear-gradient(90deg,transparent,var(--p),transparent);opacity:0;transition:opacity .4s;}
    .stc:hover{transform:translateY(-8px);border-color:var(--p);box-shadow:0 20px 48px var(--g);}
    .stc:hover::before{opacity:1;}

    /* SKILL CARD */
    .skc{background:${bgCard};border:1px solid ${border};border-radius:14px;padding:24px 18px;text-align:center;
      transition:all .45s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden;}
    .skc::before{content:'';position:absolute;inset:0;opacity:0;
      background:radial-gradient(circle at 50% -10%,var(--p),transparent 65%);transition:opacity .4s;}
    .skc:hover{transform:translateY(-12px) scale(1.04);border-color:var(--p);box-shadow:0 24px 48px var(--g);}
    .skc:hover::before{opacity:.07;}
    .skbar{height:4px;background:${dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.09)"};border-radius:2px;overflow:hidden;margin-top:12px;}
    .skfill{height:100%;border-radius:2px;width:0;transition:width 1.6s cubic-bezier(.4,0,.2,1);}
    .sk-active .skfill{width:var(--tw)!important;}

    /* EXP */
    .expc{background:${bgCard};border:1px solid ${border};border-radius:14px;padding:28px;flex:1;
      transition:all .4s;position:relative;overflow:hidden;}
    .expc::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
      background:var(--ec);opacity:0;transition:opacity .4s;}
    .expc:hover{border-color:var(--ec);box-shadow:0 12px 40px var(--g);}
    .expc:hover::before{opacity:1;}
    .edot{width:44px;height:44px;border-radius:50%;border:2px solid var(--ec);background:${bgCard2};
      display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;
      animation:dpulse 3s ease-in-out infinite;}
    @keyframes dpulse{0%,100%{box-shadow:0 0 12px var(--ec)}50%{box-shadow:0 0 28px var(--ec),0 0 50px var(--ec)}}

    /* EDU CARD */
    .educ{background:${bgCard};border:1px solid ${border};border-radius:16px;padding:28px;
      transition:all .45s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;}
    .educ::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ec);opacity:0;transition:opacity .4s;}
    .educ:hover{transform:translateY(-10px);border-color:var(--ec);box-shadow:0 28px 56px var(--g);}
    .educ:hover::after{opacity:1;}
    .edem{font-size:2.2rem;display:block;margin-bottom:12px;transition:transform .4s;}
    .educ:hover .edem{transform:scale(1.2) rotate(-8deg);}

    /* CONTACT */
    .cin{background:${dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"};border:1px solid ${border};
      color:${fg};padding:15px 18px;border-radius:10px;width:100%;font-family:'Outfit',sans-serif;font-size:.92rem;transition:all .3s;}
    .cin:focus{background:${dark ? "rgba(255,255,255,.06)" : "#fff"};border-color:var(--p);outline:none;box-shadow:0 0 0 3px var(--g);}
    .cin::placeholder{color:${fgMuted};}
    .cc{background:${bgCard};border:1px solid ${border};border-radius:14px;padding:24px;
      text-align:center;text-decoration:none;display:block;transition:all .4s;color:${fg};}
    .cc:hover{transform:translateY(-8px);border-color:var(--p);box-shadow:0 20px 40px var(--g);}

    /* SOC */
    .soc{width:44px;height:44px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;
      background:${dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)"};border:1px solid ${border};
      color:${fgMuted};transition:all .3s;text-decoration:none;}
    .soc:hover{background:var(--p);border-color:var(--p);color:#fff;transform:translateY(-4px) scale(1.1);box-shadow:0 8px 24px var(--g);}

    /* PICKER */
    .picker{position:fixed;top:50%;right:0;transform:translateY(-50%);
      background:${dark ? "rgba(10,10,18,.95)" : "rgba(244,244,248,.96)"};
      backdrop-filter:blur(12px);border:1px solid ${border};border-right:none;
      border-radius:12px 0 0 12px;padding:12px 8px;z-index:9998;
      display:flex;flex-direction:column;gap:8px;align-items:center;}
    .sw{width:26px;height:26px;border-radius:50%;cursor:pointer;transition:transform .25s;border:2.5px solid transparent;}
    .sw:hover{transform:scale(1.3);}
    .sw.act{transform:scale(1.35);border-color:${dark ? "#fff" : "#111"};box-shadow:0 0 12px var(--p);}

    /* SECTION HEADERS */
    .stag{font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:600;color:var(--p);
      letter-spacing:.22em;text-transform:uppercase;display:block;margin-bottom:10px;opacity:.75;}
    .sh{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(2rem,4vw,2.8rem);
      font-weight:800;letter-spacing:-.03em;line-height:1.1;color:${fg};}
    .srl{width:52px;height:3px;background:linear-gradient(90deg,var(--p),var(--a));border-radius:2px;margin:14px 0 44px;}

    /* HERO */
    .hname{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(3rem,8vw,6.5rem);
      font-weight:800;line-height:.95;letter-spacing:-.04em;}
    .hsub{font-family:'Outfit',sans-serif;font-size:1.05rem;font-weight:600;color:var(--p);
      min-height:36px;display:flex;align-items:center;gap:8px;margin-bottom:20px;}
    .cblink{width:2px;height:20px;background:var(--p);display:inline-block;animation:blink 1s step-end infinite;}
    @keyframes blink{50%{opacity:0}}

    /* SCROLL */
    .sline{width:1px;height:56px;background:linear-gradient(180deg,var(--p),transparent);margin:0 auto;animation:slp 2s ease-in-out infinite;}
    @keyframes slp{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.4;transform:scaleY(.7) translateY(8px)}}

    /* NOISE */
    .noise{position:fixed;inset:0;opacity:.02;pointer-events:none;z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:${bg};}
    ::-webkit-scrollbar-thumb{background:var(--p);border-radius:2px;}
    @media(max-width:768px){.bfl{display:none;}}
  `;

  return (
    <div
      style={{
        background: bg,
        color: fg,
        minHeight: "100vh",
        overflowX: "hidden",
        fontFamily: "'Outfit',sans-serif",
        position: "relative",
      }}
    >
      <style>{css}</style>
      <div className="noise" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* COLOR PICKER */}
      <div className="picker">
        {Object.entries(schemes).map(([k, v]) => (
          <div
            key={k}
            className={`sw ${scheme === k ? "act" : ""}`}
            style={{ background: `linear-gradient(135deg,${v.p},${v.s})` }}
            onClick={() => setScheme(k)}
            title={k}
          />
        ))}
      </div>

      {/* ══ NAVBAR ══ */}
      <nav
        className="fixed-top nav-w"
        style={{ background: navBg, zIndex: 9000 }}
      >
        <div className="container d-flex align-items-center justify-content-between py-3">
          <div
            style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
            }}
          >
            <span className="gt">Sujal</span>
            <span style={{ color: c.p }}>.</span>
          </div>
          <div className="d-flex align-items-center flex-wrap">
            {[
              "home",
              "skills",
              "experience",
              "education",
              "projects",
              "contact",
            ].map((id) => (
              <a
                key={id}
                className="nlnk"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
                href={`#${id}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              style={{
                background: dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)",
                border: `1px solid ${border}`,
                borderRadius: 8,
                padding: "8px 10px",
                color: fg,
                marginLeft: 14,
                cursor: "pointer",
                transition: "all .3s",
              }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="grid-ov" />
        <Particles c1={c.p} c2={c.a} />
        <div
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontSize: "clamp(140px,22vw,280px)",
            fontWeight: 900,
            color: dark ? "rgba(255,255,255,.018)" : "rgba(0,0,0,.035)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          DEV
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <FromLeft v={heroV} d={0.05}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: c.p + "18",
                    border: `1px solid ${c.p}35`,
                    borderRadius: 8,
                    padding: "6px 16px",
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 600,
                    fontSize: ".72rem",
                    color: c.p,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e",
                      animation: "opulse 2s ease-in-out infinite",
                      display: "inline-block",
                    }}
                  />
                  Available for hire
                </span>
              </FromLeft>
              <FromLeft v={heroV} d={0.15}>
                <h1 className="hname" style={{ color: fg, marginBottom: 10 }}>
                  Hi, I'm
                  <br />
                  <span className="glitch gt" data-text="Sujal">
                    Sujal
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "clamp(1.8rem,4.5vw,3.8rem)",
                      color: fg,
                    }}
                  >
                    Lamichhane
                  </span>
                </h1>
              </FromLeft>
              <FromLeft v={heroV} d={0.25}>
                <div className="hsub">
                  <span style={{ opacity: 0.5 }}>_</span>
                  <span>{typed}</span>
                  <span className="cblink" />
                </div>
              </FromLeft>
              <FromLeft v={heroV} d={0.35}>
                <p
                  style={{
                    color: fgMuted,
                    lineHeight: 1.85,
                    maxWidth: 480,
                    fontSize: ".95rem",
                    marginBottom: 30,
                  }}
                >
                  Passionate full-stack developer specializing in Laravel &
                  React. I build modern, performant web applications — from
                  architecture to deployment.
                </p>
              </FromLeft>
              <FromLeft v={heroV} d={0.45}>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 28,
                  }}
                >
                  <button
                    className="btn-p"
                    onClick={() => scrollTo("projects")}
                  >
                    View Work <ArrowRight size={14} />
                  </button>
                  <button className="btn-o" onClick={() => scrollTo("contact")}>
                    Contact Me
                  </button>
                  <button
                    className="btn-o"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = "/Sujal-CV.pdf";
                      a.download = "Sujal-CV.pdf";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Download size={14} />
                    CV
                  </button>
                </div>
              </FromLeft>
              <FromLeft v={heroV} d={0.55}>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    {
                      i: <Github size={16} />,
                      h: "https://github.com/FrozenXt",
                    },
                    {
                      i: <Linkedin size={16} />,
                      h: "https://www.linkedin.com/in/sujal-lamichhane-10266728b/",
                    },
                    { i: <Twitter size={16} />, h: "#" },
                    { i: <Instagram size={16} />, h: "#" },
                    { i: <Mail size={16} />, h: "mailto:sujallc30@gmail.com" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.h}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="soc"
                    >
                      {s.i}
                    </a>
                  ))}
                </div>
              </FromLeft>
            </div>
            <div className="col-lg-6 text-center">
              <FromRight v={heroV} d={0.2}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div className="pfloat" style={{ position: "relative" }}>
                    <div className="pc pc-tl" />
                    <div className="pc pc-tr" />
                    <div className="pc pc-bl" />
                    <div className="pc pc-br" />
                    <img
                      src="/sujal.png"
                      alt="Sujal"
                      style={{
                        width: 340,
                        height: 400,
                        objectFit: "cover",
                        borderRadius: 22,
                        border: `1px solid ${c.p}28`,
                        display: "block",
                        position: "relative",
                        zIndex: 2,
                      }}
                    />
                  </div>
                  {[
                    {
                      text: "⚛ React",
                      top: "8%",
                      left: "-26%",
                      col: c.p,
                      anim: "bf1 3.5s ease-in-out infinite",
                    },
                    {
                      text: "🔴 Laravel",
                      bottom: "18%",
                      left: "-28%",
                      col: "#ff2d20",
                      anim: "bf2 4s ease-in-out infinite",
                    },
                    {
                      text: "🐍 Python",
                      top: "8%",
                      right: "-26%",
                      col: "#3776ab",
                      anim: "bf1 3.8s ease-in-out infinite .5s",
                    },
                    {
                      text: "🎓 8.5 CGPA",
                      bottom: "18%",
                      right: "-26%",
                      col: "#22c55e",
                      anim: "bf2 3.2s ease-in-out infinite 1.5s",
                    },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="bfl"
                      style={{
                        top: b.top,
                        bottom: b.bottom,
                        left: b.left,
                        right: b.right,
                        color: b.col,
                        border: `1px solid ${b.col}35`,
                        animation: b.anim,
                      }}
                    >
                      {b.text}
                    </div>
                  ))}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#22c55e18",
                      border: "1px solid #22c55e30",
                      borderRadius: 100,
                      padding: "6px 18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#22c55e",
                        animation: "opulse 2s ease-in-out infinite",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontSize: ".7rem",
                        fontWeight: 700,
                        color: "#22c55e",
                      }}
                    >
                      Available for work
                    </span>
                  </div>
                </div>
              </FromRight>
            </div>
          </div>
          <FadeIn v={heroV} d={0.7}>
            <div className="text-center mt-5">
              <div
                style={{
                  fontFamily: "'Outfit',monospace",
                  fontSize: ".65rem",
                  color: fgMuted,
                  letterSpacing: ".2em",
                  marginBottom: 12,
                }}
              >
                SCROLL
              </div>
              <div className="sline" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section
        ref={statsRef}
        style={{
          padding: "64px 0",
          background: dark ? "rgba(255,255,255,.015)" : "rgba(0,0,0,.025)",
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="row g-4">
            {stats.map((s, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <FromBottom v={statsV} d={i * 0.1}>
                  <div className="stc">
                    <span
                      style={{
                        fontSize: "1.8rem",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {s.icon}
                    </span>
                    <div
                      style={{
                        fontFamily: "'Bricolage Grotesque',sans-serif",
                        fontSize: "3rem",
                        fontWeight: 800,
                        color: c.p,
                        lineHeight: 1,
                      }}
                    >
                      {cnts[i]}
                      {s.s}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontSize: ".78rem",
                        color: fgMuted,
                        marginTop: 6,
                        letterSpacing: ".06em",
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                </FromBottom>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section
        id="skills"
        ref={skillRef}
        style={{ padding: "120px 0", position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <FromLeft v={skillV} d={0}>
            <span className="stag">// 002 — SKILLS</span>
            <h2 className="sh">
              My <span className="gt">Toolkit</span>
            </h2>
            <div className="srl" />
          </FromLeft>
          <div className={`row g-4 ${skillV ? "sk-active" : ""}`}>
            {skills.map((sk, i) => {
              const W = i % 2 === 0 ? FromLeft : FromRight;
              return (
                <div key={i} className="col-lg-3 col-md-6">
                  <W v={skillV} d={0.05 + i * 0.07}>
                    <div className="skc">
                      <i
                        className={sk.icon}
                        style={{
                          fontSize: "2.4rem",
                          color: sk.color,
                          marginBottom: 10,
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".92rem",
                          marginBottom: 4,
                          color: fg,
                        }}
                      >
                        {sk.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Outfit',monospace",
                          fontSize: ".75rem",
                          color: c.p,
                        }}
                      >
                        {sk.pct}%
                      </div>
                      <div className="skbar">
                        <div
                          className="skfill"
                          style={{
                            "--tw": `${sk.pct}%`,
                            background: `linear-gradient(90deg,${sk.color},${c.p})`,
                            transitionDelay: `${i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  </W>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section
        id="experience"
        ref={expRef}
        style={{
          padding: "120px 0",
          background: dark ? "rgba(255,255,255,.015)" : "rgba(0,0,0,.02)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <FromLeft v={expV} d={0}>
            <span className="stag">// 003 — EXPERIENCE</span>
            <h2 className="sh">
              Work <span className="gt">History</span>
            </h2>
            <div className="srl" />
          </FromLeft>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {experiences.map((exp, i) => {
              const W = i % 2 === 0 ? FromLeft : FromRight;
              return (
                <W key={i} v={expV} d={0.15 + i * 0.18}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: 22,
                        paddingTop: 2,
                      }}
                    >
                      <div className="edot" style={{ "--ec": exp.color }}>
                        <span style={{ fontSize: "1.15rem" }}>{exp.icon}</span>
                      </div>
                      {i < experiences.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            height: 60,
                            background: `linear-gradient(180deg,${exp.color}55,transparent)`,
                            marginTop: 8,
                          }}
                        />
                      )}
                    </div>
                    <div className="expc" style={{ "--ec": exp.color }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Bricolage Grotesque',sans-serif",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: exp.color,
                          }}
                        >
                          {exp.role}
                        </span>
                        <span
                          style={{
                            background: exp.color + "15",
                            color: exp.color,
                            border: `1px solid ${exp.color}35`,
                            borderRadius: 100,
                            padding: "3px 12px",
                            fontSize: ".68rem",
                            fontWeight: 700,
                          }}
                        >
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span
                            style={{
                              background: "#22c55e15",
                              color: "#22c55e",
                              border: "1px solid #22c55e35",
                              borderRadius: 100,
                              padding: "3px 12px",
                              fontSize: ".68rem",
                              fontWeight: 700,
                            }}
                          >
                            ● CURRENT
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".98rem",
                          color: fg,
                          marginBottom: 6,
                        }}
                      >
                        {exp.company}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 18,
                          marginBottom: 16,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: ".78rem",
                            color: fgMuted,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                        <span
                          style={{
                            fontSize: ".78rem",
                            color: c.p,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Zap size={12} />
                          {exp.period}
                        </span>
                      </div>
                      {exp.bullets.map((b, j) => (
                        <div
                          key={j}
                          style={{
                            fontSize: ".86rem",
                            color: fgMuted,
                            marginBottom: 6,
                            paddingLeft: 16,
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              color: c.p,
                              fontWeight: 700,
                            }}
                          >
                            ›
                          </span>
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </W>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section
        id="education"
        ref={eduRef}
        style={{ padding: "120px 0", position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <FromLeft v={eduV} d={0}>
            <span className="stag">// 004 — EDUCATION</span>
            <h2 className="sh">
              Academic <span className="gt">Journey</span>
            </h2>
            <div className="srl" />
          </FromLeft>
          <div className="row g-4">
            {education.map((edu, i) => {
              const W = i === 0 ? FromLeft : i === 1 ? FromBottom : FromRight;
              return (
                <div key={i} className="col-lg-4">
                  <W v={eduV} d={0.1 + i * 0.15}>
                    <div className="educ" style={{ "--ec": edu.color }}>
                      <span className="edem">{edu.icon}</span>
                      <div
                        style={{
                          fontFamily: "'Outfit',monospace",
                          fontSize: ".68rem",
                          color: edu.color,
                          fontWeight: 700,
                          letterSpacing: ".15em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        {edu.year}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Bricolage Grotesque',sans-serif",
                          fontWeight: 800,
                          fontSize: ".98rem",
                          color: fg,
                          marginBottom: 8,
                          lineHeight: 1.35,
                        }}
                      >
                        {edu.degree}
                      </h3>
                      <div
                        style={{
                          fontWeight: 700,
                          color: edu.color,
                          marginBottom: 4,
                          fontSize: ".9rem",
                        }}
                      >
                        {edu.school}
                      </div>
                      <div
                        style={{
                          fontSize: ".82rem",
                          color: fgMuted,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          marginBottom: 16,
                        }}
                      >
                        <MapPin size={12} />
                        {edu.location}
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          background: edu.color + "12",
                          border: `1px solid ${edu.color}28`,
                          borderRadius: 8,
                          padding: "8px 16px",
                        }}
                      >
                        <Star size={13} style={{ color: edu.color }} />
                        <span
                          style={{
                            fontFamily: "'Outfit',monospace",
                            fontSize: ".78rem",
                            fontWeight: 700,
                            color: edu.color,
                          }}
                        >
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </W>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section
        id="projects"
        ref={projRef}
        style={{
          padding: "120px 0",
          background: dark ? "rgba(255,255,255,.015)" : "rgba(0,0,0,.02)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <FromLeft v={projV} d={0}>
            <span className="stag">// 005 — PROJECTS</span>
            <h2 className="sh">
              My <span className="gt">Work</span>
            </h2>
            <div className="srl" />
          </FromLeft>
          <FadeIn v={projV} d={0.1}>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              {[
                ["all", "All Projects"],
                ["ai", "AI / ML"],
                ["web", "Web"],
                ["fullstack", "Full Stack"],
              ].map(([f, l]) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "9px 22px",
                    borderRadius: 8,
                    border: `1.5px solid ${filter === f ? c.p : border}`,
                    background: filter === f ? c.p + "18" : "transparent",
                    color: filter === f ? c.p : fgMuted,
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 700,
                    fontSize: ".78rem",
                    cursor: "pointer",
                    transition: "all .3s",
                    letterSpacing: ".04em",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </FadeIn>
          <FromBottom v={projV} d={0.2}>
            <ProjectSlider
              projects={filtered}
              dark={dark}
              c={c}
              fgMuted={fgMuted}
              fg={fg}
              border={border}
              bgCard={bgCard}
            />
          </FromBottom>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        ref={contactRef}
        style={{ padding: "120px 0", position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <FromLeft v={contactV} d={0}>
            <span className="stag">// 006 — CONTACT</span>
            <h2 className="sh">
              Get In <span className="gt">Touch</span>
            </h2>
            <div className="srl" />
          </FromLeft>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <form onSubmit={handleSubmit}>
                <FromLeft v={contactV} d={0.1} s={{ marginBottom: 16 }}>
                  <input
                    type="text"
                    name="name"
                    className="cin"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </FromLeft>
                <FromRight v={contactV} d={0.18} s={{ marginBottom: 16 }}>
                  <input
                    type="email"
                    name="email"
                    className="cin"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </FromRight>
                <FromLeft v={contactV} d={0.26} s={{ marginBottom: 22 }}>
                  <textarea
                    name="message"
                    className="cin"
                    rows={5}
                    placeholder="Your Message..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    style={{ resize: "vertical" }}
                  />
                </FromLeft>
                <FromBottom v={contactV} d={0.34}>
                  <button
                    type="submit"
                    className="btn-p"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      fontSize: ".9rem",
                    }}
                  >
                    <Send size={15} /> Send via WhatsApp
                  </button>
                </FromBottom>
              </form>
              <div className="row g-3 mt-4">
                {[
                  {
                    icon: <Mail size={26} />,
                    label: "Email",
                    val: "sujallc30@gmail.com",
                    href: "mailto:sujallc30@gmail.com",
                  },
                  {
                    icon: <Phone size={26} />,
                    label: "Phone",
                    val: "+977 9744583243",
                    href: "tel:+9779744583243",
                  },
                  {
                    icon: <MapPin size={26} />,
                    label: "Location",
                    val: "Kathmandu, Nepal",
                    href: "#",
                  },
                ].map((ct, i) => {
                  const W =
                    i === 0 ? FromLeft : i === 2 ? FromRight : FromBottom;
                  return (
                    <div key={i} className="col-md-4">
                      <W v={contactV} d={0.45 + i * 0.12}>
                        <a href={ct.href} className="cc">
                          <div style={{ color: c.p, marginBottom: 10 }}>
                            {ct.icon}
                          </div>
                          <div
                            style={{
                              fontWeight: 800,
                              color: c.p,
                              marginBottom: 4,
                              fontSize: ".82rem",
                              fontFamily: "'Bricolage Grotesque',sans-serif",
                            }}
                          >
                            {ct.label}
                          </div>
                          <div style={{ fontSize: ".8rem", color: fgMuted }}>
                            {ct.val}
                          </div>
                        </a>
                      </W>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer
        style={{
          padding: "32px 0",
          background: dark ? "rgba(0,0,0,.45)" : "rgba(0,0,0,.04)",
          borderTop: `1px solid ${border}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                }}
              >
                <span className="gt">Sujal</span>
                <span style={{ color: c.p }}>.</span>
              </span>
              <span style={{ fontSize: ".8rem", color: fgMuted }}>
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { i: <Github size={15} />, h: "https://github.com/FrozenXt" },
                {
                  i: <Linkedin size={15} />,
                  h: "https://www.linkedin.com/in/sujal-lamichhane-10266728b/",
                },
                { i: <Mail size={15} />, h: "mailto:sujallc30@gmail.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soc"
                  style={{ width: 38, height: 38 }}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>
          <div
            className="text-center mt-3"
            style={{ fontSize: ".75rem", color: fgMuted }}
          >
            Designed & developed with ❤️ by Sujal Lamichhane
          </div>
        </div>
      </footer>
    </div>
  );
}
