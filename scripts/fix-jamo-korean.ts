#!/usr/bin/env tsx

/**
 * Fix Jamo Korean Script
 *
 * 한글 자모(Hangul Jamo) 형태로 저장된 한글을 영문으로 변경합니다.
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
 * Check if text contains Korean (including Jamo)
 * - 가-힣: Hangul Syllables (AC00-D7A3)
 * - ᄀ-ᇿ: Hangul Jamo (1100-11FF)
 * - ㄱ-ㅣ: Hangul Compatibility Jamo (3131-318E)
 */
function containsKorean(text: string): boolean {
  return /[\u1100-\u11FF\u3131-\u318E\uAC00-\uD7A3]/.test(text);
}

async function fixJamoKorean() {
  console.log('🔍 Finding products with Korean (including Jamo)...\n');

  try {
    // Get all products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name');

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    console.log(`Total products: ${products.length}\n`);

    let updatedCount = 0;

    for (const product of products) {
      if (containsKorean(product.name)) {
        console.log(`\n📝 Found Korean text:`);
        console.log(`   Original: "${product.name}"`);

        // Normalize the text first (NFD to NFC)
        let normalized = product.name.normalize('NFC');

        // Apply translations
        let translated = normalized
          .replace(/컴헤어\(연출\)/g, 'Styled')
          .replace(/컴헤어/g, 'Styled Hair')
          .replace(/연출/g, 'Styled')
          .replace(/제품색상변경/g, 'Product Color Change')
          .replace(/정면색변경/g, 'Front Color Change')
          .replace(/컬러변경/g, 'Color Change')
          .replace(/색상변경/g, 'Color Change')
          .replace(/색변경/g, 'Color Change')
          .replace(/색보정/g, 'Color Correction')
          .replace(/베르스파/g, 'Bern Spa')
          .replace(/베른/g, 'Bern')
          .replace(/베르/g, 'Bern')
          .replace(/스파/g, 'Spa')
          .replace(/정면/g, 'Front')
          .replace(/제품/g, 'Product');

        console.log(`   Translated: "${translated}"`);

        // Check if translation actually changed something
        if (translated !== product.name && !containsKorean(translated)) {
          const { error: updateError } = await supabase
            .from('products')
            .update({ name: translated })
            .eq('id', product.id);

          if (updateError) {
            console.error(`   ❌ Failed: ${updateError.message}`);
          } else {
            console.log(`   ✅ Updated`);
            updatedCount++;
          }
        } else {
          console.log(`   ⚠️  Translation incomplete or still contains Korean`);
        }
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`\n✅ Update completed!`);
    console.log(`   - Total products: ${products.length}`);
    console.log(`   - Products updated: ${updatedCount}\n`);

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

fixJamoKorean();
