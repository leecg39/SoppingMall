#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findKorean() {
  // Try to find products with the specific string
  console.log('Looking for products with specific patterns...\n');

  const patterns = ['컴헤어', '연출', 'Basic -'];

  for (const pattern of patterns) {
    const { data, error, count } = await supabase
      .from('products')
      .select('id, name', { count: 'exact' })
      .like('name', `%${pattern}%`)
      .limit(5);

    console.log(`Pattern: "${pattern}"`);
    console.log(`  Count: ${count || 0}`);
    if (data && data.length > 0) {
      data.forEach(p => {
        console.log(`  - ${p.name}`);
        // Print byte representation
        const bytes = Buffer.from(p.name, 'utf8');
        console.log(`    Bytes (first 50): ${bytes.slice(0, 50).toString('hex')}`);
      });
    }
    console.log('');
  }
}

findKorean();
