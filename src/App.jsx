import { useState, useEffect, useRef } from "react";

/* ── Google Fonts ─────────────────────────────────────── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
    :root {
      --playfair: 'Playfair Display', Georgia, serif;
      --cormorant: 'Cormorant Garamond', Georgia, serif;
      --crimson: 'Crimson Pro', Georgia, serif;
    }
    .font-playfair { font-family: var(--playfair); }
    .font-cormorant { font-family: var(--cormorant); }
    .font-crimson { font-family: var(--crimson); }
    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; }

    /* Nav link underline animation */
    .nav-link { position: relative; padding-bottom: 4px; }
    .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #e8b96a; transition: width 0.3s ease; }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Service card top border */
    .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: #c8963e; transition: width 0.4s ease; }
    .service-card:hover::before { width: 100%; }
    .service-card:hover { background: rgba(200,150,62,0.06); }

    /* Fade-in animation */
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }

    /* Scroll hint bounce */
    @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
    .scroll-bounce { animation: scrollBounce 2s infinite; }

    /* Badge pulse */
    @keyframes badgePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
    .badge-pulse { animation: badgePulse 2s infinite; }

    /* Clip-path button */
    .btn-angled { clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }

    /* Timeline vertical line */
    .timeline-line::before { content:''; position:absolute; left:50%; top:0; bottom:0; width:1px; background:rgba(200,150,62,0.2); transform:translateX(-50%); }
    @media(max-width:640px){ .timeline-line::before { left:20px; } }
  `}</style>
);

/* ── Data ─────────────────────────────────────────────── */
const SERVICES = [
  { icon: "🦴", name: "Bone Setting", desc: "Traditional hereditary bone alignment using ancient Ayurvedic techniques passed through generations." },
  { icon: "🤕", name: "Fracture & Dislocation", desc: "Non-surgical realignment and natural healing support for fractures and dislocated joints." },
  { icon: "💆", name: "Joint & Chronic Pain", desc: "Deep herbal therapies for arthritis, knee pain, shoulder stiffness, and long-standing chronic conditions." },
  { icon: "🫀", name: "Nerve Disorders", desc: "Targeted treatments for nerve compression, sciatica, and peripheral nerve conditions." },
  { icon: "💪", name: "Muscle Injuries", desc: "Ayurvedic marma therapy and herbal compresses for sprains, tears, and muscle trauma." },
  { icon: "🏃", name: "Sports Injuries", desc: "Fast recovery protocols for athletes using traditional Kerala-style Ayurvedic methodology." },
];

const TESTIMONIALS = [
  { text: "After suffering from a complex fracture for months with no improvement elsewhere, Immu Sab's treatment healed me completely within weeks. Truly generational knowledge.", name: "Ravi Shankar", location: "Hyderabad", initials: "RS" },
  { text: "My father's knee dislocation was treated here, and he walks without any assistance today. The Belupalle Legacy Oil has been a blessing for our entire family.", name: "Fatima Begum", location: "Warangal", initials: "FB" },
  { text: "I have been coming here for back pain for years. There is no place like this — the authenticity and care are unmatched. A true heritage center.", name: "Venkata Rao", location: "Vijayawada", initials: "VR" },
];

const TIMELINE = [
  { year: "~1930", title: "The Beginning", desc: "Immu Sab establishes the first practice in Belupalle, treating patients with hereditary Ayurvedic bone setting methods." },
  { year: "1950s", title: "Expansion", desc: "The second generation takes over, expanding the patient base to neighbouring villages and towns across the region." },
  { year: "1970s", title: "The Legacy Oil", desc: "The proprietary Belupalle Legacy Pain Relief Oil formula is perfected and introduced as a treatment complement." },
  { year: "1990s", title: "Regional Recognition", desc: "The center gains wide recognition across Andhra Pradesh, treating thousands from Hyderabad, Warangal, and Vijayawada." },
  { year: "Today", title: "Fifth Generation", desc: "The tradition continues stronger than ever, now with online booking while maintaining the same authentic Ayurvedic practice." },
];

/* ── Small reusable pieces ────────────────────────────── */
const Ornament = ({ light = false }) => (
  <div className="flex items-center justify-center gap-3 my-3">
    <span className={`h-px w-14 ${light ? "bg-gradient-to-r from-transparent to-yellow-400" : "bg-gradient-to-r from-transparent to-yellow-600"}`} />
    <span className={`w-2 h-2 rotate-45 ${light ? "bg-yellow-400" : "bg-yellow-600"}`} />
    <span className={`w-1 h-1 rounded-full ${light ? "bg-yellow-300" : "bg-yellow-500"}`} />
    <span className={`w-2 h-2 rotate-45 ${light ? "bg-yellow-400" : "bg-yellow-600"}`} />
    <span className={`h-px w-14 ${light ? "bg-gradient-to-r from-yellow-400 to-transparent" : "bg-gradient-to-r from-yellow-600 to-transparent"}`} />
  </div>
);

const SectionLabel = ({ children, light = false }) => (
  <p className={`font-crimson text-xs tracking-widest uppercase mb-4 text-center ${light ? "text-yellow-700" : "text-yellow-700"}`}
    style={{ fontFamily: "var(--crimson)", letterSpacing: "0.35em" }}>
    {children}
  </p>
);

const InputField = ({ label, children }) => (
  <div className="mb-5">
    <label className="block font-crimson text-xs tracking-widest uppercase text-green-800 mb-2 font-semibold"
      style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em" }}>
      {label}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-4 py-3 bg-amber-50 border border-amber-200 font-cormorant text-lg text-stone-800 outline-none focus:border-yellow-600 focus:bg-white transition-colors duration-200 rounded-sm";

/* ── Main App ─────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [booking, setBooking] = useState({ name: "", phone: "", email: "", age: "", concern: "", date: "", time: "", notes: "" });
  const [contact, setContact] = useState({ name: "", phone: "", email: "", message: "" });
  const obsRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }, [page]);

  useEffect(() => {
    obsRef.current?.disconnect();
    obsRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach(el => obsRef.current?.observe(el));
    }, 100);
    return () => obsRef.current?.disconnect();
  }, [page]);

  const go = (p) => { setPage(p); setMenuOpen(false); };

  const submitBooking = (e) => {
    e.preventDefault();
    setBookingDone(true);
    setBooking({ name: "", phone: "", email: "", age: "", concern: "", date: "", time: "", notes: "" });
  };

  const submitContact = (e) => {
    e.preventDefault();
    setContactDone(true);
    setContact({ name: "", phone: "", email: "", message: "" });
  };

  /* ── NAV ──────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#7B1C1C]" style={{ fontFamily: "var(--cormorant)", background: "#7B1C1C", color: "#1c1208" }}>
      <FontLink />

      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-300 bg-[#7B1C1C] ${scrolled ? "bg-[#7B1C1C] shadow-2xl" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="cursor-pointer flex flex-col leading-none" onClick={() => go("home")}>
            <span className="font-playfair text-base md:text-lg font-bold text-[#e8b96a] tracking-wide" style={{ fontFamily: "var(--playfair)" }}>
              IMMU SAB
            </span>
            <span className="font-crimson text-xs text-green-300 tracking-widest uppercase mt-0.5" style={{ fontFamily: "var(--crimson)", letterSpacing: "0.25em", fontSize: "9px" }}>
              Ayurvedic Heritage · Est. ~1930
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {[["home", "Home"], ["about", "About"], ["booking", "Online Booking"], ["contact", "Contact"]].map(([p, label]) => (
              <li key={p}>
                <button onClick={() => go(p)}
                  className={`nav-link font-crimson text-[14px] tracking-widest uppercase text-amber-50 hover:text-yellow-300 transition-colors bg-transparent border-none cursor-pointer ${page === p ? "active text-yellow-300" : ""}`}
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em" }}>
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => go("booking")}
                className="font-crimson text-xs tracking-widest uppercase font-semibold bg-yellow-600 text-green-950 px-5 py-2 hover:bg-yellow-400 transition-colors cursor-pointer border-none"
                style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em" }}>
                Book Now
              </button>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(o => !o)}>
            <span className="block w-6 h-px bg-amber-100 transition-all" />
            <span className="block w-6 h-px bg-amber-100 transition-all" />
            <span className="block w-6 h-px bg-amber-100 transition-all" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#f0e5cc] border-t border-yellow-900 px-6 py-5 flex flex-col gap-4">
            {[["home", "Home"], ["about", "About"], ["booking", "Online Booking"], ["contact", "Contact"]].map(([p, label]) => (
              <button key={p} onClick={() => go(p)}
                className="font-crimson text-black text-sm tracking-widest uppercase text-left text-amber-100 hover:text-yellow-300 bg-transparent border-none cursor-pointer py-1"
                style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════
          HOME PAGE
      ══════════════════════════════════════════════════ */}
      {page === "home" && (
        <>
          {/* Hero */}
          <section className="min-h-screen relative flex items-center overflow-hidden bg-[#5C1212]" >
            {/* bg glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(200,150,62,0.09) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(107,143,107,0.1) 0%, transparent 50%)" }} />

            {/* decorative circle rings */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 border border-yellow-900 rounded-full opacity-20 pointer-events-none hidden lg:block" />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 border border-yellow-900 rounded-full opacity-15 pointer-events-none hidden lg:block" />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 border border-yellow-900 rounded-full opacity-10 pointer-events-none hidden lg:block" />

            {/* botanical */}
            <div className="absolute bottom-0 right-16 text-green-600 opacity-10 pointer-events-none select-none hidden lg:block" style={{ fontSize: 280, lineHeight: 1 }}>🌿</div>
            <div className="absolute bottom-0 left-40 text-green-600 opacity-10 pointer-events-none select-none hidden lg:block" style={{ fontSize: 280, lineHeight: 1 }}>🌿</div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24 w-full">
              {/* Est badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-yellow-600" />
                <span className="font-crimson text-xs text-yellow-500 tracking-widest uppercase" style={{ fontFamily: "var(--crimson)", letterSpacing: "0.3em" }}>
                  Established circa 1930 · Belupalle · Andhra Pradesh
                </span>
              </div>

              {/* Title */}
              <div className="flex flex-col md:flex-row items-center justify-center w-full text-center mx-auto">

                {/* <div className="rounded-[50%] bg-[#e8b96a] overflow-hidden flex items-center justify-center border-[12px] border-[#e8b96a]">
                  <img className="rounded-xl object-cover object-center w-60 md:30" src="src/assets/immu.png" alt="" />
                </div> */}

                <div>
                  <h1 className="font-playfair leading-tight mb-5 flex-1" style={{ fontFamily: "var(--playfair)", fontSize: "60px", color: "#faf4e8", fontWeight: 400 }}>
                    <em style={{ color: "#e8b96a", fontStyle: "italic" }}>Immu Sab</em>
                    <span className="block font-bold" style={{ fontFamily: "var(--playfair)" }}>Ayurvedic Generational</span>
                    Bone Setting Center
                  </h1>
                </div>


              </div>

              <p className="pt-10 font-cormorant font-light italic mb-10 max-w-lg leading-relaxed md:ml-[30%]" style={{ fontFamily: "var(--cormorant)", fontSize: "clamp(17px,2.2vw,22px)", color: "#a8c5a0" }}>
                Three generations of hereditary wisdom. Lakhs of lives healed. Traditional bone care rooted in Belupalle, Andhra Pradesh.
              </p>

              <div className="flex flex-wrap gap-4 mb-14 md:ml-[30%]">
                <button onClick={() => go("booking")}
                  className="btn-angled font-crimson text-xs tracking-widest uppercase font-semibold px-9 py-4 border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em", background: "#c8963e", color: "#1a3020" }}>
                  Book Consultation
                </button>
                <button onClick={() => go("about")}
                  className="text-[#c8963e] hover:bg-[#c8963e] hover:text-[#ffffff] font-crimson text-xs tracking-widest uppercase px-9 py-4 border cursor-pointer bg-transparent transition-all duration-500"
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em", borderColor: "rgba(200,150,62,0.5)",}}>
                  Our Heritage
                </button>
              </div>

              {/* Stats */}
            </div>

            {/* Scroll hint */}
            <div className="scroll-bounce absolute bottom-10 left-1/2 flex flex-col items-center gap-2 pointer-events-none">
              <span className="font-crimson text-xs tracking-widest uppercase" style={{ fontFamily: "var(--crimson)", color: "rgba(200,150,62,0.5)", letterSpacing: "0.25em" }}>Scroll</span>
              <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(200,150,62,0.5), transparent)" }} />
            </div>
          </section>

          {/* Services */}
          <section className="py-20 px-6 md:px-10" style={{ background: "#f0e5cc" }}>
            <div className="max-w-6xl mx-auto">
              <Ornament light />
              <SectionLabel light>Our Specialisations</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-10">
                {SERVICES.map((s, i) => (
                  <div key={i}
                    className="service-card relative p-8 border cursor-default fade-in"
                    style={{ borderColor: "rgba(200,150,62,0.1)", background: "rgba(255,255,255,0.02)", transitionDelay: `${i * 80}ms` }}>
                    <div className="text-3xl mb-4">{s.icon}</div>
                    <div className="font-playfair text-base font-semibold mb-2" style={{ fontFamily: "var(--playfair)", color: "#b08b4c" }}>{s.name}</div>
                    <div className="font-crimson text-sm leading-relaxed font-light" style={{ fontFamily: "var(--crimson)", color: "#1a3020" }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About teaser */}
          {/* <section className="py-24 px-6 md:px-10 bg-green-950" style={{ background: "#ffffff" }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> */}
              {/* Visual */}
              {/* <div className="relative fade-in">
                <div className="relative rounded-sm overflow-hidden flex flex-col items-center justify-center py-20"
                  style={{ background: "linear-gradient(145deg,#1a3020,#2d5040)", minHeight: 420 }}>
                  <div className="absolute inset-4 border rounded-sm pointer-events-none" style={{ borderColor: "rgba(200,150,62,0.25)" }} />
                  <div className="text-8xl opacity-10 mb-3">🌿</div>
                  <p className="font-playfair italic text-center px-8 text-base" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>
                    "Where ancient wisdom meets modern healing"
                  </p>
                </div> */}
                {/* corner accents */}
                {/* <div className="absolute -top-4 -right-4 w-24 h-24 border-2 rounded-sm opacity-25" style={{ borderColor: "#c8963e" }} />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 rounded-sm opacity-20" style={{ borderColor: "#c8963e" }} /> */}
                {/* year badge */}
                {/* <div className="absolute -bottom-6 right-6 px-6 py-4 text-center" style={{ background: "#c8963e" }}>
                  <span className="block font-playfair font-black text-3xl leading-none" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>1930</span>
                  <span className="font-crimson text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--crimson)", color: "#1a3020" }}>Est.</span>
                </div>
              </div> */}

              {/* Text */}
              {/* <div className="fade-in pt-8" style={{ transitionDelay: "150ms" }}>
                <p className="font-crimson text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "var(--crimson)", color: "#c8963e", letterSpacing: "0.3em" }}>Our Legacy</p>
                <h2 className="font-playfair mb-6 leading-snug" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(28px,3.5vw,46px)", color: "#1a3020", fontWeight: 400 }}>
                  A Heritage of <em style={{ color: "#8b3a20" }}>Healing</em> Passed Through Generations
                </h2>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-4" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  Founded by the venerable <strong>Immu Sab</strong> around 1930, our center stands as one of Andhra Pradesh's most trusted Ayurvedic bone care institutions. What began as a calling passed down through our family has flourished into a living legacy.
                </p>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-8" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  Our methods draw from authentic Ayurvedic texts and oral traditions, combining marma therapy, herbal formulations, and centuries-old manual techniques that cannot be replicated in any textbook.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[["🌿", "All-Natural", "No synthetic chemicals"], ["🤲", "Hereditary", "Family to family knowledge"], ["✅", "Authentic", "Original since ~1930"], ["💊", "Drug-Free", "Holistic recovery"]].map(([icon, t, d]) => (
                    <div key={t} className="flex gap-3 items-start">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border mt-0.5 text-sm" style={{ borderColor: "rgba(200,150,62,0.35)", background: "rgba(200,150,62,0.08)" }}>{icon}</div>
                      <div className="font-cormorant text-base leading-snug" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                        <span className="block font-semibold text-sm" style={{ color: "#1a3020" }}>{t}</span>{d}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => go("about")}
                  className="btn-angled font-crimson text-xs tracking-widest uppercase font-semibold px-8 py-4 border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em", background: "#1a3020", color: "#e8b96a" }}>
                  Read Full Story
                </button>
              </div>
            </div>
          </section> */}

          {/* Oil feature */}
          {/* <section className="py-24 px-6 md:px-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#2d5040,#1a3020)" }}>
            <div className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8963e' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="fade-in"> */}
                {/* badge */}
                {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5" style={{ borderColor: "rgba(200,150,62,0.35)", background: "rgba(200,150,62,0.1)" }}>
                  <span className="badge-pulse w-1.5 h-1.5 rounded-full" style={{ background: "#c8963e" }} />
                  <span className="font-crimson text-xs uppercase tracking-widest" style={{ fontFamily: "var(--crimson)", color: "#e8b96a", letterSpacing: "0.25em" }}>Original Creators</span>
                </div>
                <h2 className="font-playfair font-light leading-snug mb-6" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(28px,3.5vw,48px)", color: "#faf4e8" }}>
                  Belupalle Legacy<br /><em style={{ color: "#e8b96a" }}>Pain Relief Oil</em>
                </h2>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-8" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>
                  Crafted exclusively from authentic natural herbs, this proprietary oil has been our family's closely guarded formulation for decades. Prepared using traditional cold-process methods, it is the only pain relief oil in the region with verifiable non-carcinogenic properties.
                </p> */}
                {/* <ul className="flex flex-col gap-3">
                  {["Prepared from 100% authentic natural herbs", "Non-carcinogenic, safe for long-term use", "Effective deep-tissue pain relief", "Original formulation by Immu Sab", "Available exclusively at our center"].map(p => (
                    <li key={p} className="flex items-center gap-4 font-cormorant text-base" style={{ fontFamily: "var(--cormorant)", color: "#f0e5cc" }}>
                      <span className="h-px w-6 flex-shrink-0" style={{ background: "#c8963e" }} />
                      {p}
                    </li>
                  ))}
                </ul> */}
              {/* </div> */}

              {/* Circle visual */}
              {/* <div className="flex items-center justify-center fade-in" style={{ transitionDelay: "200ms" }}>
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(200,150,62,0.25)" }} />
                  <div className="absolute inset-5 rounded-full border border-dashed" style={{ borderColor: "rgba(200,150,62,0.15)" }} />
                  <div className="absolute inset-12 rounded-full border-2 flex flex-col items-center justify-center gap-2"
                    style={{ borderColor: "rgba(200,150,62,0.4)", background: "radial-gradient(circle at 35% 35%, rgba(200,150,62,0.28), rgba(200,150,62,0.08))" }}>
                    <span className="text-5xl">🌿</span>
                    <span className="font-playfair italic text-center text-xs leading-snug px-3" style={{ fontFamily: "var(--playfair)", color: "#e8b96a", maxWidth: 130 }}>
                      Belupalle Legacy Pain Relief Oil
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Testimonials */}
          <section className="py-24 px-6 md:px-10" style={{ background: "#fffdf7" }}>
            <div className="max-w-6xl mx-auto">
              <SectionLabel>Patient Stories</SectionLabel>
              <h2 className="font-playfair font-normal text-center mb-2 leading-snug" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(28px,4vw,48px)", color: "#1a3020" }}>
                Voices of <em style={{ color: "#8b3a20" }}>Recovery</em>
              </h2>
              <Ornament />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i}
                    className="relative p-8 border fade-in transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "#f0e5cc", borderColor: "#e0d0b0", transitionDelay: `${i * 120}ms`, boxShadow: "0 0 0 0 transparent" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(26,48,32,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}>
                    {/* big quote */}
                    <div className="absolute top-4 left-6 font-playfair font-black leading-none select-none pointer-events-none" style={{ fontFamily: "var(--playfair)", fontSize: 72, color: "rgba(200,150,62,0.25)", lineHeight: 0.6 }}>"</div>
                    <p className="font-cormorant italic font-light text-lg leading-relaxed mb-6 pt-5" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>{t.text}</p>
                    <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#e0d0b0" }}>
                      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-playfair font-bold text-base" style={{ fontFamily: "var(--playfair)", background: "#1a3020", color: "#e8b96a" }}>
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-playfair text-sm font-semibold" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>{t.name}</div>
                        <div className="font-crimson text-xs tracking-wide" style={{ fontFamily: "var(--crimson)", color: "#6b8f6b" }}>{t.location}</div>
                      </div>
                      <div className="ml-auto text-sm tracking-widest" style={{ color: "#c8963e" }}>★★★★★</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="py-20 px-6 md:px-10 text-center" style={{ background: "#1a3020" }}>
            <div className="max-w-2xl mx-auto">
              <Ornament light />
              <h2 className="font-playfair font-normal leading-snug my-5" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(28px,4vw,46px)", color: "#faf4e8" }}>
                Begin Your Healing <em style={{ color: "#e8b96a" }}>Journey</em>
              </h2>
              {/* <p className="font-cormorant font-light text-lg leading-relaxed mb-9" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>
                Trust in five generations of Ayurvedic wisdom. Your path to natural recovery starts with a single consultation.
              </p> */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => go("booking")}
                  className="btn-angled font-crimson text-xs tracking-widest uppercase font-semibold px-8 py-4 border-none cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em", background: "#c8963e", color: "#1a3020" }}>
                  Book Appointment
                </button>
                <button onClick={() => go("contact")}
                  className="font-crimson text-xs tracking-widest uppercase px-8 py-4 border cursor-pointer transition-all hover:text-yellow-300 bg-transparent"
                  style={{ fontFamily: "var(--crimson)", letterSpacing: "0.2em", borderColor: "rgba(200,150,62,0.5)", color: "#faf4e8" }}>
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════
          ABOUT PAGE
      ══════════════════════════════════════════════════ */}
      {page === "about" && (
        <div className="pt-16 md:pt-20 bg-green-950">
          {/* Hero */}
          <section className="py-24 px-6 md:px-10 text-center relative overflow-hidden bg-green-950">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(200,150,62,0.08) 0%, transparent 70%)" }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <SectionLabel light>Our Story</SectionLabel>
              {/* <h1 className="font-playfair font-normal leading-snug mb-4" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(34px,5vw,66px)", color: "#faf4e8" }}>
                A Century of <em style={{ color: "#e8b96a" }}>Ayurvedic Heritage</em>
              </h1> */}
              <Ornament light />
              <p className="font-cormorant font-light text-xl leading-relaxed mt-5" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>
                Rooted in Belupalle, nurtured by generations, and built on the unwavering trust of lakhs of healers across Andhra Pradesh and beyond.
              </p>
            </div>
          </section>

          {/* Founder */}
          {/* <section className="py-24 px-6 md:px-10" style={{ background: "#f0e5cc" }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative fade-in">
                <div className="relative flex flex-col items-center justify-center py-20 rounded-sm" style={{ background: "linear-gradient(145deg,#1a3020,#2d5040)", minHeight: 420 }}>
                  <div className="absolute inset-4 border rounded-sm pointer-events-none" style={{ borderColor: "rgba(200,150,62,0.25)" }} />
                  <div className="text-7xl opacity-10 mb-4">👤</div>
                  <p className="font-playfair italic text-lg" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>Immu Sab</p>
                  <p className="font-crimson text-xs uppercase tracking-widest mt-1" style={{ fontFamily: "var(--crimson)", color: "#a8c5a0", letterSpacing: "0.2em" }}>Founder</p>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 rounded-sm opacity-25" style={{ borderColor: "#c8963e" }} />
                <div className="absolute -bottom-4 -left-4 w-14 h-14 border-2 rounded-sm opacity-20" style={{ borderColor: "#c8963e" }} />
                <div className="absolute -bottom-6 right-6 px-6 py-4 text-center" style={{ background: "#c8963e" }}>
                  <span className="block font-playfair font-black text-3xl leading-none" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>~1930</span>
                  <span className="font-crimson text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--crimson)", color: "#1a3020" }}>Founded</span>
                </div>
              </div>

              <div className="fade-in pt-8" style={{ transitionDelay: "150ms" }}>
                <p className="font-crimson text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "var(--crimson)", color: "#c8963e", letterSpacing: "0.3em" }}>The Founder</p>
                <h2 className="font-playfair font-normal leading-snug mb-6" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(26px,3.5vw,44px)", color: "#1a3020" }}>
                  Born from a Gift,<br />Grown into a <em style={{ color: "#8b3a20" }}>Dynasty</em>
                </h2>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-4" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  The story of our center begins with <strong>Immu Sab</strong>, a man blessed with an extraordinary natural gift for bone healing. Around 1930, in the village of Belupalle, he began treating patients using methods learned from his elders — methods that traced back centuries through the Ayurvedic tradition of southern India.
                </p>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-4" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  Word of his skill spread quickly. Patients arrived from distant towns, many carrying injuries that had resisted all other forms of treatment. His gentle hands, his reading of the body's marma points, and his knowledge of herbs were unlike anything the region had seen.
                </p>
                <p className="font-cormorant text-lg font-light leading-relaxed" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  He carefully documented his knowledge and passed it to his children, who expanded the practice — and so began a lineage that continues to this very day, now five generations strong.
                </p>
              </div>
            </div>
          </section> */}

          {/* Timeline */}
          {/* <section className="py-24 px-6 md:px-10" style={{ background: "#1a3020" }}>
            <div className="max-w-6xl mx-auto">
              <SectionLabel light>Our Journey</SectionLabel>
              <h2 className="font-playfair font-normal text-center mb-2 leading-snug" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(28px,4vw,48px)", color: "#faf4e8" }}>
                Across the <em style={{ color: "#e8b96a" }}>Generations</em>
              </h2>
              <Ornament light />

              <div className="relative timeline-line mt-14 max-w-3xl mx-auto">
                {TIMELINE.map((item, i) => (
                  <div key={i}
                    className={`relative flex gap-8 mb-12 fade-in ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-start`}
                    style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"} hidden sm:block`}>
                      <div className="font-playfair font-bold text-2xl" style={{ fontFamily: "var(--playfair)", color: "#c8963e" }}>{item.year}</div>
                      <div className="font-playfair text-lg mb-2" style={{ fontFamily: "var(--playfair)", color: "#faf4e8" }}>{item.title}</div>
                      <div className="font-cormorant font-light text-base leading-relaxed" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>{item.desc}</div>
                    </div> */}
                    {/* dot */}
                    {/* <div className="w-3 h-3 rounded-full flex-shrink-0 mt-2 relative z-10 border-4" style={{ background: "#c8963e", borderColor: "#1a3020" }} />
                    <div className="flex-1 sm:hidden">
                      <div className="font-playfair font-bold text-xl" style={{ fontFamily: "var(--playfair)", color: "#c8963e" }}>{item.year}</div>
                      <div className="font-playfair text-base mb-1" style={{ fontFamily: "var(--playfair)", color: "#faf4e8" }}>{item.title}</div>
                      <div className="font-cormorant font-light text-sm leading-relaxed" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>{item.desc}</div>
                    </div>
                    <div className="flex-1 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Warning */}
          <section className="py-16 px-6 md:px-10" style={{ background: "#f0e5cc" }}>
            <div className="max-w-3xl mx-auto">
              <div className="p-10 border-2 rounded-sm fade-in" style={{ borderColor: "#8b3a20", background: "rgba(139,58,32,0.06)" }}>
                <div className="font-playfair text-xl mb-4 flex items-center gap-3" style={{ fontFamily: "var(--playfair)", color: "#8b3a20" }}>
                  ⚠️ Important Authenticity Notice
                </div>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-4" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  There may be non-authentic or counterfeit clinics operating in and around Belupalle using names similar to ours. For genuine, safe, and effective treatment, always verify you are at the correct location.
                </p>
                <p className="font-cormorant text-lg font-light leading-relaxed mb-4" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  The official name of our institution is: <strong style={{ color: "#8b3a20" }}>"Immu Sab Ayurvedic Generational Bone Setting and Ayurvedic Center"</strong>
                </p>
                <p className="font-crimson text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--crimson)", color: "#8b3a20", letterSpacing: "0.15em" }}>
                  Always confirm by calling us before your visit.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          BOOKING PAGE
      ══════════════════════════════════════════════════ */}
      {page === "booking" && (
        <div className="pt-16 md:pt-20 bg-green-950">
          <section className="py-20 px-6 md:px-10 text-center relative" >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(200,150,62,0.07) 0%, transparent 70%)" }} />
            <div className="max-w-2xl mx-auto relative z-10">
              <SectionLabel light>Schedule a Visit</SectionLabel>
              <h1 className="font-playfair font-normal leading-snug" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(30px,4.5vw,56px)", color: "#faf4e8" }}>
                Book Your <em style={{ color: "#e8b96a" }}>Consultation</em>
              </h1>
              <Ornament light />
            </div>
          </section>

          <section className="py-20 px-6 md:px-10" style={{ background: "#f0e5cc" }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              {/* Info */}
              <div className="lg:col-span-2 fade-in">
                <h2 className="font-playfair font-normal leading-snug mb-5" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(24px,2.8vw,36px)", color: "#1a3020" }}>
                  Online <em style={{ color: "#8b3a20" }}>Appointment Form</em>
                </h2>
                {/* <p className="font-cormorant text-lg font-light leading-relaxed mb-8" style={{ fontFamily: "var(--cormorant)", color: "#3d2f18" }}>
                  We welcome patients from all over Andhra Pradesh and beyond. Whether you seek relief from a long-standing injury or acute condition, our traditional methods offer lasting recovery.
                </p> */}
                <div className="flex flex-col gap-5 mb-8">
                  {[["1", "Make a call to us. @ +91- 77025 11025"], ["2", "We will confirm your appointment"], ["3", "Visit us at the center on your scheduled date"]].map(([n, t]) => (
                    <div key={n} className="flex gap-4 items-start">
                      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border font-playfair text-sm" style={{ borderColor: "#c8963e", color: "#c8963e", fontFamily: "-apple-system" }}>{n}</div>
                      <p className="font-cormorant text-base leading-relaxed pt-1.5" style={{ fontFamily: "-apple-system", color: "#3d2f18" }}>{t}</p>
                    </div>
                  ))}
                </div>
                <div className="p-5 border rounded-sm" style={{ borderColor: "rgba(200,150,62,0.3)", background: "rgba(200,150,62,0.06)" }}>
                  <p className="font-playfair text-base mb-2" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>📞 Call to Book Appointment</p>
                  <p className="font-cormorant text-base font-light leading-relaxed" style={{ fontFamily: "-apple-system", color: "#3d2f18" }}>
                    Contact us <em style={{ color: "#8b3a20" }}>@ +91-77025 11025</em> to book appointment directly. Always confirm the official name before visiting.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 fade-in p-8 md:p-10 border shadow-xl" style={{ transitionDelay: "150ms", background: "#fffdf7", borderColor: "#e0d0b0" }}>
                <h3 className="font-playfair font-semibold text-2xl mb-7" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>Patient Appointment Form <span className="text-xs text-maroon-400"> (Not required if called already)</span></h3>
                {bookingDone ? (
                  <div className="text-center py-10 border rounded-sm" style={{ borderColor: "#3d6b54", background: "rgba(61,107,84,0.08)" }}>
                    <div className="text-5xl mb-4">✅</div>
                    <p className="font-cormorant italic text-xl" style={{ fontFamily: "var(--cormorant)", color: "#1a3020" }}>
                      Thank you. Your booking request has been received. Please call us @ 77025 11025 to confirm appointment.
                    </p>
                    <button onClick={() => setBookingDone(false)}
                      className="btn-angled mt-6 font-crimson text-xs uppercase tracking-widest px-7 py-3 border-none cursor-pointer"
                      style={{ fontFamily: "var(--crimson)", background: "#1a3020", color: "#e8b96a", letterSpacing: "0.2em" }}>
                      Book Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitBooking}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <InputField label="Full Name *">
                        <input required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} placeholder="Your full name" />
                      </InputField>
                      <InputField label="Phone Number *">
                        <input required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                      </InputField>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <InputField label="Email Address">
                        <input type="email" className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} placeholder="Optional" />
                      </InputField>
                      <InputField label="Age">
                        <input className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.age} onChange={e => setBooking(b => ({ ...b, age: e.target.value }))} placeholder="Your age" />
                      </InputField>
                    </div>
                    <InputField label="Medical Concern *">
                      <select required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.concern} onChange={e => setBooking(b => ({ ...b, concern: e.target.value }))}>
                        <option value="">Select your concern</option>
                        {["Bone Setting / Fracture", "Joint Dislocation", "Chronic Joint Pain", "Back / Neck Pain", "Nerve Disorder / Sciatica", "Sports Injury", "Muscle Injury / Sprain", "Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </InputField>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <InputField label="Preferred Date *">
                        <input type="date" required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.date} onChange={e => setBooking(b => ({ ...b, date: e.target.value }))} />
                      </InputField>
                      <InputField label="Preferred Time">
                        <select className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={booking.time} onChange={e => setBooking(b => ({ ...b, time: e.target.value }))}>
                          <option value="">Any time</option>
                          {["9:00 AM – 11:00 AM", "11:00 AM – 1:00 PM", "2:00 PM – 4:00 PM", "4:00 PM – 6:00 PM"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </InputField>
                    </div>
                    <InputField label="Additional Notes">
                      <textarea className={inputCls} style={{ fontFamily: "var(--cormorant)", minHeight: 90 }} value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))} placeholder="Any additional information about your condition..." />
                    </InputField>
                    <button type="submit"
                      className="w-full font-crimson text-sm uppercase tracking-widest font-semibold py-5 border-none cursor-pointer transition-all hover:-translate-y-0.5 mt-2"
                      style={{ fontFamily: "var(--crimson)", background: "#1a3020", color: "#e8b96a", letterSpacing: "0.25em" }}>
                      Request Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          CONTACT PAGE
      ══════════════════════════════════════════════════ */}
      {page === "contact" && (
        <div className="pt-16 md:pt-20 bg-green-950">
          <section className="py-20 px-6 md:px-10 text-center relative" style={{ background: "#1a3020" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(200,150,62,0.07) 0%, transparent 70%)" }} />
            <div className="max-w-2xl mx-auto relative z-10">
              <SectionLabel light>Reach Us</SectionLabel>
              <h1 className="font-playfair font-normal leading-snug" style={{ fontFamily: "var(--playfair)", fontSize: "clamp(30px,4.5vw,56px)", color: "#faf4e8" }}>
                Contact <em style={{ color: "#e8b96a" }}>Our Center</em>
              </h1>
              <Ornament light />
              <p className="font-cormorant font-light text-xl leading-relaxed mt-4" style={{ fontFamily: "var(--cormorant)", color: "#a8c5a0" }}>
                We are here to guide you. Reach out before visiting to confirm authenticity and schedule your consultation.
              </p>
            </div>
          </section>

          <section className="py-20 px-6 md:px-10" style={{ background: "#fffdf7" }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Info card */}
              <div className="relative overflow-hidden p-8 md:p-10 fade-in" style={{ background: "#1a3020" }}>
                <div className="absolute bottom-0 right-0 text-8xl opacity-5 pointer-events-none select-none leading-none" style={{ color: "#c8963e" }}>☘</div>
                <h2 className="font-playfair font-normal text-2xl mb-8 leading-snug" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>
                  Find Us in Belupalle
                </h2>

                {[
                  ["📍", "Address", "Immu Sab Ayurvedic Generational Bone Setting and Ayurvedic Center\nBelupalle, Andhra Pradesh, India"],
                  ["📞", "Phone", "77025 11025"],
                  ["⚠️", "Authenticity Reminder", "Always confirm you are visiting the official centre — beware of impostors using similar names."]
                ].map(([icon, label, val]) => (
                  <div key={label} className="flex gap-4 mb-7">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border text-lg" style={{ borderColor: "rgba(200,150,62,0.3)", color: "#c8963e" }}>{icon}</div>
                    <div>
                      <p className="font-crimson text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--crimson)", color: "#a8c5a0", letterSpacing: "0.2em" }}>{label}</p>
                      <p className="font-cormorant text-base leading-relaxed" style={{ fontFamily: "-apple-system", color: label === "Authenticity Reminder" ? "rgba(248,180,130,0.9)" : "#faf4e8", whiteSpace: "pre-line" }}>{val}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t" style={{ borderColor: "rgba(200,150,62,0.2)" }}>
                  <p className="font-playfair text-lg mb-4" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>Consultation Hours</p>
                  {[["Monday – Sunday", "8:00 AM – 6:00 PM"]].map(([d, t]) => (
                    <div key={d} className="flex justify-between py-2 border-b font-cormorant text-base" style={{ fontFamily: "var(--cormorant)", borderColor: "rgba(200,150,62,0.1)", color: "#a8c5a0" }}>
                      <span>{d}</span>
                      <span style={{ color: "#f0e5cc" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="p-8 md:p-10 border fade-in" style={{ transitionDelay: "150ms", borderColor: "#e0d0b0", background: "#f0e5cc" }}>
                <h2 className="font-playfair font-normal text-2xl mb-7" style={{ fontFamily: "var(--playfair)", color: "#1a3020" }}>Send Us a Message</h2>
                {contactDone ? (
                  <div className="text-center py-10 border rounded-sm" style={{ borderColor: "#3d6b54", background: "rgba(61,107,84,0.08)" }}>
                    <div className="text-5xl mb-4">✉️</div>
                    <p className="font-cormorant italic text-xl" style={{ fontFamily: "var(--cormorant)", color: "#1a3020" }}>
                      Thank you for reaching out. We will get back to you as soon as possible.
                    </p>
                    <button onClick={() => setContactDone(false)}
                      className="btn-angled mt-6 font-crimson text-xs uppercase tracking-widest px-7 py-3 border-none cursor-pointer"
                      style={{ fontFamily: "var(--crimson)", background: "#1a3020", color: "#e8b96a", letterSpacing: "0.2em" }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitContact}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <InputField label="Your Name *">
                        <input required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} placeholder="Full name" />
                      </InputField>
                      <InputField label="Phone Number *">
                        <input required className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                      </InputField>
                    </div>
                    <InputField label="Email Address">
                      <input type="email" className={inputCls} style={{ fontFamily: "var(--cormorant)" }} value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} placeholder="Optional" />
                    </InputField>
                    <InputField label="Your Message *">
                      <textarea required className={inputCls} style={{ fontFamily: "var(--cormorant)", minHeight: 130 }} value={contact.message} onChange={e => setContact(c => ({ ...c, message: e.target.value }))} placeholder="Tell us about your condition or enquiry..." />
                    </InputField>
                    <button type="submit"
                      className="w-full font-crimson text-sm uppercase tracking-widest font-semibold py-5 border-none cursor-pointer transition-all hover:-translate-y-0.5 mt-1"
                      style={{ fontFamily: "var(--crimson)", background: "#1a3020", color: "#e8b96a", letterSpacing: "0.25em" }}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="py-14 px-6 md:px-10" style={{ background: "#0f1c12" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b" style={{ borderColor: "rgba(200,150,62,0.12)" }}>
            <div className="md:col-span-1">
              <div className="font-playfair font-bold text-lg mb-1" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>Immu Sab Ayurvedic </div>
              <div className="font-crimson text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "var(--crimson)", color: "#6b8f6b", letterSpacing: "0.2em" }}>Belupalle · Established ~1930</div>
              {/* <p className="font-cormorant text-base font-light leading-relaxed" style={{ fontFamily: "var(--cormorant)", color: "rgba(200,183,151,0.55)" }}>
                A hereditary legacy of Ayurvedic bone setting and holistic healing, serving lakhs of patients with authentic natural methods across five generations.
              </p> */}
            </div>
            <div>
              <div className="font-playfair text-base font-semibold mb-4" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>Navigation</div>
              <ul className="flex flex-col gap-2 list-none">
                {[["home", "Home"], ["about", "About Us"], ["booking", "Online Booking"], ["contact", "Contact"]].map(([p, l]) => (
                  <li key={p}><button onClick={() => go(p)} className="font-cormorant text-base border-none bg-transparent cursor-pointer p-0 text-left hover:text-yellow-400 transition-colors" style={{ fontFamily: "var(--cormorant)", color: "rgba(200,183,151,0.55)" }}>{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-playfair text-base font-semibold mb-4" style={{ fontFamily: "var(--playfair)", color: "#e8b96a" }}>Specialities</div>
              <ul className="flex flex-col gap-2 list-none">
                {["Bone Setting", "Fracture Care", "Joint Pain", "Back & Neck Pain", "Nerve Disorders", "Sports Injuries"].map(s => (
                  <li key={s} className="font-cormorant text-base" style={{ fontFamily: "var(--cormorant)", color: "rgba(200,183,151,0.55)" }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6 font-crimson text-xs" style={{ fontFamily: "var(--crimson)", color: "rgba(200,183,151,0.3)", letterSpacing: "0.1em" }}>
            <span>© 2026 Immu Sab Ayurvedic Generational Bone Setting and Ayurvedic Center. All rights reserved.</span>
            <span>Belupalle, Andhra Pradesh · Est. ~1930</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
