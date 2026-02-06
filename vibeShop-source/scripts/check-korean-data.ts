#!/usr/bin/env tsx

/**
 * Check Korean Data Script
 *
 * DB에서 한글 데이터를 찾아서 표시합니다.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function checkKoreanData() {
  console.log('🔍 Checking for Korean data in database...\n');

  try {
    // Check categories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, description, slug');

    console.log('📁 Categories:');
    categories?.forEach(cat => {
      console.log(`  - ${cat.slug}: ${cat.name} (${cat.description})`);
    });

    // Check products
    const { data: products } = await supabase
      .from('products')
      .select('id, name, slug, short_description')
      .limit(10);

    console.log('\n📦 Products (first 10):');
    products?.forEach(prod => {
      console.log(`  - ${prod.slug}: ${prod.name}`);
      if (prod.short_description) {
        console.log(`    ${prod.short_description}`);
      }
    });

    // Check tags
    const { data: tags } = await supabase
      .from('tags')
      .select('id, name');

    console.log('\n🏷️  Tags:');
    tags?.forEach(tag => {
      console.log(`  - ${tag.name}`);
    });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkKoreanData();
