/**
 * Product Detail API Route
 *
 * GET /api/products/[slug] - 상품 상세 조회
 * - 이미지, 미리보기 파일, 태그 포함
 * - status=active만 노출
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { ProductDetailResponse, ProductWithAll } from '@/types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createServerClient();
    const { slug } = await params;

    // 상품 조회 (status=active만)
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Product not found' } },
        { status: 404 }
      );
    }

    // 이미지 조회
    const { data: images, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)
      .order('sort_order', { ascending: true });

    if (imagesError) {
      return NextResponse.json(
        { error: { code: 'FETCH_ERROR', message: imagesError.message } },
        { status: 500 }
      );
    }

    // 미리보기 파일만 조회 (is_preview=true)
    const { data: files, error: filesError } = await supabase
      .from('product_files')
      .select('*')
      .eq('product_id', product.id)
      .eq('is_preview', true);

    if (filesError) {
      return NextResponse.json(
        { error: { code: 'FETCH_ERROR', message: filesError.message } },
        { status: 500 }
      );
    }

    // 태그 조회 (product_tags를 통해 조인)
    const { data: productTags, error: tagsError } = await supabase
      .from('product_tags')
      .select('tag_id, tags(id, name, slug)')
      .eq('product_id', product.id);

    if (tagsError) {
      return NextResponse.json(
        { error: { code: 'FETCH_ERROR', message: tagsError.message } },
        { status: 500 }
      );
    }

    // 태그 데이터 변환
    const tags = productTags
      .map((pt: any) => pt.tags)
      .filter((tag: any) => tag !== null);

    // 응답 생성 (metadata 타입 캐스팅)
    const productWithAll = {
      ...product,
      type: 'digital' as const, // Default type for digital products store
      metadata: product.metadata as any,
      images: images || [],
      files: (files || []) as any,
      tags: tags || [],
    } as ProductWithAll;

    const response: ProductDetailResponse = {
      product: productWithAll,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
