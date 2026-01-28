/**
 * Admin Inventory Logs API Route
 *
 * GET /api/admin/inventory/logs - 입출고 이력 조회
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // 관리자 권한 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    // 쿼리 파라미터
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('product_id');
    const type = searchParams.get('type'); // 'in', 'out', 'adjust'
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // 입출고 이력 조회
    let query = supabase
      .from('inventory_logs')
      .select(
        `
        id,
        product_id,
        type,
        quantity,
        reason,
        reference_id,
        reference_type,
        stock_before,
        stock_after,
        created_by,
        created_at,
        products (
          id,
          name,
          slug
        ),
        profiles (
          id,
          email,
          nickname
        )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false });

    // 상품 필터
    if (productId) {
      query = query.eq('product_id', productId);
    }

    // 유형 필터
    if (type && ['in', 'out', 'adjust'].includes(type)) {
      query = query.eq('type', type as 'in' | 'out' | 'adjust');
    }

    // 날짜 범위 필터
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      // 종료일은 해당 날짜의 끝까지 포함
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);
      query = query.lte('created_at', endDateTime.toISOString());
    }

    // 페이지네이션
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: logs, error, count } = await query;

    if (error) {
      console.error('입출고 이력 조회 오류:', error);
      return NextResponse.json(
        { error: '입출고 이력 조회 실패' },
        { status: 500 }
      );
    }

    // 데이터 변환 (관계 데이터를 평탄화)
    const transformedLogs = (logs || []).map((log: any) => ({
      id: log.id,
      product_id: log.product_id,
      product_name: log.products?.name || 'Unknown',
      product_slug: log.products?.slug,
      type: log.type,
      quantity: log.quantity,
      reason: log.reason,
      reference_id: log.reference_id,
      reference_type: log.reference_type,
      stock_before: log.stock_before,
      stock_after: log.stock_after,
      created_by_id: log.created_by,
      created_by_email: log.profiles?.email,
      created_by_nickname: log.profiles?.nickname,
      created_at: log.created_at,
    }));

    return NextResponse.json({
      data: transformedLogs,
      meta: {
        total: count || 0,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('입출고 이력 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
