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

async function checkUnicode() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .ilike('name', '%헤어%')
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    const name = data[0].name;
    console.log('\nProduct name:', name);
    console.log('\nCharacter codes:');
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const code = name.charCodeAt(i);
      const hex = code.toString(16).toUpperCase().padStart(4, '0');
      console.log(`  ${i}: '${char}' -> U+${hex} (${code})`);
    }

    console.log('\nKorean test:', /[가-힣]/.test(name));
    console.log('Korean range: 가=' + '가'.charCodeAt(0) + ', 힣=' + '힣'.charCodeAt(0));
  }
}

checkUnicode();
