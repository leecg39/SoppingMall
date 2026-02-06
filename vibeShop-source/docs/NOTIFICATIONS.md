# 🔔 작업 완료 알림 설정 가이드

> iTerm2 + macOS에서 작업 완료 시 자동으로 알림과 소리가 울리도록 설정하는 방법

---

## 📋 목차

1. [빠른 시작](#빠른-시작)
2. [프로젝트 전용 알림](#프로젝트-전용-알림)
3. [전역 알림 설정](#전역-알림-설정)
4. [iTerm2 설정](#iterm2-설정)
5. [사용 예시](#사용-예시)

---

## 🚀 빠른 시작

### 알림 테스트

```bash
# 기본 알림
npm run notify

# 커스텀 메시지
./scripts/notify.sh "테스트 완료!" "Vibe Store"
```

---

## 📦 프로젝트 전용 알림

### 1. npm 스크립트 사용 (권장)

**package.json에 이미 추가된 명령어:**

```bash
# 빌드 후 알림
npm run build:notify

# 테스트 후 알림
npm run test:notify

# 배포 후 알림
npm run deploy:notify

# 일반 알림 (커스텀 가능)
npm run notify
```

### 2. 직접 스크립트 실행

```bash
# 기본 메시지
./scripts/notify.sh

# 커스텀 메시지
./scripts/notify.sh "작업 완료!" "프로젝트명"

# 여러 작업 연결
npm run build && npm run test && ./scripts/notify.sh "모든 작업 완료!" "Vibe Store"
```

---

## 🌍 전역 알림 설정

### .zshrc에 함수 추가

**~/.zshrc 파일 열기:**

```bash
nano ~/.zshrc
# 또는
code ~/.zshrc
```

**다음 함수를 파일 끝에 추가:**

```bash
# ============================================
# 작업 완료 알림 함수
# ============================================

# 기본 알림 함수
notify() {
  local MESSAGE="${1:-작업이 완료되었습니다!}"
  local TITLE="${2:-알림}"

  osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Glass\""
  afplay /System/Library/Sounds/Glass.aiff
  echo -e "\a"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  🔔 $TITLE"
  echo "  $MESSAGE"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
}

# 성공 알림 (초록색)
notify-success() {
  local MESSAGE="${1:-작업 성공!}"
  osascript -e "display notification \"$MESSAGE\" with title \"✅ 성공\" sound name \"Glass\""
  afplay /System/Library/Sounds/Glass.aiff
  echo -e "\033[0;32m✅ $MESSAGE\033[0m"
}

# 실패 알림 (빨간색)
notify-error() {
  local MESSAGE="${1:-작업 실패!}"
  osascript -e "display notification \"$MESSAGE\" with title \"❌ 실패\" sound name \"Basso\""
  afplay /System/Library/Sounds/Basso.aiff
  echo -e "\033[0;31m❌ $MESSAGE\033[0m"
}

# 작업 완료 후 자동 알림 (&&와 함께 사용)
notify-done() {
  if [ $? -eq 0 ]; then
    notify-success "${1:-작업이 완료되었습니다!}"
  else
    notify-error "${1:-작업이 실패했습니다!}"
  fi
}
```

**변경사항 적용:**

```bash
source ~/.zshrc
```

---

## ⚙️ iTerm2 설정

### 1. iTerm2 알림 활성화

**iTerm2 > Preferences (⌘,):**

1. **Profiles → Terminal** 탭 선택
2. **Notifications** 섹션:
   - ✅ **"Silence bell"** 체크
   - ✅ **"Send Growl/Notification Center alerts"** 체크
3. **Alert on next mark** 옵션 활성화

### 2. macOS 알림 권한 설정

**시스템 설정 > 알림:**

1. iTerm2 찾기
2. **알림 허용** 활성화
3. 알림 스타일: **배너** 또는 **경고** 선택
4. **소리** 활성화

---

## 💡 사용 예시

### 예시 1: 빌드 후 알림

```bash
npm run build && notify "빌드 완료!" "Vibe Store"
```

### 예시 2: 테스트 후 성공/실패 알림

```bash
npm test && notify-success "모든 테스트 통과!" || notify-error "테스트 실패!"
```

### 예시 3: 여러 작업 체인

```bash
npm run lint && \
npm run type-check && \
npm run test && \
npm run build && \
notify "모든 작업 완료!" "Vibe Store"
```

### 예시 4: 긴 작업 후 알림

```bash
# 배포 작업 (10분 소요)
npm run deploy:vercel
notify-done "Vercel 배포 완료!"
```

### 예시 5: 백그라운드 실행 + 알림

```bash
# 백그라운드에서 개발 서버 실행
npm run dev &

# 다른 작업 후 알림
sleep 5 && notify "개발 서버 시작 완료!" "Vibe Store"
```

---

## 🎨 커스터마이징

### 소리 변경

**사용 가능한 시스템 소리:**

```bash
# 소리 목록 확인
ls /System/Library/Sounds/

# 예시:
# - Glass.aiff (기본)
# - Ping.aiff (가벼운 소리)
# - Basso.aiff (에러용)
# - Sosumi.aiff (중요한 알림)
# - Funk.aiff (재미있는 소리)
```

**scripts/notify.sh 수정:**

```bash
# 20번 줄:
SOUND="/System/Library/Sounds/Sosumi.aiff"
```

### 알림 스타일 변경

**osascript 옵션:**

```bash
# 부제목 추가
osascript -e 'display notification "빌드 완료" with title "Vibe Store" subtitle "프로덕션 빌드"'

# 소리 커스텀
osascript -e 'display notification "테스트 완료" with title "Vibe Store" sound name "Ping"'
```

---

## 🔧 트러블슈팅

### Q1: 알림이 안 울려요

**체크리스트:**

1. macOS 알림 권한 확인
   ```bash
   # 시스템 설정 > 알림 > iTerm2
   ```

2. 스크립트 실행 권한 확인
   ```bash
   chmod +x scripts/notify.sh
   ```

3. osascript 동작 확인
   ```bash
   osascript -e 'display notification "테스트" with title "테스트"'
   ```

### Q2: 소리가 안 나요

**체크리스트:**

1. 시스템 볼륨 확인
2. 알림 센터 소리 설정 확인
3. 소리 파일 존재 확인
   ```bash
   afplay /System/Library/Sounds/Glass.aiff
   ```

### Q3: iTerm2 벨이 안 울려요

**해결 방법:**

```bash
# 터미널에서 직접 벨 테스트
echo -e "\a"

# iTerm2 설정 확인:
# Preferences > Profiles > Terminal > "Silence bell" 체크 해제
```

---

## 📚 참고 자료

- [iTerm2 공식 문서](https://iterm2.com/documentation.html)
- [Claude Code 터미널 설정](https://code.claude.com/docs/en/terminal-config#iterm-2-system)
- [macOS osascript 가이드](https://ss64.com/osx/osascript.html)

---

## 🎯 추천 워크플로우

### 개발 중

```bash
# 코드 변경 후 자동 테스트 + 알림
npm run test:watch
```

### 배포 전

```bash
# 전체 검증 후 알림
npm run lint && \
npm run type-check && \
npm run test && \
npm run build && \
notify-success "배포 준비 완료!" || notify-error "검증 실패!"
```

### 장시간 작업

```bash
# 마이그레이션 + 시드 + 알림
npm run db:migrate && \
npm run db:seed && \
notify "데이터베이스 초기화 완료!" "Vibe Store"
```

---

**💡 TIP:** 긴 작업 시작 전에 알림 명령을 미리 추가해두면 작업 완료를 놓치지 않을 수 있습니다!
