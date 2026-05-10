"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="font-heading text-2xl font-bold mb-2">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pedimos desculpas pelo inconveniente. Por favor, tente novamente.
        </p>
        <button onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-medium hover:opacity-90 transition-opacity">
          <RotateCcw className="w-4 h-4" /> Tentar Novamente
        </button>
      </div>
    </div>
  );
}
