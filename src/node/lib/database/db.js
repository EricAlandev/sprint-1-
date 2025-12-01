import pkg from 'pg';
const { Pool } = pkg;
import { Migrations } from '../migrations/migration';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//RODA O MIGRATIONS
(async () => {
  try {
    await Migrations(); // roda suas migrations
    console.log('Migrations executadas com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar migrations:', err);
  }
})();

// Exporta o pool para usar em outros arquivos
export default pool;