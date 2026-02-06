/**
 * Update all product prices to random values between $2000-$3000
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Generate random price between $2000-$3000
 * Rounded to nearest $25 or $50
 */
function generateRandomPrice() {
  // Generate random value between 2000 and 3000
  const min = 2000;
  const max = 3000;
  const step = 50; // Round to nearest $50

  const range = (max - min) / step;
  const randomSteps = Math.floor(Math.random() * (range + 1));
  const price = min + (randomSteps * step);

  return price;
}

async function updateAllPrices() {
  console.log('🔄 Fetching all products...');

  // Fetch all products
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name, price');

  if (fetchError) {
    console.error('❌ Error fetching products:', fetchError);
    return;
  }

  console.log(`📦 Found ${products.length} products`);
  console.log('');

  // Update each product with random price
  for (const product of products) {
    const newPrice = generateRandomPrice();

    const { error: updateError } = await supabase
      .from('products')
      .update({ price: newPrice })
      .eq('id', product.id);

    if (updateError) {
      console.error(`❌ Error updating ${product.name}:`, updateError);
    } else {
      console.log(`✅ ${product.name}: $${product.price} → $${newPrice}`);
    }
  }

  console.log('');
  console.log('✨ All prices updated successfully!');
}

updateAllPrices().catch(console.error);
