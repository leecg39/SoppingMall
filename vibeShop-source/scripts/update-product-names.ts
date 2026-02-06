#!/usr/bin/env tsx

/**
 * Update Product Names Script
 *
 * 상품명의 한글을 영문으로 업데이트합니다.
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
 * Korean to English translation mapping for product names
 * Order matters: longer patterns should come first
 */
const translationMap: Record<string, string> = {
  '제품색상변경': 'Product Color Change',
  '정면색변경': 'Front Color Change',
  '컬러변경': 'Color Change',
  '색상변경': 'Color Change',
  '색변경': 'Color Change',
  '색보정': 'Color Correction',
  '베르스파': 'Bern Spa',
  '컴헤어(연출)': 'Styled',
  '컴헤어': 'Hair',
  '연출': 'Styled',
  '베른': 'Bern',
  '베르': 'Bern',
  '스파': 'Spa',
  '정면': 'Front',
  '제품': 'Product',
};

/**
 * Translate Korean text to English
 */
function translateToEnglish(text: string): string {
  let translated = text;

  // Replace Korean patterns
  for (const [korean, english] of Object.entries(translationMap)) {
    translated = translated.replace(new RegExp(korean, 'g'), english);
  }

  // Remove extra spaces
  translated = translated.replace(/\s+/g, ' ').trim();

  // Remove hyphens with spaces around Korean/English mix
  translated = translated.replace(/\s*-\s*/g, ' - ');

  return translated;
}

/**
 * Check if text contains Korean characters
 */
function containsKorean(text: string): boolean {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
}

/**
 * Update product names
 */
async function updateProductNames() {
  console.log('📦 Fetching products with Korean names...\n');

  // Get all products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug');

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  console.log(`Found ${products.length} total products\n`);

  let updatedCount = 0;
  const updates = [];

  for (const product of products) {
    if (containsKorean(product.name)) {
      const translatedName = translateToEnglish(product.name);

      updates.push({
        id: product.id,
        oldName: product.name,
        newName: translatedName,
      });

      console.log(`  ✓ "${product.name}"`);
      console.log(`    → "${translatedName}"\n`);

      // Update the product
      const { error: updateError } = await supabase
        .from('products')
        .update({ name: translatedName })
        .eq('id', product.id);

      if (updateError) {
        console.error(`    ❌ Failed to update: ${updateError.message}\n`);
      } else {
        updatedCount++;
      }
    }
  }

  return { updatedCount, total: products.length };
}

/**
 * Main function
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║   Update Product Names to English            ║');
  console.log('╚═══════════════════════════════════════════════╝\n');

  try {
    // Connection test
    console.log('🔍 Testing Supabase connection...');
    const { error: pingError } = await supabase.from('products').select('id').limit(1);

    if (pingError && pingError.code !== 'PGRST116') {
      throw new Error('Supabase connection failed: ' + pingError.message);
    }

    console.log('✅ Supabase connection successful\n');
    console.log('='.repeat(50) + '\n');

    // Update product names
    const { updatedCount, total } = await updateProductNames();

    console.log('='.repeat(50));
    console.log(`\n✅ Update completed!`);
    console.log(`   - Total products: ${total}`);
    console.log(`   - Products updated: ${updatedCount}\n`);

  } catch (err: any) {
    console.error('\n❌ Update failed:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Exception occurred:', err);
  process.exit(1);
});
