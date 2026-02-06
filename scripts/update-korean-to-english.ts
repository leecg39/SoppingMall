#!/usr/bin/env tsx

/**
 * Update Korean Data to English Script
 *
 * DB의 한글 데이터를 영문으로 업데이트합니다.
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
 * Tag translation mapping
 */
const tagTranslations: Record<string, string> = {
  '전자책': 'E-book',
  '강의': 'Course',
  '템플릿': 'Template',
  '소스코드': 'Source Code',
};

/**
 * Update tags
 */
async function updateTags() {
  console.log('🏷️  Updating tags from Korean to English...\n');

  let updatedCount = 0;

  for (const [korean, english] of Object.entries(tagTranslations)) {
    // Check if Korean tag exists
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id, name')
      .eq('name', korean)
      .single();

    if (existingTag) {
      // Update to English
      const { error } = await supabase
        .from('tags')
        .update({ name: english })
        .eq('id', existingTag.id);

      if (error) {
        console.error(`  ❌ Failed to update tag "${korean}": ${error.message}`);
      } else {
        console.log(`  ✅ Updated: "${korean}" → "${english}"`);
        updatedCount++;
      }
    } else {
      console.log(`  ℹ️  Tag "${korean}" not found (already updated or doesn't exist)`);
    }
  }

  return updatedCount;
}

/**
 * Main function
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║   Update Korean Data to English              ║');
  console.log('╚═══════════════════════════════════════════════╝\n');

  try {
    // Connection test
    console.log('🔍 Testing Supabase connection...');
    const { error: pingError } = await supabase.from('tags').select('id').limit(1);

    if (pingError && pingError.code !== 'PGRST116') {
      throw new Error('Supabase connection failed: ' + pingError.message);
    }

    console.log('✅ Supabase connection successful\n');
    console.log('='.repeat(50));

    // Update tags
    const updatedCount = await updateTags();

    console.log('='.repeat(50));
    console.log(`\n✅ Update completed!`);
    console.log(`   - Tags updated: ${updatedCount}\n`);

  } catch (err: any) {
    console.error('\n❌ Update failed:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Exception occurred:', err);
  process.exit(1);
});
