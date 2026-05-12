import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   LABORATORIO CLÍNICO — PLATAFORMA EDUCATIVA INTEGRAL v3
   5 Áreas · 13+ Libros Integrados · Slides/Flashcards/Quiz/Flujo
   ═══════════════════════════════════════════════════════════════════ */

// ─── GLOBAL STYLES ──────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Figtree:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { color-scheme: dark; }
  body { background: #05070d; overflow-x: hidden; }

  .platform { font-family: 'Figtree', sans-serif; background: #05070d; min-height: 100vh; color: #dde2ef; position: relative; }
  .platform::before { content:''; position:fixed; inset:0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0); background-size:28px 28px; pointer-events:none; z-index:0; }

  .serif { font-family: 'Instrument Serif', Georgia, serif; }
  .mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

  .header { position:relative; z-index:10; padding:24px 16px 18px; text-align:center; transition:background .4s; }

  .area-nav { display:flex; overflow-x:auto; scrollbar-width:none; background:rgba(0,0,0,0.5); backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.06); position:sticky; top:0; z-index:20; }
  .area-nav::-webkit-scrollbar { display:none; }
  .area-btn { flex:none; padding:13px 16px; background:transparent; border:none; border-bottom:2px solid transparent; cursor:pointer; font-family:'Figtree',sans-serif; font-weight:600; font-size:12px; color:rgba(255,255,255,0.38); white-space:nowrap; transition:color .2s, border-color .2s; display:flex; align-items:center; gap:6px; }
  .area-btn.active { color:var(--c); border-bottom-color:var(--c); }
  .area-btn:hover:not(.active) { color:rgba(255,255,255,0.65); }

  .tab-nav { display:flex; gap:6px; padding:10px 14px; background:rgba(0,0,0,0.3); border-bottom:1px solid rgba(255,255,255,0.05); overflow-x:auto; scrollbar-width:none; flex-wrap:wrap; }
  .tab-nav::-webkit-scrollbar { display:none; }
  .tab-btn { flex:none; padding:7px 14px; border-radius:100px; border:1.5px solid; font-family:'Figtree',sans-serif; font-weight:700; font-size:11px; cursor:pointer; white-space:nowrap; transition:all .2s; display:flex; align-items:center; gap:5px; }
  .tab-btn.active { background:var(--c); border-color:var(--c); color:#fff; }
  .tab-btn:not(.active) { background:transparent; border-color:rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); }
  .tab-btn:not(.active):hover { border-color:rgba(255,255,255,0.25); color:rgba(255,255,255,0.7); }
  .tab-cnt { font-family:'JetBrains Mono',monospace; font-size:9px; padding:1px 5px; border-radius:100px; }
  .tab-btn.active .tab-cnt { background:rgba(255,255,255,0.22); }
  .tab-btn:not(.active) .tab-cnt { background:rgba(255,255,255,0.07); }

  .content { max-width:760px; margin:0 auto; padding:18px 13px 48px; position:relative; z-index:1; }

  .slide, .fc-card, .quiz-card { border-radius:18px; padding:24px; color:#fff; position:relative; overflow:hidden; }
  .slide-bg { position:absolute; inset:0; border-radius:18px; }
  .slide-glow { position:absolute; top:-40px; right:-40px; width:220px; height:220px; border-radius:50%; filter:blur(60px); opacity:.35; }
  .slide-content { position:relative; z-index:2; }
  .slide-nav { display:flex; justify-content:space-between; align-items:center; margin-top:14px; }
  .slide-dot { width:8px; height:8px; border-radius:50%; border:none; cursor:pointer; padding:0; transition:all .25s; }
  .btn-prev, .btn-next { padding:7px 18px; border-radius:100px; font-family:'Figtree',sans-serif; font-weight:700; font-size:12px; cursor:pointer; transition:all .2s; }

  .fc-wrap { perspective:1200px; cursor:pointer; min-height:210px; }
  .fc-inner { transition:transform .55s cubic-bezier(.4,0,.2,1); transform-style:preserve-3d; position:relative; min-height:210px; }
  .fc-inner.flipped { transform:rotateY(180deg); }
  .fc-face { border-radius:16px; padding:22px; min-height:210px; backface-visibility:hidden; -webkit-backface-visibility:hidden; position:absolute; width:100%; top:0; left:0; }
  .fc-back { transform:rotateY(180deg); }

  .quiz-card { border-radius:16px; overflow:hidden; }
  .quiz-header { padding:11px 16px; display:flex; justify-content:space-between; align-items:center; }
  .quiz-body { padding:20px; }
  .quiz-opt { display:block; width:100%; text-align:left; border-radius:10px; padding:11px 15px; margin-bottom:9px; cursor:pointer; font-family:'Figtree',sans-serif; font-size:12.5px; border:1.5px solid; transition:all .18s; }
  .quiz-opt:disabled { cursor:default; }
  .quiz-exp { border-radius:10px; padding:12px 15px; margin-top:6px; }
  .quiz-done { border-radius:16px; padding:32px; text-align:center; }

  .wf-step { position:relative; padding-left:56px; margin-bottom:10px; }
  .wf-dot { position:absolute; left:20px; top:15px; width:16px; height:16px; border-radius:50%; border:2px solid; transition:background .2s; }
  .wf-btn { width:100%; text-align:left; border-radius:12px; padding:13px 16px; border:1px solid; background:rgba(255,255,255,0.03); cursor:pointer; font-family:'Figtree',sans-serif; display:flex; align-items:center; gap:10px; transition:all .2s; }
  .wf-body { border-radius:0 0 12px 12px; padding:15px 17px; border:1px solid; border-top:none; font-size:12.5px; line-height:1.9; color:rgba(255,255,255,0.72); }

  .badge { display:inline-flex; align-items:center; border-radius:100px; font-size:9.5px; font-weight:700; letter-spacing:.4px; padding:3px 9px; font-family:'JetBrains Mono',monospace; }
  .divider { height:1px; background:rgba(255,255,255,0.06); margin:14px 0; }

  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  .animate-in { animation:slideUp .32s ease both; }

  .resource-card { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:14px 16px; margin-bottom:10px; transition:all .2s; }
  .resource-card:hover { border-color:rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); }
  .resource-card a { color:inherit; text-decoration:none; }
`;

// ─── AREA DEFINITIONS ────────────────────────────────────────────────
const AREAS = [
  { id:"hema",  emoji:"🩸", label:"Hematología",         color:"#f87171", rgb:"248,113,113" },
  { id:"copro", emoji:"🦠", label:"Coproanálisis",        color:"#4ade80", rgb:"74,222,128" },
  { id:"sero",  emoji:"🧫", label:"Serología",            color:"#60a5fa", rgb:"96,165,250" },
  { id:"anat",  emoji:"🔬", label:"Anatomía Patológica",  color:"#c084fc", rgb:"192,132,252" },
  { id:"quim",  emoji:"⚗️",  label:"Química Clínica",      color:"#fbbf24", rgb:"251,191,36"  },
];

// ─── EDUCATIONAL CONTENT ────────────────────────────────────────────
const SLIDES = {
  hema:[
    { n:"01", title:"Hemograma Completo (CBC)", src:"McKenzie 3rd Ed · Bishop 8th Ed",
      items:["🩸 Eritrocitos: 4.5–5.5 ×10⁶/µL (H) · 4.0–5.0 ×10⁶/µL (M)","🩺 Hemoglobina: 13.5–17.5 g/dL (H) · 12.0–15.5 g/dL (M)","📊 Hematocrito: 41–53% (H) · 36–46% (M)","🔵 VCM: 80–100 fL · CHCM: 32–36 g/dL · HCM: 27–33 pg","⚪ Leucocitos: 4,500–11,000/µL · Plaquetas: 150,000–400,000/µL","🔁 Reticulocitos: 0.5–2.5% (indicador de actividad eritropoyética)"],
      nota:"💡 RDW (anisocitosis) + VCM bajo = IDA. RDW normal + VCM bajo = talasemia.",
      grad:"linear-gradient(135deg,#7f1d1d 0%,#991b1b 50%,#7c2d12 100%)" },
  ],
  copro:[], sero:[], anat:[], quim:[]
};

const FC = {
  hema:[
    {q:"¿Cuáles son las 4 características morfológicas del blast cell?",a:"1️⃣ Tamaño mediano-grande\n2️⃣ Alta relación N:C\n3️⃣ Núcleo redondo con cromatina FINA\n4️⃣ Citoplasma basófilo escaso",tip:"🔴 Bastones de Auer en gavilla = APL = EMERGENCIA"}
  ],
  copro:[], sero:[], anat:[], quim:[]
};

const QUIZZES = {
  hema:[], copro:[], sero:[], anat:[], quim:[]
};

const WF = {
  hema:{ label:"🩸 CBC: Solicitud → Reporte", color:"#f87171", steps:[
    {n:1,ic:"📋",t:"Solicitud e Identificación",c:"Verificar 3 datos. Indicación clínica. Medicamentos que interfieren."},
    {n:2,ic:"🩸",t:"Toma de Muestra",c:"Tubo EDTA lila. Orden CLSI. Inversión suave 8-10x. Rechazar hemolizada."},
  ]},
  copro:{}, sero:{}, anat:{}, quim:{}
};

const VIDEOS = {
  hema:[
    {t:"Dr. A's Clinical Lab Videos",u:"https://www.youtube.com/c/DrAsClinicalLabVideos",l:"EN",n:"CBC, frotis, hemostasia — orientado a MLT/MLS"},
    {t:"Osmosis — Hematology",u:"https://www.osmosis.org/",l:"EN/ES",n:"Animaciones de patofisiología hematológica"},
  ],
  copro:[], sero:[], anat:[], quim:[]
};

const BOOKS = [
  {
    id: "lab-guide", area: "hema",
    title: "Laboratory Guide to Clinical Hematology",
    authors: "Villatoro & To", year: 2019, pages: 302,
    icon: "🆓", tag: "OPEN ACCESS", color: "#059669",
    description: "Guía completa de hematología clínica con morfología normal y patológica.",
    license: "CC BY-NC 4.0 — GRATIS",
    url: "https://open.umn.edu/opentextbooks/textbooks/772"
  },
  {
    id: "color-atlas", area: "hema",
    title: "Color Atlas of Hematology",
    authors: "Theml, Diem, Haferlach", year: 2004, pages: 209,
    icon: "🖼️", tag: "ATLAS VISUAL", color: "#7c3aed",
    description: "262 ilustraciones a color con diagnóstico morfológico.",
    license: "Comercial"
  },
  {
    id: "mindray", area: "hema",
    title: "Blood Cell Atlas — MC-80",
    authors: "Mindray", year: 2022, pages: 50,
    icon: "🆓", tag: "GRATIS", color: "#0891b2",
    description: "Fotografías reales del analizador MC-80 con tinción Romanovsky.",
    license: "Descargable gratis",
    url: "https://www.mindray.com/"
  },
  {
    id: "stevens-miller", area: "sero",
    title: "Clinical Immunology and Serology, 4th Ed.",
    authors: "Stevens & Miller", year: 2017, pages: 577,
    icon: "🧫", tag: "SEROLOGÍA", color: "#1d4ed8",
    description: "Texto principal para estudiantes de laboratorio clínico de 2-4 años.",
    license: "Comercial — ISBN 978-0-8036-4466-3"
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────

function SlideDeck({ area }){
  const slides = SLIDES[area.id] || [];
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [area.id]);
  const s = slides[i];
  if(!s) return <div style={{padding: 20, textAlign: "center", color: "rgba(255,255,255,0.3)"}}>Sin diapositivas disponibles aún</div>;
  
  return(
    <div className="animate-in">
      <div className="slide" style={{background:"rgba(5,7,13,0.8)",border:`1px solid ${area.color}28`}}>
        <div className="slide-bg" style={{background:`linear-gradient(135deg, rgba(5,7,13,0.95), rgba(15,20,35,0.9))`}}/>
        <div className="slide-glow" style={{background:area.color}}/>
        <div className="slide-content">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div className="mono" style={{fontSize:9,color:area.color,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>
                {s.n} / {slides.length} · {s.src}
              </div>
              <div className="serif" style={{fontSize:20,lineHeight:1.25,color:"#fff"}}>{s.title}</div>
            </div>
          </div>
          <ul style={{listStyle:"none",margin:0,padding:0}}>
            {s.items.map((item,j)=>(
              <li key={j} style={{fontSize:12.5,color:"rgba(255,255,255,0.84)",marginBottom:6,lineHeight:1.6}}>{item}</li>
            ))}
          </ul>
          <div style={{marginTop:14,background:`rgba(${area.rgb},0.08)`,border:`1px solid rgba(${area.rgb},0.25)`,borderRadius:10,padding:"10px 14px",fontSize:11.5,color:`rgba(${area.rgb},0.95)`,lineHeight:1.6}}>{s.nota}</div>
        </div>
      </div>
      <div className="slide-nav">
        <button className="btn-prev" disabled={i===0} onClick={()=>setI(x=>x-1)} style={{border:`1.5px solid ${i===0?"rgba(255,255,255,0.08)":area.color}`,background:"transparent",color:i===0?"rgba(255,255,255,0.2)":area.color}}>← Anterior</button>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {slides.map((_,j)=><button key={j} className="slide-dot" onClick={()=>setI(j)} style={{width:j===i?20:7,background:j===i?area.color:"rgba(255,255,255,0.18)"}}/>) }
        </div>
        <button className="btn-next" disabled={i===slides.length-1} onClick={()=>setI(x=>x+1)} style={{background:i===slides.length-1?"rgba(255,255,255,0.05)":area.color,color:i===slides.length-1?"rgba(255,255,255,0.2)":"#fff",border:"none"}}>Siguiente →</button>
      </div>
    </div>
  );
}

function FlashcardDeck({ area }){
  const cards = FC[area.id] || [];
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setI(0); setFlipped(false); }, [area.id]);
  const card = cards[i];
  if(!card) return <div style={{padding: 20, textAlign: "center", color: "rgba(255,255,255,0.3)"}}>Sin flashcards disponibles aún</div>;
  
  return(
    <div className="animate-in">
      <div className="mono" style={{textAlign:"center",fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>
        {String(i+1).padStart(2,"0")} / {String(cards.length).padStart(2,"0")} · TOCA PARA VOLTEAR
      </div>
      <div className="fc-wrap" onClick={()=>setFlipped(f=>!f)}>
        <div className={`fc-inner${flipped?" flipped":""}`}>
          <div className="fc-face" style={{background:"rgba(8,11,20,0.95)",border:`1px solid rgba(${area.rgb},0.35)`}}>
            <div className="mono" style={{fontSize:9,color:area.color,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>PREGUNTA</div>
            <div style={{fontSize:14,fontWeight:600,color:"#e8eaf0",lineHeight:1.7}}>{card.q}</div>
            <div style={{marginTop:20,textAlign:"center",fontSize:10,color:"rgba(255,255,255,0.2)"}}>👆 Toca para voltear</div>
          </div>
          <div className="fc-face fc-back" style={{background:`linear-gradient(135deg, rgba(${area.rgb},0.1), rgba(${area.rgb},0.04))`,border:`1.5px solid rgba(${area.rgb},0.45)`}}>
            <div className="mono" style={{fontSize:9,color:area.color,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>✓ RESPUESTA</div>
            <div style={{fontSize:12.5,color:"#d4d8e8",lineHeight:1.85,whiteSpace:"pre-line"}}>{card.a}</div>
            <div style={{marginTop:14,background:"rgba(0,0,0,0.35)",border:`1px solid rgba(${area.rgb},0.3)`,borderRadius:10,padding:"10px 13px",fontSize:11.5,color:area.color,lineHeight:1.6}}>{card.tip}</div>
          </div>
        </div>
      </div>
      <div className="slide-nav">
        <button className="btn-prev" disabled={i===0} onClick={e=>{e.stopPropagation();setI(x=>x-1);setFlipped(false);}} style={{border:`1.5px solid ${i===0?"rgba(255,255,255,0.08)":area.color}`,background:"transparent",color:i===0?"rgba(255,255,255,0.2)":area.color}}>← Anterior</button>
        <div style={{display:"flex",gap:5}}>{cards.map((_,j)=><button key={j} onClick={e=>{e.stopPropagation();setI(j);setFlipped(false);}} style={{width:j===i?18:6,height:6,borderRadius:100,border:"none",background:j===i?area.color:"rgba(255,255,255,0.15)",cursor:"pointer",padding:0}}/>)}</div>
        <button className="btn-next" disabled={i===cards.length-1} onClick={e=>{e.stopPropagation();setI(x=>x+1);setFlipped(false);}} style={{background:i===cards.length-1?"rgba(255,255,255,0.04)":area.color,color:i===cards.length-1?"rgba(255,255,255,0.2)":"#fff",border:"none"}}>Siguiente →</button>
      </div>
    </div>
  );
}

function QuizDeck({ area }){
  const questions = QUIZZES[area.id] || [];
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => { setCur(0); setSel(null); setScore(0); setDone(false); }, [area.id]);
  
  if(questions.length === 0) return <div style={{padding: 20, textAlign: "center", color: "rgba(255,255,255,0.3)"}}>Sin quiz disponible aún</div>;

  const q = questions[cur];
  const handle = (i) => { if(sel!==null)return; setSel(i); if(i===q.a)setScore(s=>s+1); };
  const next = () => { if(cur<questions.length-1){ setCur(c=>c+1); setSel(null); } else setDone(true); };
  const restart = () => { setCur(0); setSel(null); setScore(0); setDone(false); };
  const pct = score / questions.length;

  if(done) return(
    <div className="quiz-done animate-in" style={{background:"rgba(8,11,20,0.95)",border:`1px solid rgba(${area.rgb},0.3)`}}>
      <div style={{fontSize:56,marginBottom:12}}>{pct===1?"🏆":pct>=.8?"🎓":"📚"}</div>
      <div className="serif" style={{fontSize:40,color:area.color,marginBottom:8}}>{score}/{questions.length}</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:20}}>
        {pct===1?"¡Dominio total!":pct>=.8?"¡Muy bien!":"Revisa los temas"}
      </div>
      <button onClick={restart} style={{background:area.color,color:"#fff",border:"none",borderRadius:100,padding:"12px 32px",fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"Figtree"}}>🔄 Repetir</button>
    </div>
  );

  return(
    <div className="quiz-card animate-in" style={{background:"rgba(8,11,20,0.95)",border:`1px solid rgba(${area.rgb},0.3)`}}>
      <div className="quiz-header" style={{background:`rgba(${area.rgb},0.12)`,borderBottom:`1px solid rgba(${area.rgb},0.2)`}}>
        <span className="mono" style={{fontSize:10,color:area.color}}>P {cur+1} / {questions.length}</span>
        <span className="mono" style={{fontSize:10,color:area.color}}>✓ {score} PTS</span>
      </div>
      <div className="quiz-body">
        <div style={{fontWeight:600,fontSize:14,color:"#e8eaf0",marginBottom:18}}>{q.q}</div>
        {q.ops.map((op,i)=>{
          let bg="rgba(255,255,255,0.035)",bc="rgba(255,255,255,0.08)",clr="rgba(255,255,255,0.72)";
          if(sel!==null){
            if(i===q.a){bg="rgba(74,222,128,0.12)";bc="rgba(74,222,128,0.55)";clr="#86efac";}
            else if(i===sel&&sel!==q.a){bg="rgba(248,113,113,0.1)";bc="rgba(248,113,113,0.5)";clr="#fca5a5";}
          }
          return(
            <button key={i} className="quiz-opt" onClick={()=>handle(i)} disabled={sel!==null} style={{background:bg,borderColor:bc,color:clr}}>
              <span className="mono" style={{marginRight:10,fontSize:10,opacity:.65}}>
                {String.fromCharCode(65+i)}.
              </span>{op}
            </button>
          );
        })}
        {sel!==null&&(
          <div className="quiz-exp" style={{background:"rgba(251,191,36,0.07)",border:"1px solid rgba(251,191,36,0.25)"}}>
            <div className="mono" style={{fontSize:9,color:"#fbbf24",marginBottom:8}}>💡 EXPLICACIÓN</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.68)"}}>{q.exp}</div>
          </div>
        )}
        {sel!==null&&(
          <button onClick={next} style={{marginTop:14,background:area.color,color:"#fff",border:"none",borderRadius:100,padding:"11px 24px",fontWeight:700,cursor:"pointer",width:"100%",fontFamily:"Figtree"}}>
            {cur<questions.length-1?"Siguiente →":"Ver resultado 🎓"}
          </button>
        )}
      </div>
    </div>
  );
}

function WorkflowDeck({ area }){
  const wf = WF[area.id];
  const [open, setOpen] = useState(null);
  if(!wf) return <div style={{padding: 20, textAlign: "center", color: "rgba(255,255,255,0.3)"}}>Sin flujo disponible aún</div>;
  
  return(
    <div className="animate-in">
      <div style={{background:`rgba(${area.rgb},0.07)`,border:`1px solid rgba(${area.rgb},0.22)`,borderRadius:12,padding:"11px 14px",marginBottom:16,fontSize:12,color:"rgba(255,255,255,0.65)"}}>
        ⚙️ Flujo completo en <strong style={{color:area.color}}>{wf.steps.length} pasos</strong>
      </div>
      <div style={{position:"relative",paddingLeft:22}}>
        <div style={{position:"absolute",left:14,top:14,bottom:14,width:1,background:`linear-gradient(to bottom, ${area.color}, rgba(${area.rgb},0.1))`}}/>
        {wf.steps.map((step,i)=>(
          <div key={i} className="wf-step">
            <div className="wf-dot" style={{borderColor:area.color,background:open===i?area.color:"#05070d"}}/>
            <button className="wf-btn" onClick={()=>setOpen(open===i?null:i)} style={{borderColor:open===i?`rgba(${area.rgb},0.45)`:"rgba(255,255,255,0.07)",background:open===i?`rgba(${area.rgb},0.08)`:"rgba(255,255,255,0.025)"}}>
              <span className="mono" style={{fontSize:10,color:area.color}}>{String(step.n).padStart(2,"0")}</span>
              <span style={{fontSize:17}}>{step.ic}</span>
              <span style={{fontWeight:600,fontSize:13,color:open===i?"#fff":"rgba(255,255,255,0.78)",flex:1}}>{step.t}</span>
            </button>
            {open===i&&(
              <div className="wf-body" style={{borderColor:`rgba(${area.rgb},0.25)`,background:`linear-gradient(135deg,rgba(${area.rgb},0.08),rgba(${area.rgb},0.03))`}}>
                {step.c}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesSection({ area }){
  const areaBooks = BOOKS.filter(b => b.area === area.id);
  const areaVideos = VIDEOS[area.id] || [];
  
  return(
    <div className="animate-in">
      {areaBooks.length > 0 && (
        <>
          <div className="mono" style={{fontSize:9,color:area.color,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>📚 LIBROS INTEGRADOS</div>
          {areaBooks.map(book => (
            <div key={book.id} className="resource-card">
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:18}}>{book.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#fff"}}>{book.title}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{book.authors} · {book.year}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:6}}>{book.description}</div>
                  {book.url && <a href={book.url} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:area.color,fontWeight:700,marginTop:8,display:"inline-block"}}>🔗 Acceder →</a>}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      
      {areaVideos.length > 0 && (
        <>
          <div className="mono" style={{fontSize:9,color:area.color,letterSpacing:3,textTransform:"uppercase",marginBottom:12,marginTop:20}}>📹 VIDEOS RECOMENDADOS</div>
          {areaVideos.map((video, i) => (
            <div key={i} className="resource-card">
              <div style={{fontWeight:700,fontSize:13,color:"#fff"}}>{video.t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{video.l}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:6}}>{video.n}</div>
              <a href={video.u} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:area.color,fontWeight:700,marginTop:8,display:"inline-block"}}>🔗 Ver →</a>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════

const TABS = [
  {id:"slides", label:"Diapositivas", icon:"📊"},
  {id:"flashcards", label:"Flashcards", icon:"🃏"},
  {id:"quiz", label:"Quiz", icon:"🧠"},
  {id:"flujo", label:"Flujo", icon:"⚙️"},
  {id:"recursos", label:"Recursos", icon:"📚"},
];

export default function App(){
  const [areaId, setAreaId] = useState("hema");
  const [tabId, setTabId] = useState("slides");
  const area = AREAS.find(a => a.id === areaId);

  return(
    <div className="platform">
      <style>{GLOBAL_CSS}</style>

      {/* HEADER */}
      <div className="header" style={{background:`linear-gradient(180deg, rgba(${area.rgb},0.12) 0%, transparent 100%)`}}>
        <div className="mono" style={{fontSize:8,color:`rgba(${area.rgb},0.5)`,letterSpacing:4,textTransform:"uppercase",marginBottom:5}}>
          LABORATORIO CLÍNICO v3 · 13+ LIBROS INTEGRADOS
        </div>
        <div style={{fontSize:32,lineHeight:1,marginBottom:4}}>{area.emoji}</div>
        <div className="serif" style={{fontSize:22,color:"#fff",marginBottom:3}}>{area.label}</div>
        <div className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.28)",letterSpacing:2}}>SLIDES · FLASHCARDS · QUIZ · FLUJO · RECURSOS</div>
      </div>

      {/* AREA NAV */}
      <nav className="area-nav">
        {AREAS.map(a=>(
          <button key={a.id} className={`area-btn${areaId===a.id?" active":""}`} style={{"--c":a.color}} onClick={()=>{setAreaId(a.id);setTabId("slides");}}>
            <span>{a.emoji}</span><span>{a.label}</span>
          </button>
        ))}
      </nav>

      {/* TAB NAV */}
      <nav className="tab-nav">
        {TABS.map(t=>(
          <button key={t.id} className={`tab-btn${tabId===t.id?" active":""}`} style={{"--c":area.color}} onClick={()=>setTabId(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <div className="content">
        {tabId==="slides"&&<SlideDeck area={area}/>}
        {tabId==="flashcards"&&<FlashcardDeck area={area}/>}
        {tabId==="quiz"&&<QuizDeck area={area}/>}
        {tabId==="flujo"&&<WorkflowDeck area={area}/>}
        {tabId==="recursos"&&<ResourcesSection area={area}/>}

        {/* FOOTER */}
        <div style={{marginTop:40,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}>
          <div className="mono" style={{fontSize:8,color:"rgba(255,255,255,0.14)",letterSpacing:1,lineHeight:2}}>
            v3 · Plataforma Educativa Definitiva · Laboratorio Clínico 2025
          </div>
        </div>
      </div>
    </div>
  );
}
