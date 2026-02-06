#!/usr/bin/env node
/**
 * Script to copy product images from products/ to public/products/
 * with proper categorization and English folder names
 */

const fs = require('fs');
const path = require('path');

// Category mapping: Korean folder name -> English slug
const categoryMapping = {
  'VERSPA Accessory ': 'verspa-accessory',
  '베르스파 베이직': 'verspa-basic',
  '베르스파 라이트': 'verspa-light',
  '베르스파 아쿠아테라피폴': 'verspa-aquatherapy-pool',
  '베르스파 초기모델': 'verspa-early-model',
  '썸네일': 'thumbnails',
  '브랜드 소개서 이미지': 'brand-info',
};

const sourceDir = path.join(__dirname, '..', 'products');
const targetDir = path.join(__dirname, '..', 'public', 'products');

// Create target directories
Object.values(categoryMapping).forEach((slug) => {
  const dir = path.join(targetDir, slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy images
let totalCopied = 0;
let errors = [];

Object.entries(categoryMapping).forEach(([koreanName, englishSlug]) => {
  const sourceCategory = path.join(sourceDir, koreanName);
  const targetCategory = path.join(targetDir, englishSlug);

  if (!fs.existsSync(sourceCategory)) {
    console.warn(`Warning: Source directory not found: ${sourceCategory}`);
    return;
  }

  try {
    const files = fs.readdirSync(sourceCategory);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });

    console.log(`\nCopying ${imageFiles.length} images from ${koreanName}...`);

    imageFiles.forEach((file) => {
      const sourcePath = path.join(sourceCategory, file);
      const targetPath = path.join(targetCategory, file);

      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`  ✓ ${file}`);
        totalCopied++;
      } catch (error) {
        console.error(`  ✗ Failed to copy ${file}: ${error.message}`);
        errors.push({ file, error: error.message });
      }
    });
  } catch (error) {
    console.error(`Error processing ${koreanName}: ${error.message}`);
    errors.push({ category: koreanName, error: error.message });
  }
});

console.log(`\n✅ Total images copied: ${totalCopied}`);

if (errors.length > 0) {
  console.log(`\n❌ Errors: ${errors.length}`);
  errors.forEach((err) => {
    console.log(`  - ${JSON.stringify(err)}`);
  });
}
