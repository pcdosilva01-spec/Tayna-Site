const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://postgres.ybsdjcqsyqknbgiynoei:kauanvida123@aws-1-us-west-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false },
  });
  
  try {
    await client.connect();
    console.log('Conectado ao banco!');
    
    await client.query(`ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "topBarText" TEXT DEFAULT 'Frete grátis para compras acima de R$ 299 ✦ Parcele em até 6x sem juros'`);
    console.log('✅ topBarText adicionada');
    
    await client.query(`ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "freeShippingMin" DOUBLE PRECISION DEFAULT 299`);
    console.log('✅ freeShippingMin adicionada');
    
    await client.query(`ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "installments" INTEGER DEFAULT 6`);
    console.log('✅ installments adicionada');
    
    const result = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'Settings'`);
    console.log('\nColunas atuais da tabela Settings:', result.rows.map(r => r.column_name));
    
  } catch (err) {
    console.error('Erro:', err.message);
  } finally {
    await client.end();
  }
}

main();
