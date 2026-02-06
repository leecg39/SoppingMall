#!/usr/bin/env tsx

/**
 * Fix Remaining Korean Script
 *
 * 남아있는 한글을 직접 검색해서 수정합니다.
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

async function fixRemainingKorean() {
  console.log('🔍 Finding and fixing remaining Korean text...\n');

  try {
    // Get all products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name');

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    let updatedCount = 0;

    for (const product of products) {
      // Check if name contains Korean
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(product.name);

      if (hasKorean) {
        console.log(`\n📝 Found Korean: "${product.name}"`);

        // Apply translations
        let translatedName = product.name
          .replace(/컴헤어\(연출\)/g, 'Styled')
          .replace(/컴헤어/g, 'Hair')
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

        console.log(`   → "${translatedName}"`);

        // Update the product
        const { error: updateError } = await supabase
          .from('products')
          .update({ name: translatedName })
          .eq('id', product.id);

        if (updateError) {
          console.error(`   ❌ Failed to update: ${updateError.message}`);
        } else {
          console.log(`   ✅ Updated successfully`);
          updatedCount++;
        }
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`\n✅ Update completed!`);
    console.log(`   - Total products checked: ${products.length}`);
    console.log(`   - Products updated: ${updatedCount}\n`);

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

fixRemainingKorean();
