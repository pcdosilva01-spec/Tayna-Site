"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { adminLogin } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return toast.error("Digite a senha do painel administrativo");
    
    setLoading(true);
    try {
      const res = await adminLogin(password);

      if (!res.success) {
        toast.error(res.message || "Senha incorreta");
      } else {
        toast.success("Acesso liberado!");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error("Erro ao tentar entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold tracking-tight mb-2">TAYNA XAVIER</h1>
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full">
            <p className="text-xs font-medium tracking-widest uppercase text-white/80">
              Painel Administrativo
            </p>
          </div>
        </div>

        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-zinc-800/50 rounded-2xl">
              <Lock className="w-8 h-8 text-zinc-400" />
            </div>
          </div>
          
          <h2 className="text-lg font-medium text-center mb-6">Acesso Restrito</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Senha de administrador..." 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  disabled={loading}
                  className="w-full px-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all text-center tracking-widest placeholder:tracking-normal" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Entrar no Painel <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
