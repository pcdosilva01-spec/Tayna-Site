"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// ─── Inner form (must be inside <Elements>) ───────────────────────────────────
function StripePaymentForm({
  onSuccess,
  onBack,
  total,
}: {
  onSuccess: () => void;
  onBack: () => void;
  total: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Redireciona de volta com o status após pagamento 3DS se necessário
          return_url: `${window.location.origin}/checkout/sucesso`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Erro no pagamento");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      toast.error("Erro inesperado no pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: { billingDetails: { address: { country: "BR" } } },
        }}
      />
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-6 py-4 border border-border rounded-2xl text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand text-white rounded-2xl font-semibold text-sm hover:bg-brand/90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pagar{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Public wrapper — fetches clientSecret then mounts Elements ───────────────
export function StripeCheckout({
  total,
  metadata,
  onSuccess,
  onBack,
}: {
  total: number;
  metadata?: Record<string, string>;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (total <= 0) return;

    fetch("/api/payment/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, currency: "brl", metadata }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || "Erro ao iniciar pagamento");
        }
      })
      .catch(() => setError("Erro de conexão com o servidor"));
  }, [total]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
        ⚠️ {error}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
        <span className="ml-3 text-sm text-muted-foreground">
          Preparando pagamento seguro...
        </span>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#c8a882",
            borderRadius: "12px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
        locale: "pt-BR",
      }}
    >
      <StripePaymentForm
        onSuccess={onSuccess}
        onBack={onBack}
        total={total}
      />
    </Elements>
  );
}
