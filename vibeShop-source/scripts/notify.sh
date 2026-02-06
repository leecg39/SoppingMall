#!/bin/bash

# ============================================
# Vibe Store - 작업 완료 알림 스크립트
# ============================================
# 작업 완료 시 macOS 시스템 알림 + 소리 재생
#
# 사용법:
#   ./scripts/notify.sh "메시지" "제목"
#   또는
#   npm run build && ./scripts/notify.sh "빌드 완료!" "Vibe Store"
# ============================================

# 기본값 설정
MESSAGE="${1:-작업이 완료되었습니다!}"
TITLE="${2:-Vibe Store}"
SOUND="/System/Library/Sounds/Glass.aiff"

# macOS 시스템 알림 전송
osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Glass\""

# 추가 소리 재생 (더 눈에 띄게)
afplay "$SOUND"

# 터미널 벨 울리기 (iTerm2 알림 트리거)
echo -e "\a"

# 성공 메시지 출력
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🔔 알림 전송 완료!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  제목: $TITLE"
echo "  메시지: $MESSAGE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
