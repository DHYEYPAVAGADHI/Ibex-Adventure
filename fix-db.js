const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixStorage() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to database...');
    
    // 1. Create the bucket if it doesn't exist
    console.log('Ensuring "uploads" bucket exists...');
    await pool.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('uploads', 'uploads', true) 
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);

    // 2. Drop existing policy just in case
    console.log('Dropping old policies if they exist...');
    try {
      await pool.query(`DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;`);
    } catch(e) {
      // ignore
    }

    // 3. Create INSERT policy for uploads
    console.log('Creating INSERT policy for public uploads...');
    await pool.query(`
      CREATE POLICY "Allow public uploads" 
      ON storage.objects FOR INSERT 
      TO public 
      WITH CHECK (bucket_id = 'uploads');
    `);

    // 4. Create SELECT policy just in case
    console.log('Creating SELECT policy for public uploads...');
    try {
      await pool.query(`DROP POLICY IF EXISTS "Allow public read" ON storage.objects;`);
    } catch(e) {}
    await pool.query(`
      CREATE POLICY "Allow public read" 
      ON storage.objects FOR SELECT
      TO public 
      USING (bucket_id = 'uploads');
    `);

    // 5. Create DELETE policy just in case
    console.log('Creating DELETE policy for public uploads...');
    try {
      await pool.query(`DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;`);
    } catch(e) {}
    await pool.query(`
      CREATE POLICY "Allow public delete" 
      ON storage.objects FOR DELETE
      TO public 
      USING (bucket_id = 'uploads');
    `);
    
    console.log('Successfully configured Supabase Storage!');
  } catch (error) {
    console.error('Error fixing storage:', error);
  } finally {
    await pool.end();
  }
}

fixStorage();
