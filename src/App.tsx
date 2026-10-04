import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMG, servicios, obras, cats, type Servicio, type Obra } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Wave = ({ fill, flip = false }: { fill: string; flip?: boolean }) => (
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`block w-full h-16 md:h-24 ${flip ? "rotate-180" : ""}`}>
    <path d="M0,64 C240,128 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z" fill={fill} />
  </svg>
);

const Icon = ({ d, className = "w-6 h-6" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}><path d={d} /></svg>
);

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["Servicios", "#servicios"], ["Obras", "#obras"], ["Nosotros", "#nosotros"], ["Cómo trabajamos", "#proceso"]];
  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3">
      <nav className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled || open ? "bg-crema/90 backdrop-blur shadow-lg shadow-verde/10 text-verde" : "text-crema"}`}>
        <a href="#inicio" className="flex items-center gap-2 font-display text-2xl font-semibold">
          <span className="w-8 h-8 blob bg-terra grid place-items-center text-crema text-base">P</span>Penicó
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {links.map(([l, h]) => <a key={h} href={h} className="hover:text-terra transition">{l}</a>)}
          <a href="#contacto" className="rounded-full bg-terra text-crema px-5 py-2.5 hover:bg-verde transition">Consultar proyecto</a>
        </div>
        <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Menú">
          <Icon d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h10"} className="w-7 h-7" />
        </button>
      </nav>
      {open && (
        <div className="md:hidden mx-auto mt-2 rounded-[2rem] bg-crema shadow-xl p-6 flex flex-col gap-4 text-verde font-semibold">
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="#contacto" onClick={() => setOpen(false)} className="rounded-full bg-terra text-crema px-5 py-3 text-center">Consultar proyecto</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".h-img", { scale: 1.25, duration: 2.2, ease: "power2.out" })
      .from(".h-line", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.3)
      .from(".h-fade", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.9)
      .from(".h-blob", { scale: 0, rotate: -40, duration: 1.4, ease: "elastic.out(1,0.6)" }, 0.8);
    gsap.to(".h-img", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".h-blob", { rotate: 360, duration: 40, repeat: -1, ease: "none" });
  }, { scope: ref });
  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-verde-dark text-crema grain">
      <img src={IMG.hero} alt="Vista aérea de desarrollo urbano" className="h-img absolute inset-0 w-full h-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-tr from-verde-dark via-verde/70 to-transparent" />
      <div className="h-blob absolute -right-24 -bottom-24 w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] blob border border-terra-light/40" />
      <div className="h-blob absolute right-10 top-32 w-40 h-40 blob2 bg-terra/30 blur-2xl" />
      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-40 md:pt-48">
        <p className="h-fade inline-flex items-center gap-2 rounded-full bg-crema/10 backdrop-blur px-4 py-1.5 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-terra-light animate-pulse" /> Más de 20 años construyendo territorio
        </p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] font-light max-w-4xl">
          {["Hacemos crecer", "ciudades con", "raíces firmes."].map((l, i) => (
            <span key={i} className="block overflow-hidden pb-2"><span className={`h-line block ${i === 2 ? "italic text-terra-light" : ""}`}>{l}</span></span>
          ))}
        </h1>
        <p className="h-fade mt-8 max-w-xl text-lg text-crema/80">Urbanización, redes de servicios, riego y gestión integral para desarrolladores, instituciones y organismos públicos. Del plano a la obra entregada, con un solo equipo.</p>
        <div className="h-fade mt-10 flex flex-wrap gap-4">
          <a href="#contacto" className="group rounded-full bg-terra px-7 py-4 font-semibold hover:bg-crema hover:text-verde transition inline-flex items-center gap-2">Consultar por un proyecto <span className="group-hover:translate-x-1 transition">→</span></a>
          <a href="#obras" className="rounded-full border border-crema/40 px-7 py-4 font-semibold hover:bg-crema/10 transition">Ver obras</a>
        </div>
        <div className="h-fade mt-16 grid grid-cols-3 gap-4 max-w-lg">
          {[["+180", "obras entregadas"], ["+2.500", "hectáreas urbanizadas"], ["98%", "en plazo"]].map(([n, t]) => (
            <div key={t}><p className="font-display text-3xl md:text-4xl text-terra-light">{n}</p><p className="text-xs md:text-sm text-crema/70">{t}</p></div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0"><Wave fill="#F4ECE1" /></div>
    </section>
  );
}

function Servicios({ onOpen }: { onOpen: (s: Servicio) => void }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(".s-card", { y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".s-grid", start: "top 80%" } });
    gsap.from(".s-head > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: ".s-head", start: "top 85%" } });
  }, { scope: ref });
  return (
    <section id="servicios" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="s-head flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-terra font-semibold tracking-wide mb-3">— Servicios</p>
            <h2 className="font-display text-4xl md:text-6xl font-light max-w-xl">Todo lo que un territorio necesita para <em className="text-terra">funcionar</em>.</h2>
          </div>
          <p className="max-w-sm text-verde/75">Cuatro áreas que se complementan para que tu proyecto avance sin fricciones entre etapas ni proveedores.</p>
        </div>
        <div className="s-grid grid md:grid-cols-2 gap-6">
          {servicios.map((s, i) => (
            <button key={s.id} onClick={() => onOpen(s)} className={`s-card group text-left relative overflow-hidden bg-arena/60 hover:bg-verde hover:text-crema transition-colors duration-500 p-8 md:p-10 ${i % 2 ? "rounded-[3rem_1rem_3rem_3rem] md:mt-14" : "rounded-[1rem_3rem_3rem_3rem]"}`}>
              <div className="absolute -right-16 -top-16 w-56 h-56 blob overflow-hidden opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition duration-700">
                <img src={s.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 blob2 bg-terra text-crema grid place-items-center mb-8 group-hover:rotate-12 transition"><Icon d={s.icon} className="w-7 h-7" /></div>
              <span className="font-display text-sm text-terra group-hover:text-terra-light">0{i + 1}</span>
              <h3 className="font-display text-2xl md:text-3xl mt-1 mb-3 relative">{s.titulo}</h3>
              <p className="opacity-80 max-w-md relative">{s.corto}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-terra group-hover:text-terra-light">Más información <span className="group-hover:translate-x-1 transition">→</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(ref.current, { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-verde-dark/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <div ref={ref} onClick={(e) => e.stopPropagation()} className="relative bg-crema w-full max-w-3xl max-h-[92svh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl">
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 w-11 h-11 rounded-full bg-crema/90 grid place-items-center hover:bg-terra hover:text-crema transition"><Icon d="M6 6l12 12M18 6L6 18" /></button>
        {children}
      </div>
    </div>
  );
}

function Obras({ onOpen }: { onOpen: (o: Obra) => void }) {
  const [cat, setCat] = useState("Todas");
  const ref = useRef<HTMLElement>(null);
  const list = cat === "Todas" ? obras : obras.filter((o) => o.cat === cat);
  useGSAP(() => {
    gsap.from(".o-head > *", { y: 40, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".o-head", start: "top 85%" } });
  }, { scope: ref });
  useGSAP(() => {
    gsap.fromTo(".o-card", { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
  }, { scope: ref, dependencies: [cat] });
  return (
    <section id="obras" ref={ref} className="relative bg-verde text-crema">
      <Wave fill="#364B41" flip />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="o-head text-center mb-12">
          <p className="text-terra-light font-semibold mb-3">— Obras destacadas</p>
          <h2 className="font-display text-4xl md:text-6xl font-light">Proyectos que ya <em className="text-terra-light">dan vida</em>.</h2>
          <div className="mt-10 inline-flex flex-wrap justify-center gap-2 bg-verde-dark/50 p-2 rounded-full">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${cat === c ? "bg-terra text-crema" : "hover:bg-crema/10"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((o, i) => (
            <button key={o.id} onClick={() => onOpen(o)} className={`o-card group text-left ${i % 3 === 1 ? "lg:translate-y-10" : ""}`}>
              <div className={`relative overflow-hidden aspect-[4/5] ${["rounded-[4rem_1.5rem_4rem_1.5rem]", "rounded-[1.5rem_4rem_1.5rem_4rem]", "rounded-[50%_50%_2rem_2rem/30%_30%_2rem_2rem]"][i % 3]}`}>
                <img src={o.img} alt={o.nombre} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-verde-dark/90 via-transparent" />
                <span className="absolute top-5 left-5 rounded-full bg-crema text-verde text-xs font-bold px-3 py-1">{o.cat}</span>
                <div className="absolute bottom-0 p-6">
                  <p className="text-sm text-crema/70">{o.lugar} · {o.anio}</p>
                  <h3 className="font-display text-2xl">{o.nombre}</h3>
                  <span className="mt-2 inline-block text-terra-light text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">Ver detalle →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Wave fill="#F4ECE1" />
    </section>
  );
}

function Nosotros() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(".n-img", { clipPath: "circle(0% at 50% 50%)", duration: 1.6, ease: "power3.inOut", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    gsap.from(".n-txt > *", { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: ".n-txt", start: "top 80%" } });
    gsap.to(".n-small", { y: -60, scrollTrigger: { trigger: ref.current, scrub: true } });
  }, { scope: ref });
  return (
    <section id="nosotros" ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="n-img blob overflow-hidden aspect-square"><img src={IMG.about} alt="Obra en ejecución" className="w-full h-full object-cover" /></div>
          <div className="n-small absolute -bottom-6 -right-2 md:-right-10 w-40 md:w-52 aspect-square blob2 overflow-hidden border-8 border-crema"><img src={IMG.aboutB} alt="Canal de riego" className="w-full h-full object-cover" /></div>
          <div className="absolute -top-4 -left-2 bg-terra text-crema rounded-full w-28 h-28 grid place-items-center text-center font-display leading-tight"><span><b className="text-3xl block">20+</b><small className="text-xs">años</small></span></div>
        </div>
        <div className="n-txt">
          <p className="text-terra font-semibold mb-3">— Quiénes somos</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Un equipo que conoce el terreno, <em className="text-terra">literalmente</em>.</h2>
          <p className="text-verde/80 mb-4">Penicó nació como una empresa familiar de obras hídricas y creció hasta convertirse en un socio integral para el desarrollo urbano. Hoy reunimos ingenieros, técnicos y cuadrillas propias que trabajan con la misma lógica: cumplir lo que prometemos.</p>
          <p className="text-verde/80 mb-8">Creemos en la cercanía. Cada proyecto tiene un responsable que atiende el teléfono, conoce los números y está en obra.</p>
          <div className="grid grid-cols-2 gap-4">
            {[["Equipo propio", "+120 personas y maquinaria"], ["Transparencia", "Reportes semanales"], ["Compromiso", "Plazos y costos cerrados"], ["Calidad", "Procesos certificados"]].map(([t, d]) => (
              <div key={t} className="rounded-[1.5rem_2.5rem_1.5rem_2.5rem] bg-arena/70 p-5"><p className="font-display text-lg">{t}</p><p className="text-sm text-verde/70">{d}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const pasos = [
    ["Escuchamos", "Analizamos tu idea, el terreno y los objetivos comerciales o institucionales."],
    ["Evaluamos", "Estudio de factibilidad técnica, normativa y económica con propuesta clara."],
    ["Planificamos", "Proyecto ejecutivo, permisos, cronograma y presupuesto cerrado."],
    ["Construimos", "Ejecución con equipo propio, inspección y reportes de avance."],
    ["Entregamos", "Pruebas, aprobaciones finales y acompañamiento post-obra."],
  ];
  useGSAP(() => {
    gsap.from(".p-path", { strokeDashoffset: 2000, ease: "none", scrollTrigger: { trigger: ".p-wrap", start: "top 70%", end: "bottom 60%", scrub: 1 } });
    gsap.utils.toArray<HTMLElement>(".p-step").forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: "back.out(1.6)", scrollTrigger: { trigger: el, start: "top 85%" } });
    });
  }, { scope: ref });
  return (
    <section id="proceso" ref={ref} className="relative bg-arena/60 rounded-[3rem] md:rounded-[6rem] mx-2 md:mx-6 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-terra font-semibold mb-3">— Cómo trabajamos</p>
          <h2 className="font-display text-4xl md:text-6xl font-light">Un camino claro, <em className="text-terra">sin sorpresas</em>.</h2>
        </div>
        <div className="p-wrap relative">
          <svg className="hidden lg:block absolute inset-x-0 top-10 w-full h-32" viewBox="0 0 1000 120" preserveAspectRatio="none" fill="none">
            <path className="p-path" d="M20,60 C150,-10 250,130 400,60 C550,-10 650,130 800,60 C880,25 940,40 990,60" stroke="#B86D41" strokeWidth="2.5" strokeDasharray="2000" strokeDashoffset="0" strokeLinecap="round" />
          </svg>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {pasos.map(([t, d], i) => (
              <div key={t} className={`p-step text-center ${i % 2 ? "lg:mt-24" : ""}`}>
                <div className="mx-auto w-20 h-20 blob bg-verde text-crema grid place-items-center font-display text-2xl mb-5 shadow-lg shadow-verde/20">0{i + 1}</div>
                <h3 className="font-display text-2xl mb-2">{t}</h3>
                <p className="text-sm text-verde/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacto({ servicioInicial }: { servicioInicial: string }) {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", tel: "", org: "Desarrollador privado", servicio: "", mensaje: "" });
  const [err, setErr] = useState<Record<string, boolean>>({});
  useEffect(() => { if (servicioInicial) setForm((f) => ({ ...f, servicio: servicioInicial })); }, [servicioInicial]);
  useGSAP(() => {
    gsap.from(".c-box", { y: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
  }, { scope: ref });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = { nombre: !form.nombre.trim(), email: !/^\S+@\S+\.\S+$/.test(form.email), mensaje: form.mensaje.trim().length < 10 };
    setErr(er);
    if (Object.values(er).some(Boolean)) { gsap.fromTo(".c-form", { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" }); return; }
    setSent(true);
    setTimeout(() => gsap.from(".c-ok > *", { y: 30, opacity: 0, stagger: 0.1 }), 10);
  };
  const inp = (bad?: boolean) => `w-full rounded-2xl bg-crema/10 border ${bad ? "border-terra-light" : "border-crema/20"} px-5 py-3.5 placeholder:text-crema/50 focus:outline-none focus:border-terra-light focus:bg-crema/15 transition`;
  return (
    <section id="contacto" ref={ref} className="py-24 md:py-32 px-3">
      <div className="c-box relative mx-auto max-w-6xl bg-verde text-crema rounded-[3rem] md:rounded-[5rem_2rem_5rem_2rem] overflow-hidden grain grid lg:grid-cols-5">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 blob bg-terra/40 blur-3xl" />
        <div className="relative lg:col-span-2 p-8 md:p-14">
          <p className="text-terra-light font-semibold mb-3">— Contacto</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Contanos tu proyecto. <em className="text-terra-light">Lo hacemos posible.</em></h2>
          <p className="text-crema/75 mb-10">Respondemos en menos de 48 horas hábiles con una primera evaluación sin costo.</p>
          <ul className="space-y-5 text-crema/90">
            {[["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z", "+54 261 555 0123"], ["M4 4h16v16H4zM4 6l8 7 8-7", "proyectos@penico.com.ar"], ["M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "Av. San Martín 1450, Mendoza"]].map(([d, t]) => (
              <li key={t} className="flex items-center gap-4"><span className="w-11 h-11 blob2 bg-crema/10 grid place-items-center text-terra-light"><Icon d={d} className="w-5 h-5" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-3 p-8 md:p-14 lg:pl-4">
          {sent ? (
            <div className="c-ok h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-24 h-24 blob bg-terra grid place-items-center mb-6"><Icon d="M5 12l5 5 9-10" className="w-10 h-10" /></div>
              <h3 className="font-display text-3xl mb-3">¡Gracias, {form.nombre.split(" ")[0]}!</h3>
              <p className="text-crema/75 max-w-sm">Recibimos tu consulta. Un responsable de proyectos se va a comunicar con vos a la brevedad.</p>
              <button onClick={() => { setSent(false); setForm({ ...form, mensaje: "" }); }} className="mt-8 rounded-full border border-crema/40 px-6 py-3 hover:bg-crema/10">Enviar otra consulta</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="c-form grid sm:grid-cols-2 gap-4">
              <div><input className={inp(err.nombre)} placeholder="Nombre y apellido *" value={form.nombre} onChange={set("nombre")} />{err.nombre && <p className="text-terra-light text-xs mt-1 ml-3">Ingresá tu nombre</p>}</div>
              <div><input className={inp(err.email)} placeholder="Email *" type="email" value={form.email} onChange={set("email")} />{err.email && <p className="text-terra-light text-xs mt-1 ml-3">Email inválido</p>}</div>
              <input className={inp()} placeholder="Teléfono" value={form.tel} onChange={set("tel")} />
              <select className={inp() + " [&>option]:text-verde"} value={form.org} onChange={set("org")}>
                {["Desarrollador privado", "Institución", "Organismo público", "Productor / consorcio", "Otro"].map((o) => <option key={o}>{o}</option>)}
              </select>
              <div className="sm:col-span-2">
                <p className="text-sm text-crema/70 mb-2 ml-1">Servicio de interés</p>
                <div className="flex flex-wrap gap-2">
                  {servicios.map((s) => (
                    <button type="button" key={s.id} onClick={() => setForm({ ...form, servicio: s.titulo })} className={`rounded-full px-4 py-2 text-sm border transition ${form.servicio === s.titulo ? "bg-terra border-terra" : "border-crema/25 hover:border-terra-light"}`}>{s.titulo}</button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2"><textarea rows={4} className={inp(err.mensaje) + " resize-none rounded-[1.5rem]"} placeholder="Contanos sobre tu proyecto: ubicación, superficie, plazos... *" value={form.mensaje} onChange={set("mensaje")} />{err.mensaje && <p className="text-terra-light text-xs mt-1 ml-3">Contanos un poco más (mín. 10 caracteres)</p>}</div>
              <button className="sm:col-span-2 group rounded-full bg-terra py-4 font-semibold hover:bg-crema hover:text-verde transition inline-flex justify-center items-center gap-2">Enviar consulta <span className="group-hover:translate-x-1 transition">→</span></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-verde-dark text-crema/80">
      <Wave fill="#26352E" flip />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-6 flex flex-col md:flex-row justify-between gap-6 items-center">
        <a href="#inicio" className="flex items-center gap-2 font-display text-2xl text-crema"><span className="w-8 h-8 blob bg-terra grid place-items-center text-base">P</span>Penicó</a>
        <p className="text-sm text-center">Desarrollo urbano e infraestructura · Mendoza, Argentina</p>
        <p className="text-sm">© {new Date().getFullYear()} Penicó</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [serv, setServ] = useState<Servicio | null>(null);
  const [obra, setObra] = useState<Obra | null>(null);
  const [preServ, setPreServ] = useState("");
  const consultar = (t: string) => { setPreServ(t); setServ(null); setObra(null); setTimeout(() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }), 50); };
  return (
    <>
      <Nav />
      <Hero />
      <Servicios onOpen={setServ} />
      <Obras onOpen={setObra} />
      <Nosotros />
      <Proceso />
      <Contacto servicioInicial={preServ} />
      <Footer />

      <Modal open={!!serv} onClose={() => setServ(null)}>
        {serv && (<>
          <img src={serv.img} alt={serv.titulo} className="w-full h-56 md:h-72 object-cover rounded-b-[50%_3rem]" />
          <div className="p-8 md:p-10">
            <h3 className="font-display text-3xl md:text-4xl mb-4">{serv.titulo}</h3>
            <p className="text-verde/80 mb-6">{serv.largo}</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {serv.items.map((it) => <li key={it} className="flex gap-3 items-center rounded-full bg-arena/70 px-4 py-2.5 text-sm"><span className="w-2 h-2 rounded-full bg-terra" />{it}</li>)}
            </ul>
            <button onClick={() => consultar(serv.titulo)} className="rounded-full bg-terra text-crema px-7 py-3.5 font-semibold hover:bg-verde transition">Consultar por este servicio →</button>
          </div>
        </>)}
      </Modal>

      <Modal open={!!obra} onClose={() => setObra(null)}>
        {obra && (<>
          <img src={obra.img} alt={obra.nombre} className="w-full h-60 md:h-80 object-cover rounded-b-[3rem_50%]" />
          <div className="p-8 md:p-10">
            <span className="rounded-full bg-terra text-crema text-xs font-bold px-3 py-1">{obra.cat}</span>
            <h3 className="font-display text-3xl md:text-4xl mt-4">{obra.nombre}</h3>
            <p className="text-verde/60 mb-5">{obra.lugar} · {obra.anio}</p>
            <p className="text-verde/80 mb-6">{obra.desc}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {obra.datos.map((d) => <div key={d} className="blob2 bg-arena/70 p-4 text-center text-sm font-semibold grid place-items-center aspect-[4/3]">{d}</div>)}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-8"><p><b>Cliente:</b> {obra.cliente}</p><p><b>Escala:</b> {obra.superficie}</p></div>
            <button onClick={() => consultar(obra.cat === "Riego" ? "Infraestructura de riego" : obra.cat === "Redes" ? "Redes de servicios" : obra.cat === "Gestión" ? "Gestión integral de proyectos" : "Urbanización integral")} className="rounded-full bg-terra text-crema px-7 py-3.5 font-semibold hover:bg-verde transition">Quiero un proyecto similar →</button>
          </div>
        </>)}
      </Modal>
    </>
  );
}
