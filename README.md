# OIC TISA 사이트

서클 소개 + 활동 + 이벤트 신청 사이트. 영어/일본어.
관리 페이지: 사이트 주소 뒤에 `#/admin`.

## 1. 로컬에서 보기 (1분)

```bash
npm install
npm run dev
```

`.env`가 없으면 **데모 모드**로 돌아가. 신청 데이터는 그 브라우저에만 저장돼.
데모 모드 관리 페이지 비밀번호: `tisa-demo`

## 2. 내용 바꾸기

- 모든 문구: `src/content.ts` (각 문구마다 `en` / `ja` 둘 다 있음)
- 활동 사진: `public/photos/`에 파일 넣고 → `content.ts`의 `activities.items[].photo`에 `'photos/파일이름.jpg'`
- 숫자 섹션: 지금은 **샘플 숫자**. 실제 숫자로 바꾸고 `numbers.isSample`을 `false`로
- 답장 템플릿: `content.ts` 맨 아래 `replyTemplates`

## 3. 구글 시트 + 이메일 연결 (15분, 한 번만)

1. 서클 구글 계정으로 새 구글 시트 만들기 (이름 예: `TISA Requests`)
2. 시트 메뉴 **확장 프로그램 → Apps Script**
3. `apps-script/Code.gs` 내용 전체를 복사해서 붙여넣기 → 저장
4. 왼쪽 ⚙️ **프로젝트 설정 → 스크립트 속성**에 두 개 추가
   - `ADMIN_PASSWORD` : 관리 페이지 비밀번호 (길게, 운영진끼리만 공유)
   - `NOTIFY_EMAIL` : 새 신청 알림 받을 메일 (여러 개면 쉼표로)
5. 오른쪽 위 **배포 → 새 배포** → 유형 **웹 앱**
   - 실행 사용자: **나**
   - 액세스 권한: **모든 사용자**
   - 배포 → 권한 허용 → **웹 앱 URL** 복사
6. 이 폴더에 `.env` 파일 만들기:

```
VITE_API_URL=복사한_웹앱_URL
VITE_SHEET_URL=구글시트_주소
```

7. `npm run dev` 다시 실행 → 테스트 신청 1건 → 시트에 줄이 생기고 알림 메일이 오면 성공

`Code.gs`를 고친 뒤에는 **배포 → 배포 관리 → 수정 → 새 버전**으로 다시 배포해야 반영돼.

## 4. 인터넷에 올리기 (GitHub Pages, 무료)

1. GitHub에 새 저장소 만들고 이 폴더를 push
2. 저장소 **Settings → Secrets and variables → Actions → Variables**에 `VITE_API_URL`, `VITE_SHEET_URL` 추가
3. **Settings → Pages → Source: GitHub Actions**
4. push할 때마다 `.github/workflows/deploy.yml`이 자동으로 빌드·배포

## 구조

| 파일 | 역할 |
|---|---|
| `src/content.ts` | 모든 문구·데이터 |
| `src/components/site/` | 사이트 섹션 (Hero, 소개, 활동, 숫자, 신청 폼) |
| `src/components/site/Globe.tsx` | 첫 화면 지구 애니메이션 (Anime.js) |
| `src/components/charts/` | Bklit UI 차트 (shadcn으로 설치됨) |
| `src/pages/Admin.tsx` | 관리 페이지 |
| `src/api.ts` | 백엔드 통신 + 데모 모드 |
| `apps-script/Code.gs` | 구글 시트 저장, 알림 메일, 답장 메일 |
