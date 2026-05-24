import Link from "next/link";
import { VortLogo } from "@/components/vort-logo";

const cols = [
  { title:"Продукт", links:[
    { href:"/how",      label:"Как работает" },
    { href:"/examples", label:"Примеры" },
    { href:"/pricing",  label:"Цены" },
    { href:"/build",    label:"Builder" },
  ]},
  { title:"Стек", links:[
    { href:"https://nextjs.org",            label:"Next.js 15" },
    { href:"https://sdk.vercel.ai",         label:"Vercel AI SDK" },
    { href:"https://ollama.com",            label:"Ollama" },
    { href:"https://www.typescriptlang.org",label:"TypeScript" },
  ]},
];

export function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", background:"var(--bg-1)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 24px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:40 }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none",marginBottom:16 }}>
              <VortLogo size={30}/>
              <span style={{
                fontWeight:800, fontSize:18, letterSpacing:"-0.04em",
                background:"linear-gradient(120deg,#a78bfa,#22d3ee)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>Vort</span>
            </Link>
            <p style={{ fontSize:13, lineHeight:1.7, color:"var(--text-2)", maxWidth:260 }}>
              Опишите идею — получите готовое приложение. AI-конструктор на базе Ollama, работает локально.
            </p>
          </div>

          {/* Nav cols */}
          {cols.map(col=>(
            <div key={col.title}>
              <p style={{ fontSize:11,fontWeight:700,letterSpacing:".08em",color:"var(--text-3)",marginBottom:16,textTransform:"uppercase" }}>
                {col.title}
              </p>
              <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:10 }}>
                {col.links.map(l=>(
                  <li key={l.href}>
                    <Link href={l.href} className="link-subtle" style={{
                      fontSize:13, color:"var(--text-2)", textDecoration:"none",
                    }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop:48, paddingTop:24, borderTop:"1px solid var(--border)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <p style={{ fontSize:12, color:"var(--text-3)" }}>© 2025 Vort</p>
          <p style={{ fontSize:12, color:"var(--text-3)" }}>Powered by Ollama · Vercel AI SDK</p>
        </div>
      </div>
    </footer>
  );
}
