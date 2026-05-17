ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "topBarText" TEXT DEFAULT 'Frete grátis para compras acima de R$ 299 ✦ Parcele em até 6x sem juros';
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "freeShippingMin" DOUBLE PRECISION DEFAULT 299;
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "installments" INTEGER DEFAULT 6;
