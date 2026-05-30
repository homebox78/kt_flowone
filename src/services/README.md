# services/

API 통신 모듈 디렉토리.

- `http.js` — 공통 axios 인스턴스. `VITE_API_BASE_URL` 자동 적용, JWT 토큰 헤더 부착, 401 시 토큰 제거.
- 도메인별 모듈을 이 폴더에 추가합니다. 예: `auth.js`, `content.js`, `member.js`.

```js
import http from '@/services/http'
export const login = (payload) => http.post('/auth/login', payload)
```

**범위 안내:** 본 견적은 프론트엔드 마크업/구성만 포함하며, 실제 API 연동 구현은 별도 작업입니다. 본 모듈은 인계 시 백엔드 연동 팀이 즉시 사용 가능하도록 제공되는 스켈레톤입니다.
