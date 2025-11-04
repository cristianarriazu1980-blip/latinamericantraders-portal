
'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Rss, BarChart3, Clock, Shield, Newspaper, Mail, Send, ExternalLink, Settings } from "lucide-react";
import Image from "next/image";

/**
 * latinamericantraders.com — Info Portal MVP
 * Sitio informativo con: quotes demo, news demo, calendario demo y formulario para academias.
 */

export default function LATPortal() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopNav />
      <Hero />
      <DataProvidersCard />
      <section id="markets" className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <Header title="Mercados en tiempo (casi) real" subtitle="Forex, cripto, commodities e índices sintéticos (educativo)." icon={<BarChart3 className="w-6 h-6" />} />
          <div className="grid md:grid-cols-12 gap-6 mt-8">
            <div className="md:col-span-8 space-y-6">
              <QuoteBoard />
              <DerivSyntheticTicker />
            </div>
            <aside className="md:col-span-4 space-y-6">
              <EconCalendarCard />
              <ComplianceCard />
            </aside>
          </div>
        </div>
      </section>

      <section id="news" className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <Header title="Noticias clave del día" subtitle="Titulares filtrados por relevancia para traders de LATAM." icon={<Newspaper className="w-6 h-6" />} />
          <NewsFeed />
        </div>
      </section>

      <section id="hub" className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <Header title="Publicar academias y clases" subtitle="Enviá tu propuesta para aparecer en el directorio." icon={<Send className="w-6 h-6" />} />
          <EducatorsForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
      <div className="flex items-center gap-2">
  <Image
    src="/logo_primary.svg"
    alt="Latin American Traders"
    width={32}
    height={32}
  />
  <span className="font-semibold text-sm sm:text-base text-slate-900">
    latinamericantraders.com
  </span>
</div>

    </header>
  );
}

function Hero() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Información diaria para traders de <span className="bg-yellow-200 px-2 rounded">Latinoamérica</span>
          </h1>
          <p className="mt-5 text-lg text-gray-700">Cotizaciones, calendario económico y titulares relevantes, en un solo lugar. Sin señales ni promesas: datos, contexto y disciplina.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Pill icon={<Globe2 className="w-3.5 h-3.5" />}>Forex, Cripto, Commodities</Pill>
            <Pill icon={<Clock className="w-3.5 h-3.5" />}>Actualización frecuente</Pill>
            <Pill icon={<Shield className="w-3.5 h-3.5" />}>Contenido educativo</Pill>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Rss className="w-5 h-5" />
              <h3 className="font-semibold">Últimos titulares</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Ejemplo de feed (se conecta en producción a tu proveedor de noticias).</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-900" /> Reservas FED y empleo en foco esta semana</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-900" /> Petróleo recorta ganancias tras datos de inventarios</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-900" /> Dólar mixto: EUR/USD lateral tras PMI</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Header({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <a href="#providers" className="text-sm underline flex items-center gap-1"><Settings className="w-4 h-4" /> Fuentes</a>
    </div>
  );
}

type Quote = { symbol: string; price: number; change: number; time: number };

/** QuoteBoard — demo quotes que se actualizan cada 30s */
function QuoteBoard() {
  const [symbols] = useState<string[]>(["EURUSD", "XAUUSD", "BTCUSD", "USOIL"]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        // MOCK para demo: reemplazar por fetch('/api/quotes?...')
        const mock: Record<string, Quote> = {
          EURUSD: { symbol: "EURUSD", price: 1.0725, change: -0.0008, time: Date.now() },
          XAUUSD: { symbol: "XAUUSD", price: 2365.2, change: 4.3, time: Date.now() },
          BTCUSD: { symbol: "BTCUSD", price: 67350, change: -120, time: Date.now() },
          USOIL: { symbol: "USOIL", price: 79.12, change: 0.35, time: Date.now() },
        };
        if (mounted) setQuotes(mock);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Citas rápidas</h3>
        <div className="text-xs text-gray-500">Actualiza cada 30s</div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {symbols.map((s) => (
          <QuoteTile key={s} q={quotes[s]} loading={loading} />
        ))}
      </div>
    </div>
  );
}

function QuoteTile({ q, loading }: { q?: Quote; loading: boolean }) {
  const pos = (q?.change ?? 0) >= 0;
  return (
    <div className="rounded-xl border p-4 bg-white">
      <div className="text-xs text-gray-500">{q?.symbol || "—"}</div>
      <div className="mt-1 text-xl font-bold tracking-tight">{loading ? "…" : q ? q.price.toLocaleString() : "—"}</div>
      <div className={`text-xs mt-1 ${pos ? "text-green-600" : "text-red-600"}`}>{q ? (pos ? "+" : "") + q.change.toFixed(4) : ""}</div>
      <div className="text-[10px] text-gray-400 mt-1">{q ? new Date(q.time).toLocaleTimeString() : ""}</div>
    </div>
  );
}

/** DerivSyntheticTicker — demo (mock). Reemplazar por WebSocket Deriv en producción */
function DerivSyntheticTicker() {
  const [last, setLast] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("Desconectado");
  const wsRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    setStatus("Conectado (demo)");
    let mock = 10000;
    const id = setInterval(() => { mock += (Math.random() - 0.5) * 20; setLast(Math.max(1, mock)); }, 1000);
    wsRef.current = { close: () => clearInterval(id) };
    return () => { wsRef.current?.close(); };
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Índices sintéticos (Deriv) — Demo</h3>
        <span className="text-xs text-gray-500">Estado: {status}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Ejemplo con BOOM/CRASH vía WebSocket. En producción se conecta a la Deriv API.</p>
      <div className="text-3xl font-bold">{last ? last.toFixed(2) : "—"}</div>
      <div className="text-[11px] text-gray-500 mt-1">Valores de ejemplo. No es precio real-time.</div>
    </div>
  );
}

/** EconCalendarCard — placeholder */
function EconCalendarCard() {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4" /><h3 className="font-semibold">Calendario económico</h3></div>
      <ul className="text-sm space-y-2">
        <li>🇺🇸 NFP — Vie 09:30 (consenso: 175k)</li>
        <li>🇪🇺 IPC preliminar — Jue 07:00 (interanual: 2.5%)</li>
        <li>🇧🇷 Copom — Mié 18:00 (tasa Selic)</li>
      </ul>
      <a className="mt-3 inline-flex items-center gap-1 text-sm underline" href="#providers"><ExternalLink className="w-4 h-4" /> Ver fuentes</a>
    </div>
  );
}

function ComplianceCard() {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4" /><h3 className="font-semibold">Descargo</h3></div>
      <p className="text-sm text-gray-700">Información de carácter educativo e informativo. No constituye asesoramiento financiero ni oferta de servicios regulados. Los datos pueden retrasarse o contener errores. Hacé tu propia investigación.</p>
    </div>
  );
}

type NewsItem = { id: string; title: string; source: string; url: string; time: number };
function timeAgo(t: number) { const s = Math.floor((Date.now() - t)/1000); if (s<60) return `${s}s`; const m=Math.floor(s/60); if(m<60) return `${m}m`; const h=Math.floor(m/60); return `${h}h`; }

/** NewsFeed — demo */
function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  useEffect(() => {
    const mock: NewsItem[] = [
      { id: "1", title: "FED y empleo: mercados expectantes", source: "Agency", url: "#", time: Date.now() - 3600e3 },
      { id: "2", title: "Crudo cae tras inventarios mayores", source: "Wire", url: "#", time: Date.now() - 7200e3 },
      { id: "3", title: "Real brasileño estable antes del Copom", source: "Desk", url: "#", time: Date.now() - 8200e3 },
    ];
    setItems(mock);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((n) => (
        <article key={n.id} className="rounded-2xl border p-5 bg-white">
          <div className="text-[11px] text-gray-500 flex items-center gap-1"><Rss className="w-3.5 h-3.5" /> {n.source} • {timeAgo(n.time)}</div>
          <h3 className="font-semibold mt-2 leading-snug">{n.title}</h3>
          <a href={n.url} className="mt-3 inline-flex items-center gap-1 text-sm underline">Leer <ExternalLink className="w-4 h-4" /></a>
        </article>
      ))}
    </div>
  );
}

/** Formulario para academias */
function EducatorsForm() {
  const [data, setData] = useState({ name: "", email: "", brand: "", url: "", desc: "" });
  const [ok, setOk] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOk(true);
  };
  return (
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-sm text-gray-700 mb-4">Enviá tu propuesta. Moderamos todas las publicaciones (calidad/legales). Sin promesas de resultados.</p>
      {!ok ? (
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          <Input label="Nombre" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
          <Input label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
          <Input label="Marca/Academia" value={data.brand} onChange={(v) => setData({ ...data, brand: v })} />
          <Input label="Sitio o red social" value={data.url} onChange={(v) => setData({ ...data, url: v })} />
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Descripción</label>
            <textarea className="mt-1 w-full rounded-xl border px-3 py-2" rows={4} value={data.desc} onChange={(e)=>setData({...data, desc: (e.target as HTMLTextAreaElement).value})} placeholder="Qué ofrecés, público objetivo, modalidad, precios (si aplica)"/>
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-[11px] text-gray-500">Al enviar aceptás nuestros Términos y Política de Privacidad.</div>
            <button className="px-5 py-3 rounded-xl bg-gray-900 text-white flex items-center gap-2"><Mail className="w-4 h-4" /> Enviar</button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-green-50 border text-green-700 text-sm">¡Gracias! Revisaremos tu propuesta y te contactaremos por email.</div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }:{ label: string; value: string; onChange: (v:string)=>void; type?: string }){
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} className="mt-1 w-full rounded-xl border px-3 py-2" value={value} onChange={(e)=>onChange((e.target as HTMLInputElement).value)} />
    </div>
  );
}

function DataProvidersCard(){
  return (
    <section id="providers" className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border p-6 bg-white">
          <h3 className="font-semibold flex items-center gap-2"><Settings className="w-5 h-5"/>Fuentes de datos (APIs sugeridas)</h3>
          <ul className="list-disc pl-6 text-sm text-gray-700 mt-3 space-y-1">
            <li>Forex/Cripto/Acciones: Alpha Vantage o Finnhub (usar rutas /api con caching).</li>
            <li>Calendario económico: TradingEconomics (suscripción o plan free limitado).</li>
            <li>Noticias financieras: NewsAPI / EODHD / StockNewsAPI (filtrar por relevancia LATAM).</li>
            <li>Índices sintéticos: Deriv WebSocket API (BOOM/CRASH, R_10/25/50/75/100, etc.).</li>
          </ul>
          <p className="text-[11px] text-gray-500 mt-3">Respetá los Términos de uso de cada proveedor y evita redistribución no permitida.</p>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p>© {new Date().getFullYear()} latinamericantraders.com — Información educativa. No es asesoramiento financiero.</p>
        <div className="flex gap-6">
          <a href="#" className="underline">Privacidad</a>
          <a href="#" className="underline">Términos</a>
          <a href="#" className="underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

function Pill({ children, icon }:{ children: React.ReactNode; icon?: React.ReactNode }){
  return <span className="px-2.5 py-1 rounded-full bg-gray-100 border text-gray-700 inline-flex items-center gap-1 text-xs">{icon}{children}</span>;
}
