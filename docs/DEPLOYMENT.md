# 배포 가이드

KT FLOW1 CP Site 프론트엔드를 **Azure 컨테이너 환경(MSA)** 에 배포하기 위한 절차입니다.

## 1. 배포 방식 개요

- 정적 빌드 산출물(`dist/`)을 **nginx 컨테이너**로 패키징.
- 멀티스테이지 Docker 빌드 (Node 22 → nginx 1.27 alpine).
- SPA fallback(`try_files ... /index.html`)으로 클라이언트 라우팅 지원.
- 최종 이미지 크기 ~50MB.

## 2. 로컬에서 컨테이너 빌드/실행

```bash
# 1) 이미지 빌드
docker build -f deploy/Dockerfile -t kt-flowone-cp:local .
# 또는: npm run docker:build

# 2) 컨테이너 실행 (호스트 8080 → 컨테이너 80)
docker run --rm -p 8080:80 kt-flowone-cp:local

# 3) 브라우저에서 확인
# http://localhost:8080
```

빌드 시점에 `.env.production`이 적용된다. API 베이스 URL을 빌드별로 다르게 가져가려면 빌드 인자로 받도록 Dockerfile을 확장하거나 nginx 환경변수 치환(`envsubst`) 단계를 추가한다.

## 3. Azure 배포

### 3-1. 사전 준비
- Azure CLI (`az login`)
- Azure Container Registry (ACR) 또는 Docker Hub 계정
- 배포 타겟 결정: **Azure Container Apps** (권장) / AKS / App Service for Containers

### 3-2. ACR에 이미지 푸시

```bash
# ACR 로그인
az acr login --name <ACR_NAME>

# 이미지 빌드 + 태깅
docker build -f deploy/Dockerfile -t <ACR_NAME>.azurecr.io/kt-flowone-cp:1.0.0 .

# 푸시
docker push <ACR_NAME>.azurecr.io/kt-flowone-cp:1.0.0
```

또는 ACR에서 직접 빌드:
```bash
az acr build --registry <ACR_NAME> --image kt-flowone-cp:1.0.0 --file deploy/Dockerfile .
```

### 3-3. Azure Container Apps 배포 (권장)

```bash
az containerapp create \
  --name kt-flowone-cp \
  --resource-group <RG_NAME> \
  --environment <CONTAINERAPP_ENV> \
  --image <ACR_NAME>.azurecr.io/kt-flowone-cp:1.0.0 \
  --target-port 80 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3 \
  --cpu 0.25 --memory 0.5Gi
```

업데이트:
```bash
az containerapp update \
  --name kt-flowone-cp \
  --resource-group <RG_NAME> \
  --image <ACR_NAME>.azurecr.io/kt-flowone-cp:1.0.1
```

### 3-4. App Service for Containers (대체 옵션)

```bash
az webapp create \
  --resource-group <RG_NAME> \
  --plan <APPSERVICE_PLAN> \
  --name kt-flowone-cp \
  --deployment-container-image-name <ACR_NAME>.azurecr.io/kt-flowone-cp:1.0.0
```

## 4. MSA 환경 통합 (백엔드 API 라우팅)

본 컨테이너는 정적 SPA만 서빙합니다. API 호출은 별도 백엔드 컨테이너로 라우팅되어야 합니다.

### 패턴 A: 같은 도메인 + Path 분리
```
https://cp.example.com/         → 프론트 컨테이너 (이 저장소)
https://cp.example.com/api/*    → 백엔드 컨테이너 (별도)
```
- Azure Container Apps의 **Ingress 규칙** 또는 Application Gateway / Azure Front Door로 path 라우팅.
- `.env.production`: `VITE_API_BASE_URL=/api`

### 패턴 B: 분리된 도메인
```
https://cp.example.com/         → 프론트
https://api.cp.example.com/     → 백엔드
```
- 백엔드에 CORS 허용 설정 필요.
- `.env.production`: `VITE_API_BASE_URL=https://api.cp.example.com`

## 5. 서브패스 배포 시 주의

루트가 아닌 서브패스(예: `https://hub.example.com/cp/`)로 배포하는 경우 **두 군데**를 같은 값으로 맞춰야 합니다.

`vite.config.js`:
```js
export default defineConfig({
  base: '/cp/',     // 서브패스
  // ...
})
```

`src/router/index.js`는 이미 `createWebHistory(import.meta.env.BASE_URL)`로 받아오므로 별도 수정 불필요.

nginx 컨테이너를 그대로 사용하되 ingress에서 `/cp/` prefix를 보존하도록 라우팅 규칙을 설정합니다.

## 6. CI/CD 권장 흐름 (참고)

```
Git push (main)
  ↓
Azure DevOps Pipeline / GitHub Actions
  ↓
1) npm ci → npm run lint → npm run build
2) docker build → ACR push (tag = <git sha> + latest)
3) az containerapp update --image ...
```

CI/CD 스크립트는 본 견적 범위에 포함되지 않습니다. 필요 시 별도 협의.

## 7. 헬스 체크

nginx는 기본적으로 `GET /`에 200을 응답하므로 별도 헬스 엔드포인트가 필요하면 `nginx.conf`에 추가:

```nginx
location = /healthz {
    access_log off;
    return 200 'ok';
    add_header Content-Type text/plain;
}
```

## 8. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| 새로고침 시 404 | nginx SPA fallback 누락. `nginx.conf`의 `try_files`가 `/index.html`로 끝나는지 확인. |
| API 호출이 CORS 오류 | 같은 도메인 + path 분리(패턴 A) 권장. 또는 백엔드에서 CORS 허용. |
| 정적 자원이 404 | 서브패스 배포인데 `vite.config.js`의 `base`가 누락. |
| 이미지 빌드 시 `npm ci` 실패 | `package-lock.json`이 누락된 채로 빌드. 로컬에서 한 번 `npm install` 후 lockfile 커밋 필요. |
