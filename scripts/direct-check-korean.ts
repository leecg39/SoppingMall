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

async function directCheck() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .limit(50);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== All Products ===\n');
  data.forEach((p, i) => {
    const hasKorean = /[가-힣]/.test(p.name);
    const marker = hasKorean ? '🔴 KOREAN:' : '✓';
    console.log(`${i + 1}. ${marker} ${p.name}`);
  });

  const koreanProducts = data.filter(p => /[가-힣]/.test(p.name));
  console.log(`\n=== Summary ===`);
  console.log(`Total: ${data.length}`);
  console.log(`With Korean: ${koreanProducts.length}\n`);
}

directCheck();
