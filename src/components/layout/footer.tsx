"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, Heart } from "lucide-react";
import { STORE_NAME, INSTAGRAM_URL, NAV_LINKS } from "@/lib/constants";
import { toast } from "sonner";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Preencha o e-mail");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Inscrito com sucesso!");
        setEmail("");
      } else {
        toast.error(data.error || "Erro ao inscrever");
      }
    } catch (err) {
      toast.error("Erro na conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">Newsletter</p>
            <h3 className="font-heading text-2xl lg:text-3xl font-semibold mb-3">Fique por dentro</h3>
            <p className="text-sm text-white/60 mb-8">
              Receba em primeira mão nossas novidades, promoções exclusivas e inspirações de moda.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto" id="newsletter-form">
              <input type="email" placeholder="Seu melhor e-mail" required
                value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}
                className="flex-1 px-5 py-3 bg-white/10 border border-white/15 rounded-2xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
                id="newsletter-email" />
              <button type="submit" disabled={loading}
                className="px-6 py-3 bg-brand text-white rounded-2xl text-sm font-medium hover:bg-brand/90 transition-colors whitespace-nowrap disabled:opacity-50"
                id="newsletter-submit">
                {loading ? "Enviando..." : "Inscrever"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <h4 className="font-heading text-xl font-semibold tracking-tight">TAYNA XAVIER</h4>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/50">Boutique</p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Curadoria exclusiva de peças que traduzem sofisticação e feminilidade.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="p-2.5 bg-white/10 rounded-xl hover:bg-brand transition-all duration-300" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="mailto:contato@taynaxavier.com.br"
                className="p-2.5 bg-white/10 rounded-xl hover:bg-brand transition-all duration-300" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">Loja</h5>
            <ul className="space-y-3">
              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">Ajuda</h5>
            <ul className="space-y-3">
              <li><Link href="/politica-de-troca" className="text-sm text-white/70 hover:text-white transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/politica-de-envio" className="text-sm text-white/70 hover:text-white transition-colors">Política de Envio</Link></li>
              <li><Link href="/politica-de-privacidade" className="text-sm text-white/70 hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/termos" className="text-sm text-white/70 hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link href="/faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-5 font-medium">Contato</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-brand" />
                <div><p className="text-sm text-white/70">(00) 00000-0000</p><p className="text-xs text-white/40">WhatsApp</p></div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-brand" />
                <p className="text-sm text-white/70">contato@taynaxavier.com.br</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} {STORE_NAME}. Todos os direitos reservados.</p>
            <div className="flex items-center gap-1 text-xs text-white/40">
              Feito com <Heart className="w-3 h-3 text-brand mx-1 fill-brand" /> no Brasil
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
