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

/**
 * Check if text contains Korean (including Jamo)
 */
function containsKorean(text: string): boolean {
  return /[\u1100-\u11FF\u3131-\u318E\uAC00-\uD7A3]/.test(text);
}

async function finalCheck() {
  console.log('🔍 Final Korean check...\n');

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, short_description');

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    let koreanInName = 0;
    let koreanInDescription = 0;

    products.forEach((product) => {
      if (containsKorean(product.name)) {
        console.log(`⚠️  Name: ${product.name}`);
        koreanInName++;
      }
      if (product.short_description && containsKorean(product.short_description)) {
        console.log(`⚠️  Description: ${product.short_description}`);
        koreanInDescription++;
      }
    });

    console.log(`\n${'='.repeat(50)}`);
    console.log(`\n📊 Final Summary:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Products with Korean in name: ${koreanInName}`);
    console.log(`   Products with Korean in description: ${koreanInDescription}`);

    if (koreanInName === 0 && koreanInDescription === 0) {
      console.log(`\n✅ SUCCESS! All Korean text has been converted to English!\n`);
    } else {
      console.log(`\n⚠️  Some Korean text still remains.\n`);
    }

    // Also check tags and categories
    const { data: tags } = await supabase.from('tags').select('name');
    const { data: categories } = await supabase.from('categories').select('name, description');

    let koreanTags = tags?.filter(t => containsKorean(t.name)).length || 0;
    let koreanCategories = categories?.filter(c => containsKorean(c.name) || containsKorean(c.description || '')).length || 0;

    console.log(`   Tags with Korean: ${koreanTags}`);
    console.log(`   Categories with Korean: ${koreanCategories}\n`);

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

finalCheck();
