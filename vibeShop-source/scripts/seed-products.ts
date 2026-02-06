/**
 * Product seeding script
 * Seeds categories and products with images from public/products/
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Category definitions with English names
const categories = [
  {
    name: 'VERSPA Accessory',
    slug: 'verspa-accessory',
    description: 'Professional hair care accessories and tools',
    sort_order: 1,
  },
  {
    name: 'VERSPA Basic',
    slug: 'verspa-basic',
    description: 'Essential VERSPA products for daily hair care',
    sort_order: 2,
  },
  {
    name: 'VERSPA Light',
    slug: 'verspa-light',
    description: 'Lightweight and portable hair care solutions',
    sort_order: 3,
  },
  {
    name: 'VERSPA Aquatherapy Pool',
    slug: 'verspa-aquatherapy-pool',
    description: 'Advanced aquatherapy systems for professional use',
    sort_order: 4,
  },
  {
    name: 'VERSPA Early Model',
    slug: 'verspa-early-model',
    description: 'Classic VERSPA models with proven reliability',
    sort_order: 5,
  },
];

// Folder mapping for local file access
const categoryFolders: Record<string, string> = {
  'verspa-accessory': 'verspa-accessory',
  'verspa-basic': 'verspa-basic',
  'verspa-light': 'verspa-light',
  'verspa-aquatherapy-pool': 'verspa-aquatherapy-pool',
  'verspa-early-model': 'verspa-early-model',
};

// Helper function to generate slug from filename
function generateSlugFromFilename(filename: string, categorySlug: string): string {
  const nameWithoutExt = path.parse(filename).name;
  // Remove special characters and spaces
  const cleanName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${categorySlug}-${cleanName}`;
}

// Helper function to generate product name from filename
function generateProductName(filename: string, categoryName: string, index: number): string {
  const nameWithoutExt = path.parse(filename).name;
  // Try to clean up the filename for a better product name
  const cleanName = nameWithoutExt
    .replace(/KakaoTalk_/g, '')
    .replace(/_/g, ' ')
    .replace(/\d{8}/g, '') // Remove date patterns
    .trim();

  if (cleanName.length > 3) {
    return `${categoryName} - ${cleanName.substring(0, 50)}`;
  }

  return `${categoryName} #${index + 1}`;
}

// Helper function to get sample price based on category
function getCategoryPrice(categorySlug: string): number {
  const prices: Record<string, number> = {
    'verspa-accessory': 29000,
    'verspa-basic': 89000,
    'verspa-light': 79000,
    'verspa-aquatherapy-pool': 1290000,
    'verspa-early-model': 69000,
  };
  return prices[categorySlug] || 50000;
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Step 1: Clear existing data (optional - be careful!)
    console.log('🗑️  Clearing existing data...');
    await supabase.from('product_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('✅ Cleared existing data\n');

    // Step 2: Insert categories
    console.log('📁 Inserting categories...');
    const { data: insertedCategories, error: categoriesError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (categoriesError) {
      throw new Error(`Failed to insert categories: ${categoriesError.message}`);
    }

    console.log(`✅ Inserted ${insertedCategories.length} categories\n`);

    // Create category map for easy lookup
    const categoryMap = new Map(
      insertedCategories.map((cat) => [cat.slug, cat])
    );

    // Step 3: Insert products with images
    console.log('🛍️  Inserting products...');
    let totalProducts = 0;
    let totalImages = 0;

    const publicProductsDir = path.join(process.cwd(), 'public', 'products');

    for (const category of categories) {
      const categoryData = categoryMap.get(category.slug);
      if (!categoryData) continue;

      const folderName = categoryFolders[category.slug];
      const categoryDir = path.join(publicProductsDir, folderName);

      if (!fs.existsSync(categoryDir)) {
        console.warn(`⚠️  Directory not found: ${categoryDir}`);
        continue;
      }

      const files = fs.readdirSync(categoryDir);
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png'].includes(ext);
      });

      console.log(`  Processing ${category.name} (${imageFiles.length} images)...`);

      for (let i = 0; i < imageFiles.length; i++) {
        const filename = imageFiles[i];
        const productName = generateProductName(filename, category.name, i);
        const slug = generateSlugFromFilename(filename, category.slug);
        const price = getCategoryPrice(category.slug);
        const imageUrl = `/products/${folderName}/${filename}`;

        // Insert product
        const { data: product, error: productError } = await supabase
          .from('products')
          .insert({
            name: productName,
            slug: slug,
            description: `High-quality ${category.name} product. Professional grade equipment for optimal results.`,
            short_description: `${category.name} - Premium quality`,
            price: price,
            discount_price: null,
            category_id: categoryData.id,
            status: 'active',
            is_featured: i === 0, // First product in each category is featured
            metadata: {
              tags: [category.slug, 'verspa', 'professional'],
              specifications: {},
            },
          })
          .select()
          .single();

        if (productError) {
          console.error(`    ❌ Failed to insert product ${productName}: ${productError.message}`);
          continue;
        }

        // Insert product image
        const { error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: product.id,
            url: imageUrl,
            alt: productName,
            is_primary: true,
            sort_order: 0,
          });

        if (imageError) {
          console.error(`    ❌ Failed to insert image for ${productName}: ${imageError.message}`);
        } else {
          totalImages++;
        }

        totalProducts++;
        process.stdout.write(`    ✓ ${productName}\n`);
      }
    }

    console.log(`\n✅ Successfully seeded:`);
    console.log(`   - ${insertedCategories.length} categories`);
    console.log(`   - ${totalProducts} products`);
    console.log(`   - ${totalImages} product images`);
    console.log('\n🎉 Database seeding completed!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
