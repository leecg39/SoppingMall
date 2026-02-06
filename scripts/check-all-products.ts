#!/usr/bin/env tsx

/**
 * Check All Products Script
 *
 * 모든 상품명을 확인합니다.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Check if text contains Korean characters
 */
function containsKorean(text: string): boolean {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
}

async function checkAllProducts() {
  console.log('🔍 Checking all products...\n');

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, short_description')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    console.log(`Total products: ${products.length}\n`);
    console.log('Product Names:');
    console.log('='.repeat(70));

    let koreanCount = 0;

    products.forEach((product, idx) => {
      const hasKorean = containsKorean(product.name) ||
                        (product.short_description && containsKorean(product.short_description));

      if (hasKorean) {
        console.log(`\n${idx + 1}. ⚠️  [KOREAN] ${product.name}`);
        koreanCount++;
      } else {
        console.log(`\n${idx + 1}. ✓ ${product.name}`);
      }

      if (product.short_description) {
        console.log(`   ${product.short_description}`);
      }
    });

    console.log('\n' + '='.repeat(70));
    console.log(`\n📊 Summary:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Products with Korean: ${koreanCount}`);
    console.log(`   All English: ${products.length - koreanCount}`);

    if (koreanCount === 0) {
      console.log('\n✅ All products have been translated to English!');
    } else {
      console.log('\n⚠️  Some products still contain Korean text.');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAllProducts();
