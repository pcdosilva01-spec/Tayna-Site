"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, QrCode, Lock, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "@/components/shared/store-provider";
import { formatPrice } from "@/utils/format";
import { BRAZIL_STATES } from "@/lib/constants";
import { toast } from "sonner";
import { createOrder } from "@/actions";

type Step = "info" | "payment" | "confirmation";

const maskCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
const maskPhone = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
const maskCEP = (v: string) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
const maskCard = (v: string) => v.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
const maskExpiry = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartContext();
  const [step, setStep] = useState<Step>("info");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", cpf: "" });
  const [address, setAddress] = useState({ cep: "", street: "", number: "", complement: "", city: "", state: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [loading, setLoading] = useState(false);

  const handleCepBlur = async () => {
    const cepDigits = address.cep.replace(/\D/g, "");
    if (cepDigits.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress(prev => ({
          ...prev,
          street: data.logradouro,
          city: data.localidade,
          state: data.uf
        }));
        toast.success("Endereço preenchido!");
      }
    } catch (err) {
      toast.error("Erro ao buscar CEP");
    }
  };

  const validateInfo = () => {
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone || !personalInfo.cpf) {
      toast.error("Preencha todos os dados pessoais obrigatórios");
      return false;
    }
    if (!address.cep || !address.street || !address.number || !address.city || !address.state) {
      toast.error("Preencha todos os dados de endereço obrigatórios");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateInfo()) setStep("payment");
  };

  const handleConfirmOrder = async () => {
    if (paymentMethod === "card") {
      if (!card.number || !card.expiry || !card.cvv || !card.name) {
        toast.error("Preencha todos os dados do cartão");
        return;
      }
    }
    setLoading(true);
    try {
      await createOrder({
        customerName: personalInfo.name,
        customerEmail: personalInfo.email,
        total
      });
      setStep("confirmation");
      clearCart();
      toast.success("Pedido confirmado com sucesso!");
    } catch (e) {
      toast.error("Houve um problema ao finalizar o pedido");
    } finally {
      setLoading(false);
    }
  };

  const shipping = subtotal >= 299 ? 0 : 19.90;
  const total = subtotal + shipping;

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h2 className="font-heading text-xl font-bold mb-2">Sacola vazia</h2>
          <p className="text-sm text-muted-foreground mb-6">Adicione produtos antes de finalizar.</p>
          <Link href="/novidades" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-2xl text-sm font-medium">
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold">Checkout</h1>
            <div className="flex items-center gap-1 mt-1">
              <Lock className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Compra segura</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { key: "info", label: "Informações" },
            { key: "payment", label: "Pagamento" },
            { key: "confirmation", label: "Confirmação" },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === s.key ? "bg-brand text-white" : 
                (s.key === "info" && step !== "info") || (s.key === "payment" && step === "confirmation") 
                  ? "bg-green-100 text-green-700" : "bg-secondary text-muted-foreground"
              }`}>
                {(s.key === "info" && step !== "info") || (s.key === "payment" && step === "confirmation")
                  ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === s.key ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === "info" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="font-heading text-lg font-semibold">Informações Pessoais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome Completo *</label>
                    <input type="text" value={personalInfo.name} onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">E-mail *</label>
                    <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Telefone *</label>
                    <input type="tel" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: maskPhone(e.target.value)})} maxLength={15} placeholder="(00) 00000-0000" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">CPF *</label>
                    <input type="text" value={personalInfo.cpf} onChange={e => setPersonalInfo({...personalInfo, cpf: maskCPF(e.target.value)})} maxLength={14} placeholder="000.000.000-00" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                </div>
                <h2 className="font-heading text-lg font-semibold pt-4">Endereço de Entrega</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground mb-1.5 block">CEP *</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" maxLength={9} placeholder="00000-000"
                      value={address.cep} onChange={e => setAddress({...address, cep: maskCEP(e.target.value)})} onBlur={handleCepBlur} /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rua *</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" 
                      value={address.street} onChange={e => setAddress({...address, street: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Número *</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" 
                      value={address.number} onChange={e => setAddress({...address, number: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Complemento</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" 
                      value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cidade *</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" 
                      value={address.city} onChange={e => setAddress({...address, city: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Estado *</label>
                    <select className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-background"
                      value={address.state} onChange={e => setAddress({...address, state: e.target.value})}>
                      <option value="">Selecione</option>
                      {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select></div>
                </div>
                <button onClick={handleNextStep}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-brand text-white rounded-2xl font-semibold text-sm hover:bg-brand/90 transition-colors mt-4">
                  Continuar para Pagamento <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="font-heading text-lg font-semibold">Método de Pagamento</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === "card" ? "border-brand bg-brand-subtle" : "border-border"}`}>
                    <CreditCard className="w-5 h-5 mb-2 text-brand" />
                    <p className="text-sm font-semibold">Cartão</p>
                    <p className="text-[10px] text-muted-foreground">Crédito ou débito</p>
                  </button>
                  <button onClick={() => setPaymentMethod("pix")}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === "pix" ? "border-brand bg-brand-subtle" : "border-border"}`}>
                    <QrCode className="w-5 h-5 mb-2 text-brand" />
                    <p className="text-sm font-semibold">Pix</p>
                    <p className="text-[10px] text-muted-foreground">Aprovação instantânea</p>
                  </button>
                </div>
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Número do Cartão *</label>
                      <input type="text" value={card.number} onChange={e => setCard({...card, number: maskCard(e.target.value)})} placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Validade *</label>
                        <input type="text" value={card.expiry} onChange={e => setCard({...card, expiry: maskExpiry(e.target.value)})} placeholder="MM/AA" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">CVV *</label>
                        <input type="text" value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value.replace(/\D/g,'').slice(0,4)})} placeholder="000" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                    </div>
                    <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome no Cartão *</label>
                      <input type="text" value={card.name} onChange={e => setCard({...card, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" /></div>
                  </div>
                )}
                {paymentMethod === "pix" && (
                  <div className="text-center p-8 bg-secondary/50 rounded-2xl">
                    <QrCode className="w-32 h-32 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-sm text-muted-foreground">O QR Code será gerado ao confirmar</p>
                  </div>
                )}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep("info")} disabled={loading}
                    className="flex items-center gap-2 px-6 py-4 border border-border rounded-2xl text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50">
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <button onClick={handleConfirmOrder} disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand text-white rounded-2xl font-semibold text-sm hover:bg-brand/90 transition-colors disabled:opacity-50">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Confirmar Pedido — ${formatPrice(total)}`}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "confirmation" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-2">Pedido Confirmado! 🎉</h2>
                <p className="text-sm text-muted-foreground mb-2">Obrigada pela sua compra!</p>
                <p className="text-xs text-muted-foreground mb-8">Você receberá um e-mail com os detalhes do pedido.</p>
                <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl text-sm font-semibold hover:bg-brand/90 transition-colors">
                  Continuar Comprando
                </Link>
              </motion.div>
            )}
          </div>

          {/* Summary */}
          {step !== "confirmation" && (
            <div className="lg:col-span-2">
              <div className="sticky top-24 p-6 bg-secondary/50 rounded-2xl">
                <h3 className="font-heading text-sm font-semibold mb-4">Resumo do Pedido</h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">{item.product.name} x{item.quantity}</span>
                      <span className="font-medium whitespace-nowrap">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {/* Coupon */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Cupom de desconto"
                      className="flex-1 px-3 py-2 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand/30" />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-opacity">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
