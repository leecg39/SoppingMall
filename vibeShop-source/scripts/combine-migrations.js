#!/usr/bin/env node
/**
 * Combines all SQL migration files into a single file for manual execution
 */

const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
const outputFile = path.join(__dirname, '..', 'combined-migrations.sql');

// Get all SQL files sorted by name
const sqlFiles = fs
  .readdirSync(migrationsDir)
  .filter((file) => file.endsWith('.sql'))
  .sort();

console.log(`Found ${sqlFiles.length} migration files:\n`);

let combinedSQL = `-- ============================================
-- Combined Migrations for Vibe Store
-- Generated: ${new Date().toISOString()}
-- ============================================
--
-- This file combines all migrations into a single file
-- Execute this in your Supabase SQL Editor
--
-- IMPORTANT: Run this only once on a fresh database
-- ============================================

`;

sqlFiles.forEach((file) => {
  const filePath = path.join(migrationsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`  ✓ ${file}`);

  combinedSQL += `\n\n-- ============================================\n`;
  combinedSQL += `-- File: ${file}\n`;
  combinedSQL += `-- ============================================\n\n`;
  combinedSQL += content;
});

fs.writeFileSync(outputFile, combinedSQL, 'utf8');

console.log(`\n✅ Combined migrations written to: ${outputFile}`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Open your Supabase project dashboard`);
console.log(`   2. Go to SQL Editor`);
console.log(`   3. Copy and paste the contents of combined-migrations.sql`);
console.log(`   4. Execute the SQL`);
console.log(`   5. Run: npx tsx scripts/seed-products.ts\n`);
